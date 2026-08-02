## Context

The blog currently sources all content from an external API. Three consumers call `getPosts()` from `src/lib/api.ts`:

```
getPosts() from src/lib/api.ts  (api.ts swallows errors → returns [] silently)
├── src/pages/blog/[...page].astro      → paginate(6), stale {userId, body, shortUrl}
├── src/pages/blog/[post].astro         → marked → set:html
└── src/components/FeaturedPosts.astro  → slice(3)
```

`src/content.config.ts` registers only the `projects` collection. The portfolio already uses a clean local-content pattern (`getCollection('projects')` from MDX). There is no `blog` collection and no `src/content/blog/` folder today.

**API post shape (13 fields)** — the local schema must mirror these so migration is drop-in:
`id, slug, title, status, lang, banner_image_url, description, keywords, author, content (markdown), related_post, created_at, updated_at`

**Verified constraints:**
- Astro 5.18 has **no public "render markdown string" API** in pages (the old `<Markdown>` component is gone).
- **Custom content loaders** receive `renderMarkdown(content)` in their context, and `render(entry)` uses a pre-rendered `entry.rendered.html` when present (`content/runtime.js:549`). This makes a hybrid loader render both sources through the same `<Content />`.
- The `image()` schema helper accepts **only imported image metadata objects**, not URL strings. Remote API banners must be typed as strings in the schema.
- Remote images with explicit `width`/`height` pass through without domain validation (`remoteProbe.js` only runs when dimensions are missing) — so S3 banner URLs already work as-is today.

## Goals / Non-Goals

**Goals:**
- A `blog` content collection that merges local MDX posts + API posts into one list consumed by all pages via `getCollection('blog')`
- Same schema for both sources (title, description, publishDate, updatedDate, author, keywords, tags, featuredImage, lang, status, draft, relatedPost)
- Dedupe by id (API slug / MDX filename), **local wins** — one-post-at-a-time migration
- API outage → warn + build with local-only (no more silent empty blog); `API_STRICT_MODE=true` to fail loudly
- Deterministic ordering: merged posts sorted by `publishDate` desc for index + featured
- Exclude `draft: true` and `status: 'draft'` entries from public pages
- Render both sources through Astro's native content pipeline; remove `marked` + `set:html`
- Fix existing single-post SEO bugs (relative canonical, missing publishDate/author/keywords/OG image)

**Non-Goals:**
- Building blog tag filter pages (mirroring portafolio tags) — keywords are stored but not used for tag routing yet
- Full automated API→local migration of existing content (the export script is a bootstrap aid only)
- Touching contact forms or any non-blog page behavior
- Changing the blog UI/visuals

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Merge mechanism | **Custom hybrid loader** on the `blog` collection | Pages keep using `getCollection('blog')` + `render(entry)` — no dual logic in 3 consumers. Loader context provides `renderMarkdown`, so API markdown renders identically to local MDX. |
| Local file loading | **Reuse Astro's `glob` loader** inside the custom loader | It already parses frontmatter, processes `image()` imports (`assetImports`), handles drafts and dev HMR. The collection's schema overrides its internal schema. |
| Dedupe precedence | Local MDX wins by `id` (API `slug` / local MDX filename) | `globLoader.load()` populates local entries first; the API loop only sets entries whose id is not already in the store (`store.has(id)` check). Migration = add the MDX file, delete from API later. |
| Content rendering | Loader stores `rendered` via `context.renderMarkdown(content)` for API entries; `render(entry)` for local MDX | Both produce a `<Content />` component with consistent prose styling and Astro's default markdown escaping. No claim of XSS sanitization beyond Astro's defaults. |
| Schema validation for API entries | Loader calls `context.parseData()` before `store.set()` | Required for schema defaults (`source`, `lang`, `status`, `tags`) and `image()` union validation to apply to API entries; matches Astro's documented loader pattern. |
| Content ordering | Shared `getBlogPosts()` helper (in `src/lib/blog.ts`) sorts merged entries by `publishDate` desc | Store insertion order is local-first then API, which is not date-sorted; the helper gives list, pagination, and featured posts a deterministic "newest first" order. |
| Draft/status filtering | Loader skips API entries with `status: 'draft'`; Astro's query layer excludes `draft: true` in production builds | API posts carry a `status` field; local MDX uses the boolean `draft`. Filtering status in the loader keeps consumers uniform. |
| Schema `featuredImage` | `z.union([image(), z.string().url()])` | Local posts import images (metadata object, optimized by Astro). API posts supply URL strings (pass-through with explicit dims). Validates both. |
| Source marker | `source: z.enum(['local','api']).default('local')` in data | Loader sets `'api'` for API entries; local MDX defaults to `'local'`. Lets pages branch on source if ever needed. |
| API failure handling | `getPosts()` refactored to **throw** on failure; loader catches, warns, continues | Current `return []` makes failure invisible. Strict mode rethrows via `API_STRICT_MODE`. |
| `marked` | **Remove** from `package.json` + all imports, including `markdownToHtml()` in `src/lib/api.ts` (which imports `marked`) | API markdown now rendered by the loader; `[post].astro` drops `set:html`; deleting `markdownToHtml` avoids a broken import once the dep is removed |
| SEO metadata | Pass absolute canonical (`Astro.url.href`), `publishDate`, `author`, `keywords`, per-post featured image to `DefaultLayout` | Fixes the current broken canonical and missing JSON-LD `datePublished`. |
| OG image URL | `SiteMeta` uses `image` as-is when it starts with `http`, else prepends `Astro.site` | Remote API banners are absolute URLs; local images are metadata objects converted to `.src`. |
| Export script | Single `scripts/export-blog-from-api.mjs` | Optional bootstrap: fetches API, writes MDX (content + frontmatter), downloads banner images to `src/assets/blog/`. Not required for the hybrid to work. |

**Alternatives considered:**

- **Merge helper module** (`getAllBlogPosts()` in `src/lib/blog.ts`, pages call it): works but keeps `marked` + `set:html` for API content, adds two render paths in `[post].astro`, and duplicates merge logic across 3 consumers. Rejected in favor of the loader, which centralizes everything in one file.
- **Sync script → local-only** (drop API from pages entirely): simplest and most deterministic, but it is not a true "both sources at the same time" system and the user explicitly wants a parallel system with local-wins dedupe.
- **Two separate collections** (`blog` for local, `blog-api` for remote) merged in pages: complicates every consumer and pagination. Rejected.
- **Put `featuredImage` as plain `z.string()` only**: would prevent Astro from optimizing local images. Rejected in favor of the union.

## Hybrid Loader Sketch

```ts
// src/lib/blog.ts
export function hybridBlogLoader(): Loader {
  const globLoader = glob({ pattern: '**/*.mdx', base: './src/content/blog' })
  return {
    name: 'hybrid-blog-loader',
    async load(context) {
      await globLoader.load(context)          // local MDX entries (drafts, images, HMR handled)
      try {
        const posts = await getPosts('es')    // now throws on failure
        for (const post of posts) {
          const id = post.slug
          if (context.store.has(id)) continue // local wins
          const data = await context.parseData({
            id,
            data: normalizeApiPost(post),     // banner_image_url→featuredImage, created_at→publishDate, keywords→tags, source:'api'
          })
          if (data.status === 'draft') continue // status filter (local `draft: true` handled by query layer)
          context.store.set({
            id,
            data,
            body: post.content,
            rendered: await context.renderMarkdown(post.content),
          })
        }
      } catch (err) {
        if (process.env.API_STRICT_MODE === 'true') throw err
        context.logger.warn(`[blog] API unavailable: ${err.message}. Using local posts only.`)
      }
    },
  }
}

// Sorting helper shared by index + featured consumers
export async function getBlogPosts() {
  return (await getCollection('blog')).sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime(),
  )
}
```

```
┌────────────────────────── blog collection (custom loader) ──────────────────────────┐
│  1. glob(src/content/blog/*.mdx) ──► local entries (render via MDX, drafts honored)  │
│  2. getPosts('es') ──► normalize ──► store.set (skip id already present → local wins) │
│  3. API error? ──► warn + continue  |  API_STRICT_MODE → throw                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
        │  getCollection('blog') returns merged list
        ▼
  [...page].astro   [post].astro   FeaturedPosts.astro   (all render via render(entry))
```

## Data Flow for a Single Post

```
GET /blog/:slug
  └─ getCollection('blog') find by id
       ├─ source 'local' → render(entry) → <Content />   (MDX body, optimized local image)
       └─ source 'api'   → render(entry) → <Content />   (pre-rendered markdown, remote image pass-through)
  DefaultLayout(title, description, publishDate, author, keywords, image, breadcrumbs)
       └─ SiteMeta → canonical = Astro.url.href, JSON-LD BlogPosting.datePublished, OG image
```

## Risks / Trade-offs

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Loader API misuse (store shape, `renderMarkdown` signature, `parseData` required) | Medium | Verify against `node_modules/astro/dist/content/loaders/types.d.ts`; call `context.parseData()` before `store.set`; run `pnpm build` after wiring |
| `image()` union rejects remote URLs or local imports unexpectedly | Medium | `z.union([image(), z.string().url()])`; local posts keep ESM imports like projects; test both sources in dev |
| Dev-mode HMR for local MDX breaks under custom loader | Medium | Reusing Astro's `glob` loader preserves the file watcher; verify by editing an MDX in `pnpm dev` |
| API posts render prose differently than local MDX | Low | Both render via `render(entry)`; styling is CSS-driven (`.post-content`/`.space-content`), parity is visual |
| `renderMarkdown` output lacks MDX component support (API content can't inline components) | Known ceiling | API content is plain markdown; acceptable — `marked` had no component support either |
| Local post uses a broken image path | Medium | Same as projects: validate `featuredImage` paths in sample posts during implementation |
| `getPosts` throwing breaks other callers | Low | Only the loader is a caller after this change; grep confirms no other importers |
| SEO change regresses non-blog pages | Low | `SiteMeta` absolute-image check is additive; other pages pass relative paths unchanged |

## Migration Plan

1. Add the `blog` collection + hybrid loader + schema.
2. Create `src/content/blog/` sample posts + local images.
3. Rewrite the 3 consumers and fix SEO.
4. Remove `marked`; run `pnpm install`.
5. Build + lint + manual verification of both sources.
6. **Rollback:** revert the commit — pages go back to API-only behavior (git history is the rollback; no data migration involved).

## Open Questions

- None blocking. Post-archive nice-to-have: blog tag pages from `tags` (mirroring `portafolio/tag`) if the user wants them later.

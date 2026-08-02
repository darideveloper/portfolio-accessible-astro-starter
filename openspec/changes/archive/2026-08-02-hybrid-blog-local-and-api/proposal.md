## Why

The blog currently sources **all** content from an external API (`services.darideveloper.com/api/posts/`). There is no way to publish a post that does not exist in the API, and the API is a single point of failure: if it is unreachable during `astro build`, `getPosts()` swallows the error and returns `[]`, so blog pages compile silently with zero posts. The portfolio section already proves a clean local-content pattern (`getCollection('projects')` from MDX). We want a **parallel local blog system** that runs alongside the API system: local MDX posts are rendered and listed together with API posts on the same pages, share the same data shape, and use the same features (list/pagination, single post, featured, breadcrumbs, SEO). This makes migration eventual (a post can be moved from API → local one at a time) and removes the "all-or-nothing" coupling.

## What Changes

- **CREATE** `blog` content collection in `src/content.config.ts` backed by a custom hybrid loader that merges:
  - local MDX posts from `src/content/blog/**/*.mdx`, and
  - API posts from `getPosts()` (existing module), normalized to the same schema
- **NEW** shared blog schema mirroring the API fields so migration is trivial: `title`, `description`, `publishDate`, `updatedDate`, `author`, `keywords`, `tags`, `featuredImage`, `lang`, `status`, `draft`, `relatedPost`
- **MERGE RULE** — dedupe by entry `id` (which equals the API `slug` / the local MDX filename), **local file wins** over the API copy; a local post silently replaces its API twin, enabling one-post-at-a-time migration
- **RESILIENCE** — if the API fetch fails at build time, log a loud warning and continue with local posts only (no more silent empty blog); failure to fail is controlled via an env flag
- **ORDERING** — merged posts are sorted by `publishDate` (newest first) for the blog index, pagination, and featured posts, so "latest posts" is meaningful regardless of source
- **FILTERING** — entries with `draft: true` or `status: 'draft'` are excluded from public pages, handled in the loader and Astro's query layer
- **REWRITE** `src/pages/blog/[...page].astro` — `getCollection('blog')` + `paginate(6)`, drop the stale `{userId, body, shortUrl}` interface
- **REWRITE** `src/pages/blog/[post].astro` — `getCollection('blog')` + `render(entry)` for both sources; **remove** `marked` and `set:html`
- **REWRITE** `src/components/FeaturedPosts.astro` — `getCollection('blog')`, slice to limit, fix stale JSONPlaceholder comment
- **SEO FIXES** on the single-post page (currently broken): absolute canonical URL, pass `publishDate` (JSON-LD `datePublished`), `author`, `keywords`, and per-post featured image for Open Graph
- **UPDATE** `src/components/SiteMeta.astro` — accept absolute image URLs so remote API banners work as OG images
- **UPDATE** `src/pages/sitemap.astro` — replace stale "Contenido dinámico desde la API de JSONPlaceholder" text; list blog posts
- **REMOVE** `marked` dependency (no longer needed; API markdown rendered natively via loader's `renderMarkdown`); `sanitize-html` already-unused devDep stays out of scope
- **CREATE** `src/content/blog/` with initial sample MDX posts (2–3) and local featured images under `src/assets/blog/`
- **OPTIONAL** `scripts/export-blog-from-api.mjs` — one-off bootstrap that dumps the current API posts as MDX files to seed the local collection

## Capabilities

### New Capabilities

- `blog-content-collection`: Local blog posts as MDX files in `src/content/blog/` via Astro Content Collections, merged in parallel with API posts. Schema mirrors the API fields (`title`, `description`, `publishDate`, `updatedDate`, `author`, `keywords`, `tags`, `featuredImage`, `lang`, `status`, `draft`, `relatedPost`). Dedupe by entry id (API `slug` / local MDX filename) with local-wins precedence.

### Modified Capabilities

- `blog-integration`: The "External Blog Content Fetching" requirement changes from "blog MUST be sourced entirely from the external API" to "blog content is a merge of API posts and local MDX posts; API fetch failures fall back to local content with a warning". The "Markdown Content Rendering" requirement changes from "rendered via `marked` + `set:html`" to "rendered natively by Astro's content pipeline for both sources".

## Impact

| File | Action |
|------|--------|
| `src/content.config.ts` | ADD `blog` collection + hybrid loader + schema |
| `src/lib/api.ts` | MODIFY — normalize to blog schema, loud-failure behavior |
| `src/lib/blog.ts` | CREATE — shared blog schema type + normalizers + merge helper used by loader |
| `src/content/blog/*.mdx` | CREATE — initial sample posts |
| `src/assets/blog/` | CREATE — local featured images |
| `src/pages/blog/[...page].astro` | REWRITE |
| `src/pages/blog/[post].astro` | REWRITE |
| `src/components/FeaturedPosts.astro` | REWRITE |
| `src/components/SiteMeta.astro` | MINOR EDIT (absolute image URLs) |
| `src/pages/sitemap.astro` | MINOR EDIT (stale text + post list) |
| `package.json` | REMOVE `marked` |
| `scripts/export-blog-from-api.mjs` | CREATE (optional bootstrap) |
| `.env.example` | CREATE with API_BASE, API_TOKEN, SITE_URL, API_STRICT_MODE docs |
| `openspec/specs/blog-integration/spec.md` | MODIFY (delta) |
| `openspec/specs/blog-content-collection/spec.md` | CREATE |

## 1. Shared Schema & Normalization

- [x] 1.1 Add blog schema fields to `src/lib/api.ts`: export a `BlogPostData` type mirroring the schema (title, description, publishDate, updatedDate, author, keywords, tags, featuredImage, lang, status, draft, relatedPost)
- [x] 1.2 Refactor `getPosts()` in `src/lib/api.ts` to **throw** on API failure instead of returning `[]`
- [x] 1.3 Add `normalizeApiPost()` in `src/lib/api.ts` mapping API fields → schema fields (`banner_image_url`→`featuredImage`, `created_at`→`publishDate`, `updated_at`→`updatedDate`, split `keywords` into `tags`, set `source: 'api'`, `status` from `status`)
- [x] 1.4 Remove `markdownToHtml()` and the `import { marked }` line from `src/lib/api.ts` (dead once `[post].astro` stops using it)
- [x] 1.5 Remove dead `getPostBySlug()` from `src/lib/api.ts` (exported but never called)
- [x] 1.6 Verify no other files import `getPosts`/`getPostBySlug` besides the 3 blog consumers and loader (grep before proceeding)

## 2. Hybrid Content Collection

- [x] 2.1 Create `src/lib/blog.ts` with `hybridBlogLoader()`: runs Astro's `glob` loader on `src/content/blog/**/*.mdx`, then fetches API posts, skips ids already in the store (local wins), calls `context.parseData()` on each API post, skips `status: 'draft'`, and stores entries with `body` + `rendered` via `context.renderMarkdown`
- [x] 2.2 Handle API failure in loader: warn + continue with local-only; rethrow when `API_STRICT_MODE === 'true'`
- [x] 2.3 Add `getBlogPosts()` sorting helper to `src/lib/blog.ts` — `getCollection('blog')` sorted by `publishDate` descending
- [x] 2.4 Register `blog` collection in `src/content.config.ts` using `hybridBlogLoader()` with schema: `title`, `description`, `publishDate` (date), `updatedDate` (date, optional), `author`, `keywords` (optional), `tags` (array default `[]`), `featuredImage` (`z.union([image(), z.string().url()])`), `lang` (default `'es'`), `status` (default `'published'`), `draft` (default `false`), `relatedPost` (optional), `source` (default `'local'`)
- [x] 2.5 Create `.env.example` with documented keys: `API_BASE`, `API_TOKEN`, `SITE_URL`, `API_STRICT_MODE`

## 3. Sample Local Content

- [x] 3.1 Create `src/content/blog/` with 2-3 sample `.mdx` posts matching the schema (include one with `draft: true`)
- [x] 3.2 Add local featured images under `src/assets/blog/` and reference them in sample posts

## 4. Rewrite Blog Pages

- [x] 4.1 Rewrite `src/pages/blog/[...page].astro`: use `getBlogPosts()` (sorted), keep pagination at 6, remove stale `{userId, body, shortUrl}` interface and `getPosts` import
- [x] 4.2 Rewrite `src/pages/blog/[post].astro`: `getStaticPaths` from `getCollection('blog')`, `render(entry)` for content, remove `marked`/`set:html`/`markdownToHtml`
- [x] 4.3 In `[post].astro` pass SEO props to `DefaultLayout`: absolute canonical (`Astro.url.href`), `publishDate` (ISO), `author`, `keywords`, and per-post featured image (resolve `ImageMetadata` → `.src`)
- [x] 4.4 Rewrite `src/components/FeaturedPosts.astro`: use `getBlogPosts()`, slice to limit, fix stale JSONPlaceholder comment
- [x] 4.5 Update `src/components/SiteMeta.astro`: use `image` as-is when it starts with `http`, else prepend `Astro.site` (support absolute URLs for API banners)

## 5. Cleanup & Content Sites

- [x] 5.1 Update `src/pages/sitemap.astro`: fix stale "Contenido dinámico desde la API de JSONPlaceholder" text; list blog posts from `getCollection('blog')`
- [x] 5.2 Remove `marked` from `package.json` and run `pnpm install`
- [x] 5.3 (Optional) Create `scripts/export-blog-from-api.mjs`: fetch API → write MDX to `src/content/blog/` + download banners to `src/assets/blog/`

## 6. Verify

- [x] 6.1 Run `pnpm build` — clean build, no errors, API posts + local posts both present
- [x] 6.2 Run `pnpm eslint .` — no new errors
- [x] 6.3 Check `/blog/` lists API posts and local sample posts with pagination, newest `publishDate` first (mixed sources)
- [x] 6.4 Check `/blog/{slug}` renders both an API post and a local post via `<Content />` (no raw HTML)
- [x] 6.5 Check homepage FeaturedPosts shows merged latest posts (newest first)
- [x] 6.6 Confirm `marked` gone from `pnpm-lock.yaml`, `node_modules`, and `src/lib/api.ts` (no lingering import)
- [x] 6.7 Confirm a `status: 'draft'` API post and a `draft: true` local post are both excluded from public pages
- [x] 6.8 Simulate API outage (unset API_BASE) → build warns and succeeds with local-only
- [x] 6.9 Set `API_STRICT_MODE=true` + API outage → build fails loudly
- [x] 6.10 Verify single-post SEO: absolute canonical, JSON-LD `datePublished`, author, keywords, OG image

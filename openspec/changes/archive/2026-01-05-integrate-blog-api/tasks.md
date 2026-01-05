## 1. Preparation
- [x] 1.1 Add `PUBLIC_API_TOKEN` and `API_BASE` to `.env` (user provided).
- [x] 1.2 Install `marked` (or similar) for Markdown transformation.

## 2. Implementation
- [x] 2.1 Create `src/lib/api.ts` (or `utils/api.ts`) to handle API requests with headers and type definitions.
- [x] 2.2 Update `FeaturedPosts.astro` to use the new API utility and map fields (title, image, date).
- [x] 2.3 Update `src/pages/blog/[...page].astro` to fetch from the new API for the index.
- [x] 2.4 Update `src/pages/blog/[post].astro` to fetch from the new API and render Markdown content to HTML.
- [x] 2.5 Verify "Previous/Next" post navigation if the API supports it (or calculate locally).
- [x] 2.6 Remove legacy `getPostImage.ts` or arrays if no longer needed.

## 3. Validation
- [x] 3.1 Verify posts load with correct images.
- [x] 3.2 Verify Markdown renders correctly as HTML.
- [x] 3.3 Verify author and date metadata is correct.

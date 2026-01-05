# Change: Integrate Real Blog API

## Why
The current blog implementation uses dummy data from JSONPlaceholder and local hardcoded images. To make the blog functional and dynamic, we need to connect it to the real backend API (`services.darideveloper.com`), which provides authoritative content, multiple languages, and real metadata.

## What Changes
- **Data Fetching**: Replace `fetch('https://jsonplaceholder.typicode.com/posts')` with authenticated calls to `${API_BASE}/api/posts/` (using the configured environment variable).
- **Authentication**: Implement secure token handling using environment variables (`API_TOKEN` and `API_BASE`) for the requests.
- **Content Rendering**: Convert the API's Markdown `content` field to HTML for display, likely using `marked` or a similar library.
- **Data Mapping**: strict type mapping from the new API response (including `slug`, `banner_image_url`, `author`, `created_at`) to the UI components.
- **Localization**: Send `Accept-Language: es` (or dynamic based on current locale) in API headers.
- **Dependencies**: Add `marked` (or similar) for Markdown processing.

## Impact
- **Affected specs**: `blog-integration` (New capability)
- **Affected code**:
    - `src/components/FeaturedPosts.astro`: Update data source and rendering.
    - `src/pages/blog/[post].astro`: Update `getStaticPaths` and content rendering.
    - `src/pages/blog/[...page].astro`: Update pagination logic with real data.
    - `src/utils/`: May need a new `api.ts` or `posts.ts` utility for centralized fetching.
- **Breaking**: Existing hardcoded "dummy" posts will disappear.

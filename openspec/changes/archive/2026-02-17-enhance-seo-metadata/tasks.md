
- [x] Implement enhanced `SiteMeta.astro` component
    - [x] Add props interface for `type`, `keywords`, `robots`, `publishDate`
    - [x] Add Canonical URL tag generation
    - [x] Add Twitter Card meta tags
    - [x] Implement JSON-LD script generation logic
- [x] Update `DefaultLayout.astro`
    - [x] Update props to accept new metadata fields
    - [x] Pass new props to `SiteMeta`
- [x] Update `MarkdownLayout.astro`
    - [x] Map frontmatter fields to `DefaultLayout` props
    - [x] Set `type="article"` for markdown pages
- [x] Verify SEO tags on Home Page
    - [x] Check for presence of JSON-LD Organization schema
    - [x] Check for Twitter Card tags
    - [x] Check for Canonical link
- [x] Verify SEO tags on Blog Post Page
    - [x] Check for presence of JSON-LD BlogPosting schema
    - [x] Verify `og:type` is `article`


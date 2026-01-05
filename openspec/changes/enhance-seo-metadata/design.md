# Design: Enhance SEO Metadata

## Architecture
The metadata system relies on a centralized `SiteMeta` component which is utilized by the `DefaultLayout`. All pages, including Markdown pages via `MarkdownLayout`, properly cascade metadata props to this component.

### Component Responsibilities

1.  **`src/components/SiteMeta.astro`**:
    - **Responsibility**: Render all `<meta>`, `<link>`, and `<script type="application/ld+json">` tags.
    - **New Props**:
        - `type`: 'website' | 'article' (default: 'website')
        - `publishDate`: string (for articles)
        - `author`: string
        - `canonicalUrl`: string (optional override)
    - **Logic**:
        - Construct canonical URL from `Astro.url.href` if not provided.
        - conditional rendering of JSON-LD based on `type`.

2.  **`src/layouts/DefaultLayout.astro`**:
    - **Responsibility**: Interface between pages and `SiteMeta`.
    - **Updates**: transparently pass new props to `SiteMeta`.

3.  **`src/layouts/MarkdownLayout.astro`**:
    - **Responsibility**: Adapter for markdown logic.
    - **Updates**: Extract `pubDate`, `author`, `categories` (for keywords) from frontmatter and pass to `DefaultLayout` as `type='article'`.

## Data Modeling

### JSON-LD Schemas

**Organization (Default)**:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Smooth Software Solutions",
  "url": "https://software3s.com",
  "logo": "https://software3s.com/logo.png",
  "sameAs": [
     "https://twitter.com/..."
  ]
}
```

**BlogPosting (Articles)**:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Page Title",
  "image": "https://software3s.com/image.jpg",
  "datePublished": "2023-01-01",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  }
}
```

# Change: Improve SEO Metadata Audit and Enhancement

## Why
The current SEO metadata implementation has significant gaps and inconsistencies across pages. Many pages lack proper structured data, have incomplete Open Graph tags, missing Twitter Cards, inadequate meta descriptions, and no language/localization support.
Specifically:
- **404 pages are being indexed** (default is `index, follow`).
- **Site constants are hardcoded** in components, leading to inconsistency.
- **JSON-LD is basic**, missing `BreadcrumbList` and detailed `Organization` data.
- **Twitter Cards** are incomplete (missing creator/site).
- **No `hreflang` support** for future localization scalability.

## What Changes

### 1. Centralized Configuration
Create `src/lib/constants/site.ts` to manage site-wide SEO constants.

```typescript
// src/lib/constants/site.ts
export const SITE = {
  name: 'Smooth Software Solutions',
  title: 'Smooth Software Solutions (3S)',
  description: 'Smooth Software Solutions is a software development company that specializes in building custom software solutions for businesses.',
  url: 'https://software3s.com',
  author: 'DariDeveloper',
  twitter: '@DariDeveloper',
  defaultLanguage: 'en',
}
```

### 2. Enhanced `SiteMeta` Component
Refactor `src/components/SiteMeta.astro` to:
- Use `SITE` constants.
- Support `breadcrumbs` schema.
- Support detailed `Organization` and `Article` schemas.
- Add `hreflang` (prepared for i18n).
- Add `twitter:site` and `twitter:creator`.
- Dynamic `canonical` URL handling.

**Interface:**
```typescript
interface Props {
  title: string
  description?: string
  image?: string
  author?: string
  type?: 'website' | 'article' | 'profile'
  publishDate?: string
  keywords?: string
  robots?: string
  // New props
  lang?: string
  ogLocale?: string
  canonicalUrl?: string
  breadcrumbs?: Array<{ name: string; item: string }>
}
```

### 3. Layout Updates
Update `src/layouts/DefaultLayout.astro` to pass all new props and set the API for pages.

```astro
// src/layouts/DefaultLayout.astro
<html lang={lang} dir="ltr">
  <head>
    <SiteMeta
        title={title}
        description={description}
        url={Astro.url.href}
        image={image}
        author={author}
        type={type}
        publishDate={publishDate}
        keywords={keywords}
        robots={robots}
        lang={lang}
        breadcrumbs={breadcrumbs} // New prop
    />
```

### 4. Critical Page Fixes
- **404 Page**: Set `robots="noindex, nofollow"`.
- **Homepage**: Verify `Organization` schema matches `SITE` config.
- **Blog/Services**: Add `breadcrumbs` data.

## Impact
- **Affected specs**: seo-metadata (new capability)
- **Affected code**:
  - `src/lib/constants/site.ts` (new)
  - `src/components/SiteMeta.astro` (major enhancement)
  - `src/layouts/DefaultLayout.astro` (metadata props)
  - `src/pages/404.astro` (fix indexing)
  - All page files in `src/pages/` (metadata optimization)
- **SEO improvements**: Correct indexing (no 404s), Rich Results (via JSON-LD), Social Sharing optimization.

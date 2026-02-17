## 1. Foundation: Constants & Config
- [x] 1.1 Create `src/lib/constants/site.ts` with `SITE` object export (name, title, desc, url, author, twitter).
- [x] 1.2 Update `astro.config.mjs` to ensure `site` matches `SITE.url` (if needed for consistency).

## 2. Component Architecture: `SiteMeta`
- [x] 2.1 Update `src/components/SiteMeta.astro` props interface to include `lang`, `ogLocale`, `canonicalUrl`, `breadcrumbs`.
- [x] 2.2 Refactor `title` logic to use `SITE.title` from constants.
- [x] 2.3 Implement `BreadcrumbList` JSON-LD generation from `breadcrumbs` prop.
- [x] 2.4 Enhance `Organization` JSON-LD to match Smooth Software Solutions branding (logo, social links).
- [x] 2.5 Add `twitter:site` and `twitter:creator` meta tags using `SITE.twitter`.
- [x] 2.6 Add `hreflang` link tags logic (defaulting to `x-default` and current lang).

## 3. Layout Integration: `DefaultLayout`
- [x] 3.1 Update `src/layouts/DefaultLayout.astro` to import `SITE` constants for default values.
- [x] 3.2 Add `lang` prop to `DefaultLayout` and pass it to `<html>` tag.
- [x] 3.3 Pass new props (`breadcrumbs`, `canonicalUrl`, etc.) from Layout props to `SiteMeta`.

## 4. Page Optimization
- [x] 4.1 **404 Page**: Update `src/pages/404.astro` to pass `robots="noindex, nofollow"` and `title="404 - Not Found"`.
- [x] 4.2 **Homepage**: Update `src/pages/index.astro` to pass `Organization` schema details if not default.
- [x] 4.3 **Blog Pages**: Check `src/pages/blog/[...slug].astro` (or similar) to ensure `Article` schema is populated with `publishDate`, `author`, `image`.
- [x] 4.4 **Services**: Add `breadcrumbs` array to Service pages.

## 5. Validation
- [x] 5.1 Run `npm run build` to verify no type errors in `SiteMeta`.
- [x] 5.2 Validate usage of `clsx` if adding dynamic classes (per user rules), though mostly meta tags here.
- [x] 5.3 Manual check of `view-source:` on localhost to verify meta tags presence.

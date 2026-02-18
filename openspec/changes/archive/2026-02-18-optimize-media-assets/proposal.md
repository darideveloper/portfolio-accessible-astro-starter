# Proposal: Comprehensive Media Optimization

## Summary
Transform the project's media delivery from unoptimized raw files to a high-performance, responsive pipeline using Astro's `astro:assets` and built-in image processing.

## Why
Currently, several key sections of the site (Blog and Portfolio) bypass optimization:
- **Blog Images**: Remote URLs are served as-is via standard `<img>` tags, resulting in potentially massive downloads for users and poor LCP (Largest Contentful Paint).
- **Project Images**: Assets are served from the `public/` directory, which prevents Astro from generating responsive variants, modern formats (AVIF), or performing build-time compression.

By migrating to `astro:assets`, we will:
1.  **Reduce Page Weight**: Automatically serve WebP/AVIF formats.
2.  **Improve Core Web Vitals**: Control LCP and CLS with explicit dimensions and lazy loading.
3.  **Future-Proofing**: Centralize asset management in `src/assets`.

## What Changes
- Configured `astro.config.mjs` to allow remote image optimization for `services.darideveloper.com`.
- Updated `PageHeader` component to support `ImageMetadata`.
- Migrated project images from `public/projects/` to `src/assets/projects/`.
- Updated `projects` content collection schema to use Astro's `image()` helper.
- Updated all project MDX files to use relative paths for images.
- Replaced `<img>` with `<Image />` in blog and portfolio lists.
- Removed legacy `getProjectImage.ts` utility.

## Impact
- **Affected Areas**: Blog list, Project list, Project detail pages, PageHeader component.
- **Improved Metrics**: Better LCP, reduced page weight via automatic WebP/AVIF generation.

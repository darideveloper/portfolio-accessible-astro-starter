# Optimize Media Attributes

## Summary
This proposal aims to optimize media assets across the project by standardizing the use of `loading="lazy"`, ensuring meaningful `alt` text, and adding `title` attributes where appropriate. This covers both Astro components and MDX content files.

## Motivation
- **Performance:** Explicitly lazy loading images below the fold improves initial page load time and Core Web Vitals (specifically LCP).
- **Accessibility:** Ensuring all images have meaningful `alt` text (or empty for purely decorative ones, but explicitly decided) is crucial for screen readers.
- **SEO:** Search engines rely on `alt` text and `title` attributes to understand image context.
- **Consistency:** Standardizing how images are handled across MDX and Astro components reduces maintenance overhead.

## Proposed Solution
1.  **MDX Content:** Update all legacy `<img>` tags in `src/content/projects/` to include `loading="lazy"`.
2.  **Component Updates:**
    -   `PageHeader.astro`: Use the page `title` as a fallback `alt` text if not explicitly provided, and ensure `loading="eager"` since it's above the fold.
    -   `Hero.astro`: Add an `alt` prop to allow specific descriptions for the hero image.
    -   `ContentMedia.astro`: Explicitly set `loading="lazy"`.
    -   `Avatar.astro`: Explicitly set `loading="lazy"`.
3.  **Title Attributes:** Add `title` attributes where they provide additional context (like tooltips) without duplicating `alt` text.

## Design Specs
- [Image Optimization Specs](./specs/media-optimization/spec.md)

# Proposal: Standardize Image Alt and Title Attributes

Standardize the use of `alt` and `title` attributes across all images in the project to improve SEO and accessibility. Ensure that both attributes are always present, non-empty, and consistent with each other if not explicitly provided differently.

## Why

Currently, several components in the project use `alt` attributes but missing `title` attributes. Additionally, some components allow these attributes to be empty, which is not ideal for SEO and accessibility.

Specifically:
- `Logo.astro` is missing a `title` and uses a generic `alt`.
- `FeaturedProjects.astro` and `FeaturedPosts.astro` are missing `title` attributes on their images.
- `ContentMedia.astro`, `BreakoutImage.astro`, and `Hero.astro` can have empty `alt`/`title` attributes if props are not provided.

## What Changes

Standardize the image attribute logic across all components:
1.  **Always Include Both**: Every `<Image />` or `<img>` tag must have both `alt` and `title` attributes.
2.  **Consistency**: If only one attribute is provided (e.g., `alt`), the same value should be used for the other (e.g., `title`).
3.  **Non-Empty Values**: Neither `alt` nor `title` should ever be empty or blank. Provide sensible defaults where necessary.

## Affected Components

- `Logo.astro`
- `FeaturedProjects.astro`
- `FeaturedPosts.astro`
- `ContentMedia.astro`
- `BreakoutImage.astro`
- `Hero.astro`

## Impact

- **SEO**: Improved image indexing and search relevance.
- **Accessibility**: Better experience for screen readers (via `alt`) and tooltip information (via `title`).
- **Consistency**: Unified implementation across the codebase.

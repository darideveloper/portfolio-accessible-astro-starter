# Tasks

- [x] **MDX: Update Content Images** in `src/content/projects/*.mdx`:
    - [x] Add `loading="lazy"` to all `<img>` tags.
    - [x] Add `title` attributes where relevant (based on existing `alt` or context).
- [x] **Components: Update `PageHeader.astro`**:
    - [x] Add `imageAlt?: string` to `Props`.
    - [x] Update `<Image />`: `alt={imageAlt || title}`, `title={imageAlt || title}`, `loading="eager"`.
- [x] **Components: Update `Hero.astro`**:
    - [x] Add `imageAlt?: string` to `Props` (defaulting to a sensible fallback).
    - [x] Update `<Image />`: `alt={imageAlt}`, `title={imageAlt}`, keep `loading="eager"`.
- [x] **Components: Update `ContentMedia.astro`**:
    - [x] Add `imageAlt?: string` to `Props`.
    - [x] Update `<Image />` (both instances): `alt={imageAlt}`, `title={imageAlt}`, `loading="lazy"`.
- [x] **Components: Update `Avatar.astro`**:
    - [x] Update `<Image />`: `alt={title}`, `title={title}`, `loading="lazy"`.

# media-optimization Specification

## Purpose
TBD - created by archiving change optimize-media-assets. Update Purpose after archive.
## Requirements
### Requirement: Remote Blog Images SHOULD be optimized by Astro
The project MUST optimize remote images served on the blog pages using Astro's image processing.

#### Scenario: Configured Image Domains
Given a remote image domain is required for optimization
When `astro.config.mjs` is configured
Then it MUST include `image: { domains: ['services.darideveloper.com'] }`

#### Scenario: Optimized Blog List view
Given a user views the blog list page at `src/pages/blog/[...page].astro`
When a post card is rendered
Then it MUST use `<Image />` from `astro:assets` instead of `<img>`
And it MUST specify `width` and `height` to allow proper resizing

### Requirement: Local Project Images MUST be optimized by Astro
Local project assets MUST be processed by the build pipeline for optimal delivery.

#### Scenario: Migrated Asset Location
Given project images are currently in `public/projects/`
When implementing this change
Then all images MUST be moved to `src/assets/projects/`

#### Scenario: Updated Content Collection Schema
Given the `projects` collection in `src/content.config.ts`
When defining the schema
Then `featuredImage` MUST use the `image()` helper instead of `z.string()`

#### Scenario: Relative paths in Frontmatter
Given a project file in `src/content/projects/*.mdx`
When referring to its `featuredImage`
Then it MUST use a relative path (e.g., `../../assets/projects/my-project/hero.webp`)

### Requirement: PageHeader SHOULD support both Remote and Local Optimized Images
The `PageHeader` component MUST be type-safe for both processed asset objects and remote URL strings.

#### Scenario: Flexible PageHeader Props
Given the `PageHeader` component in `src/components/PageHeader.astro`
When defining `Props`
Then `featuredImage` MUST accept `string | ImageMetadata | undefined`

---


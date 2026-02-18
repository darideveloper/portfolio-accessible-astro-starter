## ADDED Requirements

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

## Detailed Design & Code Snippets

### 1. Astro Configuration
Modify `astro.config.mjs` to allow optimization of the remote blog image domain.

```javascript
// src/astro.config.mjs
export default defineConfig({
  // ... existing integrations
  image: {
    domains: ['services.darideveloper.com'],
  },
  // ...
})
```

### 2. Content Collection Schema
Update `src/content.config.ts` to leverage Astro's `image()` helper.

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    featuredImage: image(), // Changed from z.string().optional()
  }),
});

export const collections = { projects };
```

### 3. Component Updates

#### `src/components/PageHeader.astro`
Update the interface to handle `ImageMetadata`.

```astro
---
// src/components/PageHeader.astro
import { Image } from 'astro:assets'
import type { ImageMetadata } from 'astro'

interface Props {
  // ...
  featuredImage?: string | ImageMetadata
  // ...
}
---
<!-- ... -->
{
  featuredImage && (
    <div class='featured-image-container mb-8'>
      <Image
        src={featuredImage}
        alt=''
        width={1280}
        height={720}
        class='h-auto w-full rounded-lg object-cover'
      />
    </div>
  )
}
<!-- ... -->
```

#### `src/components/FeaturedProjects.astro` & `src/pages/portafolio/[...page].astro`
Replace `<img>` with `<Image />`.

```astro
<!-- For local assets (projects) -->
<Image
  src={project.data.featuredImage}
  alt={project.data.title}
  width={800}
  height={450}
  class='h-full w-full object-cover ...'
  loading='lazy'
/>
```

#### `src/pages/blog/[...page].astro`
Replace `<img>` with `<Image />`.

```astro
<!-- For remote assets (blog) -->
<Image
  src={post.featuredImage}
  alt={post.title}
  width={800}
  height={450}
  class='h-full w-full object-cover ...'
  loading='lazy'
/>
```

### 4. Content Migration Example
Frontmatter in `src/content/projects/xymale-barbershop.mdx` should be updated:

```markdown
---
title: XYMale Barbershop
...
featuredImage: ../../assets/projects/xymale-barbershop/01-xymale-barbershop-homepage-hero.webp
---
```

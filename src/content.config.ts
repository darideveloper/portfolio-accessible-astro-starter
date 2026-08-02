// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

// 2. Import loader(s)
import { glob } from 'astro/loaders'
import { hybridBlogLoader } from './lib/blog'

// 3. Define your collection(s)
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      featuredImage: image(),
    }),
})

const blog = defineCollection({
  loader: hybridBlogLoader(),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string(),
      keywords: z.string().optional(),
      tags: z.array(z.string()).default([]),
      featuredImage: z.union([image(), z.string().url()]),
      lang: z.string().default('es'),
      status: z.string().default('published'),
      draft: z.boolean().default(false),
      relatedPost: z.string().optional(),
      source: z.enum(['local', 'api']).default('local'),
    }),
})

// 4. Export a single `collections` object to register you collection(s)
export const collections = { projects, blog }

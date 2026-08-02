import { glob } from 'astro/loaders'
import type { Loader } from 'astro/loaders'
import { getCollection } from 'astro:content'
import { getPosts, normalizeApiPost } from './api'

/**
 * Hybrid loader for the `blog` collection.
 *
 * Loads local MDX posts from the blog content folder via Astro's glob loader,
 * then merges API posts on top. Local posts win over API posts with
 * the same id (slug / filename), enabling one-post-at-a-time migration.
 *
 * API entries are normalized to the same schema, rendered through the content
 * pipeline's `renderMarkdown`, and stored as pre-rendered HTML so both sources
 * render via the same `<Content />` component.
 */
export function hybridBlogLoader(): Loader {
  const globLoader = glob({ pattern: '**/*.mdx', base: './src/content/blog' })

  return {
    name: 'hybrid-blog-loader',
    async load(context) {
      await globLoader.load(context)

      try {
        const posts = await getPosts('es')
        for (const post of posts) {
          const id = post.slug
          if (context.store.has(id)) continue

          const data = await context.parseData({
            id,
            data: normalizeApiPost(post),
          })

          if (data.status === 'draft') continue

          context.store.set({
            id,
            data,
            body: post.content,
            rendered: await context.renderMarkdown(post.content),
          })
        }
      } catch (error) {
        if (import.meta.env.API_STRICT_MODE === 'true' || import.meta.env.API_STRICT_MODE === true) {
          throw error
        }
        context.logger.warn(
          `[blog] API unavailable: ${error instanceof Error ? error.message : String(error)}. Using local posts only.`,
        )
      }
    },
  }
}

/**
 * Draft filtering: in production builds, exclude posts with `draft: true`.
 * In development, drafts stay visible for previewing.
 */
const publishedOnly = (entry: { data: { draft?: boolean } }) =>
  import.meta.env.PROD ? !entry.data.draft : true

/**
 * Get all published blog posts sorted by `publishDate` descending (newest first).
 */
export async function getBlogPosts() {
  const posts = await getCollection('blog', publishedOnly)
  return posts.sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime(),
  )
}

/**
 * Get all blog posts for routing, honoring draft filtering in production.
 */
export async function getBlogPostsForRoutes() {
  return getCollection('blog', publishedOnly)
}

/**
 * One-off bootstrap script: export the current API blog posts as local MDX
 * files in src/content/blog/ and download their banner images into
 * src/assets/blog/.
 *
 * Usage:
 *   API_BASE=... API_TOKEN=... node scripts/export-blog-from-api.mjs
 *
 * The script writes one .mdx file per post (slug = filename), downloads each
 * banner image locally, and rewrites featuredImage to the local path so the
 * hybrid blog renders optimized local images after migration.
 */
import { mkdir, writeFile, readdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const blogDir = path.join(root, 'src', 'content', 'blog')
const imagesDir = path.join(root, 'src', 'assets', 'blog')

const API_BASE = process.env.API_BASE || 'https://services.darideveloper.com'
const API_TOKEN = process.env.API_TOKEN
const LANG = process.env.BLOG_LANG || 'es'

async function downloadImage(url, filename) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Image download failed (${response.status}): ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(path.join(imagesDir, filename), buffer)
}

function toSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function frontmatter(post, imageFile) {
  const lines = [
    '---',
    `title: '${post.title}'`,
    `description: '${post.description}'`,
    `publishDate: ${post.created_at ? new Date(post.created_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}`,
  ]
  if (post.updated_at) lines.push(`updatedDate: ${new Date(post.updated_at).toISOString().slice(0, 10)}`)
  lines.push(`author: '${post.author}'`)
  if (post.keywords) lines.push(`keywords: '${post.keywords}'`)
  lines.push(`tags: [${post.keywords ? post.keywords.split(',').map((t) => `'${t.trim()}'`).join(', ') : ''}]`)
  lines.push(`featuredImage: ../../assets/blog/${imageFile}`)
  lines.push(`lang: '${post.lang || 'es'}'`)
  lines.push(`status: '${post.status || 'published'}'`)
  lines.push('draft: false')
  lines.push('---')
  return lines.join('\n')
}

async function main() {
  if (!API_TOKEN) {
    console.warn('API_TOKEN not set; continuing without Authorization header')
  }

  const headers = { 'Accept-Language': LANG }
  if (API_TOKEN) headers.Authorization = `Token ${API_TOKEN}`

  const response = await fetch(`${API_BASE}/api/posts/?details=true`, { headers })
  if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`)
  const { results } = await response.json()

  if (!existsSync(imagesDir)) await mkdir(imagesDir, { recursive: true })

  // Clear existing generated images to avoid stale files
  for (const file of await readdir(imagesDir)) {
    if (!file.startsWith('generated-')) continue
    await rm(path.join(imagesDir, file), { force: true })
  }

  for (const post of results) {
    const slug = toSlug(post.slug || post.title)
    const imageFile = `generated-${slug}-${post.id}.jpg`

    let imagePath = null
    if (post.banner_image_url) {
      try {
        await downloadImage(post.banner_image_url, imageFile)
        imagePath = imageFile
        console.log(`downloaded image: ${imageFile}`)
      } catch (error) {
        console.warn(`failed to download banner for ${slug}: ${error.message}`)
      }
    }

    const md = `${frontmatter(post, imagePath ?? 'accessible-components.webp')}\n\n${post.content ?? ''}\n`
    const filePath = path.join(blogDir, `${slug}.mdx`)
    await writeFile(filePath, md)
    console.log(`wrote ${filePath}`)
  }

  console.log(`\nExported ${results.length} posts to ${blogDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

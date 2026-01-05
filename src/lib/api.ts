import { marked } from 'marked'

export interface Post {
    id: number
    title: string
    slug: string
    status: string
    lang: string
    banner_image_url: string
    description: string
    keywords: string
    author: string
    content: string
    related_post: string
    created_at: string
    updated_at: string
}

const API_BASE = import.meta.env.API_BASE || 'https://services.darideveloper.com'
const API_TOKEN = import.meta.env.API_TOKEN || import.meta.env.PUBLIC_API_TOKEN
console.log({ API_BASE, API_TOKEN })

if (!API_TOKEN) {
    console.warn('API_TOKEN is not defined in environment variables')
}

/**
 * Fetch posts from the API
 * @param lang - Language code (default: 'es')
 * @returns Promise<Post[]>
 */
export async function getPosts(lang: string = 'es'): Promise<Post[]> {
    const customHeaders = new Headers()
    customHeaders.append('Accept-Language', lang)
    if (API_TOKEN) {
        customHeaders.append('Authorization', `Token ${API_TOKEN}`)
    }

    const requestOptions = {
        method: 'GET',
        headers: customHeaders,
        redirect: 'follow' as RequestRedirect,
    }

    try {
        const response = await fetch(`${API_BASE}/api/posts/?details=true`, requestOptions)
        console.log(response)
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        console.log(result?.results)
        return result?.results as Post[]
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
}

/**
 * Fetch a single post by slug
 * Note: The current API endpoint returns all posts, so we filter locally for now.
 * If there's a specific endpoint for single posts, it should be used here.
 */
export async function getPostBySlug(slug: string, lang: string = 'es'): Promise<Post | undefined> {
    const posts = await getPosts(lang)
    return posts.find((p) => p.slug === slug)
}

/**
 * Convert Markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
    return marked.parse(markdown) as string
}

export interface ApiPost {
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
    related_post: string | null
    created_at: string
    updated_at: string
}

/**
 * Normalized blog post shape, mirroring the `blog` content collection schema
 * so API and local MDX posts share the same structure.
 */
export interface BlogPostData {
    title: string
    description: string
    publishDate: string
    updatedDate?: string
    author: string
    keywords?: string
    tags: string[]
    featuredImage: string
    lang: string
    status: string
    draft: boolean
    relatedPost?: string
    source: 'local' | 'api'
}

const API_BASE = import.meta.env.API_BASE || 'https://services.darideveloper.com'
const API_TOKEN = import.meta.env.API_TOKEN || import.meta.env.PUBLIC_API_TOKEN

if (!API_TOKEN) {
    console.warn('API_TOKEN is not defined in environment variables')
}

/**
 * Fetch posts from the API
 * @param lang - Language code (default: 'es')
 * @returns Promise<ApiPost[]>
 * @throws when the API request fails or returns a non-2xx response
 */
export async function getPosts(lang: string = 'es'): Promise<ApiPost[]> {
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

    const response = await fetch(`${API_BASE}/api/posts/?details=true`, requestOptions)
    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
    }
    const result = await response.json()
    return result?.results as ApiPost[]
}

/**
 * Normalize an API post into the shared blog schema shape
 */
export function normalizeApiPost(post: ApiPost): BlogPostData {
    const tags = post.keywords
        ? post.keywords
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
        : []

    return {
        title: post.title,
        description: post.description,
        publishDate: post.created_at,
        updatedDate: post.updated_at || undefined,
        author: post.author,
        keywords: post.keywords || undefined,
        tags,
        featuredImage: post.banner_image_url,
        lang: post.lang || 'es',
        status: post.status || 'published',
        draft: false,
        relatedPost: post.related_post || undefined,
        source: 'api',
    }
}

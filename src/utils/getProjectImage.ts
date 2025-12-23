/**
 * Get the featured image for a project
 *
 * This utility function provides a scalable way to manage project images:
 * - Frontmatter `featuredImage` field (required)
 *
 * @param projectId - The project ID (e.g., 'xymale-barbershop')
 * @param projectData - Project data object with featuredImage field from frontmatter
 * @returns The path to the featured image
 *
 * @example
 * ```ts
 * // Project with frontmatter featuredImage (required)
 * getProjectFeaturedImage('xymale-barbershop', { featuredImage: '/projects/xymale-barbershop/hero.webp' })
 * // Returns: '/projects/xymale-barbershop/hero.webp'
 * ```
 */
export function getProjectFeaturedImage(
    projectId: string,
    projectData?: { featuredImage?: string }
): string {
    // All projects must have featuredImage in frontmatter
    if (projectData?.featuredImage) {
        return projectData.featuredImage
    }

    // Fallback: warn if no image specified
    console.warn(`Project ${projectId} is missing featuredImage in frontmatter`)
    return ''
}


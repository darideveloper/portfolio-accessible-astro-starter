/**
 * Get the featured image for a project
 *
 * This utility function provides a scalable way to manage project images:
 * - Frontmatter `featuredImage` field (highest priority)
 * - Projects with custom images are defined in the `projectsWithCustomImages` map (legacy)
 * - Projects without custom images fall back to generic placeholder images
 *
 * @param projectId - The project ID (e.g., 'xymale-barbershop')
 * @param projectData - Optional project data object with featuredImage field from frontmatter
 * @param fallbackIndex - Index for fallback generic images (0-5), used when project has no custom image
 * @returns The path to the featured image
 *
 * @example
 * ```ts
 * // Project with frontmatter featuredImage (recommended)
 * getProjectFeaturedImage('xymale-barbershop', { featuredImage: '/projects/xymale/hero.webp' }, 0)
 * // Returns: '/projects/xymale/hero.webp'
 *
 * // Project with custom image in map (legacy)
 * getProjectFeaturedImage('xymale-barbershop', undefined, 0)
 * // Returns: '/projects/xymale-barbershop/01-xymale-barbershop-homepage-hero.webp'
 *
 * // Project without custom image (uses generic)
 * getProjectFeaturedImage('project-01', undefined, 2)
 * // Returns: '/projects/project-image-3.png'
 * ```
 */
export function getProjectFeaturedImage(
    projectId: string,
    projectData?: { featuredImage?: string },
    fallbackIndex: number = 0
): string {
    // Generic placeholder images (fallback for projects without custom images)
    const genericImages = [
        '/projects/project-image-1.png',
        '/projects/project-image-2.png',
        '/projects/project-image-3.png',
        '/projects/project-image-4.png',
        '/projects/project-image-5.png',
        '/projects/project-image-6.png',
    ]

    // Map of projects with custom featured images (legacy support)
    // Prefer using frontmatter featuredImage field instead
    const projectsWithCustomImages: Record<string, string> = {
        'xymale-barbershop': '/projects/xymale-barbershop/01-xymale-barbershop-homepage-hero.webp',
        // Add more projects here as needed (legacy approach):
        // 'project-02': '/projects/project-02/hero.webp',
        // 'another-project': '/projects/another-project/featured-image.webp',
    }

    // Priority order:
    // 1. Frontmatter featuredImage (highest priority)
    // 2. Custom image map (legacy)
    // 3. Generic placeholder (lowest priority)
    if (projectData?.featuredImage) {
        return projectData.featuredImage
    }

    return projectsWithCustomImages[projectId] ?? genericImages[fallbackIndex % genericImages.length]
}


/**
 * Get post image path from /public/posts/
 *
 * Returns string paths to images in the public folder
 *
 * @param index - Index of the image (0-5), defaults to 0
 * @returns String path to the post image
 */
const postImages = [
  '/posts/post-image-1.png',
  '/posts/post-image-2.png',
  '/posts/post-image-3.png',
  '/posts/post-image-4.png',
  '/posts/post-image-5.png',
  '/posts/post-image-6.png',
]

/**
 * Get a post image path by index (0-5)
 * @param index - Index of the image (0-5), defaults to 0
 * @returns String path to the post image
 */
export function getPostImage(index: number = 0): string {
  return postImages[index % postImages.length]
}

/**
 * Get all post image paths
 * @returns Array of all post image paths
 */
export function getAllPostImages(): string[] {
  return postImages
}


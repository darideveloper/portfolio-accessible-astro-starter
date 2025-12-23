/**
 * Get imported post image for optimization
 *
 * Returns imported image objects from src/assets/images/posts/
 * These are automatically optimized by Astro for better SEO and performance
 */
import postImage1 from '@assets/images/posts/post-image-1.png'
import postImage2 from '@assets/images/posts/post-image-2.png'
import postImage3 from '@assets/images/posts/post-image-3.png'
import postImage4 from '@assets/images/posts/post-image-4.png'
import postImage5 from '@assets/images/posts/post-image-5.png'
import postImage6 from '@assets/images/posts/post-image-6.png'

const postImages = [postImage1, postImage2, postImage3, postImage4, postImage5, postImage6]

/**
 * Get a post image by index (0-5)
 * @param index - Index of the image (0-5), defaults to 0
 * @returns Imported image object optimized by Astro
 */
export function getPostImage(index: number = 0) {
  return postImages[index % postImages.length]
}

/**
 * Get all post images
 * @returns Array of all imported post images
 */
export function getAllPostImages() {
  return postImages
}


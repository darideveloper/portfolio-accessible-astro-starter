# Tasks: Optimize Core Performance

## Checklist

- [x] **Cache Policy Implementation**
  - [x] Create `public/_headers` (Netlify/Cloudflare/Vercel standard) with long-lived cache rules for `/_astro/*` and short/medium for others.
  - [x] Create `vercel.json` (if not exists) to ensure headers are applied if deployed there.

- [x] **Font Optimization**
  - [x] Modify `src/assets/scss/base/_font.scss`.
  - [x] Add `font-display: swap;` to all `@font-face` blocks.

- [x] **Image Optimization: Logo**
  - [x] Move `public/logo-smooth-software-solutions-desarrollo-web-3s.webp` to `src/assets/images/`.
  - [x] Update `src/components/Logo.astro` to use `astro:assets` `Image` component with the imported image.

- [x] **Image Optimization: Layout Images**
  - [x] Update `src/components/ContentMedia.astro` to accept `ImageMetadata` or enforce dimensions.
  - [x] Refactor usages in `index.astro` to pass imported images from `src/assets` instead of path strings (where possible) to utilize Astro's image optimization.
  - [x] Ensure `width` and `height` are present for all `<img>` tags if `Image` component is not used.

- [x] **Image Optimization: Avatars**
  - [x] Update `src/components/Avatar.astro` to use `astro:assets` `Image` optional. 
    <!-- Note: Avatars might be dynamic. If static imports are hard, ensure width/height props are strictly passed. -->
  - [x] Ensure explicit dimensions are rendered.

- [x] **Render Performance: Animations**
  - [x] Extract GSAP code from `src/pages/index.astro` to a dedicated script `src/scripts/landing-animations.js` (or keep inline but optimize).
  - [x] Optimize GSAP logic to use `requestAnimationFrame` or `batch` reads/writes if possible.
  - [x] Ensure `markers: import.meta.env.MODE === 'development'` is kept but ensure overhead is low in prod.
  - [x] investigate `ClientRouter` blocking; verify if `prefetch` or other settings can help, but primarily focus on the script execution time.

- [x] **Validation**
  - [x] Run production build `npm run build`.
  - [x] Audit with Lighthouse (or `npm run preview` and check network).

# Tasks: Optimize Core Performance

## Checklist

- [ ] **Cache Policy Implementation**
  - [ ] Create `public/_headers` (Netlify/Cloudflare/Vercel standard) with long-lived cache rules for `/_astro/*` and short/medium for others.
  - [ ] Create `vercel.json` (if not exists) to ensure headers are applied if deployed there.

- [ ] **Font Optimization**
  - [ ] Modify `src/assets/scss/base/_font.scss`.
  - [ ] Add `font-display: swap;` to all `@font-face` blocks.

- [ ] **Image Optimization: Logo**
  - [ ] Move `public/logo-smooth-software-solutions-desarrollo-web-3s.webp` to `src/assets/images/`.
  - [ ] Update `src/components/Logo.astro` to use `astro:assets` `Image` component with the imported image.

- [ ] **Image Optimization: Layout Images**
  - [ ] Update `src/components/ContentMedia.astro` to accept `ImageMetadata` or enforce dimensions.
  - [ ] Refactor usages in `index.astro` to pass imported images from `src/assets` instead of path strings (where possible) to utilize Astro's image optimization.
  - [ ] Ensure `width` and `height` are present for all `<img>` tags if `Image` component is not used.

- [ ] **Image Optimization: Avatars**
  - [ ] Update `src/components/Avatar.astro` to use `astro:assets` `Image` optional. 
    <!-- Note: Avatars might be dynamic. If static imports are hard, ensure width/height props are strictly passed. -->
  - [ ] Ensure explicit dimensions are rendered.

- [ ] **Render Performance: Animations**
  - [ ] Extract GSAP code from `src/pages/index.astro` to a dedicated script `src/scripts/landing-animations.js` (or keep inline but optimize).
  - [ ] Optimize GSAP logic to use `requestAnimationFrame` or `batch` reads/writes if possible.
  - [ ] Ensure `markers: import.meta.env.MODE === 'development'` is kept but ensure overhead is low in prod.
  - [ ] investigate `ClientRouter` blocking; verify if `prefetch` or other settings can help, but primarily focus on the script execution time.

- [ ] **Validation**
  - [ ] Run production build `npm run build`.
  - [ ] Audit with Lighthouse (or `npm run preview` and check network).

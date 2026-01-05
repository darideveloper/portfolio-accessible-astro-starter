# Design: Core Performance Optimization

## Analysis of Issues

### 1. Cache Policy / TTL
**Issue**: Static assets (JS, CSS, Fonts, Images) are served without efficient cache policies, leading to 210 KiB of unnecessary re-transfers on repeat visits.
**Solution**: Configure the hosting environment or build output to include long-lived cache headers (`Cache-Control: public, max-age=31536000, immutable`) for hashed assets (Astro's `_astro/` folder) and appropriate strategies for other static files.

### 2. Render Blocking resources
**Issue**: Initial render is delayed by blocking CSS and JS requests (~900ms).
**Solution**:
- Ensure critical CSS is inlined (Astro default, verify configuration).
- Postpone non-critical JS.
- Verify `ClientRouter` impact.

### 3. Forced Reflows
**Issue**: JavaScript queries geometric properties (likely `offsetWidth`/`height`) immediately after style invalidation.
**Trace**: `index.astro` scripts (likely GSAP ScrollTrigger).
**Solution**:
- Optimize GSAP usage (batch reads/writes).
- Ensure DOM is stable before initializing heavy animations.
- Use `requestAnimationFrame` where appropriate if manual calculations are done.

### 4. LCP (Largest Contentful Paint)
**Issue**: 2.5s element render delay.
**Solution**:
- Preload the LCP image (Hero image).
- Ensure text is visible while fonts load (`font-display: swap`).
- Reduce critical path latency by prioritizing the request for the Hero image.

### 5. Image & Asset Delivery
**Issue**:
- Images lack explicit `width` and `height` causing CLS.
- Images are larger than displayed dimensions (5KiB savings, but indicative of a systematic issue).
**Solution**:
- Use Astro's `<Image />` component which automatically handles optimized formats and dimensions.
- Explicitly set `width` and `height` on standard `<img>` tags if Astro component cannot be used.

### 6. Unused JavaScript
**Issue**: 20 KiB potential savings in `index.astro` JS.
**Solution**:
- Dynamically import heavy libraries (like GSAP) only when needed, or ensure they are tree-shaken correctly.
- Review `client:*` directives.

## Architecture

No major architectural changes. This is primarily a configuration and component-level optimization refactor.

### Font Loading strategy
Modify `src/assets/scss/base/_font.scss` to include `font-display: swap;` in `@font-face` blocks.

### Image Component Strategy
Refactor `ContentMedia`, `Hero`, `Avatar` to use `astro:assets` where possible, or strictly enforce dimension props.

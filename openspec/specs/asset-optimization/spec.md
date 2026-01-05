# asset-optimization Specification

## Purpose
TBD - created by archiving change optimize-core-performance. Update Purpose after archive.
## Requirements
### Requirement: Font Display Strategy
**Requirement:** All custom fonts MUST use the `swap` loading strategy to ensure text remains visible during font download.
#### Scenario:
Given the site is loading on a slow connection,
When the CSS for fonts is parsed,
Then the `@font-face` declaration MUST include `font-display: swap;`.

### Requirement: Explicit Image Dimensions
**Requirement:** All image elements MUST have explicit width and height attributes (or aspect-ratio styles) to prevent Cumulative Layout Shift (CLS).
#### Scenario:
Given the page is loading,
When the browser parses an `<img>` tag (e.g., for the logo, or content media),
Then the tag MUST have `width` and `height` attributes defined matching the aspect ratio of the image.

### Requirement: Image Optimization
**Requirement:** Images MUST be served in optimized formats (WebP/AVIF) and appropriate sizes.
#### Scenario:
Given the Hero section is rendered,
When the browser requests the hero image,
Then the image SHOULD be a responsive `srcset` or an optimized WebP served by Astro's Image component.


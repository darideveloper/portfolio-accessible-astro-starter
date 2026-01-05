# Optimize Core Performance

## Background
A recent Lighthouse performance audit revealed several opportunities for improvement in the application's core performance metrics. Key issues include inefficiencies in cache policies for static assets, render-blocking resources, layout shifts caused by un-dimensioned images, and significant main-thread blocking time due to JavaScript execution and forced reflows.

## Goal
The goal of this change is to implement a comprehensive set of performance optimizations to address the identified issues, specifically targeting:
- **Cache Policies**: Implementing efficient cache lifetimes for static assets.
- **Asset Optimization**: Optimizing font loading and image serving (dimensions, formats).
- **Render Performance**: Reducing render-blocking resources and layout thrashing (forced reflows) caused by animations.
- **LCP & CLS**: Improving Core Web Vitals, specifically Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).

## Scope
- Configuration of cache headers (via appropriate config/middleware).
- Optimization of global font styles (`font-display: swap`).
- Updates to `Image` components and usage to ensure explicit dimensions.
- review and optimization of GSAP animation logic to reduce forced reflows.
- Deferred loading of non-critical JavaScript.

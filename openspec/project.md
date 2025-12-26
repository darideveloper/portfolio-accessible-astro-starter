# Project Context

## Purpose
To provide a production-ready, SEO-optimized, and highly accessible starter template for building inclusive websites using Astro. The project adheres to WCAG 2.2 AA guidelines and the European Accessibility Act (EAA), ensuring a premium experience for all users including those relying on assistive technologies.

## Tech Stack
- **Framework**: Astro 5.13+
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, SCSS (Sass)
- **Content**: MDX, Markdown
- **Animation**: GSAP
- **Icons**: Lucide (via @iconify-json/lucide & astro-icon)

## Project Conventions

### Code Style
- **Linting & Formatting**: ESLint (strictly enforcing `jsx-a11y` rules) and Prettier (with Astro & Tailwind plugins).
- **Type Safety**: strict TypeScript usage throughout.
- **CSS**: Tailwind CSS 4 logic with utility classes. Logical properties preferred. SCSS available for custom utilities if strictly necessary.
- **Semantic HTML**: Mandatory use of semantic landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<h1>`-`<h6>` hierarchy).
- **Accessibility**: 
  - Ensure sufficient color contrast (using OKLCH system/tools).
  - Manage focus states clearly (outline focus indicators).
  - Use `.sr-only` for visually hidden but screen-reader accessible text.
  - Reduced motion preferences must be respected.

### Architecture Patterns
- **Directory Structure**: Standard Astro structure (`src/pages`, `src/layouts`, `src/components`, `src/content`).
- **Content Collections**: Use `src/content` for data-driven content like "projects" or "blog posts" with strict schema validation.
- **Components**: 
  - Prefer stateless `.astro` components.
  - Use `accessible-astro-components` for complex accessible UI patterns (accordion, modal, etc.).
  - Reusable logic in `src/utils` or `src/lib`.

### Testing Strategy
- **Accessibility**: Regular audits against WCAG 2.2 AA. 
- **Performance**: Monitor Lighthouse/PageSpeed scores.
- **Validation**: Form verification using built-in browser constraints and custom JS validation.

### Git Workflow
- Standard Pull Request workflow.
- Ensure linting passes before committing.

## Domain Context
- **Web Accessibility (A11y)**: Deep understanding of WCAG principles (Perceivable, Operable, Understandable, Robust) is essential.
- **SEO**: Meta tags, open graph data, and semantic structure are critical for this project's goals.

## Important Constraints
- **Zero-Js fallback**: Core content should remain accessible without JavaScript where possible.
- **Browser Support**: Modern browsers, but with careful degradation for older agents.
- **Performance**: Avoid heavy client-side bundles; prioritize static generation (SSG).

## External Dependencies
- **accessible-astro-components**: Core accessible UI patterns.
- **@astrojs/sitemap**: Automatic sitemap generation.
- **@astrojs/mdx**: For content rendering.
- **gsap**: For GSAP based animations.

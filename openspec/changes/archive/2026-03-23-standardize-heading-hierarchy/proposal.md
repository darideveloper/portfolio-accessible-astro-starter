---
change-id: standardize-heading-hierarchy
title: Standardize Heading Hierarchy for SEO and Accessibility
description: Optimizes the heading structure across the portfolio and tag pages by lowering utility headings and ensuring unique, keyword-rich H1s for tag-specific views.
author: Gemini CLI
status: proposed
---

# Proposal: Standardize Heading Hierarchy

## Problem Statement
The current heading structure in several portfolio-related pages has SEO and accessibility issues:
- **Heading Levels**: Utility headings like "Etiquetas" (Tags) and "Compartir este proyecto" (Share this project) are currently at the `h2` level. This puts them at the same structural importance as the main content sections (like project titles in lists or project descriptions in single pages), which can confuse search engines and screen reader users about the primary focus of the page.
- **Dynamic H1s**: Ensure that tag-specific portfolio pages use unique, descriptive H1s that include the tag name to prevent keyword cannibalization and improve SEO relevance.

## Proposed Solution
- **Lower Utility Headings**: Change the heading level of utility and secondary sections from `h2` to `h3`. This establishes a clearer hierarchy where the main page title is `h1`, primary content sections are `h2`, and secondary utilities are `h3`.
- **Refine Tag H1s**: Ensure `src/pages/portafolio/tag/[tag]/[...page].astro` uses a dynamic H1 that explicitly includes the tag name (e.g., "Portafolio: Web Development") instead of generic titles.

## Scope
- `src/pages/portafolio/[...page].astro`
- `src/pages/portafolio/tag/[tag]/[...page].astro`
- `src/pages/portafolio/[project].astro`

## Out of Scope
- Changes to the home page or other non-portfolio pages unless structural issues are found during implementation.
- Modification of MDX content (which already follows a correct H2 -> H3 hierarchy).

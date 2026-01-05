# Enhance SEO Metadata Implementation

## Goal
Implement a robust and comprehensive SEO metadata system across the application. This includes support for JSON-LD structured data, Twitter Cards, Canonical URLs, and improved Open Graph tags to maximize search engine visibility and social media engagement.

## Motivation
The current metadata implementation is basic and lacks key features required for modern SEO best practices. Without JSON-LD, search engines may not fully understand the site's structure. Missing Twitter Cards and Canonical links reduce the effectiveness of social sharing and consolidation of link equity.

## Scope
- **Components:** Update `SiteMeta.astro`.
- **Layouts:** Update `DefaultLayout.astro` and `MarkdownLayout.astro`.
- **Features:**
    - JSON-LD (Organization and BlogPosting schemas).
    - Twitter Card metadata.
    - Canonical URL generation.
    - Enhanced Open Graph tags.
    - Robust `robots` and `keywords` support.

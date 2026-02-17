# seo-optimization Specification

## Purpose
TBD - created by archiving change enhance-seo-metadata. Update Purpose after archive.
## Requirements
### Requirement: Canonical URL
- All pages MUST include a `<link rel="canonical" href="...">` tag.
- The canonical URL MUST point to the current page's preferred URL (handling trailing slashes consistently).

#### Scenario: Home page canonical
Given a user visits the home page
Then the head MUST contain a canonical link to `https://software3s.com/` (or configured site URL).

### Requirement: JSON-LD Structured Data
- All pages MUST include a `<script type="application/ld+json">` tag with structured data.
- The `Organization` schema MUST be present on the home page (and optionally others).
- Pages of type `article` (blog posts) MUST include the `BlogPosting` schema.

#### Scenario: Organization Schema
Given a user visits any page
Then the source MUST contain a JSON-LD script for `Organization` or `WebSite`.

#### Scenario: Blog Post Schema
Given a user visits a blog post
Then the source MUST contain a JSON-LD script defining a `BlogPosting`.

### Requirement: Twitter Cards
- All pages MUST include `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` tags.
- The `twitter:card` type SHOULD be `summary_large_image`.

#### Scenario: Twitter Tags Presence
Given a user views the page source
Then `twitter:card` meta tag MUST be present with value `summary_large_image`.

### Requirement: Open Graph Tags
- `og:type` MUST be dynamic: `website` for general pages, `article` for blog posts.
- `og:image` MUST include the full absolute URL.

#### Scenario: Dynamic OG Type
Given a blog post page
Then `og:type` MUST be `article`.


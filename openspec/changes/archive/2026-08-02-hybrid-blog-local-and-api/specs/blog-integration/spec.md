# blog-integration Delta

## MODIFIED Requirements

### Requirement: External Blog Content Fetching
The system SHALL fetch blog posts from the configured external API (via `API_BASE` env var) and merge them with local MDX posts into a single `blog` content collection. If the API is unreachable or returns an error during build, the system SHALL log a warning and continue the build with local posts only.

#### Scenario: Fetch Data
- **WHEN** the blog collection loader runs
- **THEN** it makes an authenticated GET request to `/api/posts/`
- **AND** sends the `Authorization` and `Accept-Language` headers
- **AND** merges the returned posts with local MDX posts, deduplicating by slug with local wins

#### Scenario: API unreachable during build
- **WHEN** the API request fails or returns a non-2xx response
- **THEN** the system logs a prominent warning
- **AND** the build continues with local posts only
- **AND** blog pages never silently compile with zero posts unless there are also no local posts

#### Scenario: API strict mode
- **WHEN** `API_STRICT_MODE=true` is set and the API request fails
- **THEN** the build fails loudly with the fetch error instead of falling back

### Requirement: Markdown Content Rendering
The system SHALL render the `content` field from the API (which is in Markdown) as semantic HTML using Astro's native content rendering pipeline, not `marked` or raw `set:html`. The rendered output SHALL be escaped and rendered by Astro's content pipeline; the system does not claim XSS sanitization beyond Astro's default markdown behavior.

#### Scenario: Render Post
- **WHEN** a user visits a single blog post page for an API-sourced post
- **THEN** the Markdown content is transformed into HTML by the loader's `renderMarkdown`
- **AND** displayed within the post layout through the same `<Content />` component used for local posts

### Requirement: Author and Metadata Display
The system SHALL display the specific author, publication date, and banner image for each post, whether sourced from the API or a local file, and SHALL pass them to the SEO metadata layer (JSON-LD, Open Graph).

#### Scenario: Metadata for API post
- **WHEN** an API post is displayed
- **THEN** the author name from the API is shown (not hardcoded)
- **AND** the `banner_image_url` is used for the cover image
- **AND** `publishDate`, `author`, `keywords`, and the featured image are passed to the page's SEO metadata

#### Scenario: Metadata for local post
- **WHEN** a local post is displayed
- **THEN** the author, `publishDate`, `keywords`, and `featuredImage` from frontmatter are shown
- **AND** passed to the page's SEO metadata with the same behavior as API posts

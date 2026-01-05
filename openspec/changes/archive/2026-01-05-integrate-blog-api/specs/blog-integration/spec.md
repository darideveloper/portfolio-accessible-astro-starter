## ADDED Requirements

### Requirement: External Blog Content Fetching
The system SHALL fetch blog posts from the configured external API (via `API_BASE` env var) instead of local or dummy data.

#### Scenario: Fetch Data
- **WHEN** the blog index or featured posts component loads
- **THEN** it makes an authenticated GET request to `/api/posts/`
- **AND** sends the `Authorization` and `Accept-Language` headers.

### Requirement: Markdown Content Rendering
The system SHALL render the `content` field from the API (which is in Markdown) as Semantic HTML.

#### Scenario: Render Post
- **WHEN** a user visits a single blog post page
- **THEN** the Markdown content is transformed into HTML
- **AND** displayed within the post layout safe from XSS (sanitized).

### Requirement: Author and Metadata Display
The system SHALL display the specific author, creation date, and banner image provided by the API for each post.

#### Scenario: Metadata
- **WHEN** a post is displayed
- **THEN** the author name from the API is shown (not hardcoded)
- **AND** the `banner_image_url` is used for the cover image.

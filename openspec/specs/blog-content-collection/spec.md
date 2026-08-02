# blog-content-collection Specification

## Purpose
Local blog posts authored as MDX files in `src/content/blog/`, managed through Astro Content Collections and rendered in parallel with API-sourced posts on the same blog pages.

## Requirements
### Requirement: Local Blog Content Collection
The system SHALL expose a `blog` content collection backed by a hybrid loader that merges local MDX posts from `src/content/blog/**/*.mdx` with posts fetched from the external blog API. The merged result SHALL be returned by `getCollection('blog')` with each entry carrying a `source` marker (`'local'` or `'api'`).

#### Scenario: Local post appears with API posts
- **WHEN** an MDX file exists in `src/content/blog/`
- **THEN** the collection includes that post as a `'local'` entry
- **AND** blog index, pagination, single-post page, and featured posts all render it alongside `'api'` entries

#### Scenario: No local posts
- **WHEN** `src/content/blog/` is empty
- **THEN** the collection contains only `'api'` entries
- **AND** blog pages behave exactly as before the change

### Requirement: Blog Post Schema Mirrors API
The `blog` collection schema SHALL define the fields: `title`, `description`, `publishDate` (date), `updatedDate` (date, optional), `author`, `keywords` (optional), `tags` (string array, default `[]`), `featuredImage` (image), `lang` (default `'es'`), `status` (default `'published'`), `draft` (boolean, default `false`), `relatedPost` (optional slug). The schema SHALL accept the normalized API fields so an API post and a local post share the same shape.

#### Scenario: Local post validates against schema
- **WHEN** a local MDX frontmatter contains title, description, publishDate, author, and featuredImage
- **THEN** the entry passes schema validation and is rendered
- **AND** missing optional fields fall back to their defaults

#### Scenario: API post normalized to same shape
- **WHEN** the API returns a post with `banner_image_url`, `created_at`, `updated_at`, and `keywords`
- **THEN** it is normalized to the same schema (`featuredImage`, `publishDate`, `updatedDate`, `tags` split from `keywords`)
- **AND** `source` is set to `'api'`

### Requirement: Local Post Overrides API Twin
When a local post and an API post share the same entry id (the API `slug`, which equals the local MDX filename), the local post SHALL win. The API twin SHALL be excluded from the collection, enabling one-post-at-a-time migration from the API to local files.

#### Scenario: Duplicate slug resolved locally
- **WHEN** an MDX file at `src/content/blog/my-post.mdx` (entry id `my-post`) and the API both return a post with id `my-post`
- **THEN** the collection contains only the local entry with `source: 'local'`
- **AND** the URL `/blog/my-post` serves the local content

#### Scenario: No duplicate slug
- **WHEN** a slug exists only in the API or only locally
- **THEN** the collection contains both entries unchanged

### Requirement: Draft and Status Filtering
The collection SHALL exclude entries with `draft: true` or `status: 'draft'` from all public pages, while still allowing them in development.

#### Scenario: Draft post hidden from public
- **WHEN** a local post has `draft: true`
- **THEN** it is not listed on the blog index or featured posts
- **AND** it is not reachable at its single-post URL

#### Scenario: Draft-status API post excluded
- **WHEN** an API post has `status: 'draft'`
- **THEN** the loader excludes it from the collection
- **AND** it is neither listed nor reachable at its single-post URL

### Requirement: Blog Post Ordering
The blog collection SHALL return entries ordered by `publishDate` descending, so the newest posts appear first on the blog index, pagination, and featured posts regardless of source.

#### Scenario: Newest post first
- **WHEN** the collection contains both API and local posts with different `publishDate` values
- **THEN** the entry with the most recent `publishDate` is first in the list used by the index and featured posts

### Requirement: Native Markdown Rendering
Local MDX posts SHALL be rendered with Astro's native content rendering via `render(entry)`. API post markdown SHALL be rendered by the loader using the content pipeline's `renderMarkdown` and stored as pre-rendered HTML, so both sources render through the same `<Content />` component with consistent prose styling.

#### Scenario: Local post renders MDX
- **WHEN** a user visits a single local post page
- **THEN** the MDX body is rendered as semantic HTML by `render(entry)`

#### Scenario: API post renders natively
- **WHEN** a user visits a single API post page
- **THEN** the API markdown is rendered by `render(entry)` from pre-rendered content
- **AND** no `marked` library or raw `set:html` is used

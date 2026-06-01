# Capability: Heading Optimization

## ADDED Requirements

### Requirement: Lower Level for Utility Headings
The heading level for secondary and utility sections like "Etiquetas", "Tags", and "Compartir este proyecto" MUST be `h3` instead of `h2`.

#### Scenario: Update Portfolio List
- **Given** I am on the portfolio list page (`/portafolio`)
- **When** I inspect the "Etiquetas" heading
- **Then** it SHOULD be an `h3` tag
- **And** it SHOULD maintain its current visual appearance (e.g., using `size='h5'`)

#### Scenario: Update Portfolio Tag Pages
- **Given** I am on a tag-specific portfolio page (`/portafolio/tag/[tag]`)
- **When** I inspect the "Tags" heading
- **Then** it SHOULD be an `h3` tag

#### Scenario: Update Single Project Page
- **Given** I am on a single project page (`/portafolio/[project]`)
- **When** I inspect the "Compartir este proyecto" heading
- **Then** it SHOULD be an `h3` tag

### Requirement: Dynamic and Unique H1s for Portfolio Tag Pages
Tag-specific portfolio pages MUST have unique H1s that explicitly include the tag name.

#### Scenario: Verify Tag H1
- **Given** I am on the "Web Development" tag page (`/portafolio/tag/web-development`)
- **When** I inspect the H1 tag
- **Then** it SHOULD be "Portafolio: Web Development" (or similar dynamic title)

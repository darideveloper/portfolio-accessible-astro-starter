# domain-references Specification

## Purpose
TBD - created by archiving change rebrand-smooth-solutions-to-dari-dev-team. Update Purpose after archive.
## Requirements
### Requirement: Site URL points to darideveloper.com
The astro.config.mjs SHALL set `site` to `https://darideveloper.com`.

#### Scenario: Site URL configured
- **WHEN** the site is built
- **THEN** the canonical URL SHALL use `https://darideveloper.com`

### Requirement: Contact email uses darideveloper.com domain
All contact email addresses SHALL use `contact@darideveloper.com`.

#### Scenario: Email displayed on contact page
- **WHEN** a user visits the contact page
- **THEN** the displayed email SHALL be `contact@darideveloper.com`

#### Scenario: Email in legal pages
- **WHEN** a user visits aviso-legal, politica-privacidad, or configuracion-cookies pages
- **THEN** all email references SHALL use `contact@darideveloper.com`

### Requirement: WhatsApp pre-filled text uses new domain
The WhatsApp share link SHALL reference `darideveloper.com` in the pre-filled message text.

#### Scenario: WhatsApp link generated
- **WHEN** a user clicks the WhatsApp contact link
- **THEN** the pre-filled message SHALL contain `darideveloper.com`

### Requirement: API image domain allows darideveloper.com
The `image.domains` config in astro.config.mjs SHALL include `services.darideveloper.com`.

#### Scenario: Image domains configured
- **WHEN** the site processes remote images from `services.darideveloper.com`
- **THEN** the image service SHALL accept and optimize those images

### Requirement: Docker Compose SITE_URL default uses new domain
The `SITE_URL` default fallback in docker-compose.yml SHALL use `https://darideveloper.com`.

#### Scenario: Docker build without SITE_URL env
- **WHEN** `docker compose up` is run without `SITE_URL` environment variable
- **THEN** the default `SITE_URL` build arg SHALL be `https://darideveloper.com`

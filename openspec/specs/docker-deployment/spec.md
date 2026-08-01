# docker-deployment Specification

## Purpose
TBD - created by archiving change pnpm-docker-portless-workflow. Update Purpose after archive.
## Requirements
### Requirement: Multi-stage Docker build
A `Dockerfile` SHALL exist at the project root implementing a multi-stage build: Node.js build stage and nginx serve stage.

#### Scenario: Docker image builds successfully
- **WHEN** `docker build -t portfolio .` is run
- **THEN** the build SHALL complete without errors and produce a Docker image

#### Scenario: Build stage uses pnpm
- **WHEN** the Docker build runs the install step
- **THEN** it SHALL use `pnpm install --frozen-lockfile` (not npm)

#### Scenario: Serve stage uses nginx
- **WHEN** the Docker build completes the serve stage
- **THEN** the final image SHALL be based on `nginx:alpine` and contain the built site in `/usr/share/nginx/html`

### Requirement: Environment variable injection
The `Dockerfile` SHALL accept build-time arguments for `API_TOKEN`, `API_BASE`, and `SITE_URL`. These SHALL be passed as `ARG` and `ENV` pairs so they're available during `pnpm build`.

#### Scenario: Build args are passed
- **WHEN** `docker build --build-arg API_TOKEN=xyz --build-arg API_BASE=https://example.com --build-arg SITE_URL=https://software3s.com` is run
- **THEN** the Astro build SHALL have access to these values via `import.meta.env`

### Requirement: nginx configuration
An `nginx.conf` SHALL exist at the project root with proper cache headers for static assets: immutable caching for content-hashed `/_astro/*` assets, no-cache for HTML, and security headers.

#### Scenario: Static assets have immutable cache
- **WHEN** nginx serves a file from `/_astro/`
- **THEN** the response SHALL include `Cache-Control: public, max-age=31536000, immutable`

#### Scenario: HTML pages are not cached
- **WHEN** nginx serves an HTML page
- **THEN** the response SHALL include `Cache-Control: no-cache`

### Requirement: docker-compose orchestration
A `docker-compose.yml` SHALL exist at the project root allowing one-command build and run.

#### Scenario: Docker Compose starts the service
- **WHEN** `docker compose up --build` is run
- **THEN** the site SHALL be served on port 80 (or configured port) with all build args passed from environment

### Requirement: .dockerignore
A `.dockerignore` SHALL exist excluding `node_modules/`, `dist/`, `.git/`, `.env`, `*.md`, `.gitignore`, and other non-essential files from the Docker build context.

#### Scenario: Build context is minimal
- **WHEN** the Docker build runs
- **THEN** `node_modules/`, `dist/`, `.git/`, and `.env` SHALL NOT be sent to the Docker daemon

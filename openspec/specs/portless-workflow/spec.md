# portless-workflow Specification

## Purpose
TBD - created by archiving change pnpm-docker-portless-workflow. Update Purpose after archive.
## Requirements
### Requirement: Dev script wraps portless
The `dev` and `start` scripts in `package.json` SHALL invoke the Astro dev server through portless: `portless portfolio pnpm astro dev`.

#### Scenario: Dev server starts via portless
- **WHEN** a developer runs `pnpm dev`
- **THEN** portless SHALL start the Astro dev server and serve it at `https://portfolio.localhost`

### Requirement: Dynamic port assignment
`astro.config.mjs` SHALL read the `PORT` environment variable (injected by portless) and use it as the dev server port. If `PORT` is not set, it SHALL fall back to `4321`.

#### Scenario: Portless provides a port
- **WHEN** portless starts the Astro dev server
- **THEN** the server SHALL listen on the port assigned by portless (from `process.env.PORT`)

#### Scenario: No portless (fallback)
- **WHEN** `astro dev` is run directly without portless
- **THEN** the server SHALL listen on port 4321

### Requirement: Strict port binding
`astro.config.mjs` SHALL set `strictPort: true` so the dev server fails immediately if the assigned port is unavailable (rather than silently picking a different one).

#### Scenario: Port conflict fails fast
- **WHEN** the assigned port is already in use
- **THEN** the dev server SHALL exit with an error rather than falling back to a different port

### Requirement: Dynamic site URL
`astro.config.mjs` SHALL read `process.env.SITE_URL` for the `site` configuration value. If unset, it SHALL fall back to `'https://software3s.com'`.

#### Scenario: Dev uses portless URL
- **WHEN** `.env` contains `SITE_URL=https://portfolio.localhost` and `pnpm dev` runs
- **THEN** `Astro.site` SHALL resolve to `https://portfolio.localhost`

#### Scenario: Production uses production URL
- **WHEN** `SITE_URL` is not set (or set to production URL)
- **THEN** `Astro.site` SHALL resolve to `'https://software3s.com'`

### Requirement: SITE.url constant is environment-aware
The `SITE.url` constant in `src/lib/constants/site.ts` SHALL read from `import.meta.env.SITE_URL` with a fallback to the hardcoded production URL.

#### Scenario: Dev resolves portless URL
- **WHEN** `SITE_URL=https://portfolio.localhost` is set and the dev server runs
- **THEN** `SITE.url` SHALL be `https://portfolio.localhost`

#### Scenario: Production uses production URL
- **WHEN** `SITE_URL` is unset
- **THEN** `SITE.url` SHALL be `https://software3s.com` (the hardcoded fallback)

### Requirement: SITE_URL in .env
A `SITE_URL` entry SHALL exist in `.env` set to `https://portfolio.localhost` for development use.

#### Scenario: .env contains SITE_URL
- **WHEN** a developer checks `.env`
- **THEN** it SHALL contain `SITE_URL=https://portfolio.localhost`

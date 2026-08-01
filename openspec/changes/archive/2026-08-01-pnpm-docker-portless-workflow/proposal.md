## Why

The project currently uses npm as its package manager, has no Docker deployment setup, and relies on hardcoded port numbers for development. This creates friction: accidental `npm install` breaks the lockfile strategy, there's no reproducible production deployment path, and developers must remember port numbers or deal with port conflicts when running multiple projects. Switching to pnpm, adding Docker deployment, and adopting portless dev workflow eliminates all three pain points in one pass.

## What Changes

- **Package manager switch**: npm → pnpm with Corepack enforcement, `packageManager` field in `package.json`, replace `package-lock.json` with `pnpm-lock.yaml`
- **Docker deployment**: Add `Dockerfile` (multi-stage: node:22-alpine build → nginx:alpine serve), `nginx.conf` with cache headers, `.dockerignore`, and `docker-compose.yml`
- **Portless dev workflow**: Wrap `astro dev` with `portless portfolio`, add `server.port` config in `astro.config.mjs` to read `process.env.PORT`, add `SITE_URL` env var for dynamic site URL resolution
- **Config updates**: Bump Node engine to `>=22.12.0` (align with Docker image), update `.nvmrc` to `v22.12.0`, make `SITE.url` constant read from `import.meta.env.SITE_URL`, update all docs (README.md, AGENTS.md) to use pnpm commands
- **CI/CD readiness**: Docker build args for `API_TOKEN`, `API_BASE`, `SITE_URL` so builds are reproducible

## Capabilities

### New Capabilities
- `pnpm-migration`: Switch project from npm to pnpm as the default package manager, including lockfile, Corepack enforcement, and documentation updates
- `docker-deployment`: Multi-stage Docker build with nginx serving, docker-compose orchestration, and proper build-time environment variable passing
- `portless-workflow`: Development via `portless` proxy with dynamic port assignment, `.localhost` subdomain URL, and environment-aware site configuration

### Modified Capabilities

None. This change introduces new infrastructure — no existing capability requirements change.

## Impact

- **Files to delete**: `package-lock.json`
- **Files to create**: `Dockerfile`, `nginx.conf`, `.dockerignore`, `docker-compose.yml`, `pnpm-lock.yaml`
- **Files to modify**: `package.json`, `astro.config.mjs`, `README.md`, `AGENTS.md`, `.env`, `src/lib/constants/site.ts`, `.nvmrc`
- **Dependencies removed**: npm (implicit)
- **Dependencies added**: pnpm (via Corepack), portless (global, outside project)
- **Dev workflow change**: `npm run dev` → `pnpm dev` launches portless proxy
- **Deployment change**: `npm run build` → `pnpm build` in Docker multi-stage build

## Context

The project is an Astro 5 static site (SSG) with blog/portfolio functionality, currently managed entirely via npm. There are no Dockerfiles, no containerization, and the dev server runs on a hardcoded port (4321) with no portless proxy. The environment relies on `API_TOKEN` and `API_BASE` env vars for build-time data fetching from an external API.

The `.npmrc` already has `shamefully-hoist = true` — a pnpm config — suggesting the original authors anticipated a pnpm migration. The `.gitignore` already ignores `package-lock.json`, which is the correct behavior for a pnpm-based project (where `pnpm-lock.yaml` is tracked instead).

Node version is currently `>=20.3.0` (`.nvmrc`: `v20.5.1`), while the planned Docker image uses `node:22-alpine`.

## Goals / Non-Goals

**Goals:**
- Switch default package manager from npm to pnpm with Corepack enforcement
- Add reproducible Docker deployment with multi-stage build (node → nginx)
- Add docker-compose for local orchestration
- Add portless dev workflow with `.localhost` subdomain and dynamic port
- Make `site` URL and `SITE.url` constant environment-aware
- Update all documentation to reflect pnpm commands
- Align Node version requirements with Docker image (`node:22`)

**Non-Goals:**
- Not modifying any existing component behavior or page content
- Not adding CI/CD pipeline files (no `.github/workflows/`)
- Not changing the `accessible-astro-components` linking workflow beyond switching to `pnpm link`
- Not adding tests — this is infrastructure, not application logic
- Not changing how the external API is called, only how env vars are passed during Docker build

## Decisions

1. **pnpm over npm** — pnpm is faster, disk-efficient (content-addressable store), and enforces strict dependency resolution which surfaces missing dependencies at install time rather than runtime. The `.npmrc` already had `shamefully-hoist = true`, confirming this was the intended direction.

2. **Corepack `packageManager` field** — Adding `"packageManager": "pnpm@10.18.3"` to `package.json` makes Corepack automatically select the correct pnpm version and reject `npm install` attempts. This prevents accidental lockfile contamination.

3. **Multi-stage Docker build** — Build stage uses `node:22-alpine` (small, fast) with `corepack` enabled. Serve stage uses `nginx:alpine` (~5MB). The dist artifact is copied between stages, keeping the final image lean. No runtime Node needed.

4. **nginx over Astro's preview server** — nginx is battle-tested for static file serving, has fine-grained cache control, and is the standard for production reverse proxying. Astro's `preview` is for development only.

5. **Docker build args for env vars** — `API_TOKEN` and `API_BASE` are not `PUBLIC_*` prefixed, so Astro won't inline them into client bundles. They're only used server-side during build (SSG data fetching). Passing them as `ARG`/`ENV` in Dockerfile makes them available at build time without baking them into the image layers after build. `SITE_URL` is passed the same way.

6. **Portless over manual port management** — Portless assigns ephemeral ports (4000–4999), injects `PORT` env var, and provides HTTPS via `.localhost` subdomain. No port conflicts, no cookie clashes between projects, production-like HTTPS in dev. The project name `portfolio` maps to `https://portfolio.localhost`.

7. **Dynamic `site` in astro.config.mjs** — Reading `process.env.SITE_URL` with a fallback to the hardcoded production URL ensures `Astro.site` (used for canonical URLs, sitemap, breadcrumbs) returns the correct value in both dev and production. In dev via portless, `SITE_URL=https://portfolio.localhost`; in Docker production, `SITE_URL=https://software3s.com`.

8. **SITE.url constant reads import.meta.env.SITE_URL** — The JSON-LD Organization schema and other structured data reference `SITE.url`. Making it environment-aware avoids hardcoding and keeps structured data correct in dev/staging environments.

9. **Node engine bump to `>=22.12.0`** — The Docker image uses `node:22-alpine`. Keeping the engine constraint aligned ensures local dev matches production. `.nvmrc` updated to match.

10. **`.gitignore` unchanged** — Already ignores `package-lock.json`. `pnpm-lock.yaml` will be tracked (committed) for reproducible installs, which is already the default behavior (no ignore rule needed).

## Risks / Trade-offs

- **Migration to pnpm** → Astro and its plugin ecosystem are well-tested with pnpm, but `shamefully-hoist = true` is required for packages that expect flat `node_modules`. The `.npmrc` already has this. Low risk.
- **Corepack enforcement** → If a developer doesn't have Corepack enabled (`corepack enable`), `pnpm install` will fail with a clear error. Mitigation: documented in AGENTS.md setup instructions.
- **Portless requires global install** → Developers need `npm install -g portless` (one-time). Not a project dependency. Documented.
- **Docker build args for secrets** → `API_TOKEN` gets baked into the Docker image layer if passed as `ARG`/`ENV`. For SSG this is acceptable since the site is static post-build, but the token IS present in the build stage layer. Mitigation: use Docker build secrets (`--secret`) if the image needs to be shared publicly. For private deployments, current approach is fine.
- **Docker BuildKit required** → The `Dockerfile` uses `# syntax=docker/dockerfile:1.7` which requires Docker 23+ with BuildKit enabled. Older Docker installations will fail. Mitigation: document in AGENTS.md deployment section.

- **pnpm link behavior differs from npm link** → `pnpm link` uses a global store path and the exact command sequence may differ from `npm link`. The linking workflow for `accessible-astro-components` needs to be verified during implementation — the pnpm equivalents may require `pnpm link --global` in the components package and `pnpm link accessible-astro-components` in the starter. Verify during task 4.2.

- **SITE_URL env var coupling** → The `site` config and `SITE.url` constant now depend on an env var. If unset, they fall back to hardcoded production values, so local dev without `.env` still works (just without correct dev URLs in canonical tags — acceptable).

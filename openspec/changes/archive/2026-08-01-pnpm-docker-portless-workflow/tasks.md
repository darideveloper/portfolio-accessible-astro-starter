## 1. pnpm Migration

- [x] 1.1 Add `"packageManager": "pnpm@10.18.3"` field to `package.json`
- [x] 1.2 Delete `package-lock.json`
- [x] 1.3 Run `pnpm install` to generate `pnpm-lock.yaml` and fresh `node_modules`
- [x] 1.4 Update `engines.node` in `package.json` to `>=22.12.0`
- [x] 1.5 Update `.nvmrc` to `v22.12.0`

## 2. Docker Deployment

- [x] 2.1 Create `Dockerfile` with multi-stage build (node:22-alpine build → nginx:alpine serve)
- [x] 2.2 Create `nginx.conf` with cache headers, security headers, and gzip
- [x] 2.3 Create `.dockerignore` excluding node_modules, dist, .git, .env, etc.
- [x] 2.4 Create `docker-compose.yml` with build args for API_TOKEN, API_BASE, SITE_URL

## 3. Portless Workflow

- [x] 3.1 Change `dev` and `start` scripts in `package.json` to `portless portfolio pnpm astro dev`
- [x] 3.2 Add `server.port` config to `astro.config.mjs` reading `process.env.PORT` with fallback to 4321 and `strictPort: true`
- [x] 3.3 Make `site` config in `astro.config.mjs` read `process.env.SITE_URL` with fallback to `'https://software3s.com'`
- [x] 3.4 Update `SITE.url` in `src/lib/constants/site.ts` to read `import.meta.env.SITE_URL` with fallback to `'https://software3s.com'`
- [x] 3.5 Add `SITE_URL=https://portfolio.localhost` to `.env`

## 4. Documentation Updates

- [x] 4.1 Update `README.md` — replace all `npm` commands with `pnpm` equivalents
- [x] 4.2 Update `AGENTS.md` — replace all `npm`/`npx`/`npm link` references with `pnpm` equivalents, update troubleshooting commands, update setup instructions
- [x] 4.3 Verify all `npx` usages in AGENTS.md are replaced with direct `pnpm` calls (e.g., `pnpm eslint .`, `pnpm prettier --write .`)

## 5. Verification

- [x] 5.1 Run `pnpm build` to verify the site builds without errors
- [x] 5.2 Run `pnpm eslint .` to verify no linting errors
- [x] 5.3 Run `git status` to confirm `pnpm-lock.yaml` is tracked and `package-lock.json` is deleted

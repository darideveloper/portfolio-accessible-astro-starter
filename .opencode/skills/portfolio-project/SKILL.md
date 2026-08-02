---
name: portfolio-project
description: "Create or update portfolio project entries (MDX files) and README files for projects listed in PROJECTS.md. Use when the user wants to register a new project in the portfolio, update an existing one, or mentions a project name from PROJECTS.md in context of the portfolio."
---

# Portfolio Project — Create / Update

Automate the full lifecycle of registering or updating a project in the Astro portfolio.

**IMPORTANT — Investigation depth:** Ponytail laziness does NOT apply to Phase 1. Investigation must be exhaustive. Read every key file, trace every feature, cross-reference every sub-repo. A shallow investigation produces a shallow portfolio entry.

---

## Phase 1 — Investigation

### 1.1 Read `PROJECTS.md`
Extract the project name, its sub-projects (stack + repo name), and any notes.

Also check if the same client appears in other projects — this will be used later for related project links.

### 1.2 Check if already registered
```bash
ls src/content/projects/ | grep -i <project-name>
```
- If exists: read the file. Mark mode as **update**.
- If not: mode is **create**.

### 1.3 Verify sub-repos exist locally
```bash
ls /mnt/hd/develop/{stack}/{repo-name}
```
If a sub-repo is missing locally, ask the user.

### 1.4 Investigate each sub-repo (USE SUBAGENTS)

**Launch `task` subagents in PARALLEL** — one per sub-repo. This was critical in the AFT workflow. Each subagent should investigate a single repo thoroughly.

For every existing sub-repo at `/mnt/hd/develop/{stack}/{repo}`:

```bash
git log --oneline -30 --format="%h %ad %an %s" --date=short
git remote -v
```
- Read: `AGENTS.md`, `openspec/project.md`, `README.md`
- Read key source files: models, views, urls, components, templates, serializers, package.json, requirements.txt, config files
- Extract:
  - **Full feature list** — be exhaustive, NOT just a summary
  - Tech stack (all libraries, frameworks, tools)
  - Deployed URLs (check `.env`, `.env.prod`, `.env.dev`, config files) — **public-facing only; skip admin/dashboard URLs** (e.g., `*.apps.darideveloper.com`)
  - GitHub remote URL
  - API endpoints (if applicable)
  - New features since the last portfolio update (compare git dates against MDX)

Subagent prompt template:
```
Thoroughly investigate <repo-path>.
Return: full feature list, tech stack, deployed URLs (public-facing only, skip admin/dashboard URLs), GitHub remote, recent git history (30 commits), and any new features since <last-update-date>.
Be very thorough — check config files, models, views, urls, templates, components, and all source directories.
```

### 1.5 Output — PRESENT FINDINGS TO USER
Produce and **show to the user**:
- A table: existing features in MDX vs new features found in repos
- A table: all sub-projects with their tech stacks, repos, and URLs
- Gaps: missing URLs, missing client info, missing sub-project coverage, missing screenshots

Do NOT proceed to Phase 2 until the user has seen the full picture.

---

## Phase 2 — Close Gaps

Ask the user **one gap at a time** (not all at once). If multiple gaps are independent and simple (e.g., just URLs), they can be grouped in one `question` tool call. Do not overwhelm — prefer small batches.

Gap checklist:
1. **Live URLs** — for each sub-app not found in config files
2. **Client / company** — who the project was built for
3. **Project description clarifications** — anything ambiguous from code review
4. **Metrics / results** — user counts, impact data (optional)
5. **Related projects** — search for other MDX files mentioning same client:
   ```bash
   grep -ril "<client-name>" src/content/projects/
   ```
   Also check `PROJECTS.md` for the same client name across different projects. Search with partial name if exact match fails (e.g., "LeadForward" may be written as "leadforward", "Lead Forward", or "lead-forward").

Do NOT ask questions already answered by files. Do NOT ask hypotheticals — only real gaps.

---

## Phase 3 — Screenshots

**Golden rule (learned in Cancun Airport Transportation):** capture MANY **section-level** screenshots and let the USER choose. NEVER full-page screenshots — the sites have many sections per page, so full-page captures are absurdly tall (8000px+). Every screenshot must show **one section or a few sections**, at its natural size. Plan for **30+ candidates**, then the user picks the final set.

### 3.1 Check existing screenshots FIRST
```bash
ls src/assets/projects/{slug}/
```
Identify which views/features already have screenshots. Only take new ones for missing views.

### 3.2 Search for pre-existing screenshots in Downloads
```bash
find ~/Downloads -name "<project-name>*" -type f
```

If found, process each (section-level only; if a Download file is a full-page capture, crop or reject it):
```bash
convert <source.png> -resize "1366x>" -quality 85 src/assets/projects/{slug}/{NN}-{slug}-{desc}-3s.webp
```

### 3.3 Naming convention
```
{NN}-{slug}-{description-kebab-case}-3s.webp
```
- `NN`: sequential number over the whole candidate set (01, 02, …, 30+)
- `slug`: project short name (matches MDX filename)
- `description`: what the screenshot shows, in Spanish, kebab-case
- `3s`: fixed suffix

### 3.4 Capture MANY section-level screenshots with Playwright

**Identify URLs to capture.** Prefer in this order:
1. Public-facing pages (formularios, landing pages) — most valuable for clients
2. Deployed apps with visible features (dashboards, reports)
3. Admin panels (only if no public pages available)

**Map the sections first.** For each URL, dump the page's section structure so every section becomes a candidate:
```js
// playwright-cli eval
JSON.stringify([...document.querySelectorAll('section')].map(s =>
  (s.querySelector('h1,h2,h3')?.textContent || '').trim().slice(0, 60)).filter(Boolean))
```

**Capture by element, NOT full page.** Write a `run-code` script (single `async page => {…}` expression) that:
- navigates each URL (`page.goto(url, { waitUntil: 'networkidle' })` + wait)
- for each candidate section, `scrollIntoViewIfNeeded()`, small wait, then `element.screenshot({ path })`
- for hero/top-of-page shots, scroll to 0 and use a viewport `page.screenshot()` (1366×768)

Section locator pattern:
```js
const sec = page.locator('section').filter({ has: page.getByRole('heading', { name: /section text/i }) }).first();
await sec.scrollIntoViewIfNeeded();
await sec.screenshot({ path: dir + file + '.png' });
```
Save PNGs directly into `src/assets/projects/{slug}/` from the script (absolute paths). Verify each with `identify` — a section shot must be ≤1366px wide and a sane height (<1500px). If a locator returns the page wrapper (tall/duplicate shots), re-target the actual section card container (e.g., `div.bg-white`, `div.rounded-xl`) instead.

**Interactive pages** (booking funnels, dashboards): drive them with Playwright (`fill`/`click`/`keyboard.type`) to reach each step — results, checkout, confirmation. Clear `localStorage` first if persisted form state rehydrates stale values, and prefer `click` + `Control+a` + `keyboard.type` over `fill` when a controlled input already holds the target text (React ignores same-value fills and no autocomplete fires).

**Viewport:** set `1366×768` once (`playwright-cli resize 1366 768`). Do NOT use `--full-page`.

**Convert ALL captured PNGs:** shrink-only resize (never upscale small section shots → blurry), webp q85:
```bash
convert <NN>-{slug}-{desc}.png -resize "1366x>" -quality 85 <NN>-{slug}-{desc}-3s.webp
rm <NN>-{slug}-{desc}.png
```
`-resize "1366x>"` only downscales images wider than 1366px; smaller section shots keep their natural crisp size.

**When to ask the user:**
- Login required → ask for credentials once, reuse for all pages on same domain
- Hidden content requires interaction (form inputs, navigation, data params) → try to deduce from code/config, ask only if blocked
- A page needs specific data (e.g., chart URL with `?data=...`) → search repo for example data or test fixtures, ask only if nothing found

**When to NOT ask the user:**
- The page loads publicly and renders content → just take it
- You need to scroll or wait → `scrollIntoViewIfNeeded()`, `window.scrollTo(0, 500)`, or wait-based approaches

### 3.5 Security rule
**NEVER** capture or expose in screenshots or MDX content:
- `.env` files, tokens, passwords, API keys
- Personal data (emails, phone numbers, names of real participants)
- Database credentials or connection strings
- Any values matching the pattern of secrets (long random strings, keys)

Before adding a screenshot to the project, visually verify it does not leak credentials. (Note: the agent model may not support image input — hand visual verification of the final set to the user.)

### 3.6 Present ALL screenshots and let the user choose
**CRITICAL — selection step (do not skip):** after converting, show the user a table of every candidate with `NN` + description. Ask them to pick the final gallery set. Do NOT decide the set yourself and do NOT commit unused candidates.

- Add a curated default set to the MDX gallery (portada/hero first — best client-facing shot is the `featuredImage`), but explicitly list the remaining candidates so the user can add/remove.
- After the user selects, **delete the unselected files** from `src/assets/projects/{slug}/` so only gallery images remain.
- The user may remove more later — apply removals to both the MDX gallery and the file system.

### 3.7 Add to MDX gallery
```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  ![Alt text](../../assets/projects/{slug}/{filename}.webp "Title text")
</div>
```
Keep the gallery tight (8–10 images max, 2-column grid). Verify the build after every gallery edit — a stale `featuredImage` or a deleted-but-still-referenced image fails `pnpm build` with `ImageNotFound`.

---

## Phase 4 — MDX Draft

### 4.1 Template
Use the template from `references/mdx-template.md`. Fill every `{placeholder}` with data from phases 1-3.

### 4.2 Structure (mandatory)
```
## Resumen Ejecutivo        ← 1 paragraph: problem → solution → outcome
## El Cliente               ← who they are, what they needed
## La Solución              ← features in BUSINESS language, grouped by audience
                            ← sub-sections: Para los participantes, Para los administradores, Para la toma de decisiones
## Detalles Técnicos        ← stack, architecture, implementation detail (for devs)
## Galería de Imágenes      ← 2-column grid
## Resultados e Impacto     ← business outcomes
## Proyectos Relacionados   ← cross-links
```

### 4.3 Rules
- **Language:** Spanish for all MDX portfolio content
- **Author:** Always `Dari Developer`
- **Audience:** write for a non-technical client first, technical details later
- **Featured image:** choose the most visually appealing image for a non-technical client (prefer UI/product over backend/admin panels)
- **Tags:** check existing tags in `src/content/config.ts` and other MDX files. Reuse where possible. Default categories: `Web Development`, plus stack-specific (`Django`, `React`, `Astro`, `WordPress`, etc.)
- **Slug:** the MDX filename without extension (e.g., `aft` for `aft.mdx`). Project page URL will be `https://darideveloper.com/portafolio/{slug}`
- **Title vs Slug:** The `title` in frontmatter can include subtitles like `AFT (Alfabetización Tecnológica)` without affecting the slug/URL. The slug comes from the filename, not the title.
- **Frontmatter schema:** `content.config.ts` validates `title`, `author`, `description`, `tags`, and `featuredImage` only. Extra fields like `liveUrl` or `formUrl` will be silently stripped by Zod's `z.object()`. To use them in templates, add them to the schema first. For now, include URLs in the MDX body text as visible links.
- **URLs:** only include **public-facing** live URLs (landing pages, forms, public apps). **Never include admin panel or dashboard URLs** (e.g., `*.apps.darideveloper.com`) in the MDX body or frontmatter.

### 4.4 Present draft for validation
**CRITICAL:** Present the complete MDX draft to the user for review. Summarize the key changes vs. the previous version (if updating). Do NOT proceed to Phase 5 until the user validates the draft.

### 4.5 Related projects
If another project MDX references the same client/company:
1. Add a `## Proyectos Relacionados` section in this project's MDX
2. Also update the other project's MDX with a reciprocal link
3. Link format: `- **[Project Name](/projects/{slug})** — brief description of the relationship.`

---

## Phase 5 — READMEs for Sub-Repos

For every sub-project repo under `/mnt/hd/develop/{stack}/{repo}`:

### 5.1 Check state
```bash
file README.md   # check if text, binary, or data
```
- If no README → create new
- If exists but `file` reports "data" (binary/corrupt) → treat as replaceable
- If exists but is a **default template** (Vite, Astro, CRA starter text) → replace entirely
- If exists with project-specific content → update/add contact section only

### 5.2 Template
Use `references/readme-template.md`. Fill `{placeholders}` with data from phase 1.

### 5.3 Rules
- **English first, Spanish second** (both in the same file)
- **Features:** only features of THIS specific repo, not the whole ecosystem
- **Contact section** (both languages):
  - Website: `https://darideveloper.com`
  - WhatsApp: `https://api.whatsapp.com/send?phone=5214493402622`
  - Portfolio: `https://darideveloper.com/portafolio/{slug}`
  - **Branding:** "Dari Developer" (NEVER "Smooth Software Solutions" or "3S")

### 5.4 Commit and push each sub-repo
```bash
git add README.md
git commit -m "docs: update README with project overview and contact info"
git push
```
Do each repo **one by one** (not parallel — git operations on different repos are independent but sequential avoids confusion).

**Only commit sub-repo READMEs when the user explicitly authorizes it.**

### 5.5 Watch for repo migrations
When pushing, check for messages like `This repository moved. Please use the new location: git@github.com:new-org/new-name.git`. If detected:
- Update the GitHub URL reference in the portfolio MDX body text
- Inform the user that the remote has moved

---

## Phase 6 — Portfolio Commit (FINAL)

### 6.1 Stage
```bash
git add src/content/projects/{slug}.mdx
git add src/assets/projects/{slug}/*.webp   # if new screenshots
```

### 6.2 Commit
```bash
git commit -m "feat(projects): add/update {project-name} portfolio entry"
```

### 6.3 Push
```bash
git push
```

### 6.4 Authorization
**ONLY commit and push when the user explicitly requests it.** All work up to this point should be ready but unstaged until the user says "commit" or "push".

---

## Quick Reference: Conventions at a Glance

| Element | Convention |
|---|---|
| Author (MDX + README) | `Dari Developer` |
| MDX language | Spanish |
| README language | English first, Spanish second |
| Title vs Slug | Title can include subtitle `(extra info)` — slug stays clean |
| Screenshot naming | `{NN}-{slug}-{desc-kebab}-3s.webp` |
| Screenshot style | Section-level only — NEVER full-page; one or few sections visible |
| Screenshot width | Natural section size, ≤1366px; shrink-only resize (`1366x>`), never upscale |
| Screenshot count | 30+ candidates captured; user selects the final gallery set |
| Screenshot format | webp, quality 85 (convert with ImageMagick) |
| Featured image choice | Prefer UI/product views over admin/backend panels |
| Portfolio URL | `https://darideveloper.com/portafolio/{slug}` |
| Website URL | `https://darideveloper.com` |
| WhatsApp | `https://api.whatsapp.com/send?phone=5214493402622` |
| Security | No secrets, tokens, passwords, personal data exposed |
| Commit style | `type(scope): description` (conventional commits) |
| Commit auth | User must explicitly authorize EVERY commit/push |
| Ask user | Only when strictly necessary (blockers, not confirmations) |
| Investigation depth | Exhaustive — ponytail laziness exempt for Phase 1 |
| Subagent usage | Parallel task agents for sub-repo investigation |

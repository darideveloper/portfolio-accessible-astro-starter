## Context

The site currently identifies as "Smooth Software Solutions (3S)" with domain `software3s.com`. The actual team is **Dari Dev Team** (led by Dari Developer), and the new domain is `darideveloper.com`. This is a content rebrand — no architectural changes, no new features, no API modifications. Every change is a text/URL/asset replacement across ~30 files.

## Goals / Non-Goals

**Goals:**
- Consistent "Dari Dev Team" branding across all site content
- All domain references use `darideveloper.com`
- All email references use `contact@darideveloper.com`
- Logo replaced with the new brand mark
- Legal text reflects the new company identity

**Non-Goals:**
- No redirect/rewrite setup (outside this codebase scope)
- No architectural or behavioral changes
- No modifications to API endpoints or backend services
- No changes to page routes or URL structure

## Decisions

### Strategy: Search-and-replace with manual review for prose
Rebranding is mostly mechanical string replacement, but legal pages and prose sections need careful human judgement to avoid breaking grammar or legal wording.
- Source-of-truth constants (`site.ts`, `contact.ts`) updated first
- Then config files and components
- Then content files (MDX projects)
- Then legal pages last (most manual effort)

### Logo: Replace image file, update import path
Old logo: `src/assets/images/logo-smooth-software-solutions-desarrollo-web-3s.webp`
New logo: `src/assets/images/logo-dari-dev-team.png`
The source file is at `/mnt/hd/backups/filebrowser/srv/main/dari_developer/media/logo/logo_circle.png`. It will be copied to the assets directory as `logo-dari-dev-team.png` and the import path in Logo.astro updated.

### Approach to "3S" abbreviation
The abbreviation "3S" appears in multiple contexts:
- "3S" as standalone identifier → "Dari Dev Team"
- "Equipo 3S" → "Dari Dev Team"
- "software a medida de 3S" → "software a medida de Dari Dev Team"
- Footer "equipo de 3S" → "Dari Dev Team"
Each context must be reviewed individually — blind replace could produce unnatural text.

### Legal pages: Full text update
Because the company name appears throughout legal boilerplate, each paragraph with "Smooth Software Solutions (3S)" will be updated. The legal substance remains unchanged — only the company identifier changes.

### No redirects (out of scope for this change)
The old domain `software3s.com` is assumed to be handled externally (DNS, server config). This change only updates the canonical URL in Astro config and all hardcoded references.

## Risks / Trade-offs

- **Risk** → **Mitigation**
- Missing a "3S" reference in prose → Grep for `[^a-zA-Z]3S[^a-zA-Z0-9]` to catch all abbreviation uses, not just the full name
- Legal text contains repetitive boilerplate — easy to miss one instance → Count occurrences before/after using grep on each file
- Logo format conversion (.png → .webp for Astro optimization) → Verify the imported image format works with Astro's Image component; convert to .webp if needed
- Old domain references in archived OpenSpec docs → Not updated (archival content, doesn't affect the live site)

## Why

The project is currently branded as "Smooth Software Solutions (3S)" — a name that doesn't reflect the actual team behind the work. The real entity is **Dari Dev Team** (led by Dari Developer), and the domain `software3s.com` is being replaced by `darideveloper.com`. This change aligns the public-facing site with the team's actual identity across all touchpoints: text content, URLs, email addresses, SEO metadata, and legal pages.

## What Changes

- Company name: "Smooth Software Solutions (3S)" → "Dari Dev Team"
- Abbreviation "3S" → "Dari Dev Team"
- Site URL: `https://software3s.com` → `https://darideveloper.com`
- Email: `contact@software3s.com` → `contact@darideveloper.com`
- WhatsApp pre-filled text: references to `software3s.com` → `darideveloper.com`
- Logo: `logo-smooth-software-solutions-desarrollo-web-3s.webp` → `logo-dari-dev-team.png`
- Footer copyright text updated
- All 18 project MDX `author` fields updated to "Dari Dev Team"
- Legal pages (aviso-legal, politica-privacidad, cookies, sitemap) updated with new company name and domain
- SiteMeta organization JSON-LD updated
- astro.config.mjs site URL updated
- Team references ("Equipo 3S", "En 3S, ...", "el equipo de 3S") updated

## Capabilities

### New Capabilities
- `domain-references`: Update all domain, URL, email, and WhatsApp references from `software3s.com` to `darideveloper.com`
- `brand-identity`: Update all company name, abbreviation, author, and logo references from "Smooth Software Solutions (3S)" to "Dari Dev Team"
- `legal-text`: Update legal pages (aviso-legal, politica-privacidad, cookies, sitemap) with new company identity and domain

## Impact

- **Config**: `astro.config.mjs` (site URL), `docker-compose.yml` (SITE_URL default), `src/lib/constants/site.ts` (identity), `src/lib/constants/contact.ts` (contact info)
- **Components**: `Logo.astro`, `Footer.astro`, `SiteMeta.astro`
- **Pages**: `index.astro` (hero text, team section), `contact.astro`, `contacto.astro`, `aviso-legal.astro`, `politica-privacidad.astro`, `configuracion-cookies.astro`, `sitemap.astro`
- **Content**: 18 project MDX files (author field)
- **Assets**: Logo image replacement
- **No breaking changes** — all existing routes and APIs remain unchanged

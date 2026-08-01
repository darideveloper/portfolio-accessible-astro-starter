## 1. Source-of-truth constants and config

- [x] 1.1 Update `src/lib/constants/site.ts`: change `name`, `title`, `description`, `url` to "Dari Dev Team" and `https://darideveloper.com`; keep `author: 'DariDeveloper'` and `twitter: '@DariDeveloper'`
- [x] 1.2 Update `src/lib/constants/contact.ts`: change email to `contact@darideveloper.com` and WhatsApp pre-filled text domain
- [x] 1.3 Update `astro.config.mjs`: change `site` fallback URL to `https://darideveloper.com` (line 94)
- [x] 1.4 Update `docker-compose.yml`: change `SITE_URL` default fallback to `https://darideveloper.com` (line 8)

## 2. Logo replacement

- [x] 2.1 Copy new logo file from `/mnt/hd/backups/filebrowser/srv/main/dari_developer/media/logo/logo_circle.png` to `src/assets/images/` as `logo-dari-dev-team.png`
- [x] 2.2 Update `src/components/Logo.astro`: change import path, alt text, title, and span text to "Dari Dev Team"

## 3. Component updates

- [x] 3.1 Update `src/components/Footer.astro`: change copyright "Smooth Software Solutions" to "Dari Dev Team", change "Equipo 3S" link text, change "equipo de 3S" text
- [x] 3.2 Verify `src/components/SiteMeta.astro` reads from the SITE constant (no inline reference to old branding — reads `SITE.name` and `SITE.url` dynamically, so no file change needed)

## 4. Page branding text

- [x] 4.1 Update `src/pages/index.astro`: change "Smooth Software Solutions" in hero section and "En 3S" / "3S" prose references
- [x] 4.2 Update `src/pages/contact.astro`: change "En 3S" to "En Dari Dev Team"
- [x] 4.3 Update `src/pages/contacto.astro`: change "En 3S" to "En Dari Dev Team"

## 5. Project MDX author fields

- [x] 5.1 Update `src/content/projects/c4empresarialyresidencial.mdx`
- [x] 5.2 Update `src/content/projects/cancunconcierge.mdx`
- [x] 5.3 Update `src/content/projects/gana-en-tu-hogar-by-coca-cola.mdx`
- [x] 5.4 Update `src/content/projects/guiadeinmigracion.mdx`
- [x] 5.5 Update `src/content/projects/imimcep.mdx`
- [x] 5.6 Update `src/content/projects/itzimnarealestate.mdx`
- [x] 5.7 Update `src/content/projects/iuraglobal.mdx`
- [x] 5.8 Update `src/content/projects/leadforward.mdx`
- [x] 5.9 Update `src/content/projects/mexico-real-fam-restaurant.mdx`
- [x] 5.10 Update `src/content/projects/mishaveron.mdx`
- [x] 5.11 Update `src/content/projects/moonhouse.mdx`
- [x] 5.12 Update `src/content/projects/mundo-indomita.mdx`
- [x] 5.13 Update `src/content/projects/opocosocial-canarias.mdx`
- [x] 5.14 Update `src/content/projects/priority-traning.mdx`
- [x] 5.15 Update `src/content/projects/razzer-buccarelli.mdx`
- [x] 5.16 Update `src/content/projects/theta-pro-academy.mdx`
- [x] 5.17 Update `src/content/projects/xymale-barbershop.mdx`
- [x] 5.18 Update `src/content/projects/aft.mdx`: change `author: 'Dari Developer'` to `author: 'Dari Dev Team'`

## 6. Legal pages

- [x] 6.1 Update `src/pages/aviso-legal.astro`: replace all "Smooth Software Solutions (3S)" and `software3s.com` references (13+ occurrences)
- [x] 6.2 Update `src/pages/politica-privacidad.astro`: replace company name and email references
- [x] 6.3 Update `src/pages/configuracion-cookies.astro`: replace email reference
- [x] 6.4 Update `src/pages/sitemap.astro`: replace company name in Aviso Legal description

## 7. Verification

- [x] 7.1 Run `npm run build` and verify no errors
- [x] 7.2 Verify old branding strings are gone: grep for "Smooth Software", "software3s", "contact@software3s" — should return zero matches in `src/`

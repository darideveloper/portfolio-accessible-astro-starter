# MDX Template

Use this skeleton for every portfolio project entry. Replace all `{placeholders}`.

---

```mdx
---
title: '{title}'
author: 'Dari Developer'
description: '{one-sentence description in Spanish, business-focused}'
tags: {json-array-of-tags}
featuredImage: ../../assets/projects/{slug}/{NN}-{slug}-{desc}-3s.webp
liveUrl: '{live-url}'
---

## Resumen Ejecutivo

{1 paragraph — what problem it solves, for whom, the outcome. Non-technical language.}

---

## El Cliente

{2-3 sentences — who the client is, their industry, what they needed. Include company name and context.}

---

## La Solución

{Features organized by business value. NO technical jargon here — save for Detalles Técnicos.}

### Para los participantes

- {feature in plain language from end-user perspective}
- {feature in plain language from end-user perspective}

### Para los administradores

- {feature in plain language from admin perspective}
- {feature in plain language from admin perspective}

### Para la toma de decisiones

- {feature about reports, analytics, insights}
- {feature about reports, analytics, insights}

---

## Detalles Técnicos

{Technical breakdown. This section is for developers who want to understand the stack and architecture.}

### {Sub-project 1 Name}

{Architecture description, bullet list of technical features}

### {Sub-project 2 Name}

{Architecture description, bullet list of technical features}

**Repositorios:**
- {Name}: [{github-url}]({github-url})
- {Name}: [{github-url}]({github-url})

**Sitio en vivo** (public-facing only — NEVER admin/dashboard URLs like `*.apps.darideveloper.com`):
- [{live-url}]({live-url})
- {only add more if public-facing}

---

## Galería de Imágenes

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  ![{Alt text}](../../assets/projects/{slug}/{NN}-{slug}-{desc}-3s.webp "{Title text}")
  ![{Alt text}](../../assets/projects/{slug}/{NN}-{slug}-{desc}-3s.webp "{Title text}")
</div>

---

## Resultados e Impacto

{2-3 sentences about the business impact and outcomes achieved.}

---

## Proyectos Relacionados

{Only include if there ARE related projects. Remove this section if empty.}

- **[{Project Name}](/projects/{related-slug})** — {brief description of the relationship}.
```

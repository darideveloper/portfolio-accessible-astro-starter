# Tasks: Standardize Heading Hierarchy

## Task 1: Optimize Portfolio List Page
- [x] Modify `src/pages/portafolio/[...page].astro` to change "Etiquetas" heading from `level='h2'` to `level='h3'`.
- [x] Maintain `size='h5'` to keep the visual style secondary.

## Task 2: Optimize Portfolio Tag Pages
- [x] Modify `src/pages/portafolio/tag/[tag]/[...page].astro` to change "Tags" heading from `level='h2'` to `level='h3'`.
- [x] Maintain `size='h5'`.
- [x] Verify `PageHeader` is using a dynamic, keyword-rich title.

## Task 3: Optimize Single Project Page
- [x] Modify `src/pages/portafolio/[project].astro` to change "Compartir este proyecto" heading from `level='h2'` to `level='h3'`.

## Task 4: Validation
- [x] Run a manual check of the heading structure in the rendered pages (if possible) or verify the generated HTML structure.
- [x] Confirm no heading levels are skipped in a few key project pages.

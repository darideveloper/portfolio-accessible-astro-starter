# Design: Standardize Heading Hierarchy

## Rationale
The current use of `h2` for utility sections like "Etiquetas" or "Compartir este proyecto" is not optimal for SEO and accessibility. It places these secondary elements at the same structural importance as the main content sections (such as project titles). By lowering these to `h3`, we create a more logical and hierarchical document structure.

## Technical Approach
The changes will be applied to the `.astro` templates for the portfolio list, tag-specific list, and single project view. We use the `<Heading>` component from `accessible-astro-components` to manage the level and visual size independently.

- **Portfolio List (/portafolio)**:
  - Current structure:
    - H1 (PageHeader)
    - H2 (Etiquetas)
    - H2 (Project Title)
  - Proposed structure:
    - H1 (PageHeader)
    - H3 (Etiquetas, visually H5)
    - H2 (Project Title)

- **Portfolio Tag Pages (/portafolio/tag/[tag])**:
  - Current structure:
    - H1 (PageHeader: Portafolio: TagName)
    - H2 (Tags)
    - H2 (Project Title)
  - Proposed structure:
    - H1 (PageHeader: Portafolio: TagName)
    - H3 (Tags, visually H5)
    - H2 (Project Title)

- **Single Project Page (/portafolio/[project])**:
  - Current structure:
    - H1 (PageHeader)
    - H2 (MDX Section: Descripción del Proyecto)
    - H2 (Compartir este proyecto)
  - Proposed structure:
    - H1 (PageHeader)
    - H2 (MDX Section: Descripción del Proyecto)
    - H3 (Compartir este proyecto)

## Key Constraints
- **Maintain Styling**: The visual appearance of the headings should not drastically change if they are intended to be small (e.g., using `size='h5'`).
- **SEO Relevance**: Ensure the H1 is unique and descriptive for each page type.

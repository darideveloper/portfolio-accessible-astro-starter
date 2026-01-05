# Design: Improve Blog Content Styling

## Architectural Overview
The styling for the blog content will be implemented using Scoped SCSS within the `src/pages/blog/[post].astro` file or as a dedicated SCSS utility in `src/assets/scss/components/`. Given the requirement for "rich aesthetics" and "premium design", we will use a dedicated SCSS file to keep it clean and reusable.

## Design Details

### 1. Typography & Spacing
- Use `margin-block-start` and `margin-block-end` for logical spacing.
- Paragraphs (`p`) will have `margin-block: 1.5rem`.
- Headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) will have increased spacing before them (e.g., `margin-block-start: 3rem`) and moderate spacing after (e.g., `margin-block-end: 1rem`).
- Blockquotes will have a subtle background, left border, and italicized text.

### 2. Separators
- Horizontal rules (`hr`) will have 4rem vertical margins and a subtle, thin line style.

### 3. Images
- Images within the content will be set to `width: 100%`, `height: auto`, and `display: block`.
- Add a subtle border-radius (e.g., `0.5rem`) to images for a more premium look.
- Support for responsive images and alt text visibility.

### 4. Tables & Lists
- Tables will have horizontal borders only, with padded cells and a subtle header background.
- Lists (un-ordered and ordered) will have increased indentation and spacing between items.

### 5. Implementation Strategy
- Create a `.post-content` wrapper class.
- Use CSS nesting or SCSS to target elements within `.post-content`.
- Avoid Tailwind utility classes for the rendered Markdown itself since we cannot easily inject them into the HTML string from the API (without complex processing). Instead, use traditional CSS/SCSS targeting.

## Alternatives Considered
- **Tailwind Typography Plugin**: Could be used, but custom SCSS gives more granular control and matches the existing project's use of SCSS for base styles.
- **Injecting Tailwind classes into HTML**: Too complex and brittle for this task.

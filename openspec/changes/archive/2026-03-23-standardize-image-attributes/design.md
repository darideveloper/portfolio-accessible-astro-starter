# Design: Standardizing Image Attributes

The project uses the `astro:assets` `Image` component. This design ensures that every instance of this component is called with both `alt` and `title` attributes, avoiding empty strings and prioritizing consistency.

## Implementation Details

### Components with Hardcoded Attributes

Some components, like `Logo.astro`, use hardcoded values. These values will be updated to be more descriptive and present in both `alt` and `title`.

### Components with Prop-Driven Attributes

Components like `FeaturedProjects.astro` and `FeaturedPosts.astro` use dynamic data from props or content collections. Their image attributes will be derived from the available content:
- Use `project.data.title` or `post.title` for both `alt` and `title`.

### Components with Optional Prop Attributes

Components like `ContentMedia.astro`, `BreakoutImage.astro`, and `Hero.astro` take optional `imageAlt` or `alt` props. The implementation will ensure:
- If the prop is not provided or is empty, a default fallback is used.
- The `title` attribute always reflects the final `alt` value unless a separate `title` prop is introduced.

## Trade-offs and Considerations

- **Duplication**: Using the same text for both `alt` and `title` is common and provides both screen reader support and hover tooltips.
- **Maintenance**: Standardizing these attributes now reduces future technical debt related to accessibility and SEO audits.

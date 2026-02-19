# Image Optimization Specs

## ADDED Requirements

### Requirement: MDX Legacy Images
The application MUST update all legacy `<img>` tags in MDX files to use lazy loading.

#### Scenario: Rendering Project Pages
- **Given** an MDX file with standard HTML `<img>` tags.
- **When** the page is rendered.
- **Then** the image tag must include `loading="lazy"`.
- **And** it may include a `title` attribute matching the `alt` text or context.

```mdx
<img
  //...
  loading="lazy"
  title="Description"
/>
```

### Requirement: PageHeader Component Optimization
The `PageHeader` component MUST support `alt` text customization and explicit eager loading.

#### Scenario: Rendering Page Header
- **Given** the `PageHeader` component.
- **When** it renders the featured image.
- **Then** it must use `loading="eager"`.
- **And** it must use the provided `imageAlt` prop or fall back to the `title` prop for both `alt` and `title` attributes.

```astro
// src/components/PageHeader.astro
interface Props {
  // ... existing props
  imageAlt?: string
}
// ...
<Image
  src={featuredImage}
  alt={imageAlt || title}
  title={imageAlt || title}
  loading="eager"
  // ...
/>
```

### Requirement: Hero Component Optimization
The `Hero` component MUST support `alt` text customization.

#### Scenario: Rendering Hero Section
- **Given** the `Hero` component.
- **When** it renders the hero image.
- **Then** it must accept an `imageAlt` prop.
- **And** pass it to the `alt` and `title` attributes of the image.

```astro
// src/components/Hero.astro
interface Props {
  // ...
  imageAlt?: string
}
// ...
<Image
  alt={imageAlt || 'Hero Image'}
  title={imageAlt || 'Hero Image'}
  loading="eager"
  // ...
/>
```

### Requirement: ContentMedia Component Optimization
The `ContentMedia` component MUST use lazy loading and customizable `alt` text.

#### Scenario: Rendering Content Media
- **Given** the `ContentMedia` component.
- **When** it renders an image.
- **Then** it must use `loading="lazy"`.
- **And** use the provided `imageAlt` prop for `alt` and `title`.

```astro
// src/components/ContentMedia.astro
interface Props {
  //...
  imageAlt?: string
}
//...
<Image
  //...
  alt={imageAlt || ''}
  title={imageAlt || ''}
  loading="lazy"
/>
```

### Requirement: Avatar Component Optimization
The `Avatar` component MUST use lazy loading.

#### Scenario: Rendering User Avatar
- **Given** the `Avatar` component.
- **When** it renders the user image.
- **Then** it must use `loading="lazy"`.
- **And** use the `title` prop for both `alt` and `title` attributes.

```astro
// src/components/Avatar.astro
<Image
  //...
  alt={title}
  title={title}
  loading="lazy"
/>
```

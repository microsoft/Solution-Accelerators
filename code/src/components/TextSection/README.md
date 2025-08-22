# TextSection Component

A text-focused section component similar to HeroSection but without video content. Features a title (h2), content description, and a call-to-action button.

## Props

- `title` (string): Main title with support for HTML `<br />` tags
- `content` (string): Content description text
- `link` (LinkConfig): Button configuration
  - `text` (string): Button text
  - `url` (string): Target URL (supports internal anchors and external links)
  - `target` (optional): Link target ('_blank' for external links)
- `className` (optional): Additional CSS classes
- `onNavigate` (optional): Navigation callback for deep linking

## Usage

```tsx
import TextSection from '../components/TextSection';

<TextSection
  title="Your compelling title<br />with line breaks"
  content="Your descriptive content goes here. This supports longer text content."
  link={{
    text: "Learn More",
    url: "https://example.com",
    target: "_blank"
  }}
/>
```

## Features

- Responsive design with mobile optimization
- Support for internal anchor links and external URLs
- HTML line break support in titles
- Consistent styling with other section components
- Deep linking support for internal navigation 
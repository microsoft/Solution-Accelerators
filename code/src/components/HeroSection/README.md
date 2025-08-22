# HeroSection Component

A reusable hero section component that displays a title, content, call-to-action button, and YouTube video player.

## Props

### `title: string`
The main title with support for line breaks using `<br />` tags.

### `content: string`
The descriptive content text.

### `link: LinkConfig`
Configuration for the call-to-action button:
```typescript
interface LinkConfig {
  text: string;           // Button text
  url: string;           // URL or anchor link
  target?: '_blank' | '_self'; // Optional target for external links
}
```

### `videoUrl: string`
YouTube video URL (supports embed, watch, and short URLs).

### `videoAutoplay?: boolean`
Whether the video should autoplay when loaded. Defaults to `false`.

### `className?: string`
Optional additional CSS classes.

## Usage Examples

### Basic Usage
```tsx
<HeroSection
  title="Unlock your ability to<br />build AI solutions faster"
  content="Launch AI products faster with enterprise-grade, customizable solutions built on trusted architectures."
  link={{
    text: "View accelerators",
    url: "#featured"
  }}
  videoUrl="https://www.youtube.com/embed/8bjdA8s3rFI?autoplay=0"
/>
```

### External Link
```tsx
<HeroSection
  title="Learn More About Our Solutions"
  content="Discover how our platform can transform your business."
  link={{
    text: "Visit Website",
    url: "https://example.com",
    target: "_blank"
  }}
  videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  videoAutoplay={false}
/>
```

### Anchor Link (Smooth Scroll)
```tsx
<HeroSection
  title="Welcome to Our Platform"
  content="Explore our comprehensive solution offerings."
  link={{
    text: "Get Started",
    url: "#get-started"
  }}
  videoUrl="https://youtu.be/example"
  videoAutoplay={false}
/>
```

## Features

- **Smart Link Handling**: Automatically detects anchor links (`#section`) vs external URLs
- **Smooth Scrolling**: Anchor links smoothly scroll to the target section
- **Video Player**: YouTube video with thumbnail preview and play button (now uses the reusable VideoPlayer component)
- **Responsive Design**: Maintains visual consistency across screen sizes
- **TypeScript Support**: Full type safety with proper interfaces 
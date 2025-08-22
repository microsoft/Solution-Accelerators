# SuccessStoriesSection Component

A reusable component for displaying testimonial quotes in a grid layout with a gradient background.

## Props

- `title?: string` - The section title (defaults to "Loved by developers")
- `quotes: TestimonialQuote[]` - Array of quote objects containing quote text and author

## Usage

```tsx
import SuccessStoriesSection from './components/SuccessStoriesSection';

const quotes = [
  {
    quote: "Customers have been amazed at how quickly we went from scoping to testing something.",
    author: "Cloud Solution Architect"
  },
  // ... more quotes
];

<SuccessStoriesSection 
  title="Loved by developers"
  quotes={quotes}
/>
```

## Features

- Responsive grid layout (1 column on mobile, 2 on tablet, 5 on desktop)
- Gradient background
- Quote icon for visual appeal
- Configurable title and quotes
- Consistent with Fluent UI design system 
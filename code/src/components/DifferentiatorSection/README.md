# DifferentiatorSection Component

A modern, responsive component for displaying differentiator information with an accordion interface and solution architecture diagram. Designed with Figma-inspired styling featuring a floating card effect and gradient background.

## Features

- **Figma-Inspired Design**: Clean, modern appearance with floating card effect
- **Responsive Layout**: Adapts to different screen sizes
- **Interactive Accordion**: Smooth expand/collapse animations
- **Configurable Content**: Fully customizable title, content, and accordion items
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Smooth animations and efficient rendering

## Usage

```tsx
import DifferentiatorSection from './components/DifferentiatorSection';

const accordionItems = [
  {
    id: "proven-architecture",
    label: "Proven architecture",
    content: "Leverage a trusted, scalable solution design based on best practices...",
    image: "/differentiators/solutionArch.png"
  },
  // ... more items
];

<DifferentiatorSection
  title="Deliver value faster with accelerators"
  content="Accelerators provide the guidance and tools you need to launch with confidence and deliver results fast."
  accordionItems={accordionItems}
/>
```

## Props

### DifferentiatorSectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main section title |
| `content` | `string` | - | Section description text |
| `accordionItems` | `DifferentiatorAccordionItem[]` | - | Array of accordion items |
| `className` | `string` | - | Additional CSS classes |
| `backgroundGradient` | `'default' \| 'custom'` | `'default'` | Background gradient style |

### DifferentiatorAccordionItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier for the accordion item |
| `label` | `string` | - | Display text for the accordion header |
| `content` | `string` | - | Content displayed when accordion is expanded |
| `image` | `string` | - | Optional image path (currently uses default solutionArch.png) |

## Default Configuration

The component includes a default configuration that matches the current implementation:

```tsx
const defaultAccordionItems = [
  {
    id: "proven-architecture",
    label: "Proven architecture",
    content: "Leverage a trusted, scalable solution design based on best practices—built to ensure reliability, security, and performance, so your teams can deploy with confidence.",
    image: "/differentiators/solutionArch.png"
  },
  {
    id: "quick-deployment",
    label: "Quick deployment",
    content: "Deploy solutions quickly with pre-built templates and guided setup instructions.",
    image: "/differentiators/solutionArch.png"
  },
  {
    id: "accelerated-value",
    label: "Accelerated value",
    content: "Get to market faster with ready-to-use solutions that can be customized to your needs.",
    image: "/differentiators/solutionArch.png"
  },
  {
    id: "comprehensive-documentation",
    label: "Comprehensive documentation",
    content: "Access detailed documentation, including architecture diagrams, deployment guides, and best practices.",
    image: "/differentiators/solutionArch.png"
  },
  {
    id: "costing-estimate",
    label: "Costing estimate",
    content: "Understand the cost implications upfront with detailed pricing estimates and optimization guidance.",
    image: "/differentiators/solutionArch.png"
  }
];
```

## Styling

The component uses Fluent UI's `makeStyles` for styling with the following key features:

- **Gradient Background**: Subtle gradient from white to light purple-blue
- **Floating Card**: White card with rounded corners and shadow
- **Responsive Layout**: Two-column on desktop, stacked on mobile
- **Interactive Elements**: Hover effects and smooth transitions

## Accessibility

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators for interactive elements
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized animations using CSS transforms
- Efficient state management
- Minimal re-renders
- Lazy loading ready for images 
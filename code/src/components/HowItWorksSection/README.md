# HowItWorksSection Component

A reusable component for displaying a "How it works" section with configurable steps, icons, and content.

## Features

- **Configurable steps**: Pass an array of step objects with icons, labels, and content
- **Responsive design**: Automatically adapts to different screen sizes (1/2/4 columns)
- **Accessible**: Includes proper alt text and semantic HTML
- **Customizable**: Optional className prop for additional styling
- **Clean design**: Matches Figma design with centered title and line separators

## Props

### HowItWorksSectionProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | The main section title (e.g., "How it works") |
| `steps` | `HowItWorksStep[]` | Yes | Array of step objects |
| `className` | `string` | No | Optional CSS class for additional styling |

### HowItWorksStep

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `icon` | `string` | Yes | URL to the step icon image |
| `label` | `string` | Yes | Step title (e.g., "Step 1: Browse") |
| `content` | `string` | Yes | Step description text |

## Usage

```tsx
import { HowItWorksSection } from './components/HowItWorksSection';

const howItWorksSteps = [
  {
    icon: "/icons/Search Progress.png",
    label: "Step 1: Browse",
    content: "Browse available Accelerators to discover ready-made solutions tailored to your customer needs."
  },
  {
    icon: "/icons/Editor.png",
    label: "Step 2: Select",
    content: "Select the accelerator that best fits your business use case and adapt it to your needs using built-in configuration options."
  },
  {
    icon: "/icons/Grid List.png",
    label: "Step 3: Review",
    content: "Review pre-requisites and costing to ensure alignment with your organizational needs."
  },
  {
    icon: "/icons/AI Flash Sparkle.png",
    label: "Step 4: Deploy",
    content: "Use deployment guide to launch your solution quickly and securely."
  }
];

function App() {
  return (
    <HowItWorksSection
      title="How it works"
      steps={howItWorksSteps}
    />
  );
}
```

## Styling

The component uses Fluent UI's `makeStyles` for styling and includes:

- **Responsive grid**: 1 column on mobile, 2 on tablet, 4 on desktop
- **Centered layout**: Title and content are centered
- **Line separators**: Visual dividers between icons and text
- **Icon containers**: 64x64px containers for consistent icon display
- **Hover effects**: Subtle animations on step items

## Icon Requirements

Icons should be:
- **Format**: PNG or SVG with transparency
- **Size**: Recommended 64x64px or larger (will be scaled down)
- **Style**: Translucent, glassy appearance to match design
- **Location**: Stored in `/public/icons/` directory

## Accessibility

- Semantic HTML structure with `<section>` element
- Proper alt text for all icons
- Keyboard navigation support
- Screen reader friendly content structure 
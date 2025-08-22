# Footer Component

A configurable footer component that displays a headline, contact information with an icon, navigation links, and copyright information.

## Usage

```tsx
import Footer from './components/Footer';

const footerLinks = [
  { text: "Sitemap", url: "#" },
  { text: "Contact Microsoft", url: "#" },
  { text: "Privacy", url: "#" },
  { text: "Terms of use", url: "#" },
  { text: "Trademarks", url: "#" },
  { text: "Safety & eco", url: "#" },
  { text: "Recycling", url: "#" },
  { text: "About our ads", url: "#" }
];

<Footer
  headline="Always current. Fully maintained."
  content="We're here to help. Whether you're looking for answers, want to share feedback, or just have a question — <a href='mailto:CSAGoldStandards@service.microsoft.com'>Get in touch</a> and we'll connect with you soon."
  links={footerLinks}
/>
```

## Props

### FooterProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headline` | `string` | Yes | - | Main headline text (centered) |
| `iconUrl` | `string` | No | `"/icons/Illustration.png"` | URL to the icon image |
| `content` | `string` | Yes | - | HTML content for the right side content block |
| `links` | `FooterLink[]` | Yes | - | Array of footer navigation links |
| `copyright` | `string` | No | Auto-generated | Custom copyright text (auto-generates with current year if not provided) |
| `className` | `string` | No | `""` | Additional CSS classes |

### FooterLink

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | Yes | - | Link text |
| `url` | `string` | Yes | - | Link URL |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | No | `'_self'` | Link target attribute |

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Configurable Content**: All text and links can be customized
- **Auto-generated Copyright**: Automatically uses current year if not specified
- **HTML Content Support**: Right-side content block supports HTML
- **Accessibility**: Proper semantic HTML and ARIA attributes
- **Icon Integration**: Uses the envelope illustration with @ symbol overlay

## Layout

The footer consists of two main sections:

1. **Top Section**: Headline (centered) and contact information with icon
2. **Bottom Section**: Navigation links (left) and copyright (right)

On mobile devices, the layout stacks vertically for better usability. 
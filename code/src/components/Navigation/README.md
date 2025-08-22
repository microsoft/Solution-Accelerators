# Navigation Component

A responsive navigation component that displays tabs for page navigation with a hamburger menu for mobile devices.

## Features

- **Responsive Design**: Automatically switches between desktop tabs and mobile hamburger menu
- **Smooth Scrolling**: Clicking tabs scrolls to corresponding page sections
- **Sticky Header**: Can be configured to show/hide based on scroll position
- **Customizable**: Accepts an array of tabs and optional feedback button configuration

## Props

### NavigationProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tabs` | `NavigationTab[]` | Yes | - | Array of navigation tabs |
| `selectedTab` | `string` | Yes | - | Currently selected tab value |
| `onTabSelect` | `(tab: string) => void` | Yes | - | Callback when a tab is selected |
| `isVisible` | `boolean` | Yes | - | Whether the navigation header is visible |
| `onFeedbackClick` | `() => void` | No | - | Custom feedback button click handler |
| `feedbackButtonText` | `string` | No | "Share your feedback" | Text for the feedback button |

### NavigationTab

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | Yes | Unique identifier for the tab |
| `label` | `string` | Yes | Display text for the tab |
| `targetId` | `string` | Yes | ID of the element to scroll to when clicked |

## Usage

```tsx
import Navigation, { NavigationTab } from './components/Navigation';

const navigationTabs: NavigationTab[] = [
  {
    value: "featured",
    label: "Featured accelerators",
    targetId: "featured"
  },
  {
    value: "all",
    label: "All accelerators", 
    targetId: "accelerators"
  },
  // ... more tabs
];

function App() {
  const [selectedTab, setSelectedTab] = useState("featured");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const handleFeedbackClick = () => {
    // Custom feedback handling
  };

  return (
    <Navigation
      tabs={navigationTabs}
      selectedTab={selectedTab}
      onTabSelect={setSelectedTab}
      isVisible={isHeaderVisible}
      onFeedbackClick={handleFeedbackClick}
      feedbackButtonText="Share your feedback"
    />
  );
}
```

## Responsive Behavior

- **Desktop (>768px)**: Shows full tab list with feedback button
- **Mobile (≤768px)**: Shows hamburger menu with feedback button (shortened text)

## Styling

The component uses CSS classes for styling. Key classes:

- `.navigation-header`: Main header container
- `.desktop-nav`: Desktop navigation tabs
- `.mobile-nav`: Mobile hamburger menu
- `.feedback-button`: Feedback button styling

## Dependencies

- `@fluentui/react-components`: For UI components (TabList, Tab, Menu, Button)
- `@fluentui/react-icons`: For icons (Mail20Regular, Hamburger20Regular) 
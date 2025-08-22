# VideoPlayer Component

A reusable YouTube video player component with thumbnail preview and play button overlay.

## Props

### `videoUrl: string`
YouTube video URL (supports embed, watch, and short URLs).

### `autoplay?: boolean`
Whether the video should autoplay when loaded. Defaults to `false`.

### `className?: string`
Optional additional CSS classes.

### `aspectRatio?: string`
Optional aspect ratio override. Defaults to `aspect-[16/9]`.

## Features

- **Smart URL Parsing**: Automatically extracts video ID from various YouTube URL formats
- **Thumbnail Preview**: Shows video thumbnail with play button overlay
- **Click to Play**: Click the play button to start the video
- **Autoplay Support**: Configurable autoplay behavior
- **Responsive Design**: Maintains aspect ratio across screen sizes
- **Customizable Styling**: Supports custom CSS classes and aspect ratios

## Usage Examples

### Basic Usage
```tsx
import VideoPlayer from './components/VideoPlayer';

<VideoPlayer 
  videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
/>
```

### With Autoplay
```tsx
<VideoPlayer 
  videoUrl="https://youtu.be/dQw4w9WgXcQ"
  autoplay={true}
/>
```

### Custom Styling
```tsx
<VideoPlayer 
  videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
  className="my-custom-class"
  aspectRatio="aspect-video"
/>
```

### Different YouTube URL Formats
The component supports various YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## Integration with HeroSection

This component is designed to work seamlessly with the HeroSection component. The HeroSection can now use this VideoPlayer instead of having embedded video logic. 
import React from 'react';
import './VideoPlayer.css';

export interface VideoPlayerProps {
  /** YouTube video URL (supports embed, watch, and short URLs) */
  videoUrl: string;
  /** Whether the video should autoplay when loaded */
  autoplay?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Optional aspect ratio override (defaults to 16/9) */
  aspectRatio?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  autoplay = false,
  className = '',
  aspectRatio = 'aspect-[16/9]'
}) => {
  const handleVideoClick = () => {
    const iframe = document.getElementById('youtube-iframe') as HTMLIFrameElement;
    const preview = document.getElementById('video-preview') as HTMLDivElement;
    
    if (iframe && preview) {
      iframe.style.opacity = '1';
      iframe.style.pointerEvents = 'auto';
      preview.style.display = 'none';
    }
  };

  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  const videoId = getVideoId(videoUrl);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  // Build the iframe src with autoplay parameter
  const iframeSrc = `https://www.youtube.com/embed/${videoId}?rel=0autoplay=${autoplay ? '1' : '0'}`;

  return (
    <div className={`w-full max-w-7xl ${aspectRatio} relative rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* Video Preview with Play Button */}
      <div 
        className="absolute inset-0 bg-black/10 flex items-center justify-center cursor-pointer group z-10"
        onClick={handleVideoClick}
        id="video-preview"
      >
        {/* Video Thumbnail */}
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Play Button */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-black/80 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      
      {/* YouTube iframe */}
      <iframe
        id="youtube-iframe"
        className="absolute inset-0 w-full h-full transition-opacity duration-300"
        src={iframeSrc}
        title="Video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
    </div>
  );
};

export default VideoPlayer; 
import React from 'react';
import { Title1, Subtitle1, Button } from '@fluentui/react-components';
import { REVERSE_SECTION_MAPPING } from '../../utils/sectionMapping';
import './TextSection.css';

export interface LinkConfig {
  text: string;
  url: string;
  target?: '_blank' | '_self';
}

export interface TextSectionProps {
  /** Main title with support for HTML */
  title: string;
  /** Content description */
  content: string;
  /** Link configuration */
  link: LinkConfig;
  /** Additional CSS classes */
  className?: string;
  /** Navigation callback for deep linking */
  onNavigate?: (section: string) => void;
}

const TextSection: React.FC<TextSectionProps> = ({
  title,
  content,
  link,
  className = '',
  onNavigate
}) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (onNavigate && link.url.startsWith('#')) {
      const targetId = link.url.substring(1);
      const section = REVERSE_SECTION_MAPPING[targetId];
      if (section) {
        onNavigate(section);
        return;
      }
    }
    
    if (link.url.startsWith('#')) {
      const targetId = link.url.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      if (link.target === '_blank') {
        window.open(link.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = link.url;
      }
    }
  };

  return (
    <section className={`py-16 px-4 flex flex-col ${className}`}>
      <div className="max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center text-center">
        <div className="max-w-5xl mb-8">
          <Title1 
            className="mb-6 text-center"
            style={{ fontSize: '2rem' }}
          >
            {title.split('<br />').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < title.split('<br />').length - 1 && <br />}
              </React.Fragment>
            ))}
          </Title1>
          <Subtitle1 
            as="p"
            block
            align="center"
            className="mb-6 text-black font-bold text-xl md:text-2xl max-w-4xl mx-auto leading-tight"
          >
            {content}
          </Subtitle1>
          <Button 
            appearance="primary" 
            size="large"
            onClick={handleLinkClick}
          >
            {link.text}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TextSection; 
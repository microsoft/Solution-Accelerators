import React from 'react';
import { Title2, Text, Link } from '@fluentui/react-components';
import './Footer.css';

export interface FooterLink {
  text: string;
  url: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface FooterProps {
  /** Main headline text (left-aligned) */
  headline: string;
  /** URL to the icon image (will use Illustration.png from icons folder) */
  iconUrl?: string;
  /** HTML content for the right side content block */
  content: string;
  /** Array of footer navigation links */
  links: FooterLink[];
  /** Custom copyright text (optional, will auto-generate with current year if not provided) */
  copyright?: string;
  /** Additional CSS classes */
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  headline,
  iconUrl = "/icons/Illustration.png",
  content,
  links,
  copyright,
  className = ''
}) => {
  // Generate copyright text with current year if not provided
  const copyrightText = copyright || `© Microsoft ${new Date().getFullYear()}`;

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-headline">
            <Title2>{headline}</Title2>
          </div>
          <div className="footer-content">
            <div className="footer-icon">
              <img src={iconUrl} alt="Contact us" className="envelope-icon" />
            </div>
            <div 
              className="footer-text"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-links">
            {links.map((link, index) => (
              <Link 
                key={index}
                href={link.url} 
                target={link.target}
                appearance="subtle"
              >
                {link.text}
              </Link>
            ))}
          </div>
          <div className="footer-copyright">
            <Text className="copyright-text">{copyrightText}</Text>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
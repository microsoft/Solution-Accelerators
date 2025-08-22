import React from 'react';
import { Title1, Subtitle1, Button } from '@fluentui/react-components';
import type { SuccessStoriesSectionProps } from '../../types';
import './CustomerTrustSection.css';

export interface LinkConfig {
  text: string;
  url: string;
  target?: '_blank' | '_self';
}

export interface CustomerTrustSectionProps {
  /** Main title for the trusted customers section */
  trustedTitle: string;
  /** Content description for trusted customers */
  trustedContent: string;
  /** Link configuration for trusted customers */
  trustedLink: LinkConfig;
  /** Title for the developer quotes section */
  developerTitle: string;
  /** Quotes for the developer section */
  quotes: SuccessStoriesSectionProps['quotes'];
  /** Additional CSS classes */
  className?: string;
}

const CustomerTrustSection: React.FC<CustomerTrustSectionProps> = ({
  trustedTitle,
  trustedContent,
  trustedLink,
  developerTitle,
  quotes,
  className = ''
}) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (trustedLink.url.startsWith('#')) {
      const targetId = trustedLink.url.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      if (trustedLink.target === '_blank') {
        window.open(trustedLink.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = trustedLink.url;
      }
    }
  };

  return (
    <section className={`customer-trust-section ${className}`}>
      {/* Trusted by Customers Section */}
      <div className="trusted-customers-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex flex-col items-center gap-4">
              <Title1 align="center">
                {trustedTitle}
              </Title1>
              <Subtitle1 
                as="p"
                block
                align="center"
                className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-normal"
              >
                {trustedContent}
              </Subtitle1>
            </div>
            <div className="mt-6">
              <Button 
                appearance="primary" 
                size="large"
                onClick={handleLinkClick}
              >
                {trustedLink.text}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Loved by Developers Section */}
      {quotes.length > 0 && (
        <div className="loved-developers-section">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center w-full mb-8">
              <Title1 align="center">
                {developerTitle}
              </Title1>
            </div>
        
            <div className="quotes-grid">
              {quotes.slice(0, 4).map((quote, index) => (
                <div key={index} className="testimonial-card">
              <div className="quote-icon">
                <img src="/icons/quote.png" alt="Quote" />
              </div>
              <p className="quote-text">
                {quote.quote}
              </p>
              <p className="author-title">{quote.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerTrustSection; 
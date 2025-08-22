import { useState, useEffect } from 'react';
import { Button, Title1 } from '@fluentui/react-components';
import { OpenRegular } from '@fluentui/react-icons';
import type { AcceleratorCard } from '../../types';
import './FeaturedSection.css';

interface FeaturedSectionProps {
  title?: string;
  acceleratorNames: string[];
  allCards: AcceleratorCard[]; // Pass the full cards array from App.tsx
}

// Map accelerator names to their image files (keeping this for consistent visuals)
const ACCELERATOR_IMAGE_MAP: Record<string, { 
  imageFile: string;
  figmaDescription?: string; // Optional figma description for known accelerators
}> = {
  'Multi-Agent Custom Automation Engine': {
    imageFile: 'multiagent.png',
    figmaDescription: "Delegate complex, repetitive tasks to AI agents that act on your behalf—executing work efficiently, reducing manual effort, and ensuring results align with your organization's standards."
  },
  'Content Processing': {
    imageFile: 'contentprocessing.png',
    figmaDescription: "Speed up document-heavy tasks using AI that understands text, tables, and charts—turning them into clear, usable data. Process claims, invoices, and contracts with precision and confidence."
  },
  'Conversation Knowledge Mining': {
    imageFile: 'conversationknowledgemining.png',
    figmaDescription: "Improve contact center performance with AI-powered conversation intelligence—analyzing audio and text data on a large scale to show insights, improve service, and drive smarter decisions."
  }
};

const FeaturedSection = ({ title = "Featured AI Accelerators", acceleratorNames, allCards }: FeaturedSectionProps) => {
  const [featuredCards, setFeaturedCards] = useState<AcceleratorCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter the cards array to get only the requested featured accelerators
  useEffect(() => {
    setIsLoading(true);
    
    // Find cards that match the requested accelerator names and preserve order
    const filteredCards = acceleratorNames
      .map(name => allCards.find(card => card.accelerator === name))
      .filter((card): card is AcceleratorCard => card !== undefined);
    
    // Log any missing accelerators for debugging
    const foundNames = filteredCards.map(card => card.accelerator);
    const missingNames = acceleratorNames.filter(name => !foundNames.includes(name));
    if (missingNames.length > 0) {
      console.warn('Featured accelerators not found in data:', missingNames);
    }
    
    setFeaturedCards(filteredCards);
    setIsLoading(false);
  }, [acceleratorNames, allCards]);

  if (isLoading) {
    return (
      <section className="featured-section">
        <div className="featured-container">
          <Title1 className="featured-title">{title}</Title1>
          <div className="loading">Loading featured accelerators...</div>
        </div>
      </section>
    );
  }

  if (featuredCards.length === 0) {
    return (
      <section className="featured-section">
        <div className="featured-container">
          <Title1 className="featured-title">{title}</Title1>
          <div className="loading">No featured accelerators found. Please check the accelerator names.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-section">
      <div className="featured-container">
        <Title1 className="featured-title">{title}</Title1>
        <div className="featured-grid">
          {featuredCards.map((card, index) => {
            const imageMapping = ACCELERATOR_IMAGE_MAP[card.accelerator];
            const isImageRight = index % 2 === 0; // Alternate image position

            return (
              <div key={card.accelerator} className={`featured-item ${isImageRight ? 'image-right' : 'image-left'}`}>
                {/* Text Content */}
                <div className="featured-text-content">
                  <h3 className="featured-card-title">{card.accelerator}</h3>
                  <p className="featured-card-description">
                    {imageMapping?.figmaDescription || card.excerpt}
                  </p>
                  
                  {/* Products and services */}
                  {card.productsAndServices && card.productsAndServices.length > 0 && (
                    <div className="featured-subsection">
                      <div className="featured-subsection-title">Products and services</div>
                      <div className="featured-chips">
                        {card.productsAndServices.slice(0, 6).map((item, i) => (
                          <span key={`product-${i}`} className="featured-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {card.programmingLanguages && card.programmingLanguages.length > 0 && (
                    <div className="featured-subsection">
                      <div className="featured-subsection-title">Languages</div>
                      <div className="featured-languages">
                        {card.programmingLanguages.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* GitHub Button */}
                  <div className="featured-button">
                    {card.githubUrl ? (
                      <a
                        href={card.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button appearance="primary" icon={<OpenRegular />}>
                          Open in GitHub
                        </Button>
                      </a>
                    ) : (
                      <Button appearance="primary" icon={<OpenRegular />} disabled>
                        Open in GitHub
                      </Button>
                    )}
                  </div>
                </div>

                {/* Image Content */}
                <div className="featured-image-container">
                  {imageMapping ? (
                    <img
                      src={`/featured/${imageMapping.imageFile}`}
                      alt={`${card.accelerator} screenshot`}
                      className="featured-image"
                    />
                  ) : (
                    // For accelerators without image mapping, show placeholder
                    <div className="featured-image-placeholder">
                      <span>{card.accelerator}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection; 
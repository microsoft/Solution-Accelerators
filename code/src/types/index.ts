// Asset type for card resources
export interface AcceleratorAsset {
  label: string;
  href: string;
  fileType?: string;
}

// Main accelerator card interface
export interface AcceleratorCard {
  solutionPlays: string[];
  solutionAreas: string[];
  keys: string[];
  stability: string;
  accelerator: string;
  excerpt: string;
  productsAndServices: string[];
  programmingLanguages: string[];
  githubUrl: string;
  assets?: AcceleratorAsset[];
  technicalPattern?: string;
  foundryTemplateName?: string;
  useCases?: string[];
  keywords?: string[];
  industries?: string[];
  releaseDate: string;
}

// Navigation section interface
export interface NavigationSection {
  id: string;
  title: string;
  component: React.ComponentType;
}

// Filter options interface
export interface FilterOptions {
  [key: string]: string[];
}

// Card variant types
export type CardVariant = 'featured' | 'standard' | 'compact';
export type CardSize = 'small' | 'medium' | 'large';

// Extended card props interface for components
export interface CardProps extends AcceleratorCard {
  variant?: CardVariant;
  size?: CardSize;
  searchQuery?: string;
  onClick?: () => void;
}

// Success Stories Section interfaces
export interface TestimonialQuote {
  quote: string;
  author: string;
}

export interface SuccessStoriesSectionProps {
  title?: string;
  quotes: TestimonialQuote[];
} 
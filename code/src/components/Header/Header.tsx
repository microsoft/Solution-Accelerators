import React from 'react';
import { Text } from '@fluentui/react-components';
import './Header.css';

export interface HeaderProps {
  /** Logo component or image URL */
  logo: React.ReactNode;
  /** Main title text */
  title: string;
  /** Subtitle text (optional) */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  title,
  subtitle,
  className = ''
}) => {
  return (
    <header className={`w-full bg-transparent backdrop-blur-md py-3 ${className}`}>
      <div className="flex items-center gap-2" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        {logo}
        <Text weight="semibold" size={200} className="text-gray-900">
          {title}
          {subtitle && (
            <Text as="span" weight="regular" size={200} className="text-gray-600"> | {subtitle}</Text>
          )}
        </Text>
      </div>
    </header>
  );
};

export default Header; 
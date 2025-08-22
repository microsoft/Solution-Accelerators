import { useState, useEffect, useCallback } from 'react';

interface UseNavigationOptions {
  scrollOffset?: number;
  sectionMapping?: Record<string, string>;
}

export const useNavigation = (options: UseNavigationOptions = {}) => {
  const { 
    scrollOffset = 60,
    sectionMapping = {
      'featured': 'featured',
      'accelerators': 'accelerators',
      'differentiators': 'differentiators',
      'how-it-works': 'how-it-works',
      'success-stories': 'customer-trust'
    }
  } = options;
  
  const [currentSection, setCurrentSection] = useState<string>('home');

  const updateURL = useCallback((section: string) => {
    const url = section === 'home' ? '/' : `/${section}`;
    const currentUrl = window.location.pathname;
    
    if (currentUrl !== url) {
      window.history.pushState({ section }, '', url);
    }
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementTop = element.offsetTop - scrollOffset;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  }, [scrollOffset]);

  const setSection = useCallback((section: string, source: 'click' | 'browser') => {
    if (section === currentSection) return;
    
    setCurrentSection(section);
    updateURL(section);
    
    if (source === 'click') {
      const targetId = sectionMapping[section] || section;
      scrollToSection(targetId);
    }
  }, [currentSection, updateURL, sectionMapping, scrollToSection]);

  const handleHeaderVisibility = useCallback(() => {
    const featuredElement = document.getElementById('featured');
    const scrollPosition = window.scrollY;
    
    if (featuredElement) {
      const featuredTop = featuredElement.offsetTop - scrollOffset;
      const buffer = 61;
      const isVisible = scrollPosition > featuredTop - buffer;
      
      return isVisible;
    }
    return scrollPosition > 200;
  }, [scrollOffset]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const section = path === '/' ? 'home' : path.slice(1);
      setSection(section, 'browser');
    };

    const handleInitialURL = () => {
      const path = window.location.pathname;
      const section = path === '/' ? 'home' : path.slice(1);
      setCurrentSection(section);
    };

    window.addEventListener('popstate', handlePopState);
    handleInitialURL();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setSection]);

  return {
    currentSection,
    navigateToSection: setSection,
    handleHeaderVisibility
  };
}; 
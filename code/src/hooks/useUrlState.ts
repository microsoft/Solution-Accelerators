import { useState, useEffect, useCallback, useRef } from 'react';
import { SECTION_MAPPING } from '../utils/sectionMapping';

interface UseUrlStateOptions {
  defaultSection?: string;
  scrollOffset?: number;
  sectionMapping?: Record<string, string>;
}

export const useUrlState = (options: UseUrlStateOptions = {}) => {
  const { 
    defaultSection = 'home', 
    scrollOffset = 60,
    sectionMapping = SECTION_MAPPING
  } = options;
  
  const [currentSection, setCurrentSection] = useState<string>(defaultSection);
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();
  const lastManualNavigationRef = useRef<string>('');

  const updateUrl = useCallback((section: string) => {
    const newUrl = section === 'home' ? '/' : `/${section}`;
    window.history.pushState({ section }, '', newUrl);
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

  const navigateToSection = useCallback((section: string) => {
    isNavigatingRef.current = true;
    lastManualNavigationRef.current = section;
    setCurrentSection(section);
    updateUrl(section);
    const targetId = sectionMapping[section] || section;
    scrollToSection(targetId);
    
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
      lastManualNavigationRef.current = '';
    }, 1500);
  }, [updateUrl, scrollToSection, sectionMapping]);

  const updateUrlFromSectionId = useCallback((sectionId: string) => {
    if (isNavigatingRef.current) {
      return;
    }
    
    const section = Object.keys(sectionMapping).find(key => sectionMapping[key] === sectionId);
    
    if (section && section !== lastManualNavigationRef.current) {
      setCurrentSection(section);
      updateUrl(section);
    }
  }, [sectionMapping, updateUrl, currentSection]);

  const handleScrollForHomePage = useCallback(() => {
    if (isNavigatingRef.current) return;
    
    const scrollY = window.scrollY;
    const featuredElement = document.getElementById('featured');
    
    if (featuredElement) {
      const featuredTop = featuredElement.offsetTop - scrollOffset;
      
      // If we're above the featured section, we're on the home page
      if (scrollY < featuredTop) {
        if (currentSection !== 'home') {
          setCurrentSection('home');
          window.history.pushState({ section: 'home' }, '', '/');
        }
      }
    }
  }, [currentSection, scrollOffset]);

  const handleScrollForUrlUpdates = useCallback(() => {
    if (isNavigatingRef.current) return;
    
    const scrollY = window.scrollY;
    const featuredElement = document.getElementById('featured');
    
    if (featuredElement) {
      const featuredTop = featuredElement.offsetTop - scrollOffset;
      
      // If we're above the featured section, we're on the home page
      if (scrollY < featuredTop) {
        if (currentSection !== 'home') {
          setCurrentSection('home');
          window.history.pushState({ section: 'home' }, '', '/');
        }
      } else {
        // We're in or below the featured section
        if (currentSection !== 'featured') {
          setCurrentSection('featured');
          window.history.pushState({ section: 'featured' }, '', '/featured');
        }
      }
    }
  }, [currentSection, scrollOffset]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const section = path === '/' ? 'home' : path.slice(1);
      setCurrentSection(section);
      const targetId = sectionMapping[section] || section;
      scrollToSection(targetId);
    };

    const handleInitialUrl = () => {
      const path = window.location.pathname;
      const section = path === '/' ? 'home' : path.slice(1);
      setCurrentSection(section);
      
      if (section !== 'home' || path !== '/') {
        setTimeout(() => {
          const targetId = sectionMapping[section] || section;
          scrollToSection(targetId);
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('scroll', handleScrollForHomePage, { passive: true });
    window.addEventListener('scroll', handleScrollForUrlUpdates, { passive: true });
    handleInitialUrl();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleScrollForHomePage);
      window.removeEventListener('scroll', handleScrollForUrlUpdates);
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [scrollToSection, sectionMapping, handleScrollForHomePage, handleScrollForUrlUpdates]);

  return {
    currentSection,
    navigateToSection,
    updateUrl,
    updateUrlFromSectionId
  };
}; 
import { useState, useEffect, useCallback } from 'react';
import { 
  getSectionFromUrl, 
  updateUrlWithSection
} from '../utils/sortDeepLink';
import { SECTION_MAPPING } from '../utils/sectionMapping';

interface UseScrollNavigationOptions {
  defaultSection?: string;
  scrollOffset?: number;
  sectionMapping?: Record<string, string>;
}

export const useScrollNavigation = (options: UseScrollNavigationOptions = {}) => {
  const { 
    defaultSection = 'home', 
    scrollOffset = 60,
    sectionMapping = SECTION_MAPPING
  } = options;
  
  const [currentSection, setCurrentSection] = useState<string>(defaultSection);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isUpdatingUrl, setIsUpdatingUrl] = useState(false);

  const updateUrl = useCallback((section: string) => {
    setIsUpdatingUrl(true);
    if (section === 'home') {
      updateUrlWithSection('');
    } else {
      updateUrlWithSection(section);
    }
    setTimeout(() => setIsUpdatingUrl(false), 100);
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
    setIsNavigating(true);
    setCurrentSection(section);
    updateUrl(section);
    
    const targetId = sectionMapping[section] || section;
    scrollToSection(targetId);
    
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  }, [updateUrl, scrollToSection, sectionMapping]);

  const handleHeaderVisibility = useCallback(() => {
    const scrollY = window.scrollY;
    const featuredElement = document.getElementById('featured');
    
    if (featuredElement) {
      const featuredTop = featuredElement.offsetTop - scrollOffset;
      setIsHeaderVisible(scrollY >= featuredTop);
    }
  }, [scrollOffset]);

  const getCurrentSectionFromScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const sections = Object.entries(sectionMapping);
    
    const firstSection = sections[0];
    if (firstSection) {
      const firstElement = document.getElementById(firstSection[1]);
      if (firstElement) {
        const firstSectionTop = firstElement.offsetTop - scrollOffset;
        if (scrollY < firstSectionTop) {
          return 'home';
        }
      }
    }
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const [section, sectionId] = sections[i];
      const element = document.getElementById(sectionId);
      if (!element) continue;
      
      const sectionTop = element.offsetTop - scrollOffset;
      if (scrollY >= sectionTop) {
        return section;
      }
    }
    
    return 'home';
  }, [sectionMapping, scrollOffset]);

  const handleScrollForSectionDetection = useCallback(() => {
    if (isNavigating) return;
    
    const newSection = getCurrentSectionFromScroll();
    
    if (newSection !== currentSection) {
      setCurrentSection(newSection);
      updateUrl(newSection);
    }
  }, [currentSection, getCurrentSectionFromScroll, updateUrl, isNavigating]);

  useEffect(() => {
    const handlePopState = () => {
      if (isUpdatingUrl) return;
      
      const sectionFromUrl = getSectionFromUrl();
      const section = sectionFromUrl || 'home';
      setCurrentSection(section);
      
      if (section !== 'home') {
        const targetId = sectionMapping[section] || section;
        scrollToSection(targetId);
      }
    };

    const handleInitialUrl = () => {
      const sectionFromUrl = getSectionFromUrl();
      const section = sectionFromUrl || 'home';
      setCurrentSection(section);
      
      if (section !== 'home') {
        setTimeout(() => {
          const targetId = sectionMapping[section] || section;
          scrollToSection(targetId);
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('scroll', handleHeaderVisibility, { passive: true });
    window.addEventListener('scroll', handleScrollForSectionDetection, { passive: true });
    
    handleInitialUrl();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleHeaderVisibility);
      window.removeEventListener('scroll', handleScrollForSectionDetection);
    };
  }, [handleHeaderVisibility, handleScrollForSectionDetection, scrollToSection, sectionMapping]);

  return {
    currentSection,
    isHeaderVisible,
    navigateToSection
  };
}; 
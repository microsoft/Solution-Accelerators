import { useState, useEffect, useCallback, useRef } from 'react';
import { SECTION_MAPPING } from '../utils/sectionMapping';
import { getSectionFromUrl, updateUrlWithSection } from '../utils/sortDeepLink';

export const useNavigationWithUrl = () => {
  const [currentSection, setCurrentSection] = useState<string>('home');

  // Simple section detection - just like Microsoft Teams
  const getCurrentVisibleSection = useCallback(() => {
    const viewportHeight = window.innerHeight;
    
    // Check each section to see which one is most visible
    for (const [section, sectionId] of Object.entries(SECTION_MAPPING)) {
      const element = document.getElementById(sectionId);
      if (!element) continue;
      
      const rect = element.getBoundingClientRect();
      
      // If section is visible in the middle of viewport, it's the current section
      // Using 50% threshold for middle of screen
      if (rect.top <= viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.5) {
        return section;
      }
    }
    
    // If no section is clearly visible, we're in home area
    return 'home';
  }, []);

  // Simple URL update logic - now uses existing utilities
  const updateUrl = useCallback((section: string) => {
    updateUrlWithSection(section);
  }, []);

  // Detect whether the navigation has become sticky with light hysteresis to avoid flicker
  const stickyStateRef = useRef<boolean>(false);
  const isNavigationSticky = useCallback(() => {
    const sentinel = document.querySelector('.navigation-sentinel') as HTMLElement | null;
    if (!sentinel) return false;
    const rect = sentinel.getBoundingClientRect();
    const top = rect.top;
    // Hysteresis: require passing -8px to enter sticky; +12px to exit
    const ENTER_AT = -8;
    const EXIT_AT = 12;

    if (stickyStateRef.current) {
      if (top > EXIT_AT) stickyStateRef.current = false;
    } else {
      if (top <= ENTER_AT) stickyStateRef.current = true;
    }
    return stickyStateRef.current;
  }, []);

  // Simple scroll handler - only updates URL
  const handleScroll = useCallback(() => {
    // Gate updates until the navigation has actually become sticky
    if (!isNavigationSticky()) {
      if (currentSection !== 'home') {
        setCurrentSection('home');
        // Clear section parameter so the URL reflects "home"
        updateUrlWithSection('');
      }
      return;
    }

    const newSection = getCurrentVisibleSection();
    if (newSection !== currentSection) {
      setCurrentSection(newSection);
      updateUrl(newSection);
    }
  }, [currentSection, getCurrentVisibleSection, updateUrl, isNavigationSticky]);

  // Handle browser back/forward - now uses existing utilities
  const handlePopState = useCallback(() => {
    const section = getSectionFromUrl();
    const validSection = section || 'home';
    setCurrentSection(validSection);
    
    // Scroll to the section when navigating via browser back/forward
    if (validSection !== 'home') {
      // If nav is not yet sticky, scroll to the nav first so behavior mirrors manual scroll
      if (!isNavigationSticky()) {
        const nav = document.getElementById('site-nav');
        if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const sectionId = SECTION_MAPPING[validSection];
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [isNavigationSticky]);

  // Add scroll-to-section function for navigation clicks
  const scrollToSection = useCallback((section: string) => {
    const sectionId = SECTION_MAPPING[section];
    if (!sectionId) return;
    
    const element = document.getElementById(sectionId);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    // Set initial section based on URL - now uses existing utilities
    const section = getSectionFromUrl();
    const initialSection = section || 'home';
    setCurrentSection(initialSection);

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleScroll, handlePopState]);

  // Handle initial deep link navigation - now uses existing utilities
  useEffect(() => {
    const section = getSectionFromUrl();
    if (!section) return;

    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const sectionId = SECTION_MAPPING[section];
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          // If nav is not sticky yet, bring the nav into view first
          if (!isNavigationSticky()) {
            const nav = document.getElementById('site-nav');
            if (nav) nav.scrollIntoView({ behavior: 'auto', block: 'start' as ScrollLogicalPosition });
          }
          element.scrollIntoView({ behavior: 'auto', block: 'start' as ScrollLogicalPosition });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isNavigationSticky]); // Only run once on mount

  return {
    currentSection,
    scrollToSection
  };
}; 
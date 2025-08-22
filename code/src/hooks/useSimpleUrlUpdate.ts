import { useState, useEffect, useCallback } from 'react';
import { SECTION_MAPPING } from '../utils/sectionMapping';

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

  // Simple URL update logic
  const updateUrl = useCallback((section: string) => {
    if (section === 'home') {
      // Remove hash for home section
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else {
      // Add hash for other sections
      const newHash = `#${section}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
      }
    }
  }, []);

  // Simple scroll handler - only updates URL
  const handleScroll = useCallback(() => {
    const newSection = getCurrentVisibleSection();
    if (newSection !== currentSection) {
      setCurrentSection(newSection);
      updateUrl(newSection);
    }
  }, [currentSection, getCurrentVisibleSection, updateUrl]);

  // Handle browser back/forward
  const handlePopState = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    const section = hash || 'home';
    setCurrentSection(section);
  }, []);

  // Add scroll-to-section function for navigation clicks
  const scrollToSection = useCallback((section: string) => {
    const sectionId = SECTION_MAPPING[section];
    if (!sectionId) return;
    
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    // Smooth scroll to section
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  useEffect(() => {
    // Set initial section based on URL
    const hash = window.location.hash.replace('#', '');
    const initialSection = hash || 'home';
    setCurrentSection(initialSection);

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleScroll, handlePopState]);

  return {
    currentSection,
    scrollToSection
  };
}; 
import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  onSectionChange?: (sectionId: string) => void;
  debounceMs?: number;
}

export const useIntersectionObserver = (
  sectionIds: string[],
  options: UseIntersectionObserverOptions = {}
) => {
  const [activeSection, setActiveSection] = useState<string>('featured');
  const observersRef = useRef<Map<string, IntersectionObserver>>(new Map());
  const { onSectionChange, debounceMs = 300 } = options;
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const lastUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    const { rootMargin = '-15% 0px -15% 0px' } = options;
    
    const sectionStates = new Map<string, { ratio: number; isVisible: boolean; boundingRect: DOMRect }>();
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        sectionStates.set(sectionId, {
          ratio: entry.intersectionRatio,
          isVisible: entry.isIntersecting,
          boundingRect: entry.boundingClientRect
        });
      });

      let bestSection = 'featured';
      let bestScore = -1;

      sectionStates.forEach((state, sectionId) => {
        if (state.isVisible && state.ratio > 0.1) {
          const viewportCenter = window.innerHeight / 2;
          const sectionTop = state.boundingRect.top;
          const sectionHeight = state.boundingRect.height;
          
          const sectionCenter = sectionTop + sectionHeight / 2;
          const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);
          const normalizedDistance = distanceFromCenter / window.innerHeight;
          
          const score = state.ratio * (1 - normalizedDistance);
          
          if (score > bestScore) {
            bestScore = score;
            bestSection = sectionId;
          }
        }
      });

      const now = Date.now();
      if (bestScore > -1 && bestSection !== activeSection && (now - lastUpdateTimeRef.current) > 500) {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
        
        debounceTimeoutRef.current = setTimeout(() => {
          setActiveSection(bestSection);
          onSectionChange?.(bestSection);
          lastUpdateTimeRef.current = Date.now();
        }, debounceMs);
      }
    };

    const timeoutId = setTimeout(() => {
      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const observer = new IntersectionObserver(observerCallback, {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            rootMargin
          });
          
          observer.observe(element);
          observersRef.current.set(sectionId, observer);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      observersRef.current.forEach((observer) => {
        observer.disconnect();
      });
      observersRef.current.clear();
    };
  }, [sectionIds, options.threshold, options.rootMargin, onSectionChange, activeSection, debounceMs]);

  return activeSection;
}; 
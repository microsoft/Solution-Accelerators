import { useEffect, useRef, useState } from 'react';
import {
  Button,
  TabList,
  Tab,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem
} from '@fluentui/react-components';
import { LineHorizontal3Regular } from '@fluentui/react-icons';
import './Navigation.css';
import './NavigationSection.css';

export interface NavigationSectionProps {
  tabs: { value: string; label: string; targetId: string }[];
  selectedTab: string;
  onTabSelect: (tab: string) => void;
  onFeedbackClick?: () => void;
  feedbackButtonText?: string;
}

export default function NavigationSection({
  tabs,
  selectedTab,
  onTabSelect,
  onFeedbackClick,
  feedbackButtonText = 'Share your feedback'
}: NavigationSectionProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);

  // Feedback click fallback
  const handleFeedbackClick = () => {
    if (onFeedbackClick) {
      onFeedbackClick();
    } else {
      window.location.href = 'mailto:CSAGoldStandards@service.microsoft.com?subject=Feedback%20on%20AI%20Accelerators';
    }
  };

  // Toggle stuck/fixed classes when crossing the sentinel
  useEffect(() => {
    const stickyEl = stickyRef.current;
    const sentinelEl = sentinelRef.current;
    const spacerEl = spacerRef.current;
    if (!stickyEl || !sentinelEl) return;

    const applyState = (stuck: boolean) => {
      if (stuck) {
        stickyEl.classList.add('is-stuck');
        stickyEl.classList.add('is-fixed');
        if (spacerEl) spacerEl.classList.add('active');
      } else {
        stickyEl.classList.remove('is-stuck');
        stickyEl.classList.remove('is-fixed');
        if (spacerEl) spacerEl.classList.remove('active');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const sentinelTop = entry.boundingClientRect.top;
        const isAboveTop = sentinelTop <= 0; // sentinel has passed the top of the viewport
        // Only pin when the sentinel is above the top; ignore the case when it's still below the fold
        applyState(!entry.isIntersecting && isAboveTop);
      },
      { threshold: 0 }
    );

    observer.observe(sentinelEl);

    // Initialize state on mount. Avoid showing fixed header when landed at top of page.
    const initRect = sentinelEl.getBoundingClientRect();
    const atTop = window.scrollY <= 0;
    applyState(!atTop && initRect.top <= 0);

    // Fallback for older browsers or edge cases: scroll listener
    const onScroll = () => {
      const rect = sentinelEl.getBoundingClientRect();
      const atTop = window.scrollY <= 0;
      applyState(!atTop && rect.top <= 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => observer.disconnect();
  }, []);

  // Keep a CSS variable up to date with the sticky nav height for scroll-margin-top
  useEffect(() => {
    const stickyEl = stickyRef.current;
    if (!stickyEl) return;
    const updateVar = () => {
      const height = stickyEl.offsetHeight || 64;
      document.documentElement.style.setProperty('--nav-height', `${height}px`);
    };
    updateVar();
    const resizeObserver = new ResizeObserver(updateVar);
    resizeObserver.observe(stickyEl);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section id="site-nav" className="navigation-section">
      {/* Sentinel sits just above the sticky container */}
      <div ref={sentinelRef} aria-hidden="true" className="navigation-sentinel" />
      <div ref={stickyRef} className="navigation-sticky">
        <div className="navigation-container">
          <div className="navigation-content">
            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <TabList
                selectedValue={selectedTab}
                onTabSelect={(_, data) => onTabSelect(data.value as string)}
                size="medium"
                className="!border-b-0"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} value={tab.value} onClick={() => onTabSelect(tab.value)}>
                    {tab.label}
                  </Tab>
                ))}
              </TabList>
            </nav>

            {/* Mobile Navigation */}
            <div className="mobile-nav">
              <Menu open={isMobileMenuOpen} onOpenChange={(_, data) => setIsMobileMenuOpen(data.open)}>
                <MenuTrigger>
                  <Button
                    appearance="subtle"
                    icon={<LineHorizontal3Regular />}
                    className="hamburger-button"
                    aria-label="Open navigation menu"
                  />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    {tabs.map((tab) => (
                      <MenuItem key={tab.value} onClick={() => onTabSelect(tab.value)}>
                        {tab.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>

            {/* Feedback Button */}
            <Button
              appearance="subtle"
              icon={<img src="/icons/Illustration.png" alt="Email" className="w-5 h-5" />}
              onClick={handleFeedbackClick}
              className="feedback-button"
            >
              <span className="feedback-text-full">{feedbackButtonText}</span>
              <span className="feedback-text-mobile">Feedback</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Spacer prevents layout jump when the header becomes fixed */}
      <div ref={spacerRef} className="navigation-spacer" aria-hidden="true" />
    </section>
  );
}


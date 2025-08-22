import { useState } from 'react';
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
import { 
  LineHorizontal3Regular
} from '@fluentui/react-icons';
import './Navigation.css';

export interface NavigationTab {
  value: string;
  label: string;
  targetId: string;
}

export interface NavigationProps {
  tabs: NavigationTab[];
  selectedTab: string;
  onTabSelect: (tab: string) => void;
  isVisible: boolean;
  onFeedbackClick?: () => void;
  feedbackButtonText?: string;
}



export default function Navigation({
  tabs,
  selectedTab,
  onTabSelect,
  isVisible,
  onFeedbackClick,
  feedbackButtonText = "Share your feedback"
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: NavigationTab) => {
    onTabSelect(tab.value);
    setIsMobileMenuOpen(false);
  };

  const handleFeedbackClick = () => {
    if (onFeedbackClick) {
      onFeedbackClick();
    } else {
      window.location.href = "mailto:CSAGoldStandards@service.microsoft.com?subject=Feedback%20on%20AI%20Accelerators";
    }
  };

  return (
    <header className={`navigation-header ${!isVisible ? 'hidden' : ''}`}>
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
                <Tab 
                  key={tab.value}
                  value={tab.value}
                  onClick={() => handleTabClick(tab)}
                >
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
                    <MenuItem
                      key={tab.value}
                      onClick={() => handleTabClick(tab)}
                    >
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
    </header>
  );
} 
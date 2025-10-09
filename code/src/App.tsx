import { useState, useRef, useEffect } from 'react';
import type { AcceleratorCard } from './types';
import cardsData from './data/generated/cards.json';
import './App.css';
import { 
  FluentProvider, 
  webLightTheme, 
  Button,
  Title1,
  Body1,
  Input, 
  Menu, 
  MenuTrigger, 
  MenuPopover, 
  MenuList, 
  MenuItem, 
  Checkbox
} from '@fluentui/react-components';
import { 
  Search20Regular, 
  ArrowSort20Regular, 
  Dismiss20Regular, 
  ChevronDown20Regular, 
  ChevronRight20Regular
} from '@fluentui/react-icons';
import { MicrosoftLogo } from './assets/MicrosoftLogo';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GsaCard from './components/GsaCard/GsaCard';
import { NavigationSection } from './components/Navigation';
import type { NavigationTab } from './components/Navigation';

import FeaturedSection from './components/FeaturedSection';
import DifferentiatorSection from './components/DifferentiatorSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import CustomerTrustSection from './components/CustomerTrustSection';
import Footer from './components/Footer';
import type { FooterLink } from './components/Footer';
import { useNavigationWithUrl } from './hooks/useNavigationWithUrl';
import { useSortDeepLink } from './hooks/useSortDeepLink';
import { useSearchDeepLink } from './hooks/useSearchDeepLink';
import { useFilterDeepLink } from './hooks/useFilterDeepLink';

const cards: AcceleratorCard[] = cardsData as unknown as AcceleratorCard[];

// Default differentiator accordion items
const defaultDifferentiatorItems = [
  {
    id: "proven-architecture",
    label: "Proven architecture",
    content: "Leverage a trusted, scalable solution design based on best practices—built to ensure reliability, security, and performance, so your teams can deploy with confidence.",
    image: "/differentiators/solutionArch.png"
  },
  {
    id: "quick-deployment",
    label: "Quick deployment",
    content: "Deploy solutions quickly with pre-built templates and guided setup instructions.",
    image: "/differentiators/quickDeploy.png"
  },
  {
    id: "accelerated-value",
    label: "Accelerated value",
    content: "Get to market faster with ready-to-use solutions that can be customized to your needs.",
    image: "/differentiators/accelerateValue.png"
  },
  {
    id: "comprehensive-documentation",
    label: "Comprehensive documentation",
    content: "Access detailed documentation, including architecture diagrams, deployment guides, and best practices.",
    image: "/differentiators/compDocumentation.png"
  },
  {
    id: "costing-estimate",
    label: "Costing estimate",
    content: "Understand the cost implications upfront with detailed pricing estimates and optimization guidance.",
    image: "/differentiators/costEstimate.png"
  }
];

// How it works steps data
const howItWorksSteps = [
  {
    icon: "/icons/Search Progress.png",
    label: "Step 1: Browse",
    content: "Browse available accelerators to discover ready-made solutions tailored to your customer needs."
  },
  {
    icon: "/icons/Editor.png",
    label: "Step 2: Select",
    content: "Select the accelerator that best fits your business use case and adapt it to your needs using built-in configuration options."
  },
  {
    icon: "/icons/Grid List.png",
    label: "Step 3: Review",
    content: "Review pre-requisites and costing to ensure alignment with your organizational needs."
  },
  {
    icon: "/icons/AI Flash Sparkle.png",
    label: "Step 4: Deploy",
    content: "Use deployment guide to launch your solution quickly and securely."
  }
];



  // Navigation tabs configuration
  const navigationTabs: NavigationTab[] = [
    {
      value: "featured",
      label: "Featured accelerators",
      targetId: "featured"
    },
    {
      value: "accelerators",
      label: "All accelerators",
      targetId: "accelerators"
    },
    {
      value: "differentiators",
      label: "Differentiators",
      targetId: "differentiators"
    },
    {
      value: "how-it-works",
      label: "How it works",
      targetId: "how-it-works"
    },
    {
      value: "success-stories",
      label: "Success stories",
      targetId: "customer-trust"
    }
  ];

  // Footer links configuration
  const footerLinks: FooterLink[] = [
  { text: "Sitemap", url: "https://www.microsoft.com/en-us/sitemap" },
  { text: "Contact Microsoft", url: "https://support.microsoft.com/contactus" },
  { text: "Privacy", url: "https://www.microsoft.com/en-us/privacy/privacystatement" },
  { text: "Terms of use", url: "https://www.microsoft.com/en-us/legal/terms-of-use" },
  { text: "Trademarks", url: "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks" },
  { text: "Safety & eco", url: "https://www.microsoft.com/en-us/legal/compliance/devices-safety-and-eco" },
  { text: "Recycling", url: "https://www.microsoft.com/en-us/legal/compliance/recycling" },
  { text: "About our ads", url: "https://account.microsoft.com/privacy/ad-settings/signedout?refd=www.microsoft.com&ru=https%3A%2F%2Faccount.microsoft.com%2Fprivacy%2Fad-settings%3Frefd%3Dwww.microsoft.com" }
];

// Filterable fields
const filterableFields = [
  "productsAndServices",
  "industries",
  "programmingLanguages",
];

const filterLabels: Record<string, string> = {
  productsAndServices: "Products and Services",
  industries: "Industries",
  programmingLanguages: "Languages",
};

const sortLabels: Record<string, string> = {
  accelerator: "A-Z",
  acceleratorDesc: "Z-A",
  releaseNewest: "Newest",
  releaseOldest: "Oldest",
};

function App() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const acceleratorsRef = useRef<HTMLElement>(null);
  const differentiatorsRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const customerTrustRef = useRef<HTMLElement>(null);
  
  // Navigation with URL update system
  const { currentSection, scrollToSection } = useNavigationWithUrl();

  // Search and filter state
  const { searchQuery, updateSearch, clearSearch } = useSearchDeepLink("");
  const { sortBy, updateSort } = useSortDeepLink("releaseNewest");
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  // Synchronized height state for cards
  const [excerptHeights, setExcerptHeights] = useState<number[]>([]);
  const [rowHeightVersion] = useState(0);

  // Dynamic filter options
  const dynamicFilterOptions: Record<string, string[]> = {};
  cards.forEach((card) => {
    filterableFields.forEach((field) => {
      const value = card[field as keyof AcceleratorCard];
      if (!value || typeof value === 'boolean') return;
      const values = Array.isArray(value) ? value : [value];
      values.forEach((item) => {
        if (typeof item !== 'string') return;
        if (!dynamicFilterOptions[field]) dynamicFilterOptions[field] = [];
        if (!dynamicFilterOptions[field].includes(item))
          dynamicFilterOptions[field].push(item);
      });
    });
  });

  // Filter state management
  const { selectedItems, updateFilter } = useFilterDeepLink(dynamicFilterOptions);

  // Initialize collapsed sections
  useEffect(() => {
    if (Object.keys(collapsedSections).length > 0) return;
    const initialCollapseState: Record<string, boolean> = {};
    Object.keys(dynamicFilterOptions).forEach((category) => {
      // Default all filter categories to open (not collapsed)
      initialCollapseState[category] = false;
    });
    setCollapsedSections(initialCollapseState);
  }, []);

  // Height reporting functions
  const reportExcerptHeight = (index: number, height: number) => {
    setExcerptHeights(prev => {
      const next = [...prev];
      next[index] = height;
      return next;
    });
  };

  // Filter and search logic
  const filteredCards = cards.filter((card) => {
    const matchesFilters = filterableFields.every((field) => {
      const cardValue = card[field as keyof AcceleratorCard];
      const selectedForField = Object.keys(selectedItems).filter(
        (id) =>
          selectedItems[id] &&
          dynamicFilterOptions[field]?.some(
            (v) => v.toLowerCase().replace(/\s+/g, "_") === id
          )
      );

      if (selectedForField.length === 0) return true;
      if (!cardValue || typeof cardValue === 'boolean') return false;

      const cardValuesNormalized = Array.isArray(cardValue)
        ? cardValue.filter((v): v is string => typeof v === 'string').map((v) => v.toLowerCase().replace(/\s+/g, "_"))
        : [cardValue.toLowerCase().replace(/\s+/g, "_")];

      return selectedForField.some((selected) =>
        cardValuesNormalized.includes(selected)
      );
    });

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      Object.entries(card).some(([, value]) => {
        if (!value) return false;
        if (typeof value === "string")
          return value.toLowerCase().includes(query);
        if (Array.isArray(value)) {
          return value.some((v) => {
            if (typeof v === "string") {
              return v.toLowerCase().includes(query);
            } else if (typeof v === "object" && v.label) {
              return v.label.toLowerCase().includes(query);
            }
            return false;
          });
        }
        return false;
      });

    return matchesFilters && matchesSearch;
  });

  // Sort cards
  filteredCards.sort((a, b) => {
    switch (sortBy) {
      case "accelerator":
        return a.accelerator.localeCompare(b.accelerator);
      case "acceleratorDesc":
        return b.accelerator.localeCompare(a.accelerator);
      case "releaseNewest":
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case "releaseOldest":
        return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
      default:
        return 0;
    }
  });

  const handleTabSelect = (tabValue: string) => {
    scrollToSection(tabValue);
  };

  const handleFeedbackClick = () => {
    window.location.href = "mailto:CSAGoldStandards@service.microsoft.com?subject=Feedback%20on%20AI%20Accelerators";
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="min-h-screen relative">
        <div className="home-hero-gradient">
          {/* Header - Standalone component */}
          <Header
            logo={<MicrosoftLogo />}
            title="Microsoft"
            subtitle="Solution Accelerators"
          />

          {/* Hero Section - Separate component */}
          <HeroSection
            title="Unlock your ability to<br />build AI solutions faster"
            content="Launch AI products faster with enterprise-grade, customizable solutions built on trusted architectures—kept up to date, easy to configure, and supported with guided setup and sample data."
            link={{
              text: "View accelerators",
              url: "#accelerators"
            }}
            onNavigate={scrollToSection}
            videoUrl="https://www.youtube.com/embed/h8Akr8iDims"
            videoAutoplay={false}
          />
        </div>

        {/* In-flow Navigation section that becomes sticky when reached */}
        <NavigationSection
          tabs={navigationTabs}
          selectedTab={currentSection}
          onTabSelect={handleTabSelect}
          onFeedbackClick={handleFeedbackClick}
        />

        {/* Featured Section */}
        <section ref={featuredRef} id="featured" className="section-anchor">
          <FeaturedSection
            title="Featured AI accelerators"
            acceleratorNames={[
              "Multi-Agent Custom Automation Engine",
              "Content Processing", 
              "Conversation Knowledge Mining"
            ]}
            allCards={cards}
          />
        </section>

        {/* Explore all accelerators - White background */}
        <section ref={acceleratorsRef} id="accelerators" className="py-12 bg-white section-anchor">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Filters Sidebar */}
              <div className="w-full lg:w-64 flex-shrink-0 lg:mt-20">
                {Object.entries(dynamicFilterOptions).map(([category, items]) => (
                  <div key={category} className="mb-2">
                    <div
                      className="flex justify-between items-center p-2 rounded-lg cursor-pointer"
                      onClick={() => setCollapsedSections(prev => ({
                        ...prev,
                        [category]: !prev[category]
                      }))}
                    >
                      <span className="font-medium">{filterLabels[category]}</span>
                      {collapsedSections[category] ? <ChevronRight20Regular /> : <ChevronDown20Regular />}
                    </div>
                    {!collapsedSections[category] && (
                      <div className="mt-1 pl-2 flex flex-col gap-1">
                        {items.sort().map((item) => {
                          const itemId = item.toLowerCase().replace(/\s+/g, "_");
                          return (
                            <Checkbox
                              key={itemId}
                              label={item}
                              checked={selectedItems[itemId] || false}
                              onChange={() =>
                                updateFilter(itemId, !selectedItems[itemId], category)
                              }
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Title above search bar */}
                <div className="mb-6 sm:mb-8">
                  <Title1 className="text-2xl sm:text-3xl">Explore all accelerators</Title1>
                </div>
                
                {/* Search and Sort Bar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Input
                      ref={searchInputRef}
                      className="w-full"
                      size="large"
                      placeholder="Search accelerators"
                      value={searchQuery}
                      onChange={(e) => updateSearch(e.target.value)}
                      contentBefore={<Search20Regular />}
                      contentAfter={
                        searchQuery ? (
                          <Button
                            appearance="transparent"
                            icon={<Dismiss20Regular />}
                            onClick={clearSearch}
                          />
                        ) : null
                      }
                    />
                  </div>

                  <Menu>
                    <MenuTrigger disableButtonEnhancement>
                      <Button icon={<ArrowSort20Regular />} appearance="secondary">
                        Sort by
                      </Button>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        {Object.entries(sortLabels).map(([key, label]) => (
                          <MenuItem key={key} onClick={() => updateSort(key)}>
                            {label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredCards.length > 0 ? (
                    filteredCards.map((card, index) => (
                      <GsaCard
                        key={index}
                        {...card}
                        rowHeightVersion={rowHeightVersion}
                        excerptHeight={Math.max(...excerptHeights)}
                        reportExcerptHeight={reportExcerptHeight}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <Body1>No results found. Try adjusting your filters or search terms.</Body1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiators Section */}
        <section ref={differentiatorsRef} id="differentiators" className="section-anchor">
          <DifferentiatorSection
            title="Deliver value faster with accelerators"
            content="Accelerators provide the guidance and tools you need to launch with confidence and deliver results fast."
            accordionItems={defaultDifferentiatorItems}
          />
        </section>

        {/* How it Works Section */}
        <section ref={howItWorksRef} id="how-it-works" className="section-anchor">
          <HowItWorksSection
            title="How it works"
            steps={howItWorksSteps}
          />
        </section>

        {/* Customer Trust & Developer Love Section */}
        <section ref={customerTrustRef} id="customer-trust" className="section-anchor">
          <CustomerTrustSection
            trustedTitle="Trusted by customers"
            trustedContent="Launch AI products faster with enterprise-grade, customizable solutions built on trusted architectures—kept up to date, easy to configure, and supported with guided setup and sample data."
            trustedLink={{
              text: "View Customer Stories",
              url: "https://www.microsoft.com/en-us/customers"
            }}
            developerTitle="Loved by developers"
            quotes={[
             /*  {
                quote: "Lorem ipsum dolor sit amet",
                author: "Jane Doe"
              }  */
            ]}
          />
        </section>

        {/* Footer */}
        <Footer
          headline="Always current. Fully maintained. #"
          content="We're here to help. Whether you're looking for answers, want to share feedback, or just have a question — <span class='footer-nowrap'><a href='mailto:CSAGoldStandards@service.microsoft.com'>Get in touch</a> and we'll connect with you soon.</span>"
          links={footerLinks}
        />
      </div>
    </FluentProvider>
  );
}

export default App;
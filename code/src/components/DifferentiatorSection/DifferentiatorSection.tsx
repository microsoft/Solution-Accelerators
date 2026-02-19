import React, { useState } from 'react';
import {
  Title1,
  Text,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  makeStyles,
  mergeClasses
} from '@fluentui/react-components';
import { ChevronUp20Regular, ChevronDown20Regular } from '@fluentui/react-icons';
import './DifferentiatorSection.css';

export interface DifferentiatorAccordionItem {
  id: string;
  label: string;
  content: string;
  image?: string;
}

export interface DifferentiatorSectionProps {
  title: string;
  content: string;
  accordionItems: DifferentiatorAccordionItem[];
  className?: string;
  backgroundGradient?: 'default' | 'custom';
}

const useStyles = makeStyles({
  contentLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem',
    position: 'relative',
    zIndex: 2,
    '@media (min-width: 768px) and (max-width: 1023px)': {
      flexDirection: 'column',
      gap: '2rem',
    },
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: '3rem',
    },
  },
  accordionContainer: {
    flex: '0 0 auto',
    width: '100%',
    '@media (min-width: 1024px)': {
      width: '45%',
      maxWidth: '450px',
    },
  },
  imageContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '400px',
    '@media (min-width: 768px) and (max-width: 1023px)': {
      height: '450px',
    },
    '@media (min-width: 1024px)': {
      height: '500px',
    },
  },
  accordionItem: {
    border: 'none',
    background: 'transparent',
    marginBottom: '1rem',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '0',
    borderBottom: '1px solid #e5e7eb',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  accordionItemActive: {
    borderLeft: `3px solid #0078d4`,
    paddingLeft: '0.75rem',
    backgroundColor: 'transparent',
    borderRadius: '0',
  },
  accordionHeader: {
    padding: '0.75rem 0.75rem 0.75rem 0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: '600',
    color: '#374151',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  accordionPanel: {
    padding: '0 0.75rem 0.75rem 0',
    color: '#6b7280',
    lineHeight: '1.6',
    fontSize: '0.9rem',
    textAlign: 'left',
  },
  solutionImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    maxHeight: '100%',
    transition: 'opacity 0.3s ease-in-out',
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#000000',
    fontWeight: '700',
    display: 'block',
    width: '100%',
    position: 'relative',
    zIndex: 2,
  },
  sectionContent: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#6b7280',
    lineHeight: '1.6',
    fontSize: '1.1rem',
    display: 'block',
    width: '100%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    zIndex: 2,
  },
});

const DifferentiatorSection: React.FC<DifferentiatorSectionProps> = ({
  title,
  content,
  accordionItems,
  className
}) => {
  const styles = useStyles();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([accordionItems[0]?.id]));

  const handleAccordionToggle = (_event: any, data: { value: string }) => {
    const itemId = data.value;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.clear();
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  // Get the currently open item to determine which image to show
  const currentOpenItem = accordionItems.find(item => openItems.has(item.id));
  const currentImage = currentOpenItem?.image || "/differentiators/solutionArch.png";
  const currentImageAlt = currentOpenItem ? `${currentOpenItem.label} diagram` : "Solution architecture diagram";

  return (
    <section id="differentiators" className={`differentiator-section ${className || ''}`}>
      <div className={styles.sectionTitle}>
        <Title1>{title}</Title1>
      </div>
      <div className={styles.sectionContent}>
        <Text>{content}</Text>
      </div>
      
      <div className={styles.contentLayout}>
        <div className={styles.accordionContainer}>
          <Accordion 
            collapsible 
            openItems={Array.from(openItems)}
            onToggle={handleAccordionToggle}
          >
            {accordionItems.map((item) => {
              const isOpen = openItems.has(item.id);
              return (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={mergeClasses(styles.accordionItem, isOpen && styles.accordionItemActive)}
                >
                  <AccordionHeader
                    className={styles.accordionHeader}
                    expandIcon={null}
                  >
                    <span style={{ 
                      fontSize: '20px', 
                      fontWeight: '600', 
                      color: '#374151',
                      fontFamily: 'Segoe UI',
                      lineHeight: '1.4'
                    }}>
                      {item.label}
                    </span>
                    {isOpen ? <ChevronUp20Regular /> : <ChevronDown20Regular />}
                  </AccordionHeader>
                  <AccordionPanel className={styles.accordionPanel}>
                    <Text>{item.content}</Text>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={currentImage}
            alt={currentImageAlt}
            className={styles.solutionImage}
          />
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection; 
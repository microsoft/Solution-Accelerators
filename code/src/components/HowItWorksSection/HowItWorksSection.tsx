import React from 'react';
import {
  Title1,
  Title3,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';

export interface HowItWorksStep {
  icon: string; // URL to icon image
  label: string; // Step title (e.g., "Step 1: Browse")
  content: string; // Step description
}

export interface HowItWorksSectionProps {
  title: string; // Section title (e.g., "How it works")
  steps: HowItWorksStep[]; // Array of step objects
  className?: string; // Optional custom styling
}

const useStyles = makeStyles({
  container: {
    padding: '4rem 0',
    backgroundColor: 'white',
  },
  content: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '4rem',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '0',
    '@media (max-width: 1023px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  stepItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '1rem',
    flex: '1',
    maxWidth: '250px',
    '@media (max-width: 1023px)': {
      maxWidth: '300px',
      marginBottom: '2rem',
    },
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    position: 'relative',
  },
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  stepLabel: {
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  stepContent: {
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.5',
    textAlign: 'center',
  },
  betweenStepSeparator: {
    width: '1px',
    height: '16rem',
    backgroundColor: tokens.colorNeutralStroke1,
    margin: '0 3rem',
    alignSelf: 'center',
    borderRadius: '0px',
    '@media (max-width: 1023px)': {
      display: 'none',
    },
  },
});

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  title,
  steps,
  className
}) => {
  const styles = useStyles();

  return (
    <section className={`${styles.container} ${className || ''}`}>
      <div className={styles.content}>
        <Title1 align="center" className={styles.title}>
          {title}
        </Title1>
        
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className={styles.stepItem}>
                <div className={styles.iconContainer}>
                  <img 
                    src={step.icon} 
                    alt={step.label}
                    className={styles.icon}
                  />
                </div>
                <Title3 className={styles.stepLabel}>
                  {step.label}
                </Title3>
                <Text className={styles.stepContent} align="center">
                  {step.content}
                </Text>
              </div>
              {/* Add separator between steps (except after the last step) */}
              {index < steps.length - 1 && (
                <div className={styles.betweenStepSeparator} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 
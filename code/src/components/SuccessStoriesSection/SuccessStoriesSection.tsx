import { Title1, Text, makeStyles, tokens } from '@fluentui/react-components';
import type { SuccessStoriesSectionProps } from '../../types';
import './SuccessStoriesSection.css';

const useStyles = makeStyles({
  successGradient: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  },
  testimonialCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "2rem",
    borderRadius: "8px",
    height: "100%",
    position: "relative",
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
  },
  quoteIcon: {
    color: tokens.colorNeutralForeground3,
    marginBottom: "1rem",
    fontSize: "3rem",
    lineHeight: "1",
    opacity: 0.6,
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: "4rem",
    padding: "0 0",
    display: "block",
    width: "100%",
  },
  quotesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
    marginBottom: "8rem",
  },
  quoteText: {
    flex: "1",
    fontWeight: "bold",
    lineHeight: "1.6",
    marginBottom: "1rem",
  },
  authorTitle: {
    marginTop: "auto",
    fontWeight: "semibold",
  },
  "@media (min-width: 768px)": {
    quotesGrid: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  "@media (min-width: 1024px)": {
    quotesGrid: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
  },
});

const SuccessStoriesSection = ({ 
  title = "Loved by developers", 
  quotes 
}: SuccessStoriesSectionProps) => {
  const styles = useStyles();

  return (
    <section id="success-stories" className={styles.successGradient}>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={styles.sectionTitle}>
            <Title1>{title}</Title1>
          </div>
          
          <div className={styles.quotesGrid}>
            {quotes.slice(0, 4).map((quote, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.quoteIcon}>
                  &ldquo;&rdquo;
                </div>
                <Text className={styles.quoteText}>
                  {quote.quote}
                </Text>
                <Text className={styles.authorTitle}>{quote.author}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection; 
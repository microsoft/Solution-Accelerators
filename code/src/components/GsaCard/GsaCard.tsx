import { useState, useRef } from "react";
import {
  Body1,
  Button,
  Caption1,
  Caption1Strong,
  Subtitle2,
} from "@fluentui/react-components";
import { OpenRegular, ShieldCheckmarkRegular } from "@fluentui/react-icons";
import "./GsaCard.css";
import type { AcceleratorCard, AcceleratorAsset } from "../../types";

type GsaCardProps = Omit<AcceleratorCard, 'assets'> & {
  assets?: AcceleratorAsset[];
  rowHeightVersion?: number;
  excerptHeight?: number;
  reportExcerptHeight?: (index: number, height: number) => void;
};

const GsaCard = ({
  accelerator,
  excerpt,
  solutionAreas,
  productsAndServices,
  programmingLanguages,
  githubUrl,
}: GsaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const boundingRef = useRef<DOMRect | null>(null);



  const LanguagesDisplay = ({ languages }: { languages: string[] }) => {
    return (
      <div className="languages-section">
        <Caption1Strong>Languages</Caption1Strong>
        <Body1 className="languages-text">
          {languages ? languages.join(', ') : 'No languages specified'}
        </Body1>
      </div>
    );
  };

  return (
    <div>
      <div className="perspective-container">
        <div
          onMouseEnter={(e) => {
            setIsHovered(true);
            boundingRef.current = e.currentTarget.getBoundingClientRect();
          }}
          onMouseLeave={(e) => {
            setIsHovered(false);
            boundingRef.current = null;
            e.currentTarget.style.setProperty("--x-rotation", "0deg");
            e.currentTarget.style.setProperty("--y-rotation", "0deg");
          }}
          onMouseMove={(e) => {
            if (!boundingRef.current) return;
            const x = e.clientX - boundingRef.current.left;
            const y = e.clientY - boundingRef.current.top;
            const xPercentage = x / boundingRef.current.width;
            const yPercentage = y / boundingRef.current.height;

            const xRotation = (yPercentage - 0.5) * 10;
            const yRotation = (xPercentage - 0.5) * -10;

            const target = e.currentTarget as HTMLElement;
            target.style.setProperty("--x-rotation", `${xRotation}deg`);
            target.style.setProperty("--y-rotation", `${yRotation}deg`);
            target.style.setProperty("--x", `${xPercentage * 100}%`);
            target.style.setProperty("--y", `${yPercentage * 100}%`);
          }}
          className={`gsa-card ${isHovered ? "hovered" : ""}`}
        >
          {/* Card Content */}
          <div className="card-content">
            <div className="card-inner">
              {/* Header with Solution Area & Status */}
              <div className="card-header">
                <Body1 className="text-neutral-3">
                  {Array.isArray(solutionAreas) ? solutionAreas.join(', ') : solutionAreas}
                </Body1>
                <div className="status-indicator">
                  <ShieldCheckmarkRegular className="status-icon" />
                  <Caption1>Actively maintained</Caption1>
                </div>
              </div>

              {/* Content Section - This will expand to fill available space */}
              <div className="card-content-main">
                {/* Title & Excerpt */}
                <div className="repo-excerpt">
                  <Subtitle2
                    className="truncate"
                    title={accelerator}
                  >
                    {accelerator}
                  </Subtitle2>

                  <Body1 
                    className="excerpt"
                    title={excerpt}
                  >
                    {excerpt}
                  </Body1>
                </div>

                {/* Products and Services */}
                <div className="products-section">
                   <Caption1Strong>Products and Services</Caption1Strong>
                   <div className="flex flex-wrap gap-1 mt-1">
                     {productsAndServices?.slice(0, 6).map((item, i) => (
                       <span key={`tech-${i}`} className="text-xs bg-neutral-2 px-1.5 py-0.5 rounded">
                         {item}
                       </span>
                     ))}
                   </div>
                </div>

                {/* Languages */}
                <LanguagesDisplay languages={programmingLanguages} />
              </div>

              {/* GitHub Button - This will stick to the bottom */}
              <div className="github-button">
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button appearance="primary" icon={<OpenRegular />} className="whitespace-nowrap">
                      Open in GitHub
                    </Button>
                  </a>
                ) : (
                  <Button appearance="primary" icon={<OpenRegular />} className="whitespace-nowrap" disabled>
                    Open in GitHub
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Hover Effect */}
          <div
            className="glow-effect"
            style={{
              background: isHovered
                ? "radial-gradient(at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.025) 0%, rgba(27, 0, 126, 0.025) 100%)"
                : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GsaCard; 
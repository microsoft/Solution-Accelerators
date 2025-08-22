import React, { useRef, useState, useEffect } from "react";
import {
  Caption1Strong,
  Tag,
  Tooltip,
  InteractionTag,
  InteractionTagPrimary,
  Button,
} from "@fluentui/react-components";
import {
  Link16Regular,
  Open20Regular,
  ChevronLeft16Regular,
  ChevronRight16Regular,
} from "@fluentui/react-icons";
import { getLinkIcon } from "../../utils/getLinkIcon";
import "./TagRow.css";

type TagRowProps = {
  label: string;
  items: string[] | { label: string; href: string; fileType?: string }[];
  keyPrefix: string;
  isAsset?: boolean;
  version: number;
  maxLines?: number;
  hoveringCard?: boolean;
  wrapMode?: boolean;
};

const TagRow: React.FC<TagRowProps> = ({
  label,
  items,
  keyPrefix,
  isAsset = false,
  version,
  maxLines = 1,
  hoveringCard = false,
  wrapMode = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  // Drag affordance refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateFade = () => {
      setShowLeftFade(el.scrollLeft > 0);
      setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
      setIsScrollable(el.scrollWidth > el.clientWidth);
    };

    updateFade();
    el.addEventListener("scroll", updateFade);
    window.addEventListener("resize", updateFade);

    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [items, version]);

  const scrollByAmount = 200;

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const renderTag = (item: any, i: number) => {
    if (isAsset && typeof item === "object") {
      const icon = getLinkIcon(item.href, item.fileType);
      return (
        <div key={`${keyPrefix}-${i}`} className="flex-shrink-0">
          <Tooltip
            content={
              <span className="inline-flex items-center gap-1">
                <Open20Regular /> Opens {getHostname(item.href)}
              </span>
            }
            relationship="label"
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="no-underline"
            >
              <InteractionTag size="small" appearance="outline">
                <InteractionTagPrimary
                  media={
                    icon ? (
                      <img
                        src={icon}
                        alt=""
                        style={{
                          width: 16,
                          height: 16,
                          marginLeft: 4,
                          marginRight: -4,
                        }}
                      />
                    ) : (
                      <Link16Regular
                        style={{
                          verticalAlign: "middle",
                          marginLeft: 4,
                          marginRight: -4,
                        }}
                      />
                    )
                  }
                >
                  {item.label}
                </InteractionTagPrimary>
              </InteractionTag>
            </a>
          </Tooltip>
        </div>
      );
    }
    return (
      <div key={`${keyPrefix}-${i}`} className="flex-shrink-0">
        <Tag size="small">{item}</Tag>
      </div>
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrollable) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = scrollRef.current!.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.pageX - startX.current;
    scrollRef.current!.scrollLeft = scrollStart.current - dx;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div>
      <div className="tag-row-header">
        <Caption1Strong>{label}</Caption1Strong>
        {!wrapMode && isScrollable && hoveringCard && (
          <div className="flex gap-0.5">
            <Button
              size="small"
              appearance="subtle"
              icon={<ChevronLeft16Regular />}
              onClick={handleScrollLeft}
              disabled={!showLeftFade}
              className={!showLeftFade ? "cursor-default" : ""}
            />
            <Button
              size="small"
              appearance="subtle"
              icon={<ChevronRight16Regular />}
              onClick={handleScrollRight}
              disabled={!showRightFade}
              className={!showRightFade ? "cursor-default" : ""}
            />
          </div>
        )}
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className={`tag-row-scroll ${wrapMode ? "tag-row-wrap" : ""} ${!wrapMode && isScrollable ? "cursor-grab" : "cursor-default"}`}
          style={{
            maxHeight: wrapMode ? undefined : (maxLines ? `${maxLines * 24}px` : undefined),
          }}
          onPointerDown={wrapMode ? undefined : handlePointerDown}
          onPointerMove={wrapMode ? undefined : handlePointerMove}
          onPointerUp={wrapMode ? undefined : handlePointerUp}
        >
          {items.length === 0 ? (
            <span className="text-neutral-disabled">&mdash;</span>
          ) : (
            items.map((item, i) => renderTag(item, i))
          )}
        </div>

        {!wrapMode && showLeftFade && (
          <div className="fade-left" />
        )}

        {!wrapMode && showRightFade && (
          <div className="fade-right" />
        )}
      </div>
    </div>
  );
};

export default TagRow; 
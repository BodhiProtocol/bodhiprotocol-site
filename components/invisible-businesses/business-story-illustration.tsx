"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";

interface BusinessStoryNode {
  label: string;
  icon: LucideIcon;
}

interface BusinessStoryIllustrationProps {
  centerNode: BusinessStoryNode;
  nodes: BusinessStoryNode[];
  outcome: string;
  caption?: string;
  accentColor?: string;
}

function BusinessStoryIllustration({
  centerNode,
  nodes,
  outcome,
  caption,
  accentColor,
}: BusinessStoryIllustrationProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hovered, setHovered] = React.useState<number | null>(null);

  const center = 50;
  const radius = 40;

  const points = nodes.map((node, index) => {
    const angle = (-90 + (360 / nodes.length) * index) * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    const dx = x - center;
    const dy = y - center;
    const len = Math.hypot(dx, dy) || 1;
    const perpX = -dy / len;
    const perpY = dx / len;
    const bow = index % 2 === 0 ? 7 : -7;
    const controlX = (center + x) / 2 + perpX * bow;
    const controlY = (center + y) / 2 + perpY * bow;
    const pathLength = len * 1.15;
    return { ...node, index, x, y, controlX, controlY, pathLength };
  });

  return (
    <div ref={ref} className="flex flex-col items-center gap-8">
      <div className="relative aspect-square w-full max-w-2xl">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {points.map((point) => {
            const isHovered = hovered === point.index;
            const isDimmed = hovered !== null && !isHovered;
            const opacity = !played ? 0 : isHovered ? 0.9 : isDimmed ? 0.15 : 0.45;
            return (
              <path
                key={point.label}
                d={`M ${center} ${center} Q ${point.controlX} ${point.controlY} ${point.x} ${point.y}`}
                fill="none"
                className="stroke-brand"
                style={{
                  stroke: accentColor,
                  strokeWidth: isHovered ? 1.6 : 0.6,
                  strokeLinecap: "round",
                  strokeDasharray: point.pathLength,
                  strokeDashoffset: played ? 0 : point.pathLength,
                  opacity,
                  transition: reducedMotion
                    ? "opacity 300ms ease"
                    : `stroke-dashoffset 0.6s cubic-bezier(.16,1,.3,1) ${1 + point.index * 0.03}s, opacity 300ms ease, stroke-width 250ms ease`,
                }}
              />
            );
          })}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={played ? { opacity: 1, scale: hovered !== null ? 1.04 : 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
        >
          <span
            className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/30 sm:size-20"
            style={accentColor ? { backgroundColor: accentColor } : undefined}
          >
            <centerNode.icon className="size-7 sm:size-8" />
          </span>
          <span className="text-xs font-semibold sm:text-sm">{centerNode.label}</span>
        </motion.div>

        {points.map((point) => {
          const Icon = point.icon;
          const isHovered = hovered === point.index;
          const isDimmed = hovered !== null && !isHovered;
          const delay = 0.15 + point.index * 0.15;
          return (
            <motion.div
              key={point.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-default flex-col items-center gap-1.5"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.4 : 1, scale: isHovered ? 1.12 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : delay },
                scale: { duration: 0.25, ease: "easeOut" },
              }}
              onMouseEnter={() => setHovered(point.index)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border bg-gradient-to-br from-brand/10 via-card/70 to-transparent shadow-sm backdrop-blur-sm transition-colors duration-300 sm:size-12",
                  isHovered ? "border-brand/60 text-brand shadow-md shadow-brand/20" : "border-brand/15 text-brand/70",
                )}
                style={isHovered && accentColor ? { borderColor: accentColor, color: accentColor } : undefined}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span className="text-center text-[10px] leading-tight font-medium text-muted-foreground sm:text-xs">
                {point.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.3, delay: reducedMotion ? 0 : 1.5 }}
        >
          <ArrowDown className="size-4 text-brand/50" style={accentColor ? { color: accentColor } : undefined} />
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1.6, ease: "easeOut" }}
          className="rounded-full border border-brand/25 bg-card px-5 py-2 text-sm font-semibold text-brand shadow-sm sm:text-base"
          style={{
            borderColor: accentColor ? `color-mix(in oklab, ${accentColor} 25%, transparent)` : undefined,
            color: accentColor,
            animation: played && !reducedMotion ? "hub-glow 2.6s ease-in-out 1.8s infinite" : "none",
          }}
        >
          {outcome}
        </motion.div>
      </div>

      {caption ? (
        <p className="max-w-md text-center font-serif text-lg leading-snug text-balance sm:text-xl">{caption}</p>
      ) : null}
    </div>
  );
}

export { BusinessStoryIllustration };
export type { BusinessStoryNode, BusinessStoryIllustrationProps };

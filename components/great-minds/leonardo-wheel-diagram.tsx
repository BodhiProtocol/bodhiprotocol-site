"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cog, Eye, Feather, Leaf, Lightbulb, Microscope, Palette, PersonStanding, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Microscope,
  PersonStanding,
  Feather,
  Eye,
  Leaf,
  Cog,
  Palette,
};

function LeonardoWheelDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const center = 50;
  const radius = 38;

  const points = nodes.map((node, index) => {
    const angle = (-90 + (360 / nodes.length) * index) * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    const dotX = center + (radius * 0.55) * Math.cos(angle);
    const dotY = center + (radius * 0.55) * Math.sin(angle);
    const length = radius;
    return { ...node, index, x, y, dotX, dotY, length };
  });

  const active = activeIndex !== null ? points[activeIndex] : null;

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {points.map((point) => {
            const isActive = activeIndex === point.index;
            const isDimmed = activeIndex !== null && !isActive;
            return (
              <g key={point.label}>
                <line
                  x1={center}
                  y1={center}
                  x2={point.x}
                  y2={point.y}
                  className="stroke-brand"
                  style={{
                    strokeWidth: isActive ? 0.6 : 0.3,
                    strokeDasharray: "1.5 1.8",
                    strokeLinecap: "round",
                    opacity: !played ? 0 : isActive ? 0.75 : isDimmed ? 0.12 : 0.35,
                    transition: reducedMotion
                      ? "opacity 300ms ease"
                      : `opacity 400ms ease ${0.5 + point.index * 0.06}s, stroke-width 200ms ease`,
                  }}
                />
                <circle
                  cx={point.dotX}
                  cy={point.dotY}
                  r={0.6}
                  className="fill-brand"
                  style={{
                    opacity: !played ? 0 : isDimmed ? 0.2 : 0.6,
                    transition: `opacity 400ms ease ${0.5 + point.index * 0.06}s`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 z-10 flex size-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg shadow-brand/10 sm:size-28"
        >
          <span className="font-serif text-lg font-medium tracking-tight text-brand sm:text-2xl">LDV</span>
          <span className="font-mono text-[8px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[9px]">
            1452–1519
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Lightbulb;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const delay = 0.2 + point.index * 0.08;
          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : delay },
                scale: { duration: 0.2, ease: "easeOut" },
              }}
              onMouseEnter={() => setActiveIndex(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(isActive ? null : point.index)}
              aria-pressed={isActive}
              aria-describedby="wheel-node-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors sm:text-[10px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="wheel-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a discipline to see how it shaped his thinking."
          )}
        </p>
      </div>
    </div>
  );
}

export { LeonardoWheelDiagram };

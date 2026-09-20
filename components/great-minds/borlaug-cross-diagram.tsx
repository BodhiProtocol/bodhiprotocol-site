"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Dna, GitMerge, Share2, TrendingUp, Wheat, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Dna,
  GitMerge,
  Wheat,
  Share2,
  TrendingUp,
};

// Fixed layout, not derived from node count: two inputs converge on one
// cross, the cross produces one variety, and that variety diverges into two
// outcomes. Borlaug's actual shape — breed once, then let one result reach
// two different places — not a wheel, chain, or pyramid.
const LAYOUT = [
  { x: 18, y: 8 },
  { x: 82, y: 8 },
  { x: 50, y: 34 },
  { x: 50, y: 58 },
  { x: 18, y: 84 },
  { x: 82, y: 84 },
] as const;

const EDGES: Array<[number, number]> = [
  [0, 2],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
];

function BorlaugCrossDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;
  const active = activeIndex !== null ? nodes[activeIndex] : null;

  const points = nodes.map((node, index) => ({ ...node, index, ...LAYOUT[index] }));

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/92] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 92" className="absolute inset-0 h-full w-full overflow-visible">
          {EDGES.map(([from, to], edgeIndex) => {
            const a = LAYOUT[from];
            const b = LAYOUT[to];
            const isActive = activeIndex === from || activeIndex === to;
            const isDimmed = activeIndex !== null && !isActive;
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                strokeWidth={isActive ? 1.1 : 0.8}
                strokeLinecap="round"
                className={cn("transition-colors duration-300", isActive ? "stroke-brand" : "stroke-brand/35")}
                style={{ opacity: isDimmed ? 0.3 : 1 }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={played ? { pathLength: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.25 + edgeIndex * 0.14 }}
              />
            );
          })}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Wheat;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isHub = point.index === 2 || point.index === 3;
          const entranceDelay = 0.35 + point.index * 0.1;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${(point.y / 92) * 100}%` }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => setHoverIndex(point.index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(point.index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => setPinnedIndex((current) => (current === point.index ? null : point.index))}
              aria-pressed={isActive}
              aria-describedby="borlaug-cross-detail"
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                  isHub ? "size-11 sm:size-12" : "size-9 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className={isHub ? "size-5" : "size-4"} />
              </span>
              <span
                className={cn(
                  "font-mono text-[8px] font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
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
        id="borlaug-cross-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a node to see how one cross became two harvests."
          )}
        </p>
      </div>
    </div>
  );
}

export { BorlaugCrossDiagram };

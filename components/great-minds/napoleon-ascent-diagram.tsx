"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock, Crown, Flame, GitBranch, MapPin, Swords, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Swords,
  GitBranch,
  Clock,
  Crown,
  MapPin,
};

// A rising staircase of five ranks, not a wheel or chain — each step is a
// real promotion, ending at the peak (1804). The sixth node then breaks off
// the climb entirely: a dashed line doubling back down and to the left,
// tracing the same direction the Grande Armée actually retreated in 1812,
// rather than continuing the ascent's rightward motion.
const LAYOUT = [
  { x: 8, y: 72 },
  { x: 27, y: 55 },
  { x: 47, y: 39 },
  { x: 66, y: 24 },
  { x: 85, y: 9 },
  { x: 42, y: 62 },
] as const;

const CLIMB_EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];
const RETREAT_EDGE: [number, number] = [4, 5];

function NapoleonAscentDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;
  const active = activeIndex !== null ? nodes[activeIndex] : null;

  const points = nodes.map((node, index) => ({ ...node, index, ...LAYOUT[index] }));

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/86] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 86" className="absolute inset-0 h-full w-full overflow-visible">
          {CLIMB_EDGES.map(([from, to], edgeIndex) => {
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
                className={cn("transition-colors duration-300", isActive ? "stroke-brand" : "stroke-brand/40")}
                style={{ opacity: isDimmed ? 0.3 : 1 }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={played ? { pathLength: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 + edgeIndex * 0.16 }}
              />
            );
          })}

          {/* The retreat — dashed, muted, and doubling back down-left against
              the climb's rightward-upward motion, rather than continuing it. */}
          <motion.line
            x1={LAYOUT[RETREAT_EDGE[0]].x}
            y1={LAYOUT[RETREAT_EDGE[0]].y}
            x2={LAYOUT[RETREAT_EDGE[1]].x}
            y2={LAYOUT[RETREAT_EDGE[1]].y}
            strokeWidth={activeIndex === 4 || activeIndex === 5 ? 1 : 0.7}
            strokeDasharray="1.6 1.4"
            strokeLinecap="round"
            className={cn(
              "transition-colors duration-300",
              activeIndex === 4 || activeIndex === 5 ? "stroke-brand/70" : "stroke-muted-foreground/60",
            )}
            style={{ opacity: activeIndex !== null && activeIndex !== 4 && activeIndex !== 5 ? 0.3 : 1 }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 1.05 }}
          />
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Swords;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isPeak = point.index === 4;
          const isFall = point.index === 5;
          const entranceDelay = 0.3 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${(point.y / 86) * 100}%` }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => setHoverIndex(point.index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(point.index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => setPinnedIndex((current) => (current === point.index ? null : point.index))}
              aria-pressed={isActive}
              aria-describedby="napoleon-ascent-detail"
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                  isPeak ? "size-11 sm:size-12" : "size-9 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isFall
                      ? "border-muted-foreground/30 text-muted-foreground"
                      : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className={isPeak ? "size-5" : "size-4"} />
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
        id="napoleon-ascent-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a step to follow the climb — and the retreat that undid it."
          )}
        </p>
      </div>
    </div>
  );
}

export { NapoleonAscentDiagram };

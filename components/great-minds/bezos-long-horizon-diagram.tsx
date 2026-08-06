"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Package, RefreshCw, Scale, Sunrise, Telescope, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  Package,
  RefreshCw,
  Sunrise,
  Telescope,
};

const TRACK_Y = 55;
// Hand-tuned x-positions with decreasing gaps (22, 20, 17, 14) rather than
// even spacing — a receding-perspective ruler, unlike Ford's evenly spaced
// conveyor, because the metaphor here is distance in time, not a sequence
// of physical stations.
const POSITIONS = [10, 32, 52, 69, 83];
const VANISHING_X = 95;

function BezosLongHorizonDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, x: POSITIONS[index] ?? POSITIONS[POSITIONS.length - 1] }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/62] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 62" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="bezos-horizon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.line
            x1={4}
            y1={TRACK_Y}
            x2={VANISHING_X}
            y2={TRACK_Y}
            strokeWidth={0.6}
            className={cn("transition-colors duration-500", cycleComplete ? "stroke-brand/50" : "stroke-brand/25")}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          />

          {/* Receding tick marks, compressing toward the vanishing point —
              the ruler itself argues that time horizons aren't linear the
              way most planning treats them. */}
          {POSITIONS.map((x, i) => (
            <motion.line
              key={x}
              x1={x}
              y1={TRACK_Y - 1.4}
              x2={x}
              y2={TRACK_Y + 1.4}
              strokeWidth={0.5}
              className="stroke-brand/20"
              initial={{ opacity: 0 }}
              animate={played ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.15 + i * 0.08 }}
            />
          ))}

          {/* The vanishing point — always lit, always ahead, the horizon
              the whole ruler is oriented toward regardless of interaction. */}
          <motion.circle
            cx={VANISHING_X}
            cy={TRACK_Y}
            r={cycleComplete ? 10 : 6}
            fill="url(#bezos-horizon-glow)"
            className="text-brand"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: reducedMotion ? 0.55 : [0.4, 0.7, 0.4] } : {}}
            transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
          />
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Telescope;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.3 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1.5 outline-none"
              style={{ left: `${point.x}%`, top: `${((TRACK_Y - 8) / 62) * 100}%` }}
              initial={{ opacity: 0, y: -4 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="bezos-horizon-detail"
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                  point.index === points.length - 1 ? "size-8 sm:size-9" : "size-9 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isVisited
                      ? "border-brand/40 text-brand"
                      : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4" />
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
        id="bezos-horizon-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : cycleComplete ? (
            <span className="font-semibold text-foreground">
              Five points on the ruler — the horizon stays lit either way.
            </span>
          ) : (
            "Tap or hover a marker to see what sits at that distance on the ruler."
          )}
        </p>
      </div>
    </div>
  );
}

export { BezosLongHorizonDiagram };

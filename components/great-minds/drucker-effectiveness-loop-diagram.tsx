"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ClipboardList, RotateCw, Target, TrendingUp, Zap, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Target,
  ClipboardList,
  Zap,
  TrendingUp,
  RotateCw,
};

const CENTER = 50;
const RADIUS = 36;
const ANGLE_STEP = 360 / 5;
const START_ANGLE = -90;

function pointAt(index: number) {
  const angle = (START_ANGLE + index * ANGLE_STEP) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
}

// Arc between two points along the shared circle, sweeping clockwise — the
// segment itself is the metaphor: this loop closes back on its own start
// (node 5 -> node 1), unlike every other Great Minds diagram, which is
// directional and never returns to where it began.
function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  return `M${from.x},${from.y} A${RADIUS},${RADIUS} 0 0,1 ${to.x},${to.y}`;
}

function DruckerEffectivenessLoopDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, ...pointAt(index) }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="drucker-loop-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
            <marker id="drucker-loop-arrowhead" markerWidth="5" markerHeight="5" refX="3.2" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" className="fill-brand" />
            </marker>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS - 14}
              fill="url(#drucker-loop-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {/* Five arcs chase each other clockwise around the same circle —
              the loop never stops, whether or not a viewer has hovered it. */}
          {points.map((point, i) => {
            const next = points[(i + 1) % points.length];
            const isActiveSegment = activeIndex === i || activeIndex === next.index;
            return (
              <motion.path
                key={`arc-${point.label}`}
                d={arcPath(point, next)}
                fill="none"
                strokeWidth={isActiveSegment ? 1.1 : 0.7}
                strokeDasharray="2.5 2.5"
                markerEnd="url(#drucker-loop-arrowhead)"
                className={cn("transition-[stroke-width] duration-200", isActiveSegment ? "stroke-brand" : "stroke-brand/35")}
                initial={false}
                animate={
                  played
                    ? reducedMotion
                      ? { opacity: 1, strokeDashoffset: 0 }
                      : { opacity: 1, strokeDashoffset: [0, -10] }
                    : { opacity: 0 }
                }
                transition={
                  played && !reducedMotion
                    ? {
                        opacity: { duration: 0.4, delay: 0.15 + i * 0.1 },
                        strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear" },
                      }
                    : { duration: 0.4, delay: 0.15 + i * 0.1 }
                }
              />
            );
          })}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
          className={cn(
            "absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg transition-shadow duration-500 sm:size-20",
            cycleComplete ? "border-brand shadow-brand/25" : "border-brand/25 shadow-brand/10",
          )}
        >
          <span className="font-serif text-base font-medium tracking-tight text-brand sm:text-xl">PFD</span>
          <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
            {cycleComplete ? "Runs Forever" : "The Loop"}
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Target;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.35 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.12 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="drucker-loop-detail"
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isVisited
                      ? "border-brand/40 text-brand"
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
        id="drucker-loop-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : cycleComplete ? (
            <span className="font-semibold text-foreground">Five steps, one loop — it resets the moment it finishes.</span>
          ) : (
            "Tap or hover a stage to trace the loop Drucker never let an organization stop running."
          )}
        </p>
      </div>
    </div>
  );
}

export { DruckerEffectivenessLoopDiagram };

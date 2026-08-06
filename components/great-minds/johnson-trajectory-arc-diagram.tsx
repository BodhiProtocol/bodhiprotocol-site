"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame, LifeBuoy, Orbit, Rocket, TrendingUp, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  TrendingUp,
  Orbit,
  Flame,
  LifeBuoy,
};

// A single quadratic-bezier arc from launch to splashdown — a real ballistic
// trajectory shape, unlike any other Great Minds diagram, since her actual
// work was calculating exactly this kind of curve by hand.
const ARC_P0 = { x: 10, y: 70 };
const ARC_P1 = { x: 50, y: 5 };
const ARC_P2 = { x: 90, y: 70 };

function pointOnArc(t: number) {
  const mt = 1 - t;
  return {
    x: mt * mt * ARC_P0.x + 2 * mt * t * ARC_P1.x + t * t * ARC_P2.x,
    y: mt * mt * ARC_P0.y + 2 * mt * t * ARC_P1.y + t * t * ARC_P2.y,
  };
}

const ARC_PATH = `M ${ARC_P0.x},${ARC_P0.y} Q ${ARC_P1.x},${ARC_P1.y} ${ARC_P2.x},${ARC_P2.y}`;
const CAPSULE_SAMPLES = Array.from({ length: 17 }, (_, i) => pointOnArc(i / 16));

function JohnsonTrajectoryArcDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({
    ...node,
    index,
    ...pointOnArc(nodes.length > 1 ? index / (nodes.length - 1) : 0),
  }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/80] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="johnson-arc-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={ARC_P1.x}
              cy={ARC_P1.y + 12}
              r={26}
              fill="url(#johnson-arc-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          <line x1={ARC_P0.x} y1={ARC_P0.y} x2={ARC_P2.x} y2={ARC_P2.y} strokeWidth={0.4} strokeDasharray="1 3" className="stroke-brand/20" />

          <motion.path
            d={ARC_PATH}
            fill="none"
            strokeWidth={0.8}
            className={cn("transition-colors duration-500", cycleComplete ? "stroke-brand/70" : "stroke-brand/35")}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.1, ease: "easeInOut" }}
          />

          {/* The capsule traces the full arc continuously, independent of
              hover — the same curve her equations described. */}
          <motion.circle
            r={1.6}
            className="fill-brand"
            initial={false}
            animate={
              played
                ? reducedMotion
                  ? { cx: CAPSULE_SAMPLES[16].x, cy: CAPSULE_SAMPLES[16].y, opacity: 0.85 }
                  : {
                      cx: CAPSULE_SAMPLES.map((p) => p.x),
                      cy: CAPSULE_SAMPLES.map((p) => p.y),
                      opacity: 0.85,
                    }
                : { opacity: 0 }
            }
            transition={
              played && !reducedMotion
                ? {
                    cx: { duration: 6, repeat: Infinity, ease: "linear" },
                    cy: { duration: 6, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 0.4 },
                  }
                : { duration: 0.4 }
            }
          />
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Rocket;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.3 + point.index * 0.12;
          const labelBelow = point.index === 0 || point.index === points.length - 1;

          return (
            <motion.button
              key={point.label}
              type="button"
              className={cn(
                "absolute flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-lg outline-none",
                labelBelow ? "-translate-y-1/4" : "-translate-y-full",
              )}
              style={{ left: `${point.x}%`, top: `${(point.y / 80) * 100}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="johnson-arc-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-10",
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

        <div className="absolute inset-x-0 top-0 flex justify-center">
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete ? "Verified By Hand" : "Tracing the Arc"}
          </span>
        </div>
      </div>

      <div
        id="johnson-arc-detail"
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
              Five points on the curve — every one had to check out for the flight to happen.
            </span>
          ) : (
            "Tap or hover a point on the arc to see what Johnson had to calculate there."
          )}
        </p>
      </div>
    </div>
  );
}

export { JohnsonTrajectoryArcDiagram };

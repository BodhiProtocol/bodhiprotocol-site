"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Building2, HeartHandshake, Landmark, TrendingUp, Users, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  TrendingUp,
  Landmark,
  Users,
  HeartHandshake,
};

const CENTER = 50;
const RADIUS = 38;
const ANGLE_STEP = 360 / 5;
const START_ANGLE = -90;

// Precomputed points sampled every 10deg around the ring so the traveling
// pulse glides smoothly along the circle instead of cutting straight lines
// between the five node positions (which would trace a pentagon, not a loop).
const ORBIT_SAMPLES = 36;
const ORBIT_POINTS = Array.from({ length: ORBIT_SAMPLES + 1 }, (_, i) => {
  const angle = (START_ANGLE + (360 * i) / ORBIT_SAMPLES) * (Math.PI / 180);
  return {
    cx: CENTER + RADIUS * Math.cos(angle),
    cy: CENTER + RADIUS * Math.sin(angle),
  };
});
const ORBIT_CX = ORBIT_POINTS.map((p) => p.cx);
const ORBIT_CY = ORBIT_POINTS.map((p) => p.cy);

function TataReturnLoopDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;

  const points = nodes.map((node, index) => {
    const angle = (START_ANGLE + index * ANGLE_STEP) * (Math.PI / 180);
    return {
      ...node,
      index,
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    };
  });

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="tata-loop-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS + 6}
              fill="url(#tata-loop-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {/* Slow rotation on the dashed ring only (not the nodes/labels) — the
              dash pattern crawling around the circle reads as "flywheel"
              without spinning any text upside down. */}
          <motion.g
            style={{ transformOrigin: "50px 50px" }}
            animate={played && !reducedMotion ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              strokeWidth="0.6"
              strokeDasharray="2.5 2.5"
              className="stroke-brand/40"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 1.4, ease: "easeInOut" }}
            />
          </motion.g>

          <motion.circle
            r="1.4"
            fill="currentColor"
            className="text-brand"
            animate={played && !reducedMotion ? { cx: ORBIT_CX, cy: ORBIT_CY } : { cx: ORBIT_CX[0], cy: ORBIT_CY[0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
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
          <span className="font-serif text-base font-medium tracking-tight text-brand sm:text-xl">RT</span>
          <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
            {cycleComplete ? "Compounds" : "The Loop"}
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Landmark;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.2 + point.index * 0.12;

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
              aria-describedby="tata-loop-detail"
            >
              <motion.span
                animate={
                  played && !reducedMotion
                    ? { scale: [1, 1.04, 1] }
                    : {}
                }
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: point.index * 0.3 }}
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
              </motion.span>
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
        id="tata-loop-detail"
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
              The system grows stronger because prosperity returns.
            </span>
          ) : (
            "Tap or hover a node to follow how prosperity moves through the loop."
          )}
        </p>
      </div>
    </div>
  );
}

export { TataReturnLoopDiagram };

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Building2, RotateCcw, Send, Sunrise, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Sunrise,
  Send,
  Building2,
  RotateCcw,
};

const CENTER = 50;
const RADIUS = 38;
const ANGLE_STEP = 90;
const START_ANGLE = -90;

// Sampled every 5deg so the traveling pulse glides around the ring instead of
// cutting a diamond between the four node positions.
const ORBIT_SAMPLES = 72;
const ORBIT_POINTS = Array.from({ length: ORBIT_SAMPLES + 1 }, (_, i) => {
  const angle = (START_ANGLE + (360 * i) / ORBIT_SAMPLES) * (Math.PI / 180);
  return { cx: CENTER + RADIUS * Math.cos(angle), cy: CENTER + RADIUS * Math.sin(angle) };
});
const ORBIT_CX = ORBIT_POINTS.map((p) => p.cx);
const ORBIT_CY = ORBIT_POINTS.map((p) => p.cy);

function arcPoint(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CENTER + RADIUS * Math.cos(rad), y: CENTER + RADIUS * Math.sin(rad) };
}

// Top semicircle (through -90deg/top) is Bangalore's offshore half of the
// clock; bottom semicircle (through 90deg/bottom) is the client's onsite
// half. The two handoff nodes sit exactly on the boundary between them —
// the diagram is a literal 24-hour dial, not a generic wheel.
const topArc = (() => {
  const start = arcPoint(180);
  const mid = arcPoint(270);
  const end = arcPoint(360);
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${mid.x} ${mid.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`;
})();
const bottomArc = (() => {
  const start = arcPoint(0);
  const mid = arcPoint(90);
  const end = arcPoint(180);
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${mid.x} ${mid.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`;
})();

function MurthyFollowTheSunDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length && nodes.length > 0;

  const points = nodes.map((node, index) => {
    const angle = (START_ANGLE + index * ANGLE_STEP) * (Math.PI / 180);
    return { ...node, index, x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
  });

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path
            d={topArc}
            fill="none"
            strokeWidth="1.4"
            className="stroke-brand/45"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeInOut" }}
          />
          <motion.path
            d={bottomArc}
            fill="none"
            strokeWidth="1.4"
            className="stroke-muted-foreground/35"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.15, ease: "easeInOut" }}
          />

          {/* 24 tick marks so the ring reads as a clock, not a generic loop. */}
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (START_ANGLE + (360 * i) / 24) * (Math.PI / 180);
            const inner = CENTER + (RADIUS - 2) * Math.cos(angle);
            const innerY = CENTER + (RADIUS - 2) * Math.sin(angle);
            const outer = CENTER + (RADIUS + 2) * Math.cos(angle);
            const outerY = CENTER + (RADIUS + 2) * Math.sin(angle);
            return (
              <motion.line
                key={i}
                x1={inner}
                y1={innerY}
                x2={outer}
                y2={outerY}
                strokeWidth={i % 6 === 0 ? 0.8 : 0.4}
                className="stroke-muted-foreground/25"
                initial={{ opacity: 0 }}
                animate={played ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.05 * i }}
              />
            );
          })}

          <motion.circle
            r="1.3"
            fill="currentColor"
            className="text-brand"
            animate={played && !reducedMotion ? { cx: ORBIT_CX, cy: ORBIT_CY } : { cx: ORBIT_CX[0], cy: ORBIT_CY[0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
          className={cn(
            "absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg transition-shadow duration-500 sm:size-20",
            cycleComplete ? "border-brand shadow-brand/25" : "border-brand/25 shadow-brand/10",
          )}
        >
          <span className="font-serif text-base font-medium tracking-tight text-brand sm:text-xl">24H</span>
          <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
            {cycleComplete ? "Never Stops" : "Follow the Sun"}
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Building2;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.9 + point.index * 0.15;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="murthy-clock-detail"
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
                  "max-w-20 font-mono text-[8px] font-semibold tracking-[0.05em] uppercase transition-colors sm:max-w-24 sm:text-[9px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
              <span className="font-mono text-[7px] text-muted-foreground/60 sm:text-[8px]">{point.year}</span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="murthy-clock-detail"
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
              Somewhere on this clock, it&apos;s always working hours.
            </span>
          ) : (
            "Tap or hover a point on the clock to follow how work handed off across time zones."
          )}
        </p>
      </div>
    </div>
  );
}

export { MurthyFollowTheSunDiagram };

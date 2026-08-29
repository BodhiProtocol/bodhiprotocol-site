"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Crown, Flame, Hourglass, Users, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Building2,
  Crown,
  Hourglass,
};

// Illustrative asabiyyah "cohesion" reading per generation, in wheel order —
// not a historical measurement, just a concrete stand-in for the decay
// Ibn Khaldun describes qualitatively across roughly four generations.
const COHESION = [100, 65, 30, 5];

function polarPoint(center: number, radius: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: center + radius * Math.cos(rad), y: center + radius * Math.sin(rad) };
}

function quarterArcPath(center: number, radius: number, fromAngle: number, toAngle: number) {
  const a = polarPoint(center, radius, fromAngle);
  const b = polarPoint(center, radius, toAngle);
  return `M ${a.x} ${a.y} A ${radius} ${radius} 0 0 1 ${b.x} ${b.y}`;
}

function IbnKhaldunCycleDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length && nodes.length > 0;

  const center = 50;
  const radius = 34;
  const points = nodes.map((node, index) => {
    const angle = (360 / nodes.length) * index;
    const pos = polarPoint(center, radius, angle);
    return { ...node, index, angle, ...pos };
  });

  const breakMarker = polarPoint(center, radius + 10, -45);

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
          {points.slice(0, -1).map((point, i) => {
            const next = points[i + 1];
            const decay = 1 - i / (points.length - 1);
            return (
              <motion.path
                key={`arc-${point.label}`}
                d={quarterArcPath(center, radius, point.angle, next.angle)}
                fill="none"
                strokeLinecap="round"
                className="stroke-brand"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={played ? { pathLength: 1, opacity: 0.25 + decay * 0.6 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.3 + i * 0.2, ease: "easeInOut" }}
                strokeWidth={0.5 + decay * 1.1}
              />
            );
          })}

          {/* The break: no continuous decay-arc closes the circle back to the
              founding generation. A new, fresh arc appears instead — a
              different group's asabiyyah, not a continuation of the old
              dynasty's. */}
          <motion.path
            d={quarterArcPath(center, radius, points[points.length - 1]?.angle ?? 270, 360)}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="2.5 2"
            className="stroke-brand"
            strokeWidth={1.3}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 0.85 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 1.1, ease: "easeInOut" }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.2 }}
          className="absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg shadow-brand/10 sm:size-20"
        >
          <span className="font-serif text-sm font-medium tracking-tight text-brand sm:text-base">Asabiyyah</span>
          <span className="font-mono text-[7px] tracking-[0.1em] text-muted-foreground uppercase sm:text-[8px]">
            The Bond
          </span>
        </motion.div>

        <motion.div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ left: `${breakMarker.x}%`, top: `${breakMarker.y}%` }}
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 0.85 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 1.4 }}
        >
          <Flame className="size-4 text-brand sm:size-5" />
          <span className="max-w-20 text-center font-mono text-[7px] leading-tight tracking-wide text-brand uppercase sm:text-[8px]">
            A new dynasty rises
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Users;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.35 + point.index * 0.15;
          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" },
              }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="khaldun-cycle-detail"
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
                  "max-w-20 text-center font-mono text-[8px] font-semibold tracking-[0.05em] uppercase transition-colors sm:text-[9px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex w-full max-w-md items-center gap-2">
        <span className="shrink-0 font-mono text-[8px] tracking-wide text-muted-foreground uppercase sm:text-[9px]">
          Cohesion
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand/10">
          <motion.div
            className="h-full rounded-full bg-brand"
            initial={{ width: "0%" }}
            animate={{ width: `${activeIndex !== null ? COHESION[activeIndex] : 0}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
        <span className="w-9 shrink-0 text-right font-mono text-[8px] text-muted-foreground sm:text-[9px]">
          {activeIndex !== null ? `${COHESION[activeIndex]}%` : "—"}
        </span>
      </div>

      <div
        id="khaldun-cycle-detail"
        className="relative flex min-h-16 w-full max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <AnimatePresence>
          <motion.p
            key={active?.label ?? "default"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center px-5 py-3 text-sm leading-relaxed text-muted-foreground"
          >
            {active ? (
              <>
                <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
              </>
            ) : cycleComplete ? (
              <span className="font-semibold text-foreground">
                Four generations, one predictable decay — then a new group with fresh cohesion starts the wheel
                again.
              </span>
            ) : (
              "Tap or hover a generation to see cohesion rise, then run out."
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { IbnKhaldunCycleDiagram };

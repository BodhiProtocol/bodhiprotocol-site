"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Compass, Hammer, HeartPulse, Hourglass, Landmark, Users, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  Hammer,
  Users,
  Hourglass,
  Compass,
  Landmark,
};

const ROAD_Y = 58;
const START_X = 5;
const END_X = 95;
const CUT_START_X = 40;
const CUT_END_X = 60;
// The detour never goes away — it's the road that already existed. Only the
// span across the width of the hill itself has to be earned before the two
// halves of the straight road connect.
const DETOUR_DIP_Y = 84;

function stationX(index: number, count: number) {
  return START_X + ((END_X - START_X) / (count - 1)) * index;
}

// No branches, no hub — one hill, one gap, and a single continuous line that
// only closes as every phase of the 22-year story is visited. Every other
// Great Minds diagram shows a network of ideas; this one shows a single cut
// that either exists yet or doesn't.
function ManjhiMountainCutDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cutProgress = nodes.length ? visited.size / nodes.length : 0;
  const cycleComplete = nodes.length > 0 && visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, x: stationX(index, nodes.length) }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/78] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 78" className="absolute inset-0 h-full w-full overflow-visible">
          {/* The hill — a fixed silhouette. Manjhi didn't move the mountain;
              he opened a gap through the base of it. */}
          <motion.path
            d="M 20 60 L 50 18 L 80 60"
            fill="none"
            strokeWidth={0.9}
            className="stroke-muted-foreground/50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          />

          {/* The old route — a long dashed detour around the base of the
              hill. It doesn't disappear once the cut exists; it's simply no
              longer the only way through. */}
          <motion.path
            d={`M ${START_X} ${ROAD_Y} Q 50 ${DETOUR_DIP_Y} ${END_X} ${ROAD_Y}`}
            fill="none"
            strokeWidth={0.7}
            strokeDasharray="1.6 1.4"
            className={cn(
              "transition-opacity duration-500",
              cycleComplete ? "stroke-muted-foreground/35" : "stroke-muted-foreground/70",
            )}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.2, delay: reducedMotion ? 0 : 0.3, ease: "easeInOut" }}
          />

          {/* The approach roads on either side of the hill, already there
              before Manjhi ever picked up a chisel. */}
          <motion.line
            x1={START_X}
            y1={ROAD_Y}
            x2={CUT_START_X}
            y2={ROAD_Y}
            strokeWidth={0.8}
            className="stroke-brand/60"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5 }}
          />
          <motion.line
            x1={CUT_END_X}
            y1={ROAD_Y}
            x2={END_X}
            y2={ROAD_Y}
            strokeWidth={0.8}
            className="stroke-brand/60"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5 }}
          />

          {/* The cut itself — the only span Manjhi actually had to make. It
              fills in only as each phase of the story below is visited, the
              same way the real gap only closed after all 22 years had
              passed, not before. */}
          <motion.line
            x1={CUT_START_X}
            y1={ROAD_Y}
            x2={CUT_END_X}
            y2={ROAD_Y}
            strokeWidth={1.1}
            strokeLinecap="round"
            className="stroke-brand"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: cutProgress }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
          />

          {/* A chisel-strike marker at the leading edge of the cut, so the
              growing line reads as active excavation rather than a loading
              bar. */}
          {cutProgress > 0 && cutProgress < 1 && (
            <motion.circle
              cx={CUT_START_X + (CUT_END_X - CUT_START_X) * cutProgress}
              cy={ROAD_Y}
              r={1.1}
              className="fill-brand"
              animate={reducedMotion ? {} : { scale: [1, 1.4, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Hammer;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.4 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${((ROAD_Y + 6) / 78) * 100}%` }}
              initial={{ opacity: 0, y: 4 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="manjhi-cut-detail"
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

        <div
          className="absolute inset-x-0 flex flex-col items-center gap-0.5"
          style={{ top: "2%" }}
        >
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete ? "~15 km Through the Cut · Was ~55 km Around" : "Dashed = ~55 km Around the Hill"}
          </span>
        </div>
      </div>

      <div
        id="manjhi-cut-detail"
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
              Twenty-two years, one hammer, one chisel — and the gap finally closed.
            </span>
          ) : (
            "Tap or hover a phase to watch the cut open, one year of work at a time."
          )}
        </p>
      </div>
    </div>
  );
}

export { ManjhiMountainCutDiagram };

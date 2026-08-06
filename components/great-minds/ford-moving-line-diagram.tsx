"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Car, Cog, Gauge, RectangleHorizontal, Zap, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  RectangleHorizontal,
  Zap,
  Cog,
  Gauge,
  Car,
};

const TRACK_Y = 62;
const START_X = 8;
const END_X = 92;

function stationX(index: number, count: number) {
  return START_X + ((END_X - START_X) / (count - 1)) * index;
}

// A literal horizontal conveyor — the shape is the metaphor, unlike every
// other Great Minds diagram: a token moves continuously left to right along
// a fixed track, exactly the way a chassis actually moved through Highland
// Park, and the motion never stops even without user interaction.
function FordMovingLineDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, x: stationX(index, nodes.length) }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/60] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full overflow-visible">
          {/* Conveyor track with roller ticks. */}
          <motion.line
            x1={START_X}
            y1={TRACK_Y}
            x2={END_X}
            y2={TRACK_Y}
            strokeWidth={0.8}
            className={cn("transition-colors duration-500", cycleComplete ? "stroke-brand/60" : "stroke-brand/30")}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          />
          {Array.from({ length: 15 }, (_, i) => START_X + ((END_X - START_X) / 14) * i).map((x, i) => (
            <motion.line
              key={x}
              x1={x}
              y1={TRACK_Y - 1.6}
              x2={x}
              y2={TRACK_Y + 1.6}
              strokeWidth={0.5}
              className="stroke-brand/20"
              initial={{ opacity: 0 }}
              animate={played ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.1 + i * 0.02 }}
            />
          ))}

          {/* The moving chassis — travels the full track continuously,
              independent of hover state, because the real line never stopped. */}
          <motion.rect
            y={TRACK_Y - 3}
            width={7}
            height={6}
            rx={1.2}
            className="fill-brand"
            initial={false}
            animate={
              played
                ? reducedMotion
                  ? { x: END_X - 3.5, opacity: 0.85 }
                  : { x: [START_X - 3.5, END_X - 3.5], opacity: 0.85 }
                : { opacity: 0 }
            }
            transition={
              played && !reducedMotion
                ? { x: { duration: 5.5, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }
                : { duration: 0.4 }
            }
          />
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Cog;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.3 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${((TRACK_Y - 14) / 60) * 100}%` }}
              initial={{ opacity: 0, y: -4 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="ford-line-detail"
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
          className="absolute inset-x-0 flex justify-center"
          style={{ top: `${((TRACK_Y + 8) / 60) * 100}%` }}
        >
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete ? "93 Minutes, Start to Finish" : "The Line Never Stops"}
          </span>
        </div>
      </div>

      <div
        id="ford-line-detail"
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
              Five stations, one conveyor — the worker never sets the pace.
            </span>
          ) : (
            "Tap or hover a station to see what changed there, from frame to finished car."
          )}
        </p>
      </div>
    </div>
  );
}

export { FordMovingLineDiagram };

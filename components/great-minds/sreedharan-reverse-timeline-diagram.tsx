"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Compass, Landmark, MapPin, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  MapPin,
  Landmark,
  ShieldCheck,
  Compass,
};

const TRACK_Y = 62;
const START_X = 8;
const END_X = 92;
// Every "deadline" ghost marker sits a fixed offset to the right of its
// station — the announced date always trails the actual one, the same
// direction every time, which is the entire point of the diagram.
const DEADLINE_OFFSET = 5;

function stationX(index: number, count: number) {
  return START_X + ((END_X - START_X) / (count - 1)) * index;
}

// Two markers per milestone, not one: a solid brand tick where work actually
// finished, and a dashed "Deadline" ghost tick trailing behind it. Every
// other Great Minds diagram shows a single sequence; this one exists to show
// a gap — the space between the date Sreedharan announced and the date his
// teams actually hit, repeated identically at every station on the line.
function SreedharanReverseTimelineDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
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
          {/* The line itself, with rail-tie ticks. */}
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
          {Array.from({ length: 21 }, (_, i) => START_X + ((END_X - START_X) / 20) * i).map((x, i) => (
            <motion.line
              key={x}
              x1={x}
              y1={TRACK_Y - 1.4}
              x2={x}
              y2={TRACK_Y + 1.4}
              strokeWidth={0.6}
              className="stroke-brand/20"
              initial={{ opacity: 0 }}
              animate={played ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.1 + i * 0.015 }}
            />
          ))}

          {/* The moving train — travels the full line continuously, always
              reaching the far end, the way the record itself never breaks. */}
          <motion.rect
            y={TRACK_Y - 3.2}
            width={7.5}
            height={6.4}
            rx={1.4}
            className="fill-brand"
            initial={false}
            animate={
              played
                ? reducedMotion
                  ? { x: END_X - 3.75, opacity: 0.85 }
                  : { x: [START_X - 3.75, END_X - 3.75], opacity: 0.85 }
                : { opacity: 0 }
            }
            transition={
              played && !reducedMotion
                ? { x: { duration: 6, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }
                : { duration: 0.4 }
            }
          />

          {/* Deadline ghost ticks — dashed, trailing every station by the
              same fixed offset, always to the right of the solid delivery
              tick below it. */}
          {points.map((point) => {
            const deadlineX = Math.min(point.x + DEADLINE_OFFSET, END_X + 2);
            const isActive = activeIndex === point.index;
            return (
              <motion.g
                key={`deadline-${point.label}`}
                initial={{ opacity: 0 }}
                animate={played ? { opacity: isActive ? 0.9 : 0.35 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.5 + point.index * 0.12 }}
              >
                <line
                  x1={deadlineX}
                  y1={TRACK_Y - 5.5}
                  x2={deadlineX}
                  y2={TRACK_Y + 2}
                  strokeWidth={0.5}
                  strokeDasharray="1.4 1.2"
                  className="stroke-muted-foreground"
                />
                <polygon
                  points={`${deadlineX},${TRACK_Y - 5.5} ${deadlineX + 2.6},${TRACK_Y - 4.3} ${deadlineX},${TRACK_Y - 3.1}`}
                  className="fill-muted-foreground"
                />
              </motion.g>
            );
          })}

          {/* Solid delivery ticks — always left of, i.e. earlier than, the
              deadline ghost tick beside them. */}
          {points.map((point) => {
            const isActive = activeIndex === point.index;
            const isVisited = visited.has(point.index);
            return (
              <motion.line
                key={`delivered-${point.label}`}
                x1={point.x}
                y1={TRACK_Y - 5.5}
                x2={point.x}
                y2={TRACK_Y + 2}
                strokeWidth={isActive ? 0.9 : 0.6}
                className={cn("transition-colors duration-200", isVisited ? "stroke-brand" : "stroke-brand/50")}
                initial={{ opacity: 0 }}
                animate={played ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.3 + point.index * 0.12 }}
              />
            );
          })}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Compass;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.3 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${((TRACK_Y - 17) / 60) * 100}%` }}
              initial={{ opacity: 0, y: -4 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="sreedharan-line-detail"
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
          style={{ top: `${((TRACK_Y + 6) / 60) * 100}%` }}
        >
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete ? "Delivered Ahead of Every Announced Date" : "Solid = Delivered · Dashed = Deadline"}
          </span>
        </div>
      </div>

      <div
        id="sreedharan-line-detail"
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
              Five milestones, one pattern — the solid tick always lands before the dashed one.
            </span>
          ) : (
            "Tap or hover a milestone to see how it was reverse-engineered from its deadline."
          )}
        </p>
      </div>
    </div>
  );
}

export { SreedharanReverseTimelineDiagram };

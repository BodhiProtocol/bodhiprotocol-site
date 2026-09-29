"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  DoorOpen,
  Footprints,
  GraduationCap,
  HeartPulse,
  School,
  type LucideIcon,
} from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  School,
  Footprints,
  DoorOpen,
  HeartPulse,
};

const VIEW_H = 80;
const HOME = { x: 5, y: 33 };
const SCHOOL = { x: 93, y: 33 };
const STATION_START_X = 17;
const STATION_END_X = 79;
const STATION_HIGH_Y = 25;
const STATION_LOW_Y = 41;
// The 1897 walk runs under the first one. The last stop sits on it, not on
// the 1848 route, so each road carries only its own story.
const LAST_WALK_Y = 68;
// Index of the "First School" stop — the schoolhouse only lights once it's visited.
const FIRST_SCHOOL_INDEX = 2;
// Index of "The Walk" stop — the one that leaves marks of what was thrown.
const WALK_INDEX = 3;

// Small scatter around "The Walk" stop, offsets in viewBox units.
const THROWN_MARKS = [
  { dx: -4.5, dy: -3.5, r: 0.95 },
  { dx: -2, dy: 4.2, r: 0.7 },
  { dx: 3.4, dy: -4.6, r: 0.85 },
  { dx: 5, dy: 2.8, r: 0.65 },
  { dx: 0.8, dy: -6.2, r: 0.55 },
];

function stationPoint(index: number, count: number) {
  // Every stop but the last winds along the 1848 route; the last one sits
  // midway along the 1897 walk.
  if (index === count - 1) return { x: 50, y: LAST_WALK_Y };
  const routeCount = count - 1;
  const x = STATION_START_X + ((STATION_END_X - STATION_START_X) / Math.max(routeCount - 1, 1)) * index;
  return { x, y: index % 2 === 0 ? STATION_HIGH_Y : STATION_LOW_Y };
}

// Catmull-Rom through every point, converted to cubic Béziers, so the route
// winds through each stop like a street rather than zig-zagging.
function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

// One life, two walks in the same direction. Every 1848 stop visited advances
// her along the route to Bhide Wada; the schoolhouse only lights once the
// school itself exists, and "The Walk" leaves marks of what was thrown at her.
// The 1897 walk underneath stays faint until its own stop is visited — then
// it's walked too, ending at a clinic instead of a classroom.
function PhuleWalkDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const lastIndex = nodes.length - 1;
  const routeVisited = [...visited].filter((index) => index !== lastIndex).length;
  const walkProgress = lastIndex > 0 ? routeVisited / lastIndex : 0;
  const lastWalked = visited.has(lastIndex);
  const routeComplete = lastIndex > 0 && routeVisited >= lastIndex;
  const cycleComplete = nodes.length > 0 && visited.size >= nodes.length;
  const schoolOpen = visited.has(FIRST_SCHOOL_INDEX);
  const walkMarked = visited.has(WALK_INDEX);

  const points = nodes.map((node, index) => ({ ...node, index, ...stationPoint(index, nodes.length) }));
  const route = smoothPath([HOME, ...points.slice(0, -1).map(({ x, y }) => ({ x, y })), SCHOOL]);
  const lastWalk = `M ${HOME.x} ${LAST_WALK_Y} L ${SCHOOL.x} ${LAST_WALK_Y}`;
  const walkStop = points[WALK_INDEX];

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/80] w-full max-w-md sm:max-w-lg">
        <svg viewBox={`0 0 100 ${VIEW_H}`} className="absolute inset-0 h-full w-full overflow-visible">
          {/* The street as it already was — the route existed before she
              walked it. Only her progress along it is earned. */}
          <motion.path
            d={route}
            fill="none"
            strokeWidth={0.7}
            strokeDasharray="1.6 1.4"
            className="stroke-muted-foreground/60"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.2, ease: "easeInOut" }}
          />

          {/* Her progress along it, one stop at a time. */}
          <motion.path
            d={route}
            fill="none"
            strokeWidth={1.1}
            strokeLinecap="round"
            className="stroke-brand"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: walkProgress }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
          />

          {/* What was thrown at her — appears only once "The Walk" is visited,
              and stays, because the walk never got cleaner. */}
          {walkStop &&
            THROWN_MARKS.map((mark, i) => (
              <motion.circle
                key={i}
                cx={walkStop.x + mark.dx}
                cy={walkStop.y + mark.dy}
                r={mark.r}
                className="fill-muted-foreground/45"
                initial={{ opacity: 0, scale: 0 }}
                animate={walkMarked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : i * 0.06 }}
              />
            ))}

          {/* Home — where she first learned to read. */}
          <motion.circle
            cx={HOME.x}
            cy={HOME.y}
            r={1.6}
            className="fill-card stroke-brand/60"
            strokeWidth={0.6}
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          />

          {/* Bhide Wada — an outline until the school exists, lit after. */}
          <motion.path
            d={`M ${SCHOOL.x - 3.4} ${SCHOOL.y + 3} V ${SCHOOL.y - 1} L ${SCHOOL.x} ${SCHOOL.y - 4.4} L ${SCHOOL.x + 3.4} ${SCHOOL.y - 1} V ${SCHOOL.y + 3} Z`}
            strokeWidth={0.6}
            strokeLinejoin="round"
            className={cn(
              "transition-colors duration-500",
              schoolOpen ? "fill-brand/20 stroke-brand" : "fill-card stroke-muted-foreground/60",
            )}
            strokeDasharray={schoolOpen ? undefined : "1 0.8"}
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.8 }}
          />

          {/* 1897 — the same direction, walked once more, carrying a child to
              a clinic instead of walking to a classroom. Faint until its stop
              is visited. */}
          <motion.path
            d={lastWalk}
            fill="none"
            strokeWidth={0.7}
            strokeDasharray="1.6 1.4"
            className="stroke-muted-foreground/40"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 0.6, ease: "easeInOut" }}
          />
          <motion.path
            d={lastWalk}
            fill="none"
            strokeWidth={1.1}
            strokeLinecap="round"
            className="stroke-brand"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: lastWalked ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          />
          <motion.circle
            cx={HOME.x}
            cy={LAST_WALK_Y}
            r={1.3}
            className="fill-card stroke-brand/60"
            strokeWidth={0.6}
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          />
          {/* A plain medical cross, no branding. */}
          <motion.path
            d={`M ${SCHOOL.x - 0.9} ${LAST_WALK_Y - 2.7} h 1.8 v 1.8 h 1.8 v 1.8 h -1.8 v 1.8 h -1.8 v -1.8 h -1.8 v -1.8 h 1.8 Z`}
            strokeWidth={0.5}
            strokeLinejoin="round"
            className={cn(
              "transition-colors duration-500",
              lastWalked ? "fill-brand/20 stroke-brand" : "fill-card stroke-muted-foreground/60",
            )}
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.8 }}
          />
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Footprints;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const labelAbove = point.y === STATION_HIGH_Y;
          const entranceDelay = 0.4 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              style={{ left: `${point.x}%`, top: `${(point.y / VIEW_H) * 100}%` }}
              initial={{ opacity: 0 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="phule-walk-detail"
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
                  "absolute left-1/2 -translate-x-1/2 font-mono text-[8px] font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
                  labelAbove ? "bottom-full mb-1.5" : "top-full mt-1.5",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
            </motion.button>
          );
        })}

        {/* Endpoint labels, in HTML so they stay crisp at every size. */}
        <span
          className="absolute -translate-x-1/2 font-mono text-[8px] tracking-[0.1em] text-muted-foreground uppercase sm:text-[9px]"
          style={{ left: `${HOME.x}%`, top: `${((HOME.y + 3) / VIEW_H) * 100}%` }}
        >
          Home
        </span>
        <span
          className={cn(
            "absolute -translate-x-1/2 text-center font-mono text-[8px] tracking-[0.1em] uppercase transition-colors sm:text-[9px]",
            schoolOpen ? "text-brand" : "text-muted-foreground",
          )}
          style={{ left: `${SCHOOL.x}%`, top: `${((SCHOOL.y + 4.5) / VIEW_H) * 100}%` }}
        >
          {routeComplete ? (
            <>
              3 schools
              <br />
              ~150 girls
              <br />
              by 1851
            </>
          ) : schoolOpen ? (
            <>
              1 school
              <br />
              1848
            </>
          ) : (
            "School"
          )}
        </span>

        <span
          className="absolute -translate-x-1/2 font-mono text-[8px] tracking-[0.1em] text-muted-foreground uppercase sm:text-[9px]"
          style={{ left: `${HOME.x}%`, top: `${((LAST_WALK_Y + 2.8) / VIEW_H) * 100}%` }}
        >
          1897
        </span>
        <span
          className={cn(
            "absolute -translate-x-1/2 font-mono text-[8px] tracking-[0.1em] uppercase transition-colors sm:text-[9px]",
            lastWalked ? "text-brand" : "text-muted-foreground",
          )}
          style={{ left: `${SCHOOL.x}%`, top: `${((LAST_WALK_Y + 3.6) / VIEW_H) * 100}%` }}
        >
          Clinic
        </span>

        <div className="absolute inset-x-0 flex flex-col items-center gap-0.5" style={{ top: "1%" }}>
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete ? "1848: To Teach · 1897: To the Clinic" : "Home to Bhide Wada, Pune · 1848"}
          </span>
        </div>
      </div>

      <div
        id="phule-walk-detail"
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
              She walked toward a classroom at seventeen and toward a clinic at sixty-six — both times for someone
              else&apos;s child.
            </span>
          ) : (
            "Tap or hover each stop to walk her route — the schoolhouse lights only once the school exists."
          )}
        </p>
      </div>
    </div>
  );
}

export { PhuleWalkDiagram };

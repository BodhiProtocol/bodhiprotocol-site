"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, DoorOpen, MessagesSquare, Palette, Trees, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  DoorOpen,
  Trees,
  BookOpen,
  Award,
  MessagesSquare,
  Palette,
};

const VIEW_H = 76;
const LEFT = 5;
const RIGHT = 95;
const TOP = 12;
const BOTTOM = 72;
const COL_1 = 35;
const COL_2 = 65;
const MID_Y = 42;

// Six rooms in a 3×2 grid, visited as a loop: across the top left to right,
// then back along the bottom right to left. Each stop sits in its own room.
const ROOM_CENTERS = [
  { x: 20, y: 27 },
  { x: 50, y: 27 },
  { x: 80, y: 27 },
  { x: 80, y: 57 },
  { x: 50, y: 57 },
  { x: 20, y: 57 },
];

// The wall each stop takes down is the one between its room and the next,
// so visiting in order opens a path all the way round.
const STOP_WALLS = [
  { x1: COL_1, y1: TOP, x2: COL_1, y2: MID_Y },
  { x1: COL_2, y1: TOP, x2: COL_2, y2: MID_Y },
  { x1: COL_2, y1: MID_Y, x2: RIGHT, y2: MID_Y },
  { x1: COL_2, y1: MID_Y, x2: COL_2, y2: BOTTOM },
  { x1: COL_1, y1: MID_Y, x2: COL_1, y2: BOTTOM },
  { x1: LEFT, y1: MID_Y, x2: COL_1, y2: MID_Y },
];

// The last inner wall, between the two middle rooms, belongs to no single
// stop. It only comes down once every other wall has.
const CENTER_WALL = { x1: COL_1, y1: MID_Y, x2: COL_2, y2: MID_Y };

// A world broken into rooms by walls. Every stop visited knocks down one wall;
// when all six are down, the last inner wall and the outer frame give way too
// and the world reads as a single open space — Gitanjali 35's "not broken up
// into fragments by narrow domestic walls." Every other Great Minds diagram
// adds something as you explore; this one only takes things away.
function TagoreWallsDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = nodes.length > 0 && visited.size >= nodes.length;
  const points = nodes.slice(0, ROOM_CENTERS.length).map((node, index) => ({ ...node, index, ...ROOM_CENTERS[index] }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  function wallLine(
    wall: { x1: number; y1: number; x2: number; y2: number },
    down: boolean,
    key: string,
    delay: number,
  ) {
    return (
      <g key={key}>
        {/* Where the wall stood — kept as a faint trace, so a fallen wall
            still reads as a choice that was made. */}
        <line
          {...wall}
          strokeWidth={0.4}
          strokeDasharray="0.8 1.2"
          className={cn("transition-opacity duration-500", down ? "stroke-brand/40 opacity-100" : "opacity-0")}
        />
        <motion.line
          {...wall}
          strokeWidth={1}
          strokeLinecap="round"
          className="stroke-muted-foreground/70"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            played
              ? down
                ? { pathLength: 0, opacity: 0 }
                : { pathLength: 1, opacity: 1 }
              : {}
          }
          transition={{ duration: reducedMotion ? 0 : down ? 0.5 : 0.7, delay: reducedMotion || down ? 0 : delay }}
        />
      </g>
    );
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/76] w-full max-w-md sm:max-w-lg">
        <svg viewBox={`0 0 100 ${VIEW_H}`} className="absolute inset-0 h-full w-full overflow-visible">
          {/* Open ground behind the walls — only visible as a whole once they fall. */}
          <motion.rect
            x={LEFT}
            y={TOP}
            width={RIGHT - LEFT}
            height={BOTTOM - TOP}
            rx={2}
            className="fill-brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: cycleComplete ? 0.08 : 0.02 }}
            transition={{ duration: reducedMotion ? 0 : 0.8 }}
          />

          {/* The outer frame — the last wall to go. */}
          <motion.rect
            x={LEFT}
            y={TOP}
            width={RIGHT - LEFT}
            height={BOTTOM - TOP}
            rx={2}
            fill="none"
            strokeWidth={cycleComplete ? 0.5 : 1}
            strokeDasharray={cycleComplete ? "1.2 1.6" : undefined}
            className={cn(
              "transition-colors duration-700",
              cycleComplete ? "stroke-brand/50" : "stroke-muted-foreground/70",
            )}
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.8 }}
          />

          {STOP_WALLS.slice(0, points.length).map((wall, index) =>
            wallLine(wall, visited.has(index), `wall-${index}`, 0.5 + index * 0.08),
          )}
          {wallLine(CENTER_WALL, cycleComplete, "wall-center", 1)}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? DoorOpen;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.6 + point.index * 0.1;

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
              aria-describedby="tagore-walls-detail"
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
                  "absolute top-full left-1/2 mt-1.5 -translate-x-1/2 font-mono text-[8px] font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
            </motion.button>
          );
        })}

        <div className="absolute inset-x-0 flex flex-col items-center gap-0.5" style={{ top: "1%" }}>
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete
              ? "Every Wall Down · One Open World"
              : `${visited.size} of ${nodes.length} Walls Down`}
          </span>
        </div>
      </div>

      <div
        id="tagore-walls-detail"
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
              &ldquo;Where the world has not been broken up into fragments by narrow domestic walls.&rdquo;{" "}
              <span className="font-normal text-muted-foreground">— Gitanjali, 35</span>
            </span>
          ) : (
            "Tap or hover each room to take down a wall — the classroom's, the language's, the empire's, the nation's."
          )}
        </p>
      </div>
    </div>
  );
}

export { TagoreWallsDiagram };

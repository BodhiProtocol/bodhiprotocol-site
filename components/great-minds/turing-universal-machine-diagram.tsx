"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Crosshair, HelpCircle, OctagonAlert, ScanLine, Table2, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  ScanLine,
  Crosshair,
  Table2,
  OctagonAlert,
  HelpCircle,
};

const CELL_Y = 40;
const START_X = 10;
const END_X = 90;

function cellX(index: number, count: number) {
  return START_X + ((END_X - START_X) / (count - 1)) * index;
}

// A tape of bordered cells with a scanning head above it — square cells
// instead of the circular nodes every other diagram uses, since a Turing
// machine's whole point is that computation is just symbols in discrete
// boxes, read and written one at a time.
function TuringUniversalMachineDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, x: cellX(index, nodes.length) }));
  const headXs = points.map((p) => p.x);

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/58] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 58" className="absolute inset-0 h-full w-full overflow-visible">
          {/* Tape backing strip. */}
          <motion.line
            x1={START_X - 5}
            y1={CELL_Y}
            x2={END_X + 5}
            y2={CELL_Y}
            strokeWidth={0.6}
            className={cn("transition-colors duration-500", cycleComplete ? "stroke-brand/50" : "stroke-brand/25")}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          />

          {/* Read/write head — glides continuously across the tape, since
              the real machine never stops stepping between cells. */}
          <motion.polygon
            points="0,-3 3,3 -3,3"
            className="fill-brand"
            initial={false}
            animate={
              played
                ? reducedMotion
                  ? { x: headXs[headXs.length - 1], y: CELL_Y - 10, opacity: 0.9 }
                  : { x: headXs, y: CELL_Y - 10, opacity: 0.9 }
                : { opacity: 0 }
            }
            transition={
              played && !reducedMotion
                ? { x: { duration: 6, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }
                : { duration: 0.4 }
            }
          />
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Table2;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.3 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none"
              style={{ left: `${point.x}%`, top: `${(CELL_Y / 58) * 100}%` }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.08 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="turing-tape-detail"
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-md border bg-card shadow-sm transition-colors duration-200 sm:size-11",
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
                  "font-mono text-[8px] font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
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
        id="turing-tape-detail"
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
              Five cells, one head — everything a computer is, reduced to this.
            </span>
          ) : (
            "Tap or hover a cell to see what Turing meant by it."
          )}
        </p>
      </div>
    </div>
  );
}

export { TuringUniversalMachineDiagram };

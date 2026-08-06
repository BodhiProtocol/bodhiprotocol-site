"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock, ClipboardList, Crown, HeartHandshake, Mountain, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  HeartHandshake,
  Clock,
  Mountain,
  Crown,
  ClipboardList,
};

const NEEDLE_PIVOT = { x: 50, y: 62 };
const NEEDLE_LENGTH = 34;
// Neutral points straight up; every factor weighed swings it further toward
// "favorable" (left) — the gauge is a running tally of the temple
// calculation, not a fixed illustration, unlike every other diagram's static
// or purely cyclical motion.
const MAX_ROTATION = -58;

function SunTzuCalculationDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const rotation = (visited.size / nodes.length) * MAX_ROTATION;

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/78] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 78" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="suntzu-gauge-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={NEEDLE_PIVOT.x}
              cy={NEEDLE_PIVOT.y}
              r={22}
              fill="url(#suntzu-gauge-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {/* Static gauge arc, from "Uncertain" (right) sweeping toward
              "Victory Calculated" (left). */}
          <motion.path
            d={`M ${NEEDLE_PIVOT.x + 40},${NEEDLE_PIVOT.y} A 40,40 0 0,1 ${NEEDLE_PIVOT.x - 40},${NEEDLE_PIVOT.y}`}
            fill="none"
            strokeWidth={0.6}
            strokeDasharray="1.5 3"
            className="stroke-brand/30"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          />

          {/* Needle — the one element that actually moves as factors are
              weighed, rotating around the pivot toward "Victory". */}
          <motion.line
            x1={NEEDLE_PIVOT.x}
            y1={NEEDLE_PIVOT.y}
            x2={NEEDLE_PIVOT.x}
            y2={NEEDLE_PIVOT.y - NEEDLE_LENGTH}
            strokeWidth={1.3}
            strokeLinecap="round"
            className="stroke-brand"
            style={{ transformOrigin: `${NEEDLE_PIVOT.x}px ${NEEDLE_PIVOT.y}px` }}
            initial={false}
            animate={{ opacity: played ? 1 : 0, rotate: rotation }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeInOut" }}
          />
          <circle cx={NEEDLE_PIVOT.x} cy={NEEDLE_PIVOT.y} r={2.2} className="fill-brand" />
        </svg>

        <div
          className="absolute flex flex-col items-center gap-0.5 text-center"
          style={{ left: `${NEEDLE_PIVOT.x}%`, top: `${((NEEDLE_PIVOT.y + 14) / 78) * 100}%`, transform: "translate(-50%, 0)" }}
        >
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete ? "Victory Calculated" : `${visited.size} of ${nodes.length} weighed`}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 px-1">
          {nodes.map((node, index) => {
            const Icon = iconMap[node.icon] ?? Crown;
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;
            const isVisited = visited.has(index);
            const entranceDelay = 0.35 + index * 0.1;

            return (
              <motion.button
                key={node.label}
                type="button"
                className="flex flex-1 flex-col items-center gap-1.5 rounded-lg outline-none"
                initial={{ opacity: 0, y: 6 }}
                animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
                onMouseEnter={() => markVisited(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => markVisited(index)}
                onBlur={() => setActiveIndex(null)}
                onClick={() => markVisited(index)}
                aria-pressed={isActive}
                aria-describedby="suntzu-calc-detail"
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
                    "font-mono text-[8px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
                    isActive ? "text-brand" : "text-muted-foreground",
                  )}
                >
                  {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div
        id="suntzu-calc-detail"
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
              Five factors weighed — the battle is already decided.
            </span>
          ) : (
            "Tap or hover a factor to weigh it — the needle swings once every factor has been calculated."
          )}
        </p>
      </div>
    </div>
  );
}

export { SunTzuCalculationDiagram };

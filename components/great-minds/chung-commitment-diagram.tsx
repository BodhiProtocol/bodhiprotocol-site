"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flag, Landmark, Milestone, Route, Wrench, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Route,
  Milestone,
  Landmark,
  Flag,
};

// Every other Great Minds diagram positions nodes to show a structure
// (a wheel, a chain, a column). This one positions them along a timeline —
// but three of his five bets (1965, 1968, 1971) land within six years of
// each other, so a strictly year-scaled axis crowds their icons into an
// unreadable cluster. Spacing is even by index instead; each node's own
// year label still carries the real chronology.
const TRACK_START = 8;
const TRACK_END = 92;
const AXIS_Y = 38;

function indexToX(index: number, count: number) {
  if (count <= 1) return (TRACK_START + TRACK_END) / 2;
  return TRACK_START + (index / (count - 1)) * (TRACK_END - TRACK_START);
}

function ChungCommitmentDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length && nodes.length > 0;

  const points = nodes.map((node, index) => {
    const year = Number(node.year) || 0;
    return { ...node, index, year, x: indexToX(index, nodes.length) };
  });

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-[16/9] w-full max-w-xl">
        <svg viewBox="0 0 100 56" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.line
            x1={TRACK_START}
            y1={AXIS_Y}
            x2={TRACK_END}
            y2={AXIS_Y}
            strokeWidth="0.6"
            className="stroke-brand/40"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeInOut" }}
          />

          {points.map((point) => {
            const delay = 0.5 + point.index * 0.18;
            return (
              <motion.line
                key={point.label}
                x1={point.x}
                y1={AXIS_Y}
                x2={point.x}
                y2={AXIS_Y - 10}
                strokeWidth="0.6"
                className="stroke-brand/40"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={played ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : delay, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Landmark;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.55 + point.index * 0.18;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${(AXIS_Y / 56) * 100 - 20}%` }}
              initial={{ opacity: 0, y: 6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="chung-commitment-detail"
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-11",
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
                  "font-mono text-[8px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.year}
              </span>
            </motion.button>
          );
        })}

        {/* Reversed-order mini-diagram: fixed reference (dashed, faint) vs.
            his actual order (solid, brand) for whichever node is active. */}
        <div className="absolute inset-x-2 bottom-0 flex flex-col gap-2 sm:inset-x-6">
          <div className="flex items-center gap-2">
            <span className="w-16 shrink-0 font-mono text-[7px] tracking-wide text-muted-foreground/70 uppercase sm:w-20 sm:text-[8px]">
              Usual order
            </span>
            <div className="flex flex-1 items-center gap-1.5 text-muted-foreground/50">
              <span className="rounded border border-dashed border-current px-1.5 py-0.5 font-mono text-[7px] whitespace-nowrap sm:text-[8px]">
                Capability
              </span>
              <span className="h-px flex-1 border-t border-dashed border-current" />
              <span className="rounded border border-dashed border-current px-1.5 py-0.5 font-mono text-[7px] whitespace-nowrap sm:text-[8px]">
                Commit
              </span>
              <span className="h-px flex-1 border-t border-dashed border-current" />
              <span className="rounded border border-dashed border-current px-1.5 py-0.5 font-mono text-[7px] whitespace-nowrap sm:text-[8px]">
                Deliver
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-16 shrink-0 font-mono text-[7px] tracking-wide uppercase transition-colors sm:w-20 sm:text-[8px]",
                active ? "text-brand" : "text-muted-foreground/70",
              )}
            >
              Chung&rsquo;s order
            </span>
            <div className="flex flex-1 items-center gap-1.5">
              <span
                className={cn(
                  "rounded border px-1.5 py-0.5 font-mono text-[7px] font-semibold whitespace-nowrap transition-colors sm:text-[8px]",
                  active ? "border-brand bg-brand text-brand-foreground" : "border-brand/30 text-brand/70",
                )}
              >
                Commit
              </span>
              <motion.span
                className="h-px flex-1 origin-left border-t border-brand/60"
                initial={{ scaleX: 0 }}
                animate={active ? { scaleX: 1 } : { scaleX: 0.3 }}
                transition={{ duration: 0.35 }}
              />
              <span
                className={cn(
                  "rounded border px-1.5 py-0.5 font-mono text-[7px] font-semibold whitespace-nowrap transition-colors sm:text-[8px]",
                  active ? "border-brand bg-brand text-brand-foreground" : "border-brand/30 text-brand/70",
                )}
              >
                Capability
              </span>
              <motion.span
                className="h-px flex-1 origin-left border-t border-brand/60"
                initial={{ scaleX: 0 }}
                animate={active ? { scaleX: 1 } : { scaleX: 0.3 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              />
              <span
                className={cn(
                  "rounded border px-1.5 py-0.5 font-mono text-[7px] font-semibold whitespace-nowrap transition-colors sm:text-[8px]",
                  active ? "border-brand bg-brand text-brand-foreground" : "border-brand/30 text-brand/70",
                )}
              >
                Deliver
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        id="chung-commitment-detail"
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
              Five bets, four decades apart at the start, ten years apart by the end — same reversal, every time.
            </span>
          ) : (
            "Tap or hover a year to see which order he actually did it in."
          )}
        </p>
      </div>
    </div>
  );
}

export { ChungCommitmentDiagram };

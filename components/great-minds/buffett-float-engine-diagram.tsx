"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Hourglass, Landmark, RotateCw, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Landmark,
  TrendingUp,
  Hourglass,
  RotateCw,
};

const RESERVOIR_INDEX = 1;

// Points sit on a 140x90 "stadium" loop — M30,15 L110,15 A30,30 0 0 1 110,75
// L30,75 A30,30 0 0 1 30,15 Z — sampled at five even arc-length steps
// clockwise from the top-left corner. Unlike Drucker's circle, the loop is
// an oval pipe run rather than a wheel: capital doesn't just cycle, it pools
// at one wider stop (the reservoir) before moving on, so the shape itself
// carries the "collect, hold, then deploy" mechanic.
const POINTS = [
  { x: 30, y: 15 }, // Premiums In
  { x: 99.7, y: 15 }, // Float Reservoir
  { x: 137.5, y: 56.9 }, // Capital Deployed
  { x: 75.2, y: 75 }, // Compounds for Decades
  { x: 8.1, y: 65.5 }, // Reservoir Widens
];

const TRACK_PATH = "M30,15 L110,15 A30,30 0 0 1 110,75 L30,75 A30,30 0 0 1 30,15 Z";

function toPercent(value: number, axis: "x" | "y") {
  return (value / (axis === "x" ? 140 : 90)) * 100;
}

function BuffettFloatEngineDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  // Hover is ephemeral; a click pins independently of it — reading a click's
  // toggle off the same activeIndex a mouseenter had just set would race,
  // since every click is necessarily preceded by a mouseenter, and the very
  // first click on any node would silently cancel itself back out.
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[140/100] w-full max-w-lg">
        <svg
          viewBox="0 0 140 90"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <radialGradient id="buffett-reservoir-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
            <marker id="buffett-flow-arrowhead" markerWidth="5" markerHeight="5" refX="3.2" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" className="fill-brand" />
            </marker>
          </defs>

          {/* The stadium track itself — a closed pipe run, not a wheel.
              Dashes flow continuously in one direction: float never sits
              still, it's always mid-cycle somewhere on the loop. */}
          <motion.path
            d={TRACK_PATH}
            fill="none"
            strokeWidth={0.9}
            strokeDasharray="3 3"
            markerEnd="url(#buffett-flow-arrowhead)"
            className="stroke-brand/50"
            initial={false}
            animate={
              played
                ? reducedMotion
                  ? { opacity: 1, strokeDashoffset: 0 }
                  : { opacity: 1, strokeDashoffset: [0, -12] }
                : { opacity: 0 }
            }
            transition={
              played && !reducedMotion
                ? { opacity: { duration: 0.4, delay: 0.15 }, strokeDashoffset: { duration: 2.2, repeat: Infinity, ease: "linear" } }
                : { duration: 0.4, delay: 0.15 }
            }
          />

          {/* Concentric pulses behind the reservoir stop — the one node
              that widens over time rather than just passing capital through. */}
          <motion.circle
            cx={POINTS[RESERVOIR_INDEX].x}
            cy={POINTS[RESERVOIR_INDEX].y}
            r={9}
            fill="url(#buffett-reservoir-glow)"
            className="text-brand"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: reducedMotion ? 0.4 : [0.25, 0.55, 0.25] } : {}}
            transition={{ duration: 3.4, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
          />
        </svg>

        {POINTS.map((point, index) => {
          const node = nodes[index];
          if (!node) return null;
          const Icon = iconMap[node.icon] ?? Landmark;
          const isReservoir = index === RESERVOIR_INDEX;
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.3 + index * 0.12;

          return (
            <motion.button
              key={node.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${toPercent(point.x, "x")}%`, top: `${toPercent(point.y, "y")}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.12 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => setPinnedIndex((current) => (current === index ? null : index))}
              aria-pressed={isActive}
              aria-describedby="buffett-engine-detail"
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                  isReservoir ? "size-14 sm:size-16" : "size-10 sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className={cn(isReservoir ? "size-6 sm:size-7" : "size-4 sm:size-5")} />
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors sm:text-[10px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="buffett-engine-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stop to trace where the float actually goes."
          )}
        </p>
      </div>
    </div>
  );
}

export { BuffettFloatEngineDiagram };

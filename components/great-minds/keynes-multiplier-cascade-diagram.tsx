"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Landmark, Scale, Sparkles, Target, TrendingUp, Waves, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Sparkles,
  TrendingUp,
  Waves,
  Target,
  Scale,
};

// Two independent spending sources (public and private) converge on a single
// hub, which then splits its output between the demand it amplifies and the
// leakage that drains part of it away — a continuously recirculating
// mechanism, not a static sequence or hierarchy, since the multiplier is
// literally money moving through the economy in repeating rounds.
const LAYOUT = [
  { x: 25, y: 12 }, // Government Spending
  { x: 75, y: 12 }, // Animal Spirits
  { x: 50, y: 48 }, // The Multiplier (hub)
  { x: 87, y: 74 }, // Leakage
  { x: 50, y: 92 }, // Effective Demand
];

const HUB_INDEX = 2;
const HUB = LAYOUT[HUB_INDEX];
const VIEW_HEIGHT = 98;

function KeynesMultiplierCascadeDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const points = nodes.map((node, index) => ({ ...node, index, ...(LAYOUT[index] ?? HUB) }));
  const inflows = [points[0], points[1]].filter(Boolean);
  const leak = points[3];
  const demand = points[4];

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/98] w-full max-w-md sm:max-w-lg">
        <svg viewBox={`0 0 100 ${VIEW_HEIGHT}`} className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <marker id="keynes-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-brand/60" />
            </marker>
            <marker id="keynes-leak-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground/50" />
            </marker>
            <radialGradient id="keynes-hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r={15}
            fill="url(#keynes-hub-glow)"
            className="text-brand"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: reducedMotion ? 0.4 : [0.25, 0.5, 0.25] } : {}}
            transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
          />

          {/* Two independent spending sources converging on the multiplier hub */}
          {inflows.map((point, i) => (
            <motion.line
              key={`in-${point.label}`}
              x1={point.x}
              y1={point.y}
              x2={HUB.x}
              y2={HUB.y}
              strokeWidth={0.7}
              markerEnd="url(#keynes-arrow)"
              className="stroke-brand/45"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 + i * 0.15 }}
            />
          ))}

          {/* Main amplified flow: the hub down to total effective demand */}
          <motion.line
            x1={HUB.x}
            y1={HUB.y}
            x2={demand.x}
            y2={demand.y}
            strokeWidth={1.1}
            markerEnd="url(#keynes-arrow)"
            className="stroke-brand/55"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.55 }}
          />

          {/* Leakage: a thinner, dashed drain peeling off the hub */}
          <motion.line
            x1={HUB.x}
            y1={HUB.y}
            x2={leak.x}
            y2={leak.y}
            strokeWidth={0.5}
            strokeDasharray="1.5 1.5"
            markerEnd="url(#keynes-leak-arrow)"
            className="stroke-muted-foreground/40"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.75 }}
          />

          {!reducedMotion
            ? [
                ...inflows.map((point, i) => (
                  <motion.circle
                    key={`pulse-in-${point.label}`}
                    r="1.3"
                    className="fill-brand"
                    initial={{ opacity: 0 }}
                    animate={played ? { cx: [point.x, HUB.x], cy: [point.y, HUB.y], opacity: [0, 1, 1, 0] } : {}}
                    transition={{ duration: 1.3, delay: 1.2 + i * 0.7, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                  />
                )),
                <motion.circle
                  key="pulse-demand"
                  r="1.6"
                  className="fill-brand"
                  initial={{ opacity: 0 }}
                  animate={played ? { cx: [HUB.x, demand.x], cy: [HUB.y, demand.y], opacity: [0, 1, 1, 0] } : {}}
                  transition={{ duration: 1.3, delay: 2.4, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                />,
                <motion.circle
                  key="pulse-leak"
                  r="1"
                  className="fill-muted-foreground/70"
                  initial={{ opacity: 0 }}
                  animate={played ? { cx: [HUB.x, leak.x], cy: [HUB.y, leak.y], opacity: [0, 1, 1, 0] } : {}}
                  transition={{ duration: 1.1, delay: 2.6, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
                />,
              ]
            : null}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? TrendingUp;
          const isHub = point.index === HUB_INDEX;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.15 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none"
              style={{ left: `${point.x}%`, top: `${(point.y / VIEW_HEIGHT) * 100}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => setHoverIndex(point.index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(point.index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => handleClick(point.index)}
              aria-pressed={isActive}
              aria-describedby="keynes-cascade-detail"
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                  isHub ? "size-12 sm:size-14" : "size-9 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className={isHub ? "size-5 sm:size-6" : "size-4"} />
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
        id="keynes-cascade-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a node to see how spending recirculates before it finally leaks away."
          )}
        </p>
      </div>
    </div>
  );
}

export { KeynesMultiplierCascadeDiagram };

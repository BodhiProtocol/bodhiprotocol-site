"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Gem,
  Hourglass,
  LifeBuoy,
  RotateCw,
  Shield,
  ShoppingCart,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Hourglass,
  Shield,
  Zap,
  RotateCw,
  LifeBuoy,
  Gem,
};

// Lynch's edge wasn't a single sequence like Munger's inversion — it was a
// sorting discipline, one observation fanning out into six baskets, each with
// its own rules. So the diagram is a fan opening upward from one origin
// point (the ordinary consumer's cart), not a taper or a loop. Angles are
// spread symmetrically around straight-up so the shape reads as "one thing,
// six ways to file it" rather than a sequence read left to right.
//
// The SVG viewBox and the HTML overlay buttons share one coordinate space
// (VIEWBOX_W × VIEWBOX_H) so a node's drawn position and its clickable
// position never drift apart — every percent below is computed from the
// same numbers used to draw the SVG lines.
const VIEWBOX_W = 100;
const VIEWBOX_H = 125;
const ORIGIN = { x: 50, y: 115 };
const RADIUS = 42;
const SPREAD_DEG = 140;

function nodePosition(index: number, count: number) {
  const step = SPREAD_DEG / (count - 1);
  const angleDeg = -SPREAD_DEG / 2 + step * index;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: ORIGIN.x + RADIUS * Math.sin(angleRad),
    y: ORIGIN.y - RADIUS * Math.cos(angleRad),
  };
}

function toPercent(pos: { x: number; y: number }) {
  return { leftPct: (pos.x / VIEWBOX_W) * 100, topPct: (pos.y / VIEWBOX_H) * 100 };
}

function LynchCategorySortDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;
  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const stateTransition = { duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" as const };

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md">
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {nodes.map((node, index) => {
            const pos = nodePosition(index, nodes.length);
            const isActive = activeIndex === index;
            return (
              <motion.line
                key={node.label}
                x1={ORIGIN.x}
                y1={ORIGIN.y}
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeWidth={isActive ? 0.7 : 0.4}
                strokeDasharray={isActive ? undefined : "2 2"}
                className="text-brand"
                initial={false}
                animate={{ opacity: played ? (isActive ? 0.75 : 0.25) : 0 }}
                transition={stateTransition}
              />
            );
          })}

          {/* A small dot travels from the cart to whichever basket is active — the sort happening. */}
          {active && !reducedMotion ? (
            (() => {
              const pos = nodePosition(activeIndex as number, nodes.length);
              return (
                <motion.circle
                  key={active.label}
                  r={1.6}
                  className="fill-brand"
                  initial={{ cx: ORIGIN.x, cy: ORIGIN.y, opacity: 0 }}
                  animate={{ cx: [ORIGIN.x, pos.x], cy: [ORIGIN.y, pos.y], opacity: [1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
                />
              );
            })()
          ) : null}
        </svg>

        <div
          className="absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/25 bg-card shadow-sm sm:size-10"
          style={{ left: `${toPercent(ORIGIN).leftPct}%`, top: `${toPercent(ORIGIN).topPct}%` }}
        >
          <ShoppingCart className="size-4 text-brand/80 sm:size-5" aria-hidden="true" />
        </div>

        {nodes.map((node, index) => {
          const pos = nodePosition(index, nodes.length);
          const { leftPct, topPct } = toPercent(pos);
          const Icon = iconMap[node.icon] ?? ShoppingCart;
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;
          const delay = 0.1 + index * 0.09;

          return (
            <motion.button
              key={node.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 outline-none"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => setPinnedIndex((current) => (current === index ? null : index))}
              aria-pressed={isActive}
              aria-describedby="lynch-basket-detail"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border bg-background/80 shadow-sm backdrop-blur-sm transition-colors duration-200 sm:size-9",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4" />
              </span>
              <span
                className={cn(
                  "max-w-16 text-center font-mono text-[9px] leading-tight font-semibold tracking-[0.06em] uppercase transition-colors sm:max-w-20 sm:text-[10px]",
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
        id="lynch-basket-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a basket to see which rules that category plays by."
          )}
        </p>
      </div>
    </div>
  );
}

export { LynchCategorySortDiagram };

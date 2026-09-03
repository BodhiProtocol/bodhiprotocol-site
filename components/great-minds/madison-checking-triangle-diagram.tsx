"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Landmark, Scale, Shield, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Scale,
  Shield,
};

// Fixed triangle positions, one per branch — order matters, since each
// node's outgoing arrow points at the *next* node in this array, forming a
// closed three-way cycle rather than a hub-and-spoke or a line. No other
// Great Minds diagram is a directed cycle: this shape exists specifically
// to show that each branch's check runs one way, into a single neighbor,
// and the cycle only closes because all three arrows exist at once.
const POSITIONS = [
  { x: 50, y: 14 }, // Legislative
  { x: 18, y: 82 }, // Judicial
  { x: 82, y: 82 }, // Executive
];

function MadisonCheckingTriangleDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null);
  const activeIndex = pinnedIndex ?? hoverIndex;

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const points = nodes.map((node, index) => ({ ...node, index, ...(POSITIONS[index] ?? POSITIONS[POSITIONS.length - 1]) }));

  function handleClick(index: number) {
    setPinnedIndex((current) => (current === index ? null : index));
  }

  // Pull each edge's endpoints in slightly toward the triangle's center so
  // the arrowhead lands just outside the destination node's circle rather
  // than underneath it.
  const center = { x: 50, y: 59 };
  function inset(p: { x: number; y: number }, amount: number) {
    const dx = center.x - p.x;
    const dy = center.y - p.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: p.x + (dx / len) * amount, y: p.y + (dy / len) * amount };
  }

  const edges = points.map((point, index) => {
    const next = points[(index + 1) % points.length];
    return {
      key: `${point.label}->${next.label}`,
      index,
      from: inset(point, 9),
      to: inset(next, 11),
    };
  });

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <marker id="madison-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-brand/60" />
            </marker>
          </defs>

          {edges.map((edge) => {
            const isActive = activeIndex === edge.index;
            return (
              <motion.line
                key={edge.key}
                x1={edge.from.x}
                y1={edge.from.y}
                x2={edge.to.x}
                y2={edge.to.y}
                strokeWidth={isActive ? 1 : 0.6}
                markerEnd="url(#madison-arrow)"
                className={cn("transition-[stroke-width] duration-200", isActive ? "stroke-brand" : "stroke-brand/40")}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={played ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.4 + edge.index * 0.25 }}
              />
            );
          })}

          {!reducedMotion
            ? edges.map((edge) => (
                <motion.circle
                  key={`pulse-${edge.key}`}
                  r="1.4"
                  className="fill-brand"
                  initial={{ opacity: 0 }}
                  animate={
                    played
                      ? {
                          cx: [edge.from.x, edge.to.x],
                          cy: [edge.from.y, edge.to.y],
                          opacity: [0, 1, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.4,
                    delay: 1.4 + edge.index * 0.9,
                    repeat: Infinity,
                    repeatDelay: 2.6,
                    ease: "easeInOut",
                  }}
                />
              ))
            : null}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Scale;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const entranceDelay = 0.15 + point.index * 0.15;
          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => setHoverIndex(point.index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(point.index)}
              onBlur={() => setHoverIndex(null)}
              onClick={() => handleClick(point.index)}
              aria-pressed={isActive}
              aria-describedby="madison-triangle-detail"
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-12",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-5 sm:size-6" />
              </span>
              <span
                className={cn(
                  "font-mono text-[8px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
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
        id="madison-triangle-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a branch to see what it holds over the next one in the cycle."
          )}
        </p>
      </div>
    </div>
  );
}

export { MadisonCheckingTriangleDiagram };

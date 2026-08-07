"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Factory, FlaskConical, Fuel, Shirt, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Shirt,
  FlaskConical,
  Factory,
  Fuel,
};

const ICON_Y = 22;
const START_X = 90;
const STEP_X = 25;

// Nodes are given in the order he actually built them (finished goods
// first). Every other Great Minds chain reads left-to-right; this one is
// laid out in reverse — the first thing he owned sits on the right, and
// each later node lands one step further left, toward the raw material —
// because that reversal against the normal reading direction is the point.
function AmbaniReverseChainDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length && nodes.length > 0;
  const points = nodes.map((node, index) => ({ ...node, index, x: START_X - index * STEP_X }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/55] w-full max-w-md sm:max-w-lg">
        {points.slice(1).map((point, i) => {
          const prev = points[i];
          const midX = (prev.x + point.x) / 2;
          const delay = 0.3 + point.index * 0.35;
          return (
            <motion.div
              key={point.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-brand/50"
              style={{ left: `${midX}%`, top: `${ICON_Y}%` }}
              initial={{ opacity: 0 }}
              animate={played ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : delay }}
            >
              <motion.div
                animate={played && !reducedMotion ? { x: [1.5, -1.5, 1.5] } : {}}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: point.index * 0.2 }}
              >
                <ArrowLeft className="size-4" />
              </motion.div>
            </motion.div>
          );
        })}

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Factory;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.15 + point.index * 0.35;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${ICON_Y}%` }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="ambani-chain-detail"
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-12",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isVisited
                      ? "border-brand/40 text-brand"
                      : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors sm:text-[10px]",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {point.label}
              </span>
              <span className="font-mono text-[8px] text-muted-foreground/60 sm:text-[9px]">{point.year}</span>
            </motion.button>
          );
        })}

        <div className="absolute inset-x-0 flex justify-center" style={{ top: "88%" }}>
          <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[10px]">
            {cycleComplete ? "Finished Goods to Crude Oil, in Reverse" : "Read Right to Left"}
          </span>
        </div>
      </div>

      <div
        id="ambani-chain-detail"
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
              Every other chain like this reads left to right. His didn&apos;t.
            </span>
          ) : (
            "Tap or hover a link to see which supplier it let him stop depending on."
          )}
        </p>
      </div>
    </div>
  );
}

export { AmbaniReverseChainDiagram };

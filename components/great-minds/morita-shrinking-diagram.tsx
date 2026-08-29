"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Handshake, Headphones, Radio, Shirt, Tv, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Radio,
  Handshake,
  Shirt,
  Tv,
  Headphones,
};

// Real approximate physical footprint per product, in the order the wheel
// nodes appear in akio-morita.mdx — the throughline the diagram exists to
// show (the machine getting smaller) doesn't live in the CMS content, so it's
// hardcoded here rather than duplicated into frontmatter every other diagram
// doesn't need.
const SIZE_STEPS = [
  { box: 92, fits: "The size of a suitcase" },
  { box: 70, fits: "Fits in two hands" },
  { box: 52, fits: "Fits in a shirt pocket" },
  { box: 38, fits: "Fits in one hand" },
  { box: 26, fits: "No speaker, no case — just headphones" },
];

function MoritaShrinkingDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length && nodes.length > 0;

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full max-w-xl flex-col gap-3">
        <div className="flex items-end justify-center gap-2 px-2 sm:gap-4">
          {nodes.map((node, index) => {
            const Icon = iconMap[node.icon] ?? Radio;
            const step = SIZE_STEPS[index] ?? SIZE_STEPS[SIZE_STEPS.length - 1];
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;
            const isVisited = visited.has(index);
            // Fixed pixel boxes would force this five-box row past a phone's
            // viewport width (the sizes are unequal, so Tailwind's usual
            // size-9 sm:size-11 breakpoint trick doesn't fit five different
            // targets at once). clamp() shrinks every box — and its icon, at
            // the same ratio — together on narrow screens, while both still
            // hit their exact size above sm.
            const clampSize = (ratio: number) =>
              `clamp(${Math.round(step.box * 0.58 * ratio)}px, calc(15vw * ${ratio}), ${Math.round(step.box * ratio)}px)`;
            const boxSize = clampSize(1);
            const iconSize = clampSize(0.42);

            return (
              <div key={node.label} className="flex flex-col items-center gap-2">
                <motion.button
                  type="button"
                  className={cn(
                    "flex items-center justify-center rounded-lg border bg-card shadow-sm outline-none transition-colors duration-200",
                    isActive
                      ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                      : isVisited
                        ? "border-brand/40 text-brand"
                        : "border-brand/20 text-brand/80",
                  )}
                  style={{ width: boxSize, height: boxSize }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: 1 } : {}}
                  transition={{
                    duration: reducedMotion ? 0 : 0.4,
                    delay: reducedMotion ? 0 : 0.15 + index * 0.15,
                  }}
                  onMouseEnter={() => markVisited(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => markVisited(index)}
                  onBlur={() => setActiveIndex(null)}
                  onClick={() => markVisited(index)}
                  aria-pressed={isActive}
                  aria-describedby="morita-shrinking-detail"
                >
                  <Icon style={{ width: iconSize, height: iconSize }} />
                </motion.button>
                <span
                  className={cn(
                    "font-mono text-[8px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors sm:text-[9px]",
                    isActive ? "text-brand" : "text-muted-foreground",
                  )}
                >
                  {node.year}
                </span>
              </div>
            );
          })}
        </div>

        <div className="relative h-px w-full bg-brand/15">
          <motion.div
            className="absolute inset-y-0 left-0 bg-brand/50"
            initial={{ width: "0%" }}
            animate={played ? { width: "100%" } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 0.2, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div
        id="morita-shrinking-detail"
        className="flex min-h-20 max-w-md flex-col items-center justify-center gap-1 rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        {active ? (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </p>
            <p className="font-mono text-[10px] tracking-wide text-brand/80 uppercase">
              {SIZE_STEPS[activeIndex ?? 0]?.fits}
            </p>
          </>
        ) : cycleComplete ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              Same underlying technology, five times over — each version smaller than the one the market had already
              accepted.
            </span>
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tap or hover a year to see how much smaller each version got.
          </p>
        )}
      </div>
    </div>
  );
}

export { MoritaShrinkingDiagram };

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Flame, Fuel, Orbit, RotateCcw, Rocket, Sparkles, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Fuel,
  Flame,
  Rocket,
  Orbit,
};

// Nodes are authored in launch order — Dream, Fuel, Ignition, Thrust, Orbit —
// but a rocket reads nose-first, so the stack renders that order reversed
// (Orbit at the top, Dream at the pad). isIgnition/isThrusting are driven by
// the original index, not the render position.
const IGNITION = 2;
const THRUST = 3;

// Bands taper like a rocket body: narrow nose at the top, wide base at the pad.
const BAND_WIDTHS = ["46%", "58%", "70%", "82%", "94%"];

function KalamIgnitionDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const isThrusting = activeIndex === THRUST;
  const displayNodes = nodes.map((node, originalIndex) => ({ node, originalIndex })).reverse();

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full max-w-xs flex-col items-center">
        {displayNodes.map(({ node, originalIndex }, renderIndex) => {
          const Icon = iconMap[node.icon] ?? Sparkles;
          const isActive = activeIndex === originalIndex;
          const isDimmed = activeIndex !== null && !isActive;
          const isIgnition = originalIndex === IGNITION;
          const isNose = renderIndex === 0;
          const delay = 0.15 + renderIndex * 0.16;

          return (
            <React.Fragment key={node.label}>
              {renderIndex > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={played ? { opacity: isDimmed ? 0.2 : 0.6 } : {}}
                  transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay - 0.08 }}
                  className="flex h-6 items-center justify-center text-brand"
                >
                  <motion.div
                    animate={played && !reducedMotion ? { y: [0, -4, 0] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: renderIndex * 0.15 }}
                  >
                    <ArrowUp className="size-4" />
                  </motion.div>
                </motion.div>
              ) : null}

              <motion.button
                type="button"
                style={{ width: BAND_WIDTHS[renderIndex] }}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left outline-none transition-colors duration-200",
                  isActive ? "border-brand/40 bg-brand/10" : "border-brand/15 bg-brand/[0.03]",
                )}
                initial={{ opacity: 0, y: -10 }}
                animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay }}
                onMouseEnter={() => setActiveIndex(originalIndex)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(originalIndex)}
                onBlur={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : originalIndex)}
                aria-pressed={isActive}
                aria-describedby="kalam-node-detail"
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                    isActive
                      ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                      : "border-brand/20 text-brand/80",
                  )}
                >
                  <motion.span
                    animate={
                      isIgnition && played && !reducedMotion ? { opacity: [1, 0.6, 1], scale: [1, 1.08, 1] } : {}
                    }
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <Icon className="size-4" />
                  </motion.span>
                </span>
                <span
                  className={cn(
                    "font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors",
                    isActive ? "text-brand" : "text-muted-foreground",
                  )}
                >
                  {node.label}
                </span>
                {isNose ? (
                  <RotateCcw
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1.5 -right-1.5 size-3.5 rounded-full bg-background p-px text-brand/60"
                  />
                ) : null}
              </motion.button>
            </React.Fragment>
          );
        })}

        <motion.div
          aria-hidden="true"
          className="flex h-5 items-end justify-center gap-1"
          animate={isThrusting && !reducedMotion ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="h-3 w-1 rounded-full bg-brand/70" />
          <span className="h-5 w-1 rounded-full bg-brand" />
          <span className="h-3 w-1 rounded-full bg-brand/70" />
        </motion.div>
      </div>

      <div
        id="kalam-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stage to see how it shaped his thinking."
          )}
        </p>
      </div>
    </div>
  );
}

export { KalamIgnitionDiagram };

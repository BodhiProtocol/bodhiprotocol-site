"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Feather,
  Flag,
  Hammer,
  ListOrdered,
  MessageSquare,
  PiggyBank,
  Scale,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Target,
  Utensils,
  VolumeX,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Utensils,
  VolumeX,
  ListOrdered,
  Flag,
  PiggyBank,
  Hammer,
  MessageSquare,
  Scale,
  SlidersHorizontal,
  Sparkles,
  Waves,
  Shield,
  Feather,
};

// A vertical ledger instead of a radial diagram — the shape is the metaphor:
// thirteen rows run top to bottom like his real notebook page, and the
// connector on the right sweeps from the last row back to the first, since
// the fixed rotation restarted at Temperance four times a year.
function FranklinVirtueLedgerDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative flex w-full max-w-sm flex-col sm:max-w-md">
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border bg-card/40 transition-colors duration-500",
            cycleComplete ? "border-brand/40" : "border-brand/15",
          )}
        >
          <div className="divide-y divide-brand/10">
            {nodes.map((node, index) => {
              const Icon = iconMap[node.icon] ?? Target;
              const isActive = activeIndex === index;
              const isVisited = visited.has(index);
              const entranceDelay = 0.06 + index * 0.045;

              return (
                <motion.button
                  key={node.label}
                  type="button"
                  className="flex w-full items-center gap-3 px-3 py-2 text-left outline-none"
                  initial={{ opacity: 0, x: -6 }}
                  animate={played ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : entranceDelay }}
                  onMouseEnter={() => markVisited(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => markVisited(index)}
                  onBlur={() => setActiveIndex(null)}
                  onClick={() => markVisited(index)}
                  aria-pressed={isActive}
                  aria-describedby="franklin-ledger-detail"
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                      isActive
                        ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                        : isVisited
                          ? "border-brand/40 text-brand"
                          : "border-brand/20 text-brand/80",
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[10px] font-semibold tracking-[0.08em] uppercase transition-colors",
                      isActive ? "text-brand" : "text-muted-foreground",
                    )}
                  >
                    {node.label}
                  </span>
                  <span className="ml-auto font-mono text-[9px] text-muted-foreground/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Loop connector: sweeps from the bottom row back up to the top,
            marking the four-times-a-year restart at Temperance. */}
        <svg
          viewBox="0 0 20 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-0 -right-3 h-full w-5 overflow-visible text-brand/50"
        >
          <defs>
            <marker id="franklin-loop-arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="4.5" orient="auto">
              <path d="M0,0 L6,4.5 L0,9 Z" className="fill-current" />
            </marker>
          </defs>
          <motion.path
            d="M9,97 C 19,75 19,25 9,3"
            fill="none"
            strokeWidth={1.4}
            strokeDasharray="3 3"
            markerEnd="url(#franklin-loop-arrowhead)"
            className="stroke-current"
            initial={false}
            animate={
              played
                ? reducedMotion
                  ? { opacity: 0.6, strokeDashoffset: 0 }
                  : { opacity: 0.6, strokeDashoffset: [0, -24] }
                : { opacity: 0 }
            }
            transition={
              played && !reducedMotion
                ? { opacity: { duration: 0.4, delay: 0.6 }, strokeDashoffset: { duration: 2.8, repeat: Infinity, ease: "linear" } }
                : { duration: 0.4, delay: 0.6 }
            }
          />
        </svg>
      </div>

      <div
        id="franklin-ledger-detail"
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
              Thirteen rows, one week each — then the ledger restarts at Temperance.
            </span>
          ) : (
            "Tap or hover a virtue to read the line Franklin wrote for it."
          )}
        </p>
      </div>
    </div>
  );
}

export { FranklinVirtueLedgerDiagram };

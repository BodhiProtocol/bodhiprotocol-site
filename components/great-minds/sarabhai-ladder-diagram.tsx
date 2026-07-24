"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, GraduationCap, House, Route, Satellite, Sunrise, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  House,
  Route,
  GraduationCap,
  Satellite,
  Sunrise,
};

function SarabhaiLadderDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const active = activeIndex !== null ? nodes[activeIndex] : null;

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <div className="relative flex w-full max-w-xs flex-col items-center">
        {/* Decorative leap arc — bows past the two skipped rungs, purely
            visual, no semantic content (the real content lives on the nodes
            themselves, same separation of concerns as Darwin's pruned-branch
            connector). */}
        <svg
          viewBox="0 0 100 300"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand/40"
        >
          <motion.path
            d="M 50 14 C 95 90, 95 210, 50 286"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={played ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.1, delay: reducedMotion ? 0 : 0.3, ease: "easeInOut" }}
          />
        </svg>

        {nodes.map((node, index) => {
          const Icon = iconMap[node.icon] ?? House;
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;
          const delay = 0.15 + index * 0.16;

          return (
            <React.Fragment key={node.label}>
              {index > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={played ? { opacity: isDimmed ? 0.2 : 0.6 } : {}}
                  transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay - 0.08 }}
                  className="relative z-10 flex h-7 items-center justify-center text-brand"
                >
                  <motion.div
                    animate={played && !reducedMotion ? { y: [0, 4, 0] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                  >
                    <ArrowDown className="size-4" />
                  </motion.div>
                </motion.div>
              ) : null}

              <motion.button
                type="button"
                className="relative z-10 flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-left outline-none"
                initial={{ opacity: 0, y: 10 }}
                animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : index)}
                aria-pressed={isActive}
                aria-describedby="ladder-node-detail"
              >
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-12",
                    node.pruned
                      ? isActive
                        ? "border-muted-foreground/40 bg-muted text-muted-foreground shadow-md"
                        : "border-dashed border-muted-foreground/30 text-muted-foreground/50"
                      : isActive
                        ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                        : "border-brand/20 text-brand/80",
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <span
                  className={cn(
                    "font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors sm:text-sm",
                    node.pruned
                      ? "text-muted-foreground/50"
                      : isActive
                        ? "text-brand"
                        : "text-muted-foreground",
                  )}
                >
                  {node.label}
                </span>
              </motion.button>
            </React.Fragment>
          );
        })}
      </div>

      <div
        id="ladder-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a rung to see how it shaped his thinking."
          )}
        </p>
      </div>
    </div>
  );
}

export { SarabhaiLadderDiagram };

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, BookOpen, Filter, Search, Target, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Search,
  Filter,
  Target,
};

// Nodes are authored in a fixed order — Read, Isolate, Compress, Commit —
// and the diagram's flood-of-papers / handful-of-bets states are driven by
// that index, not by matching label text.
const READ = 0;
const COMMIT = 3;

// Button widths taper from the funnel's wide mouth to its narrow spout.
// Approximate, not a literal trace of the SVG diagonals below — the SVG
// outline carries the precise shape, this just needs to read as narrowing.
const NODE_WIDTHS = ["94%", "78%", "62%", "46%"];

const PAPER_DOTS = [
  { x: 14, y: 6, delay: 0 },
  { x: 28, y: 3, delay: 0.3 },
  { x: 42, y: 8, delay: 0.6 },
  { x: 58, y: 4, delay: 0.15 },
  { x: 72, y: 8, delay: 0.45 },
  { x: 86, y: 5, delay: 0.75 },
  { x: 50, y: 2, delay: 0.9 },
];

const BET_DOTS = [
  { x: 42, y: 96 },
  { x: 50, y: 100 },
  { x: 58, y: 96 },
];

function GatesFunnelDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const isReading = activeIndex === READ;
  const isCommitting = activeIndex === COMMIT;
  const stateTransition = { duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" as const };

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md">
        <svg viewBox="0 0 100 110" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {/* Funnel outline — wide mouth at top, narrow spout at bottom */}
          <motion.g
            className="text-brand"
            initial={false}
            animate={{ opacity: played ? 0.3 : 0 }}
            transition={stateTransition}
          >
            <line x1={8} y1={10} x2={92} y2={10} stroke="currentColor" strokeWidth={0.5} strokeDasharray="2 2" />
            <line x1={8} y1={10} x2={50} y2={92} stroke="currentColor" strokeWidth={0.5} />
            <line x1={92} y1={10} x2={50} y2={92} stroke="currentColor" strokeWidth={0.5} />
            <line x1={50} y1={92} x2={50} y2={100} stroke="currentColor" strokeWidth={0.5} />
          </motion.g>

          {/* Papers flooding in at the wide mouth — brighten while Read is active */}
          {PAPER_DOTS.map((dot, i) => (
            <motion.rect
              key={i}
              x={dot.x - 1.6}
              y={dot.y - 1.2}
              width={3.2}
              height={2.4}
              rx={0.4}
              className="fill-brand"
              initial={false}
              animate={
                played
                  ? {
                      opacity: isReading ? 0.85 : 0.3,
                      y: reducedMotion ? dot.y - 1.2 : [dot.y - 1.2, dot.y + 0.8, dot.y - 1.2],
                    }
                  : { opacity: 0 }
              }
              transition={{
                opacity: stateTransition,
                y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: dot.delay },
              }}
            />
          ))}

          {/* A handful of bets emerging from the spout — glow while Commit is active */}
          {BET_DOTS.map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={2}
              className="fill-brand"
              initial={false}
              animate={{
                opacity: played ? (isCommitting ? 1 : 0.35) : 0,
                scale: isCommitting && played ? 1.15 : 1,
              }}
              style={
                isCommitting && played && !reducedMotion
                  ? { animation: "hub-glow 2.2s ease-in-out infinite", transformOrigin: `${dot.x}px ${dot.y}px` }
                  : undefined
              }
              transition={stateTransition}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-between py-2">
          {nodes.map((node, index) => {
            const Icon = iconMap[node.icon] ?? BookOpen;
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
                    className="flex h-5 items-center justify-center text-brand"
                  >
                    <motion.div
                      animate={played && !reducedMotion ? { y: [0, 3, 0] } : {}}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                    >
                      <ArrowDown className="size-3.5" />
                    </motion.div>
                  </motion.div>
                ) : null}

                <motion.button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-full border border-transparent bg-background/70 px-3 py-1.5 outline-none backdrop-blur-sm"
                  style={{ width: NODE_WIDTHS[index] }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={played ? { opacity: isDimmed ? 0.45 : 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  aria-pressed={isActive}
                  aria-describedby="funnel-node-detail"
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-9",
                      isActive
                        ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                        : "border-brand/20 text-brand/80",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[10px] font-semibold tracking-[0.08em] uppercase transition-colors sm:text-xs",
                      isActive ? "text-brand" : "text-muted-foreground",
                    )}
                  >
                    {node.label}
                  </span>
                </motion.button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div
        id="funnel-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stage to watch the flood narrow to a bet."
          )}
        </p>
      </div>
    </div>
  );
}

export { GatesFunnelDiagram };

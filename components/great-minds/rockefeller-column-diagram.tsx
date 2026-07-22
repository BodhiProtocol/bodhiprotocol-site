"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Blend, Building2, Coins, Droplet, Unlink, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Droplet,
  Blend,
  Unlink,
  Building2,
  Coins,
};

// Vessel wall coordinates — wide/murky at the base (y=132), narrow/bright at
// the top (y=8), inside a 100x140 viewBox. The button stack below is
// positioned with the exact same percentages (not document flow), so the
// vessel walls and the buttons they're meant to contain can never drift
// apart at different container widths.
const TOP_Y = 8;
const BASE_Y = 132;
const HEIGHT = 140;
const BAND_COUNT = 5;
const BAND_HEIGHT = (BASE_Y - TOP_Y) / BAND_COUNT;

function wallX(y: number) {
  const t = (BASE_Y - y) / (BASE_Y - TOP_Y);
  return { left: 15 + 20 * t, right: 85 - 20 * t };
}

function toPercent(y: number) {
  return (y / HEIGHT) * 100;
}

// bandCenterY(0) is the Cost band (bottom-most, widest) through
// bandCenterY(4), the Capital band (top-most, narrowest).
function bandCenterY(index: number) {
  return BASE_Y - BAND_HEIGHT * index - BAND_HEIGHT / 2;
}

const dividerYs = Array.from({ length: BAND_COUNT - 1 }, (_, i) => BASE_Y - BAND_HEIGHT * (i + 1));

function RockefellerColumnDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const stateTransition = { duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" as const };

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-[100/140] w-full max-w-xs">
        <svg
          viewBox={`0 0 100 ${HEIGHT}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          {/* Vessel walls — the shape itself is the metaphor: wide, chaotic
              input narrowing to a single refined point. */}
          <motion.path
            d={`M15,${BASE_Y} L35,${TOP_Y} L65,${TOP_Y} L85,${BASE_Y} Z`}
            fill="none"
            strokeWidth={1}
            className="stroke-brand"
            initial={false}
            animate={{ opacity: played ? 0.2 : 0 }}
            transition={stateTransition}
          />
          {dividerYs.map((y, i) => {
            const { left, right } = wallX(y);
            return (
              <motion.line
                key={y}
                x1={left}
                y1={y}
                x2={right}
                y2={y}
                strokeWidth={0.6}
                strokeDasharray="1.5 1.5"
                className="stroke-brand"
                initial={false}
                animate={{ opacity: played ? 0.15 : 0 }}
                transition={{ ...stateTransition, delay: reducedMotion ? 0 : 0.1 + i * 0.05 }}
              />
            );
          })}

          {/* Reinvestment loop — capital drawn off the top curves back down
              to the base, the one line that makes "compound, don't spend"
              readable without a caption. */}
          <defs>
            <marker id="rockefeller-loop-arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-brand" />
            </marker>
          </defs>
          <motion.path
            d="M68,16 C 96,42 96,108 42,130"
            fill="none"
            strokeWidth={1.1}
            strokeDasharray="3 2.5"
            className="stroke-brand"
            markerEnd="url(#rockefeller-loop-arrowhead)"
            initial={false}
            animate={
              played
                ? reducedMotion
                  ? { opacity: 0.5, strokeDashoffset: 0 }
                  : { opacity: 0.5, strokeDashoffset: [0, -22] }
                : { opacity: 0 }
            }
            transition={
              played && !reducedMotion
                ? { opacity: { duration: 0.4, delay: 0.6 }, strokeDashoffset: { duration: 2.6, repeat: Infinity, ease: "linear" } }
                : { duration: 0.4, delay: 0.6 }
            }
          />
        </svg>

        {/* Arrow connectors sit at each divider's exact percentage, so they
            never drift from the vessel lines they're meant to mark. */}
        {dividerYs.map((y, i) => (
          <motion.div
            key={y}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand"
            style={{ top: `${toPercent(y)}%` }}
            initial={{ opacity: 0 }}
            animate={played ? { opacity: activeIndex !== null ? 0.25 : 0.6 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.15 + i * 0.16 }}
          >
            <motion.div
              animate={played && !reducedMotion ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            >
              <ArrowUp className="size-4" />
            </motion.div>
          </motion.div>
        ))}

        {/* Array order stays Cost → Capital for DOM/tab order (matches the
            reading order of the story, base to summit); visual position is
            set independently via the same band-center percentages the
            vessel walls use above. */}
        {nodes.map((node, index) => {
          const Icon = iconMap[node.icon] ?? Coins;
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;
          const delay = 0.15 + index * 0.16;

          return (
            <motion.button
              key={node.label}
              type="button"
              className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-xl border border-transparent px-3 py-1.5 text-center outline-none"
              style={{ top: `${toPercent(bandCenterY(index))}%` }}
              initial={{ opacity: 0 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(isActive ? null : index)}
              aria-pressed={isActive}
              aria-describedby="rockefeller-node-detail"
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[10px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors",
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
        id="rockefeller-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stage to watch the column refine."
          )}
        </p>
      </div>
    </div>
  );
}

export { RockefellerColumnDiagram };

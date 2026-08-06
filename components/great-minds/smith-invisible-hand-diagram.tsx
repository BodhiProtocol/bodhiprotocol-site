"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Coins, Globe, Hand, Layers, ShieldAlert, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Coins,
  Layers,
  Hand,
  Globe,
  ShieldAlert,
};

// A diamond, not a loop or line: two independent self-interested actors
// converge into one emergent idea, which then fans back out into two policy
// implications. Convergence-then-divergence is the metaphor, unlike every
// other Great Minds diagram, since the Invisible Hand is fundamentally about
// unplanned coordination, not a sequence or a cycle.
const LAYOUT = [
  { x: 25, y: 14 }, // Self-Interest
  { x: 75, y: 14 }, // Division of Labor
  { x: 50, y: 50 }, // The Invisible Hand (center)
  { x: 25, y: 86 }, // Free Trade
  { x: 75, y: 86 }, // Against Collusion
];

const CENTER = LAYOUT[2];

function SmithInvisibleHandDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, ...(LAYOUT[index] ?? CENTER) }));
  const converging = [points[0], points[1]].filter(Boolean);
  const diverging = [points[3], points[4]].filter(Boolean);

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/95] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 95" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="smith-hand-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
            <marker id="smith-hand-arrowhead" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" className="fill-brand/60" />
            </marker>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={16}
              fill="url(#smith-hand-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {/* Converging lines: two independent actors, flowing toward the
              emergent center, neither one aimed at the other. */}
          {converging.map((point, i) => (
            <motion.line
              key={`in-${point.label}`}
              x1={point.x}
              y1={point.y}
              x2={CENTER.x}
              y2={CENTER.y}
              strokeWidth={0.7}
              strokeDasharray="2 2"
              markerEnd="url(#smith-hand-arrowhead)"
              className="stroke-brand/40"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                played
                  ? reducedMotion
                    ? { pathLength: 1, opacity: 1, strokeDashoffset: 0 }
                    : { pathLength: 1, opacity: 1, strokeDashoffset: [0, -8] }
                  : {}
              }
              transition={
                played
                  ? reducedMotion
                    ? { duration: 0.6, delay: 0.2 }
                    : {
                        pathLength: { duration: 0.6, delay: 0.2 + i * 0.1 },
                        opacity: { duration: 0.4, delay: 0.2 + i * 0.1 },
                        strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "linear" },
                      }
                  : {}
              }
            />
          ))}

          {/* Diverging lines: the emergent center fanning back out into its
              two policy implications. */}
          {diverging.map((point, i) => (
            <motion.line
              key={`out-${point.label}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={point.x}
              y2={point.y}
              strokeWidth={0.7}
              strokeDasharray="2 2"
              markerEnd="url(#smith-hand-arrowhead)"
              className="stroke-brand/40"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                played
                  ? reducedMotion
                    ? { pathLength: 1, opacity: 1, strokeDashoffset: 0 }
                    : { pathLength: 1, opacity: 1, strokeDashoffset: [0, -8] }
                  : {}
              }
              transition={
                played
                  ? reducedMotion
                    ? { duration: 0.6, delay: 0.5 }
                    : {
                        pathLength: { duration: 0.6, delay: 0.5 + i * 0.1 },
                        opacity: { duration: 0.4, delay: 0.5 + i * 0.1 },
                        strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "linear" },
                      }
                  : {}
              }
            />
          ))}
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Hand;
          const isCenter = point.index === 2;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.2 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none"
              style={{ left: `${point.x}%`, top: `${(point.y / 95) * 100}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="smith-hand-detail"
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200",
                  isCenter ? "size-12 sm:size-14" : "size-9 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isVisited
                      ? "border-brand/40 text-brand"
                      : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className={isCenter ? "size-5 sm:size-6" : "size-4"} />
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
        id="smith-hand-detail"
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
              Nobody coordinated this. That was the entire point.
            </span>
          ) : (
            "Tap or hover a node to see how two self-interests converge into one unplanned outcome."
          )}
        </p>
      </div>
    </div>
  );
}

export { SmithInvisibleHandDiagram };

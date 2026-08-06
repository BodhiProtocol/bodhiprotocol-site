"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock, Feather, Orbit, Star, Zap, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Clock,
  Feather,
  Orbit,
  Star,
};

const NODE_Y = 16;
const MASS = { x: 50, y: 52 };
const NODE_XS = [8, 29, 50, 71, 92];

// A warped grid instead of a straight or circular one — the shape argues
// the point directly: mass bends the coordinate lines themselves, which is
// the actual content of general relativity, not just a metaphor for it.
function gridPath(baseY: number) {
  return `M 4,${baseY} Q ${MASS.x},${baseY + (MASS.y - baseY) * 0.85} 96,${baseY}`;
}

function EinsteinCurvedFrameDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;
  const points = nodes.map((node, index) => ({ ...node, index, x: NODE_XS[index] ?? NODE_XS[NODE_XS.length - 1] }));

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-[100/70] w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="einstein-mass-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
            <marker id="einstein-ray-arrowhead" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" className="fill-brand/70" />
            </marker>
          </defs>

          {/* Warped grid lines, dipping toward the central mass. */}
          {[36, 46, 56].map((baseY, i) => (
            <motion.path
              key={baseY}
              d={gridPath(baseY)}
              fill="none"
              strokeWidth={0.4}
              className="stroke-brand/20"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : i * 0.1, ease: "easeInOut" }}
            />
          ))}

          {cycleComplete ? (
            <motion.circle
              cx={MASS.x}
              cy={MASS.y}
              r={16}
              fill="url(#einstein-mass-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}
          <circle cx={MASS.x} cy={MASS.y} r={3.2} className="fill-brand" />

          {/* Starlight bending around the mass — ambient, always flowing,
              the diagram's one direct nod to the 1919 observation. */}
          <motion.path
            d={`M 3,${MASS.y - 2} Q ${MASS.x},${MASS.y - 14} 97,${MASS.y - 2}`}
            fill="none"
            strokeWidth={0.6}
            strokeDasharray="2 2.5"
            markerEnd="url(#einstein-ray-arrowhead)"
            className="stroke-brand/50"
            initial={{ opacity: 0 }}
            animate={
              played
                ? reducedMotion
                  ? { opacity: 0.6, strokeDashoffset: 0 }
                  : { opacity: 0.6, strokeDashoffset: [0, -18] }
                : {}
            }
            transition={
              played && !reducedMotion
                ? { opacity: { duration: 0.5, delay: 0.6 }, strokeDashoffset: { duration: 2.2, repeat: Infinity, ease: "linear" } }
                : { duration: 0.5, delay: 0.6 }
            }
          />
        </svg>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Orbit;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.3 + point.index * 0.12;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none"
              style={{ left: `${point.x}%`, top: `${(NODE_Y / 70) * 100}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : entranceDelay }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-describedby="einstein-frame-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-10",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : isVisited
                      ? "border-brand/40 text-brand"
                      : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4" />
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
        id="einstein-frame-detail"
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
              Five thought experiments, one curved universe.
            </span>
          ) : (
            "Tap or hover a node to trace the reasoning — the grid beneath it bends the way spacetime actually does."
          )}
        </p>
      </div>
    </div>
  );
}

export { EinsteinCurvedFrameDiagram };

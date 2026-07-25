"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Car, Cpu, Factory, FlaskConical, Plane, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Factory,
  Cpu,
  Car,
  FlaskConical,
};

const CENTER = 50;
// Three concentric elliptical orbit paths — radius (and therefore visual
// distance from JRD) stands in for how much autonomy/scale that business
// had, not literal reporting distance. Squashed on the y-axis (0.6) so the
// paths read as orbits rather than plain circles.
const ORBIT_RX: Record<"inner" | "mid" | "outer", number> = { inner: 26, mid: 34, outer: 42 };
const RY_RATIO = 0.6;
const ANGLE_STEP = 360 / 5;
const START_ANGLE = -90;

function JrdOrbitDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [visited, setVisited] = React.useState<Set<number>>(new Set());

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const cycleComplete = visited.size >= nodes.length;

  const points = nodes.map((node, index) => {
    const angle = (START_ANGLE + index * ANGLE_STEP) * (Math.PI / 180);
    const rx = ORBIT_RX[node.orbitRadius ?? "mid"];
    const ry = rx * RY_RATIO;
    return {
      ...node,
      index,
      x: CENTER + rx * Math.cos(angle),
      y: CENTER + ry * Math.sin(angle),
    };
  });

  function markVisited(index: number) {
    setActiveIndex(index);
    setVisited((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="jrd-orbit-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {cycleComplete ? (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={ORBIT_RX.inner - 4}
              fill="url(#jrd-orbit-glow)"
              className="text-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: reducedMotion ? 0.5 : [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {/* Static orbit-path guides — deliberately not rotating, unlike Ratan
              Tata's flywheel ring, since JRD's diagram is about fixed structural
              distance (autonomy/scale) rather than a cycle in motion. */}
          {(["inner", "mid", "outer"] as const).map((tier, tierIndex) => (
            <motion.ellipse
              key={tier}
              cx={CENTER}
              cy={CENTER}
              rx={ORBIT_RX[tier]}
              ry={ORBIT_RX[tier] * RY_RATIO}
              fill="none"
              strokeWidth="0.5"
              strokeDasharray="1.5 3"
              className="stroke-brand/25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: reducedMotion ? 0 : 1.2, delay: reducedMotion ? 0 : tierIndex * 0.15, ease: "easeInOut" }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
          className={cn(
            "absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg transition-shadow duration-500 sm:size-20",
            cycleComplete ? "border-brand shadow-brand/25" : "border-brand/25 shadow-brand/10",
          )}
        >
          <span className="font-serif text-base font-medium tracking-tight text-brand sm:text-xl">JRD</span>
          <span className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[8px]">
            {cycleComplete ? "The Federation" : "Chairman"}
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Factory;
          const isActive = activeIndex === point.index;
          const isDimmed = activeIndex !== null && !isActive;
          const isVisited = visited.has(point.index);
          const entranceDelay = 0.35 + point.index * 0.12;
          const ariaLabel = point.highlight
            ? `${point.label} — nationalized 1953, chairmanship ended 1978`
            : point.label;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.12 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => markVisited(point.index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => markVisited(point.index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => markVisited(point.index)}
              aria-pressed={isActive}
              aria-label={ariaLabel}
              aria-describedby="jrd-orbit-detail"
            >
              <motion.span
                animate={
                  point.highlight && played && !reducedMotion
                    ? { scale: [1, 1.08, 1] }
                    : played && !reducedMotion
                      ? { scale: [1, 1.03, 1] }
                      : {}
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: point.index * 0.3 }}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : point.highlight
                      ? "border-brand text-brand shadow-sm shadow-brand/20 ring-2 ring-brand/30"
                      : isVisited
                        ? "border-brand/40 text-brand"
                        : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </motion.span>
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors sm:text-[10px]",
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
        id="jrd-orbit-detail"
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
              Five orbits, one center — held together by trust, not equity.
            </span>
          ) : (
            "Tap or hover a node to see how far JRD let each business orbit on its own."
          )}
        </p>
      </div>
    </div>
  );
}

export { JrdOrbitDiagram };

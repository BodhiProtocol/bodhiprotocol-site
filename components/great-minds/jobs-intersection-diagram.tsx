"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Cpu, Layers, Palette, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Layers,
  Palette,
  BookOpen,
};

// Two paths (technology, humanities) converging on a center hub. Reuses
// Leonardo's radial-spoke math with just 4 nodes placed on the diagonals
// (-135/-45/45/135) instead of evenly around a full circle, which reads as
// two lines converging into one point rather than a compass/plus-axis.
function JobsIntersectionDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const center = 50;
  const radius = 38;
  const angles = [-135, -45, 135, 45];

  const points = nodes.map((node, index) => {
    const angle = angles[index] * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    const dotX = center + radius * 0.55 * Math.cos(angle);
    const dotY = center + radius * 0.55 * Math.sin(angle);
    return { ...node, index, x, y, dotX, dotY };
  });

  const active = activeIndex !== null ? points[activeIndex] : null;
  const idle = activeIndex === null;

  function handleEnter(index: number) {
    setActiveIndex(index);
  }
  function handleLeave() {
    setActiveIndex(null);
  }
  function handleClick(index: number) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {points.map((point) => {
            const isActive = activeIndex === point.index;
            const isDimmed = !idle && !isActive;

            return (
              <g key={point.label}>
                <motion.line
                  x1={center}
                  y1={center}
                  x2={point.x}
                  y2={point.y}
                  strokeLinecap="round"
                  strokeDasharray="1.5 1.8"
                  className="stroke-brand"
                  initial={false}
                  animate={{
                    strokeWidth: isActive ? 0.7 : 0.3,
                    opacity: !played ? 0 : isActive ? 0.8 : isDimmed ? 0.15 : 0.35,
                  }}
                  transition={{
                    opacity: { duration: reducedMotion ? 0.2 : 0.4, delay: reducedMotion ? 0 : 0.5 + point.index * 0.15 },
                    strokeWidth: { duration: 0.2, ease: "easeOut" },
                  }}
                />
                <circle
                  cx={point.dotX}
                  cy={point.dotY}
                  r={0.6}
                  className="fill-brand"
                  style={{
                    opacity: !played ? 0 : isDimmed ? 0.2 : 0.6,
                    transition: `opacity 400ms ease ${0.5 + point.index * 0.15}s`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            played ? { opacity: 1, scale: idle && !reducedMotion ? [1, 1.015, 1] : 1 } : {}
          }
          transition={
            idle && !reducedMotion
              ? { scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5, ease: "easeOut" } }
              : { duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }
          }
          className="absolute top-1/2 left-1/2 z-10 flex size-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg shadow-brand/10 sm:size-28"
        >
          <span className="font-serif text-lg font-medium tracking-tight text-brand sm:text-2xl">SJ</span>
          <span className="font-mono text-[8px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[9px]">
            1955–2011
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Cpu;
          const isActive = activeIndex === point.index;
          const isDimmed = !idle && !isActive;
          const entranceDelay = 0.2 + point.index * 0.12;
          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.45, ease: "easeInOut" },
              }}
              onMouseEnter={() => handleEnter(point.index)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(point.index)}
              onBlur={handleLeave}
              onClick={() => handleClick(point.index)}
              aria-pressed={isActive}
              aria-describedby="intersection-node-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-[color,background-color,border-color,box-shadow] duration-[450ms] ease-in-out sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/30"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-[450ms] ease-in-out sm:text-[10px]",
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
        id="intersection-node-detail"
        className="relative flex w-full min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <AnimatePresence>
          <motion.p
            key={active?.label ?? "default"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center px-5 py-3 text-sm leading-relaxed text-muted-foreground"
          >
            {active ? (
              <>
                <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
              </>
            ) : (
              "Tap or hover a node to see how it shaped his thinking."
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { JobsIntersectionDiagram };

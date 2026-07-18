"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cog, Eye, Feather, Leaf, Lightbulb, Microscope, Palette, PersonStanding, type LucideIcon } from "lucide-react";

import { useMindGraph } from "@/components/great-minds/mind-graph-context";
import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Microscope,
  PersonStanding,
  Feather,
  Eye,
  Leaf,
  Cog,
  Palette,
};

function LeonardoWheelDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const { active, setActive } = useMindGraph();

  // The per-node stagger delay below exists only for the one-time entrance
  // reveal. Once that's had time to finish, hover-driven dim/undim should
  // resolve in the spec's 400-500ms, not re-inherit an entrance delay of up
  // to ~1.2s for the last node in the ring.
  const hasEnteredRef = React.useRef(false);
  React.useEffect(() => {
    if (!played) return;
    const timeout = setTimeout(
      () => {
        hasEnteredRef.current = true;
      },
      reducedMotion ? 0 : 900,
    );
    return () => clearTimeout(timeout);
  }, [played, reducedMotion]);

  const center = 50;
  const radius = 38;

  const points = nodes.map((node, index) => {
    const angle = (-90 + (360 / nodes.length) * index) * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    const dotX = center + radius * 0.55 * Math.cos(angle);
    const dotY = center + radius * 0.55 * Math.sin(angle);
    return { ...node, index, x, y, dotX, dotY };
  });

  const activeIndex = active ? points.findIndex((p) => p.label === active.label) : -1;
  const activePoint = activeIndex >= 0 ? points[activeIndex] : null;

  // Related nodes light up in sequence to show an idea propagating through
  // the graph, reusing the existing spoke-to-center lines rather than
  // drawing new crossing chords between outer nodes — stays legible and
  // calm on an 8-node wheel instead of adding visual clutter.
  const relatedIndices = activePoint?.relatedNodes
    ? activePoint.relatedNodes.map((label) => points.findIndex((p) => p.label === label)).filter((i) => i >= 0)
    : [];

  function handleEnter(node: GreatMindWheelNode) {
    setActive(node);
  }
  function handleLeave() {
    setActive(null);
  }
  function handleClick(node: GreatMindWheelNode) {
    setActive(active?.label === node.label ? null : node);
  }

  const idle = activeIndex < 0;

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {points.map((point) => {
            const isActive = activeIndex === point.index;
            const relatedOrder = relatedIndices.indexOf(point.index);
            const isRelated = relatedOrder >= 0;
            const isDimmed = !idle && !isActive && !isRelated;

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
                    strokeWidth: isActive ? 0.7 : isRelated ? 0.5 : 0.3,
                    opacity: !played
                      ? 0
                      : isActive
                        ? 0.8
                        : isRelated
                          ? [0.35, 0.65, 0.35]
                          : isDimmed
                            ? 0.12
                            : 0.35,
                  }}
                  transition={{
                    opacity: isRelated
                      ? { duration: 0.9, delay: reducedMotion ? 0 : relatedOrder * 0.18, ease: "easeInOut" }
                      : {
                          duration: reducedMotion ? 0.2 : 0.4,
                          delay: reducedMotion || hasEnteredRef.current ? 0 : 0.5 + point.index * 0.06,
                        },
                    strokeWidth: { duration: 0.2, ease: "easeOut" },
                  }}
                />
                <circle
                  cx={point.dotX}
                  cy={point.dotY}
                  r={0.6}
                  className="fill-brand"
                  style={{
                    opacity: !played ? 0 : isDimmed ? 0.2 : isRelated ? 0.5 : 0.6,
                    transition: `opacity 400ms ease ${hasEnteredRef.current ? 0 : 0.5 + point.index * 0.06}s`,
                  }}
                />
                {isActive && !reducedMotion ? (
                  <motion.circle
                    r={0.9}
                    className="fill-brand"
                    initial={{ opacity: 0 }}
                    animate={{ cx: [point.x, center], cy: [point.y, center], opacity: [0, 0.9, 0] }}
                    transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            played
              ? { opacity: 1, scale: idle && !reducedMotion ? [1, 1.015, 1] : 1 }
              : {}
          }
          transition={
            idle && !reducedMotion
              ? { scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5, ease: "easeOut" } }
              : { duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }
          }
          className="absolute top-1/2 left-1/2 z-10 flex size-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg shadow-brand/10 sm:size-28"
        >
          <span className="font-serif text-lg font-medium tracking-tight text-brand sm:text-2xl">LDV</span>
          <span className="font-mono text-[8px] tracking-[0.15em] text-muted-foreground uppercase sm:text-[9px]">
            1452–1519
          </span>
        </motion.div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Lightbulb;
          const isActive = activeIndex === point.index;
          const isRelated = relatedIndices.includes(point.index);
          const isDimmed = !idle && !isActive && !isRelated;
          const entranceDelay = 0.2 + point.index * 0.08;
          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.1 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion || hasEnteredRef.current ? 0 : entranceDelay },
                scale: { duration: reducedMotion ? 0 : 0.45, ease: "easeInOut" },
              }}
              onMouseEnter={() => handleEnter(point)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(point)}
              onBlur={handleLeave}
              onClick={() => handleClick(point)}
              aria-pressed={isActive}
              aria-describedby="wheel-node-detail"
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
        id="wheel-node-detail"
        className="relative flex w-full min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <AnimatePresence>
          <motion.p
            key={activePoint?.label ?? "default"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center px-5 py-3 text-sm leading-relaxed text-muted-foreground"
          >
            {activePoint ? (
              <>
                <span className="font-semibold text-foreground">{activePoint.label}.</span> {activePoint.description}
              </>
            ) : (
              "Tap or hover a discipline to see how it shaped his thinking."
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { LeonardoWheelDiagram };

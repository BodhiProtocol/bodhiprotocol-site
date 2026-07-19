"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cog, Eye, Play, ScanSearch, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Cog,
  Play,
  ScanSearch,
};

// Nodes are authored in a fixed order — Visualize, Assemble, Run, Inspect —
// and the diagram's own rendering state (sketch vs. solid, spinning rotor,
// worn segments) is driven by that index, not by matching label text.
const VISUALIZE = 0;
const ASSEMBLE = 1;
const RUN = 2;
const INSPECT = 3;

const CENTER = 50;
const CALLOUT_RADIUS = 38;
const ROTOR_RADIUS = 18;
const ROTOR_COUNT = 6;
const WORN_ROTOR_INDICES = [1, 4];

function pointOnCircle(angleDeg: number, radius: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
}

const rotorDots = Array.from({ length: ROTOR_COUNT }, (_, i) => pointOnCircle(-90 + (360 / ROTOR_COUNT) * i, ROTOR_RADIUS));
const spokeTicks = Array.from({ length: 8 }, (_, i) => {
  const angle = (360 / 8) * i;
  return { inner: pointOnCircle(angle, 34), outer: pointOnCircle(angle, 40) };
});

function TeslaMotorDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const active = activeIndex !== null ? nodes[activeIndex] : null;
  const points = nodes.map((node, index) => ({ ...node, ...pointOnCircle(-90 + 90 * index, CALLOUT_RADIUS) }));

  // Sketch (dashed/hollow) vs. solid (filled) opacity per stage — the
  // schematic reads as a rough idea while Visualizing, then solidifies
  // through Assemble, and stays fully solid for Run and Inspect.
  const sketchOpacity = activeIndex === VISUALIZE ? 1 : activeIndex === ASSEMBLE ? 0.4 : 0;
  const solidOpacity = activeIndex === VISUALIZE ? 0.15 : activeIndex === ASSEMBLE ? 0.75 : 1;
  const dimensionOpacity = activeIndex === VISUALIZE ? 0.1 : 0.3;
  const isRunning = activeIndex === RUN && !reducedMotion;
  const isInspecting = activeIndex === INSPECT;
  const stateTransition = { duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" as const };

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {/* Static engineering-drawing flourishes — fade in with the rest of
              the reveal so the schematic reads as a technical drawing without
              popping in ahead of everything else. */}
          <motion.g
            className="text-brand"
            initial={false}
            animate={{ opacity: played ? 0.25 : 0 }}
            transition={stateTransition}
          >
            {spokeTicks.map((tick, i) => (
              <line
                key={i}
                x1={tick.inner.x}
                y1={tick.inner.y}
                x2={tick.outer.x}
                y2={tick.outer.y}
                stroke="currentColor"
                strokeWidth={0.4}
              />
            ))}
          </motion.g>
          <motion.g
            className="text-brand"
            initial={false}
            animate={{ opacity: played ? dimensionOpacity : 0 }}
            transition={stateTransition}
          >
            <line x1={30} y1={90} x2={70} y2={90} stroke="currentColor" strokeWidth={0.4} />
            <line x1={30} y1={88} x2={30} y2={92} stroke="currentColor" strokeWidth={0.4} />
            <line x1={70} y1={88} x2={70} y2={92} stroke="currentColor" strokeWidth={0.4} />
          </motion.g>

          {/* Stator ring — dashed "sketch" and solid "assembled" variants
              cross-fade rather than animating strokeDasharray directly. */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={32}
            fill="none"
            strokeWidth={1}
            strokeDasharray="2 1.6"
            className="stroke-brand"
            initial={false}
            animate={{ opacity: played ? sketchOpacity : 0 }}
            transition={stateTransition}
          />
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={32}
            fill="none"
            strokeWidth={1}
            className="stroke-brand"
            initial={false}
            animate={{ opacity: played ? solidOpacity : 0 }}
            transition={stateTransition}
          />

          {/* Rotor — six poles orbiting the shaft, spun during "Run" and
              highlighted for wear during "Inspect". */}
          <motion.g
            style={{ originX: "50%", originY: "50%" }}
            animate={{ rotate: isRunning ? 360 : 0 }}
            transition={
              isRunning
                ? { duration: 6, repeat: Infinity, ease: "linear" }
                : { duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }
            }
          >
            {rotorDots.map((dot, i) => {
              const isWorn = isInspecting && WORN_ROTOR_INDICES.includes(i);
              const isMutedByInspection = isInspecting && !isWorn;
              return (
                <React.Fragment key={i}>
                  <motion.circle
                    cx={dot.x}
                    cy={dot.y}
                    r={2.6}
                    fill="none"
                    strokeWidth={0.5}
                    strokeDasharray="1 0.8"
                    className="stroke-brand"
                    initial={false}
                    animate={{ opacity: played ? sketchOpacity : 0 }}
                    transition={stateTransition}
                  />
                  <motion.circle
                    cx={dot.x}
                    cy={dot.y}
                    r={2.2}
                    className="fill-brand"
                    initial={false}
                    animate={{
                      opacity: played ? (isMutedByInspection ? 0.3 : solidOpacity) : 0,
                    }}
                    style={
                      isWorn && played && !reducedMotion
                        ? { animation: "hub-glow 2.2s ease-in-out infinite" }
                        : undefined
                    }
                    transition={stateTransition}
                  />
                </React.Fragment>
              );
            })}
          </motion.g>

          {/* Hub — the idea itself, always present at full strength. */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={5}
            className="fill-brand"
            initial={false}
            animate={{ opacity: played ? 1 : 0 }}
            transition={stateTransition}
          />
        </svg>

        {points.map((point, index) => {
          const Icon = iconMap[point.icon] ?? Cog;
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;
          const delay = 0.15 + index * 0.16;

          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: isDimmed ? 0.45 : 1, scale: isActive ? 1.08 : 1 } : {}}
              transition={{
                opacity: { duration: 0.4, delay: reducedMotion ? 0 : delay },
                scale: { duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" },
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(isActive ? null : index)}
              aria-pressed={isActive}
              aria-describedby="tesla-node-detail"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-200 sm:size-11",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/30"
                    : "border-brand/20 text-brand/80",
                )}
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <span
                className={cn(
                  "max-w-16 text-center font-mono text-[9px] font-semibold tracking-[0.06em] uppercase transition-colors sm:max-w-20 sm:text-[10px]",
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
        id="tesla-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Tap or hover a stage to watch the machine change."
          )}
        </p>
      </div>
    </div>
  );
}

export { TeslaMotorDiagram };

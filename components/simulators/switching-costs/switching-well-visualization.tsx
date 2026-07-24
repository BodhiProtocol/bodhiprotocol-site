"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { COST_KEYS } from "@/components/simulators/switching-costs/use-switching-costs-simulator";
import type { SimulatorState } from "@/components/simulators/switching-costs/use-switching-costs-simulator";
import { cn } from "@/lib/utils";

interface SwitchingWellVisualizationProps {
  state: SimulatorState;
  switchingCost: number;
  escaped: boolean;
  strainRatio: number;
  highlightedKey?: keyof SimulatorState | null;
  className?: string;
}

const FLOOR_Y = 78;
const MAX_WALL_HEIGHT = 46;
const SEGMENT_WIDTH = 8;
const ORB_X = 36;
const ORB_Y = 75;
const MARKER_X = 86;
const PARTICLE_COUNT = 8;
const SPRING = { type: "spring" as const, stiffness: 170, damping: 24 };

const SEGMENTS = COST_KEYS.map((key, index) => ({ key, x: 12 + index * 10 }));

function heightToY(value: number) {
  return FLOOR_Y - (Math.max(0, Math.min(100, value)) / 100) * MAX_WALL_HEIGHT;
}

function SwitchingWellVisualization({
  state,
  switchingCost,
  escaped,
  strainRatio,
  highlightedKey = null,
  className,
}: SwitchingWellVisualizationProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [burstKey, setBurstKey] = React.useState(0);
  const [showBurst, setShowBurst] = React.useState(false);
  const prevEscapedRef = React.useRef(escaped);
  const hasRevealedRef = React.useRef(false);

  React.useEffect(() => {
    if (played) hasRevealedRef.current = true;
  }, [played]);

  React.useEffect(() => {
    if (escaped && !prevEscapedRef.current) {
      setBurstKey((n) => n + 1);
      setShowBurst(true);
      const timeout = setTimeout(() => setShowBurst(false), 700);
      prevEscapedRef.current = escaped;
      return () => clearTimeout(timeout);
    }
    prevEscapedRef.current = escaped;
  }, [escaped]);

  const markerY = heightToY(state.alternativeQuality);
  const costLineY = heightToY(switchingCost);
  const strain = !escaped && strainRatio >= 0.85 && strainRatio < 1;
  // Apex always sits above whichever of the orb's start or the marker's height is
  // higher, so the escape arc reads as a clean arc no matter how high Alternative
  // Quality is set — a fixed offset would flatten or invert at the extremes.
  const escapeApexY = Math.max(18, Math.min(ORB_Y, markerY) - 10);

  const particles = React.useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        return {
          id: i,
          dx: Math.round(Math.cos(angle) * 14 * 1000) / 1000,
          dy: Math.round(Math.sin(angle) * 14 * 1000) / 1000,
        };
      }),
    [],
  );

  return (
    <div ref={ref} className={cn("relative aspect-square w-full", className)}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-brand/15 blur-2xl"
        animate={played ? { opacity: 0.5, scale: reducedMotion ? 1 : [1, 1.05, 1] } : { opacity: 0 }}
        transition={{
          opacity: { duration: 0.6 },
          scale: reducedMotion ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="switching-wall-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <line
          x1={8}
          y1={heightToY(100)}
          x2={62}
          y2={heightToY(100)}
          stroke="var(--color-border)"
          strokeWidth={0.4}
          strokeDasharray="1.5 2"
        />

        {SEGMENTS.map((segment, index) => {
          const value = state[segment.key] as number;
          const topY = heightToY(value);
          const isHighlighted = highlightedKey === segment.key;
          return (
            <motion.rect
              key={segment.key}
              x={segment.x}
              width={SEGMENT_WIDTH}
              rx={1.6}
              fill="url(#switching-wall-gradient)"
              stroke="var(--color-foreground)"
              initial={{ y: FLOOR_Y, height: 0, opacity: 0 }}
              animate={{
                y: topY,
                height: FLOOR_Y + 12 - topY,
                opacity: played ? 1 : 0,
                strokeWidth: isHighlighted ? 0.8 : 0,
                strokeOpacity: isHighlighted ? 0.5 : 0,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      ...SPRING,
                      opacity: { duration: 0.5 },
                      strokeWidth: { duration: 0.2 },
                      strokeOpacity: { duration: 0.2 },
                      delay: played && !hasRevealedRef.current ? index * 0.06 : 0,
                    }
              }
            />
          );
        })}

        <motion.line
          x1={8}
          x2={62}
          stroke="var(--color-brand)"
          strokeWidth={0.5}
          strokeDasharray="2 2"
          initial={false}
          animate={{ y1: costLineY, y2: costLineY, opacity: played ? 0.7 : 0 }}
          transition={reducedMotion ? { duration: 0 } : SPRING}
        />

        <rect x={0} y={FLOOR_Y} width={100} height={22} className="fill-muted" opacity={0.5} />
        <line x1={0} y1={FLOOR_Y} x2={100} y2={FLOOR_Y} stroke="var(--color-border)" strokeWidth={0.4} />

        <motion.line
          x1={ORB_X + 4}
          y1={ORB_Y}
          stroke="var(--color-brand)"
          strokeLinecap="round"
          initial={false}
          animate={{
            x2: MARKER_X - 3,
            y2: markerY,
            opacity: played
              ? (0.25 + (state.alternativeQuality / 100) * 0.55) * (highlightedKey === "alternativeQuality" ? 1 : 0.85)
              : 0,
            strokeWidth: highlightedKey === "alternativeQuality" ? 0.95 : 0.6,
          }}
          transition={reducedMotion ? { duration: 0 } : { ...SPRING, strokeWidth: { duration: 0.2 } }}
        />

        <motion.circle
          fill="var(--color-background)"
          stroke="var(--color-brand)"
          initial={false}
          animate={{
            cx: MARKER_X,
            cy: markerY,
            opacity: played ? 1 : 0,
            r: highlightedKey === "alternativeQuality" ? 3.1 : 2.4,
            strokeWidth: highlightedKey === "alternativeQuality" ? 1.1 : 0.8,
          }}
          transition={reducedMotion ? { duration: 0 } : { ...SPRING, r: { duration: 0.2 }, strokeWidth: { duration: 0.2 } }}
        />

        <AnimatePresence>
          {!escaped ? (
            <motion.circle
              key="resting-orb"
              r={4}
              className="fill-brand"
              style={{ filter: "drop-shadow(0 0 4px var(--color-brand))" }}
              initial={{ cx: ORB_X, cy: ORB_Y, opacity: 0, scale: 0.6 }}
              animate={{
                cx: strain && !reducedMotion ? [ORB_X - 1, ORB_X + 1, ORB_X - 1] : ORB_X,
                cy: ORB_Y,
                opacity: played ? 1 : 0,
                scale: !reducedMotion ? [1, 1.03, 1] : 1,
              }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      cx: [ORB_X, ORB_X + 24, MARKER_X - 2],
                      cy: [ORB_Y, escapeApexY, markerY],
                      opacity: [1, 1, 0],
                      transition: { duration: 0.9, ease: "easeInOut" },
                    }
              }
              transition={{
                cx: strain ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" } : SPRING,
                cy: SPRING,
                opacity: { duration: 0.4 },
                scale: !reducedMotion ? { duration: 3.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 },
              }}
            />
          ) : (
            <motion.circle
              key="escaped-orb"
              r={3.2}
              className="fill-brand"
              style={{ filter: "drop-shadow(0 0 4px var(--color-brand))" }}
              initial={{ cx: MARKER_X - 2, cy: markerY, opacity: 0, scale: 0.5 }}
              animate={{ cx: MARKER_X - 2, cy: markerY, opacity: 0.95, scale: 1 }}
              transition={reducedMotion ? { duration: 0 } : SPRING}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBurst
            ? particles.map((particle) => (
                <motion.circle
                  key={`${burstKey}-${particle.id}`}
                  r={0.7}
                  className="fill-brand"
                  initial={{ cx: ORB_X, cy: ORB_Y, opacity: 0.9 }}
                  animate={{ cx: ORB_X + particle.dx, cy: ORB_Y + particle.dy, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              ))
            : null}
        </AnimatePresence>
      </svg>
    </div>
  );
}

export { SwitchingWellVisualization };

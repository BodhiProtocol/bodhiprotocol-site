"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Recycle, RotateCw, Rocket, TrendingUp } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import type { SimulatorState } from "@/components/simulators/flywheel/use-flywheel-simulator";
import { cn } from "@/lib/utils";

interface FlywheelDiagramProps {
  state: SimulatorState;
  momentum: number;
  spinning: boolean;
  selfSustaining: boolean;
  highlightedKey?: keyof SimulatorState | null;
  className?: string;
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const COMET_ARC = CIRCUMFERENCE * 0.28;
const PARTICLE_COUNT = 10;

const NODES = [
  { key: "investmentStrength", label: "Investment", icon: Rocket, angle: -90 },
  { key: "customerValueStrength", label: "Customer Value", icon: Heart, angle: 0 },
  { key: "growthStrength", label: "Growth", icon: TrendingUp, angle: 90 },
  { key: "reinvestmentStrength", label: "Reinvestment", icon: Recycle, angle: 180 },
] as const;

function nodePosition(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) };
}

function FlywheelDiagram({ state, momentum, spinning, selfSustaining, highlightedKey = null, className }: FlywheelDiagramProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [burstKey, setBurstKey] = React.useState(0);
  const [showBurst, setShowBurst] = React.useState(false);
  const prevSelfSustainingRef = React.useRef(selfSustaining);

  React.useEffect(() => {
    if (selfSustaining && !prevSelfSustainingRef.current) {
      setBurstKey((n) => n + 1);
      setShowBurst(true);
      const timeout = setTimeout(() => setShowBurst(false), 900);
      prevSelfSustainingRef.current = selfSustaining;
      return () => clearTimeout(timeout);
    }
    prevSelfSustainingRef.current = selfSustaining;
  }, [selfSustaining]);

  const rotationDuration = spinning ? Math.max(2.5, 16 - (momentum - 50) * 0.28) : 0;
  const glowStrength = spinning ? 0.35 + ((momentum - 50) / 50) * 0.65 : 0.12;
  const cometOpacity = spinning ? 0.45 + ((momentum - 50) / 50) * 0.55 : 0;
  const stalled = momentum <= 19;
  const struggling = !spinning && !stalled;
  const brakeHeight = (state.friction / 100) * 9;

  const particles = React.useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        return { id: i, dx: Math.round(Math.cos(angle) * 55 * 1000) / 1000, dy: Math.round(Math.sin(angle) * 55 * 1000) / 1000 };
      }),
    [],
  );

  const ringRotate = reducedMotion
    ? undefined
    : spinning
      ? { rotate: 360 }
      : struggling
        ? { rotate: [-3, 3, -3] }
        : { rotate: 0 };

  const ringTransition = spinning
    ? { duration: rotationDuration, repeat: Infinity, ease: "linear" as const }
    : struggling
      ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const }
      : { duration: 0.6 };

  return (
    <div ref={ref} className={cn("relative aspect-square w-full", className)}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[6%] rounded-full bg-brand/20 blur-2xl"
        animate={
          played
            ? { opacity: reducedMotion ? glowStrength : [glowStrength * 0.75, glowStrength, glowStrength * 0.75], scale: reducedMotion ? 1 : [1, 1.05, 1] }
            : { opacity: 0 }
        }
        transition={{
          opacity: reducedMotion ? { duration: 0.6 } : { duration: 5, repeat: Infinity, ease: "easeInOut" },
          scale: reducedMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="flywheel-comet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="1" />
          </linearGradient>
        </defs>

        <circle cx={50} cy={50} r={RADIUS} fill="none" className="stroke-border" strokeWidth="0.6" />

        <motion.rect
          x={44}
          width={12}
          rx={2}
          className="fill-destructive"
          initial={false}
          animate={{ y: 91 - brakeHeight, height: brakeHeight, opacity: played ? 0.15 + (state.friction / 100) * 0.45 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 24 }}
        />

        <motion.circle
          cx={50}
          cy={50}
          r={RADIUS}
          fill="none"
          stroke={stalled ? "var(--color-muted-foreground)" : "url(#flywheel-comet)"}
          strokeWidth={selfSustaining ? 3.4 : 2.6}
          strokeLinecap="round"
          strokeDasharray={`${COMET_ARC} ${CIRCUMFERENCE - COMET_ARC}`}
          style={{ filter: selfSustaining ? "drop-shadow(0 0 3px var(--color-brand))" : undefined }}
          initial={false}
          animate={{ ...ringRotate, opacity: played ? (stalled ? 0.35 : cometOpacity) : 0 }}
          transition={reducedMotion ? { duration: 0 } : { ...ringTransition, opacity: { duration: 0.6 } }}
        />

        <AnimatePresence>
          {showBurst
            ? particles.map((particle) => (
                <motion.circle
                  key={`${burstKey}-${particle.id}`}
                  cx={50}
                  cy={50}
                  r={0.9}
                  className="fill-brand"
                  initial={{ opacity: 1, x: 0, y: 0 }}
                  animate={{ opacity: 0, x: particle.dx, y: particle.dy }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              ))
            : null}
        </AnimatePresence>
      </svg>

      <motion.div
        className={cn(
          "absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-brand-foreground shadow-lg transition-colors duration-500",
          selfSustaining ? "bg-brand shadow-brand/40" : stalled ? "bg-muted-foreground/60 shadow-none" : "bg-brand/80 shadow-brand/20",
        )}
        animate={played && spinning && !reducedMotion ? { rotate: 360 } : { rotate: 0 }}
        transition={spinning ? { duration: rotationDuration, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
      >
        <RotateCw className="size-6" />
      </motion.div>

      {NODES.map((node, index) => {
        const { x, y } = nodePosition(node.angle, 46);
        const Icon = node.icon;
        const value = state[node.key];
        const isHighlighted = highlightedKey === node.key;
        return (
          <div
            key={node.key}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: 1, scale: isHighlighted ? 1.08 : 1 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.15 + index * 0.1 }}
              className={cn(
                "flex w-28 flex-col items-center gap-1 rounded-2xl border bg-card px-2.5 py-2.5 text-center shadow-sm transition-colors duration-200",
                isHighlighted ? "border-brand/50 bg-brand/5" : "border-brand/20",
              )}
            >
              <Icon className={cn("size-4", isHighlighted ? "text-brand" : "text-muted-foreground")} aria-hidden="true" />
              <span className="text-[11px] leading-tight font-medium sm:text-xs">{node.label}</span>
              <span className="font-mono text-[10px] text-brand">{Math.round(value)}%</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export { FlywheelDiagram };

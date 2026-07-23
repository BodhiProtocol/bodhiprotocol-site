"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Biohazard, Dices, MessageCircle, Skull, Swords, type LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { cn } from "@/lib/utils";
import type { GreatMindWheelNode } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Dices,
  Skull,
  MessageCircle,
  Biohazard,
  Swords,
};

// "Plague" is the node the one-time auto-demo plays on, chosen because it's
// the most historically dramatic entry (it killed his own co-emperor) — so a
// visitor who never interacts still sees the wave-hits-wall story once.
const DEMO_LABEL = "Plague";
const DEMO_DELAY_MS = 1000;
const DEMO_DURATION_MS = 1600;

function MarcusAureliusCitadelDiagram({ nodes }: { nodes: GreatMindWheelNode[] }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const demoFiredRef = React.useRef(false);

  const center = 50;
  const nodeRadius = 40;
  const wallRadius = 24;
  const keepRadius = 13;

  const points = nodes.map((node, index) => {
    const angle = (-90 + (360 / nodes.length) * index) * (Math.PI / 180);
    return {
      ...node,
      index,
      x: center + nodeRadius * Math.cos(angle),
      y: center + nodeRadius * Math.sin(angle),
      wallX: center + wallRadius * Math.cos(angle),
      wallY: center + wallRadius * Math.sin(angle),
    };
  });

  const active = activeIndex !== null ? points[activeIndex] : null;

  // Auto-demo: once, ~1s after entrance, so the "disturbance dies at the
  // wall" story plays even for a visitor who never hovers or taps anything.
  // Skipped entirely under reduced motion, same as the entrance itself.
  React.useEffect(() => {
    if (!played || reducedMotion || demoFiredRef.current) return;
    demoFiredRef.current = true;
    const demoNodeIndex = points.findIndex((p) => p.label === DEMO_LABEL);
    if (demoNodeIndex < 0) return;

    const start = setTimeout(() => setActiveIndex(demoNodeIndex), DEMO_DELAY_MS);
    const end = setTimeout(() => setActiveIndex((current) => (current === demoNodeIndex ? null : current)), DEMO_DELAY_MS + DEMO_DURATION_MS);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
    // points is derived from nodes each render; only re-run when the reveal/motion state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [played, reducedMotion]);

  function handleEnter(index: number) {
    setActiveIndex(index);
  }
  function handleLeave() {
    setActiveIndex(null);
  }
  function handleClick(index: number) {
    setActiveIndex((current) => (current === index ? null : index));
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-md sm:max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {/* The wall + moat — a fixed boundary, never itself animated except its one-time entrance draw-in. */}
          <motion.circle
            cx={center}
            cy={center}
            r={wallRadius}
            fill="none"
            strokeWidth={0.6}
            strokeDasharray="2.2 1.6"
            className="stroke-brand/25"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 }}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={wallRadius - 2}
            fill="none"
            strokeWidth={0.4}
            className="stroke-brand/15"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.3 }}
          />

          {points.map((point) => {
            const isActive = activeIndex === point.index;
            return (
              <React.Fragment key={point.label}>
                {isActive && !reducedMotion ? (
                  <motion.circle
                    r={0.6}
                    className="fill-brand"
                    initial={{ cx: point.x, cy: point.y, opacity: 0, r: 0.6 }}
                    animate={{
                      cx: [point.x, point.wallX, point.wallX],
                      cy: [point.y, point.wallY, point.wallY],
                      opacity: [0, 0.9, 0],
                      r: [0.6, 0.6, 1.6],
                    }}
                    transition={{ duration: 1.1, ease: "easeOut", repeat: Infinity, repeatDelay: 0.7 }}
                  />
                ) : isActive ? (
                  // Reduced-motion fallback: a static flash at the wall contact point, no travel.
                  <circle cx={point.wallX} cy={point.wallY} r={1.4} className="fill-brand/70" />
                ) : null}
              </React.Fragment>
            );
          })}

          {/* The keep — ambient breathing only, on a loop that never reads `activeIndex`. It does not react to anything. */}
          <motion.circle
            cx={center}
            cy={center}
            r={keepRadius}
            className="fill-brand/10 stroke-brand/40"
            strokeWidth={0.5}
            initial={{ opacity: 0 }}
            animate={
              played
                ? { opacity: reducedMotion ? [0.9] : [0.85, 1, 0.85] }
                : {}
            }
            transition={
              reducedMotion
                ? { duration: 0.4 }
                : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
            }
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-brand/25 bg-gradient-to-br from-brand/15 via-card to-card text-center shadow-lg shadow-brand/10 sm:size-24">
          <span className="font-serif text-base font-medium tracking-tight text-brand sm:text-xl">Himself</span>
          <span className="font-mono text-[7px] tracking-[0.12em] text-muted-foreground uppercase sm:text-[8px]">
            Ruling Faculty
          </span>
        </div>

        {points.map((point) => {
          const Icon = iconMap[point.icon] ?? Dices;
          const isActive = activeIndex === point.index;
          const entranceDelay = 0.2 + point.index * 0.08;
          return (
            <motion.button
              key={point.label}
              type="button"
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={played ? { opacity: 1, scale: isActive ? 1.1 : 1 } : {}}
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
              aria-describedby="citadel-node-detail"
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
        id="citadel-node-detail"
        className="flex min-h-16 max-w-md items-center justify-center rounded-xl border border-brand/15 bg-card/60 px-5 py-3 text-center backdrop-blur-sm"
        aria-live="polite"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.label}.</span> {active.description}
            </>
          ) : (
            "Five things he couldn't control. Tap one to see it break against the wall."
          )}
        </p>
      </div>
    </div>
  );
}

export { MarcusAureliusCitadelDiagram };

"use client";

import { motion } from "framer-motion";
import { Headphones, Sparkles, Target } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const dayOnePoints = [
  { x: 20, y: 20 },
  { x: 70, y: 15 },
  { x: 40, y: 60 },
  { x: 90, y: 50 },
];

const yearFivePoints = [
  { x: 15, y: 20 },
  { x: 35, y: 10 },
  { x: 60, y: 15 },
  { x: 85, y: 20 },
  { x: 105, y: 15 },
  { x: 20, y: 50 },
  { x: 45, y: 45 },
  { x: 70, y: 50 },
  { x: 95, y: 55 },
  { x: 55, y: 75 },
];

const yearFiveLines: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [1, 6],
  [2, 6],
  [2, 7],
  [3, 7],
  [3, 8],
  [4, 8],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [6, 9],
  [7, 9],
  [8, 9],
];

const loopNodes = [
  { label: "More Listening", icon: Headphones },
  { label: "More Taste Data", icon: Sparkles },
  { label: "Better Discovery", icon: Target },
];

function FloatingArrow({
  played,
  reducedMotion,
  delay = 0,
}: {
  played: boolean;
  reducedMotion: boolean;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 12"
      className="h-3 w-8 shrink-0 text-brand/50 sm:w-10"
      animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M27 1 L34 6 L27 11" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  );
}

function SpotifyTasteGraphDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Taste Graph
      </span>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold sm:text-sm">Day One</span>
          <div className="aspect-[4/3] w-full rounded-2xl bg-background p-2">
            <svg viewBox="0 0 120 90" className="h-full w-full">
              {dayOnePoints.map((point, index) => (
                <motion.circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  className="fill-muted-foreground/40"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={played ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: reducedMotion ? 0 : index * 0.08 }}
                />
              ))}
            </svg>
          </div>
          <span className="text-center text-[10px] leading-snug text-muted-foreground sm:text-[11px]">
            Generic recommendations. Same as everyone else.
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold text-brand sm:text-sm">Year Five</span>
          <div className="aspect-[4/3] w-full rounded-2xl bg-background p-2">
            <svg viewBox="0 0 120 90" className="h-full w-full">
              {yearFiveLines.map(([from, to], index) => {
                const a = yearFivePoints[from];
                const b = yearFivePoints[to];
                return (
                  <motion.line
                    key={index}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className="stroke-brand/30"
                    strokeWidth="0.75"
                    initial={{ opacity: 0 }}
                    animate={played ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.3 + index * 0.03 }}
                  />
                );
              })}
              {yearFivePoints.map((point, index) => (
                <motion.circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="3.5"
                  className="fill-brand"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={played ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.2 + index * 0.05 }}
                />
              ))}
            </svg>
          </div>
          <span className="text-center text-[10px] leading-snug text-muted-foreground sm:text-[11px]">
            A taste graph no competitor can copy.
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The moat compounds
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4 rounded-2xl bg-background p-4 sm:p-5">
        {loopNodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <div key={node.label} className="flex items-center">
              <span className="flex items-center gap-1.5 rounded-full border border-brand/20 bg-card px-3 py-1.5 text-xs font-semibold sm:text-sm">
                <Icon className="size-3.5 text-brand" />
                {node.label}
              </span>
              {index < loopNodes.length - 1 ? (
                <FloatingArrow played={played} reducedMotion={reducedMotion} delay={index * 0.2} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { SpotifyTasteGraphDiagram };

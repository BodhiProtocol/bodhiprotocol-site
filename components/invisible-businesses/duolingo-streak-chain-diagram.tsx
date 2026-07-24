"use client";

import { motion } from "framer-motion";
import { Flame, ShieldCheck, X } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const flameStages = [
  { label: "Day 1", size: 14, opacity: 0.35 },
  { label: "Day 3", size: 18, opacity: 0.55 },
  { label: "Day 7", size: 24, opacity: 1, callout: "Loss aversion kicks in" },
];

const loopNodes = [
  { label: "Streak Grows" },
  { label: "Losing It Feels Real" },
  { label: "Users Pay To Protect It" },
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

function DuolingoStreakChainDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Streak Chain
      </span>

      <div className="flex items-end justify-center gap-3 sm:gap-5">
        {flameStages.map((stage, index) => (
          <motion.div
            key={stage.label}
            className="flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, y: 8 }}
            animate={played ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: reducedMotion ? 0 : index * 0.15, ease: "easeOut" }}
          >
            <Flame
              className="text-brand"
              style={{ width: stage.size, height: stage.size, opacity: stage.opacity }}
              fill="currentColor"
            />
            <span className="text-[10px] font-semibold sm:text-xs">{stage.label}</span>
            {stage.callout ? (
              <span className="max-w-16 text-center text-[8.5px] leading-tight text-muted-foreground">
                {stage.callout}
              </span>
            ) : null}
          </motion.div>
        ))}

        <motion.div
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.55, ease: "easeOut" }}
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-destructive/15 text-destructive">
            <X className="size-4" />
          </span>
          <span className="max-w-14 text-center text-[9px] leading-tight font-semibold text-muted-foreground">
            Miss a day
          </span>
        </motion.div>

        <FloatingArrow played={played} reducedMotion={reducedMotion} delay={0.4} />

        <motion.div
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.7, ease: "easeOut" }}
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/25">
            <ShieldCheck className="size-6" />
          </span>
          <span className="max-w-20 text-center text-[9px] leading-tight font-semibold sm:text-[10px]">
            Free Repair, Then Super (Paid)
          </span>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The streak is the product
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4 rounded-2xl bg-background p-4 sm:p-5">
        {loopNodes.map((node, index) => (
          <div key={node.label} className="flex items-center">
            <span className="rounded-full border border-brand/20 bg-card px-3 py-1.5 text-xs font-semibold sm:text-sm">
              {node.label}
            </span>
            {index < loopNodes.length - 1 ? (
              <FloatingArrow played={played} reducedMotion={reducedMotion} delay={index * 0.2} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export { DuolingoStreakChainDiagram };

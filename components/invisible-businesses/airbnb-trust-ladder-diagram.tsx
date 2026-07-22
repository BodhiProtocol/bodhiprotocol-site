"use client";

import { motion } from "framer-motion";
import { Award, Star, TrendingUp, User } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const steps = [
  { label: "New Host", caption: "No reviews yet", icon: User, height: 64 },
  { label: "First Reviews", caption: "A few strangers vouch", icon: Star, height: 92 },
  { label: "Trust Score Rises", caption: "Bookings get easier", icon: TrendingUp, height: 120 },
  { label: "Superhost", caption: "Trust, compounded", icon: Award, height: 148 },
];

const loopNodes = [{ label: "More Reviews" }, { label: "Higher Trust Score" }, { label: "More Bookings" }];

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

function AirbnbTrustLadderDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Trust Ladder
      </span>

      <div className="flex items-end justify-center gap-3 sm:gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;
          return (
            <motion.div
              key={step.label}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={played ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.15, ease: "easeOut" }}
            >
              <span
                className={
                  isLast
                    ? "flex size-9 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/25 sm:size-10"
                    : "flex size-9 items-center justify-center rounded-full border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent text-brand sm:size-10"
                }
              >
                <Icon className="size-4 sm:size-5" />
              </span>
              <div
                className={
                  isLast
                    ? "flex w-16 items-end justify-center rounded-t-lg bg-brand sm:w-20"
                    : "flex w-16 items-end justify-center rounded-t-lg bg-card sm:w-20"
                }
                style={{ height: step.height }}
              />
              <span className="text-center text-xs font-semibold sm:text-sm">{step.label}</span>
              <span className="hidden text-center text-[10px] leading-tight text-muted-foreground sm:block">
                {step.caption}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Trust compounds with every stay
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

export { AirbnbTrustLadderDiagram };

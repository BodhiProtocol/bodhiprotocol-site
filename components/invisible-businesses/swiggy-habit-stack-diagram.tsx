"use client";

import { motion } from "framer-motion";
import { ShoppingBasket, Smartphone, UtensilsCrossed } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const bars = [
  {
    label: "Total Revenue Growth",
    detail: "+54% YoY, Q3 FY26",
    widthPct: 54,
    icon: Smartphone,
    tone: "muted" as const,
  },
  {
    label: "Instamart GOV Growth",
    detail: "+68.8% YoY, Q3 FY26",
    widthPct: 69,
    icon: ShoppingBasket,
    tone: "brand" as const,
  },
];

const loopNodes = [
  { label: "Open For Food", icon: UtensilsCrossed },
  { label: "Discover Instamart", icon: ShoppingBasket },
  { label: "Habit Compounds", icon: Smartphone },
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

function SwiggyHabitStackDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Habit Stack
      </span>

      <div className="flex flex-col gap-4">
        {bars.map((bar, index) => {
          const Icon = bar.icon;
          return (
            <div key={bar.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
                  <Icon className="size-3.5 text-brand" />
                  {bar.label}
                </span>
                <span className="text-[10px] text-muted-foreground sm:text-xs">{bar.detail}</span>
              </div>
              <div className="h-6 w-full overflow-hidden rounded-full bg-background sm:h-7">
                <motion.div
                  className={
                    bar.tone === "brand"
                      ? "h-full rounded-full bg-brand"
                      : "h-full rounded-full bg-brand/25"
                  }
                  initial={{ width: 0 }}
                  animate={played ? { width: `${bar.widthPct}%` } : { width: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: reducedMotion ? 0 : 0.2 + index * 0.15,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The habit outgrows the order
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

      <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground sm:text-sm">
        <span className="rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[10px] font-bold text-brand">
          24.3M
        </span>
        Average monthly transacting users, Q3 FY26 — up 36.8% year-on-year.
      </div>
    </div>
  );
}

export { SwiggyHabitStackDiagram };

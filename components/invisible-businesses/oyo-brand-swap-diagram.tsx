"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Building2, Star } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const splitBars = [
  { label: "Hotel Owner Keeps", detail: "65-80% of Gross Booking Value", widthPct: 72, tone: "muted" as const },
  {
    label: "OYO Commission",
    detail: "20-35% for brand, tech, and demand",
    widthPct: 28,
    tone: "brand" as const,
  },
];

function OyoBrandSwapDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-7 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Brand Swap
      </span>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="flex w-full max-w-[220px] flex-col gap-2 rounded-2xl border border-border bg-background p-4 shadow-sm">
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
            Before
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Building2 className="size-4 shrink-0" />
            Sunrise Residency
          </span>
          <span className="text-[11px] text-muted-foreground">No rating shown · No app demand</span>
        </div>

        <motion.div
          animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-brand"
        >
          <ArrowRight className="size-5 shrink-0 rotate-90 sm:rotate-0" />
        </motion.div>

        <div className="relative flex w-full max-w-[220px] flex-col gap-2 rounded-2xl border border-brand/30 bg-background p-4 shadow-sm">
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-brand uppercase">
            After
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold">
            <BadgeCheck className="size-4 shrink-0 text-brand" />
            OYO 141 Sunrise
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="size-3 fill-brand text-brand" />
            4.2 · Booked via app
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Same rooms, a name guests already trust
        </span>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-background p-4 sm:p-5">
        {splitBars.map((bar, index) => (
          <div key={bar.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold sm:text-sm">{bar.label}</span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">{bar.detail}</span>
            </div>
            <div className="h-6 w-full overflow-hidden rounded-full bg-muted sm:h-7">
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
        ))}
      </div>
    </div>
  );
}

export { OyoBrandSwapDiagram };

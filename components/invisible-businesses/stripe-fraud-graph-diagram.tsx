"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Store } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const merchants = ["Coffee Shop", "SaaS App", "Marketplace"];

const statBars = [
  { label: "Cards Already Seen On The Network", detail: "92%", widthPct: 92, tone: "brand" as const },
  { label: "Average Fraud Reduction From Radar", detail: "32%", widthPct: 32, tone: "muted" as const },
];

function StripeFraudGraphDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-7 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Fraud Graph
      </span>

      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-3 sm:gap-6">
          {merchants.map((name, index) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 shadow-sm">
                <Store className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="text-xs font-medium sm:text-sm">{name}</span>
              </div>
              <motion.div
                animate={played && !reducedMotion ? { y: [0, 4, 0] } : {}}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }}
                className="text-brand"
              >
                <ArrowRight className="size-4 rotate-90" />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="relative flex flex-col items-center gap-2">
          <motion.span
            className="absolute inset-0 -m-3 rounded-full bg-brand/20"
            animate={played && !reducedMotion ? { opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
            <ShieldCheck className="size-7" />
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-brand uppercase">
            Radar
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          A pattern caught here protects the other two
        </span>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-background p-4 sm:p-5">
        {statBars.map((bar, index) => (
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

export { StripeFraudGraphDiagram };

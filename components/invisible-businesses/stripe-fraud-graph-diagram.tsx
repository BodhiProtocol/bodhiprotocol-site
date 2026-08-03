"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, Store } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const statBars = [
  { label: "Cards Already Seen On The Network", detail: "92%", widthPct: 92, tone: "brand" as const },
  { label: "Average Fraud Reduction From Radar", detail: "38%", widthPct: 38, tone: "muted" as const },
];

const sideMerchants = [
  { name: "Coffee Shop", side: "left" as const, delay: 0.7 },
  { name: "Marketplace", side: "right" as const, delay: 1.0 },
];

function StripeFraudGraphDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const pulse = played && !reducedMotion;

  return (
    <div
      ref={ref}
      className="flex flex-col gap-7 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Fraud Graph
      </span>

      <div className="relative flex items-center justify-center gap-6 py-6 sm:gap-10">
        {sideMerchants
          .filter((m) => m.side === "left")
          .map((m) => (
            <MerchantCard key={m.name} name={m.name} pulse={pulse} delay={m.delay} />
          ))}

        <div className="relative flex size-20 shrink-0 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border-2 border-brand/40"
              animate={
                pulse
                  ? { scale: [0.4, 2.4], opacity: [0.7, 0] }
                  : { scale: 0.4, opacity: 0 }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.65,
              }}
            />
          ))}
          <span className="relative flex size-14 items-center justify-center rounded-full bg-destructive/90 text-white shadow-sm">
            <AlertTriangle className="size-6" />
          </span>
        </div>

        {sideMerchants
          .filter((m) => m.side === "right")
          .map((m) => (
            <MerchantCard key={m.name} name={m.name} pulse={pulse} delay={m.delay} />
          ))}
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Fraud caught here protects the other two, instantly
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

function MerchantCard({ name, pulse, delay }: { name: string; pulse: boolean; delay: number }) {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 shadow-sm">
        <Store className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="text-xs font-medium sm:text-sm">{name}</span>
      </div>
      <motion.span
        className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
        initial={{ opacity: 0, y: -4 }}
        animate={pulse ? { opacity: [0, 0, 1, 1, 0], y: [-4, -4, 0, 0, -4] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay, times: [0, 0.05, 0.15, 0.85, 1] }}
      >
        <ShieldCheck className="size-3" />
        Protected
      </motion.span>
    </div>
  );
}

export { StripeFraudGraphDiagram };

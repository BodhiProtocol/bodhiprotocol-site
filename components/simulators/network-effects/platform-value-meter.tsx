"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useCountUp } from "@/components/simulators/use-count-up";

interface PlatformValueMeterProps {
  value: number;
}

const TIERS = [
  { max: 24, label: "Early Signal" },
  { max: 49, label: "Growing Network" },
  { max: 74, label: "Strong Network" },
  { max: 89, label: "Dominant Platform" },
  { max: 100, label: "Global Ecosystem" },
];

function getTierLabel(value: number): string {
  return TIERS.find((tier) => value <= tier.max)?.label ?? TIERS[TIERS.length - 1].label;
}

function PlatformValueMeter({ value }: PlatformValueMeterProps) {
  const display = useCountUp(value);
  const clamped = Math.max(0, Math.min(100, display));
  const tierLabel = getTierLabel(Math.round(clamped));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <AnimatePresence mode="wait">
          <motion.span
            key={tierLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase"
          >
            {tierLabel}
          </motion.span>
        </AnimatePresence>
        <span className="font-mono text-2xl font-semibold text-brand">{Math.round(clamped)}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-brand"
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export { PlatformValueMeter };

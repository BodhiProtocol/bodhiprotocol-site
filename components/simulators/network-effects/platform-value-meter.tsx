"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";

import { playSimulatorSound } from "@/components/simulators/simulator-sound";
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
  const isFirstTierRef = React.useRef(true);
  const prevTierRef = React.useRef(tierLabel);

  React.useEffect(() => {
    if (isFirstTierRef.current) {
      isFirstTierRef.current = false;
      prevTierRef.current = tierLabel;
      return;
    }
    if (prevTierRef.current !== tierLabel) {
      prevTierRef.current = tierLabel;
      playSimulatorSound("milestone");
    }
  }, [tierLabel]);

  return (
    <div className="group/meter flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <AnimatePresence mode="wait">
          <motion.span
            key={tierLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
            className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase"
          >
            {tierLabel}
          </motion.span>
        </AnimatePresence>
        <span className="flex items-center gap-1.5 font-mono text-2xl font-semibold text-brand">
          {Math.round(clamped)}
          <Info className="size-3.5 text-muted-foreground/60" />
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-brand"
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        />
      </div>
      <p className="max-h-0 overflow-hidden text-xs leading-relaxed text-muted-foreground opacity-0 transition-all duration-300 group-hover/meter:max-h-12 group-hover/meter:opacity-100">
        Platform Value measures how valuable the network has become — from 0 (barely useful) to 100 (impossible to
        leave).
      </p>
    </div>
  );
}

export { PlatformValueMeter, getTierLabel };

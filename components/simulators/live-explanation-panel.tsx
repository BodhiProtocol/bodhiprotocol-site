"use client";

import { AnimatePresence, motion } from "framer-motion";

import { GlassCard } from "@/components/simulators/glass-card";

interface LiveExplanationPanelProps {
  explanation: string;
  tierLabel?: string;
}

const TIER_DETAILS: Record<string, string> = {
  "Early Signal":
    "Most networks start here — a handful of people, testing whether there's anything worth staying for.",
  "Growing Network": "Enough people have joined that new connections are starting to form on their own.",
  "Strong Network":
    "The network now creates real value independent of any single user — people stay because others are here.",
  "Dominant Platform": "Leaving would mean losing access to nearly everyone else already here — that's the moat.",
  "Global Ecosystem": "At this scale, the network effect isn't a feature anymore — it's the entire business.",
};

function LiveExplanationPanel({ explanation, tierLabel }: LiveExplanationPanelProps) {
  const detail = tierLabel ? TIER_DETAILS[tierLabel] : undefined;

  return (
    <GlassCard aria-live="polite" className="group/insight gap-3 p-6 sm:p-6">
      <span className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-brand uppercase">
        <span aria-hidden="true">🧠</span>
        Bodhi Insight
      </span>
      <AnimatePresence mode="wait">
        <motion.p
          key={explanation}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.25 }}
          className="leading-relaxed text-foreground"
        >
          {explanation}
        </motion.p>
      </AnimatePresence>
      {detail ? (
        <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-300 group-hover/insight:max-h-16 group-hover/insight:opacity-100">
          {detail}
        </p>
      ) : null}
    </GlassCard>
  );
}

export { LiveExplanationPanel };

"use client";

import { AnimatePresence, motion } from "framer-motion";

import { GlassCard } from "@/components/simulators/glass-card";

interface LiveExplanationPanelProps {
  explanation: string;
}

function LiveExplanationPanel({ explanation }: LiveExplanationPanelProps) {
  return (
    <GlassCard aria-live="polite" className="gap-3 p-6 sm:p-6">
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
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="leading-relaxed text-foreground"
        >
          {explanation}
        </motion.p>
      </AnimatePresence>
    </GlassCard>
  );
}

export { LiveExplanationPanel };

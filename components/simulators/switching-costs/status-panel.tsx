"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DoorOpen, Lock } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { SwitchingCostMeter } from "@/components/simulators/switching-costs/switching-cost-meter";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface StatusPanelProps {
  switchingCost: number;
  escaped: boolean;
}

function StatusPanel({ switchingCost, escaped }: StatusPanelProps) {
  return (
    <GlassCard className="gap-6 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
      <Eyebrow className="text-brand">Switching Status</Eyebrow>
      <SwitchingCostMeter value={switchingCost} />
      <AnimatePresence mode="wait">
        <motion.div
          key={escaped ? "escaped" : "trapped"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium",
            escaped ? "border-brand/30 bg-brand/5 text-brand" : "border-border text-muted-foreground",
          )}
        >
          {escaped ? <DoorOpen className="size-4 shrink-0" /> : <Lock className="size-4 shrink-0" />}
          {escaped ? "They just left — the alternative finally won" : "Still here — leaving still costs more than it's worth"}
        </motion.div>
      </AnimatePresence>
    </GlassCard>
  );
}

export { StatusPanel };

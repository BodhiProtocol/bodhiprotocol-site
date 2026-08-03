"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCw, Zap } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { MomentumMeter } from "@/components/simulators/flywheel/momentum-meter";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface StatusPanelProps {
  momentum: number;
  spinning: boolean;
  selfSustaining: boolean;
}

function StatusPanel({ momentum, spinning, selfSustaining }: StatusPanelProps) {
  const state = selfSustaining ? "self-sustaining" : spinning ? "spinning" : "stalled";

  return (
    <GlassCard className="gap-6 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
      <Eyebrow className="text-brand">Flywheel Status</Eyebrow>
      <MomentumMeter value={momentum} />
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium",
            selfSustaining
              ? "border-brand/30 bg-brand/5 text-brand"
              : spinning
                ? "border-border text-foreground"
                : "border-border text-muted-foreground",
          )}
        >
          {selfSustaining ? (
            <Zap className="size-4 shrink-0" />
          ) : (
            <RotateCw className={cn("size-4 shrink-0", !spinning && "opacity-50")} />
          )}
          {selfSustaining
            ? "Self-sustaining — the loop is generating its own push"
            : spinning
              ? "Turning — the loop is producing more than friction takes away"
              : "Stalled — friction is currently winning"}
        </motion.div>
      </AnimatePresence>
    </GlassCard>
  );
}

export { StatusPanel };

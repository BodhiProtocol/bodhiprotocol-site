"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import type { Scenario } from "@/components/simulators/order-book/use-order-book-simulator";
import { Eyebrow, H3, Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface MarketScenariosProps {
  scenarios: Scenario[];
  playingScenarioId: string | null;
  playedScenarios: string[];
  onPlay: (id: string) => void;
}

function MarketScenarios({ scenarios, playingScenarioId, playedScenarios, onPlay }: MarketScenariosProps) {
  const isPlaying = playingScenarioId !== null;
  const playingLabel = scenarios.find((scenario) => scenario.id === playingScenarioId)?.label;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow className="text-brand">Market Scenarios</Eyebrow>
        <H3>Watch a story play out</H3>
        <Muted>Click one to replay a real market moment — the book and the Bodhi Insight narrate it live.</Muted>
      </div>

      <div className="flex flex-wrap gap-2">
        {scenarios.map((scenario) => {
          const played = playedScenarios.includes(scenario.id);
          const active = playingScenarioId === scenario.id;
          return (
            <button
              key={scenario.id}
              type="button"
              disabled={isPlaying}
              onClick={() => onPlay(scenario.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-[color,transform,background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                active
                  ? "border-brand/40 bg-brand/10 text-brand"
                  : "border-border text-muted-foreground hover:scale-105 hover:text-foreground",
                isPlaying && !active && "opacity-50",
              )}
            >
              {played ? <Check className="size-3.5 text-brand" /> : null}
              {scenario.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isPlaying ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-brand uppercase"
          >
            <motion.span
              className="size-1.5 rounded-full bg-brand"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            Replaying: {playingLabel}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export { MarketScenarios };

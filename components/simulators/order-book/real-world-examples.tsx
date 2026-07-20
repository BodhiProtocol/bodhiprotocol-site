"use client";

import * as React from "react";

import { GlassCard } from "@/components/simulators/glass-card";
import { cn } from "@/lib/utils";

interface RealWorldExample {
  id: string;
  name: string;
  description: string;
}

const REAL_WORLD_EXAMPLES: RealWorldExample[] = [
  {
    id: "stocks",
    name: "Stock Market",
    description:
      "Exchanges like the NYSE run a real central limit order book — every bid and ask you'd see here is public, and market makers compete to keep spreads tight.",
  },
  {
    id: "crypto",
    name: "Crypto",
    description:
      "Exchanges like Coinbase or Binance run order books 24/7 with no closing bell — liquidity can vanish in seconds during a panic, which is why crypto crashes look so sharp.",
  },
  {
    id: "forex",
    name: "Forex",
    description:
      "The world's deepest market — trillions traded daily across a network of dealers instead of one central book, so spreads are usually razor-thin except around major news.",
  },
  {
    id: "commodities",
    name: "Commodities",
    description:
      "Oil, gold, and wheat futures trade on order books too, but liquidity often thins out far from the current contract month — same thin-market effect, different asset.",
  },
  {
    id: "options",
    name: "Options",
    description:
      "Thousands of separate order books exist for one stock — one per strike price and expiry — so far-out-of-the-money options can have almost no liquidity at all.",
  },
];

interface RealWorldExamplesProps {
  selectedExample: string | null;
  onSelect: (id: string) => void;
}

function RealWorldExamples({ selectedExample, onSelect }: RealWorldExamplesProps) {
  const active = REAL_WORLD_EXAMPLES.find((example) => example.id === selectedExample) ?? REAL_WORLD_EXAMPLES[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {REAL_WORLD_EXAMPLES.map((example) => {
          const isActive = example.id === active.id;
          return (
            <button
              key={example.id}
              type="button"
              onClick={() => onSelect(example.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-[color,transform,background-color,border-color] duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive
                  ? "border-brand/40 bg-brand/10 text-brand"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {example.name}
            </button>
          );
        })}
      </div>
      <GlassCard className="gap-2 p-6 sm:p-6">
        <h3 className="font-serif text-lg font-medium">{active.name}</h3>
        <p className="text-muted-foreground">{active.description}</p>
      </GlassCard>
    </div>
  );
}

const MemoizedRealWorldExamples = React.memo(RealWorldExamples);

export { MemoizedRealWorldExamples as RealWorldExamples };

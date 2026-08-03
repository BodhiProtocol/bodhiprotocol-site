"use client";

import * as React from "react";

import { GlassCard } from "@/components/simulators/glass-card";
import { cn } from "@/lib/utils";

interface FlywheelExample {
  id: string;
  name: string;
  description: string;
}

const FLYWHEEL_EXAMPLES: FlywheelExample[] = [
  {
    id: "amazon",
    name: "Amazon",
    description:
      "Lower prices attract more customers. More customers attract more sellers. More sellers mean greater selection and scale — which funds even lower prices.",
  },
  {
    id: "costco",
    name: "Costco",
    description:
      "A membership fee funds rock-bottom prices. Rock-bottom prices drive renewal and word of mouth. More members fund even better prices.",
  },
  {
    id: "tesla",
    name: "Tesla",
    description:
      "Higher production volume lowers battery cost per unit. Lower cost funds cheaper vehicles. Cheaper vehicles grow demand — and volume — further.",
  },
  {
    id: "youtube",
    name: "YouTube",
    description:
      "More creators bring more viewers. More viewers bring more ad revenue. More revenue funds better tools that attract even more creators.",
  },
  {
    id: "airbnb",
    name: "Airbnb",
    description:
      "More hosts create more listings. More listings attract more guests. More guests make hosting more profitable — which attracts more hosts.",
  },
];

interface RealWorldExamplesProps {
  selectedExample: string | null;
  onSelect: (id: string) => void;
}

function RealWorldExamples({ selectedExample, onSelect }: RealWorldExamplesProps) {
  const active = FLYWHEEL_EXAMPLES.find((example) => example.id === selectedExample) ?? FLYWHEEL_EXAMPLES[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {FLYWHEEL_EXAMPLES.map((example) => {
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

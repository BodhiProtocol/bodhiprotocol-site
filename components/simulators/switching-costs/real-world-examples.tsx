"use client";

import * as React from "react";

import { GlassCard } from "@/components/simulators/glass-card";
import { cn } from "@/lib/utils";

interface SwitchingCostExample {
  id: string;
  name: string;
  description: string;
}

const SWITCHING_COST_EXAMPLES: SwitchingCostExample[] = [
  {
    id: "photos",
    name: "Google Photos / iCloud",
    description:
      "A decade of photos and files lives in one place. Leaving means downloading everything and re-uploading it somewhere else — or losing it.",
  },
  {
    id: "crm",
    name: "Enterprise CRM (Salesforce)",
    description:
      "Dozens of other tools are wired into it — reporting, billing, support. Ripping it out means rebuilding every integration, not just switching software.",
  },
  {
    id: "messaging",
    name: "WhatsApp",
    description:
      "The app itself is replaceable. The people already on it aren't — leaving means asking everyone you know to follow you somewhere else.",
  },
  {
    id: "contract",
    name: "Gym & Cell Phone Contracts",
    description:
      "A cancellation fee turns a two-minute decision into a financial one. The cost isn't emotional here — it's printed in the fine print.",
  },
  {
    id: "habit",
    name: "Excel / Muscle Memory",
    description:
      "Years of shortcuts and workflows are built into your hands, not the software. A better tool still costs you the time to relearn everything.",
  },
];

interface RealWorldExamplesProps {
  selectedExample: string | null;
  onSelect: (id: string) => void;
}

function RealWorldExamples({ selectedExample, onSelect }: RealWorldExamplesProps) {
  const active =
    SWITCHING_COST_EXAMPLES.find((example) => example.id === selectedExample) ?? SWITCHING_COST_EXAMPLES[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {SWITCHING_COST_EXAMPLES.map((example) => {
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

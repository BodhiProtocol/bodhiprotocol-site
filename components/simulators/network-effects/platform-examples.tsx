"use client";

import * as React from "react";

import { GlassCard } from "@/components/simulators/glass-card";
import { cn } from "@/lib/utils";

interface PlatformExample {
  id: string;
  name: string;
  description: string;
}

const PLATFORM_EXAMPLES: PlatformExample[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    description:
      "A messaging network — every new contact you can reach makes it more useful for everyone already on it.",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description:
      "A professional network — more members mean a richer professional graph, better job matches, and more reasons for companies to recruit through it.",
  },
  {
    id: "visa",
    name: "Visa",
    description:
      "A two-sided payment network — more cardholders make it more attractive for merchants to accept, and more accepting merchants make the card more useful to carry.",
  },
  {
    id: "uber",
    name: "Uber",
    description:
      "A marketplace network — more riders attract more drivers, and more drivers mean shorter wait times, which attracts even more riders.",
  },
  {
    id: "airbnb",
    name: "Airbnb",
    description:
      "A marketplace network — more guests bring more hosts, and more hosts in more places bring more guests, reinforcing the loop.",
  },
  {
    id: "youtube",
    name: "YouTube",
    description:
      "A content network — more viewers attract more creators, more creators bring more content, and recommendations get smarter as more people watch.",
  },
];

interface PlatformExamplesProps {
  selectedExample: string | null;
  onSelect: (id: string) => void;
  onHoverExample?: (id: string) => void;
}

function PlatformExamples({ selectedExample, onSelect, onHoverExample }: PlatformExamplesProps) {
  const active = PLATFORM_EXAMPLES.find((example) => example.id === selectedExample) ?? PLATFORM_EXAMPLES[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {PLATFORM_EXAMPLES.map((example) => {
          const isActive = example.id === active.id;
          return (
            <button
              key={example.id}
              type="button"
              onClick={() => onSelect(example.id)}
              onMouseEnter={() => onHoverExample?.(example.id)}
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

const MemoizedPlatformExamples = React.memo(PlatformExamples);

export { MemoizedPlatformExamples as PlatformExamples };

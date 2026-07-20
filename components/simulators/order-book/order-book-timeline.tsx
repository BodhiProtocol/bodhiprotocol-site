"use client";

import type { TimelinePreset } from "@/components/simulators/order-book/use-order-book-simulator";
import { Eyebrow, Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface OrderBookTimelineProps {
  presets: TimelinePreset[];
  activeLabel: string | null;
  onSelectLabel: (label: string) => void;
}

function OrderBookTimeline({ presets, activeLabel, onSelectLabel }: OrderBookTimelineProps) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Eyebrow className="text-brand">Trading Day Timeline</Eyebrow>
      <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-2">
        {presets.map((preset, index) => {
          const active = preset.label === activeLabel;
          return (
            <div key={preset.label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectLabel(preset.label)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 font-mono text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {preset.label}
              </button>
              {index < presets.length - 1 ? <span className="h-px w-6 shrink-0 bg-border sm:w-10" /> : null}
            </div>
          );
        })}
      </div>
      <Muted>See how the book&apos;s liquidity and spread naturally shift across a typical trading day.</Muted>
    </div>
  );
}

export { OrderBookTimeline };

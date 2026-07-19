"use client";

import type { TimelinePreset } from "@/components/simulators/network-effects/use-network-effects-simulator";
import { Eyebrow, Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface EcosystemTimelineProps {
  presets: TimelinePreset[];
  activeYear: number | null;
  onSelectYear: (year: number) => void;
}

function EcosystemTimeline({ presets, activeYear, onSelectYear }: EcosystemTimelineProps) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Eyebrow className="text-brand">Ecosystem Timeline</Eyebrow>
      <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-2">
        {presets.map((preset, index) => {
          const active = preset.year === activeYear;
          return (
            <div key={preset.year} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectYear(preset.year)}
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {preset.year}
              </button>
              {index < presets.length - 1 ? <span className="h-px w-6 shrink-0 bg-border sm:w-10" /> : null}
            </div>
          );
        })}
      </div>
      <Muted>Illustrative growth curve of a typical network-effects platform — not real company data.</Muted>
    </div>
  );
}

export { EcosystemTimeline };

import { ArrowRight } from "lucide-react";

import { GREAT_MINDS_ICON_MAP } from "@/components/great-minds/great-minds-icon-map";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindEnduringInfluenceEntry } from "@/types/content";

// Extends each Mental Model with an ancient/modern/why-it-matters angle,
// rather than re-listing separate "legacy" facts already covered elsewhere
// on the page (timeline, thinking process). Deliberately full-width
// horizontal rows rather than a vertical icon-card grid, so this reads as a
// distinct "then becomes now" transfer exercise instead of a Mental Models
// rerun. Renders nothing when a mind's frontmatter doesn't define
// enduringInfluence.
function GreatMindsEnduringInfluence({ entries }: { entries?: GreatMindEnduringInfluenceEntry[] }) {
  if (!entries || entries.length === 0) return null;

  return (
    <section id="enduring-influence" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">Why It Still Matters</Eyebrow>
        <H2>Enduring Influence</H2>
      </div>
      <div className="flex flex-col gap-4">
        {entries.map((entry) => {
          const Icon = GREAT_MINDS_ICON_MAP[entry.icon] ?? GREAT_MINDS_ICON_MAP.Brain;
          return (
            <div key={entry.modelName} className="overflow-hidden rounded-2xl border border-border">
              <div className="flex items-center gap-2.5 border-b border-border bg-muted/40 px-5 py-3">
                <Icon className="size-4 text-brand" />
                <h3 className="font-heading text-sm font-semibold">{entry.modelName}</h3>
              </div>
              <div className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">Ancient</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.ancient}</p>
                </div>
                <ArrowRight className="hidden size-4 shrink-0 text-brand/40 sm:block" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs tracking-[0.1em] text-brand uppercase">Modern</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">{entry.modern}</p>
                </div>
              </div>
              <div className="border-t border-border bg-brand/[0.06] px-5 py-3">
                <p className="font-mono text-xs tracking-[0.1em] text-brand uppercase">Why It Matters</p>
                <p className="mt-1 text-sm leading-relaxed font-medium text-foreground">{entry.whyItMatters}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { GreatMindsEnduringInfluence };

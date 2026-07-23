import { GlassCard } from "@/components/great-minds/glass-card";
import { GREAT_MINDS_ICON_MAP } from "@/components/great-minds/great-minds-icon-map";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindEnduringInfluenceEntry } from "@/types/content";

// Extends each Mental Model with an ancient/modern/why-it-matters angle,
// rather than re-listing separate "legacy" facts already covered elsewhere
// on the page (timeline, thinking process). Renders nothing when a mind's
// frontmatter doesn't define enduringInfluence.
function GreatMindsEnduringInfluence({ entries }: { entries?: GreatMindEnduringInfluenceEntry[] }) {
  if (!entries || entries.length === 0) return null;

  return (
    <section id="enduring-influence" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">Why It Still Matters</Eyebrow>
        <H2>Enduring Influence</H2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {entries.map((entry) => {
          const Icon = GREAT_MINDS_ICON_MAP[entry.icon] ?? GREAT_MINDS_ICON_MAP.Brain;
          return (
            <GlassCard key={entry.modelName} className="gap-3">
              <Icon className="size-5 text-brand" />
              <h3 className="font-heading text-base font-semibold">{entry.modelName}</h3>
              <dl className="flex flex-col gap-2 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">Ancient</dt>
                  <dd className="text-muted-foreground">{entry.ancient}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">Modern</dt>
                  <dd className="text-muted-foreground">{entry.modern}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-[0.1em] text-brand uppercase">Why It Matters</dt>
                  <dd className="text-foreground">{entry.whyItMatters}</dd>
                </div>
              </dl>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

export { GreatMindsEnduringInfluence };

import { GREAT_MINDS_ICON_MAP } from "@/components/great-minds/great-minds-icon-map";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindConceptIllustration } from "@/types/content";

// Generic reusable "principle + facets" section — a product or decision
// distilled to the human idea behind it rather than its engineering, told in
// one statement and a handful of icon facets instead of paragraphs. Renders
// nothing when a mind's frontmatter doesn't define conceptIllustration.
function GreatMindsConceptIllustration({ illustration }: { illustration?: GreatMindConceptIllustration }) {
  if (!illustration) return null;

  return (
    <section id="concept-illustration" className="scroll-mt-24 flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <Eyebrow className="text-brand">{illustration.eyebrow}</Eyebrow>
        <H2>{illustration.heading}</H2>
      </div>

      <p className="max-w-xl text-balance font-serif text-2xl leading-snug sm:text-3xl">
        {illustration.principle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        {illustration.facets.map((facet) => {
          const Icon = GREAT_MINDS_ICON_MAP[facet.icon] ?? GREAT_MINDS_ICON_MAP.Brain;
          return (
            <div key={facet.label} className="flex flex-col items-center gap-2">
              <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-card text-brand shadow-sm">
                <Icon className="size-5" />
              </span>
              <span className="font-mono text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                {facet.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { GreatMindsConceptIllustration };

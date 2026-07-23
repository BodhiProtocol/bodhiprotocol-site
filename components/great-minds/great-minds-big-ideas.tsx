import { GREAT_MINDS_ICON_MAP } from "@/components/great-minds/great-minds-icon-map";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindBigIdea } from "@/types/content";

function GreatMindsBigIdeas({ ideas }: { ideas: GreatMindBigIdea[] }) {
  return (
    <section id="big-ideas" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">The Output</Eyebrow>
        <H2>Big Ideas</H2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => {
          const Icon = GREAT_MINDS_ICON_MAP[idea.icon ?? "Lightbulb"] ?? GREAT_MINDS_ICON_MAP.Lightbulb;
          return (
            <div key={idea.title} className="flex flex-col gap-2.5 rounded-2xl border border-border p-5">
              <Icon className="size-4 text-brand" />
              <h3 className="font-heading text-base font-semibold">{idea.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{idea.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { GreatMindsBigIdeas };

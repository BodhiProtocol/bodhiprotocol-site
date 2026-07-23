import { GlassCard } from "@/components/great-minds/glass-card";
import { GreatMindsTakeaway } from "@/components/great-minds/great-minds-takeaway";
import { GREAT_MINDS_ICON_MAP } from "@/components/great-minds/great-minds-icon-map";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindMentalModel } from "@/types/content";

function GreatMindsMentalModels({
  models,
  takeaway,
}: {
  models: GreatMindMentalModel[];
  takeaway?: string;
}) {
  return (
    <section id="mental-models" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">Transferable Frameworks</Eyebrow>
        <H2>Mental Models</H2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {models.map((model) => {
          const Icon = GREAT_MINDS_ICON_MAP[model.icon ?? "Brain"] ?? GREAT_MINDS_ICON_MAP.Brain;
          return (
            <GlassCard key={model.name} className="gap-3">
              <Icon className="size-5 text-brand" />
              <h3 className="font-heading text-base font-semibold">{model.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{model.description}</p>
            </GlassCard>
          );
        })}
      </div>
      <GreatMindsTakeaway text={takeaway} />
    </section>
  );
}

export { GreatMindsMentalModels };

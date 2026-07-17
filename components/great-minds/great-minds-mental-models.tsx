import { Brain } from "lucide-react";

import { GlassCard } from "@/components/great-minds/glass-card";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindMentalModel } from "@/types/content";

function GreatMindsMentalModels({ models }: { models: GreatMindMentalModel[] }) {
  return (
    <section id="mental-models" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">Transferable Frameworks</Eyebrow>
        <H2>Mental Models</H2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {models.map((model) => (
          <GlassCard key={model.name} className="gap-3">
            <Brain className="size-5 text-brand" />
            <h3 className="font-heading text-base font-semibold">{model.name}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{model.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export { GreatMindsMentalModels };

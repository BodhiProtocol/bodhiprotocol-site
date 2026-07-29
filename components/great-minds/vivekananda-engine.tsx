import { ArrowRight, HeartHandshake, Lightbulb, Shield, Sparkles, TrendingUp, Users } from "lucide-react";

import { Eyebrow, H2 } from "@/components/ui/typography";

const stages = [
  {
    label: "Truth",
    description: "Each soul is potentially divine.",
    icon: Sparkles,
  },
  {
    label: "Self-Belief",
    description: "Identity shifts from lack to latent power.",
    icon: Lightbulb,
  },
  {
    label: "Strength",
    description: "Confidence becomes discipline and self-respect.",
    icon: Shield,
  },
  {
    label: "Fearless Action",
    description: "The idea leaves the book and enters Tuesday morning.",
    icon: TrendingUp,
  },
  {
    label: "Service",
    description: "Dignity becomes work for other people.",
    icon: HeartHandshake,
  },
  {
    label: "Social Transformation",
    description: "Individuals, communities, and nations become stronger.",
    icon: Users,
  },
];

function VivekanandaEngine() {
  return (
    <section id="vivekananda-engine" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">The Bespoke Engine</Eyebrow>
        <H2>The Vivekananda Engine</H2>
        <p className="max-w-2xl text-muted-foreground">
          Every major contribution followed the same conversion sequence: an inner truth became self-belief,
          then strength, then fearless action, then service, then social transformation.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[repeat(11,minmax(0,1fr))] lg:items-stretch">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={stage.label} className="contents">
              <div className="flex min-h-44 flex-col gap-3 rounded-2xl border border-brand/15 bg-card/70 p-5 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-background text-brand">
                  <Icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-base font-semibold">{stage.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
                </div>
              </div>

              {index < stages.length - 1 ? (
                <div className="flex items-center justify-center text-brand/60">
                  <ArrowRight className="hidden size-5 lg:block" />
                  <div className="h-6 w-px bg-brand/25 lg:hidden" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="max-w-2xl border-l-2 border-brand pl-5 font-serif text-xl leading-relaxed text-balance">
        Everything begins with changing how people see themselves.
      </p>
    </section>
  );
}

export { VivekanandaEngine };

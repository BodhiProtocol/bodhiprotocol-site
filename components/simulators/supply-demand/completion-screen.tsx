import Link from "next/link";
import { Lock, PartyPopper } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { Button } from "@/components/ui/button";
import { Eyebrow, H2, Muted } from "@/components/ui/typography";

const RELATED_MENTAL_MODELS = [
  { name: "Price Elasticity", description: "Why some prices barely move demand, and others collapse it." },
  {
    name: "Consumer & Producer Surplus",
    description: "The hidden value everyone captures when a trade happens at all.",
  },
  { name: "Price Ceilings & Floors", description: "What happens when a price isn't allowed to find its own level." },
  { name: "Market Efficiency", description: "Why the equilibrium price is the one that wastes the least." },
];

function CompletionScreen() {
  return (
    <GlassCard className="items-center gap-8 p-8 text-center sm:p-12">
      <div className="flex flex-col items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <PartyPopper className="size-6" />
        </span>
        <Eyebrow className="text-brand">Mental Model Unlocked</Eyebrow>
        <H2>You now understand Supply &amp; Demand</H2>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Muted className="font-mono text-xs tracking-[0.2em] uppercase">
          Continue Your Journey — Related Mental Models
        </Muted>
        <div className="grid gap-4 sm:grid-cols-2">
          {RELATED_MENTAL_MODELS.map((model) => (
            <div
              key={model.name}
              className="group relative flex flex-col gap-2 rounded-2xl border border-dashed border-border p-5 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg hover:shadow-brand/10"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-lg font-medium">{model.name}</span>
                <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                  <Lock className="size-2.5" />
                  Coming soon
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{model.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Button size="lg" nativeButton={false} render={<Link href="/simulators" />}>
        ← Back to Simulators
      </Button>
    </GlassCard>
  );
}

export { CompletionScreen };

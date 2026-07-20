import Link from "next/link";
import { ArrowRight, Lock, PartyPopper } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { Button } from "@/components/ui/button";
import { Eyebrow, H2, Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface RelatedConcept {
  name: string;
  description: string;
  href?: string;
}

const RELATED_CONCEPTS: RelatedConcept[] = [
  {
    name: "Supply & Demand",
    description: "The broader mechanic that an order book is a live, moment-by-moment picture of.",
    href: "/simulators/supply-demand",
  },
  { name: "Liquidity", description: "Why some markets absorb huge orders calmly, and others crack under small ones." },
  { name: "Market Makers", description: "The players who get paid to always quote both a bid and an ask." },
  { name: "Bid-Ask Spread", description: "Why the price you can buy at is never the price you can sell at." },
];

function ConceptCard({ concept }: { concept: RelatedConcept }) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="font-serif text-lg font-medium">{concept.name}</span>
        {concept.href ? (
          <span className="flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-brand uppercase">
            Live <ArrowRight className="size-2.5" />
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
            <Lock className="size-2.5" />
            Coming soon
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{concept.description}</p>
    </>
  );

  const className = cn(
    "group relative flex flex-col gap-2 rounded-2xl border p-5 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg",
    concept.href
      ? "border-brand/20 hover:border-brand/40 hover:shadow-brand/15"
      : "border-dashed border-border hover:border-brand/25 hover:shadow-brand/10",
  );

  if (concept.href) {
    return (
      <Link href={concept.href} className={className}>
        {content}
      </Link>
    );
  }
  return <div className={className}>{content}</div>;
}

function CompletionScreen() {
  return (
    <GlassCard className="items-center gap-8 p-8 text-center sm:p-12">
      <div className="flex flex-col items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <PartyPopper className="size-6" />
        </span>
        <Eyebrow className="text-brand">Mental Model Unlocked</Eyebrow>
        <H2>You now understand Price Discovery</H2>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Muted className="font-mono text-xs tracking-[0.2em] uppercase">
          Continue Your Journey — Related Mental Models
        </Muted>
        <div className="grid gap-4 sm:grid-cols-2">
          {RELATED_CONCEPTS.map((concept) => (
            <ConceptCard key={concept.name} concept={concept} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/simulators" />}>
          ← Back to Simulators
        </Button>
        <Button size="lg" nativeButton={false} render={<Link href="/simulators/supply-demand" />}>
          Next: Supply &amp; Demand →
        </Button>
      </div>
    </GlassCard>
  );
}

export { CompletionScreen };

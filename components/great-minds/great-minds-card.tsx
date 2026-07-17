import Link from "next/link";

import { GlassCard } from "@/components/great-minds/glass-card";
import { Muted } from "@/components/ui/typography";
import type { GreatMind } from "@/types/content";

function GreatMindsCard({ mind }: { mind: GreatMind }) {
  return (
    <Link href={`/great-minds/${mind.slug}`} className="group block h-full">
      <GlassCard className="h-full gap-4 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-brand/15">
        <span className="font-mono text-xs tracking-[0.2em] text-brand uppercase">{mind.era}</span>
        <h3 className="font-serif text-2xl leading-snug font-medium text-balance group-hover:text-brand">
          {mind.name}
        </h3>
        <p className="text-muted-foreground">{mind.positioning}</p>
        <Muted className="mt-auto font-mono text-xs">{mind.lifespan}</Muted>
      </GlassCard>
    </Link>
  );
}

export { GreatMindsCard };

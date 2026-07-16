import Link from "next/link";

import { GlassCard } from "@/components/invisible-businesses/glass-card";
import { Muted } from "@/components/ui/typography";
import type { InvisibleBusiness } from "@/types/content";

function IBCard({ episode }: { episode: InvisibleBusiness }) {
  return (
    <Link href={`/invisible-businesses/${episode.slug}`} className="group block h-full">
      <GlassCard className="h-full gap-4 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-brand/15">
        <span className="font-mono text-xs tracking-[0.2em] text-brand uppercase">
          Episode {String(episode.episode).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-2xl leading-snug font-medium text-balance group-hover:text-brand">
          {episode.title}
        </h3>
        <p className="text-muted-foreground">{episode.description}</p>
        <Muted className="mt-auto font-mono text-xs">{episode.readingTime}</Muted>
      </GlassCard>
    </Link>
  );
}

export { IBCard };

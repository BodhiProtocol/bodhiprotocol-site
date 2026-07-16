import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GlassCard } from "@/components/invisible-businesses/glass-card";
import { Eyebrow } from "@/components/ui/typography";
import type { InvisibleBusinessNextEpisode } from "@/types/content";

function NextEpisodeCta({ nextEpisode }: { nextEpisode?: InvisibleBusinessNextEpisode }) {
  if (!nextEpisode) return null;

  const body = (
    <GlassCard className="items-center gap-3 text-center transition-transform duration-300 group-hover:-translate-y-1">
      <p className="font-serif text-lg text-muted-foreground">
        See what companies really sell.
      </p>
      <Eyebrow className="text-brand">Next Episode</Eyebrow>
      <p className="max-w-xl font-serif text-2xl font-medium text-balance sm:text-3xl">
        {nextEpisode.title}
      </p>
      <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        {nextEpisode.comingSoon ? "Coming soon" : "Read now"}
        <ArrowRight className="size-4" />
      </span>
    </GlassCard>
  );

  if (nextEpisode.comingSoon || !nextEpisode.slug) {
    return <div className="group">{body}</div>;
  }

  return (
    <Link href={`/invisible-businesses/${nextEpisode.slug}`} className="group block">
      {body}
    </Link>
  );
}

export { NextEpisodeCta };

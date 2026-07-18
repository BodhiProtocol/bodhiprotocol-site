import Link from "next/link";
import { Users } from "lucide-react";

import { GlassCard } from "@/components/great-minds/glass-card";
import { Eyebrow, H2 } from "@/components/ui/typography";

export interface RelatedMindDisplay {
  name: string;
  slug?: string;
  era?: string;
  positioning?: string;
}

function GreatMindsRelated({ related = [] }: { related?: RelatedMindDisplay[] }) {
  return (
    <section id="related-minds" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">Keep Exploring</Eyebrow>
        <H2>Related Great Minds</H2>
      </div>

      {related.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-10 text-center">
          <Users className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            More Great Minds — each with their own way of thinking — are coming soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((mind) =>
            mind.slug ? (
              <Link href={`/great-minds/${mind.slug}`} key={mind.name} className="group block h-full">
                <GlassCard className="h-full gap-2 p-5 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-brand/15 sm:p-6">
                  {mind.era ? (
                    <span className="font-mono text-xs tracking-[0.15em] text-brand uppercase">{mind.era}</span>
                  ) : null}
                  <h3 className="font-serif text-lg font-medium text-balance group-hover:text-brand">
                    {mind.name}
                  </h3>
                  {mind.positioning ? (
                    <p className="text-sm text-muted-foreground">{mind.positioning}</p>
                  ) : null}
                </GlassCard>
              </Link>
            ) : (
              <div
                key={mind.name}
                className="flex h-full flex-col justify-center gap-1 rounded-2xl border border-dashed border-border p-5 text-center opacity-60 sm:p-6"
              >
                <p className="text-sm font-medium text-foreground">{mind.name}</p>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}

export { GreatMindsRelated };

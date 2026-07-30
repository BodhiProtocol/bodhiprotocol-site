import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { H3, Muted } from "@/components/ui/typography";
import { getEssayHook } from "@/lib/essay-hooks";
import type { Essay } from "@/types/content";

function ReadNextEssays({ essays }: { essays: Essay[] }) {
  if (essays.length === 0) return null;

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-border bg-muted/60 p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <H3>Continue the system</H3>
        <Muted>
          A curated path through the next concept, so one essay becomes a map.
        </Muted>
      </div>
      <div className="grid gap-3">
        {essays.map((essay, index) => (
          <Link
            key={essay.slug}
            href={`/essays/${essay.slug}`}
            className="group block"
          >
            <Card
              size="sm"
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-bold text-brand">
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-base leading-snug font-medium text-balance group-hover:text-brand">
                  {essay.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground text-pretty">
                  {getEssayHook(essay)}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { ReadNextEssays };

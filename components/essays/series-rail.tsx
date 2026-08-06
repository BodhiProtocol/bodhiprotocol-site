import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Muted } from "@/components/ui/typography";
import type { EssaySeries } from "@/lib/series";
import type { Essay } from "@/types/content";

function totalMinutes(essays: Essay[]) {
  return essays.reduce((sum, essay) => {
    const minutes = Number.parseInt(essay.readingTime, 10);
    return Number.isFinite(minutes) ? sum + minutes : sum;
  }, 0);
}

interface SeriesRailProps {
  series: EssaySeries;
  essays: Essay[];
  /** When set, parts outside the active category are dimmed rather than removed. */
  activeCategory: string | null;
}

function SeriesRail({ series, essays, activeCategory }: SeriesRailProps) {
  const Icon = series.icon;
  const minutes = totalMinutes(essays);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <Icon className="size-4.5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-lg leading-snug font-medium text-balance">
                {series.title}
              </h2>
              {series.recommendedStart ? (
                <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-brand px-2 text-[0.65rem] font-semibold tracking-wide text-brand-foreground uppercase">
                  Start here
                </span>
              ) : null}
            </div>
            <Muted className="text-sm text-pretty">{series.blurb}</Muted>
          </div>
        </div>
        <Muted className="shrink-0 font-mono text-xs">
          {essays.length} parts{minutes > 0 ? ` · ${minutes} min` : ""}
        </Muted>
      </div>

      <ol className="-mx-1 flex snap-x snap-mandatory items-stretch gap-1 overflow-x-auto px-1 pb-2">
        {essays.map((essay, index) => {
          const dimmed = Boolean(activeCategory && essay.category !== activeCategory);

          return (
            <li key={essay.slug} className="flex shrink-0 items-center gap-1">
              <Link
                href={`/essays/${essay.slug}`}
                data-dimmed={dimmed}
                className="group flex h-full w-44 snap-start flex-col gap-2 rounded-xl bg-card p-3 ring-1 ring-foreground/10 transition-[transform,box-shadow,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/15 hover:ring-brand/60 data-[dimmed=true]:opacity-40 sm:w-48"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-[0.7rem] font-bold text-brand">
                  {index + 1}
                </span>
                <span className="font-heading text-sm leading-snug font-medium text-balance group-hover:text-brand">
                  {essay.title}
                </span>
                <Muted className="mt-auto font-mono text-[0.7rem]">
                  {essay.readingTime}
                </Muted>
              </Link>
              {index < essays.length - 1 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground/50"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export { SeriesRail };

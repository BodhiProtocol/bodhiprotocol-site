import Link from "next/link";
import { ArrowRight, Waypoints } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";

function ConceptMapCallout({ essayCount }: { essayCount: number }) {
  return (
    <Link
      href="/essays/map"
      aria-label="Explore the essay concept map"
      className="group block"
    >
      <Card
        size="sm"
        className="flex flex-wrap items-center justify-between gap-4 p-4 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60 sm:p-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Waypoints className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block font-heading text-base leading-snug font-medium text-balance group-hover:text-brand">
              All {essayCount} essays as one connected map
            </span>
            <Muted className="text-sm">
              Seven reading lines, and the interchanges where one idea reappears
              inside another
            </Muted>
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand">
          Explore the map
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Card>
    </Link>
  );
}

export { ConceptMapCallout };

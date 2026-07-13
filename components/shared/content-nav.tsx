import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Muted } from "@/components/ui/typography";

interface NavItem {
  slug: string;
  title: string;
}

function ContentNav({
  previous,
  next,
  basePath,
}: {
  previous: NavItem | null;
  next: NavItem | null;
  basePath: string;
}) {
  if (!previous && !next) return null;

  return (
    <nav className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`${basePath}/${previous.slug}`}
          className="group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-foreground/30"
        >
          <Muted className="flex items-center gap-1 text-xs">
            <ArrowLeft className="size-3.5" />
            Previous
          </Muted>
          <span className="font-heading text-sm font-medium group-hover:text-brand">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:border-foreground/30"
        >
          <Muted className="flex items-center gap-1 text-xs">
            Next
            <ArrowRight className="size-3.5" />
          </Muted>
          <span className="font-heading text-sm font-medium group-hover:text-brand">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}

export { ContentNav };

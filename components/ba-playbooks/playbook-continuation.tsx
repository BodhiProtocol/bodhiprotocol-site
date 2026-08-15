import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Playbook } from "@/types/content";

interface PlaybookContinuationProps {
  guide: Playbook;
}

/**
 * Quiet editorial hand-off used by the BA Playbook continuation pilot.
 * Intentionally not a card grid: one relevant next step, plenty of whitespace,
 * and no attempt to keep the reader clicking for its own sake.
 */
function PlaybookContinuation({ guide }: PlaybookContinuationProps) {
  return (
    <div className="not-prose border-t border-border pt-8">
      <p className="mb-3 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
        Continue your BA journey
      </p>
      <Link
        href={`/ba-playbooks/${guide.slug}`}
        className="group inline-flex max-w-2xl flex-col gap-1.5"
      >
        <span className="inline-flex items-center gap-2 font-heading text-lg leading-snug font-medium text-foreground sm:text-xl">
          {guide.title}
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {guide.description}
        </span>
      </Link>
    </div>
  );
}

export { PlaybookContinuation };

"use client";

import { cn } from "@/lib/utils";
import { useActiveHack } from "@/components/ba-playbooks/use-active-hack";
import type { PlaybookHack } from "@/types/content";

interface PlaybookProgressProps {
  hacks: Pick<PlaybookHack, "number" | "title">[];
  label?: string;
}

// Desktop sticky sidebar — same slot Table of Contents occupies on essays.
// Doubles as a progress indicator: the active hack highlights as the reader scrolls.
function PlaybookProgress({ hacks, label = "In this playbook" }: PlaybookProgressProps) {
  const { active, jumpTo } = useActiveHack(hacks);

  return (
    <nav aria-label="Playbook progress" className="flex flex-col gap-2 text-sm">
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </p>
      <ul className="flex flex-col gap-1">
        {hacks.map((hack) => (
          <li key={hack.number}>
            <button
              type="button"
              onClick={() => jumpTo(hack.number)}
              aria-current={active === hack.number}
              className={cn(
                "flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors",
                active === hack.number
                  ? "bg-brand/10 text-brand"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="font-mono text-xs">{String(hack.number).padStart(2, "0")}</span>
              <span className="line-clamp-2">{hack.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface PlaybookProgressBarProps extends PlaybookProgressProps {
  jumpAriaPrefix?: string;
}

// Mobile sticky strip beneath the navbar — same active-hack state, condensed to numbered chips.
// jumpAriaPrefix is a plain string (not a function) so this prop stays serializable
// across the server/client boundary when the page component passes it in.
function PlaybookProgressBar({ hacks, jumpAriaPrefix = "Jump to hack" }: PlaybookProgressBarProps) {
  const { active, jumpTo } = useActiveHack(hacks);

  return (
    <div className="sticky top-16 z-30 -mx-6 border-b border-border bg-background/95 px-6 py-3 backdrop-blur-sm lg:hidden">
      <div className="flex gap-2 overflow-x-auto">
        {hacks.map((hack) => (
          <button
            key={hack.number}
            type="button"
            onClick={() => jumpTo(hack.number)}
            aria-current={active === hack.number}
            aria-label={`${jumpAriaPrefix} ${hack.number}: ${hack.title}`}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-medium transition-colors",
              active === hack.number
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border text-muted-foreground hover:border-foreground/30",
            )}
          >
            {hack.number}
          </button>
        ))}
      </div>
    </div>
  );
}

export { PlaybookProgress, PlaybookProgressBar };

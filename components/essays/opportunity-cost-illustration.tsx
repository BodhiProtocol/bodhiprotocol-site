"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const options = [
  { rank: 1, label: "Take the job offer", tag: "CHOSEN", tone: "brand" as const },
  { rank: 2, label: "Freelance consulting", tag: "THE COST", tone: "rose" as const },
  { rank: 3, label: "Grad school", tag: null, tone: "muted" as const },
  { rank: 4, label: "Do nothing", tag: null, tone: "muted" as const },
];

function OpportunityCostIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        CHOOSING AMONG 4 OPTIONS
      </div>

      <div className="flex flex-col gap-1.5">
        {options.map((option, i) => (
          <div
            key={option.label}
            className={
              option.tone === "muted"
                ? "flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-2.5 py-2 opacity-50"
                : "flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-2.5 py-2"
            }
            style={{
              opacity: played ? (option.tone === "muted" ? 0.5 : 1) : 0,
              transform: played ? "translateX(0)" : "translateX(-4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 180}ms, transform 350ms ease ${i * 180}ms`,
            }}
          >
            <span className="flex items-center gap-2">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-border text-[8px] font-bold text-muted-foreground">
                {option.rank}
              </span>
              <span className="text-[10px] font-semibold text-card-foreground">{option.label}</span>
            </span>
            {option.tag ? (
              <span
                className={
                  option.tone === "brand"
                    ? "shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand"
                    : "shrink-0 rounded-full bg-rose-600/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500"
                }
              >
                {option.tag}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          NOT #2 + #3 + #4
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">JUST THE NEXT BEST</span>
      </div>
    </div>
  );
}

export { OpportunityCostIllustration };

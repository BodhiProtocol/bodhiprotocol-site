"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function RogueTradingIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        ROGUE TRADING · WHO CHECKS THE TRADE
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-2.5 text-center"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "translateY(0)" : "translateY(4px)",
            transition: reducedMotion ? "none" : "opacity 350ms ease 100ms, transform 350ms ease 100ms",
          }}
        >
          <span className="text-[8px] font-bold tracking-wide text-brand">SEGREGATED (INTENDED)</span>
          <span className="w-fit rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand">
            MAKER
          </span>
          <span className="text-muted-foreground" aria-hidden="true">
            ↓
          </span>
          <span className="w-fit rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand">
            CHECKER
          </span>
          <span className="mt-1 text-[9px] font-bold text-brand" aria-hidden="true">
            ✓ INDEPENDENT
          </span>
        </div>

        <div
          className="flex flex-col items-center gap-2 rounded-lg border border-rose-600/30 bg-card p-2.5 text-center dark:border-rose-500/30"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "translateY(0)" : "translateY(4px)",
            transition: reducedMotion ? "none" : "opacity 350ms ease 450ms, transform 350ms ease 450ms",
          }}
        >
          <span className="text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
            COLLAPSED (WHAT FAILED)
          </span>
          <div className="flex w-fit flex-col overflow-hidden rounded-md border-2 border-rose-600/70 dark:border-rose-500/70">
            <span className="px-3 py-1 text-center text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
              MAKER
            </span>
            <span className="border-t border-dashed border-rose-600/50 px-3 py-1 text-center text-[8px] font-bold tracking-wide text-rose-600 dark:border-rose-500/50 dark:text-rose-500">
              CHECKER
            </span>
          </div>
          <span className="mt-1 text-[9px] font-bold text-rose-600 dark:text-rose-500" aria-hidden="true">
            ✕ 1 LOGIN, BOTH ROLES
          </span>
        </div>
      </div>

      <div
        className="mt-3 flex items-center justify-center rounded-full bg-rose-600/10 py-1.5 text-center text-[9px] font-bold tracking-wide text-rose-600 dark:text-rose-500"
        style={{
          opacity: played ? 1 : 0,
          transition: reducedMotion ? "none" : "opacity 350ms ease 850ms",
        }}
      >
        WHATEVER THE COLLAPSED ROLE REPORTS BECOMES TRUE
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          BARINGS: 1 PERSON, 3 YEARS
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">PNB: 0 RECONCILIATION, 7 YEARS</span>
      </div>
    </div>
  );
}

export { RogueTradingIllustration };

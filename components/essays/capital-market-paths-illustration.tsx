"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function CapitalMarketPathsIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion
      ? "none"
      : `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
  });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-muted p-4 font-mono text-[10px] text-foreground sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
        <span className="font-bold uppercase text-muted-foreground">
          Capital market system
        </span>
        <span className="rounded-full bg-brand px-2.5 py-1 font-bold uppercase text-brand-foreground">
          Two paths
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div
          className="rounded-xl border border-blue-500/25 bg-blue-500/10 p-3"
          style={reveal(0)}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold uppercase text-blue-600 dark:text-blue-300">
              Trader
            </span>
            <span className="text-muted-foreground">capture move</span>
          </div>
          <div className="relative h-44 overflow-hidden rounded-lg bg-background">
            <span className="absolute left-[17%] top-[13%] grid size-11 place-items-center rounded-full border border-blue-500/40 bg-card text-center font-bold leading-tight text-blue-600 dark:text-blue-300">
              Signal
            </span>
            <span className="absolute right-[17%] top-[30%] grid size-11 place-items-center rounded-full border border-blue-500/40 bg-card text-center font-bold leading-tight text-blue-600 dark:text-blue-300">
              Access
            </span>
            <span className="absolute left-[16%] top-[57%] grid size-11 place-items-center rounded-full border border-blue-500/40 bg-card text-center font-bold leading-tight text-blue-600 dark:text-blue-300">
              Trade
            </span>
            <span className="absolute bottom-[9%] right-[18%] grid size-11 place-items-center rounded-full border border-blue-500/40 bg-card text-center font-bold leading-tight text-blue-600 dark:text-blue-300">
              Exit
            </span>
            <span className="absolute left-[29%] top-[27%] h-1 w-[42%] rotate-[24deg] rounded-full bg-blue-500" />
            <span className="absolute left-[28%] top-[52%] h-1 w-[45%] rotate-[-24deg] rounded-full bg-blue-500" />
            <span className="absolute left-[31%] top-[76%] h-1 w-[43%] rotate-[24deg] rounded-full bg-blue-500" />
          </div>
          <div className="mt-3 rounded-lg bg-background px-3 py-2 font-bold">
            What can move now?
          </div>
        </div>

        <div
          className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3"
          style={reveal(130)}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold uppercase text-emerald-700 dark:text-emerald-300">
              Portfolio manager
            </span>
            <span className="text-muted-foreground">build system</span>
          </div>
          <div className="grid gap-2 rounded-lg bg-background p-3">
            <div className="rounded-lg border border-emerald-500/40 bg-card px-3 py-2 text-center font-bold text-emerald-700 dark:text-emerald-300">
              Mandate
            </div>
            <div className="rounded-lg border border-emerald-500/40 bg-card px-3 py-2 text-center font-bold text-emerald-700 dark:text-emerald-300">
              Strategy
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Bank", "IT", "Bond"].map((asset) => (
                <div
                  key={asset}
                  className="rounded-lg border border-emerald-500/40 bg-card px-2 py-3 text-center font-bold text-emerald-700 dark:text-emerald-300"
                >
                  {asset}
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-emerald-500/40 bg-card px-3 py-2 text-center font-bold text-emerald-700 dark:text-emerald-300">
              Benchmark
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-background px-3 py-2 font-bold">
            What should belong in the basket?
          </div>
        </div>
      </div>

      <div
        className="mt-4 rounded-xl border border-border bg-card p-3 text-center"
        style={reveal(260)}
      >
        <span className="font-bold uppercase text-muted-foreground">
          Same stock
        </span>
        <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <span className="rounded-lg bg-blue-500/10 px-3 py-2 font-bold text-blue-600 dark:text-blue-300">
            one move
          </span>
          <span className="font-bold uppercase text-brand">different role</span>
          <span className="rounded-lg bg-emerald-500/10 px-3 py-2 font-bold text-emerald-700 dark:text-emerald-300">
            one component
          </span>
        </div>
      </div>
    </div>
  );
}

export { CapitalMarketPathsIllustration };

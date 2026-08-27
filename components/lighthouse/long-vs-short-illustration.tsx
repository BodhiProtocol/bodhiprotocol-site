"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const rows = [
  { label: "LONG", rises: "+20%", risesGood: true, falls: "−20%", fallsGood: false },
  { label: "SHORT", rises: "−20%", risesGood: false, falls: "+20%", fallsGood: true },
];

function LongVsShortIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 grid grid-cols-[3.5rem_1fr_1fr] gap-2 text-[9px] font-bold tracking-wide">
        <span className="text-muted-foreground">POSITION</span>
        <span className="text-center text-muted-foreground">PRICE RISES</span>
        <span className="text-center text-muted-foreground">PRICE FALLS</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="grid grid-cols-[3.5rem_1fr_1fr] items-center gap-2 rounded-lg border border-border bg-card px-2 py-2"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateY(0)" : "translateY(4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 220}ms, transform 350ms ease ${i * 220}ms`,
            }}
          >
            <span className="text-[9px] font-bold tracking-wide text-card-foreground">
              {row.label}
            </span>
            <span
              className={`text-center text-[10px] font-bold ${
                row.risesGood ? "text-brand" : "text-rose-600 dark:text-rose-500"
              }`}
            >
              {row.rises}
            </span>
            <span
              className={`text-center text-[10px] font-bold ${
                row.fallsGood ? "text-brand" : "text-rose-600 dark:text-rose-500"
              }`}
            >
              {row.falls}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          SAME PRICE MOVE
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">OPPOSITE OUTCOME</span>
      </div>
    </div>
  );
}

export { LongVsShortIllustration };

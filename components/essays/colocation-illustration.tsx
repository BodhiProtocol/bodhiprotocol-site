"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface FeedColumn {
  label: string;
  arrivalLabel: string;
  delay: number;
  tone: "brand" | "rose";
}

const columns: FeedColumn[] = [
  { label: "PAID / COLOCATED FEED", arrivalLabel: "ARRIVES FIRST", delay: 320, tone: "brand" },
  { label: "PUBLIC FEED (MANDATORY)", arrivalLabel: "ARRIVES LATER", delay: 760, tone: "rose" },
];

function ColocationIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        COLOCATION · SAME UPDATE, TWO ARRIVAL TIMES
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <span
          className="size-2.5 shrink-0 rounded-full bg-card-foreground"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "scale(1)" : "scale(0)",
            transition: reducedMotion ? "none" : "opacity 250ms ease, transform 250ms cubic-bezier(.34,1.56,.64,1)",
          }}
        />
        <span
          className="text-[10px] font-semibold text-card-foreground"
          style={{
            opacity: played ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 300ms ease 80ms",
          }}
        >
          Exchange emits one price update
        </span>
        <span
          className="h-3 w-px bg-border"
          style={{
            opacity: played ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 250ms ease 150ms",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-border pt-3">
        {columns.map((column) => (
          <div key={column.label} className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-[8px] leading-tight font-bold tracking-wide text-muted-foreground">
              {column.label}
            </span>
            <span
              className="h-5 w-px bg-border"
              style={{
                opacity: played ? 1 : 0,
                transition: reducedMotion ? "none" : `opacity 300ms ease ${column.delay - 100}ms`,
              }}
            />
            <span
              className={
                column.tone === "brand"
                  ? "size-2.5 shrink-0 rounded-full bg-brand"
                  : "size-2.5 shrink-0 rounded-full bg-rose-600 dark:bg-rose-500"
              }
              style={{
                opacity: played ? 1 : 0,
                transform: played ? "scale(1)" : "scale(0)",
                transition: reducedMotion
                  ? "none"
                  : `opacity 250ms ease ${column.delay}ms, transform 250ms cubic-bezier(.34,1.56,.64,1) ${column.delay}ms`,
              }}
            />
            <span
              className={
                column.tone === "brand"
                  ? "rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand"
                  : "rounded-full bg-rose-600/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500"
              }
              style={{
                opacity: played ? 1 : 0,
                transition: reducedMotion ? "none" : `opacity 250ms ease ${column.delay + 100}ms`,
              }}
            >
              {column.arrivalLabel}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-3 flex items-center justify-center rounded-full bg-rose-600/10 py-1.5 text-center text-[9px] font-bold tracking-wide text-rose-600 dark:text-rose-500"
        style={{
          opacity: played ? 1 : 0,
          transition: reducedMotion ? "none" : "opacity 350ms ease 1050ms",
        }}
      >
        GAP = TRADEABLE WINDOW BEFORE THE PUBLIC FEED CATCHES UP
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          ₹625 CR NSE DISGORGEMENT
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">$5M FIRST SEC FINE ON AN EXCHANGE</span>
      </div>
    </div>
  );
}

export { ColocationIllustration };

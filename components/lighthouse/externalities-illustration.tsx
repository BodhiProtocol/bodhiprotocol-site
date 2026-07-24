"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const rows = [
  { who: "Smoker", action: "Buys and enjoys the cigarette", tag: "IN THE DEAL", tone: "brand" as const },
  { who: "Everyone else", action: "Breathes the smoke", tag: "NOT IN THE DEAL", tone: "rose" as const },
];

function ExternalitiesIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        THE SMOKER&apos;S ROOM
      </div>

      <div className="flex flex-col gap-1.5">
        {rows.map((row, i) => (
          <div
            key={row.who}
            className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-2.5 py-2"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateX(0)" : "translateX(-4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 250}ms, transform 350ms ease ${i * 250}ms`,
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
                {row.who}
              </span>
              <span className="text-[10px] leading-snug text-card-foreground">{row.action}</span>
            </div>
            <span
              className={
                row.tone === "brand"
                  ? "shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand"
                  : "shrink-0 rounded-full bg-rose-600/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500"
              }
            >
              {row.tag}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">PRICED</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">UNPRICED SPILLOVER</span>
      </div>
    </div>
  );
}

export { ExternalitiesIllustration };

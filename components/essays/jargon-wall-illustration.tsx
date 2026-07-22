"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const terms = [
  {
    wall: "CAPITAL MARKETS",
    term: "Novation",
    plain: "The clearinghouse steps in as the new counterparty — your risk is now to them.",
  },
  {
    wall: "TECHNICAL",
    term: "Star Schema",
    plain: "One big fact table surrounded by lookup tables — built for reporting, not edits.",
  },
];

function JargonWallIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        TWO WALLS · ONE TRANSLATOR
      </div>

      <div className="flex flex-col gap-2.5">
        {terms.map((item, i) => {
          const delay = i * 260;
          return (
            <div
              key={item.term}
              className="rounded-lg border border-border bg-card p-2.5"
              style={{
                opacity: played ? 1 : 0,
                transform: played ? "translateY(0)" : "translateY(4px)",
                transition: reducedMotion
                  ? "none"
                  : `opacity 400ms ease ${delay}ms, transform 400ms ease ${delay}ms`,
              }}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-card-foreground">{item.term}</span>
                <span
                  className={
                    item.wall === "CAPITAL MARKETS"
                      ? "shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-brand"
                      : "shrink-0 rounded-full border border-border px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-muted-foreground"
                  }
                >
                  {item.wall}
                </span>
              </div>
              <p className="text-[10px] leading-snug text-muted-foreground italic">{item.plain}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          99+ · 116 TERMS
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">1 SENTENCE, PLAIN</span>
      </div>
    </div>
  );
}

export { JargonWallIllustration };

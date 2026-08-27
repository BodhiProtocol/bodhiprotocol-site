"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const quotes = [
  { label: "LIQUID STOCK", bid: "₹100.00", ask: "₹100.02", gapWidth: 12 },
  { label: "ILLIQUID STOCK", bid: "₹100.00", ask: "₹100.40", gapWidth: 60 },
];

function BidAskSpreadIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        SAME ASSET · SAME MOMENT
      </div>

      <div className="flex flex-col gap-3">
        {quotes.map((quote, i) => (
          <div
            key={quote.label}
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "translateY(0)" : "translateY(4px)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 250}ms, transform 350ms ease ${i * 250}ms`,
            }}
          >
            <div className="mb-1 text-[9px] font-bold tracking-wide text-muted-foreground">
              {quote.label}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 rounded-md border border-border bg-card px-2 py-1 text-[10px] font-bold text-card-foreground">
                BID {quote.bid}
              </span>
              <span
                className="h-px flex-1 bg-brand/40"
                style={{
                  width: played ? `${quote.gapWidth}%` : "0%",
                  transition: reducedMotion ? "none" : `width 450ms ease ${i * 250 + 150}ms`,
                }}
              />
              <span className="shrink-0 rounded-md border border-brand/30 bg-brand/10 px-2 py-1 text-[10px] font-bold text-brand">
                ASK {quote.ask}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          MORE COMPETING QUOTES
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">NARROWER SPREAD</span>
      </div>
    </div>
  );
}

export { BidAskSpreadIllustration };

"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const dominoes = [
  {
    step: "01",
    label: "Direct exposure",
    detail: "Bank B holds Bank A's debt directly",
    tone: "fall" as const,
  },
  {
    step: "02",
    label: "Fire sale",
    detail: "Bank B sells assets fast, price drops for everyone holding them",
    tone: "fall" as const,
  },
  {
    step: "03",
    label: "Liquidity freeze",
    detail: "Lenders stop rolling funding for anyone who looks like Bank A",
    tone: "fall" as const,
  },
  {
    step: "04",
    label: "Confidence",
    detail: "A healthy Bank C sees a run anyway, on rumor alone",
    tone: "wobble" as const,
  },
  {
    step: "05",
    label: "Backstop",
    detail: "Central bank steps in as lender of last resort",
    tone: "hold" as const,
  },
];

function FinancialDominoesIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number, rotate: string) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0) rotate(0deg)" : `translateY(8px) rotate(${rotate})`,
    transition: reducedMotion
      ? "none"
      : `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>CONTAGION CHAIN</span>
          <span>BANK A DEFAULTS ON ₹80 CR</span>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-4">
          <div>
            <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
              Does it stop here?
            </div>
            <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
              One default. Four channels it can travel through.
            </div>
          </div>
          <div className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[9px] font-bold tracking-wide text-brand">
            4 CHANNELS
          </div>
        </div>
      </div>

      <div className="space-y-2 p-4">
        {dominoes.map((domino, index) => {
          const isHold = domino.tone === "hold";
          const isWobble = domino.tone === "wobble";
          const rotate = isHold ? "0deg" : isWobble ? "-3deg" : "-6deg";

          return (
            <div
              key={domino.step}
              className={`rounded-lg border p-3 ${
                isHold
                  ? "border-brand bg-brand/10 text-card-foreground"
                  : "border-border bg-card text-card-foreground"
              }`}
              style={reveal(index * 140, rotate)}
            >
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ${
                      isHold ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {domino.step}
                  </span>
                  <span className="text-[10px] font-bold tracking-wide">{domino.label}</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[8px] font-bold tracking-wide ${
                    isHold ? "bg-brand text-brand-foreground" : "bg-muted-foreground/15 text-muted-foreground"
                  }`}
                >
                  {isHold ? "HOLDS" : "FALLS"}
                </span>
              </div>
              <div className="text-[9px] font-bold leading-snug tracking-wide text-muted-foreground">
                {domino.detail}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground"
        style={reveal(dominoes.length * 140, "0deg")}
      >
        4 CHANNELS · 1 FIREBREAK
      </div>
    </div>
  );
}

export { FinancialDominoesIllustration };

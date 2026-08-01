"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const preMatch = [
  { label: "OMS", tag: "CHECK" },
  { label: "EMS", tag: "ROUTE" },
  { label: "FIX Protocol", tag: "TRANSLATE" },
  { label: "Exchange Gateway", tag: "ENTER" },
  { label: "Matching Engine", tag: "MATCH" },
];

const postMatch = [
  { label: "CCP", tag: "GUARANTEE" },
  { label: "SWIFT", tag: "MESSAGE" },
  { label: "Custodian", tag: "HOLD" },
];

function MarketInfrastructureIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        ONE ORDER · THE INFRASTRUCTURE UNDERNEATH
      </div>

      <div
        className="mb-3 rounded-lg border border-dashed border-border bg-card px-2.5 py-1.5 text-center text-[9px] font-bold tracking-wide text-muted-foreground"
        style={fade(0)}
      >
        MARKET DATA · FEEDS EVERY STEP BELOW
      </div>

      <div className="flex flex-col">
        {preMatch.map((stage, i) => {
          const delay = 150 + i * 150;
          return (
            <div key={stage.label} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <span
                  className="mt-0.5 size-2.5 shrink-0 rounded-full bg-brand"
                  style={{
                    opacity: played ? 1 : 0,
                    transform: played ? "scale(1)" : "scale(0)",
                    transition: reducedMotion
                      ? "none"
                      : `opacity 250ms ease ${delay}ms, transform 250ms cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
                  }}
                />
                <span
                  className="w-px flex-1 bg-border"
                  style={{
                    opacity: played ? 1 : 0,
                    transition: reducedMotion ? "none" : `opacity 300ms ease ${delay + 120}ms`,
                  }}
                />
              </div>
              <div
                className="flex flex-1 items-center justify-between gap-2 pb-3"
                style={{
                  opacity: played ? 1 : 0,
                  transform: played ? "translateX(0)" : "translateX(-4px)",
                  transition: reducedMotion
                    ? "none"
                    : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
                }}
              >
                <span className="text-[10px] leading-snug font-semibold text-card-foreground">
                  {stage.label}
                </span>
                <span className="shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-brand">
                  {stage.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-1 flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wide text-brand" style={fade(900)}>
        MATCHED ↓
      </div>

      <div className="mt-2 flex flex-col">
        {postMatch.map((stage, i) => {
          const isLast = i === postMatch.length - 1;
          const delay = 1050 + i * 150;
          return (
            <div key={stage.label} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <span
                  className="mt-0.5 size-2.5 shrink-0 rounded-full bg-brand"
                  style={{
                    opacity: played ? 1 : 0,
                    transform: played ? "scale(1)" : "scale(0)",
                    transition: reducedMotion
                      ? "none"
                      : `opacity 250ms ease ${delay}ms, transform 250ms cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
                  }}
                />
                {!isLast ? (
                  <span
                    className="w-px flex-1 bg-border"
                    style={{
                      opacity: played ? 1 : 0,
                      transition: reducedMotion ? "none" : `opacity 300ms ease ${delay + 120}ms`,
                    }}
                  />
                ) : null}
              </div>
              <div
                className="flex flex-1 items-center justify-between gap-2 pb-3"
                style={{
                  opacity: played ? 1 : 0,
                  transform: played ? "translateX(0)" : "translateX(-4px)",
                  transition: reducedMotion
                    ? "none"
                    : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
                }}
              >
                <span className="text-[10px] leading-snug font-semibold text-card-foreground">
                  {stage.label}
                </span>
                <span className="shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-brand">
                  {stage.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">9 SYSTEMS</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">NEVER SEEN</span>
      </div>
    </div>
  );
}

export { MarketInfrastructureIllustration };

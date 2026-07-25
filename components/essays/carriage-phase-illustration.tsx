"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const eras = [
  { year: "1908", label: "Automobile", known: true },
  { year: "1895", label: "Cinema", known: true },
  { year: "1994", label: "Website", known: true },
  { year: "20XX", label: "AI", known: false },
];

function CarriagePhaseIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        THE SHAPE THAT SURVIVES THE SHIFT
      </div>

      <div className="grid grid-cols-4 gap-2">
        {eras.map((era, i) => {
          const delay = i * 220;
          return (
            <div key={era.label} className="flex flex-col items-center gap-1.5">
              <svg viewBox="0 0 44 52" className="h-[62px] w-full">
                <rect
                  x="3"
                  y="6"
                  width="38"
                  height="40"
                  rx="8"
                  fill="none"
                  className="stroke-muted-foreground/45"
                  strokeWidth="1.6"
                  strokeDasharray="3 3"
                  style={{
                    opacity: played ? 1 : 0,
                    transition: reducedMotion ? "none" : `opacity 400ms ease ${delay}ms`,
                  }}
                />
                {era.known ? (
                  <rect
                    x="12"
                    y="16"
                    width="24"
                    height="24"
                    rx="6"
                    className="fill-brand"
                    style={{
                      opacity: played ? 1 : 0,
                      transform: played ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(-8deg)",
                      transformOrigin: "24px 28px",
                      transition: reducedMotion
                        ? "none"
                        : `opacity 350ms ease ${delay + 180}ms, transform 400ms cubic-bezier(.34,1.56,.64,1) ${delay + 180}ms`,
                    }}
                  />
                ) : (
                  <text
                    x="22"
                    y="33"
                    textAnchor="middle"
                    className="fill-brand text-[15px] font-bold"
                    style={{
                      opacity: played ? 1 : 0,
                      transition: reducedMotion ? "none" : `opacity 350ms ease ${delay + 180}ms`,
                      animation:
                        played && !reducedMotion ? `ob-pulse 2s ease-out ${delay + 700}ms infinite` : undefined,
                    }}
                  >
                    ?
                  </text>
                )}
              </svg>
              <span className="text-[8px] font-bold tracking-wide text-muted-foreground">{era.year}</span>
              <span className="text-[9px] font-bold text-card-foreground">{era.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">SAME SHAPE, NEW ENGINE</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">NEW SHAPE: UNWRITTEN</span>
      </div>
    </div>
  );
}

export { CarriagePhaseIllustration };

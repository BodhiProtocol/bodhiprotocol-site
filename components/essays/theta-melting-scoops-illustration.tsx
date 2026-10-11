"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Scoops are sized by area (radius ∝ √value) so the picture doesn't exaggerate.
// Illustrative at-the-money option, nothing else changing: time value
// shrinks with the square root of days left (a textbook approximation).
const DAYS = [60, 30, 7, 1, 0];
const share = (days: number) => Math.sqrt(days / 60);

const MAX_R = 26;
const COLS = [30, 90, 150, 210, 270];
const CONE_TOP = 78;
const CONE_TIP = 108;

const pct = (value: number) => `${Math.round(value * 100)}%`;
// First 30 days vs last 7 days, in share of the starting time value.
const firstThirty = share(60) - share(30);
const lastSeven = share(7) - share(0);

function ThetaMeltingScoopsIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>THETA · TIME VALUE LEFT</span>
          <span>ONE OPTION, FIVE MOMENTS</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            It melts fastest at the end.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            Same option. Nothing changes except the days left.
          </div>
        </div>
      </div>

      <div className="p-4">
        <svg
          viewBox="0 0 300 150"
          className="h-auto w-full"
          role="img"
          aria-label="Time value left at 60, 30, 7, 1 and 0 days to expiry: 100%, 71%, 34%, 13%, 0%"
        >
          {/* Bracket over the last week, where short-dated buyers sit. */}
          <g style={reveal(1300)}>
            <path
              d={`M${COLS[2] - 24},16 V10 H${COLS[4] + 24} V16`}
              fill="none"
              className="stroke-brand"
              strokeWidth={1}
            />
            <text x={(COLS[2] + COLS[4]) / 2} y={6} textAnchor="middle" className="fill-brand text-[7px] font-bold">
              WEEKLY NIFTY · SAME-DAY SPX BUYERS
            </text>
          </g>

          {DAYS.map((days, index) => {
            const value = share(days);
            const x = COLS[index];
            return (
              <g key={days}>
                <polygon
                  points={`${x - 11},${CONE_TOP} ${x + 11},${CONE_TOP} ${x},${CONE_TIP}`}
                  className="fill-amber-600/60 dark:fill-amber-500/50"
                />
                {days > 0 ? (
                  <g
                    style={{
                      transform: `scale(${played ? Math.sqrt(value) : 1})`,
                      transformBox: "fill-box",
                      transformOrigin: "50% 100%",
                      transition: reducedMotion ? "none" : `transform 900ms ease ${300 + index * 220}ms`,
                    }}
                  >
                    <circle cx={x} cy={CONE_TOP - MAX_R + 4} r={MAX_R} className="fill-rose-300 dark:fill-rose-400/80" />
                  </g>
                ) : (
                  <ellipse
                    cx={x}
                    cy={CONE_TOP + 1}
                    rx={13}
                    ry={3}
                    className="fill-rose-300 dark:fill-rose-400/80"
                    style={reveal(1200)}
                  />
                )}
                <text x={x} y={CONE_TIP + 14} textAnchor="middle" className="fill-card-foreground text-[9px] font-bold">
                  {pct(value)}
                </text>
                <text x={x} y={CONE_TIP + 26} textAnchor="middle" className="fill-muted-foreground text-[7px] font-bold">
                  {days === 0 ? "EXPIRY" : `${days} DAY${days === 1 ? "" : "S"} LEFT`}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-2 grid grid-cols-2 gap-1.5" style={reveal(1400)}>
          <div className="rounded-lg border border-border bg-card p-2.5 text-center">
            <div className="text-[8px] font-bold tracking-wide text-muted-foreground">FIRST 30 DAYS</div>
            <div className="mt-0.5 text-[15px] font-bold text-card-foreground">−{pct(firstThirty)}</div>
          </div>
          <div className="rounded-lg border border-brand/40 bg-brand/10 p-2.5 text-center">
            <div className="text-[8px] font-bold tracking-wide text-brand">LAST 7 DAYS</div>
            <div className="mt-0.5 text-[15px] font-bold text-brand">−{pct(lastSeven)}</div>
          </div>
        </div>

        <div className="mt-3 text-[8px] font-bold leading-relaxed tracking-wide text-muted-foreground" style={reveal(1500)}>
          SEBI: 93% of individual F&amp;O traders lost money, FY22–24.
          <br />
          Illustrative: one at-the-money option, nothing else changing.
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        RIGHT AFTER EXPIRY PAYS THE SAME AS WRONG.
      </div>
    </div>
  );
}

export { ThetaMeltingScoopsIllustration };

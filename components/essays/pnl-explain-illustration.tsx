"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Waterfall of one day's P&L, in ₹ lakh. Each step starts where the last one ended;
// the final step is the profit no cause accounts for.
const BASELINE = 92;
const SCALE = 1.3;
const y = (value: number) => BASELINE - value * SCALE;

type Kind = "up" | "down" | "total" | "unexplained";

const steps: { label: string; value: string; from: number; to: number; kind: Kind }[] = [
  { label: "MARKET", value: "+38", from: 0, to: 38, kind: "up" },
  { label: "VOL", value: "−12", from: 38, to: 26, kind: "down" },
  { label: "TIME", value: "−6", from: 26, to: 20, kind: "down" },
  { label: "NEW", value: "+14", from: 20, to: 34, kind: "up" },
  { label: "FEES", value: "−3", from: 34, to: 31, kind: "down" },
  { label: "EXPLAINED", value: "31", from: 0, to: 31, kind: "total" },
  { label: "???", value: "+22", from: 31, to: 53, kind: "unexplained" },
];

const BAR_WIDTH = 20;
const STEP = 29;
const LEFT = 10;

const barClass: Record<Kind, string> = {
  up: "fill-brand",
  down: "fill-muted-foreground",
  total: "fill-brand/30 stroke-brand",
  unexplained: "fill-rose-600 dark:fill-rose-500",
};

const textClass: Record<Kind, string> = {
  up: "fill-brand",
  down: "fill-muted-foreground",
  total: "fill-brand",
  unexplained: "fill-rose-600 dark:fill-rose-500",
};

function PnlExplainIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms`,
  });

  const unexplainedDelay = steps.length * 160 + 200;

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <style>{`
        @keyframes pnl-unexplained-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
      `}</style>

      <div className="mb-2 text-[9px] font-bold tracking-wide text-muted-foreground">
        PRODUCT CONTROL · TODAY&apos;S P&amp;L, EXPLAINED · ₹ LAKH
      </div>

      <svg
        viewBox="0 0 220 112"
        className="h-auto w-full"
        role="img"
        aria-label="Waterfall chart: market +38, volatility −12, time −6, new trades +14, fees −3 explain 31 lakh of profit. The desk reported 53. The remaining 22 lakh has no cause."
      >
        <line x1="4" y1={BASELINE} x2="216" y2={BASELINE} className="stroke-border" strokeWidth="1" />

        {/* The desk's reported number: the line the explained total has to reach. */}
        <g style={fade(unexplainedDelay - 150)}>
          <line
            x1="4"
            y1={y(53)}
            x2="216"
            y2={y(53)}
            className="stroke-rose-600 dark:stroke-rose-500"
            strokeWidth="0.75"
            strokeDasharray="3,2"
          />
          <text x="6" y={y(53) - 3} className="fill-rose-600 text-[6.5px] font-bold dark:fill-rose-500">
            REPORTED +53
          </text>
        </g>

        {steps.map((step, i) => {
          const x = LEFT + i * STEP;
          const top = y(Math.max(step.from, step.to));
          const height = Math.abs(step.to - step.from) * SCALE;
          const anchorY = step.kind === "down" ? top : top + height;
          const delay = step.kind === "unexplained" ? unexplainedDelay : i * 160;
          const next = steps[i + 1];
          const pulse = step.kind === "unexplained" && played && !reducedMotion;

          return (
            <g key={step.label}>
              <rect
                x={x}
                y={top}
                width={BAR_WIDTH}
                height={height}
                rx={1.5}
                strokeWidth={step.kind === "total" ? 0.75 : 0}
                className={barClass[step.kind]}
                style={{
                  opacity: played ? 1 : 0,
                  transform: played ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: `${x + BAR_WIDTH / 2}px ${anchorY}px`,
                  transition: reducedMotion
                    ? "none"
                    : `opacity 300ms ease ${delay}ms, transform 400ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
                  animation: pulse ? `pnl-unexplained-pulse 2.4s ease-in-out ${delay + 600}ms infinite` : undefined,
                }}
              />
              <text
                x={x + BAR_WIDTH / 2}
                y={step.kind === "down" ? top + height + 7 : top - 2.5}
                textAnchor="middle"
                className={`${textClass[step.kind]} text-[7px] font-bold`}
                style={fade(delay + 250)}
              >
                {step.value}
              </text>
              <text
                x={x + BAR_WIDTH / 2}
                y={104}
                textAnchor="middle"
                className={`${step.kind === "unexplained" ? textClass.unexplained : "fill-muted-foreground"} text-[5.5px] font-bold`}
                style={fade(delay + 250)}
              >
                {step.label}
              </text>

              {/* Waterfall connector: where this step ends is where the next one starts. */}
              {next && next.kind !== "total" ? (
                <line
                  x1={x + BAR_WIDTH}
                  y1={y(step.to)}
                  x2={x + STEP}
                  y2={y(step.to)}
                  className="stroke-muted-foreground"
                  strokeWidth="0.5"
                  strokeDasharray="1.5,1.5"
                  style={fade(delay + 300)}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      <div
        className="my-2.5 flex items-center justify-between rounded-md bg-rose-600/10 px-2 py-1.5"
        style={fade(unexplainedDelay + 450)}
      >
        <span className="text-[9px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
          UNEXPLAINED · NO SIGN-OFF
        </span>
        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-500">+₹22L, no cause</span>
      </div>

      <div
        className="flex items-center justify-between border-t border-dashed border-border pt-2.5"
        style={fade(unexplainedDelay + 550)}
      >
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">BROKEN MODEL?</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">OR A PRICE SOMEONE CHOSE?</span>
      </div>
    </div>
  );
}

export { PnlExplainIllustration };

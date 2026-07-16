"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const baselinePath = "M8,64 C64,60 128,56 192,48";
const compoundingPath = "M8,64 C56,54 116,26 192,10";
const areaPath = "M8,64 C56,54 116,26 192,10 L192,48 C128,56 64,60 8,64 Z";

const coinPoints = [
  { cx: 60, cy: 49, delay: 900 },
  { cx: 108, cy: 33, delay: 1100 },
  { cx: 159, cy: 18, delay: 1300 },
  { cx: 192, cy: 10, delay: 1500 },
];

function LearningDividendIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const lineTransition = (delayMs: number) =>
    reducedMotion ? "none" : `stroke-dashoffset 900ms cubic-bezier(.16,1,.3,1) ${delayMs}ms`;

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 flex items-center justify-between text-[10px] font-bold tracking-wide">
        <span className="flex items-center gap-1.5 text-brand">
          <span className="size-1.5 rounded-full bg-brand" />
          COMPANY A
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="size-1.5 rounded-full bg-muted-foreground" />
          COMPANY B
        </span>
      </div>

      <svg viewBox="0 0 200 76" className="h-[92px] w-full" preserveAspectRatio="none">
        <path
          d={areaPath}
          className="fill-brand/10"
          style={{
            opacity: played ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 600ms ease 700ms",
          }}
        />
        <path
          d={baselinePath}
          fill="none"
          className="stroke-muted-foreground/50"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: played ? 0 : 200,
            transition: lineTransition(0),
          }}
        />
        <path
          d={compoundingPath}
          fill="none"
          className="stroke-brand"
          strokeWidth="2.25"
          strokeLinecap="round"
          style={{
            strokeDasharray: 220,
            strokeDashoffset: played ? 0 : 220,
            transition: lineTransition(150),
          }}
        />
        {coinPoints.map((coin, i) => {
          const isLast = i === coinPoints.length - 1;
          return (
            <circle
              key={`${coin.cx}-${coin.cy}`}
              cx={coin.cx}
              cy={coin.cy}
              r={isLast ? 3 : 2.25}
              className={
                isLast && played && !reducedMotion
                  ? "fill-brand animate-[ob-pulse_2s_ease-out_2.1s_infinite]"
                  : "fill-brand"
              }
              style={{
                opacity: played ? 1 : 0,
                transform: played ? "scale(1)" : "scale(0)",
                transformOrigin: `${coin.cx}px ${coin.cy}px`,
                transition: reducedMotion
                  ? "none"
                  : `opacity 250ms ease ${coin.delay}ms, transform 250ms cubic-bezier(.34,1.56,.64,1) ${coin.delay}ms`,
              }}
            />
          );
        })}
      </svg>

      <div className="mt-3.5 flex items-center justify-between gap-4 border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          SAME&nbsp;MODEL&nbsp;·&nbsp;SAME&nbsp;BUDGET
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">LEARNING DIVIDEND</span>
      </div>
    </div>
  );
}

export { LearningDividendIllustration };

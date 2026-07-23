"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const linePath = "M10,50 C40,56 50,62 70,66 C95,58 110,42 130,30 C150,20 170,16 190,14";
const points = [
  { cx: 10, cy: 50, label: "BASELINE", delay: 700 },
  { cx: 70, cy: 66, label: "BOUNTY", delay: 950 },
  { cx: 130, cy: 30, label: "BREEDING", delay: 1200 },
  { cx: 190, cy: 14, label: "CANCELLED", delay: 1450 },
];

function CobraEffectIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 text-[9px] font-bold tracking-wide text-muted-foreground">
        COBRA POPULATION · COLONIAL DELHI
      </div>

      <svg viewBox="0 0 200 76" className="h-[92px] w-full" preserveAspectRatio="none">
        <line
          x1="10"
          y1="50"
          x2="190"
          y2="50"
          strokeDasharray="3 3"
          className="stroke-muted-foreground/40"
          strokeWidth="1"
        />
        <path
          d={linePath}
          fill="none"
          className="stroke-rose-600 dark:stroke-rose-500"
          strokeWidth="2.25"
          strokeLinecap="round"
          style={{
            strokeDasharray: 260,
            strokeDashoffset: played ? 0 : 260,
            transition: reducedMotion ? "none" : "stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1) 300ms",
          }}
        />
        {points.map((point) => (
          <circle
            key={point.label}
            cx={point.cx}
            cy={point.cy}
            r="3"
            className="fill-rose-600 dark:fill-rose-500"
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "scale(1)" : "scale(0)",
              transformOrigin: `${point.cx}px ${point.cy}px`,
              transition: reducedMotion
                ? "none"
                : `opacity 250ms ease ${point.delay}ms, transform 250ms cubic-bezier(.34,1.56,.64,1) ${point.delay}ms`,
            }}
          />
        ))}
      </svg>

      <div className="mt-1 flex justify-between">
        {points.map((point) => (
          <span
            key={point.label}
            className="text-[8px] font-bold tracking-wide text-muted-foreground"
            style={{
              opacity: played ? 1 : 0,
              transition: reducedMotion ? "none" : `opacity 300ms ease ${point.delay}ms`,
            }}
          >
            {point.label}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          INSTRUCTION: FEWER COBRAS
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">INCENTIVE: PAID PER COBRA</span>
      </div>
    </div>
  );
}

export { CobraEffectIllustration };

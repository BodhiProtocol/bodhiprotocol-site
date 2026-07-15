"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function SupplyDemandIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const lineTransition = reducedMotion ? "none" : "stroke-dashoffset 900ms cubic-bezier(.16,1,.3,1) 100ms";

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <svg viewBox="0 0 200 110" className="h-[150px] w-full" preserveAspectRatio="none">
        <line x1="10" y1="10" x2="10" y2="95" className="stroke-border" strokeWidth="1.5" />
        <line x1="10" y1="95" x2="195" y2="95" className="stroke-border" strokeWidth="1.5" />

        <path
          d="M20,88 C70,60 130,40 185,15"
          fill="none"
          className="stroke-brand"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ strokeDasharray: 160, strokeDashoffset: played ? 0 : 160, transition: lineTransition }}
        />
        <path
          d="M20,15 C70,40 130,60 185,88"
          fill="none"
          className="stroke-emerald-600 dark:stroke-emerald-500"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ strokeDasharray: 160, strokeDashoffset: played ? 0 : 160, transition: lineTransition }}
        />

        <circle
          cx="100"
          cy="51"
          r="4.5"
          className="fill-brand"
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "scale(1)" : "scale(0)",
            transformOrigin: "100px 51px",
            transition: reducedMotion ? "none" : "opacity 250ms ease 1050ms, transform 250ms cubic-bezier(.34,1.56,.64,1) 1050ms",
          }}
        />

        <text x="185" y="10" textAnchor="end" className="fill-brand" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700">
          SUPPLY
        </text>
        <text
          x="185"
          y="98"
          textAnchor="end"
          className="fill-emerald-600 dark:fill-emerald-500"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fontWeight="700"
        >
          DEMAND
        </text>
      </svg>
      <div
        className="mt-1 text-center text-[10px] text-muted-foreground"
        style={{ opacity: played ? 1 : 0, transition: reducedMotion ? "none" : "opacity 300ms ease 1300ms" }}
      >
        EQUILIBRIUM — <b className="text-brand">$4.20</b> · 1,200 units
      </div>
    </div>
  );
}

export { SupplyDemandIllustration };

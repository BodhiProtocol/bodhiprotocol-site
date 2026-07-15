"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function BusinessCaseIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <svg viewBox="0 0 200 110" className="h-[150px] w-full">
        <line x1="100" y1="46" x2="100" y2="88" className="stroke-muted-foreground" strokeWidth="2.5" />
        <path d="M92,88 L108,88 L100,98 Z" className="fill-muted-foreground" />

        <g
          style={{
            transform: played ? "rotate(-7deg)" : "rotate(0deg)",
            transformOrigin: "100px 46px",
            transition: reducedMotion ? "none" : "transform 900ms cubic-bezier(.34,1.2,.4,1) 300ms",
          }}
        >
          <line x1="30" y1="46" x2="170" y2="46" className="stroke-foreground" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="46" x2="30" y2="66" className="stroke-muted-foreground" strokeWidth="1.5" />
          <line x1="170" y1="46" x2="170" y2="66" className="stroke-muted-foreground" strokeWidth="1.5" />

          <rect
            x="6"
            y="66"
            width="48"
            height="22"
            rx="5"
            className="fill-rose-600/10 stroke-rose-600 dark:fill-rose-500/10 dark:stroke-rose-500"
            strokeWidth="1.5"
          />
          <text
            x="30"
            y="80"
            textAnchor="middle"
            className="fill-rose-600 dark:fill-rose-500"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="700"
          >
            COST + RISK
          </text>

          <rect
            x="146"
            y="66"
            width="48"
            height="22"
            rx="5"
            className="fill-emerald-600/10 stroke-emerald-600 dark:fill-emerald-500/10 dark:stroke-emerald-500"
            strokeWidth="1.5"
          />
          <text
            x="170"
            y="80"
            textAnchor="middle"
            className="fill-emerald-600 dark:fill-emerald-500"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="700"
          >
            VALUE
          </text>
        </g>

        <circle cx="100" cy="46" r="4" className="fill-foreground" />
      </svg>
      <div
        className="mt-1 text-center text-[10px] text-muted-foreground"
        style={{ opacity: played ? 1 : 0, transition: reducedMotion ? "none" : "opacity 300ms ease 1300ms" }}
      >
        Checked against: <b className="text-foreground">doing nothing</b>
      </div>
    </div>
  );
}

export { BusinessCaseIllustration };

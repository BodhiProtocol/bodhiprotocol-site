"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const farPath = "M8,25 C60,27 130,33 192,45";
const nearPath = "M8,40 C60,44 130,54 192,78";
const gapFill = "M192,45 L192,78 L8,40 L8,25 Z";

function CalendarSpreadIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const lineTransition = (delayMs: number) =>
    reducedMotion ? "none" : `stroke-dashoffset 900ms cubic-bezier(.16,1,.3,1) ${delayMs}ms`;

  const fade = (delayMs: number) => ({
    opacity: played ? 1 : 0,
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delayMs}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 text-[9px] font-bold tracking-wide text-muted-foreground">
        CALENDAR SPREAD · SELL NEAR EXPIRY, BUY FAR EXPIRY
      </div>

      <div className="mb-2 flex items-center gap-3 text-[9px] font-bold tracking-wide">
        <span className="flex items-center gap-1.5 text-brand">
          <span className="size-1.5 rounded-full bg-brand" />
          FAR — BOUGHT
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="size-1.5 rounded-full bg-muted-foreground" />
          NEAR — SOLD
        </span>
      </div>

      <svg viewBox="0 0 200 90" className="h-[104px] w-full" preserveAspectRatio="none">
        <line x1="4" y1="83" x2="196" y2="83" className="stroke-border" strokeWidth="1" strokeDasharray="2,3" />
        <text x="8" y="8" className="fill-muted-foreground text-[6.5px] font-bold">
          TODAY
        </text>
        <text x="192" y="8" textAnchor="end" className="fill-muted-foreground text-[6.5px] font-bold">
          NEAR EXPIRY
        </text>

        <path
          d={gapFill}
          className="fill-brand"
          style={{
            opacity: played ? 0.14 : 0,
            transition: reducedMotion ? "none" : "opacity 500ms ease 900ms",
          }}
        />

        <path
          d={nearPath}
          fill="none"
          className="stroke-muted-foreground"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: 210,
            strokeDashoffset: played ? 0 : 210,
            transition: lineTransition(0),
          }}
        />
        <path
          d={farPath}
          fill="none"
          className="stroke-brand"
          strokeWidth="2.25"
          strokeLinecap="round"
          style={{
            strokeDasharray: 210,
            strokeDashoffset: played ? 0 : 210,
            transition: lineTransition(150),
          }}
        />

        <line
          x1="192"
          y1="45"
          x2="192"
          y2="78"
          className="stroke-brand"
          strokeWidth="1.5"
          style={{
            opacity: played ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 300ms ease 1050ms",
          }}
        />
        <text
          x="182"
          y="63"
          textAnchor="end"
          className="fill-brand text-[7px] font-bold"
          style={fade(1150)}
        >
          THE SPREAD — WIDENING
        </text>

        <circle cx="8" cy="25" r="2" className="fill-brand" style={fade(1000)} />
        <circle cx="8" cy="40" r="2" className="fill-muted-foreground" style={fade(1000)} />
      </svg>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          UNDERLYING FLAT
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">SPREAD STILL GAINS</span>
      </div>
    </div>
  );
}

export { CalendarSpreadIllustration };

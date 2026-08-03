"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const buyerPath = "M8,49 L90,49 L192,15";
const sellerPath = "M8,43 L90,43 L192,77";

function OptionsPayoffIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const lineTransition = (delayMs: number) =>
    reducedMotion ? "none" : `stroke-dashoffset 900ms cubic-bezier(.16,1,.3,1) ${delayMs}ms`;

  const fade = (delayMs: number) => ({
    opacity: played ? 1 : 0,
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delayMs}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 flex items-center justify-between text-[9px] font-bold tracking-wide">
        <span className="text-muted-foreground">CALL OPTION · STRIKE ₹100 · PREMIUM ₹4</span>
      </div>

      <div className="mb-2 flex items-center gap-3 text-[9px] font-bold tracking-wide">
        <span className="flex items-center gap-1.5 text-brand">
          <span className="size-1.5 rounded-full bg-brand" />
          BUYER
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="size-1.5 rounded-full bg-muted-foreground" />
          SELLER
        </span>
      </div>

      <svg viewBox="0 0 200 90" className="h-[104px] w-full" preserveAspectRatio="none">
        <line
          x1="4"
          y1="46"
          x2="196"
          y2="46"
          className="stroke-border"
          strokeWidth="1"
          strokeDasharray="2,3"
        />
        <line
          x1="90"
          y1="10"
          x2="90"
          y2="82"
          className="stroke-border"
          strokeWidth="1"
          strokeDasharray="2,3"
        />
        <text x="90" y="8" textAnchor="middle" className="fill-muted-foreground text-[7px] font-bold">
          STRIKE
        </text>

        <path
          d={sellerPath}
          fill="none"
          className="stroke-muted-foreground"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 260,
            strokeDashoffset: played ? 0 : 260,
            transition: lineTransition(0),
          }}
        />
        <path
          d={buyerPath}
          fill="none"
          className="stroke-brand"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 260,
            strokeDashoffset: played ? 0 : 260,
            transition: lineTransition(150),
          }}
        />

        <text x="46" y="41" textAnchor="middle" className="fill-muted-foreground text-[6.5px] font-bold" style={fade(1000)}>
          CAPPED — SAME NO MATTER HOW FAR IT FALLS
        </text>

        <circle
          cx="192"
          cy="15"
          r="2.5"
          className="fill-brand"
          style={{
            opacity: played ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 250ms ease 1100ms",
          }}
        />
        <text x="188" y="10" textAnchor="end" className="fill-brand text-[7px] font-bold" style={fade(1100)}>
          +₹46
        </text>

        <circle
          cx="192"
          cy="77"
          r="2.5"
          className="fill-muted-foreground"
          style={{
            opacity: played ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 250ms ease 1150ms",
          }}
        />
        <text x="188" y="88" textAnchor="end" className="fill-muted-foreground text-[7px] font-bold" style={fade(1150)}>
          -₹46
        </text>
      </svg>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          BUYER&apos;S WORST CASE: ₹4
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">SELLER&apos;S: UNCAPPED</span>
      </div>
    </div>
  );
}

export { OptionsPayoffIllustration };

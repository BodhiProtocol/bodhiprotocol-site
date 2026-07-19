"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const LINE_A = "M4,50 L20,42 L36,48 L52,30 L68,36 L84,18 L96,22";
const LINE_B = "M4,60 L20,58 L36,62 L52,54 L68,58 L84,48 L96,50";
const PATH_LENGTH = 160;

function InflationPreview() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="relative aspect-[4/3] w-full max-w-[220px]">
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full overflow-visible">
        <line x1="4" y1="4" x2="4" y2="68" stroke="var(--color-border)" strokeWidth="1" />
        <line x1="4" y1="68" x2="96" y2="68" stroke="var(--color-border)" strokeWidth="1" />
        <path
          d={LINE_A}
          fill="none"
          stroke="var(--color-destructive)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: PATH_LENGTH,
            strokeDashoffset: played ? 0 : PATH_LENGTH,
            transition: reducedMotion
              ? "opacity 300ms ease"
              : `stroke-dashoffset 1s cubic-bezier(.16,1,.3,1) 0.1s`,
          }}
        />
        <path
          d={LINE_B}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: PATH_LENGTH,
            strokeDashoffset: played ? 0 : PATH_LENGTH,
            transition: reducedMotion
              ? "opacity 300ms ease"
              : `stroke-dashoffset 1s cubic-bezier(.16,1,.3,1) 0.3s`,
          }}
        />
      </svg>
    </div>
  );
}

export { InflationPreview };

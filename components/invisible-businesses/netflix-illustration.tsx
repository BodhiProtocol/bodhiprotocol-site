"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function NetflixIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const ringCircumference = 2 * Math.PI * 55;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full">
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
        <circle cx="100" cy="100" r="90" className="fill-brand/5" />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          className="stroke-brand/20"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="100"
          cy="100"
          r="55"
          fill="none"
          className="stroke-brand"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: ringCircumference,
            strokeDashoffset: played ? 0 : ringCircumference,
            transition: reducedMotion ? "none" : "stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1) 200ms",
          }}
        />
        <polygon
          points="88,80 88,120 122,100"
          className="fill-brand"
          style={{
            opacity: played ? 1 : 0,
            transition: "opacity 500ms ease 700ms",
          }}
        />
        <g
          style={{
            transformOrigin: "100px 100px",
            transformBox: "fill-box",
            animation: played && !reducedMotion ? "ib-orbit 9s linear infinite" : "none",
            opacity: played ? 1 : 0,
            transition: "opacity 500ms ease 900ms",
          }}
        >
          <circle cx="100" cy="18" r="4" className="fill-brand" />
        </g>
      </svg>
    </div>
  );
}

export { NetflixIllustration };

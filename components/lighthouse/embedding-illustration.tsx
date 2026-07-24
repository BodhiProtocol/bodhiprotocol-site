"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const points = [
  { label: "London", cx: 130, cy: 40, delay: 0 },
  { label: "Budapest", cx: 155, cy: 62, delay: 200 },
  { label: "Pizza", cx: 35, cy: 95, delay: 400 },
];

function EmbeddingIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 text-[9px] font-bold tracking-wide text-muted-foreground">
        MEANING, PLOTTED
      </div>

      <svg viewBox="0 0 200 110" className="h-[130px] w-full">
        <line
          x1={points[0].cx}
          y1={points[0].cy}
          x2={points[1].cx}
          y2={points[1].cy}
          className="stroke-brand/40"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          style={{
            opacity: played ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 400ms ease 600ms",
          }}
        />
        {points.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.cx}
              cy={point.cy}
              r="4"
              className={point.label === "Pizza" ? "fill-muted-foreground" : "fill-brand"}
              style={{
                opacity: played ? 1 : 0,
                transform: played ? "scale(1)" : "scale(0)",
                transformOrigin: `${point.cx}px ${point.cy}px`,
                transition: reducedMotion
                  ? "none"
                  : `opacity 300ms ease ${point.delay}ms, transform 300ms cubic-bezier(.34,1.56,.64,1) ${point.delay}ms`,
              }}
            />
            <text
              x={point.cx}
              y={point.cy - 9}
              textAnchor="middle"
              className={point.label === "Pizza" ? "fill-muted-foreground" : "fill-brand"}
              fontFamily="var(--font-mono)"
              fontSize="9"
              fontWeight="700"
              style={{
                opacity: played ? 1 : 0,
                transition: reducedMotion ? "none" : `opacity 300ms ease ${point.delay + 150}ms`,
              }}
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-2 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          NO SHARED WORDS
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">CLOSE ON THE MAP</span>
      </div>
    </div>
  );
}

export { EmbeddingIllustration };

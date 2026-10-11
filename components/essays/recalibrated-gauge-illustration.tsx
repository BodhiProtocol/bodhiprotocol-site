"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// A fuel-gauge VaR dial. The needle (the real position) never moves; the dial face is turned
// underneath it, so the same risk reads 44% lower and the limit drifts out of reach.
const CX = 100;
const CY = 72;
const R = 54;
const NEEDLE_VALUE = 85;
const LIMIT_VALUE = 90;
const RECALIBRATED_VALUE = Math.round(NEEDLE_VALUE * 0.56); // 44% lower

// Value 0..100 sweeps the top half of the dial, left to right.
const angleFor = (value: number) => 180 - value * 1.8;
const point = (value: number, radius: number) => {
  const a = (angleFor(value) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY - radius * Math.sin(a) };
};

// Turning the face clockwise by this much puts RECALIBRATED_VALUE under the needle.
const FACE_TURN = (NEEDLE_VALUE - RECALIBRATED_VALUE) * 1.8;

function RecalibratedGaugeIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms`,
  });

  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);
  const needleTip = point(NEEDLE_VALUE, R - 10);
  const limitStart = point(LIMIT_VALUE, R);
  const limitEnd = point(100, R);
  const screwTip = point(-8, R + 1);
  const screwShaftEnd = point(-8, R + 14);
  const screwHandleEnd = point(-8, R + 28);

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 text-[9px] font-bold tracking-wide text-muted-foreground">
        RISK ENGINE · VALUE AT RISK GAUGE
      </div>

      <svg
        viewBox="0 0 200 140"
        className="h-auto w-full"
        role="img"
        aria-label="A VaR gauge whose needle sits just under the risk limit. The dial face is then turned underneath the needle, so the same position reads 44 percent lower."
      >
        <circle cx={CX} cy={CY} r={R} className="fill-card stroke-border" strokeWidth="1" />

        {/* The dial face: ticks, numbers and the limit zone, all turned together. */}
        <g>
          <g
            style={{
              transform: played ? `rotate(${FACE_TURN}deg)` : "rotate(0deg)",
              transformOrigin: `${CX}px ${CY}px`,
              transition: reducedMotion ? "none" : "transform 1400ms cubic-bezier(.65,0,.35,1) 1100ms",
            }}
          >
            <path
              d={`M ${limitStart.x} ${limitStart.y} A ${R} ${R} 0 0 1 ${limitEnd.x} ${limitEnd.y}`}
              className="fill-none stroke-rose-600 dark:stroke-rose-500"
              strokeWidth="5"
            />
            {ticks.map((value) => {
              const outer = point(value, R);
              const inner = point(value, R - (value % 50 === 0 ? 8 : 5));
              const label = point(value, R - 15);
              return (
                <g key={value}>
                  <line
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    className="stroke-muted-foreground"
                    strokeWidth="0.75"
                  />
                  {value % 20 === 0 ? (
                    <text
                      x={label.x}
                      y={label.y + 2}
                      textAnchor="middle"
                      className="fill-muted-foreground text-[6px] font-bold"
                    >
                      {value}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </g>

        {/* The needle: the real position, which never moves. */}
        <line
          x1={CX}
          y1={CY}
          x2={needleTip.x}
          y2={needleTip.y}
          className="stroke-brand"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r="3.5" className="fill-brand" />

        {/* Screwdriver, tip on the rim, turning the face. */}
        <g style={fade(600)} aria-hidden="true">
          <line
            x1={screwTip.x}
            y1={screwTip.y}
            x2={screwShaftEnd.x}
            y2={screwShaftEnd.y}
            className="stroke-muted-foreground"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1={screwShaftEnd.x}
            y1={screwShaftEnd.y}
            x2={screwHandleEnd.x}
            y2={screwHandleEnd.y}
            className="stroke-muted-foreground"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>

        <text x={CX} y={CY + 22} textAnchor="middle" className="fill-brand text-[7px] font-bold" style={fade(300)}>
          SAME POSITION
        </text>
      </svg>

      <div className="my-2.5 grid grid-cols-2 gap-2">
        <div className="flex items-center justify-between rounded-md bg-card px-2 py-1.5" style={fade(400)}>
          <span className="text-[8px] font-bold tracking-wide text-muted-foreground">OLD MODEL</span>
          <span className="text-[9px] font-bold text-rose-600 dark:text-rose-500">{NEEDLE_VALUE} · NEAR LIMIT</span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-brand px-2 py-1.5" style={fade(2500)}>
          <span className="text-[8px] font-bold tracking-wide text-brand-foreground">NEW MODEL</span>
          <span className="text-[9px] font-bold text-brand-foreground">{RECALIBRATED_VALUE} · −44%</span>
        </div>
      </div>

      <div
        className="flex items-center justify-between border-t border-dashed border-border pt-2.5"
        style={fade(2600)}
      >
        <span className="text-[9px] font-bold tracking-wide text-rose-600 dark:text-rose-500">JPMORGAN 2012: $6.2BN LOSS</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">RBI 2027: STANDARD FORMULA</span>
      </div>
    </div>
  );
}

export { RecalibratedGaugeIllustration };

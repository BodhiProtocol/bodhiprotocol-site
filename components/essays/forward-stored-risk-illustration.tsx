"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Chart space: x is months since signing (0–6), y is the forward's value in ₹.
const W = 300;
const H = 120;
const PAD = { left: 30, right: 14, top: 14, bottom: 18 };
const Y_MIN = 95;
const Y_MAX = 121;
const STRIKE = 100;

const sx = (month: number) => PAD.left + (month / 6) * (W - PAD.left - PAD.right);
const sy = (price: number) => PAD.top + ((Y_MAX - price) / (Y_MAX - Y_MIN)) * (H - PAD.top - PAD.bottom);

// Only the prices the essay gives; straight lines between them.
const path = [
  { month: 0, price: 100, label: "" },
  { month: 1, price: 104, label: "₹104" },
  { month: 3, price: 107, label: "₹107" },
  { month: 4, price: 99, label: "₹99" },
  { month: 6, price: 118, label: "₹118" },
];

// Where the line crosses the ₹100 contract price.
const crossDown = 3 + (107 - STRIKE) / (107 - 99);
const crossUp = 4 + (STRIKE - 99) / (118 - 99);

const polygon = (points: [number, number][]) => points.map(([m, p]) => `${sx(m)},${sy(p)}`).join(" ");

const owedToYou = [
  polygon([[0, 100], [1, 104], [3, 107], [crossDown, 100]]),
  polygon([[crossUp, 100], [6, 118], [6, 100]]),
];
const owedByYou = polygon([[crossDown, 100], [4, 99], [crossUp, 100]]);

const cashRow = ["Day 1", "M1", "M2", "M3", "M4", "M5"];

function ForwardStoredRiskIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transition: reducedMotion ? "none" : `opacity 420ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>FORWARD AT ₹100 · 6 MONTHS</span>
          <span>NO DAILY SETTLEMENT</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            The ₹2 that never arrived.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            Gains pile up on paper. Cash moves once.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(60)}>
          VALUE ON PAPER
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 h-auto w-full" role="img" aria-label="Forward value over six months: ₹104, ₹107, ₹99, then ₹118 at the end, against a ₹100 contract price">
          {owedToYou.map((points) => (
            <polygon key={points} points={points} className="fill-sky-500/20" style={fade(700)} />
          ))}
          <polygon points={owedByYou} className="fill-amber-500/60" style={fade(900)} />

          <line
            x1={sx(0)}
            x2={sx(6)}
            y1={sy(STRIKE)}
            y2={sy(STRIKE)}
            className="stroke-muted-foreground"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <text x={4} y={sy(STRIKE) + 3} className="fill-muted-foreground text-[8px] font-bold">
            ₹100
          </text>

          <polyline
            points={path.map((point) => `${sx(point.month)},${sy(point.price)}`).join(" ")}
            fill="none"
            className="stroke-card-foreground"
            strokeWidth={1.75}
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={played ? 0 : 1}
            style={{ transition: reducedMotion ? "none" : "stroke-dashoffset 1100ms ease 200ms" }}
          />
          {path.slice(1).map((point, index) => (
            <g key={point.month} style={fade(450 + index * 220)}>
              <circle cx={sx(point.month)} cy={sy(point.price)} r={2.5} className="fill-card-foreground" />
              <text
                x={sx(point.month)}
                y={point.price < STRIKE ? sy(point.price) + 11 : sy(point.price) - 6}
                textAnchor={point.month === 6 ? "end" : "middle"}
                className="fill-card-foreground text-[8px] font-bold"
              >
                {point.label}
              </text>
            </g>
          ))}

          <g style={fade(1100)}>
            <text
              x={sx(4) - 12}
              y={sy(99) + 11}
              textAnchor="end"
              className="fill-amber-700 text-[8px] font-bold dark:fill-amber-300"
            >
              now you owe them →
            </text>
          </g>

          {[0, 1, 2, 3, 4, 5, 6].map((month) => (
            <text
              key={month}
              x={sx(month)}
              y={H - 4}
              textAnchor={month === 0 ? "start" : month === 6 ? "end" : "middle"}
              className="fill-muted-foreground text-[7px] font-bold"
            >
              {month === 0 ? "SIGNED" : month === 6 ? "END" : `M${month}`}
            </text>
          ))}
        </svg>

        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(800)}>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-sm bg-sky-500/40" /> owed to you, not paid
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-sm bg-amber-500/70" /> owed by you, not paid
          </span>
        </div>

        <div className="mt-4 text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(1000)}>
          CASH MOVED
        </div>
        <div className="mt-1.5 grid grid-cols-7 gap-1">
          {cashRow.map((label, index) => (
            <div key={label} className="text-center" style={reveal(1050 + index * 90)}>
              <div className="mx-auto flex size-7 items-center justify-center rounded-full border border-dashed border-border bg-card text-[8px] font-bold text-muted-foreground">
                ₹0
              </div>
              <div className="mt-1 text-[7px] font-bold tracking-wide text-muted-foreground">{label}</div>
            </div>
          ))}
          <div className="text-center" style={reveal(1700)}>
            <div className="mx-auto flex size-7 items-center justify-center rounded-full bg-brand text-[8px] font-bold text-brand-foreground">
              ₹18
            </div>
            <div className="mt-1 text-[7px] font-bold tracking-wide text-brand">END</div>
          </div>
        </div>

        <div
          className="mt-4 rounded-lg border border-border bg-card p-2.5 text-[8px] font-bold tracking-wide text-muted-foreground"
          style={reveal(1850)}
        >
          <span className="text-card-foreground">OWED BY:</span> one named counterparty · no clearinghouse in between
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        A FORWARD DOESN&apos;T REMOVE THE RISK. IT STORES IT.
      </div>
    </div>
  );
}

export { ForwardStoredRiskIllustration };

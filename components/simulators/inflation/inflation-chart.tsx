"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import type { Indicators } from "@/components/simulators/inflation/use-inflation-simulator";

interface InflationChartProps {
  history: Indicators[];
}

const X_MIN = 8;
const X_MAX = 96;
const Y_TOP = 4;
const Y_BOTTOM = 68;
const Y_MIN = -5;
const Y_MAX = 20;

function xForIndex(index: number, length: number) {
  if (length <= 1) return X_MIN;
  return X_MIN + (index / (length - 1)) * (X_MAX - X_MIN);
}

function yForValue(value: number) {
  const clamped = Math.max(Y_MIN, Math.min(Y_MAX, value));
  const t = (clamped - Y_MIN) / (Y_MAX - Y_MIN);
  return Y_BOTTOM - t * (Y_BOTTOM - Y_TOP);
}

function pathFor(history: Indicators[], key: keyof Indicators) {
  return history
    .map(
      (point, index) => `${index === 0 ? "M" : "L"} ${xForIndex(index, history.length)} ${yForValue(point[key])}`,
    )
    .join(" ");
}

const SERIES: { key: keyof Indicators; label: string; dotClass: string; strokeVar: string }[] = [
  { key: "inflation", label: "Inflation", dotClass: "bg-destructive", strokeVar: "var(--color-destructive)" },
  { key: "gdpGrowth", label: "GDP Growth", dotClass: "bg-brand", strokeVar: "var(--color-brand)" },
  {
    key: "unemployment",
    label: "Unemployment",
    dotClass: "bg-muted-foreground",
    strokeVar: "var(--color-muted-foreground)",
  },
];

function InflationChart({ history }: InflationChartProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const latest = history[history.length - 1];

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div
        className="relative aspect-[4/3] w-full"
        style={{ opacity: played ? 1 : 0, transition: reducedMotion ? "none" : "opacity 0.5s ease" }}
      >
        <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full overflow-visible">
          <line x1={X_MIN} y1={Y_TOP} x2={X_MIN} y2={Y_BOTTOM} stroke="var(--color-border)" strokeWidth="0.5" />
          <line
            x1={X_MIN}
            y1={yForValue(0)}
            x2={X_MAX}
            y2={yForValue(0)}
            stroke="var(--color-border)"
            strokeWidth="0.4"
            strokeDasharray="1,1.5"
          />

          {SERIES.map((series) => (
            <path
              key={series.key}
              d={pathFor(history, series.key)}
              fill="none"
              stroke={series.strokeVar}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>

      <div className="flex flex-wrap gap-4">
        {SERIES.map((series) => (
          <div key={series.key} className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${series.dotClass}`} />
            <span className="text-xs text-muted-foreground">{series.label}</span>
            <span className="font-mono text-sm font-semibold text-foreground">{latest[series.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { InflationChart };

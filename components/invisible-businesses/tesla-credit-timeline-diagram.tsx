"use client";

import { motion } from "framer-motion";
import { Handshake, TrendingDown } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Verified against Tesla's quarterly automotive regulatory-credits revenue
// (cross-checked across independent trackers; 10-K/10-Q direct access is
// blocked by bot protection, so this leans on convergent secondary sources).
const data = [
  { label: "Q4 '19", value: 133 },
  { label: "Q2 '20", value: 428 },
  { label: "Q1 '22", value: 679 },
  { label: "Q2 '24", value: 890 },
  { label: "Q4 '24", value: 692 },
  { label: "Q1 '25", value: 595 },
  { label: "Q3 '25", value: 417 },
  { label: "Q2 '26", value: 146 },
];

const maxValue = 890;
const barWidth = 38;
const step = 58;
const chartLeft = 15;
const baselineY = 168;
const maxBarHeight = 128;
// Policy marker sits between index 5 (Q1 '25) and index 6 (Q3 '25),
// the quarter the One Big Beautiful Bill Act was signed (Jul 4, 2025).
const policyX = chartLeft + 5 * step + barWidth + (step - barWidth) / 2;

function TeslaCreditTimelineDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        Regulatory Credit Revenue, 2019 – 2026
      </span>

      <svg
        viewBox="0 0 500 200"
        className="w-full"
        role="img"
        aria-label="Tesla's quarterly regulatory credit revenue from Q4 2019 to Q2 2026, rising from $133 million to a peak near $890 million in Q2 2024, then falling to roughly $146 million by Q2 2026, with a policy marker showing the One Big Beautiful Bill Act signed in July 2025."
      >
        <line
          x1={chartLeft - 8}
          y1={baselineY}
          x2={482}
          y2={baselineY}
          stroke="currentColor"
          className="text-border"
          strokeWidth="1"
        />

        <motion.line
          x1={policyX}
          y1={baselineY}
          x2={policyX}
          y2={12}
          stroke="currentColor"
          className="text-brand/50"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1 }}
        />
        <motion.text
          x={policyX + 5}
          y={20}
          className="fill-brand font-mono text-[8px] font-semibold uppercase"
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1 }}
        >
          OBBB Act
        </motion.text>

        {data.map((point, index) => {
          const barHeight = (point.value / maxValue) * maxBarHeight;
          const x = chartLeft + index * step;
          const opacity = 0.3 + 0.7 * (point.value / maxValue);
          return (
            <g key={point.label}>
              <motion.rect
                x={x}
                width={barWidth}
                rx={4}
                className="fill-brand"
                style={{ opacity }}
                initial={{ height: 0, y: baselineY }}
                animate={
                  played
                    ? { height: barHeight, y: baselineY - barHeight }
                    : { height: 0, y: baselineY }
                }
                transition={{
                  duration: 0.7,
                  delay: reducedMotion ? 0 : 0.15 + index * 0.08,
                  ease: "easeOut",
                }}
              />
              <motion.text
                x={x + barWidth / 2}
                y={baselineY - barHeight - 8}
                textAnchor="middle"
                className="fill-foreground font-mono text-[8px] font-semibold"
                initial={{ opacity: 0 }}
                animate={played ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.5 + index * 0.08 }}
              >
                ${point.value}M
              </motion.text>
              <text
                x={x + barWidth / 2}
                y={baselineY + 14}
                textAnchor="middle"
                className="fill-muted-foreground font-mono text-[8px]"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4 rounded-2xl bg-background p-4 sm:p-5">
        <span className="flex items-center gap-1.5 rounded-full border border-brand/20 bg-card px-3 py-1.5 text-xs font-semibold sm:text-sm">
          <TrendingDown className="size-3.5 text-brand" />
          Peak: $890M, Q2 2024
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-brand/20 bg-card px-3 py-1.5 text-xs font-semibold sm:text-sm">
          <Handshake className="size-3.5 text-brand" />
          Bought by Stellantis, Toyota, Ford &amp; more
        </span>
      </div>

      <div className="text-center text-xs text-muted-foreground sm:text-sm">
        The One Big Beautiful Bill Act, signed July 4, 2025, retroactively zeroed federal CAFE
        fines — killing the reason many automakers needed Tesla&apos;s credits.
      </div>
    </div>
  );
}

export { TeslaCreditTimelineDiagram };

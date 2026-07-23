"use client";

import { motion } from "framer-motion";
import { Landmark, Rocket, ShoppingCart, Users } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const curvePath = "M10,100 C55,140 95,170 135,166 C185,161 205,70 270,15";
const breakEvenY = 100;

const markers = [
  { x: 10, y: 100, label: "2016: Free Data Launch", icon: Rocket, anchor: "end" as const },
  { x: 135, y: 166, label: "100M Users In 6 Months", icon: Users, anchor: "middle" as const },
  { x: 205, y: 70, label: "500M+ Users (2026)", icon: ShoppingCart, anchor: "middle" as const },
  { x: 270, y: 15, label: "Ecosystem Monetized", icon: Landmark, anchor: "start" as const },
];

const loopNodes = [
  { label: "Massive User Base" },
  { label: "JioMart, Ads & Jio Financial" },
  { label: "Reinvested Into Low Prices" },
];

function FloatingArrow({
  played,
  reducedMotion,
  delay = 0,
}: {
  played: boolean;
  reducedMotion: boolean;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 12"
      className="h-3 w-8 shrink-0 text-brand/50 sm:w-10"
      animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M27 1 L34 6 L27 11" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  );
}

function JioBurnCurveDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Burn Curve
      </span>

      <div className="flex justify-center">
        <svg viewBox="0 0 280 200" className="w-full max-w-md">
          <line
            x1={0}
            y1={breakEvenY}
            x2={280}
            y2={breakEvenY}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            className="text-muted-foreground/50"
          />
          <text x={4} y={breakEvenY - 6} className="fill-muted-foreground text-[9px] font-semibold uppercase tracking-wide">
            Break-even
          </text>

          <motion.path
            d={curvePath}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            className="text-brand"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.4, ease: "easeInOut" }}
          />

          {markers.map((marker, index) => {
            const Icon = marker.icon;
            const labelY = marker.y > breakEvenY ? marker.y + 26 : marker.y - 14;
            return (
              <motion.g
                key={marker.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={played ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.3 + index * 0.25, ease: "easeOut" }}
                style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
              >
                <circle cx={marker.x} cy={marker.y} r={13} className="fill-card stroke-brand/30" strokeWidth={1.5} />
                <foreignObject x={marker.x - 7} y={marker.y - 7} width={14} height={14}>
                  <Icon className="size-3.5 text-brand" />
                </foreignObject>
                <text
                  x={marker.x}
                  y={labelY}
                  textAnchor={marker.anchor}
                  className="fill-foreground text-[8.5px] font-semibold"
                >
                  {marker.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The losses were the investment
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4 rounded-2xl bg-background p-4 sm:p-5">
        {loopNodes.map((node, index) => (
          <div key={node.label} className="flex items-center">
            <span className="rounded-full border border-brand/20 bg-card px-3 py-1.5 text-xs font-semibold sm:text-sm">
              {node.label}
            </span>
            {index < loopNodes.length - 1 ? (
              <FloatingArrow played={played} reducedMotion={reducedMotion} delay={index * 0.2} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export { JioBurnCurveDiagram };

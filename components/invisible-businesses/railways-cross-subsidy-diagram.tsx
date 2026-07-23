"use client";

import { motion } from "framer-motion";
import { Truck, Users } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const loopNodes = [
  { label: "Freight Revenue" },
  { label: "Funds Passenger Subsidy" },
  { label: "Fares Stay Affordable" },
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

function RailwaysCrossSubsidyDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const cx = 140;
  const cy = 70;
  const tiltDeg = 10;

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Cross-Subsidy Ledger
      </span>

      <div className="flex justify-center">
        <svg viewBox="0 0 280 170" className="w-full max-w-sm">
          <polygon points={`${cx - 14},150 ${cx + 14},150 ${cx},128`} className="fill-brand/30" />
          <line x1={cx} y1={128} x2={cx} y2={cy} stroke="currentColor" strokeWidth={2} className="text-brand/40" />

          <motion.g
            initial={{ rotate: 0 }}
            animate={played ? { rotate: tiltDeg } : {}}
            transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <line x1={30} y1={cy} x2={250} y2={cy} stroke="currentColor" strokeWidth={4} strokeLinecap="round" className="text-brand" />

            <g transform={`translate(30, ${cy})`}>
              <rect x={-38} y={0} width={76} height={44} rx={12} className="fill-brand" />
              <foreignObject x={-14} y={8} width={28} height={28}>
                <Truck className="size-7 text-brand-foreground" />
              </foreignObject>
              <text x={0} y={62} textAnchor="middle" className="fill-foreground text-[10px] font-bold">
                Freight
              </text>
              <text x={0} y={74} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                ~₹1.78L cr / yr
              </text>
            </g>

            <g transform={`translate(250, ${cy - 30})`}>
              <rect x={-34} y={-40} width={68} height={40} rx={12} className="fill-card stroke-brand/30" strokeWidth={1.5} />
              <foreignObject x={-12} y={-32} width={24} height={24}>
                <Users className="size-6 text-brand" />
              </foreignObject>
              <text x={0} y={-46} textAnchor="middle" className="fill-foreground text-[10px] font-bold">
                Passengers
              </text>
              <text x={0} y={10} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                ~₹80,000 cr / yr
              </text>
            </g>
          </motion.g>
        </svg>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The ticket price is a policy, not a cost
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

export { RailwaysCrossSubsidyDiagram };

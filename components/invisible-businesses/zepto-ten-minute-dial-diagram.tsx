"use client";

import { motion } from "framer-motion";
import { Bike, CheckCircle2, Package, ShoppingCart } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const size = 260;
const cx = size / 2;
const cy = 190;
const radius = 120;
const needleLength = 96;

function pointOnArc(t: number, r: number) {
  const angle = Math.PI - t * Math.PI;
  return { x: cx + r * Math.cos(angle), y: cy - r * Math.sin(angle) };
}

const arcStart = pointOnArc(0, radius);
const arcEnd = pointOnArc(1, radius);
const arcPath = `M ${arcStart.x.toFixed(1)},${arcStart.y.toFixed(1)} A ${radius},${radius} 0 0 1 ${arcEnd.x.toFixed(1)},${arcEnd.y.toFixed(1)}`;

const stages = [
  { t: 0.03, label: "Order Placed", sub: "0 min", icon: ShoppingCart },
  { t: 0.35, label: "Dark Store Picks", sub: "2 min", icon: Package },
  { t: 0.68, label: "Rider Dispatched", sub: "5 min", icon: Bike },
  { t: 0.97, label: "Delivered", sub: "10 min", icon: CheckCircle2 },
];

const loopNodes = [
  { label: "Denser Dark Stores" },
  { label: "Faster Delivery" },
  { label: "More Orders" },
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

function ZeptoTenMinuteDialDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The 10-Minute Dial
      </span>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${size} 210`} className="w-full max-w-xs">
          <path d={arcPath} fill="none" stroke="currentColor" strokeWidth={3} className="text-brand/25" />

          {stages.map((stage, index) => {
            const { x, y } = pointOnArc(stage.t, radius);
            const Icon = stage.icon;
            return (
              <motion.g
                key={stage.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={played ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.15 + index * 0.12, ease: "easeOut" }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <circle cx={x} cy={y} r={15} className="fill-card stroke-brand/30" strokeWidth={1.5} />
                <foreignObject x={x - 8} y={y - 8} width={16} height={16}>
                  <Icon className="size-4 text-brand" />
                </foreignObject>
                <text
                  x={x}
                  y={y + 30}
                  textAnchor="middle"
                  className="fill-foreground text-[9px] font-semibold"
                >
                  {stage.sub}
                </text>
              </motion.g>
            );
          })}

          <motion.line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - needleLength}
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            className="text-brand"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            initial={{ rotate: -90 }}
            animate={played ? { rotate: 90 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.6, delay: reducedMotion ? 0 : 0.5, ease: "easeInOut" }}
          />
          <circle cx={cx} cy={cy} r={6} className="fill-brand" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
        {stages.map((stage) => (
          <span key={stage.label} className="text-center text-[11px] leading-tight font-semibold sm:text-xs">
            {stage.label}
          </span>
        ))}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Speed is the product
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

export { ZeptoTenMinuteDialDiagram };

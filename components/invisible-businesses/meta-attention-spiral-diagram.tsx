"use client";

import { motion } from "framer-motion";
import { Database, DollarSign, Smartphone, Sparkles, Timer } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const size = 260;
const center = size / 2;
const turns = 2.25;
const startRadius = 108;
const endRadius = 14;
const steps = 120;

function buildSpiralPath() {
  const points: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const radius = startRadius - (startRadius - endRadius) * t;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

function pointOnSpiral(t: number) {
  const angle = t * turns * Math.PI * 2;
  const radius = startRadius - (startRadius - endRadius) * t;
  return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
}

const nodes = [
  { t: 0.03, label: "You Open The App", icon: Smartphone },
  { t: 0.35, label: "Feed Personalizes", icon: Sparkles },
  { t: 0.65, label: "You Stay Longer", icon: Timer },
  { t: 0.9, label: "More Data Collected", icon: Database },
];

function MetaAttentionSpiralDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const spiralPath = buildSpiralPath();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Attention Spiral
      </span>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="size-64 sm:size-72">
          <motion.path
            d={spiralPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="text-brand/40"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.4, ease: "easeInOut" }}
          />

          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1.2, ease: "easeOut" }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          >
            <motion.circle
              cx={center}
              cy={center}
              r={endRadius + 6}
              className="fill-brand"
              animate={played && !reducedMotion ? { scale: [1, 1.12, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${center}px ${center}px` }}
            />
            <foreignObject x={center - 9} y={center - 9} width={18} height={18}>
              <DollarSign className="size-[18px] text-brand-foreground" />
            </foreignObject>
          </motion.g>

          {nodes.map((node, index) => {
            const { x, y } = pointOnSpiral(node.t);
            const Icon = node.icon;
            return (
              <motion.g
                key={node.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={played ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.3 + index * 0.25, ease: "easeOut" }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <circle cx={x} cy={y} r={13} className="fill-card stroke-brand/30" strokeWidth={1.5} />
                <foreignObject x={x - 7} y={y - 7} width={14} height={14}>
                  <Icon className="size-3.5 text-brand" />
                </foreignObject>
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
        {nodes.map((node) => (
          <span key={node.label} className="text-center text-[11px] leading-tight font-semibold sm:text-xs">
            {node.label}
          </span>
        ))}
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Attention converges into revenue
        </span>
      </div>
    </div>
  );
}

export { MetaAttentionSpiralDiagram };

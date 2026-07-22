"use client";

import { motion } from "framer-motion";
import { Users, Zap } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const cx = 130;
const waterY = 74;

const tipPath = `M ${cx},22 L 102,${waterY} L 158,${waterY} Z`;
const bodyPath = `M 102,${waterY} L 158,${waterY} L 178,150 L ${cx},204 L 82,150 Z`;

function ZerodhaIcebergDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Iceberg
      </span>

      <div className="flex justify-center">
        <svg viewBox="0 0 260 220" className="w-full max-w-xs">
          <motion.path
            d={bodyPath}
            className="fill-brand"
            initial={{ opacity: 0, y: -8 }}
            animate={played ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
          />
          <motion.path
            d={tipPath}
            className="fill-brand/30 stroke-brand/50"
            strokeWidth={1.5}
            initial={{ opacity: 0, y: -8 }}
            animate={played ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <line
            x1={30}
            y1={waterY}
            x2={230}
            y2={waterY}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            className="text-muted-foreground/50"
          />
          <text x={130} y={waterY - 8} textAnchor="middle" className="fill-muted-foreground text-[9px] font-semibold uppercase tracking-wide">
            ₹0 brokerage — the surface
          </text>

          <motion.g
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.6 }}
          >
            <foreignObject x={cx - 8} y={38} width={16} height={16}>
              <Users className="size-4 text-brand-foreground" />
            </foreignObject>
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.8 }}
          >
            <foreignObject x={cx - 9} y={130} width={18} height={18}>
              <Zap className="size-[18px] text-brand-foreground" />
            </foreignObject>
          </motion.g>
        </svg>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-1 rounded-2xl bg-background p-3 text-center">
          <span className="text-xs font-semibold sm:text-sm">Free Delivery Investors</span>
          <span className="text-[10px] text-muted-foreground">Most users, above the surface</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-2xl bg-background p-3 text-center">
          <span className="text-xs font-semibold sm:text-sm">Intraday &amp; F&amp;O Traders</span>
          <span className="text-[10px] text-muted-foreground">A small share, almost all the revenue</span>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Most of it is below the surface
        </span>
      </div>
    </div>
  );
}

export { ZerodhaIcebergDiagram };

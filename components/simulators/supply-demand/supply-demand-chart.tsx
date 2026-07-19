"use client";

import { motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface SupplyDemandChartProps {
  demandP0: number;
  supplyP0: number;
  maxQ: number;
  price: number;
  quantity: number;
}

const PRICE_SCALE = 180;
const X_MIN = 8;
const X_MAX = 96;
const Y_TOP = 4;
const Y_BOTTOM = 68;

function priceToY(price: number) {
  const clamped = Math.max(0, Math.min(PRICE_SCALE, price));
  return Y_BOTTOM - (clamped / PRICE_SCALE) * (Y_BOTTOM - Y_TOP);
}

function qtyToX(qty: number, maxQ: number) {
  const clamped = Math.max(0, Math.min(maxQ, qty));
  return X_MIN + (clamped / maxQ) * (X_MAX - X_MIN);
}

function SupplyDemandChart({ demandP0, supplyP0, maxQ, price, quantity }: SupplyDemandChartProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const transition = { duration: reducedMotion ? 0 : 0.4, ease: "easeOut" as const };

  const demandLine = { x1: qtyToX(0, maxQ), y1: priceToY(demandP0), x2: qtyToX(maxQ, maxQ), y2: priceToY(0) };
  const supplyLine = { x1: qtyToX(0, maxQ), y1: priceToY(supplyP0), x2: qtyToX(maxQ, maxQ), y2: priceToY(100) };
  const eq = { x: qtyToX(quantity, maxQ), y: priceToY(price) };
  const flatState = { x1: X_MIN, y1: Y_BOTTOM, x2: X_MIN, y2: Y_BOTTOM };

  return (
    <div ref={ref} className="relative aspect-[4/3] w-full">
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full overflow-visible">
        <line x1={X_MIN} y1={Y_TOP} x2={X_MIN} y2={Y_BOTTOM} stroke="var(--color-border)" strokeWidth="0.5" />
        <line x1={X_MIN} y1={Y_BOTTOM} x2={X_MAX} y2={Y_BOTTOM} stroke="var(--color-border)" strokeWidth="0.5" />

        <motion.line
          animate={played ? { x1: X_MIN, y1: eq.y, x2: eq.x, y2: eq.y } : flatState}
          transition={transition}
          stroke="var(--color-brand)"
          strokeWidth="0.3"
          strokeDasharray="1.5,1.5"
          style={{ opacity: played ? 0.4 : 0, transition: "opacity 0.3s ease" }}
        />
        <motion.line
          animate={played ? { x1: eq.x, y1: Y_BOTTOM, x2: eq.x, y2: eq.y } : flatState}
          transition={transition}
          stroke="var(--color-brand)"
          strokeWidth="0.3"
          strokeDasharray="1.5,1.5"
          style={{ opacity: played ? 0.4 : 0, transition: "opacity 0.3s ease" }}
        />

        <motion.line
          animate={played ? demandLine : flatState}
          transition={transition}
          stroke="var(--color-destructive)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <motion.line
          animate={played ? supplyLine : flatState}
          transition={transition}
          stroke="var(--color-brand)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        <motion.circle
          r="1.8"
          className="fill-brand"
          animate={played ? { cx: eq.x, cy: eq.y, opacity: 1 } : { cx: X_MIN, cy: Y_BOTTOM, opacity: 0 }}
          transition={transition}
          style={{ animation: played && !reducedMotion ? "hub-glow 2.6s ease-in-out infinite" : "none" }}
        />
      </svg>

      <div className="absolute top-2 right-2 rounded-xl border border-brand/25 bg-card/90 px-4 py-2.5 text-right shadow-sm backdrop-blur-sm">
        <p className="font-mono text-[10px] tracking-[0.15em] text-brand uppercase">Equilibrium</p>
        <p className="font-serif text-lg font-medium">${price}</p>
        <p className="text-xs text-muted-foreground">{quantity} units</p>
      </div>
    </div>
  );
}

export { SupplyDemandChart };

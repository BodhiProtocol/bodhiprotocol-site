"use client";

import { motion } from "framer-motion";
import { Handshake, Landmark, Volume2 } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const hornPath = "M20,80 Q140,55 260,20 L260,140 Q140,105 20,80 Z";

const stages = [
  { x: 30, y: 80, label: "Soundbox", sub: "₹100/mo", icon: Volume2 },
  { x: 115, y: 78, label: "Merchant Stays Close", sub: "", icon: Handshake },
  { x: 235, y: 80, label: "Loans, Insurance, Wealth", sub: "₹2,593 Cr, +52% YoY", icon: Landmark },
];

function PaytmSoundboxAmplifierDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Soundbox Amplifier
      </span>

      <div className="flex justify-center">
        <svg viewBox="0 0 280 160" className="w-full max-w-md">
          <motion.path
            d={hornPath}
            className="fill-brand/15 stroke-brand/30"
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "20px 80px" }}
          />

          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isLast = index === stages.length - 1;
            return (
              <motion.g
                key={stage.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={played ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.3 + index * 0.25, ease: "easeOut" }}
                style={{ transformOrigin: `${stage.x}px ${stage.y}px` }}
              >
                <circle
                  cx={stage.x}
                  cy={stage.y}
                  r={isLast ? 16 : 13}
                  className={isLast ? "fill-brand" : "fill-card stroke-brand/30"}
                  strokeWidth={1.5}
                />
                <foreignObject x={stage.x - (isLast ? 9 : 7)} y={stage.y - (isLast ? 9 : 7)} width={isLast ? 18 : 14} height={isLast ? 18 : 14}>
                  <Icon className={isLast ? "size-[18px] text-brand-foreground" : "size-3.5 text-brand"} />
                </foreignObject>
                <text
                  x={stage.x}
                  y={stage.y - (isLast ? 26 : 22)}
                  textAnchor="middle"
                  className="fill-foreground text-[8.5px] font-semibold"
                >
                  {stage.label}
                </text>
                {stage.sub ? (
                  <text
                    x={stage.x}
                    y={stage.y + (isLast ? 34 : 28)}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[8px]"
                  >
                    {stage.sub}
                  </text>
                ) : null}
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          A free payment buys the right to sell something else
        </span>
      </div>
    </div>
  );
}

export { PaytmSoundboxAmplifierDiagram };

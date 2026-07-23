"use client";

import { motion } from "framer-motion";
import { Award, Building2, Droplet, IndianRupee, Users } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const tiers = [
  {
    path: "M20,145 L260,145 L220,95 L60,95 Z",
    icon: Users,
    label: "18,600 Village Societies",
    labelY: 138,
    iconX: 140,
    iconY: 118,
  },
  {
    path: "M60,95 L220,95 L190,50 L90,50 Z",
    icon: Building2,
    label: "18 District Unions",
    labelY: 88,
    iconX: 140,
    iconY: 70,
  },
  {
    path: "M90,50 L190,50 L170,10 L110,10 Z",
    icon: Award,
    label: "GCMMF / Amul Brand",
    labelY: 5,
    iconX: 140,
    iconY: 27,
  },
];

const loopNodes = [
  { label: "300 Lakh Litres A Day" },
  { label: "₹1 Lakh Crore Brand" },
  { label: "80%+ Paid Back To Farmers" },
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

function AmulBargainingPyramidDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Bargaining Pyramid
      </span>

      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <motion.div
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.6 }}
        >
          <motion.div
            animate={played && !reducedMotion ? { y: [0, -4, 0] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Droplet className="size-5 text-brand" />
          </motion.div>
          <span className="max-w-14 text-center text-[9px] leading-tight font-semibold sm:max-w-16">
            Milk flows up
          </span>
        </motion.div>

        <svg viewBox="0 0 280 155" className="w-full max-w-xs">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.g
                key={tier.label}
                initial={{ opacity: 0, y: 10 }}
                animate={played ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.2, ease: "easeOut" }}
              >
                <path
                  d={tier.path}
                  className={index === tiers.length - 1 ? "fill-brand" : "fill-brand/25"}
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeOpacity={0.15}
                />
                <foreignObject x={tier.iconX - 8} y={tier.iconY - 8} width={16} height={16}>
                  <Icon className={index === tiers.length - 1 ? "size-4 text-brand-foreground" : "size-4 text-brand"} />
                </foreignObject>
                <text
                  x={140}
                  y={tier.labelY + 8}
                  textAnchor="middle"
                  className={
                    index === tiers.length - 1
                      ? "fill-brand-foreground text-[8.5px] font-bold"
                      : "fill-foreground text-[8.5px] font-semibold"
                  }
                >
                  {tier.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        <motion.div
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.8 }}
        >
          <motion.div
            animate={played && !reducedMotion ? { y: [0, 4, 0] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <IndianRupee className="size-5 text-brand" />
          </motion.div>
          <span className="max-w-14 text-center text-[9px] leading-tight font-semibold sm:max-w-16">
            Value flows back
          </span>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The farmer is the shareholder
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

export { AmulBargainingPyramidDiagram };

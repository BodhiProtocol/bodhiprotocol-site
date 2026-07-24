"use client";

import { motion } from "framer-motion";
import { IndianRupee, Users } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const revenuePath = "M20,40 L120,42 Q145,46 152,130 Q160,140 260,146";
const usersPath = "M20,62 L120,64 Q145,68 155,72 Q170,73 260,66";
const banX = 140;

function Dream11CliffAndCrowdDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Cliff &amp; The Crowd
      </span>

      <div className="flex justify-center">
        <svg viewBox="0 0 280 175" className="w-full max-w-md">
          <line
            x1={banX}
            y1={15}
            x2={banX}
            y2={160}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            className="text-muted-foreground/50"
          />
          <text x={banX} y={10} textAnchor="middle" className="fill-muted-foreground text-[8px] font-semibold uppercase tracking-wide">
            Aug 2025: RMG Banned
          </text>

          <motion.path
            d={revenuePath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="text-muted-foreground/60"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.2, ease: "easeInOut" }}
          />
          <motion.path
            d={usersPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="text-brand"
            initial={{ pathLength: 0 }}
            animate={played ? { pathLength: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.2, delay: reducedMotion ? 0 : 0.2, ease: "easeInOut" }}
          />

          <motion.g
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.9 }}
          >
            <circle cx={20} cy={40} r={4} className="fill-muted-foreground/60" />
            <text x={30} y={38} className="fill-muted-foreground text-[8.5px] font-semibold">
              Revenue
            </text>
            <circle cx={260} cy={146} r={4} className="fill-muted-foreground/60" />
            <foreignObject x={230} y={150} width={14} height={14}>
              <IndianRupee className="size-3.5 text-muted-foreground/60" />
            </foreignObject>
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1.1 }}
          >
            <circle cx={20} cy={62} r={4} className="fill-brand" />
            <text x={30} y={60} className="fill-brand text-[8.5px] font-semibold">
              Users
            </text>
            <circle cx={260} cy={66} r={4} className="fill-brand" />
            <foreignObject x={230} y={45} width={14} height={14}>
              <Users className="size-3.5 text-brand" />
            </foreignObject>
          </motion.g>
        </svg>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          The money disappeared. The habit didn&apos;t.
        </span>
      </div>
    </div>
  );
}

export { Dream11CliffAndCrowdDiagram };

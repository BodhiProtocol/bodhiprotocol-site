"use client";

import { motion } from "framer-motion";
import { Crown, Search, User, Users } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const rings = [
  { label: "1st-Degree Connections", caption: "Free", icon: Users, radius: 44 },
  { label: "Your Full Network", caption: "Free, but hard to search", icon: Search, radius: 74 },
  { label: "Anyone, Anywhere", caption: "Premium InMail only", icon: Crown, radius: 104 },
];

const loopNodes = [
  { label: "More Profile Views" },
  { label: "More Connection Requests" },
  { label: "More Reasons To Upgrade" },
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

function LinkedinReachRingsDiagram() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const size = 240;
  const center = size / 2;

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        The Reach Rings
      </span>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
        <svg viewBox={`0 0 ${size} ${size}`} className="size-56 shrink-0 sm:size-60">
          {rings.map((ring, index) => (
            <motion.circle
              key={ring.label}
              cx={center}
              cy={center}
              r={ring.radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={index === rings.length - 1 ? 2 : 1.5}
              strokeDasharray={index === rings.length - 1 ? "4 4" : undefined}
              className={index === rings.length - 1 ? "text-brand" : "text-brand/30"}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={played ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.18, ease: "easeOut" }}
              style={{ transformOrigin: `${center}px ${center}px` }}
            />
          ))}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={played ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          >
            <circle cx={center} cy={center} r={20} className="fill-brand" />
            <foreignObject x={center - 10} y={center - 10} width={20} height={20}>
              <User className="size-5 text-brand-foreground" />
            </foreignObject>
          </motion.g>
        </svg>

        <div className="flex flex-col gap-3">
          {rings.map((ring, index) => {
            const Icon = ring.icon;
            return (
              <motion.div
                key={ring.label}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: 8 }}
                animate={played ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.3 + index * 0.12, ease: "easeOut" }}
              >
                <span
                  className={
                    index === rings.length - 1
                      ? "flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground"
                      : "flex size-8 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent text-brand"
                  }
                >
                  <Icon className="size-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold sm:text-sm">{ring.label}</span>
                  <span className="text-[10px] text-muted-foreground">{ring.caption}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <span className="rounded-full bg-brand/10 px-4 py-1.5 text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">
          Visibility is the product
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

export { LinkedinReachRingsDiagram };

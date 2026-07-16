"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Cloud,
  Headphones,
  Laptop,
  Lock,
  type LucideIcon,
  Smartphone,
  Tv,
  Watch,
} from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface EcosystemNode {
  label: string;
  caption: string;
  icon: LucideIcon;
}

const nodes: EcosystemNode[] = [
  { label: "Apple Watch", caption: "Your health. Always with you.", icon: Watch },
  { label: "AirPods", caption: "Seamless sound. Always connected.", icon: Headphones },
  { label: "MacBook", caption: "Works better because it's Apple.", icon: Laptop },
  { label: "iCloud", caption: "Your data. Everywhere.", icon: Cloud },
  { label: "Apple TV", caption: "Entertainment that stays in the family.", icon: Tv },
  { label: "Apple Pay", caption: "Pay effortlessly. Anywhere.", icon: CreditCard },
];

function AppleEcosystemIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const center = 50;
  const radius = 39;

  const points = nodes.map((node, index) => {
    const angle = (-90 + (360 / nodes.length) * index) * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    const dx = x - center;
    const dy = y - center;
    const len = Math.hypot(dx, dy) || 1;
    const perpX = -dy / len;
    const perpY = dx / len;
    const bow = index % 2 === 0 ? 8 : -8;
    const controlX = (center + x) / 2 + perpX * bow;
    const controlY = (center + y) / 2 + perpY * bow;
    const pathLength = len * 1.15;
    return { ...node, index, x, y, controlX, controlY, pathLength };
  });

  const glassCardStyle: CSSProperties = {
    backgroundImage:
      "linear-gradient(var(--card), var(--card)), linear-gradient(135deg, color-mix(in oklab, var(--brand) 55%, transparent), transparent 70%)",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    border: "1px solid transparent",
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-8">
      <div className="relative aspect-square w-full max-w-2xl">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="apple-ib-connector" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          {points.map((point) => (
            <path
              key={point.label}
              d={`M ${center} ${center} Q ${point.controlX} ${point.controlY} ${point.x} ${point.y}`}
              fill="none"
              stroke="url(#apple-ib-connector)"
              strokeWidth={0.5}
              strokeLinecap="round"
              style={{
                strokeDasharray: point.pathLength,
                strokeDashoffset: played ? 0 : point.pathLength,
                opacity: played ? 1 : 0,
                animation:
                  played && !reducedMotion
                    ? `hub-glow 2.8s ease-in-out ${1.4 + point.index * 0.05}s infinite`
                    : "none",
                transition: reducedMotion
                  ? "opacity 300ms ease"
                  : `stroke-dashoffset 0.7s cubic-bezier(.16,1,.3,1) ${0.3 + point.index * 0.08}s, opacity 300ms ease ${0.3 + point.index * 0.08}s`,
              }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={played ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-3xl px-5 py-5 shadow-xl shadow-brand/20 backdrop-blur-sm sm:px-6 sm:py-6"
          style={glassCardStyle}
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-3xl blur-xl"
            style={{
              backgroundColor: "color-mix(in oklab, var(--brand) 45%, transparent)",
              animation:
                played && !reducedMotion ? "hub-glow 2.6s ease-in-out 0.6s infinite" : "none",
            }}
          />
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-md shadow-brand/30 sm:size-12">
            <Smartphone className="size-6 sm:size-7" />
          </span>
          <span className="text-sm font-semibold sm:text-base">iPhone</span>
        </motion.div>

        {points.map((point) => {
          const Icon = point.icon;
          const delay = 0.5 + point.index * 0.12;
          return (
            <motion.div
              key={point.label}
              className="absolute w-24 -translate-x-1/2 -translate-y-1/2 rounded-3xl px-2.5 py-2.5 text-center shadow-sm backdrop-blur-sm sm:w-28 sm:px-3 sm:py-3"
              style={{ left: `${point.x}%`, top: `${point.y}%`, ...glassCardStyle }}
              initial={{ opacity: 0, scale: 0.6, y: 4 }}
              animate={played ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : delay, ease: "easeOut" }}
            >
              <span className="mx-auto mb-1.5 flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand sm:size-8">
                <Icon className="size-3.5 sm:size-4" />
              </span>
              <span className="block text-[10px] leading-tight font-semibold sm:text-[11px]">
                {point.label}
              </span>
              <span className="mt-0.5 hidden text-[9.5px] leading-tight text-muted-foreground sm:block">
                {point.caption}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={played ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1.4 }}
        className="max-w-lg text-center font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl"
      >
        The iPhone <em className="text-brand">attracts you</em>.
        <br />
        The ecosystem <em className="text-brand">keeps you</em>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={played ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: reducedMotion ? 0 : 1.6, ease: "easeOut" }}
        className="flex max-w-md items-center gap-4 rounded-2xl bg-gradient-to-br from-brand/15 via-brand/5 to-transparent px-6 py-4"
        style={{
          animation: played && !reducedMotion ? "hub-glow 3s ease-in-out 2s infinite" : "none",
        }}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Lock className="size-4.5" />
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] tracking-[0.2em] text-brand uppercase">
            Invisible Outcome
          </span>
          <span className="text-sm font-semibold">Higher Switching Cost</span>
          <p className="text-xs leading-snug text-muted-foreground">
            Every Apple purchase quietly increases the value of every purchase before it.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export { AppleEcosystemIllustration };

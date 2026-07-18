"use client";

import { motion } from "framer-motion";

import { useMindGraph } from "@/components/great-minds/mind-graph-context";
import { usePrefersReducedMotion } from "@/components/great-minds/use-prefers-reduced-motion";

// One small abstract motif per discipline — geometry-only, same currentColor
// convention as the always-on default motif below, never a literal/figurative
// sketch (no birds, no muscles, no gears-as-illustration). Keeps every Great
// Minds hero in the same visual language: construction lines, not artwork.
const motifs: Record<string, React.ReactNode> = {
  Art: (
    <g>
      <path d="M120 380 Q 180 340 160 300 Q 140 260 200 250" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M110 400 Q 170 365 155 320" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </g>
  ),
  Science: (
    <g>
      <circle cx="180" cy="320" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="180" y1="264" x2="180" y2="376" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      <line x1="124" y1="320" x2="236" y2="320" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
    </g>
  ),
  Anatomy: (
    <g>
      <path d="M150 260 Q 170 300 150 340 Q 130 380 150 420" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M190 260 Q 210 300 190 340 Q 170 380 190 420" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </g>
  ),
  Nature: (
    <g>
      <line x1="170" y1="240" x2="170" y2="420" stroke="currentColor" strokeWidth="1" />
      <path d="M170 280 Q 210 270 220 240" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <path d="M170 320 Q 130 310 120 280" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <path d="M170 360 Q 210 350 218 320" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </g>
  ),
  Engineering: (
    <g>
      <circle cx="170" cy="330" r="34" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="170" cy="330" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="170" y1="286" x2="170" y2="296" stroke="currentColor" strokeWidth="1" />
      <line x1="170" y1="364" x2="170" y2="374" stroke="currentColor" strokeWidth="1" />
      <line x1="126" y1="330" x2="136" y2="330" stroke="currentColor" strokeWidth="1" />
      <line x1="204" y1="330" x2="214" y2="330" stroke="currentColor" strokeWidth="1" />
    </g>
  ),
  Curiosity: (
    <g>
      <path d="M150 300 Q 150 270 180 270 Q 210 270 210 295 Q 210 315 185 320 L 185 335" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="185" cy="355" r="1.6" fill="currentColor" />
    </g>
  ),
  Observation: (
    <g>
      <ellipse cx="175" cy="330" rx="50" ry="24" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="175" cy="330" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="175" cy="330" r="2" fill="currentColor" />
    </g>
  ),
  Invention: (
    <g>
      <path d="M120 350 L 175 300 L 230 350" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="175" y1="300" x2="175" y2="270" stroke="currentColor" strokeWidth="0.75" />
      <line x1="140" y1="335" x2="210" y2="335" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
    </g>
  ),
};

// Decorative, geometry-only motif (circle-in-square, construction lines) evoking
// Leonardo's technical-drawing style without reproducing any specific sketch.
function LeonardoHeroBackground() {
  const { active } = useMindGraph();
  const reducedMotion = usePrefersReducedMotion();
  const motif = active ? motifs[active.label] : null;

  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="560" y="40" width="180" height="180" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="650" cy="130" r="104" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="546" y1="130" x2="754" y2="130" stroke="currentColor" strokeWidth="0.5" />
      <line x1="650" y1="26" x2="650" y2="234" stroke="currentColor" strokeWidth="0.5" />

      <circle cx="70" cy="420" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="70" cy="420" r="36" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <line x1="10" y1="420" x2="130" y2="420" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="70" y1="360" x2="70" y2="480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

      <path
        d="M120 60 Q 160 20 210 55 T 300 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 3"
      />
      <path
        d="M600 420 Q 650 460 700 430 T 780 445"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 3"
      />

      <motion.g
        key={active?.label ?? "none"}
        initial={{ opacity: 0 }}
        animate={{ opacity: motif ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeInOut" }}
        className="text-brand/[0.06]"
      >
        {motif}
      </motion.g>
    </svg>
  );
}

export { LeonardoHeroBackground };

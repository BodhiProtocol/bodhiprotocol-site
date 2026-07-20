"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ChallengeCelebrationProps {
  onDone: () => void;
}

const PARTICLE_COUNT = 14;

function ChallengeCelebration({ onDone }: ChallengeCelebrationProps) {
  const particles = React.useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (i / PARTICLE_COUNT) * 360 + (i % 2 === 0 ? 8 : -8);
        const distance = 36 + (i % 3) * 10;
        const rad = (angle * Math.PI) / 180;
        return {
          id: i,
          x: Math.round(Math.cos(rad) * distance * 100) / 100,
          y: Math.round(Math.sin(rad) * distance * 100) / 100,
          dim: i % 2 === 0,
        };
      }),
    [],
  );

  React.useEffect(() => {
    const timeout = setTimeout(onDone, 800);
    return () => clearTimeout(timeout);
  }, [onDone]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-visible">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={cn("absolute size-1.5 rounded-full", particle.dim ? "bg-brand/60" : "bg-brand")}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: particle.x, y: particle.y, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export { ChallengeCelebration };

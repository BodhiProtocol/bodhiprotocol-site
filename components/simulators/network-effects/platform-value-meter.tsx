"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface PlatformValueMeterProps {
  value: number;
}

function PlatformValueMeter({ value }: PlatformValueMeterProps) {
  const [display, setDisplay] = React.useState(value);
  const displayRef = React.useRef(value);

  React.useEffect(() => {
    const from = displayRef.current;
    const to = value;
    if (from === to) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      displayRef.current = to;
      setDisplay(to);
      return;
    }

    const duration = 600;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      displayRef.current = current;
      setDisplay(current);
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const clamped = Math.max(0, Math.min(100, display));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Platform Value</span>
        <span className="font-mono text-2xl font-semibold text-brand">{Math.round(clamped)}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-brand"
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export { PlatformValueMeter };

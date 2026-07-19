"use client";

import { motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const BID_HEIGHTS = [20, 35, 50, 65, 80];
const ASK_HEIGHTS = [80, 65, 50, 35, 20];

function OrderBookPreview() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="flex h-24 w-full max-w-[220px] items-end justify-center gap-0.5">
      {BID_HEIGHTS.map((h, i) => (
        <motion.div
          key={`bid-${i}`}
          className="w-3 rounded-t-sm bg-emerald-500/70"
          initial={{ height: "0%" }}
          animate={{ height: played ? `${h}%` : "0%" }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.06, ease: "easeOut" }}
        />
      ))}
      <div className="mx-1 h-full w-px bg-border" />
      {ASK_HEIGHTS.map((h, i) => (
        <motion.div
          key={`ask-${i}`}
          className="w-3 rounded-t-sm bg-red-500/70"
          initial={{ height: "0%" }}
          animate={{ height: played ? `${h}%` : "0%" }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
            delay: reducedMotion ? 0 : 0.3 + i * 0.06,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export { OrderBookPreview };

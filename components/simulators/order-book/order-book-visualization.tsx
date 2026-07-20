"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { useCountUp } from "@/components/simulators/use-count-up";
import type { Book, OrderImpact, StatusLabel } from "@/components/simulators/order-book/use-order-book-simulator";
import { cn } from "@/lib/utils";

interface OrderBookVisualizationProps {
  book: Book;
  statusLabel: StatusLabel;
  lastOrderImpact: OrderImpact | null;
  className?: string;
}

const MAX_UNITS = 100;
const PARTICLE_COUNT = 4;

function heightPct(size: number) {
  return Math.max(4, Math.min(100, (size / MAX_UNITS) * 100));
}

function Bar({
  size,
  side,
  played,
  reducedMotion,
  delay,
}: {
  size: number;
  side: "bid" | "ask";
  played: boolean;
  reducedMotion: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className={cn(
        "w-4 rounded-sm sm:w-5",
        side === "bid" ? "bg-emerald-500/70" : "bg-red-500/70",
      )}
      initial={{ height: "0%" }}
      animate={{ height: played ? `${heightPct(size)}%` : "0%" }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut", delay: reducedMotion ? 0 : delay }}
    />
  );
}

function ParticleColumn({
  side,
  active,
  reducedMotion,
}: {
  side: "bid" | "ask";
  active: boolean;
  reducedMotion: boolean;
}) {
  if (!active || reducedMotion) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <motion.span
          key={i}
          className={cn(
            "absolute size-1 rounded-full",
            side === "bid" ? "bg-emerald-400" : "bg-red-400",
          )}
          style={{ left: side === "bid" ? `${20 + i * 15}%` : `${80 - i * 15}%` }}
          animate={{
            y: [18, -18, 18],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 2.2 + (i % 2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function OrderBookVisualization({ book, statusLabel, lastOrderImpact, className }: OrderBookVisualizationProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const displayMid = useCountUp(book.midPrice);
  const displaySpread = useCountUp(book.spread);

  const [flashKey, setFlashKey] = React.useState(0);
  const [flashSide, setFlashSide] = React.useState<"bid" | "ask" | null>(null);
  const seenImpactRef = React.useRef<OrderImpact | null>(null);

  React.useEffect(() => {
    if (lastOrderImpact && lastOrderImpact !== seenImpactRef.current) {
      seenImpactRef.current = lastOrderImpact;
      setFlashSide(lastOrderImpact.side === "buy" ? "ask" : "bid");
      setFlashKey((n) => n + 1);
      const timeout = setTimeout(() => setFlashSide(null), 700);
      return () => clearTimeout(timeout);
    }
  }, [lastOrderImpact]);

  const bidOuterToInner = [...book.bidLevels].reverse();
  const askInnerToOuter = book.askLevels;

  return (
    <div ref={ref} className={cn("relative flex w-full flex-col gap-4", className)}>
      <div className="flex justify-between font-mono text-[10px] tracking-[0.15em] uppercase">
        <span className="text-emerald-600 dark:text-emerald-400">Bid</span>
        <span className="text-red-600 dark:text-red-400">Ask</span>
      </div>

      <div className="relative flex h-40 items-end justify-center gap-0.5 sm:h-48">
        <div className="relative flex h-full items-end gap-0.5">
          <AnimatePresence>
            {flashSide === "bid" ? (
              <motion.div
                key={`bid-flash-${flashKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute inset-0 rounded-lg bg-emerald-400"
              />
            ) : null}
          </AnimatePresence>
          <ParticleColumn side="bid" active={statusLabel === "Price Discovery"} reducedMotion={reducedMotion} />
          {bidOuterToInner.map((level, i) => (
            <Bar
              key={level.price}
              size={level.size}
              side="bid"
              played={played}
              reducedMotion={reducedMotion}
              delay={i * 0.05}
            />
          ))}
        </div>

        <div className="mx-2 flex h-full flex-col items-center justify-end gap-1 pb-1 sm:mx-4">
          <div className="rounded-xl border border-brand/25 bg-card/90 px-3 py-2 text-center shadow-sm backdrop-blur-sm sm:px-4">
            <p className="font-mono text-[9px] tracking-[0.15em] text-brand uppercase sm:text-[10px]">Price</p>
            <p className="font-serif text-lg font-medium sm:text-xl">${displayMid.toFixed(2)}</p>
            <p className="text-[10px] text-muted-foreground sm:text-xs">Spread ${displaySpread.toFixed(2)}</p>
          </div>
        </div>

        <div className="relative flex h-full items-end gap-0.5">
          <AnimatePresence>
            {flashSide === "ask" ? (
              <motion.div
                key={`ask-flash-${flashKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute inset-0 rounded-lg bg-red-400"
              />
            ) : null}
          </AnimatePresence>
          <ParticleColumn side="ask" active={statusLabel === "Price Discovery"} reducedMotion={reducedMotion} />
          {askInnerToOuter.map((level, i) => (
            <Bar
              key={level.price}
              size={level.size}
              side="ask"
              played={played}
              reducedMotion={reducedMotion}
              delay={i * 0.05}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { OrderBookVisualization };

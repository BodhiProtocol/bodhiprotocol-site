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
const LEVEL_COUNT = 6;
const AMBIENT_PARTICLE_COUNT = 3;
const BURST_PARTICLE_COUNT = 4;
const MIN_SPREAD_PX = 10;
const MAX_SPREAD_PX = 44;
const SPREAD_FLOOR = 0.05;
const SPREAD_CEIL = 0.5;

function heightPct(size: number) {
  return Math.max(4, Math.min(100, (size / MAX_UNITS) * 100));
}

function Bar({
  size,
  side,
  played,
  reducedMotion,
  delay,
  index,
}: {
  size: number;
  side: "bid" | "ask";
  played: boolean;
  reducedMotion: boolean;
  delay: number;
  index: number;
}) {
  const breatheDelay = (index % 4) * 0.45 + (side === "ask" ? 0.2 : 0);
  const breatheDuration = 3.6 + (index % 3) * 0.7;
  const showOrderDot = played && !reducedMotion && size > 8;

  return (
    <div className="relative w-4 sm:w-5">
      {showOrderDot ? (
        <motion.span
          className={cn(
            "absolute -top-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full",
            side === "bid" ? "bg-emerald-400" : "bg-red-400",
          )}
          animate={{ opacity: [0, 0.9, 0], y: [2, -3, 2] }}
          transition={{
            duration: 2.4 + (index % 3) * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 5) * 0.6,
          }}
        />
      ) : null}
      <motion.div
        className={cn("w-full rounded-sm", side === "bid" ? "bg-emerald-500/70" : "bg-red-500/70")}
        style={{ transformOrigin: "bottom" }}
        initial={{ height: "0%", scaleY: 1 }}
        animate={{
          height: played ? `${heightPct(size)}%` : "0%",
          scaleY:
            played && !reducedMotion ? [1, 1.025, 1, 0.985, 1] : 1,
        }}
        transition={{
          height: { duration: reducedMotion ? 0 : 0.5, ease: "easeOut", delay: reducedMotion ? 0 : delay },
          scaleY:
            played && !reducedMotion
              ? { duration: breatheDuration, repeat: Infinity, ease: "easeInOut", delay: breatheDelay }
              : { duration: 0 },
        }}
      />
    </div>
  );
}

function ParticleColumn({
  side,
  burst,
  reducedMotion,
}: {
  side: "bid" | "ask";
  burst: boolean;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return null;
  const count = burst ? AMBIENT_PARTICLE_COUNT + BURST_PARTICLE_COUNT : AMBIENT_PARTICLE_COUNT;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const isBurstParticle = i >= AMBIENT_PARTICLE_COUNT;
        return (
          <motion.span
            key={i}
            className={cn(
              "absolute rounded-full",
              isBurstParticle ? "size-1" : "size-0.5 opacity-60",
              side === "bid" ? "bg-emerald-400" : "bg-red-400",
            )}
            style={{ left: side === "bid" ? `${18 + i * 14}%` : `${82 - i * 14}%` }}
            animate={{
              y: isBurstParticle ? [20, -20, 20] : [14, -14, 14],
              opacity: isBurstParticle ? [0, 0.9, 0] : [0, 0.5, 0],
            }}
            transition={{
              duration: isBurstParticle ? 1.8 + (i % 2) * 0.4 : 4 + (i % 2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        );
      })}
    </div>
  );
}

function OrderBookVisualization({ book, statusLabel, lastOrderImpact, className }: OrderBookVisualizationProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const displayMid = useCountUp(book.midPrice);
  const displaySpread = useCountUp(book.spread);

  const [flashKey, setFlashKey] = React.useState(0);
  const [flashSide, setFlashSide] = React.useState<"bid" | "ask" | null>(null);
  const [flashLevels, setFlashLevels] = React.useState(0);
  const seenImpactRef = React.useRef<OrderImpact | null>(null);

  React.useEffect(() => {
    if (lastOrderImpact && lastOrderImpact !== seenImpactRef.current) {
      seenImpactRef.current = lastOrderImpact;
      setFlashSide(lastOrderImpact.side === "buy" ? "ask" : "bid");
      setFlashLevels(lastOrderImpact.levelsCleared);
      setFlashKey((n) => n + 1);
      const timeout = setTimeout(() => setFlashSide(null), 700);
      return () => clearTimeout(timeout);
    }
  }, [lastOrderImpact]);

  const bidOuterToInner = [...book.bidLevels].reverse();
  const askInnerToOuter = book.askLevels;

  const consumedFraction = Math.max(0.15, flashLevels) / LEVEL_COUNT;
  const spreadT = Math.max(0, Math.min(1, (book.spread - SPREAD_FLOOR) / (SPREAD_CEIL - SPREAD_FLOOR)));
  const spreadWidth = MIN_SPREAD_PX + spreadT * (MAX_SPREAD_PX - MIN_SPREAD_PX);

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
                className="pointer-events-none absolute inset-y-0 right-0 rounded-lg bg-emerald-400"
                style={{ width: `${consumedFraction * 100}%` }}
              />
            ) : null}
          </AnimatePresence>
          <ParticleColumn side="bid" burst={statusLabel === "Price Discovery"} reducedMotion={reducedMotion} />
          {bidOuterToInner.map((level, i) => (
            <Bar
              key={level.price}
              size={level.size}
              side="bid"
              played={played}
              reducedMotion={reducedMotion}
              delay={i * 0.05}
              index={i}
            />
          ))}
        </div>

        <div className="mx-2 flex h-full flex-col items-center justify-end gap-1.5 pb-1 sm:mx-4">
          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-30%] rounded-full bg-brand/15 blur-xl"
              animate={
                played && !reducedMotion
                  ? { opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }
                  : { opacity: 0.3 }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative rounded-xl border border-brand/25 bg-card/90 px-3 py-2 text-center shadow-sm backdrop-blur-sm sm:px-4"
              animate={played && !reducedMotion ? { scale: [1, 1.015, 1] } : { scale: 1 }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-mono text-[9px] tracking-[0.15em] text-brand uppercase sm:text-[10px]">Price</p>
              <p className="font-serif text-lg font-medium sm:text-xl">${displayMid.toFixed(2)}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">Spread ${displaySpread.toFixed(2)}</p>
            </motion.div>
          </div>
          <motion.div
            className="h-0.5 rounded-full bg-brand/40"
            animate={{ width: spreadWidth }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
          />
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
                className="pointer-events-none absolute inset-y-0 left-0 rounded-lg bg-red-400"
                style={{ width: `${consumedFraction * 100}%` }}
              />
            ) : null}
          </AnimatePresence>
          <ParticleColumn side="ask" burst={statusLabel === "Price Discovery"} reducedMotion={reducedMotion} />
          {askInnerToOuter.map((level, i) => (
            <Bar
              key={level.price}
              size={level.size}
              side="ask"
              played={played}
              reducedMotion={reducedMotion}
              delay={i * 0.05}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { OrderBookVisualization };

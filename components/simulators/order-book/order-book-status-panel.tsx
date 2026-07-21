"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Droplets, Scale, TrendingDown, TrendingUp, Zap, type LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import type { StatusLabel } from "@/components/simulators/order-book/use-order-book-simulator";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface OrderBookStatusPanelProps {
  statusLabel: StatusLabel;
}

const STATUS_DETAILS: Record<StatusLabel, { description: string; icon: LucideIcon; className: string }> = {
  "Price Discovery": {
    description: "An order just consumed resting liquidity — the market is finding a new price right now.",
    icon: Zap,
    className: "text-brand",
  },
  "Volatile Market": {
    description: "Several orders have moved price in quick succession — the book hasn't settled yet.",
    icon: AlertTriangle,
    className: "text-amber-600 dark:text-amber-400",
  },
  "Very Thin Market": {
    description: "Both walls are thin — even a small order can move price sharply.",
    icon: Droplets,
    className: "text-amber-600 dark:text-amber-400",
  },
  "Heavy Buying Pressure": {
    description: "Buyers dominate the book — the bid wall is thick and price is tilting upward.",
    icon: TrendingUp,
    className: "text-emerald-600 dark:text-emerald-400",
  },
  "Heavy Selling Pressure": {
    description: "Sellers dominate the book — the ask wall is thick and price is tilting downward.",
    icon: TrendingDown,
    className: "text-red-600 dark:text-red-400",
  },
  "Healthy Liquidity": {
    description: "Buyers and sellers are roughly balanced with deep walls on both sides.",
    icon: Scale,
    className: "text-brand",
  },
};

function OrderBookStatusPanel({ statusLabel }: OrderBookStatusPanelProps) {
  const detail = STATUS_DETAILS[statusLabel];
  const Icon = detail.icon;

  return (
    <GlassCard className="gap-4 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
      <Eyebrow className="text-brand">Market Status</Eyebrow>
      <AnimatePresence mode="wait">
        <motion.div
          key={statusLabel}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full bg-muted", detail.className)}>
              <Icon className="size-4" />
            </span>
            <span className="font-serif text-xl font-medium text-balance">{statusLabel}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{detail.description}</p>
        </motion.div>
      </AnimatePresence>
    </GlassCard>
  );
}

export { OrderBookStatusPanel };

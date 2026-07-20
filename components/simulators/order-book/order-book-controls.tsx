"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown, TrendingDown, TrendingUp } from "lucide-react";

import { SegmentedToggle } from "@/components/simulators/segmented-toggle";
import { Slider } from "@/components/simulators/slider";
import type {
  OrderFireSize,
  OrderSide,
  SliderState,
} from "@/components/simulators/order-book/use-order-book-simulator";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface OrderBookControlsProps {
  state: SliderState & { orderFireSize: OrderFireSize };
  disabled: boolean;
  onChange: <K extends keyof SliderState>(key: K, value: SliderState[K]) => void;
  onOrderFireSizeChange: (size: OrderFireSize) => void;
  onFireMarketOrder: (side: OrderSide, size: OrderFireSize) => void;
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function OrderBookControls({
  state,
  disabled,
  onChange,
  onOrderFireSizeChange,
  onFireMarketOrder,
}: OrderBookControlsProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sliders = (
    <div className="flex flex-col gap-6">
      <Slider
        label="Buy Interest"
        value={state.buyInterest}
        min={0}
        max={100}
        formatValue={formatPercent}
        disabled={disabled}
        onChange={(value) => onChange("buyInterest", value)}
      />
      <Slider
        label="Sell Interest"
        value={state.sellInterest}
        min={0}
        max={100}
        formatValue={formatPercent}
        disabled={disabled}
        onChange={(value) => onChange("sellInterest", value)}
      />
      <Slider
        label="Liquidity"
        value={state.liquidity}
        min={0}
        max={100}
        formatValue={formatPercent}
        disabled={disabled}
        onChange={(value) => onChange("liquidity", value)}
      />
      <Slider
        label="Order Size"
        value={state.orderSize}
        min={0}
        max={100}
        formatValue={formatPercent}
        disabled={disabled}
        onChange={(value) => onChange("orderSize", value)}
      />
    </div>
  );

  const actions = (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-foreground">Market Order Size</span>
        <SegmentedToggle<OrderFireSize>
          value={state.orderFireSize}
          onChange={onOrderFireSizeChange}
          aria-label="Market order size"
          options={[
            { value: "small", label: "Small" },
            { value: "large", label: "Large" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onFireMarketOrder("buy", state.orderFireSize)}
          className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium text-emerald-600 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:text-emerald-400"
        >
          <TrendingUp className="size-4" />
          Market Buy
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onFireMarketOrder("sell", state.orderFireSize)}
          className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:text-red-400"
        >
          <TrendingDown className="size-4" />
          Market Sell
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <Eyebrow className="text-brand">Controls</Eyebrow>

      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground lg:hidden"
        aria-expanded={mobileOpen}
      >
        Adjust Controls
        <ChevronDown className={cn("size-4 transition-transform duration-200", mobileOpen && "rotate-180")} />
      </button>

      <div className="hidden flex-col gap-8 lg:flex">
        {sliders}
        {actions}
      </div>

      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden lg:hidden"
      >
        <div className="flex flex-col gap-8 pt-2">
          {sliders}
          {actions}
        </div>
      </motion.div>
    </div>
  );
}

export { OrderBookControls };

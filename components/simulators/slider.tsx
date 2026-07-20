"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  scale?: "linear" | "log";
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

function toPosition(value: number, min: number, max: number, scale: "linear" | "log") {
  if (scale === "log") {
    const logMin = Math.log10(min);
    const logMax = Math.log10(max);
    const logVal = Math.log10(Math.max(value, min));
    return ((logVal - logMin) / (logMax - logMin)) * 100;
  }
  return ((value - min) / (max - min)) * 100;
}

function fromPosition(position: number, min: number, max: number, scale: "linear" | "log") {
  if (scale === "log") {
    const logMin = Math.log10(min);
    const logMax = Math.log10(max);
    const logVal = logMin + (position / 100) * (logMax - logMin);
    return Math.round(10 ** logVal);
  }
  return min + (position / 100) * (max - min);
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  scale = "linear",
  formatValue,
  disabled,
  className,
}: SliderProps) {
  const inputId = React.useId();
  const displayValue = formatValue ? formatValue(value) : String(Math.round(value));
  const inputValue = scale === "log" ? toPosition(value, min, max, scale) : value;
  const inputMin = scale === "log" ? 0 : min;
  const inputMax = scale === "log" ? 100 : max;
  const inputStep = scale === "log" ? 0.1 : step;

  const handleChange = (raw: number) => {
    onChange(scale === "log" ? fromPosition(raw, min, max, scale) : raw);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <motion.span
          key={displayValue}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-block font-mono text-sm font-semibold text-brand"
        >
          {displayValue}
        </motion.span>
      </div>
      <input
        id={inputId}
        type="range"
        min={inputMin}
        max={inputMax}
        step={inputStep}
        value={inputValue}
        disabled={disabled}
        onChange={(event) => handleChange(Number(event.target.value))}
        className={cn(
          "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-brand transition-shadow duration-300",
          "hover:shadow-[0_0_10px_-2px_var(--color-brand)]",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          disabled && "cursor-not-allowed opacity-50",
        )}
      />
    </div>
  );
}

export { Slider };

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown, RefreshCw, TriangleAlert } from "lucide-react";

import { Slider } from "@/components/simulators/slider";
import type { SimulatorState } from "@/components/simulators/flywheel/use-flywheel-simulator";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface FlywheelControlsProps {
  state: SimulatorState;
  onChange: <K extends keyof SimulatorState>(key: K, value: SimulatorState[K]) => void;
  highlightedKey: keyof SimulatorState | null;
  onHoverField: (key: keyof SimulatorState | null) => void;
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

interface HighlightableProps {
  fieldKey: keyof SimulatorState;
  highlightedKey: keyof SimulatorState | null;
  onHoverField: (key: keyof SimulatorState | null) => void;
  children: React.ReactNode;
}

// A plain wrapper div, not a change to the shared Slider primitive — keeps this
// hover-to-highlight behavior local to Flywheel instead of touching a component
// every other simulator also depends on.
function Highlightable({ fieldKey, highlightedKey, onHoverField, children }: HighlightableProps) {
  return (
    <div
      onMouseEnter={() => onHoverField(fieldKey)}
      onMouseLeave={() => onHoverField(null)}
      onFocus={() => onHoverField(fieldKey)}
      onBlur={() => onHoverField(null)}
      className={cn(
        "rounded-lg transition-[background-color] duration-200",
        highlightedKey === fieldKey && "bg-brand/[0.04]",
      )}
    >
      {children}
    </div>
  );
}

function FlywheelControls({ state, onChange, highlightedKey, onHoverField }: FlywheelControlsProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const groups = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <RefreshCw className="size-4 text-brand" aria-hidden="true" />
          The Loop
        </div>
        <div className="flex flex-col gap-6">
          <Highlightable fieldKey="investmentStrength" highlightedKey={highlightedKey} onHoverField={onHoverField}>
            <Slider
              label="Investment"
              value={state.investmentStrength}
              min={0}
              max={100}
              formatValue={formatPercent}
              onChange={(value) => onChange("investmentStrength", value)}
            />
          </Highlightable>
          <Highlightable fieldKey="customerValueStrength" highlightedKey={highlightedKey} onHoverField={onHoverField}>
            <Slider
              label="Customer Value"
              value={state.customerValueStrength}
              min={0}
              max={100}
              formatValue={formatPercent}
              onChange={(value) => onChange("customerValueStrength", value)}
            />
          </Highlightable>
          <Highlightable fieldKey="growthStrength" highlightedKey={highlightedKey} onHoverField={onHoverField}>
            <Slider
              label="Growth"
              value={state.growthStrength}
              min={0}
              max={100}
              formatValue={formatPercent}
              onChange={(value) => onChange("growthStrength", value)}
            />
          </Highlightable>
          <Highlightable fieldKey="reinvestmentStrength" highlightedKey={highlightedKey} onHoverField={onHoverField}>
            <Slider
              label="Reinvestment"
              value={state.reinvestmentStrength}
              min={0}
              max={100}
              formatValue={formatPercent}
              onChange={(value) => onChange("reinvestmentStrength", value)}
            />
          </Highlightable>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <TriangleAlert className="size-4 text-brand" aria-hidden="true" />
          The Drag
        </div>
        <Highlightable fieldKey="friction" highlightedKey={highlightedKey} onHoverField={onHoverField}>
          <Slider
            label="Friction"
            value={state.friction}
            min={0}
            max={100}
            formatValue={formatPercent}
            onChange={(value) => onChange("friction", value)}
          />
        </Highlightable>
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

      <div className="hidden lg:block">{groups}</div>

      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden lg:hidden"
      >
        <div className="pt-2">{groups}</div>
      </motion.div>
    </div>
  );
}

export { FlywheelControls };

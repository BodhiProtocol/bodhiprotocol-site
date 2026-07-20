"use client";

import { Slider } from "@/components/simulators/slider";
import type { InflationState } from "@/components/simulators/inflation/use-inflation-simulator";
import { Eyebrow } from "@/components/ui/typography";

interface InflationControlsProps {
  state: InflationState;
  onChange: <K extends keyof InflationState>(key: K, value: InflationState[K]) => void;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function InflationControls({ state, onChange }: InflationControlsProps) {
  return (
    <div className="flex flex-col gap-6">
      <Eyebrow className="text-brand">Controls</Eyebrow>
      <Slider
        label="Interest Rate"
        value={state.interestRate}
        min={0}
        max={10}
        step={0.25}
        formatValue={formatPercent}
        onChange={(value) => onChange("interestRate", value)}
      />
      <Slider
        label="Money Supply"
        value={state.moneySupply}
        min={0}
        max={200}
        onChange={(value) => onChange("moneySupply", value)}
      />
      <Slider
        label="Productivity"
        value={state.productivity}
        min={0}
        max={200}
        onChange={(value) => onChange("productivity", value)}
      />
    </div>
  );
}

export { InflationControls };

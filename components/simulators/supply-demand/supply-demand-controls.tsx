"use client";

import { Slider } from "@/components/simulators/slider";
import type { SupplyDemandState } from "@/components/simulators/supply-demand/use-supply-demand-simulator";
import { Eyebrow } from "@/components/ui/typography";

interface SupplyDemandControlsProps {
  state: SupplyDemandState;
  onChange: <K extends keyof SupplyDemandState>(key: K, value: SupplyDemandState[K]) => void;
}

function SupplyDemandControls({ state, onChange }: SupplyDemandControlsProps) {
  return (
    <div className="flex flex-col gap-6">
      <Eyebrow className="text-brand">Controls</Eyebrow>
      <Slider label="Demand" value={state.demand} min={0} max={100} onChange={(value) => onChange("demand", value)} />
      <Slider label="Supply" value={state.supply} min={0} max={100} onChange={(value) => onChange("supply", value)} />
      <Slider
        label="Market Size"
        value={state.marketSize}
        min={0}
        max={100}
        onChange={(value) => onChange("marketSize", value)}
      />
    </div>
  );
}

export { SupplyDemandControls };

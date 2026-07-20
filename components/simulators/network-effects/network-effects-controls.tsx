"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { SegmentedToggle } from "@/components/simulators/segmented-toggle";
import { Slider } from "@/components/simulators/slider";
import type {
  NetworkMode,
  SimulatorState,
} from "@/components/simulators/network-effects/use-network-effects-simulator";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface NetworkEffectsControlsProps {
  state: SimulatorState;
  onChange: <K extends keyof SimulatorState>(key: K, value: SimulatorState[K]) => void;
}

function formatUsers(value: number) {
  return value >= 1000 ? `${Math.round(value / 1000)}K` : String(Math.round(value));
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function NetworkEffectsControls({ state, onChange }: NetworkEffectsControlsProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sliders = (
    <div className="flex flex-col gap-6">
      <Slider
        label="Users"
        value={state.users}
        min={100}
        max={100000}
        scale="log"
        formatValue={formatUsers}
        onChange={(value) => onChange("users", value)}
      />
      <Slider
        label="Growth Rate"
        value={state.growthRate}
        min={0}
        max={100}
        formatValue={formatPercent}
        onChange={(value) => onChange("growthRate", value)}
      />
      <Slider
        label="Engagement"
        value={state.engagement}
        min={0}
        max={100}
        formatValue={formatPercent}
        onChange={(value) => onChange("engagement", value)}
      />
      <Slider
        label="Businesses"
        value={state.businesses}
        min={0}
        max={300}
        onChange={(value) => onChange("businesses", value)}
      />
      <Slider
        label="Developers"
        value={state.developers}
        min={0}
        max={150}
        onChange={(value) => onChange("developers", value)}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <Eyebrow className="text-brand">Controls</Eyebrow>
        <SegmentedToggle<NetworkMode>
          value={state.mode}
          onChange={(mode) => onChange("mode", mode)}
          aria-label="Network effect direction"
          options={[
            { value: "positive", label: "Positive" },
            { value: "negative", label: "Negative" },
          ]}
        />
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground lg:hidden"
        aria-expanded={mobileOpen}
      >
        Adjust Controls
        <ChevronDown className={cn("size-4 transition-transform duration-200", mobileOpen && "rotate-180")} />
      </button>

      <div className="hidden lg:block">{sliders}</div>

      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden lg:hidden"
      >
        <div className="pt-2">{sliders}</div>
      </motion.div>
    </div>
  );
}

export { NetworkEffectsControls };

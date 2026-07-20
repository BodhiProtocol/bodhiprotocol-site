"use client";

import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { useCountUp } from "@/components/simulators/use-count-up";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface InsightsPanelProps {
  usersDelta: number;
  businessesDelta: number;
  developersDelta: number;
  platformValueDelta: number;
}

const DeltaStat = React.memo(function DeltaStat({ label, delta }: { label: string; delta: number }) {
  const display = useCountUp(delta);
  const rounded = Math.round(display);
  const positive = delta >= 0;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          "flex items-center gap-1 font-mono text-lg font-semibold",
          positive ? "text-brand" : "text-destructive",
        )}
      >
        {positive ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
        {positive ? "+" : ""}
        {rounded}%
      </span>
    </div>
  );
});

function InsightsPanel({ usersDelta, businessesDelta, developersDelta, platformValueDelta }: InsightsPanelProps) {
  return (
    <GlassCard className="gap-5 p-6 sm:p-6">
      <Eyebrow className="text-brand">Insights</Eyebrow>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DeltaStat label="Users" delta={usersDelta} />
        <DeltaStat label="Businesses" delta={businessesDelta} />
        <DeltaStat label="Developers" delta={developersDelta} />
        <DeltaStat label="Platform Value" delta={platformValueDelta} />
      </div>
    </GlassCard>
  );
}

export { InsightsPanel };

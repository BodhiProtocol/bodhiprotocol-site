import { GlassCard } from "@/components/simulators/glass-card";
import { PlatformValueMeter } from "@/components/simulators/network-effects/platform-value-meter";
import { Eyebrow } from "@/components/ui/typography";

interface StatusPanelProps {
  value: number;
}

function StatusPanel({ value }: StatusPanelProps) {
  return (
    <GlassCard className="gap-6 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
      <Eyebrow className="text-brand">Platform Status</Eyebrow>
      <PlatformValueMeter value={value} />
    </GlassCard>
  );
}

export { StatusPanel };

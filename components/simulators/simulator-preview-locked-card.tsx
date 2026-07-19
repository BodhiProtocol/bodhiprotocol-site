import type { ReactNode } from "react";
import { Lock } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";

interface SimulatorPreviewLockedCardProps {
  title: string;
  description: string;
  preview: ReactNode;
}

function SimulatorPreviewLockedCard({ title, description, preview }: SimulatorPreviewLockedCardProps) {
  return (
    <GlassCard className="group h-full gap-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/10">
      <div className="flex items-center justify-center py-2">{preview}</div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-serif text-2xl leading-snug font-medium text-balance">{title}</h3>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
          <Lock className="size-2.5" />
          Coming soon
        </span>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </GlassCard>
  );
}

export { SimulatorPreviewLockedCard };

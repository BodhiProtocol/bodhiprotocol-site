import { Sparkles } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";

interface LiveExplanationPanelProps {
  explanation: string;
}

function LiveExplanationPanel({ explanation }: LiveExplanationPanelProps) {
  return (
    <GlassCard aria-live="polite" className="gap-3 p-6 sm:p-6">
      <span className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-brand uppercase">
        <Sparkles className="size-3.5" />
        What&apos;s happening
      </span>
      <p className="leading-relaxed text-foreground">{explanation}</p>
    </GlassCard>
  );
}

export { LiveExplanationPanel };

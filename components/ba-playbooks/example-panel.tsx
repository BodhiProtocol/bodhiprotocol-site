import { Lightbulb, Target } from "lucide-react";

import { cn } from "@/lib/utils";
import { FieldLabel } from "@/components/ba-playbooks/field-label";

interface ExamplePanelProps {
  label: string;
  icon?: React.ComponentProps<typeof FieldLabel>["icon"];
  children: React.ReactNode;
  className?: string;
}

// Generic labeled panel — the shared shell behind WhyItHelps and WhenToUse below.
function ExamplePanel({ label, icon, children, className }: ExamplePanelProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <FieldLabel icon={icon}>{label}</FieldLabel>
      <p className="text-sm leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}

function WhyItHelps({ children }: { children: React.ReactNode }) {
  return (
    <ExamplePanel label="Why it helps" icon={Lightbulb}>
      {children}
    </ExamplePanel>
  );
}

function WhenToUse({ children }: { children: React.ReactNode }) {
  return (
    <ExamplePanel label="When to use" icon={Target}>
      {children}
    </ExamplePanel>
  );
}

export { ExamplePanel, WhyItHelps, WhenToUse };

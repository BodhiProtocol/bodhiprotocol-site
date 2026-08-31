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

function WhyItHelps({ children, label = "Why it helps" }: { children: React.ReactNode; label?: string }) {
  return (
    <ExamplePanel label={label} icon={Lightbulb}>
      {children}
    </ExamplePanel>
  );
}

function WhenToUse({ children, label = "When to use" }: { children: React.ReactNode; label?: string }) {
  return (
    <ExamplePanel label={label} icon={Target}>
      {children}
    </ExamplePanel>
  );
}

export { ExamplePanel, WhyItHelps, WhenToUse };

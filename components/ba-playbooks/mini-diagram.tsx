import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { FieldLabel } from "@/components/ba-playbooks/field-label";

interface MiniDiagramProps {
  steps: string[];
  label?: string;
}

// Generic, data-driven flow diagram: any hack can supply an ordered list of
// steps and get the same visual — no bespoke per-guide diagram component.
// Static by design (no autoplaying motion) — the arrow communicates sequence on its own.
function MiniDiagram({ steps, label = "The flow" }: MiniDiagramProps) {
  if (steps.length === 0) return null;

  return (
    <div className="not-prose flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 rounded-lg border border-border bg-muted/30 px-3 py-3">
        {steps.map((step, index) => (
          <Fragment key={step}>
            {index > 0 ? (
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/70" aria-hidden="true" />
            ) : null}
            <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium whitespace-nowrap text-foreground/85">
              {step}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export { MiniDiagram };

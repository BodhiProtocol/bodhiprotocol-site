"use client";

import * as React from "react";
import { ChevronDown, HelpCircle, Lightbulb, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutType = "insight" | "question" | "example";

const CALLOUT_CONFIG: Record<CalloutType, { icon: typeof Lightbulb; label: string }> = {
  insight: { icon: Lightbulb, label: "Insight" },
  question: { icon: HelpCircle, label: "Ask yourself" },
  example: { icon: Sparkles, label: "Example" },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

function Callout({ type = "insight", title, children }: CalloutProps) {
  const [open, setOpen] = React.useState(true);
  const { icon: Icon, label } = CALLOUT_CONFIG[type];

  return (
    <div className="not-prose my-6 rounded-lg border border-border bg-muted/30">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-4 py-3 text-left"
      >
        <Icon className="size-4 shrink-0 text-brand" />
        <span className="text-sm font-medium">{title ?? label}</span>
        <ChevronDown
          className={cn(
            "ml-auto size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export { Callout };

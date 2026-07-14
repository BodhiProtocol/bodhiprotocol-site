"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-b border-border py-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-heading text-base font-medium">{question}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? <Muted className="mt-2 max-w-2xl">{answer}</Muted> : null}
    </div>
  );
}

export { FaqItem };

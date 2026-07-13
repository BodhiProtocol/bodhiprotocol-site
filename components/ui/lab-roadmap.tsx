"use client";

import * as React from "react";
import { ChevronDown, Compass } from "lucide-react";

import { cn } from "@/lib/utils";

function LabRoadmap({ items }: { items?: string[] }) {
  const [open, setOpen] = React.useState(false);

  if (!items || items.length === 0) return null;

  return (
    <div className="border-t border-border pt-2">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <Compass className="size-3.5" />
        Roadmap
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { LabRoadmap };

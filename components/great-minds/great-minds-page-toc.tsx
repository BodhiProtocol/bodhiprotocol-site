"use client";

import * as React from "react";
import { AlignLeft } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TocSection {
  id: string;
  label: string;
}

const defaultSections: TocSection[] = [
  { id: "core-philosophy", label: "Core Philosophy" },
  { id: "thinking-process", label: "Thinking Process" },
  { id: "mental-models", label: "Mental Models" },
  { id: "big-ideas", label: "Big Ideas" },
  { id: "timeline", label: "Timeline" },
  { id: "books", label: "Books" },
  { id: "related-minds", label: "Related Minds" },
];

function GreatMindsPageToc({ sections = defaultSections }: { sections?: TocSection[] }) {
  const [activeId, setActiveId] = React.useState(sections[0].id);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );

    for (const section of sections) {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-3 text-sm">
      <p className="flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        <AlignLeft className="size-3.5" />
        On this page
      </p>
      <ul className="flex flex-col gap-2.5">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id} className="flex items-center gap-2">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full transition-colors",
                  active ? "bg-brand" : "bg-border",
                )}
              />
              <a
                href={`#${section.id}`}
                className={cn(
                  "transition-colors",
                  active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { GreatMindsPageToc };

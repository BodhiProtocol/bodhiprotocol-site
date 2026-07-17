"use client";

import * as React from "react";
import { AlignLeft } from "lucide-react";

import { cn } from "@/lib/utils";

const sections = [
  { id: "the-invisible-business", label: "The Invisible Business" },
  { id: "why-the-songs-arent-the-product", label: "Why The Songs Aren't The Product" },
  { id: "the-taste-graph", label: "The Taste Graph" },
  { id: "key-takeaways", label: "Key Takeaways" },
];

function SpotifyPageToc() {
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
  }, []);

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
                  active
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground",
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

export { SpotifyPageToc };

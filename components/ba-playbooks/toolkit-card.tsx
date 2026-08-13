"use client";

import { BookOpen, Download, FileText, ListChecks } from "lucide-react";

import { trackEvent } from "@/lib/analytics/track-event";
import type { PlaybookToolkit } from "@/types/content";

const ICONS = {
  checklist: <ListChecks className="size-3.5" aria-hidden="true" />,
  template: <FileText className="size-3.5" aria-hidden="true" />,
  examples: <BookOpen className="size-3.5" aria-hidden="true" />,
} as const;

interface ToolkitCardProps {
  toolkit: PlaybookToolkit;
  /** Renders a shorter, lower-emphasis version for the mid-article reminder CTA instead of the full primary card. */
  compact?: boolean;
}

// The primary "get the toolkit" moment for a playbook — a premium, centered
// card (not a plain DownloadCard grid) so it reads as one cohesive offer
// rather than several separate downloads. Bare <a download> links throughout,
// same reasoning as DownloadCard: these are static file downloads, not page
// navigations, so next/link doesn't apply. Content is fully data-driven via
// `toolkit` so every playbook can offer its own bundle without a bespoke copy
// of this card.
function ToolkitCard({ toolkit, compact = false }: ToolkitCardProps) {
  return (
    <div
      className="not-prose relative overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.08] via-card to-sky-500/[0.05] p-6 text-center shadow-lg shadow-brand/5 sm:p-10"
      aria-label={toolkit.heading}
    >
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Download className="size-5" aria-hidden="true" />
        </span>
        <h2 className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
          {toolkit.heading}
        </h2>
        {compact ? null : (
          <p className="text-sm leading-relaxed font-medium text-foreground/90 text-balance">
            {toolkit.tagline}
          </p>
        )}
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground text-balance">
          {compact ? toolkit.compactDescription : toolkit.description}
        </p>
        <a
          href={toolkit.zipHref}
          download={toolkit.zipFilename}
          onClick={() =>
            trackEvent(`${toolkit.analyticsPrefix}_toolkit_downloaded`, {
              file: toolkit.zipFilename,
              placement: compact ? "reminder" : "primary",
            })
          }
          className="mt-1 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Download className="size-4" aria-hidden="true" />
          {compact ? "Get the Free Toolkit" : "Download the Complete Toolkit"}
        </a>
        {compact ? null : (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {toolkit.files.map((file) => (
              <a
                key={file.filename}
                href={file.href}
                download={file.filename}
                onClick={() =>
                  trackEvent(`${toolkit.analyticsPrefix}_${file.icon}_downloaded`, {
                    file: file.filename,
                  })
                }
                // Same !text-foreground override as DownloadCard — an unlayered
                // global rule otherwise pins interactive elements to the
                // light-mode foreground color in dark mode.
                className="inline-flex items-center gap-1.5 text-xs font-medium !text-foreground/75 underline-offset-4 transition-colors hover:!text-brand hover:underline focus-visible:rounded-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {ICONS[file.icon]}
                {file.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { ToolkitCard };

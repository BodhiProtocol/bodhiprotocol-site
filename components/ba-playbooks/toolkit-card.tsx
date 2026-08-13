"use client";

import { BookOpen, Download, FileText, ListChecks } from "lucide-react";

import { trackEvent } from "@/lib/analytics/track-event";

interface ToolkitLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  filename: string;
  analyticsEvent: string;
}

const secondaryLinks: ToolkitLink[] = [
  {
    icon: <ListChecks className="size-3.5" aria-hidden="true" />,
    label: "Checklist — PDF",
    href: "/downloads/impact-analysis-checklist.pdf",
    filename: "impact-analysis-checklist.pdf",
    analyticsEvent: "impact_analysis_checklist_downloaded",
  },
  {
    icon: <FileText className="size-3.5" aria-hidden="true" />,
    label: "Editable Template — Markdown",
    href: "/downloads/impact-analysis-template.md",
    filename: "impact-analysis-template.md",
    analyticsEvent: "impact_analysis_template_downloaded",
  },
  {
    icon: <BookOpen className="size-3.5" aria-hidden="true" />,
    label: "Completed Examples — Markdown",
    href: "/downloads/impact-analysis-completed-examples.md",
    filename: "impact-analysis-completed-examples.md",
    analyticsEvent: "impact_analysis_examples_downloaded",
  },
];

interface ToolkitCardProps {
  /** Renders a shorter, lower-emphasis version for the mid-article reminder CTA instead of the full primary card. */
  compact?: boolean;
}

// The primary "get the toolkit" moment for this playbook — a premium, centered
// card (not a plain DownloadCard grid) so it reads as one cohesive offer
// rather than three separate downloads. Bare <a download> links throughout,
// same reasoning as DownloadCard: these are static file downloads, not page
// navigations, so next/link doesn't apply.
function ToolkitCard({ compact = false }: ToolkitCardProps) {
  return (
    <div
      className="not-prose relative overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.08] via-card to-sky-500/[0.05] p-6 text-center shadow-lg shadow-brand/5 sm:p-10"
      aria-label="Free Impact Analysis Toolkit"
    >
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Download className="size-5" aria-hidden="true" />
        </span>
        <h2 className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
          Free Impact Analysis Toolkit
        </h2>
        {compact ? null : (
          <p className="text-sm leading-relaxed font-medium text-foreground/90 text-balance">
            The requirement may be one sentence. The impact rarely is.
          </p>
        )}
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground text-balance">
          {compact
            ? "Download the checklist, template and completed examples in one practical toolkit."
            : "Get the printable checklist, editable template and two completed examples."}
        </p>
        <a
          href="/downloads/impact-analysis-toolkit.zip"
          download="impact-analysis-toolkit.zip"
          onClick={() =>
            trackEvent("impact_analysis_toolkit_downloaded", {
              file: "impact-analysis-toolkit.zip",
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
            {secondaryLinks.map((link) => (
              <a
                key={link.filename}
                href={link.href}
                download={link.filename}
                onClick={() => trackEvent(link.analyticsEvent, { file: link.filename })}
                // Same !text-foreground override as DownloadCard — an unlayered
                // global rule otherwise pins interactive elements to the
                // light-mode foreground color in dark mode.
                className="inline-flex items-center gap-1.5 text-xs font-medium !text-foreground/75 underline-offset-4 transition-colors hover:!text-brand hover:underline focus-visible:rounded-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { ToolkitCard };

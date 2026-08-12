"use client";

import { Download } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";
import { trackEvent } from "@/lib/analytics/track-event";

interface DownloadCardProps {
  /** Rendered icon element (not a component reference) — this is a Client
   * Component, and a bare component function can't cross the server/client
   * boundary as a prop. */
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  filename: string;
  meta: string;
  cta: string;
  analyticsEvent: string;
}

// Static file download (not a page navigation), so a plain <a download> rather
// than next/link — same pattern as the existing BA Portfolio Project Template
// download link in content/essays/how-to-start-a-business-analyst-career-from-scratch.mdx.
function DownloadCard({
  icon,
  title,
  description,
  href,
  filename,
  meta,
  cta,
  analyticsEvent,
}: DownloadCardProps) {
  return (
    <Card className="h-full">
      <div className="flex flex-1 flex-col gap-3 px-(--card-spacing)">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
          {icon}
        </span>
        <h3 className="font-heading text-base leading-snug font-medium text-balance">{title}</h3>
        <p className="text-sm leading-relaxed text-foreground/80">{description}</p>
        <Muted className="mt-auto font-mono text-xs">{meta}</Muted>
        <a
          href={href}
          download={filename}
          onClick={() => trackEvent(analyticsEvent, { file: filename })}
          className="inline-flex w-fit items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand/60 hover:bg-brand/5 hover:text-brand focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Download className="size-3.5" aria-hidden="true" />
          {cta}
        </a>
      </div>
    </Card>
  );
}

export { DownloadCard };

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { trackEvent } from "@/lib/analytics/track-event";
import type { ContentRecommendation } from "@/lib/content-relations";

interface ContentRecommendationListProps {
  items: ContentRecommendation[];
  /** Named product event fired on click, e.g. "essay_related_playbook_clicked". */
  analyticsEvent: string;
}

// Single contextual "what's next" callout -- deliberately plainer than the
// numbered ReadNextEssays/RelatedPlaybooks grids, so it reads as one editorial
// recommendation rather than another related-content shelf.
function ContentRecommendationList({ items, analyticsEvent }: ContentRecommendationListProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => trackEvent(analyticsEvent, { href: item.href, title: item.title })}
          className="group flex flex-col gap-2 rounded-2xl border border-border bg-muted/30 p-5 transition-colors hover:border-brand/40 sm:p-6"
        >
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-brand uppercase">
            {item.eyebrow}
          </p>
          <p className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            {item.title}
          </p>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand">
            {item.cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export { ContentRecommendationList };

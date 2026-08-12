"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { trackEvent } from "@/lib/analytics/track-event";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import type { Playbook } from "@/types/content";

interface FeaturedPlaybookCardProps {
  guide: Playbook;
  /** Named product event fired on click. Defaults to the generic "opened from a listing" event. */
  analyticsEvent?: string;
}

function FeaturedPlaybookCard({
  guide,
  analyticsEvent = "ba_playbook_opened",
}: FeaturedPlaybookCardProps) {
  return (
    <Link
      href={`/ba-playbooks/${guide.slug}`}
      aria-label={`Open playbook: ${guide.title}`}
      onClick={() => trackEvent(analyticsEvent, { slug: guide.slug })}
      className="group block"
    >
      <Card className="gap-5 p-6 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60 sm:p-8">
        <Tag className="w-fit border-brand/40 bg-brand/10 text-brand">BA Playbook</Tag>
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-2xl leading-snug font-medium text-balance group-hover:text-brand sm:text-3xl">
            {guide.title}
          </h3>
          <p className="font-heading text-lg leading-snug font-medium text-foreground/85 text-balance">
            {guide.description}
          </p>
        </div>
        {guide.summary ?? guide.intro?.[0] ? (
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            {guide.summary ?? guide.intro?.[0]}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <Muted className="font-mono text-xs">
            {guide.tags[0]} · {guide.hacks.length} practices · {guide.readingTime}
          </Muted>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            Open Playbook
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export { FeaturedPlaybookCard };

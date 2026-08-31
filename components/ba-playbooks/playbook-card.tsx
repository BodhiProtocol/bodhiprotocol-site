"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics/track-event";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import { categoryIcons } from "@/lib/category-icons";
import type { Playbook } from "@/types/content";

interface PlaybookCardProps {
  guide: Playbook;
  practicesLabel?: string;
}

function PlaybookCard({ guide, practicesLabel = "practices" }: PlaybookCardProps) {
  const Icon = categoryIcons[guide.category];

  return (
    <Link
      href={`/ba-playbooks/${guide.slug}`}
      aria-label={`Read playbook: ${guide.title}`}
      onClick={() => trackEvent("ba_playbook_opened", { slug: guide.slug })}
      className="group block"
    >
      <Card className="h-full transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60">
        <div className="flex flex-1 flex-col gap-3 px-(--card-spacing)">
          <div className="flex items-start justify-between gap-2">
            <Tag>{guide.tags[0]}</Tag>
            {Icon ? (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="size-4.5" />
              </span>
            ) : null}
          </div>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance group-hover:text-brand">
            {guide.title}
          </h3>
          <Muted className="line-clamp-2">{guide.description}</Muted>
          <Muted className="mt-auto font-mono text-xs">
            {guide.hacks.length} {practicesLabel} · {guide.readingTime}
          </Muted>
        </div>
      </Card>
    </Link>
  );
}

export { PlaybookCard };

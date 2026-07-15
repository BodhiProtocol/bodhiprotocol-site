import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import type { Essay } from "@/types/content";

function FeaturedEssayCard({
  essay,
  illustration,
}: {
  essay: Essay;
  illustration?: ReactNode;
}) {
  return (
    <Link href={`/essays/${essay.slug}`} className="group block">
      <Card className="grid gap-8 p-6 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{essay.category}</Tag>
            <Tag className="border-brand/40 bg-brand/10 text-brand">Featured</Tag>
          </div>
          <h2 className="font-heading text-2xl leading-snug font-medium text-balance group-hover:text-brand">
            {essay.title}
          </h2>
          <p className="max-w-prose text-muted-foreground">{essay.description}</p>
          <div className="mt-1 flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
              {essay.author.charAt(0)}
            </span>
            <Muted className="font-mono text-xs">
              <span className="text-foreground">{essay.author}</span> · {essay.date} ·{" "}
              {essay.readingTime}
            </Muted>
          </div>
        </div>
        {illustration ? <div className="w-full md:w-[360px]">{illustration}</div> : null}
      </Card>
    </Link>
  );
}

export { FeaturedEssayCard };

import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import { categoryIcons } from "@/lib/category-icons";
import type { Essay } from "@/types/content";

function FeaturedArticleCard({ essay }: { essay: Essay }) {
  const Icon = categoryIcons[essay.category];

  return (
    <Link href={`/essays/${essay.slug}`} className="group block">
      <Card className="flex-col gap-0 overflow-hidden py-0 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60 sm:flex-row">
        <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Tag>{essay.category}</Tag>
            <span className="font-mono text-xs tracking-[0.2em] text-brand uppercase">
              Featured
            </span>
          </div>
          <h2 className="font-heading text-2xl leading-snug font-medium text-balance group-hover:text-brand sm:text-3xl">
            {essay.title}
          </h2>
          <Muted className="max-w-2xl text-base">{essay.description}</Muted>
          <Muted className="mt-auto font-mono text-xs">
            {essay.author} · {essay.date} · {essay.readingTime}
          </Muted>
        </div>
        {Icon ? (
          <div className="hidden shrink-0 items-center justify-center bg-brand/5 sm:flex sm:w-48 lg:w-56">
            <Icon className="size-16 text-brand/40" strokeWidth={1.25} />
          </div>
        ) : null}
      </Card>
    </Link>
  );
}

export { FeaturedArticleCard };

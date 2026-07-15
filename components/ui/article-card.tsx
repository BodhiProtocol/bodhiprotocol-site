import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import type { Essay } from "@/types/content";

function ArticleCard({ essay }: { essay: Essay }) {
  return (
    <Link href={`/essays/${essay.slug}`} className="group block">
      <Card className="h-full transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60">
        {essay.coverImage ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={essay.coverImage}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-3 px-(--card-spacing)">
          <Tag>{essay.category}</Tag>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance group-hover:text-brand">
            {essay.title}
          </h3>
          <Muted className="line-clamp-2">{essay.description}</Muted>
          <Muted className="mt-auto font-mono text-xs">
            {essay.author} · {essay.date} · {essay.readingTime}
          </Muted>
        </div>
      </Card>
    </Link>
  );
}

export { ArticleCard };

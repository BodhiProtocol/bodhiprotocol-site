import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import type { Blueprint } from "@/types/content";

function BlueprintCard({ blueprint }: { blueprint: Blueprint }) {
  return (
    <Link href={`/lighthouse/${blueprint.slug}`} className="group block">
      <Card className="h-full transition-shadow group-hover:shadow-lg group-hover:shadow-foreground/5">
        {blueprint.heroImage ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={blueprint.heroImage}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-3 px-(--card-spacing)">
          <h3 className="font-heading text-lg leading-snug font-medium text-balance group-hover:text-brand">
            {blueprint.title}
          </h3>
          <Muted className="line-clamp-2">{blueprint.summary}</Muted>
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
            {blueprint.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            <Muted className="ml-auto font-mono text-xs">
              {blueprint.readingTime}
            </Muted>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export { BlueprintCard };

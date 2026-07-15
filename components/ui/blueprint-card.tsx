import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import { blueprintIllustrations } from "@/lib/blueprint-illustrations";
import { categoryIcons } from "@/lib/category-icons";
import type { Blueprint } from "@/types/content";

function BlueprintCard({ blueprint }: { blueprint: Blueprint }) {
  const Icon = categoryIcons[blueprint.module];
  const Illustration = blueprintIllustrations[blueprint.slug];

  return (
    <Link href={`/lighthouse/${blueprint.slug}`} className="group block">
      <Card className="h-full transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60">
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
          <div className="flex items-start justify-between gap-2">
            <Tag>{blueprint.module}</Tag>
            {!blueprint.heroImage && !Illustration && Icon ? (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="size-4.5" />
              </span>
            ) : null}
          </div>
          {Illustration ? <Illustration /> : null}
          <h3 className="font-heading text-lg leading-snug font-medium text-balance group-hover:text-brand">
            {blueprint.title}
          </h3>
          <Muted className="line-clamp-2">{blueprint.summary}</Muted>
          <Muted className="mt-auto font-mono text-xs">
            {blueprint.season} · {blueprint.readingTime}
          </Muted>
        </div>
      </Card>
    </Link>
  );
}

export { BlueprintCard };

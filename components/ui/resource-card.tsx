import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import { categoryIcons } from "@/lib/category-icons";
import type { Resource, ResourceKind } from "@/types/content";

const kindLabel: Record<ResourceKind, string> = {
  book: "Book",
  paper: "Paper",
  course: "Course",
  essay: "Essay",
  reference: "Reference",
};

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = categoryIcons[resource.category];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <Card className="h-full transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-brand/15 group-hover:ring-brand/60">
        <div className="flex flex-1 flex-col gap-3 px-(--card-spacing)">
          <div className="flex items-center gap-2">
            <Tag>{kindLabel[resource.kind]}</Tag>
            {resource.free ? <Tag active>Free</Tag> : null}
            <div className="ml-auto flex items-center gap-2">
              {Icon ? (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-4" />
                </span>
              ) : null}
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg leading-snug font-medium text-balance group-hover:text-brand">
              {resource.title}
            </h3>
            <Muted className="font-mono text-xs">
              {resource.author}
              {resource.year ? ` · ${resource.year}` : ""}
            </Muted>
          </div>

          <Muted className="text-pretty">{resource.why}</Muted>

          <Muted className="mt-auto font-mono text-xs">{resource.category}</Muted>
        </div>
      </Card>
    </a>
  );
}

export { ResourceCard };

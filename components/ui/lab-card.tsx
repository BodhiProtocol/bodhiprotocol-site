import Image from "next/image";
import { ExternalLink, FolderGit2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Lab } from "@/types/content";

const statusLabel: Record<Lab["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  planned: "Planned",
};

const difficultyLabel: Record<Lab["difficulty"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

function LabCard({ lab }: { lab: Lab }) {
  return (
    <Card className="h-full">
      {lab.thumbnail ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image src={lab.thumbnail} alt="" fill className="object-cover" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 px-(--card-spacing)">
        <div className="flex items-center justify-between gap-2">
          <Tag>{lab.category}</Tag>
          <Badge
            variant={lab.status === "live" ? "default" : "outline"}
            className={cn(lab.status === "live" && "bg-brand text-brand-foreground")}
          >
            {statusLabel[lab.status]}
          </Badge>
        </div>
        <h3 className="font-heading text-lg leading-snug font-medium text-balance">
          {lab.title}
        </h3>
        <Muted className="line-clamp-2">{lab.description}</Muted>
        <div className="flex flex-wrap gap-1.5">
          {lab.technology.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <Muted className="font-mono text-xs">{difficultyLabel[lab.difficulty]}</Muted>
          <div className="flex items-center gap-3">
            {lab.githubUrl ? (
              <a
                href={lab.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${lab.title} on GitHub`}
                className="text-muted-foreground hover:text-foreground"
              >
                <FolderGit2 className="size-4" />
              </a>
            ) : null}
            {lab.liveUrl ? (
              <a
                href={lab.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${lab.title} live demo`}
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

export { LabCard };

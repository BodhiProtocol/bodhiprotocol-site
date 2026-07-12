import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import type { Essay } from "@/types/content";

function EssayMeta({ essay }: { essay: Essay }) {
  return (
    <div className="flex flex-col gap-4">
      <Muted className="font-mono text-xs">
        {essay.author} · {essay.date} · {essay.readingTime}
      </Muted>
      <div className="flex flex-wrap gap-2">
        <Tag active>{essay.category}</Tag>
        {essay.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}

export { EssayMeta };

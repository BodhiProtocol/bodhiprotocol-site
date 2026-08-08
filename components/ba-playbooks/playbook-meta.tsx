import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import type { Playbook } from "@/types/content";

function PlaybookMeta({ guide }: { guide: Playbook }) {
  const formattedDate = new Date(guide.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="flex flex-col gap-4">
      <Muted className="font-mono text-xs">
        {guide.author} · {formattedDate} · {guide.readingTime} · {guide.hacks.length} practices
      </Muted>
      <div className="flex flex-wrap gap-2">
        <Tag active>{guide.tags[0]}</Tag>
      </div>
    </div>
  );
}

export { PlaybookMeta };

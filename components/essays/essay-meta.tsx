import Link from "next/link";

import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import { slugifyTerm } from "@/lib/essays";
import type { Essay } from "@/types/content";

const linkedTagClassName = "transition-colors hover:border-brand hover:text-brand";

function EssayMeta({ essay }: { essay: Essay }) {
  return (
    <div className="flex flex-col gap-4">
      <Muted className="font-mono text-xs">
        {essay.author} · {essay.readingTime}
      </Muted>
      <div className="flex flex-wrap gap-2">
        <Link href={`/essays/category/${slugifyTerm(essay.category)}`}>
          <Tag active className={linkedTagClassName}>
            {essay.category}
          </Tag>
        </Link>
        {essay.tags.map((tag) => (
          <Link key={tag} href={`/essays/tag/${slugifyTerm(tag)}`}>
            <Tag className={linkedTagClassName}>{tag}</Tag>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { EssayMeta };

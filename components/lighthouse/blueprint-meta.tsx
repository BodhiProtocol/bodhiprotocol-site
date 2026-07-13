import { PdfDownload } from "@/components/lighthouse/pdf-download";
import { Tag } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import type { Blueprint } from "@/types/content";

function BlueprintMeta({ blueprint }: { blueprint: Blueprint }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag active>{blueprint.module}</Tag>
      <Tag>{blueprint.season}</Tag>
      {blueprint.tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      <Muted className="font-mono text-xs">{blueprint.readingTime}</Muted>
      <div className="ml-auto">
        <PdfDownload url={blueprint.pdfUrl} />
      </div>
    </div>
  );
}

export { BlueprintMeta };

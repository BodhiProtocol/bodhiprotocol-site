import { Eyebrow, H1, Lead } from "@/components/ui/typography";
import type { Playbook } from "@/types/content";

function PlaybookHero({ guide, number }: { guide: Playbook; number: number }) {
  return (
    <div className="hero-enter flex flex-col gap-4">
      <Eyebrow className="text-brand">BA Playbook {String(number).padStart(2, "0")}</Eyebrow>
      <H1>{guide.title}</H1>
      <Lead className="max-w-2xl">{guide.description}</Lead>
    </div>
  );
}

export { PlaybookHero };

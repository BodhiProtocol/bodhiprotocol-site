import { Eyebrow, H1, Lead } from "@/components/ui/typography";
import type { Playbook } from "@/types/content";

function PlaybookHero({ guide }: { guide: Playbook }) {
  return (
    <div className="hero-enter flex flex-col gap-4">
      <Eyebrow className="text-brand">BA Playbook</Eyebrow>
      <H1>{guide.title}</H1>
      <Lead className="max-w-2xl">{guide.description}</Lead>
    </div>
  );
}

export { PlaybookHero };

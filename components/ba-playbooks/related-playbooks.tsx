import { ComingSoonPlaybookCard } from "@/components/ba-playbooks/coming-soon-playbook-card";
import { PlaybookCard } from "@/components/ba-playbooks/playbook-card";
import { H3 } from "@/components/ui/typography";
import type { Playbook } from "@/types/content";

interface RelatedPlaybooksProps {
  guides: Playbook[];
  /** Roadmap topics with no page yet, rendered as inert "Coming soon" cards — never broken links. */
  comingSoon?: string[];
}

function RelatedPlaybooks({ guides, comingSoon = [] }: RelatedPlaybooksProps) {
  if (guides.length === 0 && comingSoon.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 border-t border-border pt-8">
      <H3>Related playbooks</H3>
      <div className="grid gap-6 sm:grid-cols-3">
        {guides.map((guide) => (
          <PlaybookCard key={guide.slug} guide={guide} />
        ))}
        {comingSoon.map((title) => (
          <ComingSoonPlaybookCard key={title} title={title} />
        ))}
      </div>
    </div>
  );
}

export { RelatedPlaybooks };

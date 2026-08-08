import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FeaturedPlaybookCard } from "@/components/ba-playbooks/featured-playbook-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Muted } from "@/components/ui/typography";
import { getAllPlaybooks, getFeaturedPlaybook } from "@/lib/ba-playbooks";

// Compact, editorial homepage slot for BA Playbooks -- one featured card, not
// a grid, so it stays quieter than the hero and doesn't compete with it.
function PlaybooksTeaser() {
  const featured = getFeaturedPlaybook();
  if (!featured) return null;

  const number = getAllPlaybooks().findIndex((entry) => entry.slug === featured.slug) + 1;

  return (
    <Section className="bg-muted/30">
      <Container className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="flex flex-col gap-3">
          <Muted className="font-mono text-xs font-medium tracking-[0.14em] uppercase">
            BA Playbooks
          </Muted>
          <p className="font-heading text-2xl leading-snug font-medium text-balance sm:text-3xl">
            The work nobody really teaches you.
          </p>
          <Muted className="max-w-sm">
            Practical guides, templates and real-world patterns for Business Analysts.
          </Muted>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/ba-playbooks" />}
            className="mt-2 h-auto w-fit gap-1.5 px-0 text-brand hover:bg-transparent hover:text-brand"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover/button:border-current">
              Explore BA Playbooks
            </span>
            <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
          </Button>
        </div>
        <FeaturedPlaybookCard
          guide={featured}
          number={number}
          analyticsEvent="ba_playbooks_homepage_clicked"
        />
      </Container>
    </Section>
  );
}

export { PlaybooksTeaser };

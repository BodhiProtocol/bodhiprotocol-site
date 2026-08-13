import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, H1, H2, Lead } from "@/components/ui/typography";
import { FeaturedPlaybookCard } from "@/components/ba-playbooks/featured-playbook-card";
import { PlaybookGrid } from "@/components/ba-playbooks/playbook-grid";
import {
  getAllPlaybooks,
  getFeaturedPlaybook,
  getPlaybookCategories,
  plannedPlaybooks,
} from "@/lib/ba-playbooks";

const description =
  "Practical Business Analyst playbooks for Jira, requirements, UAT, APIs, data, stakeholders, delivery and capital markets.";

export const metadata: Metadata = {
  title: "BA Playbooks — Practical Guides for Business Analysts",
  description,
  alternates: { canonical: "/ba-playbooks" },
  openGraph: {
    type: "website",
    title: "BA Playbooks — Practical Guides for Business Analysts",
    description,
    url: "/ba-playbooks",
    images: ["/opengraph-image"],
  },
};

export default function PlaybooksPage() {
  const guides = getAllPlaybooks();
  const featured = getFeaturedPlaybook();
  const otherGuides = guides.filter((guide) => guide.slug !== featured?.slug);
  const categories = getPlaybookCategories();

  return (
    <>
      <Section className="pt-16 pb-0 sm:pt-24">
        <Container>
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow className="text-brand">BodhiProtocol</Eyebrow>
            <H1>BA Playbooks</H1>
            <p className="font-heading text-xl leading-snug font-medium text-foreground sm:text-2xl">
              The work nobody really teaches you.
            </p>
            <Lead>{description}</Lead>
          </div>
        </Container>
      </Section>

      {featured ? (
        <Section className="pt-10 pb-0 sm:pt-14">
          <Container>
            <FeaturedPlaybookCard guide={featured} />
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container className="flex flex-col gap-8">
          <H2 className="text-2xl sm:text-3xl">Explore BA Playbooks</H2>
          <PlaybookGrid guides={otherGuides} planned={plannedPlaybooks} categories={categories} />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="flex flex-col items-center gap-1 border-t border-border py-12 text-center">
            <p className="font-heading text-lg text-muted-foreground">Essays help you think.</p>
            <p className="font-heading text-lg font-medium text-foreground">
              BA Playbooks help you work.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

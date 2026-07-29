import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/layout/hero";
import { FeaturedEssays } from "@/components/home/featured-essays";
import { SuggestedPathTeaser } from "@/components/home/suggested-path-teaser";
import { FeaturedBlueprints } from "@/components/home/featured-blueprints";
import { FeaturedLabs } from "@/components/home/featured-labs";
import { KnowledgeMap } from "@/components/home/knowledge-map";
import { Section } from "@/components/ui/section";
import { H2, H3, Muted } from "@/components/ui/typography";

const startHere = [
  {
    title: "Capital Markets Business Analyst Roadmap",
    description:
      "Learn trade lifecycle, requirements, user stories, acceptance criteria, and capital markets concepts in one path.",
    href: "/capital-markets-business-analyst",
  },
  {
    title: "Business Analyst Roadmap",
    description:
      "Build the core BA skills: stakeholder analysis, requirements, Jira, UAT, SQL, and process mapping.",
    href: "/business-analyst-roadmap",
  },
  {
    title: "Trade Lifecycle for BAs",
    description:
      "Follow a trade from execution to settlement, reporting, and reconciliation.",
    href: "/trade-lifecycle-business-analyst",
  },
];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="BodhiProtocol"
        title="Understand Complex Systems."
        description="Visual essays, tools, and roadmaps for business analysts learning capital markets, AI, requirements writing, trade lifecycle, and decision-making."
        actions={
          <>
            <Button
              nativeButton={false}
              render={<Link href="/capital-markets-business-analyst" />}
              className="h-11 rounded-full px-7 shadow-sm duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg"
            >
              Start BA Roadmap
            </Button>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link href="/essays" />}
              className="h-11 gap-1.5 px-3 text-muted-foreground duration-200 hover:bg-transparent"
            >
              <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover/button:border-current">
                Explore Essays
              </span>
              <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
            </Button>
          </>
        }
      />
      <Container className="hero-enter pb-16 sm:pb-24 [animation-delay:480ms]">
        <KnowledgeMap />
      </Container>
      <Section className="pt-0">
        <Container className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Muted className="font-mono text-xs font-medium tracking-[0.14em] uppercase">
              Start here
            </Muted>
            <H2>Business analysis and capital markets paths</H2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {startHere.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-48 flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:bg-muted"
              >
                <div className="flex flex-col gap-3">
                  <H3 className="text-2xl">{item.title}</H3>
                  <Muted>{item.description}</Muted>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  Start learning
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <FeaturedEssays />
      <SuggestedPathTeaser />
      <FeaturedBlueprints />
      <FeaturedLabs />
    </>
  );
}

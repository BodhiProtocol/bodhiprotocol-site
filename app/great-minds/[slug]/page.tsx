import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Divider } from "@/components/ui/divider";
import { JsonLd } from "@/components/shared/json-ld";
import { GreatMindsHero } from "@/components/great-minds/great-minds-hero";
import { GreatMindsPageToc } from "@/components/great-minds/great-minds-page-toc";
import { GreatMindsCorePhilosophy } from "@/components/great-minds/great-minds-core-philosophy";
import { GreatMindsThinkingProcess } from "@/components/great-minds/great-minds-thinking-process";
import { GreatMindsMentalModels } from "@/components/great-minds/great-minds-mental-models";
import { GreatMindsBigIdeas } from "@/components/great-minds/great-minds-big-ideas";
import { GreatMindsTimeline } from "@/components/great-minds/great-minds-timeline";
import { GreatMindsBooks } from "@/components/great-minds/great-minds-books";
import { GreatMindsRelated, type RelatedMindDisplay } from "@/components/great-minds/great-minds-related";
import { LeonardoWheelDiagram } from "@/components/great-minds/leonardo-wheel-diagram";
import { LeonardoHeroBackground } from "@/components/great-minds/leonardo-hero-background";
import { NewtonChainDiagram } from "@/components/great-minds/newton-chain-diagram";
import { NewtonHeroBackground } from "@/components/great-minds/newton-hero-background";
import { DarwinTreeDiagram } from "@/components/great-minds/darwin-tree-diagram";
import { DarwinHeroBackground } from "@/components/great-minds/darwin-hero-background";
import { TeslaMotorDiagram } from "@/components/great-minds/tesla-motor-diagram";
import { TeslaHeroBackground } from "@/components/great-minds/tesla-hero-background";
import { MindGraphProvider } from "@/components/great-minds/mind-graph-context";
import { getAllGreatMinds, getGreatMindBySlug, type GreatMindWithContent } from "@/lib/great-minds";
import { mdxOptions } from "@/lib/mdx-options";
import { siteConfig } from "@/lib/site-config";

// Each Great Mind gets its own bespoke hero diagram — the visual metaphor is
// chosen per person (a wheel for Leonardo's connected disciplines won't fit
// everyone), so this is a registry rather than a generic renderer.
const heroDiagrams: Record<string, (mind: GreatMindWithContent) => ReactNode> = {
  "leonardo-da-vinci": (mind) => <LeonardoWheelDiagram nodes={mind.wheel} />,
  "isaac-newton": (mind) => <NewtonChainDiagram nodes={mind.wheel} />,
  "charles-darwin": (mind) => <DarwinTreeDiagram nodes={mind.wheel} />,
  "nikola-tesla": (mind) => <TeslaMotorDiagram nodes={mind.wheel} />,
};

const heroBackgrounds: Record<string, ReactNode> = {
  "leonardo-da-vinci": <LeonardoHeroBackground />,
  "isaac-newton": <NewtonHeroBackground />,
  "charles-darwin": <DarwinHeroBackground />,
  "nikola-tesla": <TeslaHeroBackground />,
};

interface GreatMindPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGreatMinds().map((mind) => ({ slug: mind.slug }));
}

export async function generateMetadata({ params }: GreatMindPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mind = getGreatMindBySlug(slug);
  if (!mind) return {};

  return {
    title: mind.name,
    description: mind.description,
    alternates: { canonical: `/great-minds/${mind.slug}` },
    openGraph: {
      title: mind.name,
      description: mind.description,
      type: "article",
      publishedTime: mind.date,
      url: `/great-minds/${mind.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: mind.name,
      description: mind.description,
    },
  };
}

export default async function GreatMindPage({ params }: GreatMindPageProps) {
  const { slug } = await params;
  const mind = getGreatMindBySlug(slug);
  if (!mind) notFound();

  const mindUrl = `${siteConfig.url}/great-minds/${mind.slug}`;
  const diagram = heroDiagrams[mind.slug]?.(mind);

  const relatedMinds: RelatedMindDisplay[] = (mind.relatedMinds ?? []).map((entry) => {
    const relatedMind = entry.slug ? getGreatMindBySlug(entry.slug) : undefined;
    return {
      name: entry.name,
      slug: relatedMind?.slug,
      era: relatedMind?.era,
      positioning: relatedMind?.positioning,
    };
  });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: mind.name,
    description: mind.description,
    url: mindUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Great Minds", item: `${siteConfig.url}/great-minds` },
      { "@type": "ListItem", position: 3, name: mind.name, item: mindUrl },
    ],
  };

  return (
    <>
      <JsonLd data={personJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <MindGraphProvider>
        <GreatMindsHero
          name={mind.name}
          positioning={mind.positioning}
          quote={mind.quote}
          secondaryQuote={mind.secondaryQuote}
          lifespan={mind.lifespan}
          era={mind.era}
          roles={mind.roles}
          diagram={diagram}
          background={heroBackgrounds[mind.slug]}
        />
      </MindGraphProvider>
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
            <article className="flex min-w-0 flex-col gap-16">
              <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand first:prose-p:font-serif first:prose-p:text-xl first:prose-p:leading-relaxed first:prose-p:text-foreground">
                <MDXRemote source={mind.content} options={mdxOptions} />
              </div>
              <GreatMindsCorePhilosophy philosophy={mind.corePhilosophy} />
              <GreatMindsThinkingProcess steps={mind.thinkingProcess} />
              <GreatMindsMentalModels models={mind.mentalModels} />
              <GreatMindsBigIdeas ideas={mind.bigIdeas} />
              <GreatMindsTimeline events={mind.timeline} />
              <GreatMindsBooks books={mind.books} />
              <Divider />
              <GreatMindsRelated related={relatedMinds} />
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <GreatMindsPageToc />
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

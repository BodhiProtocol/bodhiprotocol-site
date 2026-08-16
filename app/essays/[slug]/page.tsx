import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1 } from "@/components/ui/typography";
import { Divider } from "@/components/ui/divider";
import { EssayMeta } from "@/components/essays/essay-meta";
import { ContentNav } from "@/components/shared/content-nav";
import { ContentRecommendationList } from "@/components/shared/content-recommendation";
import { ReadNextEssays } from "@/components/essays/read-next-essays";
import { RelatedEssays } from "@/components/essays/related-essays";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { JsonLd } from "@/components/shared/json-ld";
import { essayRecommendations } from "@/lib/content-relations";
import {
  BrokerValidationFlow,
  ContinueLearning,
  CounterpartyNetwork,
  FiveTakeaways,
  HorizontalJourney,
  Insight,
  LifecycleRail,
  MarketComparisonTable,
  MarketMakerQuote,
  MarketMirrorChallenge,
  MatchingSequence,
  OrderAnatomyCard,
  OrderBookVisual,
  OrderProgressCard,
  OrderTicketCard,
  OrderTypeToggle,
  PractitionerLayer,
  QueuePriorityChallenge,
  SawVsMarketVisual,
  StoryBridge,
  TradeExecutionHero,
} from "@/components/essays/trade-execution-essay";
import {
  getAdjacentEssays,
  getAllEssays,
  getEssayBySlug,
  getRelatedEssays,
  getSeriesNav,
} from "@/lib/essays";
import { getReadNextEssays } from "@/lib/essay-paths";
import { essayIllustrations } from "@/lib/essay-illustrations";
import { mdxOptions } from "@/lib/mdx-options";
import { siteConfig } from "@/lib/site-config";

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

const immersiveEssaySlugs = new Set(["shiv-pressed-buy-trade-execution"]);

const essayMdxComponents: MDXComponents = {
  BrokerValidationFlow,
  ContinueLearning,
  CounterpartyNetwork,
  FiveTakeaways,
  HorizontalJourney,
  Insight,
  LifecycleRail,
  MarketComparisonTable,
  MarketMakerQuote,
  MarketMirrorChallenge,
  MatchingSequence,
  OrderAnatomyCard,
  OrderBookVisual,
  OrderProgressCard,
  OrderTicketCard,
  OrderTypeToggle,
  PractitionerLayer,
  QueuePriorityChallenge,
  SawVsMarketVisual,
  StoryBridge,
  TradeExecutionHero,
};

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return {};

  const seoTitle = essay.seoTitle ?? essay.title;
  const seoDescription = essay.seoDescription ?? essay.description;

  return {
    title: seoTitle,
    description: seoDescription,
    authors: [{ name: essay.author }],
    alternates: { canonical: `/essays/${essay.slug}` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: essay.date,
      tags: essay.tags,
      url: `/essays/${essay.slug}`,
      images: [`/essays/${essay.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [`/essays/${essay.slug}/opengraph-image`],
    },
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) notFound();

  const seriesNav = getSeriesNav(slug);
  const chronological = getAdjacentEssays(slug);
  // Reading order beats publication order when the essay belongs to a series.
  const previous = seriesNav ? seriesNav.previous : chronological.previous;
  const next = seriesNav ? seriesNav.next : chronological.next;
  const readNext = getReadNextEssays(essay);
  const related = getRelatedEssays(essay);
  const Illustration = essayIllustrations[essay.slug];
  const isImmersiveEssay = immersiveEssaySlugs.has(essay.slug);

  const essayUrl = `${siteConfig.url}/essays/${essay.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.description,
    image: `${essayUrl}/opengraph-image`,
    datePublished: essay.date,
    dateModified: essay.date,
    author: { "@type": "Person", name: essay.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": essayUrl },
    url: essayUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Essays",
        item: `${siteConfig.url}/essays`,
      },
      { "@type": "ListItem", position: 3, name: essay.title, item: essayUrl },
    ],
  };

  return (
    <Section>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
          <article className="flex min-w-0 flex-col gap-8">
            {!isImmersiveEssay ? (
              <div className="flex flex-col gap-4">
                {seriesNav ? (
                  <Link
                    href="/essays"
                    className="group flex w-fit items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-brand"
                  >
                    <span className="font-semibold text-brand">
                      {seriesNav.series.title}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      Part {seriesNav.part} of {seriesNav.total}
                    </span>
                  </Link>
                ) : null}
                <H1>{essay.title}</H1>
                <EssayMeta essay={essay} />
              </div>
            ) : null}
            {Illustration && !isImmersiveEssay ? (
              <div className="max-w-md">
                <Illustration />
              </div>
            ) : null}
            <div className="prose prose-neutral dark:prose-invert prose-headings:font-heading prose-a:text-brand max-w-none">
              <MDXRemote
                source={essay.content}
                options={mdxOptions}
                components={essayMdxComponents}
              />
            </div>
            <ContentRecommendationList
              items={essayRecommendations[essay.slug] ?? []}
              analyticsEvent="essay_related_playbook_clicked"
            />
            <Divider />
            <ReadNextEssays essays={readNext} />
            <RelatedEssays essays={related} />
            <ContentNav previous={previous} next={next} basePath="/essays" />
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={essay.content} />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

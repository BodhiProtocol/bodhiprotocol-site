import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Divider } from "@/components/ui/divider";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { JsonLd } from "@/components/shared/json-ld";
import { IBHero } from "@/components/invisible-businesses/ib-hero";
import { BigIdeaCard } from "@/components/invisible-businesses/big-idea-card";
import { FlywheelDiagram } from "@/components/invisible-businesses/flywheel-diagram";
import { InsightGrid } from "@/components/invisible-businesses/insight-grid";
import { ReflectionCard } from "@/components/invisible-businesses/reflection-card";
import { NextEpisodeCta } from "@/components/invisible-businesses/next-episode-cta";
import {
  getAllInvisibleBusinesses,
  getInvisibleBusinessBySlug,
} from "@/lib/invisible-businesses";
import { ibIllustrations } from "@/lib/ib-illustrations";
import { mdxOptions } from "@/lib/mdx-options";
import { siteConfig } from "@/lib/site-config";

interface IBPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllInvisibleBusinesses().map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: IBPageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getInvisibleBusinessBySlug(slug);
  if (!episode) return {};

  return {
    title: episode.title,
    description: episode.description,
    authors: [{ name: episode.author }],
    alternates: { canonical: `/invisible-businesses/${episode.slug}` },
    openGraph: {
      title: episode.title,
      description: episode.description,
      type: "article",
      publishedTime: episode.date,
      url: `/invisible-businesses/${episode.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description: episode.description,
    },
  };
}

export default async function InvisibleBusinessPage({ params }: IBPageProps) {
  const { slug } = await params;
  const episode = getInvisibleBusinessBySlug(slug);
  if (!episode) notFound();

  const illustrationConfig = ibIllustrations[episode.slug];
  const Illustration = illustrationConfig?.component;
  const episodeUrl = `${siteConfig.url}/invisible-businesses/${episode.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: episode.title,
    description: episode.description,
    image: `${episodeUrl}/opengraph-image`,
    datePublished: episode.date,
    dateModified: episode.date,
    author: { "@type": "Person", name: episode.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": episodeUrl },
    url: episodeUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Invisible Businesses",
        item: `${siteConfig.url}/invisible-businesses`,
      },
      { "@type": "ListItem", position: 3, name: episode.title, item: episodeUrl },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <IBHero
        episode={episode.episode}
        title={episode.title}
        tagline={episode.tagline}
        author={episode.author}
        date={episode.date}
        readingTime={episode.readingTime}
        illustration={Illustration ? <Illustration /> : undefined}
        illustrationWide={illustrationConfig?.wide}
      />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
            <article className="flex min-w-0 flex-col gap-14">
              <BigIdeaCard text={episode.bigIdea} />
              <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
                <MDXRemote source={episode.content} options={mdxOptions} />
              </div>
              {episode.flywheel.length > 0 ? (
                <FlywheelDiagram steps={episode.flywheel} />
              ) : null}
              <InsightGrid heading={episode.insightsHeading} insights={episode.insights} />
              <ReflectionCard text={episode.reflection} />
              <Divider />
              <NextEpisodeCta nextEpisode={episode.nextEpisode} />
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents content={episode.content} />
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

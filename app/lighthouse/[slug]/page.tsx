import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Divider } from "@/components/ui/divider";
import { BlueprintHero } from "@/components/lighthouse/blueprint-hero";
import { BlueprintMeta } from "@/components/lighthouse/blueprint-meta";
import { Callout } from "@/components/lighthouse/callout";
import { RelatedBlueprints } from "@/components/lighthouse/related-blueprints";
import { ContentNav } from "@/components/shared/content-nav";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { JsonLd } from "@/components/shared/json-ld";
import {
  getAdjacentBlueprints,
  getAllBlueprints,
  getBlueprintBySlug,
  getRelatedBlueprints,
} from "@/lib/blueprints";
import { blueprintIllustrations } from "@/lib/blueprint-illustrations";
import { mdxOptions } from "@/lib/mdx-options";
import { siteConfig } from "@/lib/site-config";

interface BlueprintPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlueprints().map((blueprint) => ({ slug: blueprint.slug }));
}

export async function generateMetadata({
  params,
}: BlueprintPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  if (!blueprint) return {};

  return {
    title: blueprint.title,
    description: blueprint.summary,
    alternates: { canonical: `/lighthouse/${blueprint.slug}` },
    openGraph: {
      title: blueprint.title,
      description: blueprint.summary,
      type: "article",
      url: `/lighthouse/${blueprint.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blueprint.title,
      description: blueprint.summary,
    },
  };
}

export default async function BlueprintPage({ params }: BlueprintPageProps) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  if (!blueprint) notFound();

  const { previous, next } = getAdjacentBlueprints(slug);
  const related = getRelatedBlueprints(blueprint);
  const Illustration = blueprintIllustrations[blueprint.slug];

  const blueprintUrl = `${siteConfig.url}/lighthouse/${blueprint.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blueprint.title,
    description: blueprint.summary,
    image: `${blueprintUrl}/opengraph-image`,
    datePublished: blueprint.date,
    dateModified: blueprint.date,
    author: { "@type": "Person", name: blueprint.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": blueprintUrl },
    url: blueprintUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Project Lighthouse", item: `${siteConfig.url}/lighthouse` },
      { "@type": "ListItem", position: 3, name: blueprint.title, item: blueprintUrl },
    ],
  };

  return (
    <Section>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
          <article className="flex min-w-0 flex-col gap-8">
            <BlueprintHero blueprint={blueprint} />
            <BlueprintMeta blueprint={blueprint} />
            {Illustration ? (
              <div className="max-w-md">
                <Illustration />
              </div>
            ) : null}
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
              <MDXRemote
                source={blueprint.content}
                options={mdxOptions}
                components={{ Callout }}
              />
            </div>
            <Divider />
            <RelatedBlueprints blueprints={related} />
            <ContentNav previous={previous} next={next} basePath="/lighthouse" />
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={blueprint.content} />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

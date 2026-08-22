import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Tag as TagIcon } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ArticleCard } from "@/components/ui/article-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/shared/json-ld";
import { getAllTags, getEssaysByTag, slugifyTerm } from "@/lib/essays";
import { siteConfig } from "@/lib/site-config";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: slugifyTerm(tag) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const result = getEssaysByTag(tagSlug);
  if (!result) return {};

  const title = `Essays tagged "${result.tag}"`;
  const description = `${result.essays.length} essay${result.essays.length === 1 ? "" : "s"} tagged "${result.tag}" on BodhiProtocol.`;

  return {
    title,
    description,
    alternates: { canonical: `/essays/tag/${tagSlug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/essays/tag/${tagSlug}`,
      images: ["/opengraph-image"],
    },
  };
}

export default async function EssayTagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const result = getEssaysByTag(tagSlug);
  if (!result) notFound();

  const { tag, essays } = result;
  const tagUrl = `${siteConfig.url}/essays/tag/${tagSlug}`;

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
      { "@type": "ListItem", position: 3, name: `"${tag}"`, item: tagUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHeader
        eyebrow="Essays"
        title={`Tagged "${tag}"`}
        description={`${essays.length} essay${essays.length === 1 ? "" : "s"} touching on ${tag}.`}
      />
      <Section className="pt-10 sm:pt-12">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {essays.map((essay) => (
                <ArticleCard key={essay.slug} essay={essay} />
              ))}
            </div>
            <Link
              href="/essays"
              className="group flex w-fit items-center gap-1.5 font-mono text-xs text-brand"
            >
              <TagIcon aria-hidden="true" className="size-3.5" />
              Browse all essays instead
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

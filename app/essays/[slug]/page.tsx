import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1 } from "@/components/ui/typography";
import { Divider } from "@/components/ui/divider";
import { EssayMeta } from "@/components/essays/essay-meta";
import { ContentNav } from "@/components/shared/content-nav";
import { RelatedEssays } from "@/components/essays/related-essays";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { JsonLd } from "@/components/shared/json-ld";
import {
  getAdjacentEssays,
  getAllEssays,
  getEssayBySlug,
  getRelatedEssays,
} from "@/lib/essays";
import { mdxOptions } from "@/lib/mdx-options";
import { siteConfig } from "@/lib/site-config";

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return {};

  return {
    title: essay.title,
    description: essay.description,
    authors: [{ name: essay.author }],
    alternates: { canonical: `/essays/${essay.slug}` },
    openGraph: {
      title: essay.title,
      description: essay.description,
      type: "article",
      publishedTime: essay.date,
      tags: essay.tags,
      url: `/essays/${essay.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: essay.title,
      description: essay.description,
    },
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) notFound();

  const { previous, next } = getAdjacentEssays(slug);
  const related = getRelatedEssays(essay);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.description,
    datePublished: essay.date,
    author: { "@type": "Person", name: essay.author },
    url: `${siteConfig.url}/essays/${essay.slug}`,
  };

  return (
    <Section>
      <JsonLd data={articleJsonLd} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
          <article className="flex min-w-0 flex-col gap-8">
            <div className="flex flex-col gap-4">
              <H1>{essay.title}</H1>
              <EssayMeta essay={essay} />
            </div>
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
              <MDXRemote source={essay.content} options={mdxOptions} />
            </div>
            <Divider />
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

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1 } from "@/components/ui/typography";
import { Divider } from "@/components/ui/divider";
import { EssayMeta } from "@/components/essays/essay-meta";
import { EssayNav } from "@/components/essays/essay-nav";
import { RelatedEssays } from "@/components/essays/related-essays";
import { TableOfContents } from "@/components/essays/table-of-contents";
import {
  getAdjacentEssays,
  getAllEssays,
  getEssayBySlug,
  getRelatedEssays,
} from "@/lib/essays";
import { mdxOptions } from "@/lib/mdx-options";

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

  return (
    <Section>
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
            <EssayNav previous={previous} next={next} />
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

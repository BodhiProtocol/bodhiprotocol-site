import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ArticleCard } from "@/components/ui/article-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/shared/json-ld";
import { categoryIcons } from "@/lib/category-icons";
import { getAllCategories, getEssaysByCategory, slugifyTerm } from "@/lib/essays";
import { siteConfig } from "@/lib/site-config";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: slugifyTerm(category) }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const result = getEssaysByCategory(categorySlug);
  if (!result) return {};

  const title = `${result.category} essays`;
  const description = `${result.essays.length} essay${result.essays.length === 1 ? "" : "s"} on ${result.category} from BodhiProtocol.`;

  return {
    title,
    description,
    alternates: { canonical: `/essays/category/${categorySlug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/essays/category/${categorySlug}`,
      images: ["/opengraph-image"],
    },
  };
}

export default async function EssayCategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const result = getEssaysByCategory(categorySlug);
  if (!result) notFound();

  const { category, essays } = result;
  const Icon = categoryIcons[category];
  const categoryUrl = `${siteConfig.url}/essays/category/${categorySlug}`;

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
      { "@type": "ListItem", position: 3, name: category, item: categoryUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHeader
        eyebrow="Essays"
        title={category}
        description={`${essays.length} essay${essays.length === 1 ? "" : "s"} on ${category}.`}
        aside={
          Icon ? (
            <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon className="size-6" />
            </span>
          ) : undefined
        }
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

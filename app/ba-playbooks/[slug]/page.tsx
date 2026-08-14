import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Divider } from "@/components/ui/divider";
import { P } from "@/components/ui/typography";
import { AudienceList } from "@/components/ba-playbooks/audience-list";
import { PlaybookHero } from "@/components/ba-playbooks/playbook-hero";
import { PlaybookMeta } from "@/components/ba-playbooks/playbook-meta";
import { PlaybookProgress, PlaybookProgressBar } from "@/components/ba-playbooks/playbook-progress";
import { HackCard } from "@/components/ba-playbooks/hack-card";
import { PlaybookEnding } from "@/components/ba-playbooks/playbook-ending";
import { RelatedPlaybooks } from "@/components/ba-playbooks/related-playbooks";
import { StoryCarriedOverBody } from "@/components/ba-playbooks/story-carried-over-body";
import { WhoOwnsTheRequirementBody } from "@/components/ba-playbooks/who-owns-the-requirement-body";
import { BusinessAnalystUserStoryTemplateBody } from "@/components/ba-playbooks/business-analyst-user-story-template-body";
import { FrontOfficeMiddleOfficeBackOfficeBody } from "@/components/ba-playbooks/front-office-middle-office-back-office-body";
import { UatPassedProductionFailedBody } from "@/components/ba-playbooks/uat-passed-production-failed-body";
import { ImpactAnalysisTemplateBody } from "@/components/ba-playbooks/impact-analysis-template-body";
import { NewProjectDiscoveryPlaybookBody } from "@/components/ba-playbooks/new-project-discovery-playbook-body";
import { ReleaseTomorrowRequirementChangedTodayBody } from "@/components/ba-playbooks/release-tomorrow-requirement-changed-today-body";
import { NobodyCanReproduceTheProductionIssueBody } from "@/components/ba-playbooks/nobody-can-reproduce-the-production-issue-body";
import { ContentNav } from "@/components/shared/content-nav";
import { ContentRecommendationList } from "@/components/shared/content-recommendation";
import { JsonLd } from "@/components/shared/json-ld";
import {
  getAdjacentPlaybooks,
  getAllPlaybooks,
  getPlaybookBySlug,
  getRelatedPlaybooks,
} from "@/lib/ba-playbooks";
import { playbookRecommendations } from "@/lib/content-relations";
import { siteConfig } from "@/lib/site-config";

interface PlaybookPageProps {
  params: Promise<{ slug: string }>;
}

// Playbooks whose body is a narrative walkthrough rather than standalone
// numbered tips render bespoke prose here instead of the hacks card list —
// same slug-keyed registry pattern used for bespoke Invisible Businesses episodes.
const customPlaybookBodies: Partial<Record<string, () => ReactNode>> = {
  "story-carried-over-four-sprints": StoryCarriedOverBody,
  "who-owns-the-requirement": WhoOwnsTheRequirementBody,
  "business-analyst-user-story-template": BusinessAnalystUserStoryTemplateBody,
  "front-office-middle-office-back-office": FrontOfficeMiddleOfficeBackOfficeBody,
  "uat-passed-production-failed": UatPassedProductionFailedBody,
  "impact-analysis-template": ImpactAnalysisTemplateBody,
  "new-project-discovery-playbook": NewProjectDiscoveryPlaybookBody,
  "release-tomorrow-requirement-changed-today": ReleaseTomorrowRequirementChangedTodayBody,
  "nobody-can-reproduce-the-production-issue": NobodyCanReproduceTheProductionIssueBody,
};

export function generateStaticParams() {
  return getAllPlaybooks().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PlaybookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPlaybookBySlug(slug);
  if (!guide) return {};

  const seoTitle = guide.seoTitle ?? guide.title;
  const seoDescription = guide.seoDescription ?? guide.description;

  return {
    title: seoTitle,
    description: seoDescription,
    authors: [{ name: guide.author }],
    alternates: { canonical: `/ba-playbooks/${guide.slug}` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: guide.date,
      tags: guide.tags,
      url: `/ba-playbooks/${guide.slug}`,
      images: [`/ba-playbooks/${guide.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [`/ba-playbooks/${guide.slug}/opengraph-image`],
    },
  };
}

export default async function PlaybookPage({ params }: PlaybookPageProps) {
  const { slug } = await params;
  const guide = getPlaybookBySlug(slug);
  if (!guide) notFound();

  const { previous, next } = getAdjacentPlaybooks(slug);
  const related = getRelatedPlaybooks(guide);
  const guideUrl = `${siteConfig.url}/ba-playbooks/${guide.slug}`;
  const CustomBody = customPlaybookBodies[guide.slug];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: `${guideUrl}/opengraph-image`,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { "@type": "Person", name: guide.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": guideUrl },
    url: guideUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "BA Playbooks",
        item: `${siteConfig.url}/ba-playbooks`,
      },
      { "@type": "ListItem", position: 3, name: guide.title, item: guideUrl },
    ],
  };

  return (
    <Section>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Container>
        <div className={CustomBody ? "flex justify-center" : "grid gap-12 lg:grid-cols-[1fr_240px]"}>
          <article className={CustomBody ? "flex min-w-0 max-w-3xl flex-col gap-8" : "flex min-w-0 flex-col gap-8"}>
            <PlaybookHero guide={guide} />
            <div className="flex max-w-2xl flex-col gap-3">
              <PlaybookMeta guide={guide} />
              {guide.audience?.length ? <AudienceList audience={guide.audience} /> : null}
              {!CustomBody && guide.intro?.length ? (
                <P className="text-muted-foreground">{guide.intro.join(" ")}</P>
              ) : null}
            </div>
            {CustomBody ? (
              <CustomBody />
            ) : (
              <>
                {guide.image ? (
                  <figure className="not-prose flex flex-col items-center gap-3">
                    <Image
                      src={guide.image.src}
                      alt={guide.image.alt}
                      width={guide.image.width}
                      height={guide.image.height}
                      loading="lazy"
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className="h-auto w-full max-w-xl rounded-2xl border border-border"
                    />
                    {guide.image.caption ? (
                      <figcaption className="max-w-xl text-center text-sm text-muted-foreground">
                        {guide.image.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
                <PlaybookProgressBar hacks={guide.hacks} />
                <div className="flex flex-col gap-4">
                  {guide.hacks.map((hack) => (
                    <HackCard key={hack.number} hack={hack} itemLabel={guide.itemLabel} />
                  ))}
                </div>
              </>
            )}
            <Divider />
            <PlaybookEnding guide={guide} url={guideUrl} />
            <ContentRecommendationList
              items={playbookRecommendations[guide.slug] ?? []}
              analyticsEvent="ba_playbook_related_essay_clicked"
            />
            <RelatedPlaybooks guides={related} comingSoon={guide.relatedTopics} />
            <ContentNav previous={previous} next={next} basePath="/ba-playbooks" />
          </article>
          {!CustomBody ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <PlaybookProgress hacks={guide.hacks} />
              </div>
            </aside>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

import type { ComponentProps } from "react";
import { Eye, Quote, ShieldCheck, type LucideIcon } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { AirbnbOutcomeSidebar } from "@/components/invisible-businesses/airbnb-outcome-sidebar";
import { AirbnbPageToc } from "@/components/invisible-businesses/airbnb-page-toc";
import { AirbnbTrustLadderDiagram } from "@/components/invisible-businesses/airbnb-trust-ladder-diagram";
import { GlassCard } from "@/components/invisible-businesses/glass-card";
import { IBArticleHero } from "@/components/invisible-businesses/ib-article-hero";
import { InsightGrid } from "@/components/invisible-businesses/insight-grid";
import { NextEpisodeCta } from "@/components/invisible-businesses/next-episode-cta";
import { ReflectionCard } from "@/components/invisible-businesses/reflection-card";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import type { InvisibleBusinessWithContent } from "@/lib/invisible-businesses";
import { mdxOptions } from "@/lib/mdx-options";

const headingIcons: Record<string, LucideIcon> = {
  "the-invisible-business": Eye,
  "why-the-listing-isnt-the-product": ShieldCheck,
};

function AirbnbHeading({ id, children }: ComponentProps<"h2">) {
  const Icon = id ? headingIcons[id] : undefined;
  return (
    <h2 id={id} className="flex scroll-mt-24 items-center gap-2.5">
      {Icon ? (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Icon className="size-4" />
        </span>
      ) : null}
      <span className="text-brand">{children}</span>
    </h2>
  );
}

const mdxComponents = { h2: AirbnbHeading };

function AirbnbEpisodeBody({ episode }: { episode: InvisibleBusinessWithContent }) {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="flex min-w-0 flex-col gap-10">
            <IBArticleHero
              episode={episode.episode}
              title={episode.title}
              tagline={episode.tagline}
              author={episode.author}
              date={episode.date}
              readingTime={episode.readingTime}
            />

            <div id="the-trust-ladder">
              <AirbnbTrustLadderDiagram />
            </div>

            <GlassCard className="flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <Eyebrow className="text-brand">The Big Idea</Eyebrow>
                <p className="font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl">
                  {episode.bigIdea}
                </p>
              </div>
              <Quote className="hidden size-12 shrink-0 text-brand/25 sm:block" />
            </GlassCard>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
              <MDXRemote source={episode.content} options={mdxOptions} components={mdxComponents} />
            </div>

            <div id="key-takeaways">
              <InsightGrid heading={episode.insightsHeading} insights={episode.insights} />
            </div>

            <ReflectionCard text={episode.reflection} />
            <Divider />
            <NextEpisodeCta nextEpisode={episode.nextEpisode} />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-6">
              <AirbnbPageToc />
              <AirbnbOutcomeSidebar />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

export { AirbnbEpisodeBody };

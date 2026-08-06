import type { ComponentProps } from "react";
import { Eye, ShoppingBasket, type LucideIcon } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { NoiceOutcomeSidebar } from "@/components/invisible-businesses/noice-outcome-sidebar";
import { NoicePageToc } from "@/components/invisible-businesses/noice-page-toc";
import { NoiceShelfHurdlesDiagram } from "@/components/invisible-businesses/noice-shelf-hurdles-diagram";
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
  "why-it-isnt-just-another-private-label": ShoppingBasket,
};

function NoiceHeading({ id, children }: ComponentProps<"h2">) {
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

const mdxComponents = { h2: NoiceHeading };

function NoiceEpisodeBody({ episode }: { episode: InvisibleBusinessWithContent }) {
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

            <GlassCard className="flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <Eyebrow className="text-brand">The Big Idea</Eyebrow>
                <p className="font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl">
                  {episode.bigIdea}
                </p>
              </div>
            </GlassCard>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
              <MDXRemote source={episode.content} options={mdxOptions} components={mdxComponents} />
            </div>

            <div id="the-hurdles-noice-skips">
              <NoiceShelfHurdlesDiagram />
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
              <NoicePageToc />
              <NoiceOutcomeSidebar />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

export { NoiceEpisodeBody };

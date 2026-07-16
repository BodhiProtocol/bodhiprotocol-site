import { Quote } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { AmazonFunnelDiagram } from "@/components/invisible-businesses/amazon-funnel-diagram";
import { AmazonOutcomeSidebar } from "@/components/invisible-businesses/amazon-outcome-sidebar";
import { AmazonPageToc } from "@/components/invisible-businesses/amazon-page-toc";
import { GlassCard } from "@/components/invisible-businesses/glass-card";
import { InsightGrid } from "@/components/invisible-businesses/insight-grid";
import { NextEpisodeCta } from "@/components/invisible-businesses/next-episode-cta";
import { ReflectionCard } from "@/components/invisible-businesses/reflection-card";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import type { InvisibleBusinessWithContent } from "@/lib/invisible-businesses";
import { mdxOptions } from "@/lib/mdx-options";

function AmazonEpisodeBody({ episode }: { episode: InvisibleBusinessWithContent }) {
  return (
    <Section className="pt-0">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="flex min-w-0 flex-col gap-10">
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
              <MDXRemote source={episode.content} options={mdxOptions} />
            </div>

            <div id="the-flywheel">
              <AmazonFunnelDiagram />
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
              <AmazonPageToc />
              <AmazonOutcomeSidebar />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

export { AmazonEpisodeBody };

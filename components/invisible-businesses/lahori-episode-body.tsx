import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { GlassCard } from "@/components/invisible-businesses/glass-card";
import { IBArticleHero } from "@/components/invisible-businesses/ib-article-hero";
import { InsightGrid } from "@/components/invisible-businesses/insight-grid";
import { LahoriFullSplitDiagram } from "@/components/invisible-businesses/lahori-full-split-diagram";
import {
  LahoriNoteTracker,
  LahoriNoteTrackerBar,
} from "@/components/invisible-businesses/lahori-note-tracker";
import { rupeeStops } from "@/components/invisible-businesses/lahori-rupee-split";
import { NextEpisodeCta } from "@/components/invisible-businesses/next-episode-cta";
import { ReflectionCard } from "@/components/invisible-businesses/reflection-card";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import type { InvisibleBusinessWithContent } from "@/lib/invisible-businesses";
import { mdxOptions } from "@/lib/mdx-options";

const stopIds = rupeeStops.map((stop) => stop.id);

// Each stop on the note's journey is a numbered waypoint rather than an
// icon-led section heading: the episode is one path, not a set of topics.
function LahoriHeading({ id, children }: ComponentProps<"h2">) {
  const stopIndex = id ? stopIds.indexOf(id) : -1;
  return (
    <h2 id={id} className="flex scroll-mt-40 items-center gap-3 lg:scroll-mt-24">
      <span
        className={
          stopIndex === -1
            ? "flex size-8 shrink-0 items-center justify-center rounded-full border border-brand/30 font-mono text-xs text-brand"
            : "flex size-8 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-xs text-brand-foreground"
        }
      >
        {stopIndex === -1 ? "₹" : stopIndex + 1}
      </span>
      <span className="text-brand">{children}</span>
    </h2>
  );
}

const mdxComponents = { h2: LahoriHeading };

function LahoriEpisodeBody({ episode }: { episode: InvisibleBusinessWithContent }) {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="flex min-w-0 flex-col gap-10">
            <IBArticleHero
              episode={episode.episode}
              kicker="The Hidden Economics of Lahori Zeera"
              title={episode.title}
              tagline={episode.tagline}
              author={episode.author}
              date={episode.date}
              readingTime={episode.readingTime}
            />

            <LahoriNoteTrackerBar />

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
              <MDXRemote source={episode.content} options={mdxOptions} components={mdxComponents} />
            </div>

            <div id="the-full-split" className="scroll-mt-40 lg:scroll-mt-24">
              <LahoriFullSplitDiagram />
            </div>

            <GlassCard className="gap-2">
              <Eyebrow className="text-brand">The Verdict</Eyebrow>
              <p className="font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl">
                {episode.bigIdea}
              </p>
            </GlassCard>

            <div id="key-takeaways">
              <InsightGrid heading={episode.insightsHeading} insights={episode.insights} />
            </div>

            <ReflectionCard text={episode.reflection} />
            <Divider />
            <NextEpisodeCta nextEpisode={episode.nextEpisode} />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <LahoriNoteTracker />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

export { LahoriEpisodeBody };

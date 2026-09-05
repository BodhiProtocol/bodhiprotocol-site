import type { ComponentProps } from "react";
import { Eye, Landmark, Layers, Scale, type LucideIcon } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { PhonepeOutcomeSidebar } from "@/components/invisible-businesses/phonepe-outcome-sidebar";
import { PhonepePageToc } from "@/components/invisible-businesses/phonepe-page-toc";
import { PhonepeLicenseStackDiagram } from "@/components/invisible-businesses/phonepe-license-stack-diagram";
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
  "where-the-money-actually-comes-from": Layers,
  "the-law-just-cracked-a-little": Scale,
};

function PhonepeHeading({ id, children }: ComponentProps<"h2">) {
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

const mdxComponents = { h2: PhonepeHeading };

function PhonepeEpisodeBody({ episode }: { episode: InvisibleBusinessWithContent }) {
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
              slug={episode.slug}
            />

            <GlassCard className="flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <Eyebrow className="text-brand">The Big Idea</Eyebrow>
                <p className="font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl">
                  {episode.bigIdea}
                </p>
              </div>
              <Landmark className="hidden size-12 shrink-0 text-brand/25 sm:block" />
            </GlassCard>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
              <MDXRemote source={episode.content} options={mdxOptions} components={mdxComponents} />
            </div>

            <div id="one-app-four-companies">
              <PhonepeLicenseStackDiagram />
            </div>

            <div id="key-takeaways">
              <InsightGrid heading={episode.insightsHeading} insights={episode.insights} />
            </div>

            <ReflectionCard text={episode.reflection} />
            <Divider />
            <NextEpisodeCta nextEpisode={episode.nextEpisode} />

            <p className="text-xs text-muted-foreground">
              FY25 revenue and profit figures are drawn from PhonePe&apos;s consolidated filings
              with India&apos;s Registrar of Companies, as reported by financial-filing trackers
              Entrackr and YourStory. The zero-MDR mandate traces to Section 10A of the Payment
              and Settlement Systems Act, 2007 and the government&apos;s Digital Payments
              Incentive Scheme, both via Press Information Bureau releases; the August 2026
              amendment is per PIB&apos;s release on the Taxation and Other Laws (Amendment) Bill,
              2026. Licensing details (IRDAI Reg. No. 766; SEBI Reg. No. INA000017860) and lending
              partner names are from PhonePe&apos;s own press releases. Figures are rounded for
              readability and may shift as PhonePe finalizes its IPO filings.
            </p>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-6">
              <PhonepePageToc />
              <PhonepeOutcomeSidebar />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

export { PhonepeEpisodeBody };

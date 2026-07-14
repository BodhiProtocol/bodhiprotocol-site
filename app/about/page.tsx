import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { H2, H3, Muted, P } from "@/components/ui/typography";
import { FaqItem } from "@/components/about/faq-item";

const description =
  "Why BodhiProtocol exists, how it's built, and the philosophy behind Project Lighthouse.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About",
    description,
    url: "/about",
    images: ["/opengraph-image"],
  },
};

const timeline = [
  {
    label: "Browser games & tools",
    description: "A portfolio of interactive browser games, built to learn the craft.",
  },
  {
    label: "Capital markets reference tools",
    description:
      "Trade Lifecycle Explorer, Jargon Decoder, Requirements Translator — tools tied directly to real work.",
  },
  {
    label: "Project Lighthouse",
    description:
      "A visual-metaphor curriculum for the concepts that are hardest to explain in words alone.",
  },
  {
    label: "BodhiProtocol.com",
    description: "Everything comes together into one platform.",
  },
];

const technology = [
  { name: "Next.js 15", reason: "App Router, server components, and static generation." },
  { name: "TypeScript", reason: "Correctness by construction, not by convention." },
  { name: "Tailwind CSS", reason: "A consistent design system without a CSS file sprawl." },
  { name: "shadcn/ui", reason: "Accessible primitives, owned as source rather than a dependency." },
  { name: "MDX", reason: "Essays and blueprints are just files in git — no CMS required." },
  { name: "Vercel", reason: "Zero-config deploys with the framework it's built for." },
];

const values = [
  {
    title: "Clarity over jargon",
    description: "If a concept needs ten pieces of jargon to explain, the explanation is wrong.",
  },
  {
    title: "Show, don't just tell",
    description: "Visual and interactive explanations first; prose fills in the rest.",
  },
  {
    title: "Depth over breadth",
    description: "Fewer topics, explained properly, beats a long list explained shallowly.",
  },
  {
    title: "Built in public",
    description: "Every essay and tool here is open source and versioned in git.",
  },
];

const faqs = [
  {
    question: "Is this free?",
    answer: "Yes. Everything on BodhiProtocol is free to read and use, no account required.",
  },
  {
    question: "How is this site built?",
    answer:
      "Next.js, TypeScript, and Tailwind, with essays and blueprints written as MDX files in git — no CMS or database.",
  },
  {
    question: "Who writes this?",
    answer:
      "A business analyst working in capital markets, not a professional software engineer — see the Story section above for how that shapes the site.",
  },
  {
    question: "Can I suggest a topic?",
    answer:
      "Yes — every essay and Lighthouse blueprint is open source, so issues and suggestions are welcome on GitHub.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About BodhiProtocol"
        description="A premium knowledge platform for understanding complex systems — one metaphor at a time."
      />

      <Section>
        <Container className="flex max-w-2xl flex-col gap-16">
          <div className="flex flex-col gap-4">
            <H2>Mission</H2>
            <P>
              Most explanations of complex topics are either oversimplified to the point
              of being wrong, or dense enough that they&apos;re only useful to people who
              already understand them. BodhiProtocol exists in the gap between those two:
              essays, visual explanations, and interactive tools that respect your
              intelligence without assuming a background you don&apos;t have.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Story</H2>
            <P>
              BodhiProtocol started as a question: could someone with no formal
              engineering background build real, useful software by working closely
              with AI — not as a novelty, but as a genuine collaborator? It&apos;s built
              by a business analyst who works in capital markets by day, not a software
              engineer. Every tool on this site started as something the author needed
              to understand for their own work first.
            </P>
          </div>

          <div className="flex flex-col gap-6">
            <H2>Timeline</H2>
            <ol className="flex flex-col gap-6 border-l border-border pl-6">
              {timeline.map((item) => (
                <li key={item.label} className="relative">
                  <span className="absolute top-1.5 -left-[27px] size-2 rounded-full bg-brand" />
                  <H3 className="text-lg">{item.label}</H3>
                  <Muted className="mt-1">{item.description}</Muted>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-6">
            <H2>Technology</H2>
            <ul className="flex flex-col gap-4">
              {technology.map((tech) => (
                <li key={tech.name} className="flex flex-col gap-0.5">
                  <span className="font-heading text-base font-medium">{tech.name}</span>
                  <Muted>{tech.reason}</Muted>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <H2>Values</H2>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="flex flex-col gap-1">
                  <span className="font-heading text-base font-medium">{value.title}</span>
                  <Muted>{value.description}</Muted>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Learning Philosophy</H2>
            <P>
              Every hard concept has one metaphor that makes it click — the goal is to
              find that metaphor before adding any more detail. That&apos;s the whole
              premise of Project Lighthouse: reduce first, elaborate second. Interactive
              tools exist so you can test your understanding, not just read about it.
            </P>
          </div>

          <div className="flex flex-col gap-2">
            <H2>FAQ</H2>
            <div>
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          <Divider className="my-0" />

          <div className="flex flex-col items-start gap-4">
            <H2>Start here</H2>
            <div className="flex flex-wrap gap-3">
              <Button nativeButton={false} render={<Link href="/essays" />}>
                Explore Essays
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/lighthouse" />}
              >
                Explore Project Lighthouse
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

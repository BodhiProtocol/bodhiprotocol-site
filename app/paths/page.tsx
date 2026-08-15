import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, H2, H3, Muted, P } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Bodhi Paths — Guided Learning Paths | BodhiProtocol",
  description:
    "Choose a goal and follow a curated path through BodhiProtocol's BA Playbooks, capital markets guides, tools, and practical learning resources.",
  alternates: { canonical: "/paths" },
};

type Step = {
  label: string;
  title: string;
  href: string;
};

type Path = {
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  steps: Step[];
};

const paths: Path[] = [
  {
    eyebrow: "Path 01 · Start from scratch",
    title: "Become a Business Analyst",
    description:
      "Build the core BA workflow in the order the work actually happens — discover, clarify, write, test, and deliver.",
    outcome: "Finish with a practical mental model for taking a requirement from conversation to delivery.",
    steps: [
      { label: "Discover", title: "New Project Discovery Playbook", href: "/ba-playbooks/new-project-discovery-playbook" },
      { label: "Elicit", title: "Requirement Elicitation Playbook", href: "/ba-playbooks/requirement-elicitation-playbook" },
      { label: "Align", title: "Everyone Wants Something Different", href: "/ba-playbooks/everyone-wants-something-different" },
      { label: "Write", title: "First Time Writing a User Story", href: "/ba-playbooks/first-time-writing-a-user-story" },
      { label: "Make testable", title: "Acceptance Criteria Playbook", href: "/ba-playbooks/acceptance-criteria-playbook" },
      { label: "Prepare", title: "Pre-UAT Readiness Checklist", href: "/ba-playbooks/pre-uat-readiness-checklist" },
    ],
  },
  {
    eyebrow: "Path 02 · Domain depth",
    title: "Become a Capital Markets BA",
    description:
      "Learn the machinery around a trade, then practise tracing what happens when systems, data, and operations disagree.",
    outcome: "Finish able to reason about a trade across teams and investigate where a front-to-back flow broke.",
    steps: [
      { label: "Orient", title: "Capital Markets for Business Analysts", href: "/capital-markets-for-business-analysts" },
      { label: "Understand teams", title: "Front Office, Middle Office & Back Office", href: "/ba-playbooks/front-office-middle-office-back-office" },
      { label: "Trace", title: "Front-to-Back Trade Trace Guide", href: "/ba-playbooks/front-to-back-trade-trace-guide" },
      { label: "Investigate data", title: "Two Systems Show Different Numbers", href: "/ba-playbooks/two-systems-show-different-numbers" },
      { label: "Investigate processing", title: "The Batch Ran Successfully. So Why Is the Data Missing?", href: "/ba-playbooks/batch-ran-successfully-data-missing" },
      { label: "Apply", title: "Capital Markets Business Analyst Roadmap", href: "/capital-markets-business-analyst" },
    ],
  },
  {
    eyebrow: "Path 03 · Real work",
    title: "Become a Stronger Working BA",
    description:
      "Practise the messy situations that rarely appear in training: ownership gaps, changing requirements, release pressure, and production ambiguity.",
    outcome: "Finish with a repeatable way to handle ambiguity without turning every problem into another meeting.",
    steps: [
      { label: "Clarify", title: "Nobody Knows Who Owns the Requirement", href: "/ba-playbooks/who-owns-the-requirement" },
      { label: "Control change", title: "The Requirement Changed Mid-Sprint", href: "/ba-playbooks/requirement-changed-mid-sprint" },
      { label: "Assess impact", title: "Impact Analysis Template", href: "/ba-playbooks/impact-analysis-template" },
      { label: "Handle release pressure", title: "The Release Is Tomorrow. The Requirement Changed Today.", href: "/ba-playbooks/release-tomorrow-requirement-changed-today" },
      { label: "Debug", title: "Nobody Can Reproduce the Production Issue", href: "/ba-playbooks/nobody-can-reproduce-the-production-issue" },
      { label: "Decide", title: "The Business Says It's a Defect. Tech Says It's Expected Behaviour.", href: "/ba-playbooks/defect-vs-expected-behaviour" },
    ],
  },
];

export default function BodhiPathsPage() {
  return (
    <>
      <Section className="pb-10 sm:pb-14">
        <Container className="flex max-w-4xl flex-col gap-5">
          <Muted className="font-mono text-xs font-medium tracking-[0.14em] uppercase">BodhiProtocol · Learning Paths</Muted>
          <H1 className="max-w-3xl">Don’t browse the library. Follow a path.</H1>
          <P className="max-w-2xl text-lg text-muted-foreground">
            Tell us what you’re trying to become better at. We’ll put the most useful BodhiProtocol resources in a sensible order.
          </P>
          <Muted className="max-w-2xl">No course lock-in. No artificial completion. Leave the path whenever you have what you need.</Muted>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="flex flex-col gap-16">
          {paths.map((path) => (
            <section key={path.title} className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div className="flex flex-col gap-4">
                <Muted className="font-mono text-xs font-medium tracking-[0.12em] uppercase">{path.eyebrow}</Muted>
                <H2>{path.title}</H2>
                <P className="text-muted-foreground">{path.description}</P>
                <div className="mt-2 flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  <span>{path.outcome}</span>
                </div>
              </div>

              <div className="flex flex-col">
                {path.steps.map((step, index) => (
                  <Link
                    key={step.href}
                    href={step.href}
                    className="group grid grid-cols-[2.25rem_1fr_auto] items-start gap-3 border-b border-border py-5 first:pt-0"
                  >
                    <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex flex-col gap-1">
                      <span className="font-mono text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase">{step.label}</span>
                      <H3 className="text-lg leading-snug">{step.title}</H3>
                    </span>
                    <ArrowRight className="mt-5 size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </Container>
      </Section>

      <Section className="pt-2">
        <Container className="max-w-4xl border-t border-border pt-10">
          <Muted className="font-mono text-xs font-medium tracking-[0.14em] uppercase">Not sure where to start?</Muted>
          <H2 className="mt-3 max-w-2xl">Start with the problem you have today.</H2>
          <P className="mt-3 max-w-2xl text-muted-foreground">
            The paths are guides, not rules. If you’re already working as a BA, jump straight to the situation that looks familiar.
          </P>
          <Link href="/ba-playbooks" className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand">
            Browse BA Playbooks
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </Section>
    </>
  );
}

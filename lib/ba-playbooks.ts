import readingTime from "reading-time";

import type { Playbook } from "@/types/content";
import { jiraHacksForBusinessAnalysts } from "@/content/ba-playbooks/jira-hacks-for-business-analysts";
import { requirementElicitationPlaybook } from "@/content/ba-playbooks/requirement-elicitation-playbook";
import { acceptanceCriteriaPlaybook } from "@/content/ba-playbooks/acceptance-criteria-playbook";
import { firstTimeWorkingWithAnApi } from "@/content/ba-playbooks/first-time-working-with-an-api";
import { twoSystemsShowDifferentNumbers } from "@/content/ba-playbooks/two-systems-show-different-numbers";
import { firstTimeWritingAUserStory } from "@/content/ba-playbooks/first-time-writing-a-user-story";
import { storyCarriedOverFourSprints } from "@/content/ba-playbooks/story-carried-over-four-sprints";
import { whoOwnsTheRequirement } from "@/content/ba-playbooks/who-owns-the-requirement";
import { businessAnalystUserStoryTemplate } from "@/content/ba-playbooks/business-analyst-user-story-template";
import { frontOfficeMiddleOfficeBackOffice } from "@/content/ba-playbooks/front-office-middle-office-back-office";
import { uatPassedProductionFailed } from "@/content/ba-playbooks/uat-passed-production-failed";
import { impactAnalysisTemplate } from "@/content/ba-playbooks/impact-analysis-template";
import { newProjectDiscoveryPlaybook } from "@/content/ba-playbooks/new-project-discovery-playbook";
import { frontToBackTradeTraceGuide } from "@/content/ba-playbooks/front-to-back-trade-trace-guide";

// Playbooks are structured card data (numbered hacks with before/after,
// templates, etc.) rather than prose, so each playbook is a typed data module
// under content/ba-playbooks/ instead of an .mdx file. To add a new playbook:
// write a new content/ba-playbooks/<slug>.ts module and add it here.
//
// Numbering (see PlaybookHero) is derived from position in getAllPlaybooks(),
// which sorts by date descending — new entries dated the same as the rest tie
// on date, so a stable sort keeps them in the array order below. Append new
// playbooks at the end of this array to get the next sequential number.
const playbookEntries: Omit<Playbook, "readingTime">[] = [
  jiraHacksForBusinessAnalysts,
  requirementElicitationPlaybook,
  acceptanceCriteriaPlaybook,
  firstTimeWorkingWithAnApi,
  twoSystemsShowDifferentNumbers,
  firstTimeWritingAUserStory,
  storyCarriedOverFourSprints,
  whoOwnsTheRequirement,
  businessAnalystUserStoryTemplate,
  frontOfficeMiddleOfficeBackOffice,
  uatPassedProductionFailed,
  impactAnalysisTemplate,
  newProjectDiscoveryPlaybook,
  frontToBackTradeTraceGuide,
];

function withReadingTime(guide: Omit<Playbook, "readingTime">): Playbook {
  const text = [
    ...(guide.intro ?? []),
    guide.bodyText ?? "",
    guide.closingBody ?? "",
    ...guide.hacks.flatMap((hack) => [
      hack.title,
      hack.insight,
      hack.explanation ?? "",
      hack.whyItHelps,
      hack.whenToUse ?? "",
      hack.template ?? "",
      ...(hack.templates?.map((template) => template.value) ?? []),
      hack.proTip ?? "",
    ]),
  ].join(" ");

  return { ...guide, readingTime: readingTime(text).text };
}

export function getAllPlaybooks(): Playbook[] {
  return playbookEntries
    .map(withReadingTime)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPlaybookSlugs(): string[] {
  return playbookEntries.map((guide) => guide.slug);
}

// Drives the /ba-playbooks category filter chips directly from the
// categories actually in use, so a chip can never go stale or omit a
// category a playbook was tagged with.
export function getPlaybookCategories(): string[] {
  return Array.from(new Set(playbookEntries.map((guide) => guide.category))).sort();
}

export function getPlaybookBySlug(slug: string): Playbook | undefined {
  const entry = playbookEntries.find((guide) => guide.slug === slug);
  return entry ? withReadingTime(entry) : undefined;
}

export function getAdjacentPlaybooks(slug: string): {
  previous: Playbook | null;
  next: Playbook | null;
} {
  const guides = getAllPlaybooks();
  const index = guides.findIndex((guide) => guide.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? guides[index - 1] : null,
    next: index < guides.length - 1 ? guides[index + 1] : null,
  };
}

export function getFeaturedPlaybook(): Playbook | undefined {
  const guides = getAllPlaybooks();
  return guides.find((guide) => guide.featured) ?? guides[0];
}

// Roadmap topics with no page yet — rendered as inert "Coming soon" cards on
// the landing page. Not routes: add a content/ba-playbooks/<slug>.ts module
// and an entry above (in playbookEntries) to turn one of these into a real playbook.
export const plannedPlaybooks: string[] = [];

export function getRelatedPlaybooks(guide: Playbook, limit = 3): Playbook[] {
  if (guide.relatedPlaybookSlugs?.length) {
    return guide.relatedPlaybookSlugs
      .map((slug) => getPlaybookBySlug(slug))
      .filter((related): related is Playbook => Boolean(related))
      .slice(0, limit);
  }

  return getAllPlaybooks()
    .filter((candidate) => candidate.slug !== guide.slug)
    .map((candidate) => ({
      guide: candidate,
      score:
        (candidate.category === guide.category ? 2 : 0) +
        candidate.tags.filter((tag) => guide.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ guide: related }) => related);
}

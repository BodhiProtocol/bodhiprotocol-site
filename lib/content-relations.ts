// Cross-content-type recommendations (Essay <-> BA Playbook <-> Tool <-> Template).
// Keyed by the *source* content's slug, each entry points at where to go next.
// Rendered by components/shared/content-recommendation.tsx. Kept as a plain,
// hand-curated map on purpose -- these are editorial calls ("is this genuinely
// the next step"), not something to infer automatically from tags/categories.
export interface ContentRecommendation {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

// Essay slug -> what to do next (usually a BA Playbook).
export const essayRecommendations: Record<string, ContentRecommendation[]> = {
  "why-jira-tickets-rot-in-backlog": [
    {
      eyebrow: "Put it into practice",
      title: "Jira Hacks for Business Analysts",
      description:
        "12 practical habits for clearer tickets, better acceptance criteria, visible dependencies and decisions that do not disappear inside comments.",
      href: "/ba-playbooks/jira-hacks-for-business-analysts",
      cta: "Open the BA Playbook",
    },
  ],
};

// BA Playbook slug -> what to read next (usually the essay behind the "why").
export const playbookRecommendations: Record<string, ContentRecommendation[]> = {
  "jira-hacks-for-business-analysts": [
    {
      eyebrow: "Understand the problem",
      title: "Why Jira Tickets Rot in Backlog",
      description:
        "A ticket usually does not become useless because it got old. It becomes useless because context, ownership and decisions disappear around it.",
      href: "/essays/why-jira-tickets-rot-in-backlog",
      cta: "Read the Essay",
    },
  ],
};

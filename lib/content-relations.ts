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
  "settlement-fails-what-happens-when-a-trade-refuses-to-deliver": [
    {
      eyebrow: "See it live",
      title: "Reconciliation Break Finder",
      description:
        "Most fails start as an unnoticed mismatch between two records of the same trade. Find the break before it becomes a missed settlement deadline.",
      href: "/simulators/reconciliation-break-finder",
      cta: "Open the Simulator",
    },
  ],
  "front-office-middle-office-back-office-three-clocks-on-one-trade": [
    {
      eyebrow: "Put it into practice",
      title: "Front Office, Middle Office & Back Office — What Do They Actually Do?",
      description:
        "The reference version: one Reliance trade followed from order to settlement, showing exactly where Market Data, Reference Data, Front Office, Middle Office, Back Office and Risk each fit.",
      href: "/ba-playbooks/front-office-middle-office-back-office",
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
  "front-office-middle-office-back-office": [
    {
      eyebrow: "Understand the idea",
      title: "Front Office, Middle Office, Back Office: Three Clocks on One Trade",
      description:
        "Why the three offices exist in the first place — three different, equally correct answers to the question \"is it done?\" — and why settlement cycles getting shorter made the middle one non-negotiable.",
      href: "/essays/front-office-middle-office-back-office-three-clocks-on-one-trade",
      cta: "Read the Essay",
    },
  ],
};

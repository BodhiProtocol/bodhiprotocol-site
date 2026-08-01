export interface SuggestedPathLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SuggestedPathTrack {
  title: string;
  description: string;
  links: SuggestedPathLink[];
  /** Omit when the track has real content behind it — set when nothing exists yet. */
  comingSoon?: boolean;
}

// Curated order for one specific reader: someone trying to break into capital
// markets as a business analyst. Links point at essays/tools that already
// exist on the site — tracks with no real content yet are marked comingSoon
// rather than linked to something unrelated.
export const suggestedPath: SuggestedPathTrack[] = [
  {
    title: "Capital Markets",
    description:
      "Understand how markets actually work — order books, price discovery, clearing.",
    links: [
      {
        label: "How Trade Execution Works",
        href: "/essays/shiv-pressed-buy-trade-execution",
      },
      { label: "How Order Books Actually Work", href: "/essays/how-order-books-work" },
      {
        label: "Novation",
        href: "/essays/novation-how-a-clearinghouse-becomes-everyones-counterparty",
      },
      {
        label: "Jargon Decoder",
        href: "https://jargon-decoder.bodhiprotocol.com/",
        external: true,
      },
    ],
  },
  {
    title: "Trade Lifecycle",
    description: "Follow a trade from execution to settlement, and see where it breaks.",
    links: [
      {
        label: "What a Trade Lifecycle Actually Looks Like",
        href: "/essays/what-a-trade-lifecycle-actually-looks-like",
      },
      {
        label: "Trade Lifecycle Explorer",
        href: "https://trade-lifecycle-explorer.bodhiprotocol.com/",
        external: true,
      },
    ],
  },
  {
    title: "Business Analysis",
    description:
      "Translate a stakeholder's sentence into requirements engineering can build.",
    links: [
      {
        label: "Writing Requirements That Survive Contact With Engineering",
        href: "/essays/writing-requirements-that-survive-contact-with-engineering",
      },
      {
        label: "Requirements Translator",
        href: "https://requirements-translator.bodhiprotocol.com/",
        external: true,
      },
    ],
  },
  {
    title: "Systems Thinking",
    description:
      "See capital markets as a system of interconnected incentives, not isolated trades.",
    links: [
      {
        label: "People Respond to Incentives, Not Instructions",
        href: "/essays/people-respond-to-incentives-not-instructions",
      },
      {
        label: "The Base Rate Is Usually the Whole Answer",
        href: "/essays/the-base-rate-is-usually-the-whole-answer",
      },
    ],
  },
  {
    title: "Interview Preparation",
    description:
      "Prepare for the real questions banking interviews ask a business analyst.",
    links: [],
    comingSoon: true,
  },
  {
    title: "Resume Guidance",
    description:
      "Frame your experience the way capital-markets hiring managers actually read it.",
    links: [],
    comingSoon: true,
  },
];

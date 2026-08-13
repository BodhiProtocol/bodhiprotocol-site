import type { Playbook } from "@/types/content";

const qualityChecklist = `ACCEPTANCE CRITERIA QUALITY CHECKLIST

[ ] Observable
[ ] Testable
[ ] Specific
[ ] Business rule understood
[ ] Happy path covered
[ ] Negative path covered
[ ] Boundary conditions considered
[ ] Error behaviour defined
[ ] Data expectations clear
[ ] No vague adjectives
[ ] No hidden assumptions
`;

export const acceptanceCriteriaPlaybook: Omit<Playbook, "readingTime"> = {
  slug: "acceptance-criteria-playbook",
  title: "Acceptance Criteria Playbook",
  description: "How to write acceptance criteria people can actually build and test.",
  summary:
    "Bad-to-better rewrites for the acceptance criteria that sound fine on first read — Given/When/Then, negative scenarios, boundary conditions, and the adjectives that quietly make a criterion untestable.",
  category: "Business Analysis",
  tags: ["Requirements", "acceptance-criteria", "testing"],
  author: "Surya",
  date: "2026-08-08",
  itemLabel: "Fix",
  intro: [
    "\"System should process the trade correctly.\" Reads fine on a first pass. Then development asks what \"correctly\" means, and QA asks how they're supposed to prove it, and the sentence stops sounding fine at all — it sounds like something three people are about to interpret three different ways.",
    "Acceptance criteria exist to remove exactly that kind of interpretation. Not to describe intent nicely. To describe behaviour precisely enough that two engineers, working alone, would build the same thing from the same sentence.",
  ],
  audience: [
    "Business Analysts",
    "QA professionals reviewing requirements before sprint",
    "Developers who inherit ambiguous tickets",
    "Product Owners writing their own stories",
  ],
  seoTitle: "Acceptance Criteria Playbook for Business Analysts",
  seoDescription:
    "A practical acceptance criteria guide for Business Analysts — bad-to-better rewrites covering Given/When/Then, negative scenarios, boundary conditions and the vague words that quietly break testability.",
  closingHeading: ["\"Correctly\" is not a requirement.", "It's a placeholder for one."],
  closingBody:
    "Every acceptance criterion should survive one test: could two engineers, working alone, build the same thing from it? If the answer depends on both of them guessing the same way, it isn't finished yet.",
  closingTemplate: qualityChecklist,
  closingTemplateName: "Acceptance Criteria Quality Checklist",
  relatedPlaybookSlugs: [
    "requirement-elicitation-playbook",
    "jira-hacks-for-business-analysts",
    "first-time-writing-a-user-story",
  ],
  relatedTopics: ["Business Analyst User Story Template"],
  hacks: [
    {
      number: 1,
      title: "Say what should be observable, not what should be true",
      insight: "\"Correctly\" is not a behaviour. It's a feeling everyone happens to share until they don't.",
      before: "System should process the trade correctly.",
      after: "Given a valid matched trade, when settlement processing runs, then a settlement instruction is created.",
      whyItHelps:
        "The rewrite doesn't say more. It says something a person can actually check — pass or fail, no discussion required.",
    },
    {
      number: 2,
      title: "Given / When / Then is a discipline, not a formatting rule",
      insight: "Each part is doing a specific job. Skip one and the criterion stops being testable.",
      visual: { steps: ["Given — the starting condition", "When — the triggering action", "Then — the observable result"] },
      whyItHelps:
        "Most vague acceptance criteria are missing one of these three, usually the \"Given.\" Without a starting condition, \"when X happens, then Y\" could mean almost anything.",
    },
    {
      number: 3,
      title: "Write the negative scenario, not only the happy one",
      insight: "A criterion that only describes success hasn't told anyone what failure looks like.",
      before: "System should display proper error message.",
      after: [
        "Given an invalid settlement account",
        "When settlement processing runs",
        "Then the instruction is rejected",
        "And the user sees the configured validation message",
      ],
      whyItHelps: "\"Proper error message\" is not a message. Someone still has to invent the actual wording during testing, which is the wrong time to be inventing it.",
    },
    {
      number: 4,
      title: "Boundary conditions are where the bugs actually live",
      insight: "Nobody breaks software in the middle of a range. They break it at the edge.",
      list: [
        "What happens exactly at the limit?",
        "What happens one unit above it?",
        "What happens one unit below it?",
        "What happens at zero, or empty, or none?",
      ],
      whyItHelps:
        "\"Orders above $1M need approval\" sounds complete until someone asks about an order of exactly $1,000,000.00. That question should come from you, not from a defect ticket.",
    },
    {
      number: 5,
      title: "Define the error behaviour, not just the existence of an error",
      insight: "\"Show error if invalid\" describes that something happens. It doesn't describe what.",
      before: "Show error if invalid.",
      after: [
        "Reject the request",
        "Return a specific validation code",
        "Display the configured message to the user",
        "Log the rejection reason for audit",
      ],
      whyItHelps: "Four different systems — UI, API, logging, audit — all need to agree on what \"invalid\" actually does. One vague line leaves all four guessing separately.",
    },
    {
      number: 6,
      title: "A business rule and an acceptance criterion are not the same sentence",
      insight: "One describes how the business works. The other describes how the system proves it.",
      before: "\"Orders above $1M require approval, so make sure that works.\"",
      after: [
        "Business rule — how the business works: Orders above $1M require supervisory approval.",
        "Acceptance criterion — how the system behaves: Given an order value above $1M, when the trader submits it, then the order enters Pending Approval status.",
      ],
      whyItHelps: "Blending the two makes both harder to maintain. When the threshold changes next year, you want to update one rule — not go hunting through test scripts for every sentence that mentioned it.",
    },
    {
      number: 7,
      title: "Vague adjectives are where ambiguity hides in plain sight",
      insight: "Every one of these sounds specific enough to pass review. None of them are testable as written.",
      explanation:
        "\"The page should load quickly\" is the classic case. A measurable performance target is fine when a real one exists — but bolting a number onto every sentence just to sound precise is its own kind of vagueness. Only add a target where someone can say why that number, specifically.",
      list: ["correctly", "properly", "quickly", "appropriately", "normally", "efficiently", "user-friendly"],
      whyItHelps: "Each of these gets re-decided by whoever is testing it, under time pressure, usually differently from what the business actually meant.",
    },
    {
      number: 8,
      title: "Leave the implementation to the people implementing it",
      insight: "A criterion that specifies technology has usually stopped specifying business behaviour.",
      before: "Use a Redis cache with a 5-minute TTL so session lookups are fast.",
      after: "Given an active session, when the user acts within 5 minutes of their last action, then they remain logged in.",
      whyItHelps: "The 5-minute rule is the business's decision. Redis is not. Naming the technology in the criterion just means it's wrong the day engineering picks a different one.",
    },
    {
      number: 9,
      title: "One criterion, one behaviour",
      insight: "A criterion that tries to prove four things at once can't fail cleanly when one of them breaks.",
      before:
        "Given a trade is submitted, when it's validated and booked and confirmed, then everything should work and the user is notified and the ledger updates.",
      after: [
        "AC1 — Given a valid trade, when submitted, then it is validated.",
        "AC2 — Given a validated trade, when booked, then a confirmation is generated.",
        "AC3 — Given a booking confirmation, when created, then the ledger is updated.",
      ],
      whyItHelps: "When AC1 through AC3 exist separately, a test failure points at exactly one of them. The sprawling version just tells you something, somewhere, went wrong.",
    },
    {
      number: 10,
      title: "Get QA into the conversation while you're still writing these",
      insight: "The person who has to prove a criterion false is the best judge of whether it can be.",
      whyItHelps:
        "A criterion that survives a QA read-through before the sprint starts is a criterion that won't come back as a clarification question mid-sprint, when it costs more to answer.",
      proTip: "If QA reads a criterion and can't describe how they'd fail it, that's not a QA problem — it's an unfinished criterion.",
    },
  ],
};

import type { Playbook } from "@/types/content";

const decisionSheet = `DEFECT vs EXPECTED BEHAVIOUR — DECISION SHEET
Classify with evidence, not opinion.

FAST EVIDENCE TABLE
Business needs: ______________________________
Requirement / AC says: ______________________________
System actually does: ______________________________
Classification: Defect / Expected / Gap / Config-Data / Change
Decision + owner: ______________________________

BEFORE YOU CLOSE IT
[ ] Scenario is precise.
[ ] Requirement/AC evidence checked.
[ ] Business outcome understood.
[ ] Classification is evidence-based.
[ ] Decision owner is clear.
[ ] Relevant story/AC/defect/config updated.

GOLDEN RULE
Don't take sides. Compare intent, evidence and outcome.
The goal is not to win the argument. It is to make expected behaviour unambiguous.
`;

export const defectVsExpectedBehaviour: Omit<Playbook, "readingTime"> = {
  slug: "defect-vs-expected-behaviour",
  title: "The Business Says It's a Defect. Tech Says It's Expected Behaviour.",
  description: "Both sides may be telling the truth. Here's how to find out which.",
  summary:
    "A step-by-step method for the argument every BA sits in the middle of — Business calling something a defect while Technology calls it expected behaviour — worked through an insurance backdating scenario and an e-commerce cancellation scenario, plus a free one-page Defect vs Expected Behaviour Decision Sheet to download.",
  category: "Requirements",
  tags: ["Requirements", "Acceptance Criteria", "defects"],
  author: "Surya",
  date: "2026-08-14",
  itemLabel: "Step",
  intro: [
    "A claims user tries to backdate an insurance claim by ten days. The system rejects it. Business says: \"Defect. We need to backdate claims.\" Technology says: \"Expected behaviour. The system rejects dates older than seven days.\" Now the BA is in the middle. Is it a defect? Expected behaviour? Or did everyone build a different expectation?",
    "The BA's job is not to pick a side. It is to answer a better question: what should the system actually do? Maybe the requirement really does say seven days. Maybe the business process changed after it was written. Maybe acceptance criteria never covered this scenario. Maybe seven days is a configuration nobody explained. So don't begin with \"who is right?\" Begin with \"what was intended, what was built, and what does the business need now?\"",
    "That question breaks into eight steps: listen for the business pain, recreate the exact scenario, check the requirement, check acceptance criteria, compare all three views side by side, classify what kind of issue this actually is, ask whether the business need has changed since, then decide and document so the same argument doesn't come back next sprint.",
  ],
  audience: [
    "Business Analysts stuck between \"this is a defect\" and \"this is expected behaviour\"",
    "BAs who want a repeatable way to classify a disputed system behaviour",
    "QA and developers deciding whether something is a bug or a spec",
    "Delivery leads who want disagreements resolved with evidence, not opinion",
  ],
  seoTitle: "Defect vs Expected Behaviour: A BA Decision Framework | BodhiProtocol",
  seoDescription:
    "A practical BA framework for classifying disputed system behaviour as a defect, expected behaviour, requirement gap, or configuration issue — with a free one-page Decision Sheet.",
  closingHeading: [
    "\"Defect\" doesn't mean the business dislikes the outcome.",
    "A good BA makes expected behaviour clear enough that the argument disappears.",
  ],
  closingBody:
    "Sometimes the system is wrong. Sometimes the expectation is wrong. Sometimes the requirement is incomplete. Sometimes the business need changed. The BA's job is to separate those possibilities — don't take sides, compare intent, evidence, and outcome.",
  closingTemplate: decisionSheet,
  closingTemplateName: "Defect vs Expected Behaviour Decision Sheet",
  download: {
    icon: "checklist",
    title: "Defect vs Expected Behaviour Decision Sheet — PDF",
    description: "The fast evidence table and pre-close checklist on one printable page, ready to run the next time Business and Technology disagree.",
    href: "/downloads/defect-vs-expected-behaviour-decision-sheet.pdf",
    filename: "defect-vs-expected-behaviour-decision-sheet.pdf",
    meta: "PDF · 1 page",
    cta: "Download the free PDF",
    analyticsEvent: "defect_vs_expected_behaviour_decision_sheet_downloaded",
  },
  relatedPlaybookSlugs: ["acceptance-criteria-playbook", "who-owns-the-requirement", "uat-passed-production-failed"],
  image: {
    src: "/images/ba-playbooks/defect-vs-expected-behaviour-infographic.png",
    alt: "Infographic summarizing the defect-vs-expected-behaviour framework: the backdated-claim example, five reasons the disagreement happens, the seven-step investigation flow from Listen to Decide & Document, key questions to ask, how to decide if it's a defect, expected, or a gap, and the closing BA mindset.",
    width: 1024,
    height: 1536,
    caption: "The whole framework on one page — from a disputed ticket to an evidence-based classification.",
  },
  hacks: [
    {
      number: 1,
      title: "LISTEN — Understand the business pain",
      insight: "\"System won't allow backdating\" describes behaviour. \"Operations cannot process legitimate late claims\" describes the business problem.",
      list: [
        "What were you trying to achieve?",
        "What happened instead?",
        "What impact does it create?",
        "Is there a workaround?",
        "How often does it happen?",
        "Who is affected?",
      ],
      whyItHelps: "Opening Jira before understanding the business problem means you're about to investigate the wrong thing precisely.",
    },
    {
      number: 2,
      title: "RECREATE — See the behaviour yourself",
      insight: "Don't debate a defect you cannot describe precisely.",
      explanation: "Get the exact scenario. Claim date: 1 August. Entry date: 11 August. Business expects: claim accepted. Actual: \"Claim date cannot be more than 7 days in the past.\" Now you have something testable.",
      list: ["Capture: user", "data", "steps", "expected", "actual"],
      whyItHelps: "A precise, reproducible scenario is what turns a hallway argument into an investigation everyone can check.",
    },
    {
      number: 3,
      title: "REQUIREMENT — What was actually asked for?",
      insight: "Technology may have built the requirement exactly as written — but that's not the end of the investigation.",
      list: ["requirement", "user story", "business rules", "process flow", "design", "decision log", "change history", "relevant policy"],
      explanation: "Suppose the requirement says claims may be backdated by a maximum of seven calendar days. Technology may have implemented it correctly, so the current behaviour may not be a software defect. But the requirement itself may still be incomplete, outdated, or no longer fit the business need.",
      whyItHelps: "Checking the requirement before arguing about behaviour stops both sides from debating from memory instead of evidence.",
    },
    {
      number: 4,
      title: "ACCEPTANCE — What result did we agree to?",
      insight: "Requirements describe intent. Acceptance criteria make behaviour testable.",
      list: ["boundaries", "exceptions", "negative cases", "roles", "error messages", "alternate flows"],
      compare: {
        leftLabel: "Clear acceptance criteria",
        left: "\"Given a claim date older than seven days, when the user submits, then the system prevents submission.\" — the behaviour is clearly intentional.",
        rightLabel: "Ambiguous acceptance criteria",
        right: "\"Claims can be created with a past date.\" Seven days? Thirty? Any past date? That's not a coding defect — it's a requirement gap.",
      },
      whyItHelps: "The AC tells you whether the disputed scenario was ever actually decided, or just assumed.",
    },
    {
      number: 5,
      title: "COMPARE — Business need vs requirement vs behaviour",
      insight: "Put the three views side by side and the conversation becomes useful.",
      list: [
        "Business need — Valid late claims must be processed.",
        "Requirement — Backdating limited to 7 days.",
        "System — Rejects anything older than 7 days.",
      ],
      explanation: "The system matches the requirement. But the requirement may not satisfy the current business need. That's different from saying \"Tech is right.\" A better conclusion: the system is behaving as specified, but the current rule doesn't support the business scenario.",
      whyItHelps: "Naming which of the three views is out of step with the others tells you what kind of problem you're actually solving.",
    },
    {
      number: 6,
      title: "CLASSIFY — What kind of issue is it?",
      insight: "The same disagreement can resolve to four very different classifications.",
      list: [
        "Defect — behaviour differs from the agreed requirement/AC (requirement allows 7 days, system rejects 5).",
        "Expected behaviour — behaviour matches the agreed rule (requirement allows 7 days, system rejects 10) — though that doesn't mean nothing should change; it may now be a change request instead of a defect fix.",
        "Requirement gap — the scenario was never clearly defined (requirement says \"claims can be backdated,\" no limit, no exception, no boundary) — the team needs a decision.",
        "Configuration or data issue — the logic is correct but the setup isn't (requirement says 7 days, configuration says 3) — the symptom looks like a defect, but the root cause is elsewhere.",
      ],
      whyItHelps: "Each classification points to a different next action — fix code, update a requirement, get a decision, or correct a config. Getting this wrong sends the fix to the wrong team.",
    },
    {
      number: 7,
      title: "CURRENT NEED — Has something changed?",
      insight: "A system can correctly implement yesterday's requirement and still be wrong for today's business.",
      list: [
        "Maybe regulation introduced an exception.",
        "Maybe Operations changed its process.",
        "Maybe a new product needs 30-day backdating.",
        "Maybe the original assumption was wrong.",
      ],
      whyItHelps: "Don't force today's need into yesterday's documentation — naming the change explicitly is what turns \"expected behaviour\" into a legitimate change request.",
    },
    {
      number: 8,
      title: "DECIDE & DOCUMENT — Close the ambiguity",
      insight: "By the end, capture enough that the same argument can't return next sprint.",
      list: [
        "Observed behaviour — what does the system do?",
        "Expected behaviour — what should it do now?",
        "Evidence — which requirement, AC, rule, or policy supports the conclusion?",
        "Classification — defect / expected behaviour / requirement gap / configuration-data issue / change.",
        "Decision — fix, change, configure, clarify, or accept.",
        "Owner — who decides or delivers the next action?",
      ],
      whyItHelps: "Then update the relevant requirement, AC, decision log, configuration, or defect — the decision only sticks if the documentation changes with it.",
    },
    {
      number: 9,
      title: "A second example: same disagreement, different answer",
      insight: "Evidence decides — not which side sounds more confident.",
      compare: {
        leftLabel: "Business says",
        left: "\"Customers can't cancel orders after packing. That's a defect.\"",
        rightLabel: "Technology says",
        right: "\"Expected. Cancellation is disabled once status = PACKED.\"",
      },
      explanation: "Check the requirement: \"Orders may be cancelled before dispatch.\" PACKED is before DISPATCHED. Technology's rule is stricter than the agreed requirement. That's a defect — the opposite conclusion from the backdated-claims example, reached by the same method.",
      whyItHelps: "The method doesn't pre-decide who's right. It just makes sure the requirement, not the louder voice, settles the question.",
    },
    {
      number: 10,
      title: "The BA trap: becoming the referee",
      insight: "Don't relay opinions. Bring evidence.",
      compare: {
        leftLabel: "Relaying opinions",
        left: "\"Business says this is wrong.\" / \"Tech says this is exactly what you asked for.\"",
        rightLabel: "Bringing evidence",
        right: "\"The requirement allows cancellation until dispatch. Current behaviour blocks it at packing. That differs from the agreed rule.\"",
      },
      proTip: "Or: \"The seven-day limit matches the approved requirement. The business now needs a 30-day exception, so this is a requirement change.\" Either way, the conversation moves forward instead of restarting.",
      whyItHelps: "A BA doesn't need to prove someone made a mistake — the goal is to remove ambiguity so everyone knows what to build and test.",
    },
  ],
};

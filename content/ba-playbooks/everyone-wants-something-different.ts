import type { Playbook } from "@/types/content";

const stakeholderAlignmentSheet = `STAKEHOLDER ALIGNMENT & TRADE-OFF SHEET

1. OUTCOME
What business problem or outcome are we trying to solve?

2. NEEDS
For each stakeholder — what are they actually trying to achieve or protect?

3. CONFLICT
Where do those needs genuinely clash? Don't confuse different wording with a real conflict.

4. CONSTRAINTS
Non-negotiables: regulation, policy, security, budget, architecture, data, timeline, capacity.

5. PRIORITIES
Rank must-haves and business outcomes. What happens if each need is not met?

6. OPTIONS / TRADE-OFFS
Option A —
  Value:
  Cost / risk:
  Constraint fit:

Option B —
  Value:
  Cost / risk:
  Constraint fit:

Option C —
  Value:
  Cost / risk:
  Constraint fit:

7. DECISION
Chosen option:
Decision owner:
Why this option:

8. MAKE IT BUILDABLE
Translate the decision into rules, roles, thresholds, exceptions, data, audit needs and acceptance criteria.

BEFORE YOU CLOSE THE MEETING
[ ] Underlying problem is clear
[ ] Needs are separated from proposed solutions
[ ] Conflicts and constraints are explicit
[ ] Priorities and trade-offs are understood
[ ] Decision owner is clear
[ ] Decision is translated into testable requirements
`;

// Full narrative prose lives in
// components/ba-playbooks/everyone-wants-something-different-body.tsx
// (rendered via the customPlaybookBodies registry, not from `hacks`). This is a
// plain-text copy of that same prose, used only to compute an accurate reading
// time — see the `bodyText` field doc in types/content.ts.
const bodyText = `You're in a requirements meeting. Sales says we need more flexibility. Operations says we need tighter controls. Compliance says we need fewer exceptions. Technology finally asks: can someone just tell us what to build? Everyone looks at the BA. This is not necessarily a bad meeting — it may simply mean each stakeholder is protecting something different. The job isn't to find the sentence everyone dislikes equally. It's to discover what outcome we're trying to achieve, what constraints are real, and what trade-offs we're willing to make.

Take an e-commerce company changing its refund process. Sales wants agents to approve refunds quickly. Operations wants controls because refund mistakes are expensive. Risk wants large refunds reviewed. Technology wants one clear workflow. "Make refunds flexible," "require approval," "reduce exceptions" — none of those is the requirement. They're stakeholder positions. The actual requirement sits underneath them.

LISTEN. Ask Sales what problem more flexibility solves — maybe customers wait two days for simple refunds. Ask Operations what risk the controls protect against — maybe agents sometimes refund the wrong amount. Ask Risk which refunds actually need review — maybe only refunds above a threshold. The disagreement gets more precise. Sales may not want no controls at all. Operations may not want approval on everything. Those were positions; the underlying needs may be compatible.

SEPARATE. Stakeholders often describe solutions as requirements — "add an approval screen," "give managers an override button," "make everything automatic." Before accepting the solution, ask what problem it would solve. "Approval screen" might really mean high-value refunds need independent review. "Override button" might mean urgent cases need an exception path. "Automate everything" might mean low-risk refunds shouldn't wait for manual review. Now you design around the need, not the first solution someone suggested.

CONFLICT. Write the needs plainly — Sales wants less waiting, Operations wants fewer mistakes, Risk wants exposure controlled, Technology wants a maintainable workflow — then ask where they actually clash. Often everyone agrees small refunds should be fast, and the disagreement exists only above a threshold. A four-way argument becomes one decision. That's BA work.

CONSTRAINTS. Some preferences are flexible; some constraints aren't. Look for regulation, policy, contractual commitments, security, budget, architecture, data availability, delivery dates, operational capacity. "Refunds above a threshold require independent approval because of company policy" is different from "we prefer managers to approve them." Make constraints explicit, or teams debate options that were never viable.

PRIORITISE. When everything is critical, nothing is. Ask what's must-have, what creates the most value, what prevents the biggest risk, what can wait, what happens if we don't do this. Rank outcomes rather than stakeholder seniority, so design decisions have something to anchor to.

TRADE-OFFS. Don't ask which option people like — show the consequences. Approval for every refund gives the strongest control but a slower, heavier process. No approval is fastest but raises error and fraud exposure. Risk-based approval — automatic below a low threshold, agent approval in the middle band, manager review above a high threshold — buys speed where risk is low and control where risk is high. Now the team isn't arguing about opinions. It's choosing a trade-off.

DECIDE. A common BA trap is trying to make everyone completely happy — sometimes that isn't possible. The goal isn't everyone getting everything; it's the right decision made with the trade-offs understood. If stakeholders can't agree, identify the decision owner and present problem, options, constraints, impact, recommendation — then get a decision. Consensus is useful. Decision is essential.

DOCUMENT. Turn the decision into precise, testable behaviour — thresholds, roles, exceptions, error behaviour, audit requirements, notifications, reporting, acceptance criteria. Don't send "please review the requirements." Send "we agreed on risk-based approval — please confirm these thresholds, roles and exception rules." Specific confirmation produces better feedback.

If the most senior stakeholder simply overrules the group, that doesn't remove the need to show consequences — document the impact of their choice so they can see what they're choosing. And often everyone is right at once: Sales is right about customer experience, Operations about control, Risk about exposure, Technology about complexity. The answer isn't picking a winner — it's thresholds, different flows, permissions, exceptions, phased delivery, configurable rules. Conflicting needs sometimes need better design, not compromise.

Common traps: taking sides and becoming a messenger instead of an analyst; jumping straight to a proposed solution and solving the wrong problem; agreeing to everything until the product is expensive and contradictory; ignoring assumptions nobody stated out loud; chasing consensus forever because nobody named a decision owner; and forgetting to document the trade-off, so three months later nobody remembers why the decision was made.

Stakeholder disagreement is often where the real requirement is hiding. When Sales asks for flexibility, Operations asks for control, and Risk asks for fewer exceptions, don't immediately compromise. Ask what each person is trying to protect. Expose the real conflict. Make constraints visible. Show the trade-offs. Get the decision. The BA's job isn't to find the middle — it's to find the requirement that best serves the outcome within the real constraints. A good BA doesn't make everyone agree. A good BA makes sure everyone understands what was decided, and why.`;

export const everyoneWantsSomethingDifferent: Omit<Playbook, "readingTime"> = {
  slug: "everyone-wants-something-different",
  title: "Everyone Wants Something Different. What's the Actual Requirement?",
  description:
    "Four stakeholders, four answers, one team waiting to build. Don't find the middle — find the requirement underneath their positions.",
  summary:
    "A refund-process walkthrough of the eight-step playbook — Listen, Separate, Conflict, Constraints, Prioritise, Trade-offs, Decide, Document — for turning Sales, Operations, Risk and Technology's competing requests into one buildable decision.",
  category: "Business Analysis",
  tags: ["Stakeholders", "Requirements", "trade-offs"],
  author: "Surya",
  date: "2026-08-15",
  itemLabel: "Step",
  audience: [
    "Business Analysts sitting in a room where every stakeholder wants something different",
    "BAs tempted to average four positions into one watered-down requirement",
    "Delivery leads who need a decision, not another round of consensus-chasing",
    "Anyone who's heard four different answers to \"what are we building?\" in the same meeting",
  ],
  bodyText,
  seoTitle: "Everyone Wants Something Different — A Stakeholder Alignment Playbook",
  seoDescription:
    "A practical BA guide to conflicting stakeholder requests — how to separate positions from needs, expose the real conflict, make constraints explicit, show trade-offs, and get a decision made and documented.",
  closingHeading: [
    "A good BA doesn't make everyone agree.",
    "A good BA makes sure everyone understands what was decided — and why.",
  ],
  closingBody:
    "Next time four stakeholders want four different things, don't look for the sentence everyone dislikes equally. Ask what each one is protecting, expose where the needs actually clash, make the constraints explicit, show the trade-offs — then get the decision made and written down.",
  closingTemplate: stakeholderAlignmentSheet,
  closingTemplateName: "Stakeholder Alignment & Trade-off Sheet",
  download: {
    icon: "template",
    title: "Stakeholder Alignment & Trade-off Sheet — PDF",
    description:
      "A one-page worksheet for turning conflicting stakeholder requests into needs, constraints, priorities, options, trade-offs and a clear decision.",
    href: "/downloads/stakeholder-alignment-trade-off-sheet.pdf",
    filename: "stakeholder-alignment-trade-off-sheet.pdf",
    meta: "PDF · 1 page",
    cta: "Download the free PDF",
    analyticsEvent: "stakeholder_alignment_trade_off_sheet_downloaded",
  },
  relatedPlaybookSlugs: [
    "who-owns-the-requirement",
    "requirement-elicitation-playbook",
    "acceptance-criteria-playbook",
  ],
  hacks: [
    {
      number: 1,
      title: "LISTEN — what is each stakeholder really protecting?",
      insight: "\"More flexibility,\" \"tighter controls\" and \"fewer exceptions\" are positions, not requirements.",
      explanation:
        "Ask Sales what problem more flexibility would solve, ask Operations what risk the controls protect against, ask Risk which cases actually need review. The disagreement gets more precise — and the underlying needs are often compatible even when the positions sound opposed.",
      whyItHelps: "You can't reconcile four positions. You can often reconcile four needs, once you know what they actually are.",
    },
    {
      number: 2,
      title: "SEPARATE — need or proposed solution?",
      insight: "Stakeholders describe solutions as requirements: \"add an approval screen,\" \"give managers an override button.\"",
      explanation:
        "Before accepting the solution, ask what problem it would solve. \"Approval screen\" might mean high-value cases need independent review. \"Override button\" might mean urgent cases need an exception path.",
      whyItHelps: "Design around the need, not the first solution someone happened to suggest in the meeting.",
    },
    {
      number: 3,
      title: "CONFLICT — where do needs genuinely clash?",
      insight: "Write each stakeholder's need down plainly, then ask where they actually conflict.",
      explanation:
        "Often everyone agrees on the easy 80% — small refunds should be fast, low-risk cases shouldn't wait. The real disagreement exists only above a threshold, or in one specific scenario.",
      whyItHelps: "A four-way argument usually collapses into one narrow decision once the fake conflict is stripped away.",
    },
    {
      number: 4,
      title: "CONSTRAINTS — what cannot be negotiated away?",
      insight: "Some preferences are flexible. Some constraints aren't — and the two get argued as if they were equal.",
      list: [
        "Regulation and policy",
        "Contractual commitments and security",
        "Budget and architecture",
        "Data availability and delivery dates",
        "Operational capacity",
      ],
      whyItHelps: "\"Company policy requires it\" and \"I'd prefer it that way\" are different sentences. Naming which is which stops teams debating options that were never viable.",
    },
    {
      number: 5,
      title: "PRIORITISE — what matters most?",
      insight: "When everything is critical, nothing is.",
      explanation:
        "Ask what's must-have, what creates the most business value, what prevents the biggest risk, what can wait, and what happens if it isn't done at all. Rank outcomes rather than stakeholder seniority.",
      whyItHelps: "A ranked list gives every later design decision something concrete to anchor to.",
    },
    {
      number: 6,
      title: "TRADE-OFFS — show what each option buys and costs",
      insight: "Don't ask which option people like. Show the consequences of each.",
      compare: {
        leftLabel: "Approval for every refund",
        left: "Strongest control. Slower customer experience, more operational work.",
        rightLabel: "Risk-based approval",
        right: "Automatic below a low threshold, agent approval in the middle, manager review above a high threshold — speed where risk is low, control where risk is high.",
      },
      whyItHelps: "Once consequences are on the table, the team is choosing a trade-off, not arguing over taste.",
    },
    {
      number: 7,
      title: "DECIDE — don't chase perfect consensus",
      insight: "The goal isn't everyone getting everything. It's the right decision made with the trade-offs understood.",
      explanation:
        "If stakeholders can't agree, identify the decision owner and present problem, options, constraints, impact, recommendation — then get a decision. Consensus is useful. Decision is essential.",
      whyItHelps: "A meeting without a named decision owner just becomes next week's meeting, with the same four positions.",
    },
    {
      number: 8,
      title: "DOCUMENT — turn the decision into buildable behaviour",
      insight: "\"Please review the requirements\" gets vague feedback. Specific confirmation gets useful feedback.",
      explanation:
        "Define thresholds, roles, exceptions, error behaviour, audit requirements, notifications, reporting and acceptance criteria — then send \"we agreed on risk-based approval, please confirm these thresholds, roles and exception rules.\"",
      whyItHelps: "Three months later, someone will ask why this was decided. The documented trade-off is the only thing that still answers that question.",
    },
  ],
};

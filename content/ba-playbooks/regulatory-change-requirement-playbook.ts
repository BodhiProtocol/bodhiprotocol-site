import type { Playbook } from "@/types/content";

const traceabilitySheet = `REGULATORY REQUIREMENT TRACEABILITY SHEET

REGULATION
Name and citation (article / clause):
Effective date:
Version or amendment this requirement is built against:

SCOPE
Products in scope:
Client / counterparty types in scope:
Legal entities and jurisdictions in scope:
Explicitly out of scope:

DEFINED TERMS
Regulatory term → business/system equivalent:
[repeat per term]

INTERPRETATION DECISIONS
Ambiguous point:
Interpretation adopted:
Decided by (name, role):
Date decided:

SCOPE PHASING
Day-one requirement (must be compliant by the effective date):
Phase 2 (deferred, documented and agreed):

RETROSPECTIVE IMPACT
Applies to new activity only? Y / N
Remediation required for existing records? Y / N — if yes, describe the population and method:

EVIDENCE TRAIL
Clause → Business rule → System change → Test case → Evidence artifact
[repeat per rule]

SIGN-OFF
Regulatory owner:
Signed off on (date):
`;

export const regulatoryChangeRequirementPlaybook: Omit<Playbook, "readingTime"> = {
  slug: "regulatory-change-requirement-playbook",
  title: "Writing a Requirement for a Regulatory Change",
  description:
    "The stakeholder is a rulebook, not a person, and the deadline doesn't move. Here's how to turn a regulatory clause into a requirement that survives an audit.",
  summary:
    "A practical guide to writing requirements from regulatory text — finding the real interpretation owner, translating defined terms, scoping the affected population precisely, phasing an immovable deadline, and building the evidence trail from clause to system behaviour that a regulator can actually follow.",
  category: "Capital Markets",
  tags: ["Regulatory", "Compliance", "audit-trail"],
  author: "Surya",
  date: "2026-08-15",
  itemLabel: "Move",
  intro: [
    "A regulator publishes a new rule. Compliance forwards a one-line summary: \"we need trade reporting for large swaps.\" The effective date is already on the calendar, and it isn't moving for anyone's sprint plan.",
    "A regulatory change looks like an ordinary requirement wearing an urgent label, and treating it that way is how teams end up building the wrong thing correctly. The stakeholder isn't a person you can interview until the ambiguity clears — it's a legal text that says what it says, interpreted by someone who has to be willing to put their name on that interpretation.",
    "None of this makes a regulatory requirement harder to write. It makes it a different kind of writing — one where the requirement has to survive being read by an auditor who wasn't in any of your meetings.",
  ],
  audience: [
    "Business Analysts assigned a regulatory or compliance-driven change",
    "BAs translating a rule citation into a requirement for the first time",
    "Delivery leads who need an audit-ready trail, not just working software",
    "Anyone who's heard \"Compliance says we need this\" and nothing more specific",
  ],
  seoTitle: "Writing a Requirement for a Regulatory Change — A BA Playbook",
  seoDescription:
    "A practical Business Analyst guide to turning regulatory text into a buildable requirement — scoping the affected population, documenting interpretation decisions, phasing an immovable deadline, and building an audit-ready evidence trail.",
  closingHeading: [
    "A regulator doesn't ask if it works.",
    "A regulator asks if you can prove it — and prove which version of the rule you built against.",
  ],
  closingBody:
    "Every regulatory requirement reduces to the same shape: a clause, an owner willing to interpret it, a population it actually applies to, and a trail connecting all of that to what the system does. The deadline was never negotiable. Everything else is a decision someone has to make and document — including you.",
  closingTemplate: traceabilitySheet,
  closingTemplateName: "Regulatory Requirement Traceability Sheet",
  relatedPlaybookSlugs: [
    "requirement-elicitation-playbook",
    "who-owns-the-requirement",
    "acceptance-criteria-playbook",
  ],
  hacks: [
    {
      number: 1,
      title: "Find the regulatory owner before you find the requirement",
      insight: "The rulebook can't answer a clarifying question. Someone still has to.",
      explanation:
        "\"Compliance says we need this\" isn't an owner — it's a department. You need one named person in Compliance or Legal who can read the actual clause, rule on what it means for your business, and stand behind that reading later. Everyone else is a contributor, not the decision-maker.",
      whyItHelps:
        "Without a named owner, every ambiguity in the rule text becomes a BA guess by default — and a BA's guess isn't what regulators expect to find behind a compliance control.",
    },
    {
      number: 2,
      title: "Read the clause, not the summary",
      insight: "The one-line version that reaches you has already lost the details that matter.",
      compare: {
        leftLabel: "What gets forwarded",
        left: "\"We need trade reporting for large swaps.\"",
        rightLabel: "What the clause actually says",
        right:
          "\"OTC swap transactions with notional value exceeding the prescribed threshold shall be reported to the designated repository within one business day of execution, including counterparty legal entity identifiers.\"",
      },
      whyItHelps:
        "The summary drops the exact threshold, the timing reference point, and what \"reported\" is legally required to include. Those are precisely the details a requirement can't afford to inherit secondhand.",
    },
    {
      number: 3,
      title: "Translate defined terms before you translate requirements",
      insight: "The regulation's vocabulary rarely matches what Operations calls the same thing day to day.",
      list: [
        "\"Reportable Transaction\" — does it include novations, partial terminations, allocations?",
        "\"Execution\" — trade date, confirmation timestamp, or booking time in the system of record?",
        "\"Counterparty\" — the legal entity on the confirmation, or the ultimate parent?",
        "\"Business day\" — whose calendar, and in which time zone?",
      ],
      whyItHelps:
        "Build this glossary before writing a single business rule. Every one of these terms decides who's in scope and when the clock starts — get the mapping wrong and the requirement is compliant with a rule that doesn't exist.",
    },
    {
      number: 4,
      title: "Scope the affected population with precision",
      insight: "The single most common regulatory-change failure is a population that's subtly wrong.",
      checklist: [
        "Which products are in scope — and which look similar but aren't?",
        "Which client and counterparty types are in scope?",
        "Which legal entities and jurisdictions does this actually apply to?",
        "Which booking systems hold the affected trades today?",
        "What's explicitly out of scope, written down, not just assumed?",
      ],
      whyItHelps:
        "A functionally perfect feature built against the wrong population isn't a smaller version of compliant — it's non-compliant with an audit trail proving you knew the rule existed.",
    },
    {
      number: 5,
      title: "Document every ambiguous interpretation as a named decision",
      insight: "\"We assumed\" does not survive an audit. A dated decision with an owner does.",
      before: "BA reads an ambiguous clause, picks the reasonable-sounding interpretation, and moves on without writing it down.",
      after: [
        "Ambiguity logged: does \"execution\" mean trade date or confirmation timestamp?",
        "Escalated to the named regulatory owner in Compliance",
        "Interpretation adopted, with rationale, dated and attributed",
      ],
      whyItHelps:
        "If a regulator later disagrees with the interpretation, the question becomes \"who decided this and why\" — not \"why did the BA decide this alone.\"",
    },
    {
      number: 6,
      title: "The effective date doesn't move. The scope does.",
      insight: "You can't negotiate a regulator's calendar. You can negotiate what \"compliant\" means on day one.",
      visual: {
        steps: [
          "Day-one MVP — the minimum that must be compliant by the effective date",
          "→ agreed with the regulatory owner, in writing",
          "→ Phase 2 — everything else, on a real date",
        ],
      },
      whyItHelps:
        "A documented, signed-off MVP is a scoping decision. An undocumented one that quietly ships incomplete is a compliance gap wearing a project-plan excuse.",
    },
    {
      number: 7,
      title: "Build the evidence trail, not just the feature",
      insight: "A regulator doesn't ask whether it works. A regulator asks you to prove it.",
      visual: {
        steps: ["Clause", "→ Business rule", "→ System change", "→ Test case", "→ Evidence artifact"],
      },
      whyItHelps:
        "\"It works\" is a QA outcome. \"Here is the report, the log entry, and the test case that trace back to Article 12(3)\" is an audit outcome — and only one of those is what you'll actually be asked for.",
    },
    {
      number: 8,
      title: "Version the regulation, not just your requirement",
      insight: "Rules get amended. Your requirement needs to say which version of the rule it was built against.",
      explanation:
        "Record the citation, the version or amendment date, and the effective date you built to. When the rule changes again six months later, this is what stops the new change from getting silently merged into — or mistaken for — the one you already shipped.",
      whyItHelps: "An auditor asking \"was this built against the current rule\" needs a one-line answer, not an investigation.",
    },
    {
      number: 9,
      title: "Ask whether this reaches backward, not just forward",
      insight: "\"New trades from the effective date\" and \"all existing open trades\" are two different projects.",
      compare: {
        leftLabel: "Go-forward only",
        left: "Applies to new activity booked after the effective date. Smaller population, contained scope.",
        rightLabel: "Retrospective remediation",
        right:
          "Applies to existing open positions or historical records too — a larger population, a data-quality problem, and usually a separate remediation plan.",
      },
      whyItHelps:
        "Assuming go-forward-only when the rule actually requires remediation is a gap that surfaces during the regulator's first sample check, not during your testing.",
    },
    {
      number: 10,
      title: "Close with a documented sign-off, not a \"looks good\"",
      insight: "A verbal nod from Compliance isn't evidence. A dated, attributed sign-off is.",
      compare: {
        leftLabel: "\"Looks good\"",
        left: "A nod in a meeting, or a thumbs-up on a Slack thread. Nothing an auditor can find six months later.",
        rightLabel: "Documented sign-off",
        right:
          "A dated, attributed approval against the scope, the interpretation decisions, and the MVP boundary — filed where the next person to touch this can find it.",
      },
      whyItHelps:
        "Before build starts, get the regulatory owner's sign-off in writing against the scope, the interpretation decisions, and the MVP boundary — the same artifact that answers every later question about why this was built the way it was.",
      proTip:
        "Send the traceability sheet, not a generic \"please review the requirements.\" Specific confirmation against a specific document is what actually produces an audit trail.",
    },
  ],
};

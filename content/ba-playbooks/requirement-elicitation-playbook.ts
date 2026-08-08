import type { Playbook } from "@/types/content";

const questionBank = `PROBLEM
What problem is this actually solving?
What happens if we do nothing?

CURRENT STATE
What happens today?
Who performs the process?
Which system(s) are involved?
What part of it is manual?
Where does it usually break down?
Is there a workaround already in use?

USERS
Who asked for this?
Who will actually use it day to day?
Are those the same person?

TRIGGER
What starts this process?
A user action, a system event, or a scheduled batch?

PROCESS
What does the happy path look like, start to finish?
What's the smallest version of this that would still be useful?

BUSINESS RULES
Are there thresholds, limits or approval conditions involved?
Do different customer, product or market types behave differently?

EXCEPTIONS
What happens if required data is missing?
What happens if an upstream system is unavailable?
What happens if the request is a duplicate?
What happens if processing partially succeeds?

DATA
Where does the data come from?
Who owns it?
Which fields are mandatory, and which are optional?

DEPENDENCIES
What other systems, teams or requirements does this rely on?
What else relies on this?

SECURITY
Who should NOT be able to see or trigger this?
Are there jurisdiction or entitlement restrictions?

REPORTING
Does this need to be reported on?
To whom, and how often?

AUDIT
Does this action need to be traceable later?
What specifically needs to be logged?

SUCCESS
How will we know this actually worked?
What does "better" look like, measurably?

OPEN QUESTIONS
[Anything still unconfirmed]

ASSUMPTIONS
[Anything being assumed rather than confirmed]
`;

export const requirementElicitationPlaybook: Omit<Playbook, "readingTime"> = {
  slug: "requirement-elicitation-playbook",
  title: "Requirement Elicitation Playbook",
  description: "How to get from \"we need this\" to what the business actually needs.",
  summary:
    "A discovery-led guide to the questions that separate a stated request from the real requirement underneath it — current state, triggers, exceptions, business rules and the ones nobody thinks to ask.",
  category: "Business Analysis",
  tags: ["Requirements", "elicitation", "discovery"],
  author: "Surya",
  date: "2026-08-08",
  itemLabel: "Move",
  intro: [
    "A stakeholder tells you: \"We need an export button.\" The easy thing is to write the ticket exactly like that — Add Export button — and move it into the backlog. Most of the time, that's also the wrong thing, because the interesting part of the job hasn't started yet.",
    "Why do they need the export? What happens to the file once they have it? Who actually opens it? How often? What are they doing today instead? The answers to those questions are usually where the real requirement is hiding — and it isn't always a button.",
    "Good elicitation isn't about asking more questions. It's about finding the small number of questions that expose what's actually going on.",
  ],
  audience: [
    "Business Analysts",
    "Requirements Analysts",
    "Product Owners running discovery",
    "BAs newer to stakeholder conversations",
    "Anyone who has written a ticket exactly as asked and regretted it",
  ],
  seoTitle: "Requirement Elicitation Playbook for Business Analysts",
  seoDescription:
    "A practical requirement elicitation guide for Business Analysts — the discovery questions that separate a stated request from the business need underneath it, covering current state, triggers, exceptions and business rules.",
  closingHeading: ["The requirement was never the button.", "It was the problem underneath it."],
  closingBody:
    "Every discovery conversation eventually reduces to the same shape: a stated ask, a real problem underneath it, and a set of questions that connects the two. The export button might still be the right answer. Now you'll know that for a reason, not by default.",
  closingTemplate: questionBank,
  closingTemplateName: "Requirement Elicitation Question Bank",
  relatedPlaybookSlugs: ["acceptance-criteria-playbook"],
  relatedTopics: ["Business Analyst User Story Template", "New Project Discovery Playbook"],
  hacks: [
    {
      number: 1,
      title: "Start with the problem, not the requested solution",
      insight: "The requested solution is a clue. It is rarely the requirement.",
      compare: {
        leftLabel: "What they said",
        left: "\"We need an export button.\"",
        rightLabel: "What they might actually need",
        right:
          "A way to get trade data into the reconciliation tool without retyping it by hand every morning.",
      },
      whyItHelps:
        "A button is easy to build and easy to get wrong. If the real need is data moving between two systems, an export button is one possible answer among several — and maybe not the best one.",
      proTip: "Ask what they'll do with it immediately after they get it. That answer is usually the real requirement.",
    },
    {
      number: 2,
      title: "Ask what happens today, before asking what should happen",
      insight: "You can't design a better process without knowing what the current one actually looks like.",
      list: [
        "Who performs this today?",
        "Which system, or systems, are involved?",
        "What part of it is manual?",
        "Where does it usually go wrong?",
        "Is there already a workaround in use?",
      ],
      whyItHelps:
        "Half the time the workaround people describe, offhand, turns out to be the actual requirement — nobody had gotten around to asking for it properly.",
    },
    {
      number: 3,
      title: "Find the trigger",
      insight: "Nothing happens in isolation. Something starts this process — find out what.",
      visual: { steps: ["User action", "System event", "Trade execution", "File arrival", "Scheduled batch"] },
      whyItHelps:
        "The trigger decides how the requirement gets built. \"A user clicks a button\" and \"a file lands in a folder overnight\" are two completely different pieces of work wearing the same one-line description.",
    },
    {
      number: 4,
      title: "Map the happy path before you go looking for trouble",
      insight: "Get the simple version working on paper first — the version where nothing goes wrong.",
      visual: { steps: ["Request submitted", "Checked", "Approved", "Processed", "Confirmed"] },
      whyItHelps:
        "It's tempting to jump straight to edge cases because they feel like the hard part. But you can't spot which edge cases actually matter until the main flow is clear.",
      whenToUse: "Right after the trigger is confirmed, before any exceptions are discussed.",
    },
    {
      number: 5,
      title: "Then go looking for exceptions on purpose",
      insight: "Exceptions don't volunteer themselves. You have to go and find them.",
      checklist: [
        "What happens if required data is missing?",
        "What happens if the upstream system is unavailable?",
        "What happens if the same request arrives twice?",
        "What happens if processing partially succeeds?",
      ],
      whyItHelps:
        "\"We'll figure that out later\" is how a two-week ticket becomes a two-month one — after development has already started and the exception shows up uninvited.",
    },
    {
      number: 6,
      title: "Business rules hide inside ordinary sentences",
      insight: "A stakeholder rarely says \"here is a business rule.\" They just say the sentence.",
      list: [
        "\"Trades above $1 million need supervisory sign-off.\"",
        "\"Clients in restricted jurisdictions shouldn't see this report.\"",
        "\"Cancelled orders don't go through the same check as executed ones.\"",
      ],
      whyItHelps:
        "Each of those sounds like a passing comment. Each one is a condition your requirement needs to account for explicitly, not infer later from a bug report.",
    },
    {
      number: 7,
      title: "Find the data before you finalise the fields",
      insight: "A field on a form is the last decision, not the first one.",
      list: [
        "Where does this data actually come from?",
        "Who owns that system, and can it be relied on?",
        "Which fields are mandatory, and which just sound like they should be?",
      ],
      whyItHelps:
        "Designing the screen before confirming the data exists, in the right shape, in a system you can actually reach, is how requirements get rebuilt three sprints in.",
    },
    {
      number: 8,
      title: "Find the dependencies before you commit to a date",
      insight: "A requirement is rarely self-contained. Find out what it's standing on.",
      visual: { steps: ["This requirement", "→ needs API access", "→ needs a data migration", "→ needs sign-off from Risk"] },
      whyItHelps:
        "Dependencies discovered during elicitation are a planning input. Dependencies discovered during sprint two are a delay with your name near it.",
    },
    {
      number: 9,
      title: "Ask how success will actually be measured",
      insight: "If nobody can say what \"better\" looks like, nobody can tell you when to stop.",
      compare: {
        leftLabel: "Vague goal",
        left: "\"Make the reconciliation process faster.\"",
        rightLabel: "Measurable goal",
        right: "\"Cut manual reconciliation time from 45 minutes to under 10, per business day.\"",
      },
      whyItHelps:
        "Without this, a technically correct delivery can still land as a disappointment, because nobody agreed in advance what winning looked like.",
    },
    {
      number: 10,
      title: "Write down open questions instead of quietly deciding them yourself",
      insight: "An unanswered question you decided alone is now a hidden assumption wearing a requirement's clothes.",
      before: "BA assumes email notification is fine, doesn't mention it, moves on.",
      after: [
        "Open question logged: notification channel — email or in-app — not yet confirmed",
        "Flagged to the stakeholder directly, with a date to close it out",
        "Assumption documented and visible until it's answered",
      ],
      whyItHelps: "The expensive version of this mistake shows up in UAT, when 'obviously email' turns out to have been obvious to exactly one person.",
    },
    {
      number: 11,
      title: "Read the requirement back before anyone builds it",
      insight: "Say it back in plain language and watch their face, not just their words.",
      whyItHelps:
        "Paraphrasing catches more misunderstandings than another round of clarifying questions, because it forces both sides to agree on the same sentence instead of two different mental pictures of it.",
      proTip: "If the stakeholder pauses before agreeing, that pause is data. Ask what made them pause.",
    },
  ],
};

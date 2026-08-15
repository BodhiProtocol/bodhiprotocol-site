import type { Playbook } from "@/types/content";

const firstDraftStory = `As a retail banking customer,
I want to download my monthly account statements,
so that I can keep copies for my personal records.`;

const contextParagraph = `Customers can currently view recent account activity online, but older monthly statements must be requested through customer support.

This creates unnecessary support requests and delays customers who need statements for record keeping.`;

const completeJiraStory = `TITLE
Allow customers to download monthly account statements

CONTEXT
Customers can currently view recent account activity online, but older monthly statements must be requested through customer support.

BUSINESS PROBLEM
Customers cannot independently access previous monthly statements, creating unnecessary support requests and delays.

USER STORY
As a retail banking customer,
I want to download my monthly account statements,
so that I can keep copies for my personal records.

BUSINESS RULES
1. Statements are available for the previous 24 months.
2. Only statements belonging to the authenticated customer can be accessed.
3. Statements are provided in PDF format.
4. Statements are generated monthly.

ACCEPTANCE CRITERIA
AC1
Given the customer is logged in
When they open the Statements section
Then available monthly statements for the previous 24 months are displayed.

AC2
Given a statement is available
When the customer selects Download
Then the corresponding PDF is downloaded.

AC3
Given the requested statement does not belong to the authenticated customer
When the request is made
Then access is denied.

DATA REQUIREMENTS
Customer ID
Account ID
Statement period
Document ID
Statement status

DEPENDENCIES
Document Management Service
Authentication service
Statement retrieval API
Statement generation process

OUT OF SCOPE
Email delivery
Statements older than 24 months
PDF redesign
Ad-hoc statement generation

OPEN QUESTIONS
Are joint accounts included?
Should statements remain accessible after an account closes?
Is the 24-month period configurable?
`;

const firstStoryChecklist = `MY FIRST USER STORY CHECKLIST

[ ] I understand the actual problem, not just the requested solution
[ ] I know who the specific user is
[ ] I understand the outcome they need
[ ] The story describes value, not just a feature
[ ] Business rules are captured
[ ] Acceptance criteria are testable, single-assertion, and include negative cases
[ ] Failure paths and exceptions are considered
[ ] Data expectations are understood
[ ] Dependencies are visible
[ ] Scope boundaries are explicit
[ ] Open questions are visible, not buried in my head
[ ] Someone can understand this story without me in the room
`;

const starterStoryTemplate = `CONTEXT
What happens today?
Why does this change exist?

BUSINESS PROBLEM
What problem are we solving?

USER STORY
As a...
I want...
So that...

BUSINESS RULES
1.
2.
3.

ACCEPTANCE CRITERIA
Given...
When...
Then...
(include at least one negative or boundary case)

EXCEPTIONS
What happens when the normal flow fails?

DATA REQUIREMENTS
What information is needed?

DEPENDENCIES
Which systems, teams or services are involved?

OUT OF SCOPE
What are we deliberately not doing?

OPEN QUESTIONS
What still needs an answer?
`;

const storySplitCompare = {
  leftLabel: "One story",
  left: "Customers can download statements, view them on mobile, and staff can generate them ad hoc — all in the same ticket.",
  rightLabel: "Several stories wearing a trench coat",
  right: "A web flow, a mobile flow, and a staff-facing exception process are three different interfaces and three different conversations.",
};

export const firstTimeWritingAUserStory: Omit<Playbook, "readingTime"> = {
  slug: "first-time-writing-a-user-story",
  title: "First Time Writing a User Story",
  description: "How to turn a vague request into a story people can actually build and test.",
  summary:
    "A full worked example of turning \"we need a download button\" into a complete, Jira-ready user story — the questions that uncover the problem, the user, the business rules, when to split it, and everything a three-line story leaves out.",
  category: "Requirements",
  tags: ["Requirements", "user-stories", "jira"],
  author: "Surya",
  date: "2026-08-15",
  itemLabel: "Step",
  intro: [
    "Someone says: \"Can you create a Jira story for this?\" You say sure. Then you open Jira. Blank description box. And a very simple question becomes surprisingly difficult: what exactly am I supposed to write here?",
    "If this is your first user story, start here. Because the biggest mistake is thinking you need to invent something clever. You don't.",
    "Here's the one thing to remember before anything else: a story is ready when someone else can understand it without you sitting beside them. Everything below exists to get you to that point — it's the test you're building toward, not just an item on a checklist at the end.",
    "And the mechanical part — \"As a... I want... so that...\" — takes twenty seconds to write. Everything else is the actual work: uncovering what that sentence should say. A user story is not something you invent. It is something you uncover. Let's do one together, from a vague request to a complete story a developer and a tester could both work from.",
  ],
  audience: [
    "New and aspiring Business Analysts writing their first user story",
    "Junior BAs still finding their process",
    "Product Owners writing their own stories",
    "Delivery team members learning how requirements get written",
  ],
  seoTitle: "First Time Writing a User Story — A Practical BA Guide",
  seoDescription:
    "A practical step-by-step guide for Business Analysts on turning a vague request into a clear, testable, Jira-ready user story — including when to split it.",
  closingHeading: [
    "The blank Jira box gets easier once you stop asking \"What should I write?\"",
    "and start asking \"What do I still need to understand?\"",
  ],
  closingBody:
    "A user story is not something you invent. It is something you uncover. Writing \"As a... I want... So that...\" takes twenty seconds. Everything before it is the actual work.",
  closingTemplate: starterStoryTemplate,
  closingTemplateName: "Starter User Story Template",
  relatedPlaybookSlugs: [
    "requirement-elicitation-playbook",
    "acceptance-criteria-playbook",
    "jira-hacks-for-business-analysts",
    "story-carried-over-four-sprints",
  ],
  hacks: [
    {
      number: 1,
      title: "The request that already sounds like a story",
      insight: "\"We need a download button for monthly statements\" is easy to rewrite as a story. That's the trap.",
      visual: {
        steps: [
          "Business request",
          "Questions",
          "User story",
          "Business rules",
          "Acceptance criteria",
          "Complete Jira story",
        ],
      },
      compare: {
        leftLabel: "What you could write immediately",
        left: "As a customer, I want a download button, so that I can download my statement.",
        rightLabel: "What's actually true",
        right: "We don't understand the requirement yet — treat the request as a clue, not a spec.",
      },
      whyItHelps:
        "That first version technically looks like a user story. It just isn't one yet. Don't write it down until you've asked a few questions first.",
    },
    {
      number: 2,
      title: "Separate the problem from the solution",
      insight: "A button is a proposed solution. Ask what problem it solves before you ask how it should work.",
      before: "We don't have a download button.",
      after: "Customers can't access their previous statements without contacting support.",
      whyItHelps:
        "Stakeholders pitch solutions because that's the language they have — \"we need a button\" is easier to say than \"we need a process.\" Your job is to find the problem underneath the pitch.",
    },
    {
      number: 3,
      title: "Name the specific user",
      insight: "\"Customers\" is still too broad to design for. Not users — which users.",
      list: [
        "Retail customers?",
        "Corporate clients?",
        "Advisers?",
        "Internal operations users?",
      ],
      whyItHelps:
        "A retail banking customer checking their own statements has different needs than a support agent checking on someone else's behalf. Vague user types produce vague stories — suppose the answer turns out to be \"retail banking customers using online banking\": now you know who you're designing for.",
    },
    {
      number: 4,
      title: "Pin down the actual outcome",
      insight: "What does the user walk away with once this works?",
      explanation:
        "For the download button, it's not \"a download\" — it's \"a copy of my statement for my own records.\" That distinction shapes format, retention, and access rules later. Maybe the full answer is: \"They need to keep copies of their monthly statements for tax, loan and personal record purposes.\" Now you have the value — and the basic user story almost writes itself.",
      whyItHelps:
        "A story without a real outcome behind it is just a rewritten feature request. This is the piece that makes the \"so that\" line true instead of decorative.",
    },
    {
      number: 5,
      title: "Write the first version — and know you're not finished",
      insight: "The three-line story is the headline. The useful requirement lives underneath it.",
      template: firstDraftStory,
      templateLabel: "Copy the first draft",
      whyItHelps:
        "This is a perfectly reasonable user story. It's also not done. Everything from here is what turns a headline into something a team can actually build and test.",
    },
    {
      number: 6,
      title: "Add just enough context",
      insight: "Someone opening this ticket three months from now should understand why it exists.",
      template: contextParagraph,
      templateLabel: "Copy context",
      whyItHelps:
        "You don't need to write an essay. Just give the next person enough that they don't have to track you down and ask \"why are we doing this again?\"",
    },
    {
      number: 7,
      title: "Capture the business rules",
      insight: "The operational constraints that shape the feature — independent of any single acceptance criterion.",
      list: [
        "Customers can access statements for the previous 24 months.",
        "Statements are generated monthly.",
        "Only statements belonging to the logged-in customer can be accessed.",
        "Statements are available as PDF files.",
      ],
      whyItHelps:
        "None of this appeared in \"we need a download button.\" This is why the conversation matters more than the template — a form only captures what you thought to ask about.",
    },
    {
      number: 8,
      title: "Write acceptance criteria that actually hold up",
      insight: "This is where most stories fail in practice, so treat it as its own discipline, not a formality.",
      checklist: [
        "One assertion per criterion — if the \"Then\" clause joins two unrelated outcomes with an \"and,\" split it into two ACs",
        "Make the \"Then\" observable and testable, not aspirational",
        "Write the negative and boundary cases, not just the happy path",
        "Avoid encoding UI decisions as acceptance criteria unless the interaction itself is the requirement",
      ],
      list: [
        "AC1 — Given the customer is logged into online banking, when they open the Statements section, then available monthly statements from the previous 24 months are displayed.",
        "AC2 — Given a statement is available, when the customer selects Download, then the corresponding statement is downloaded as a PDF.",
        "AC3 — Given a customer requests a statement that does not belong to their account, when the request is made, then access is denied.",
      ],
      whyItHelps:
        "Now development has something concrete, QA has something testable, and you have something you can actually validate.",
    },
    {
      number: 9,
      title: "Write the unhappy paths",
      insight: "This is where beginner stories often stop too early.",
      checklist: [
        "What if the statement hasn't been generated yet?",
        "What if the PDF service is unavailable?",
        "What if there are no statements for that month?",
        "What if the customer has multiple accounts?",
        "What if the statement download fails?",
      ],
      whyItHelps:
        "You won't need a requirement for every imaginable scenario. But you should at least know which ones matter before development starts guessing.",
    },
    {
      number: 10,
      title: "Document the data requirements",
      insight: "What information does this feature actually need?",
      list: ["Customer ID", "Account ID", "Statement month", "Statement year", "Document ID", "File format", "Statement availability status"],
      whyItHelps:
        "You're not trying to design the database. You're making sure everyone agrees on the information the feature depends on.",
    },
    {
      number: 11,
      title: "Expose the dependencies",
      insight: "The screen may be simple. The feature might not be.",
      list: [
        "Document Management Service",
        "Customer authentication",
        "Statement generation process",
        "Statement retrieval API",
      ],
      whyItHelps:
        "You don't need to solve all of them inside your story. You do need to know they exist before someone commits to a delivery date.",
    },
    {
      number: 12,
      title: "Draw the scope boundary explicitly",
      insight: "This takes thirty seconds and saves a surprising amount of confusion later.",
      list: [
        "Emailing statements to customers",
        "Statements older than 24 months",
        "Changing the statement PDF format",
        "Generating ad-hoc statements",
      ],
      whyItHelps:
        "Now if someone later says \"I thought we were emailing them too,\" you have somewhere to point.",
    },
    {
      number: 13,
      title: "Know when to split it",
      insight: "A story that can't ship as a single unit of work isn't one story — it's several wearing a trench coat.",
      compare: storySplitCompare,
      checklist: [
        "By rule variation — does the same action behave differently under different business rules?",
        "By data source — if part of the story depends on data or a system that isn't ready, that part is a separate story",
        "By interface — a web flow and a mobile flow for the same outcome are usually two stories",
        "By happy path vs. exception handling — complex exception handling that needs its own design conversation should be split out",
      ],
      whyItHelps:
        "The gut check: if you can't describe the acceptance criteria in under a minute, or the story has more than about five to seven ACs, it's very likely two stories.",
    },
    {
      number: 14,
      title: "Keep your open questions visible",
      insight: "Don't hide unresolved questions in your notebook. Write them down instead of guessing.",
      list: [
        "Should statements for closed accounts remain accessible?",
        "Are joint accounts included?",
        "Is the 24-month retention period configurable?",
      ],
      whyItHelps:
        "A requirement with visible questions is much safer than a requirement pretending everything is already known.",
    },
    {
      number: 15,
      title: "The complete Jira story",
      insight: "Here's what \"we need a download button\" turned into.",
      explanation:
        "The hardest part wasn't writing As a... I want... So that... — that took about twenty seconds. The real work was understanding everything around it.",
      template: completeJiraStory,
      templateLabel: "Copy the complete story",
      whyItHelps:
        "The template helps. But the questions create the requirement — this is the difference between rewriting a request and actually understanding one.",
    },
    {
      number: 16,
      title: "Six mistakes I'd avoid on a first story",
      insight: "All six show up constantly, and all six are easy to catch before they ship.",
      list: [
        "Writing the solution as the requirement — pause and ask what they're actually trying to accomplish.",
        "Making the story enormous — if it can't reasonably be built, tested and understood as one change, split it.",
        "Writing technical implementation too early — describe the business behaviour, let the implementation conversation happen with the people building it.",
        "Forgetting the unhappy path — a story that only describes success hasn't described the feature yet.",
        "Assuming everybody understands your story — hand it to someone who wasn't in the meeting and see if their interpretation matches yours.",
        "Writing acceptance criteria that describe a feeling — \"intuitive\" or \"easy\" isn't testable; describe the observable outcome instead.",
      ],
      whyItHelps:
        "Most of these aren't hard to fix. They're just easy to miss on your first few stories, before catching them becomes a habit.",
    },
    {
      number: 17,
      title: "Build your own readiness checklist",
      insight: "Before you call a story ready, run it against this.",
      checklist: [
        "I understand the actual problem, not just the requested solution",
        "I know who the specific user is",
        "I understand the outcome they need",
        "The story describes value, not just a feature",
        "Business rules are captured",
        "Acceptance criteria are testable, single-assertion, and include negative cases",
        "Failure paths and exceptions are considered",
        "Data expectations are understood",
        "Dependencies are visible",
        "Scope boundaries are explicit",
        "Open questions are visible, not buried in my head",
        "Someone can understand this story without me in the room",
      ],
      template: firstStoryChecklist,
      templateLabel: "Copy Checklist",
      whyItHelps:
        "A story that passes this list is a story someone else can pick up, build, and test without needing you in the room.",
    },
  ],
};

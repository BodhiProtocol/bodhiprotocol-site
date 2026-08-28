import type { Playbook } from "@/types/content";

const masterStoryTemplate = `TITLE

CONTEXT
Explain what is happening and why this change exists.

BUSINESS PROBLEM
What problem are we solving?

USER STORY
As a...
I want...
So that...

BUSINESS RULES


ACCEPTANCE CRITERIA
AC1
Given...
When...
Then...

AC2
Given...
When...
Then...

DATA REQUIREMENTS
Inputs:
Outputs:
Source systems:
Key fields:

DEPENDENCIES
Linked issues:
Systems:
Teams:

OUT OF SCOPE


OPEN QUESTIONS


DECISIONS
`;

export const jiraHacksForBusinessAnalysts: Omit<Playbook, "readingTime"> = {
  slug: "jira-hacks-for-business-analysts",
  title: "Jira Hacks for Business Analysts",
  description: "12 small habits that make Jira much easier to live with.",
  summary:
    "Practical ways to write clearer tickets, capture decisions, expose dependencies and make requirements easier for developers and QA to use.",
  category: "Business Analysis",
  tags: ["Jira", "requirements", "ticketing"],
  author: "Surya",
  date: "2026-08-08",
  intro: [
    "Jira gets painful when it becomes a place where information is dumped instead of structured.",
    "These are not admin tricks or Jira certification tips.",
    "They are small working habits that help Business Analysts make requirements clearer, decisions easier to trace, and tickets easier for developers and QA to use.",
  ],
  audience: [
    "Business Analysts",
    "Product Owners",
    "QA professionals",
    "Developers working closely with BAs",
  ],
  featured: true,
  seoTitle: "Jira Hacks for Business Analysts — 12 Practical Tips",
  seoDescription:
    "12 practical Jira habits for Business Analysts covering user stories, acceptance criteria, dependencies, decisions, dashboards, JQL and reusable templates.",
  closingHeading: ["You don't need more Jira.", "You need clearer Jira."],
  closingBody:
    "Most Jira problems are not really Jira problems. They are information-design problems. Clear context, explicit decisions, visible dependencies, and testable acceptance criteria make the tool much easier to work with.",
  closingTemplate: masterStoryTemplate,
  closingTemplateName: "BA Jira Story Template",
  relatedPlaybookSlugs: [
    "acceptance-criteria-playbook",
    "requirement-elicitation-playbook",
    "first-time-writing-a-user-story",
  ],
  relatedTopics: ["Business Analyst User Story Template"],
  image: {
    src: "/images/ba-playbooks/jira-hacks-for-business-analysts-infographic.png",
    alt: "Infographic titled Jira for Business Analysts: From Requirement to Done, showing the Business Need to Done journey, the Epic/Story/Task/Sub-task/Bug basics, a worked payment-retry story example with acceptance criteria, business rules, context and dependencies, the BA's role through backlog refinement, development, requirement changes, UAT and bugs, a reminder that Jira status is not the same as reality, three useful JQL filters, a nine-point story readiness checklist, and a bad-ticket vs good-ticket comparison.",
    width: 2184,
    height: 1963,
    caption: "The whole habit, on one page — from a vague business need to a ticket a developer and QA can both act on.",
  },
  hacks: [
    {
      number: 1,
      title: "Stop writing recurring tickets from scratch",
      insight: "If the structure already works, reuse it.",
      shiftLabel: "",
      before: "Create a completely new Jira ticket every time.",
      after: [
        "Clone the closest matching ticket",
        "Remove irrelevant context",
        "Update the requirement",
        "Validate links and acceptance criteria",
      ],
      whyItHelps: "You preserve useful structure while reducing accidental omissions.",
      whenToUse: "Recurring changes across products, markets, releases, or similar workflows.",
      proTip: "Never blindly clone old assumptions, dates, owners, or dependencies.",
    },
    {
      number: 2,
      title: "Put context before the user story",
      insight: "A developer should understand the problem before reading the solution.",
      visual: {
        steps: [
          "Context",
          "Business Problem",
          "User Story",
          "Business Rules",
          "Acceptance Criteria",
          "Data Requirements",
          "Dependencies",
          "Out of Scope",
          "Open Questions",
        ],
      },
      whyItHelps: '"As a user..." rarely explains enough about why a change exists.',
      template:
        "CONTEXT:\n\nBUSINESS PROBLEM:\n\nUSER STORY:\nAs a...\nI want...\nSo that...\n\nBUSINESS RULES:\n\nACCEPTANCE CRITERIA:\n\nDATA REQUIREMENTS:\n\nDEPENDENCIES:\n\nOUT OF SCOPE:\n\nOPEN QUESTIONS:",
      templateLabel: "Copy Template",
    },
    {
      number: 3,
      title: "Write acceptance criteria QA can actually test",
      insight: "If QA cannot clearly determine pass or fail, the acceptance criterion is probably too vague.",
      visual: { steps: ["Vague requirement", "Observable behaviour", "Pass / Fail"] },
      before: "User should be able to view the trade.",
      after: [
        "Given a matched trade",
        "When the analyst opens Trade Details",
        "Then execution venue, quantity, price, and execution timestamp are displayed",
      ],
      whyItHelps: "Testable acceptance criteria reduce interpretation gaps between BA, developers, and QA.",
    },
    {
      number: 4,
      title: "Link dependencies instead of describing them",
      insight: "Relationships should be modelled, not buried inside paragraphs.",
      visual: { steps: ["Epic", "Story", "Depends on API Story", "Blocked by Environment Task"] },
      whyItHelps:
        "Linked issues are visible, searchable, and much easier to trace than narrative dependency notes.",
      whenToUse: "Cross-team, API, infrastructure, data, or upstream/downstream dependencies.",
    },
    {
      number: 5,
      title: "Separate business rules from acceptance criteria",
      insight:
        "Rules describe how the business works. Acceptance criteria describe how the system should behave.",
      compare: {
        leftLabel: "Business Rule",
        left: "Orders above £1 million require supervisory approval.",
        rightLabel: "Acceptance Criterion",
        right:
          "Given an order value above £1 million, when the trader submits the order, then the order enters Pending Approval status.",
      },
      whyItHelps: "Mixing them makes requirements harder to maintain and test.",
    },
    {
      number: 6,
      title: "Use labels like a taxonomy, not hashtags",
      insight: "Labels become useful only when the team agrees what they mean.",
      before: ["urgent", "new", "important", "change", "team1", "misc"],
      after: ["regulatory", "trade-surveillance", "market-data", "client-onboarding", "emea", "release-2026-q3"],
      whyItHelps: "Consistent labels improve filtering, dashboards, reporting, and historical analysis.",
      proTip: "If everybody invents their own labels, labels eventually become useless.",
    },
    {
      number: 7,
      title: "Create filters you will actually reuse",
      insight: "A good Jira filter turns searching into one click.",
      explanation:
        "Replace the bracketed placeholders with your own project key and field names before saving — exact JQL syntax depends on your project's custom fields.",
      whyItHelps: "A saved filter turns a recurring manual hunt into a permanent, shareable view.",
      templates: [
        {
          label: "My open stories",
          value: 'project = "[YOUR PROJECT]" AND assignee = currentUser() AND status != Done ORDER BY priority DESC',
        },
        {
          label: "Blocked BA stories",
          value: 'project = "[YOUR PROJECT]" AND status = "Blocked" AND labels = "requirements" ORDER BY updated DESC',
        },
        {
          label: "Stories missing acceptance criteria",
          value: 'project = "[YOUR PROJECT]" AND issuetype = Story AND "Acceptance Criteria" is EMPTY',
        },
        {
          label: "Items in current release",
          value: 'project = "[YOUR PROJECT]" AND fixVersion = "[CURRENT RELEASE]" ORDER BY status ASC',
        },
        {
          label: "Recently changed tickets",
          value: 'project = "[YOUR PROJECT]" AND updated >= -3d ORDER BY updated DESC',
        },
      ],
    },
    {
      number: 8,
      title: "Build a BA dashboard, not another status dashboard",
      insight: "A BA dashboard should show where thinking or decisions are stuck.",
      list: [
        "Requirements awaiting clarification",
        "Blocked stories",
        "Open dependencies",
        "Items awaiting a business decision",
        "UAT defects",
        "Stories changed during the current sprint",
      ],
      whyItHelps: 'That\'s more useful to a BA than simply seeing how many tickets are "In Progress."',
    },
    {
      number: 9,
      title: "Don't hide decisions inside comments",
      insight: "Comments record conversation. Requirements should record the resulting truth.",
      before: "Requirement changed as discussed.",
      after: [
        "Decision: Orders cancelled before acknowledgement will not generate surveillance alerts",
        "Reason: The event is not considered an executed trading action",
        "Date: 08 Aug 2026",
        "Decision owner: Business Surveillance",
        "Related requirement: REQ-142",
      ],
      whyItHelps: "Six months later, nobody wants to read 47 comments to reconstruct a decision.",
      template:
        "Decision: [what changed]\nReason: [why]\nDate: [date]\nDecision owner: [who]\nRelated requirement: [ticket/requirement ID]",
      templateLabel: "Copy Decision Template",
    },
    {
      number: 10,
      title: "Add a Definition of Ready check",
      insight: "A ticket being created does not mean a ticket is ready.",
      checklist: [
        "Business problem understood",
        "Acceptance criteria written",
        "Business rules identified",
        "Dependencies linked",
        "Data requirements understood",
        "Designs available if required",
        "Open questions resolved",
        "Test approach understood",
      ],
      whyItHelps:
        "A lightweight readiness check prevents partially understood requirements from quietly entering development.",
      template:
        "Definition of Ready:\n[ ] Business problem understood\n[ ] Acceptance criteria written\n[ ] Business rules identified\n[ ] Dependencies linked\n[ ] Data requirements understood\n[ ] Designs available if required\n[ ] Open questions resolved\n[ ] Test approach understood",
      templateLabel: "Copy Checklist",
    },
    {
      number: 11,
      title: "Use subtasks only for real pieces of work",
      insight: "Do not turn every action you take into a Jira subtask.",
      before: ["Story", "→ Discuss", "→ Analyse", "→ Email team", "→ Update Jira", "→ Check again"],
      after: ["Story", "→ Backend implementation", "→ UI implementation", "→ Data migration", "→ QA validation"],
      whyItHelps: "Subtasks are useful when they represent trackable delivery work, not a personal to-do list.",
    },
    {
      number: 12,
      title: "Build one reusable BA story template",
      insight: "Every hack in this guide eventually comes back to one thing.",
      explanation: "Start every ticket with a structure that reminds you what to think about.",
      list: [
        "Context",
        "Business Problem",
        "User Story",
        "Business Rules",
        "Acceptance Criteria",
        "Data Requirements",
        "Dependencies",
        "Out of Scope",
        "Open Questions",
        "Decisions",
      ],
      whyItHelps:
        "A single master template means every new ticket starts from the same complete structure instead of a blank page.",
      anchorLink: { label: "Jump to the full template", href: "#closing-template" },
    },
  ],
};

import type { Playbook } from "@/types/content";

const discoveryCanvas = `NEW PROJECT DISCOVERY CANVAS

1. PROJECT PURPOSE

We are improving:

For:

Because:

So that:

Why now?

What happens if we do nothing?

How will success be measured?

2. PEOPLE AND DECISIONS

Sponsor:

Business outcome owner:

Product owner:

Operational SMEs:

Technology owners:

QA / UAT owners:

Risk / Compliance / Security:

Support owner after release:

Who makes the final decision when people disagree?

3. CURRENT PROCESS

Trigger:

Main steps:

People involved:

Manual workarounds:

Waiting points:

Common failures:

4. TARGET CHANGE

What should change?

What should remain unchanged?

Expected user outcome:

Expected business outcome:

5. SYSTEMS AND DATA

Systems involved:

System of record:

Important data:

Data owners:

Integrations:

Reports / downstream consumers:

Failure and recovery behaviour:

6. SCOPE AND DELIVERY

In scope:

Out of scope:

Release boundary:

Fixed dates and reasons:

Dependencies:

Readiness conditions:

Fallback / rollback:

7. DECISIONS AND ASSUMPTIONS

Confirmed decisions:

Proposals awaiting approval:

Assumptions:

Conflicting information:

8. RISKS AND OPEN QUESTIONS

Risk or question:

Why it matters:

Owner:

Next action:

Due date:

9. FIRST 30-DAY PRIORITIES

What must I understand first?

Which journey will I trace?

Which decisions need confirmation?

Which risks need early attention?

What will I play back to the team?
`;

// Full narrative + AaravCare / global SaaS worked examples live in
// components/ba-playbooks/new-project-discovery-playbook-body.tsx (rendered
// via the customPlaybookBodies registry, not from `hacks`). This is a
// plain-text copy of that same content, used only to compute an accurate
// reading time — see the `bodyText` field doc in types/content.ts.
const bodyText = `It's your first week on a new project. You have Jira access, a 74-page requirements document and a calendar full of meetings whose titles contain words you don't understand yet. Then your manager asks: are you comfortable with the project now? You've met twelve people, opened six systems and collected seventeen documents. But you still can't confidently explain why the project exists. That's normal. The problem is rarely missing information. It is that the information arrives in pieces, and nobody tells you how they connect.

"Understand the project" is too large to be useful. Start with a smaller target. By the end of discovery, you should be able to explain why the project exists, who is affected and who decides, how the process works today, what is expected to change, which systems and data make it work, and where the risks, dependencies and unanswered questions are. That is enough to start contributing without pretending you know everything. Discovery is not about becoming the expert in ten days. It is about building the map that helps you ask better questions on day eleven.

We'll use a fictional Indian insurance company called AaravCare. Today, customers submit health-insurance claims through email. Operations teams download the documents, enter the details into a claims system and contact customers when something is missing. The project brief says: build a digital claims journey to reduce processing time. Sounds clear. It isn't. Does "digital claims journey" mean a form for uploading documents, or policy validation, fraud checks, status tracking, automated approval and hospital integration too? And does "reduce processing time" mean faster submission, review, approval or payment? A project description tells you what people want to build. It may not tell you what problem they are trying to solve.

Start with why the project exists. Before studying screens, stories or APIs, understand the reason money and people have been assigned to this work. Ask what problem we are trying to solve, who experiences that problem, what evidence tells us it is worth solving, why we are solving it now, what happens if we do nothing, and how we will know the project worked. At AaravCare, Customer Service says customers keep calling because they don't know the claim status. Operations says they spend too much time checking incomplete submissions. Finance says manual processing makes payment forecasting unreliable. Compliance says they need a better record of what was submitted, changed and approved. The project has several related problems wearing the same project name. Your job is to make those problems visible before the team treats one feature as the answer to all of them.

Write a one-sentence project purpose: we are improving [process] for [users] because [current problem], so that [measurable outcome]. For AaravCare: we are improving claim submission and initial validation for policyholders and Claims Operations because incomplete email submissions create avoidable delays, so that more claims arrive ready for assessment and customers can see what happens next. That sentence may change as you learn more. Good. Discovery should change your understanding.

Find the people behind the org chart. A stakeholder list tells you names and roles. It does not tell you how the project actually makes decisions. For each important area, identify who experiences the problem, who performs the work today, who owns the business outcome, who makes policy or control decisions, who owns the affected systems, who can block the change, who will support it after release, and who is missing from the conversation. At AaravCare, the project sponsor is the Head of Claims Transformation, but the rules for accepting a claim belong to Claims Operations, Fraud decides which submissions need additional checks, Finance owns payment controls, Technology owns the claims platform, and Customer Service handles the calls when the journey is unclear. One sponsor does not mean one decision-maker. Build a simple decision map, and if the answer is only "the business," keep asking.

Follow the work as it happens today. Documents describe the official process. People show you the real one. Ask someone who performs the work to walk you through a recent example from beginning to end, not a presentation or an ideal process, an actual case. For the AaravCare claim: the customer submits an email and attachments, Customer Service checks whether the policy number is present, Operations downloads and renames the files, an analyst enters claim details into the claims system, missing information is requested by email, fraud checks may be triggered, an assessor approves, rejects or asks for more evidence, Finance releases the payment, and the customer receives an update. Then ask where the work waits, what gets copied manually, what gets checked twice, which step depends on one person's knowledge, where people leave the official system and use email or spreadsheets, what happens when information is missing, and how the customer is informed. That spreadsheet someone calls temporary may be carrying half the process. Do not ignore it because it is missing from the architecture diagram.

Separate the current state from the promised future. New projects often mix three different things: what happens today, what somebody has proposed, and what has actually been approved. At AaravCare: "customers currently submit documents by email" is current state, "customers should upload documents through a portal" is a proposed change, "the portal must support PDF and JPEG files up to the approved size limit" is a requirement once confirmed, and "AI will check every medical document automatically" is an idea or assumption. An impressive slide is not a decision. A prototype is not necessarily approved behaviour. A line in an old document may no longer be true. For every major statement, ask: is this current behaviour, an approved requirement, a proposal or an assumption? You will prevent a surprising amount of confusion with that one question.

Draw the system and data journey. You do not need a perfect architecture diagram on day one. Start with a simple journey: who creates the information, where it enters, which systems use it, what comes out. For AaravCare: the customer enters policy and claim details into the Claims Portal, which validates policy through the Policy System, sends the submission to the Claims Platform, sends selected cases to the Fraud Service, sends approved payment instructions to the Finance System, and returns status updates to the Customer Portal. Now ask about the connections: which system owns each important field, which integrations are real-time and which are delayed, what identifier links the same claim across systems, what happens if a system does not respond, can messages arrive twice or out of order, where are validation errors stored, who reconciles mismatches, and which reports consume the data later. The screen is only where the user meets the process. The requirement often lives in what happens before and after it.

Find the decisions already made, and the ones pretending to be made. New team members often reopen settled questions because they cannot find the original decision. They also inherit assumptions that everyone treats as settled because nobody remembers questioning them. Create a decision log with five fields: decision, status, owner, reason, evidence. Useful statuses are Proposed, Approved, Rejected, Superseded and Needs confirmation. If nobody can identify who approved something, record that uncertainty. Do not quietly convert it into a fact.

Make the delivery boundary visible. A project can have a clear vision and still have an unclear release. Ask what is included in the next release, what is explicitly out of scope, what is already committed, which dates are fixed and why, what depends on another team, vendor or approval, what must be true before development can start, what would stop UAT or production release, and what work continues manually after launch. At AaravCare, "digital claims" is the vision. The first release may include only claim submission, document upload, basic policy validation, and confirmation and status tracking. Fraud automation and automatic approval may come later. That is not a failure of ambition. It is a usable delivery boundary.

You do not need to complete discovery before contributing. Use three passes across the first 30 days. Days 1-5, orient: understand why the project exists and learn its language, read the project brief, recent decisions and current backlog, meet the sponsor, product owner, operational SME, technology lead and QA lead, write your first version of the project-purpose statement, start a glossary, capture contradictions and open questions. Output: purpose statement, stakeholder map and glossary. Days 6-15, trace: follow one real journey through people, systems and data, observe the current process, walk through one normal case and one failed case, draw the process and system journey, identify data owners, integrations and manual workarounds, separate approved decisions from proposals and assumptions. Output: current-state flow, system/data map and decision log. Days 16-30, test your understanding: play your understanding back to the team, confirm the target outcome and success measures, validate scope and release boundaries, surface dependencies and delivery risks, prioritise unanswered questions, check whether QA, Operations and Support see anything missing, agree what you will investigate next. Output: validated discovery canvas, risk list and next-action plan. Thirty days is not a deadline for knowing everything. It is enough time to stop being dependent on whichever person spoke to you last.

The same map works on a completely different project. Imagine joining a global SaaS company that wants to automate employee onboarding. Why: new hires wait too long for accounts and equipment. People: HR, managers, IT, Security, Payroll, Facilities and new employees. Process: offer accepted, employee created, checks completed, access and equipment provided. Systems: HR platform, identity provider, payroll, service desk and device management. Data: legal name, location, start date, employment type, manager and access profile. Decisions: who approves privileged access, what happens when a start date changes. Boundary: does the first release create accounts, order equipment, or both. Different country, different industry, same problem: the project name is smaller than the system of work behind it.

Once you understand the basic journey, ask the less comfortable questions: which success measures could improve while the customer experience gets worse, which stakeholder benefits from this change and who gets more work, what manual activity is the solution quietly relying on, which rule exists because of regulation and which exists because "we've always done it this way," what happens to cases already in progress when the change goes live, who handles exceptions after launch, which downstream team learns about the change last, what must be monitored on day one, what is the rollback or fallback if the new journey fails, and which assumption would be most expensive if it were wrong. You will not need every question on every project. Choose the ones that can change scope, design, testing or ownership.

Five discovery mistakes to avoid. Reading everything before speaking to anyone: documents give you history, people give you context, use both. Meeting only senior stakeholders: leaders explain the intended process, the people doing the work show you where it bends. Treating access as understanding: having Jira, Confluence and system access does not mean you understand how a case moves through them, trace one real example. Hiding what you don't know: visible questions make discovery safer, silent assumptions make it look finished before it is. Turning discovery into permanent analysis: you will never remove every unknown, expose the ones that could change the next decision.

Before you say "I understand the project," check whether you can answer: why does this project exist, who experiences the problem, how does the process work today, what is expected to change, which systems and data are involved, who owns the important decisions, what is included in the next release, which assumptions are still unverified, where could the change fail, and what should you investigate next. If you cannot answer one of these, you have not failed discovery. You have found where discovery needs to go next. You don't understand a project when you've collected all its documents. You understand it when you can explain how its problem, people, process, systems and decisions connect.`;

export const newProjectDiscoveryPlaybook: Omit<Playbook, "readingTime"> = {
  slug: "new-project-discovery-playbook",
  title: "New Project Discovery Playbook",
  description: "You've joined a new project. What should you ask first?",
  summary:
    "A practical first-30-days discovery guide for Business Analysts — the questions that connect a project's problem, people, process, systems, data and decisions, worked through a fictional insurance claims project and a global onboarding example, plus a copy-paste discovery canvas.",
  category: "Business Analysis",
  tags: ["Discovery", "Stakeholders", "onboarding"],
  author: "Surya",
  date: "2026-08-13",
  audience: [
    "Business Analysts in their first weeks on a new project",
    "BAs who have documents and access but can't yet explain why the project exists",
    "Delivery leads onboarding a new team member onto an in-flight project",
    "Anyone who's been asked \"are you comfortable with the project now?\" too early",
  ],
  bodyText,
  seoTitle: "New Project Discovery Playbook for Business Analysts | BodhiProtocol",
  seoDescription:
    "A practical first-30-days new project discovery guide for Business Analysts — the questions that uncover why a project exists, who really decides, how the process works today, and which systems and data make it run.",
  closingHeading: [
    "You don't understand a project when you've collected all its documents.",
    "You understand it when you can explain how its pieces connect.",
  ],
  closingBody:
    "Problem, people, process, systems, data and decisions — thirty days is not a deadline for knowing everything. It's enough time to stop being dependent on whichever person spoke to you last.",
  closingTemplate: discoveryCanvas,
  closingTemplateName: "New Project Discovery Canvas",
  relatedPlaybookSlugs: [
    "requirement-elicitation-playbook",
    "who-owns-the-requirement",
    "impact-analysis-template",
  ],
  hacks: [
    {
      number: 1,
      title: "Why",
      insight: "Understand why the project exists before studying screens, stories or APIs.",
      whyItHelps: "A project description tells you what people want to build. It may not tell you what problem they're solving.",
    },
    {
      number: 2,
      title: "Who",
      insight: "A stakeholder list gives you names. It doesn't tell you how decisions actually get made.",
      whyItHelps: "One sponsor does not mean one decision-maker — build a decision map instead.",
    },
    {
      number: 3,
      title: "How",
      insight: "Documents describe the official process. People show you the real one.",
      whyItHelps: "The workaround someone calls \"temporary\" is often carrying half the process.",
    },
    {
      number: 4,
      title: "What",
      insight: "Separate current behaviour from a proposal, a requirement and an assumption.",
      whyItHelps: "An impressive slide is not a decision. A prototype is not approved behaviour.",
    },
    {
      number: 5,
      title: "Which",
      insight: "Trace who creates the information, where it enters, and which systems use it.",
      whyItHelps: "The screen is only where the user meets the process — the requirement often lives before and after it.",
    },
    {
      number: 6,
      title: "Where",
      insight: "Find the decisions already made, and the risks and open questions still unresolved.",
      whyItHelps: "If nobody can identify who approved something, record that uncertainty instead of quietly treating it as fact.",
    },
  ],
};

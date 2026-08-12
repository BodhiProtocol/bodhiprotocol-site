import type { Playbook } from "@/types/content";

// Full narrative + both worked examples live in
// components/ba-playbooks/business-analyst-user-story-template-body.tsx
// (rendered via the customPlaybookBodies registry, not from `hacks`). This is a
// plain-text copy of that same content, used only to compute an accurate reading
// time — see the `bodyText` field doc in types/content.ts.
const bodyText = `You open Jira. Click Create. And suddenly this tiny empty box feels like an exam. Summary. Description. Acceptance Criteria. What exactly are you supposed to put in there? A user story doesn't need to be long. It needs to make the next conversation easier. Here's a template you can actually use. You won't need every section in every story. Think of this as a toolbox, not a form.

Start with the simple version: As a [user / role], I want [capability / action], so that [business outcome / reason]. India example, UPI Payments: As a customer, I want to see why my UPI payment failed, so that I know whether to retry, use another account, or contact my bank. Capital Markets example, Trade Surveillance: As a Trade Surveillance Analyst, I want alerts to show the customer's latest risk classification, so that I can prioritise high-risk cases. Both are valid. But neither is ready to build yet.

First, look at a bad story: As a user, I want risk information, so that I can use it. It follows the format. But what does it actually tell us? Which user? What information? Where should it appear? How fresh must it be? What happens if it is unavailable? A story can look complete and still contain a lot of ambiguity. Let's fix that.

Context. Explain what happens today. UPI: customers may receive a generic message when a UPI payment fails and not understand what went wrong. Trade Surveillance: analysts currently open another system to check customer risk classification while investigating an alert.

Problem. Explain why it matters. UPI: customers may retry unnecessarily or contact support because they don't know what action to take. Trade Surveillance: analysts spend extra time switching systems and may miss relevant risk information. Context is what happens. Problem is why we care.

Expected Behaviour. Describe what should happen after the change. UPI: when a payment fails, show an understandable reason and, where appropriate, guidance on what to do next. Trade Surveillance: when an analyst opens an alert, show the latest available customer risk classification alongside the customer information. Notice what we haven't written: call API X using endpoint Y and populate column Z. That may be part of the implementation. But first describe the behaviour. Don't confuse the solution with the requirement.

Acceptance Criteria. Now make the behaviour testable, using Given, When, Then. UPI, insufficient balance: given the customer initiates a UPI payment, and the linked account has insufficient balance, when the transaction fails, then the customer should see a clear reason. UPI, bank unavailable: given the bank is temporarily unavailable, when the transaction cannot be completed, then the customer should be informed, and advised to try again later. Trade Surveillance, risk available: given customer risk information is available, when the analyst opens the alert, then the latest risk classification should be displayed. Trade Surveillance, risk unavailable: given customer risk information cannot be retrieved, when the analyst opens the alert, then show risk information unavailable, and do not present an older classification as current. Now QA knows what to test, development knows what behaviour matters, and business can challenge the rule before code exists. That's the point.

Business Rules. Some rules apply across several scenarios. Keep them visible. UPI: a failed payment must never appear successful; customer messages should use understandable language, not internal error codes. Trade Surveillance: only the latest active risk classification should be shown; expired classifications must not appear current; if no classification exists, make that clear.

Data Requirements. If behaviour depends on data, make the data visible. Trade Surveillance data: Customer ID from the surveillance alert, required, identifies customer. Risk classification from the risk system, required, latest active value. Classification date from the risk system, required, determines freshness. Risk reason from the risk system, optional, future scope. You don't need a huge mapping document for every story. But ask: what happens if the data is missing, stale, delayed, duplicated, or inconsistent? That question often exposes important requirements.

Dependencies. Ask: what has to work before this story can work? UPI: the payment platform returns a meaningful failure status; failure statuses are mapped to customer-friendly messages; the mobile app supports the new responses. Simple stories often get stuck here. Find dependencies early.

Assumptions. Write down what the team is currently treating as true. Trade Surveillance: one customer has one active risk classification; the risk system owns the classification; surveillance users can view it. Assumptions are dangerous when everyone has them but nobody writes them down. And remember: an assumption is not a decision.

Out of Scope. Make the boundary visible. UPI, out of scope: payment routing changes, bank-side processing changes, refund handling, card-payment failures. Clear scope prevents arguments later.

Open Questions. Don't hide unresolved questions in meeting notes. Put them on the story. Trade Surveillance: what happens if the risk service times out? How old can the classification be before it becomes stale? Should analysts see the classification timestamp? Who owns the stale-data decision? An open question is fine. A hidden open question isn't.

Decision Log. When an important question gets answered, preserve it. Example: show a customer-friendly message instead of the raw payment error, owned by Payments Product, because customers should not need to understand internal banking codes. Three weeks later, someone will ask why we did it this way. Now the answer isn't trapped in someone's memory.

Before you move it to ready, ask: do we know who needs this, do we understand why, is expected behaviour clear, can QA test it, are business rules visible, do we know the relevant systems and data, are dependencies and assumptions visible, is out-of-scope clear, are open questions visible, do we know who owns key decisions. If several answers are no, the story probably isn't ready. And that's okay. The goal isn't to make Jira look complete. The goal is to make sure the team understands what it is agreeing to build.

Don't just read the playbook. Use it in your next refinement session — a copy-paste template, a one-page readiness checklist, and a completed example pack are all free to download below.`;

export const businessAnalystUserStoryTemplate: Omit<Playbook, "readingTime"> = {
  slug: "business-analyst-user-story-template",
  title: "Business Analyst User Story Template",
  description:
    "Stop staring at the blank Jira ticket. A reusable toolbox for turning a vague ask into a user story your team can actually build, test and challenge.",
  summary:
    "A practical, copy-paste user story template — Context, Business Rules, Acceptance Criteria, Data Requirements, Dependencies, Assumptions and more — worked through two full examples, a UPI payment failure and a Trade Surveillance alert, plus a free template, readiness checklist and completed example pack to download.",
  category: "Requirements",
  tags: ["Requirements", "user-stories", "templates"],
  author: "Surya",
  date: "2026-08-08",
  audience: [
    "Freshers and aspiring Business Analysts writing their first template-driven story",
    "Business Analysts who want a reusable structure instead of a blank Jira box",
    "QAs and developers who need acceptance criteria they can actually test against",
    "Anyone trying to understand how real requirements work inside technology teams",
  ],
  bodyText,
  seoTitle: "Business Analyst User Story Template + Examples | BodhiProtocol",
  seoDescription:
    "A practical Business Analyst user story template with acceptance criteria, business rules, data requirements, dependencies, examples and a free readiness checklist.",
  closingHeading: [
    "A good user story isn't the requirement.",
    "It's the container for the conversation that turns a requirement into something buildable.",
  ],
  closingBody:
    "Your job as a BA isn't to fill every field. It's to make ambiguity visible before it becomes code.",
  closingTemplate: `## User Story

**As a:**
[role]

**I want:**
[capability]

**So that:**
[business outcome]

## Context

[What happens today?]

## Problem

[Why does it matter?]

## Expected Behaviour

[What should happen?]

## Acceptance Criteria

### AC1

**Given** [condition]
**When** [event/action]
**Then** [expected behaviour]

## Business Rules

* BR-01:
* BR-02:

## Data Requirements

* Data:
* Source:
* Validation:
* Fallback behaviour:

## Dependencies

*

## Assumptions

*

## Out of Scope

*

## Open Questions

*

## Decisions

* Decision:
* Owner:
* Reason:`,
  closingTemplateName: "BA User Story Template",
  relatedPlaybookSlugs: [
    "first-time-writing-a-user-story",
    "story-carried-over-four-sprints",
    "who-owns-the-requirement",
  ],
  hacks: [
    {
      number: 1,
      title: "Context",
      insight: "Explain what happens today.",
      whyItHelps: "Answers the question a reader will always ask first: what happens today?",
    },
    {
      number: 2,
      title: "Problem",
      insight: "Explain why it matters.",
      whyItHelps: "Context is what happens. Problem is why we care — the two aren't the same sentence.",
    },
    {
      number: 3,
      title: "Expected Behaviour",
      insight: "Describe what should happen after the change, not how to build it.",
      whyItHelps: "Don't confuse the solution with the requirement.",
    },
    {
      number: 4,
      title: "Acceptance Criteria",
      insight: "Given / When / Then makes the behaviour testable.",
      whyItHelps: "QA knows what to test, development knows what behaviour matters, and business can challenge the rule before code exists.",
    },
    {
      number: 5,
      title: "Business Rules",
      insight: "Some rules apply across several scenarios — keep them visible.",
      whyItHelps: "A business rule and an acceptance criterion are not the same sentence.",
    },
    {
      number: 6,
      title: "Data Requirements",
      insight: "If behaviour depends on data, make the data visible.",
      whyItHelps: "Asking what happens if data is missing, stale, delayed, duplicated or inconsistent often exposes real requirements.",
    },
    {
      number: 7,
      title: "Dependencies",
      insight: "What has to work before this story can work?",
      whyItHelps: "Simple stories often get stuck here — find dependencies early, not during delivery.",
    },
    {
      number: 8,
      title: "Assumptions",
      insight: "Write down what the team is currently treating as true.",
      whyItHelps: "An assumption is not a decision — writing it down is what makes it challengeable.",
    },
    {
      number: 9,
      title: "Out of Scope",
      insight: "Make the boundary visible.",
      whyItHelps: "Clear scope prevents arguments later.",
    },
    {
      number: 10,
      title: "Open Questions",
      insight: "Don't hide unresolved questions in meeting notes — put them on the story.",
      whyItHelps: "An open question is fine. A hidden open question isn't.",
    },
    {
      number: 11,
      title: "Decision Log",
      insight: "When an important question gets answered, preserve it.",
      whyItHelps: "Three weeks later, the answer to \"why did we do it this way?\" isn't trapped in someone's memory.",
    },
  ],
};

import type { Playbook } from "@/types/content";

const decisionChecklist = `LAST-MINUTE REQUIREMENT CHANGE
Release Decision Checklist

1. PAUSE
[ ] Said "let's assess the impact before we commit this to the release"
[ ] Did not update Jira or promise anything before that

2. UNDERSTAND THE CHANGE
[ ] Scope: who/what is affected, what exactly changed
[ ] Behaviour: success, failure, retry and exception behaviour
[ ] Timing: why now, is it mandatory for this release
[ ] Risk: what happens if we do not include it

3. IMPACT FAST
[ ] Traced Requirement -> UI -> API -> Data -> Rules -> Integrations -> Tests -> Operations
[ ] Engineering confirmed what changes
[ ] QA confirmed what must be rerun
[ ] Operations confirmed what changes tomorrow
[ ] Product confirmed what happens if deferred
[ ] Risk/Compliance confirmed optional or mandatory

4. CHECK RELEASE-READY TIME
[ ] Asked "how long until this is release-ready," not just "how long to code"
[ ] Estimate includes review, build, deployment, integration testing, regression and sign-off

5. PRESENT OPTIONS
[ ] Absorb — impact is small, understood and fully testable
[ ] Scope swap — time is fixed, traded other scope instead of inventing capacity
[ ] Flag / config — architecture already supports controlled enablement
[ ] Defer — release stability matters more than rushing the change
[ ] Do not include — safe implementation/testing cannot be demonstrated in time

6. MAKE OWNERSHIP EXPLICIT
[ ] Decision-makers were in the same conversation, working from the same facts
[ ] Accountable business/release owner made the final go/no-go call

7. BEFORE THE GREEN SIGNAL
[ ] Requirement + acceptance criteria updated
[ ] Final build produced
[ ] Impacted tests updated + executed
[ ] Critical/high defects resolved or explicitly accepted
[ ] Downstream systems/data verified
[ ] Operations + Support informed
[ ] Rollback/recovery understood
[ ] Business/Product accepts the release decision
[ ] Decision owner + any risk exception recorded

Decision record: reason -> impact -> owner -> outcome
`;

// Full narrative prose lives in
// components/ba-playbooks/release-tomorrow-requirement-changed-today-body.tsx,
// rendered via the customPlaybookBodies registry rather than from `hacks`.
// This is a plain-text mirror used only to compute an accurate reading time —
// see the `bodyText` field doc in types/content.ts.
const bodyText = `Tomorrow is release day. The build is ready. QA has finished testing. Release notes are being prepared. Then, at 4:37 PM: "We need one small requirement change before tomorrow." Everyone looks at the BA. Do you say yes? No? Postpone the release? None should be your first move. Pause. Understand the change. Make the risk visible. Because when release is tomorrow, you are no longer managing only a requirement. You are managing a release decision.

Imagine an e-commerce checkout flow scheduled for release tomorrow. The approved requirement says new customers can place an order after email and mobile verification. Today, the business adds: "We also need address verification for every new customer." Sounds small. But development and regression are complete, and Operations is ready. That "small" change could touch UI, API, customer data, the verification service, error handling, tests and support. The calendar says one day. The system doesn't care.

Someone asks: "Can you quickly update the acceptance criteria?" Don't. Not yet. Updating Jira doesn't make the system safe to release. First ask what changed, what does it touch, and what happens if we get it wrong.

Pause. Don't commit under pressure. A useful response is: "Let's quickly assess the impact before we commit this to tomorrow's release." That isn't resistance. It's responsible delivery. Urgency should increase discipline, not remove it.

Understand what actually changed. "Add address verification" isn't enough. Clarify which customers and addresses, at what point in checkout, what happens if verification fails, whether the customer can retry, whether manual review is allowed, whether it's mandatory for tomorrow, and why it was introduced now. One vague sentence can hide several business decisions. Tomorrow is a terrible day to discover them.

Impact fast: trace the shortest useful path from requirement through UI, API, data, rules, integrations, tests and operations. Ask engineering which components change, QA which scenarios must be rerun, operations whether tomorrow's process changes, product what happens if it's left out, and risk/compliance whether it's optional or mandatory. Fast doesn't mean careless. It means focused.

Check release-ready time. "We can code it in two hours" is not the same as "we can safely release it in two hours." A change may need development, review, build, deployment, integration testing, regression and sign-off. Ask how long until this is release-ready, not merely coded. A two-hour code change can become an eight-hour release change.

Present options instead of forcing a yes/no decision. Absorb it when impact is small, implementation is understood, testing can finish and risk is acceptable. Scope swap when the change matters but time is fixed — trade scope instead of pretending capacity appeared. Feature flag or configuration when the architecture already supports controlled enablement. Defer to the next release when stability matters more than rushing. Do not include it when time cannot support safe implementation and testing — that is a risk-based recommendation, not a rejection.

Communicate: get the decision-makers together. This is not a BA-only decision. Bring together business priority, technical impact, quality risk, release impact and operational impact. The BA's job is to make sure everyone is deciding from the same facts. The BA informs the decision. The accountable business/release owner makes the final go/no-go call.

Decide, and make the decision explicit. Record reason, impact, owner and outcome. "Business said it was urgent" is not a decision record.

Before the green signal, verify the requirement and acceptance criteria are updated, the final build is produced, impacted tests are updated and executed, critical/high defects are resolved or explicitly accepted, downstream systems and data are verified, operations and support know what changed, rollback is understood, business/product accepts the decision, and the decision owner and any risk exception are recorded. If you cannot explain the change, impact and decision clearly, you are probably not ready to release it.

If Compliance says a change is mandatory, the constraint changes but the need for impact analysis doesn't — the options become fix and test, delay release, or disable the affected functionality, never skip testing because it's urgent. If the CEO asks, the process stays the same — seniority changes priority, it doesn't change physics. Code still has to work, integrations still have to behave, tests still have to pass.

Last-minute changes will happen. The goal isn't to eliminate them. It is to stop urgency from turning into chaos. The closer you are to release, the more expensive assumptions become. Don't panic. Don't immediately say no. And don't silently update Jira. Understand the change. Expose the risk. Give the team options. Make the decision visible. A good BA doesn't stop change. A good BA helps the team change safely.`;

export const releaseTomorrowRequirementChangedToday: Omit<Playbook, "readingTime"> = {
  slug: "release-tomorrow-requirement-changed-today",
  title: "The Release Is Tomorrow. The Requirement Changed Today.",
  description:
    "A practical BA playbook for the moment someone asks for \"one small change\" the day before release — how to pause, size the impact and bring a real decision instead of a yes or no.",
  summary:
    "A worked release-day scenario — a checkout flow one day from release, and a late request to add address verification — showing how to pause, understand the change, trace its impact fast, check real release-ready time, present options instead of a yes/no, and make the go/no-go decision explicit.",
  category: "Business Analysis",
  tags: ["Release Management", "Impact Analysis", "Change Control", "Risk"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Step",
  bodyText,
  audience: [
    "Business Analysts asked to absorb a requirement change right before release",
    "Delivery leads and release managers weighing a late go/no-go call",
    "Product Owners and QA leads under release-day pressure",
    "Anyone who's heard \"can we just squeeze this in\" the day before go-live",
  ],
  seoTitle: "The Release Is Tomorrow. The Requirement Changed Today. — BA Playbook",
  seoDescription:
    "A practical Business Analyst framework for last-minute requirement changes before release: pause, understand, assess impact fast, check real release-ready time, present options and make the decision explicit. Free checklist included.",
  closingHeading: ["A good BA doesn't stop change.", "A good BA helps the team change safely."],
  closingBody:
    "The closer you are to release, the more expensive assumptions become. Pause, make the risk visible, present real options, and let the accountable owner make the call.",
  closingTemplate: decisionChecklist,
  closingTemplateName: "Last-Minute Requirement Change — Release Decision Checklist",
  relatedPlaybookSlugs: [
    "impact-analysis-template",
    "uat-passed-production-failed",
    "who-owns-the-requirement",
  ],
  hacks: [
    {
      number: 1,
      title: "Pause",
      insight: "Don't commit immediately.",
      explanation:
        "Say \"let's assess the impact before we commit this to the release\" instead of promising anything at 4:37 PM.",
      whyItHelps: "Urgency should increase discipline, not remove it — updating Jira doesn't make the system safe to release.",
    },
    {
      number: 2,
      title: "Understand",
      insight: "What changed, and why now?",
      explanation:
        "Clarify scope, behaviour, timing and risk. \"Add address verification\" isn't enough — one vague sentence can hide several business decisions.",
      whyItHelps: "Tomorrow is a terrible day to discover a hidden decision you didn't know you were making.",
    },
    {
      number: 3,
      title: "Impact fast",
      insight: "What systems, data, tests and teams are affected?",
      explanation:
        "Trace the shortest useful path: requirement through UI, API, data, rules, integrations, tests and operations.",
      whyItHelps: "Fast doesn't mean careless — it means focused on the people closest to the impact.",
    },
    {
      number: 4,
      title: "Effort reality",
      insight: "How long until it is release-ready, not merely coded?",
      explanation:
        "A release-ready estimate includes review, build, deployment, integration testing, regression and sign-off.",
      whyItHelps: "A two-hour code change can become an eight-hour release change once the full path is counted.",
    },
    {
      number: 5,
      title: "Options",
      insight: "Absorb, scope swap, feature flag, defer, or do not include.",
      explanation:
        "Bring choices instead of forcing a yes/no decision, each with a clear \"use when it applies\" condition.",
      whyItHelps: "A menu of options turns a panic decision into a considered trade-off the team can stand behind.",
    },
    {
      number: 6,
      title: "Communicate",
      insight: "Put the decision-makers in the same conversation.",
      explanation:
        "This is not a BA-only call — bring business priority, technical impact, quality risk and operational impact together.",
      whyItHelps: "The BA informs the decision; everyone deciding from the same facts prevents a decision made on partial information.",
    },
    {
      number: 7,
      title: "Decide",
      insight: "Record the impact, owner and outcome.",
      explanation:
        "\"Business said it was urgent\" is not a decision record — reason, impact, owner and outcome is.",
      whyItHelps: "An explicit decision record is what lets the team explain, months later, why this change went in (or didn't).",
    },
  ],
};

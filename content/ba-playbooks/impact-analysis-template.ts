import type { Playbook } from "@/types/content";

// Full narrative + both worked examples live in
// components/ba-playbooks/impact-analysis-template-body.tsx (rendered via the
// customPlaybookBodies registry, not from `hacks`). This is a plain-text copy
// of that same content, used only to compute an accurate reading time — see
// the `bodyText` field doc in types/content.ts.
const bodyText = `The requirement changed one sentence. Somehow five teams are now in the meeting. That's impact analysis. A change can look tiny in Jira and still touch processes, systems, data, users, controls and reports around it. Your job as a BA isn't to predict everything. It's to make the blast radius visible before production does.

Let's use two changes that sound simple. India, e-commerce refund: if an order is cancelled before dispatch, refund the customer instantly. Global, employee onboarding: give new employees system access automatically on their joining date. One sentence each. Plenty hiding underneath.

What is impact analysis? It asks: if we change this, what else could move? Not only which screen changes, but also which process changes, which systems and integrations are involved, does any data change, who works differently, are controls being added or bypassed, who consumes the result downstream, what could fail, what needs testing, monitoring or communication. A good impact analysis turns "this looks simple" into "here's what we checked before calling it simple."

Start with the change. Before tracing the impact, write down four things: what happens today, what should happen after the change, why is the change needed, what is explicitly out of scope. For the refund example: today, the customer cancels, a refund request is created, and the payment provider processes it later. After the change, an eligible cancellation triggers the refund immediately. That word — eligible — already gives us questions. Which orders qualify? What does "before dispatch" mean? What if the courier status is delayed? Does "instant" mean initiated instantly or credited instantly? Impact analysis often begins by discovering that one sentence isn't as settled as it sounds. Now trace it across ten areas.

The 10-Area Impact Check.

1. Business process. Understand the process before the systems. Refund today: cancellation, refund requested, refund processed, customer waits. After: cancellation, eligibility checked, refund triggered, customer notified. This could change refund eligibility, manual refund queues, customer-support handling, seller settlements, finance reconciliation. Onboarding today: HR creates employee, manager requests access, IT approves, access is created. After: HR creates employee, role is evaluated, access is created on the joining date. Now manager approvals, IT support and security controls may work differently. The requirement didn't just change a system — it changed a process.

2. Users and teams. Ask: who does something differently after this change? For the refund change it isn't only the customer — it may affect customer support, refund operations, finance, sellers, fraud teams. For onboarding it may affect new employees, HR, managers, IT support, security, application owners. For each group, check whether its work, permissions, training or communication must change. Secondary users are easy to miss — until they meet the change in production.

3. Systems and integrations. Ask which applications participate in the journey, not only which application owns the screen. The refund path might be Customer App to Order Management to Refund Service to Payment Gateway to Finance Reconciliation. Notifications, reporting and support tools may also consume the result. For every integration, ask: does the request or response change, is a new field mandatory, are existing consumers affected, what happens on timeout, can the request be retried safely, is the change backward-compatible. The requirement may never mention an API. The change can still depend on one.

4. Data. Changes often create data requirements nobody mentioned. Ask: do we need a new field, does an existing field change meaning, who creates and owns the data, who consumes it, what happens when it is late, missing or wrong. Automatic onboarding may depend on employee ID, joining date, job role, department, manager, location and employment status. The requirement says "create access automatically." The real question is: what trustworthy data tells us which access to create?

5. Business rules, controls and security. Ask: is an approval changing, could a control be bypassed, are permissions involved, is sensitive data exposed, is an audit trail required, do regulatory or retention rules apply. Imagine onboarding employees in Mumbai, London and New York. Location, employment type and role may change which systems and data they can access. A contractor should not receive privileged access simply because a job title was entered incorrectly. You might need rules such as: standard access follows the employee's approved role, privileged access always requires separate approval, contractors receive time-bound access, access cannot begin before the joining date, access is cancelled if the employee does not join. Automation doesn't remove controls — it changes where they happen.

6. Downstream, reporting and reconciliation. One of the best BA questions is: who consumes this after us? For the refund change: finance may receive refunds earlier, support may see new statuses, reporting may calculate turnaround time differently, fraud may require new alerts, sellers may see settlement adjustments sooner. Suppose Finance tracks refund requested, refund processing, refund completed. An instant refund may shorten or remove one state. Dashboards, SLA calculations and reconciliation rules could then change too. Your system can work perfectly and still break someone else's process. Don't stop at "our part works." Follow the output one step further.

7. Failure and recovery. Happy paths are easy. Failures are where impact analysis earns its keep. For the refund change, what happens if the order is cancelled but the refund fails, the refund succeeds but the notification fails, the payment gateway times out, the system retries the same request, one part succeeds and another does not? Could the customer receive two refunds? For onboarding, what if access is created but the employee's joining date is later changed, or the employee never joins? These aren't only technical questions. They define business behaviour.

8. Historical data and migration. New behaviour raises an easy-to-miss question: what happens to things already in progress? Do existing refund requests use the new flow? Should pending refunds be reprocessed? Do current employees need their access recalculated? Does a new field need to be populated for old records? Can old and new versions coexist during rollout? Sometimes the feature is simple. Moving safely from the old world to the new one isn't.

9. Performance and operational limits. "It works" is different from "it works under real load." Ask: how many requests could arrive at once, is there a response-time expectation, are there payment-provider or API rate limits, could automation create a large queue on joining day, what monitoring or alerting is needed, who handles exceptions. A refund flow that works for ten requests may behave very differently during a festival sale. An onboarding flow may face hundreds of new joiners after an acquisition. Volume is part of the requirement, even when Jira forgets to mention it.

10. Testing, release and rollback. Impact analysis gives QA the map. Testing explores the map. For onboarding, scenarios might include an employee joining today, joining next week, a joining date change, a cancelled record, a missing role or manager, a department change before joining, partial provisioning failure, privileged access requiring approval, the same event received twice. Also decide what requires regression testing, whether integration, security or performance testing is needed, whether the change can be released gradually, how we'll know it's working, what the rollback plan is, and who supports it after release. Release is not the last line of the ticket. It is part of the change.

Take this with you. Download the printable checklist, editable template and two completed examples below.

Before you say "no impact," run through business process, users and teams, systems and integrations, data, rules and controls, downstream and reconciliation, failure and recovery, historical data and migration, performance and operations, testing and release, and assumptions, dependencies and open questions. If you checked all of that and found nothing, great. Now "no impact" actually means something.

One question to take into your next meeting: who finds out about this change after our system is finished? That question often reveals a downstream system, an operations team, a report, a control, or someone nobody invited to the first meeting. Impact analysis isn't about making change look complicated. It's about finding the complexity before your users do.`;

export const impactAnalysisTemplate: Omit<Playbook, "readingTime"> = {
  slug: "impact-analysis-template",
  title: "Impact Analysis Template",
  description: "Find the blast radius before production does.",
  summary:
    "A practical 10-area impact analysis framework — business process, users, systems, data, controls, downstream, failure, migration, performance and testing — worked through an India refund change and a global onboarding change, plus a free checklist, editable template and two completed examples to download.",
  category: "Templates",
  tags: ["Requirements", "impact-analysis", "templates"],
  author: "Surya",
  date: "2026-08-13",
  audience: [
    "Freshers and aspiring Business Analysts learning to scope a change properly",
    "Business Analysts writing impact analysis for a refinement or change request",
    "QAs and developers who need to know what else a small change could touch",
    "Product teams trying to make \"no impact\" mean something before production finds out otherwise",
  ],
  bodyText,
  seoTitle: "Impact Analysis Template for Business Analysts | BodhiProtocol",
  seoDescription:
    "A practical 10-area impact analysis framework and free template for Business Analysts — business process, users, systems, data, controls, downstream effects, failure, migration, performance and testing.",
  closingHeading: ["Who finds out about this change", "after our system is finished?"],
  closingBody:
    "That question often reveals a downstream system, an Operations team, a report, a control — or someone nobody invited to the first meeting. Impact analysis isn't about making change look complicated. It's about finding the complexity before your users do.",
  relatedPlaybookSlugs: [
    "business-analyst-user-story-template",
    "acceptance-criteria-playbook",
    "front-office-middle-office-back-office",
  ],
  hacks: [
    {
      number: 1,
      title: "Business process",
      insight: "Understand the process before the systems.",
      whyItHelps: "The requirement didn't just change a system — it changed a process.",
    },
    {
      number: 2,
      title: "Users and teams",
      insight: "Who does something differently after this change?",
      whyItHelps: "Secondary users are easy to miss — until they meet the change in production.",
    },
    {
      number: 3,
      title: "Systems and integrations",
      insight: "Ask which applications participate in the journey, not only which one owns the screen.",
      whyItHelps: "The requirement may never mention an API. The change can still depend on one.",
    },
    {
      number: 4,
      title: "Data",
      insight: "Changes often create data requirements nobody mentioned.",
      whyItHelps: "\"Create access automatically\" isn't the real question — trustworthy data is.",
    },
    {
      number: 5,
      title: "Rules, controls and security",
      insight: "Is an approval changing, or could a control be bypassed?",
      whyItHelps: "Automation doesn't remove controls. It changes where they happen.",
    },
    {
      number: 6,
      title: "Downstream, reporting and reconciliation",
      insight: "Who consumes this after us?",
      whyItHelps: "Your system can work perfectly and still break someone else's process.",
    },
    {
      number: 7,
      title: "Failure and recovery",
      insight: "Happy paths are easy. Failures are where impact analysis earns its keep.",
      whyItHelps: "These aren't only technical questions. They define business behaviour.",
    },
    {
      number: 8,
      title: "Historical data and migration",
      insight: "What happens to things already in progress?",
      whyItHelps: "Sometimes the feature is simple. Moving safely from the old world to the new one isn't.",
    },
    {
      number: 9,
      title: "Performance and operational limits",
      insight: "\"It works\" is different from \"it works under real load.\"",
      whyItHelps: "Volume is part of the requirement — even when Jira forgets to mention it.",
    },
    {
      number: 10,
      title: "Testing, release and rollback",
      insight: "Impact analysis gives QA the map. Testing explores the map.",
      whyItHelps: "Release is not the last line of the ticket. It is part of the change.",
    },
    {
      number: 11,
      title: "Assumptions, dependencies and open questions",
      insight: "Write down what you're relying on and what's still unresolved.",
      whyItHelps: "An open question is fine. A hidden open question isn't.",
    },
  ],
};

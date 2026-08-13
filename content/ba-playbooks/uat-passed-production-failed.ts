import type { Playbook } from "@/types/content";

const investigationChecklist = `UAT-TO-PRODUCTION INVESTIGATION

IMPACT AND CONTAINMENT
[ ] Affected users, products, regions and channels identified
[ ] Financial, data, regulatory and operational risk assessed
[ ] Safe workaround, rollback or feature control considered

FAILING EXAMPLE
[ ] Transaction or record ID captured
[ ] User, role, channel and region recorded
[ ] Exact date and time recorded
[ ] Expected behaviour written clearly
[ ] Actual behaviour written clearly
[ ] Screenshot, response or error captured

COMPARE ENVIRONMENTS
[ ] Application version
[ ] Configuration and feature flags
[ ] Reference data and mappings
[ ] User and service permissions
[ ] API and integration versions
[ ] Test stub versus live integration
[ ] Batch jobs, cache and timing
[ ] Data shape, history and volume

TRACE THE FLOW
[ ] End-to-end transaction path mapped
[ ] First point of divergence identified
[ ] Upstream and downstream impact checked
[ ] Related transactions searched

CLASSIFY
[ ] Code defect
[ ] Requirement gap
[ ] Test coverage gap
[ ] Configuration issue
[ ] Data issue
[ ] Deployment issue

CLOSE PROPERLY
[ ] Business decision recorded
[ ] Requirement or rule updated
[ ] UAT data and regression tests updated
[ ] Production-like scenario added
[ ] Monitoring or alerting considered
[ ] Related features checked for the same assumption
`;

// Full narrative prose (including the three comparison tables) lives in
// components/ba-playbooks/uat-passed-production-failed-body.tsx, rendered via
// the customPlaybookBodies registry rather than from `hacks`. This is a
// plain-text mirror used only to compute an accurate reading time — see the
// `bodyText` field doc in types/content.ts.
const bodyText = `Monday morning. A message appears in the project group: "Customers cannot cancel some orders. This worked in UAT. What changed?" QA says: "We tested cancellation. It passed." Development says: "The same code went to production." Operations says: "Real customers are still affected." Everyone may be telling the truth. The feature can pass UAT and still fail in production, not because UAT was useless, but because production is rarely just UAT with more users. It has different data, integrations, permissions, configuration, timing and volume. Same code does not mean the same system.

An Indian e-commerce company introduces self-service order cancellation. The requirement says a customer can cancel an order until it has been dispatched. In UAT, QA tests PLACED, READY_TO_PACK and DISPATCHED. Everything passes. The feature goes live. Then a customer tries to cancel a shoe order that has not been dispatched, but the Cancel order button is missing.

UAT proved the feature behaved as expected with the data, integrations, configuration, roles and scenarios used in UAT. It did not prove production would send the same data through the same path under the same conditions. UAT tests expected behaviour in a controlled world. Production introduces the world you did not fully control. That does not automatically make this a testing failure — the investigation should begin with differences, not blame.

If the failure is causing financial loss, exposing data, blocking critical work or affecting many users, containment comes first: disable the feature, pause processing, roll back the release or provide a temporary workaround.

Step 1: preserve the failing example. Before anyone refreshes data or changes configuration, capture the order ID, customer and account type, exact time, channel, status shown to the customer, status from the warehouse system, expected and actual behaviour, and the release version. Without a specific example, every team investigates a slightly different problem.

Step 2: follow the transaction, not the opinions. The app requests order details, the order service retrieves fulfilment status, the warehouse system returns ALLOCATED, the cancellation rule checks whether that status is cancellable, ALLOCATED is not in the permitted list, the service returns canCancel false, the app hides the button. The screen behaved correctly based on the answer it received. The first meaningful difference appeared earlier: the production warehouse returned a status nobody had used in UAT. Ask where the behaviour first became different, not only where the failure became visible.

Step 3: compare UAT and production side by side in a table — order status, warehouse integration, cancellation rule, customer role, channel, feature flag and release version. This changes the conversation from whether the same code was deployed to the conditions around that code.

Step 4: check the seven places production commonly differs. Data — values that never appeared in UAT. Integrations — a stub or simulator versus the live system. Configuration and feature flags — settings that change behaviour without changing code. User roles and permissions — what a real customer or service account can see and access. Timing — batch runs, stale caches, cut-off times, time zones, concurrent updates. Volume and concurrency — queues, locking, delayed messages, duplicate events. Deployment — confirming what actually reached production versus what was included in the release.

Step 5: return to the requirement. "Cancel until dispatched" sounds clear, but the system implemented a list of statuses believed to mean not dispatched, and that list did not include ALLOCATED. Production revealed an assumption hiding inside the requirement, not a new rule.

Step 6: classify the issue correctly — code defect, requirement gap, test coverage gap, configuration issue, data issue or deployment issue. One incident can have several contributing causes; classification improves the fix instead of assigning blame to one team.

Step 7: fix the rule, the test and the environment. Add ALLOCATED to the cancellable mapping, confirm the decision with the business owners, update the documentation, add the status to UAT test data, replace the simplified stub with the complete production status list, add monitoring for unknown statuses, and retest across channels.

The same pattern appears in every industry: banking tests ACTIVE and BLOCKED accounts while production sends PENDING_REVIEW; insurance UAT has one policy per customer while production has migrated customers with overlapping policies; healthcare UAT uses current provider IDs while production still references retired ones; international e-commerce UAT tests one currency and warehouse while production adds currencies, tax rules and time zones; capital markets UAT tests clean trades in market hours while production introduces late events and asynchronous confirmations. The useful question is not who missed this, but which production condition the UAT model failed to represent.

The BA's job is to keep the investigation connected to business behaviour: turn "it is broken" into one traceable example, state expected and actual behaviour clearly, compare UAT and production conditions, identify the first point of divergence, bring the right owners together, expose missing rules and assumptions, record the decision, and make sure the requirement and regression tests are updated.

Eight questions to ask during the incident: what exact transaction failed, what did the user expect versus what happened, is the issue limited to certain users or channels, was this exact scenario tested in UAT, did UAT use the same values and integrations, where did the transaction first behave differently, is this a defect or a missing rule, and what else depends on the same rule or data value.

Before the next release, ask which production values do not exist in UAT, which integrations or settings differ, which roles and edge cases remain untested, and how the system will flag an unknown value instead of silently mishandling it. If the cancellation service had flagged ALLOCATED as an unknown status, the team could have found the gap before a customer found it.

UAT did not lie. It answered the question you asked. Production exposed the question you forgot to ask.`;

export const uatPassedProductionFailed: Omit<Playbook, "readingTime"> = {
  slug: "uat-passed-production-failed",
  title: "It Worked in UAT. Why Did It Fail in Production?",
  description:
    "A practical BA playbook for tracing why tested behaviour changes after release—and finding the first real difference.",
  summary:
    "A worked incident — an order-cancellation feature that passed UAT and failed in production — showing how to preserve the failing example, trace the transaction, compare environments and find the first real difference before assigning blame.",
  category: "UAT",
  tags: ["UAT", "Production", "root cause"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Step",
  bodyText,
  audience: [
    "Business Analysts investigating a feature that passed UAT but failed in production",
    "QA and Development teams triaging a post-release incident",
    "Delivery leads and Product Owners handling release defects",
    "Anyone who's heard \"but we tested it\" on an incident call",
  ],
  seoTitle: "It Worked in UAT. Why Did It Fail in Production?",
  seoDescription:
    "A practical Business Analyst guide to investigating why a feature passed UAT but failed in production, with a free investigation canvas.",
  closingHeading: ["UAT did not lie.", "It answered the question you asked."],
  closingBody:
    "Production exposed the question you forgot to ask. Preserve one failure. Trace the transaction. Compare the environments. Find the first difference. Return to the business rule.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "UAT-to-Production Investigation Checklist",
  relatedPlaybookSlugs: [
    "two-systems-show-different-numbers",
    "story-carried-over-four-sprints",
    "acceptance-criteria-playbook",
  ],
  hacks: [
    {
      number: 1,
      title: "Data",
      insight: "Look for values that never appeared in UAT.",
      explanation:
        "Missing fields, historical records, duplicates and unexpected formats. ALLOCATED existed in production but not in the UAT test set.",
      whyItHelps: "Most \"it worked in UAT\" incidents trace back to a real production value the test data never included.",
    },
    {
      number: 2,
      title: "Integrations",
      insight: "UAT may use a stub, simulator or simplified downstream system.",
      explanation:
        "Compare API versions, fields, mappings, authentication, timeouts and retries. A stub can return three clean statuses while the live system returns many more.",
      whyItHelps: "A passing stub proves the integration contract as understood — not the integration as it actually behaves in production.",
    },
    {
      number: 3,
      title: "Configuration and feature flags",
      insight: "The code can be identical while settings change its behaviour.",
      explanation: "Compare business-rule values, thresholds, country or product settings, feature flags and routing rules.",
      whyItHelps: "\"Same code went to production\" can still be true while the behaviour is entirely different, if a setting differs.",
    },
    {
      number: 4,
      title: "User roles and permissions",
      insight: "A feature tested with an administrator account may behave differently for a real customer.",
      explanation: "Check both what the user can see and what the service account can access.",
      whyItHelps: "Role-scoped behaviour is one of the easiest differences to miss because the UAT tester rarely has the same access as a production user.",
    },
    {
      number: 5,
      title: "Timing",
      insight: "Some failures exist only at a particular moment.",
      explanation:
        "A batch run, stale cache, cut-off time, time-zone conversion, event-order problem or concurrent update — ordinary daytime UAT rarely touches these.",
      whyItHelps: "A payment near midnight or a daylight-saving change can expose timing assumptions no UAT script ever exercised.",
    },
    {
      number: 6,
      title: "Volume and concurrency",
      insight: "One clean test transaction is not the same as thousands of customers acting together.",
      explanation: "Production may introduce queues, locking, delayed messages, duplicate events or timeouts.",
      whyItHelps: "Concurrency bugs are often invisible in UAT by construction — there's rarely enough simultaneous load to trigger them.",
    },
    {
      number: 7,
      title: "Deployment",
      insight: "\"Included in the release\" and \"active in production\" are not always the same statement.",
      explanation: "Confirm the application version, database scripts, configuration, reference data, scheduled jobs and dependent releases that actually reached production.",
      whyItHelps: "A missing reference-data update or an inactive dependent release can silently undo a feature that shipped correctly.",
    },
  ],
};

import type { Playbook } from "@/types/content";

const investigationChecklist = `PRODUCTION ISSUE INVESTIGATION CHECKLIST

LISTEN & CAPTURE
[ ] What the user was trying to do captured
[ ] Timestamp, user/reference ID and transaction/order ID recorded
[ ] Expected vs actual behaviour written down
[ ] Screenshot or error captured

COLLECT EVIDENCE
[ ] Application logs pulled
[ ] API responses captured
[ ] Correlation or trace IDs found
[ ] One failed journey followed end to end

UNDERSTAND CONTEXT
[ ] User role and permissions checked
[ ] Device, browser and app version checked
[ ] Location, network and timezone checked
[ ] Data and account state checked
[ ] Timing (peak period, batch, schedule) checked
[ ] Sequence immediately before the failure reviewed

COMPARE ENVIRONMENTS
[ ] UAT vs Production data compared
[ ] Configuration and feature flags compared
[ ] Integrations and service versions compared
[ ] Traffic, infrastructure and scheduling compared

REPLICATE SMARTER
[ ] Same data, user type and device recreated
[ ] Same configuration and integration path recreated
[ ] Same sequence and timing recreated
[ ] Smallest failing condition reproduced

ISOLATE & NARROW
[ ] One variable changed at a time
[ ] Trigger condition documented
[ ] "Fails sometimes" turned into "fails when X is true"

PROVE & FIX
[ ] Root cause explained
[ ] Original failing condition verified after the fix
[ ] Related scenarios checked
[ ] Monitoring updated to detect recurrence

CLOSE PROPERLY
[ ] Affected users or business teams informed
[ ] Learning documented
`;

// Full narrative prose lives in
// components/ba-playbooks/nobody-can-reproduce-the-production-issue-body.tsx,
// rendered via the customPlaybookBodies registry rather than from `hacks` —
// same pattern as uat-passed-production-failed. This is a plain-text mirror
// used only to compute an accurate reading time — see the `bodyText` field
// doc in types/content.ts.
const bodyText = `A user reports that payments fail randomly. Development tries it and it works. QA tries it in UAT and it works. Then comes the sentence that can quietly kill an investigation: "we can't reproduce it." That does not mean the issue doesn't exist. It means the team hasn't reproduced the conditions that create it yet — and that is where the investigation begins.

Imagine an e-commerce platform. A few customers say payments sometimes fail after they click Pay Now. No obvious pattern. QA runs twenty successful payments in UAT. Development tries locally and succeeds. Production monitoring shows no major outage. The mistake is running the same test again and again. The better question is: what was different when the failure happened? Let's follow one failed payment and find out.

Step one is listen and capture. Don't begin with "can you reproduce it again?" Start with what actually happened: what the user was trying to do, when it happened, what they expected, what happened instead, whether it happened before, whether retrying worked. Capture whatever evidence exists — timestamp, user or reference ID, transaction or order ID, error, screenshot, sequence. "Payment failed yesterday" gives a team nowhere to start; "Order 78431 failed at 14:07 after OTP verification" does. In our case the team captures order 78431, 14:07, Android, an international card, failure after OTP verification. Already "random" has become slightly less random.

Step two is collect evidence, before it disappears. Intermittent issues are easiest to investigate while the evidence still exists: application logs, API responses, correlation or trace IDs, timestamps, audit history, monitoring, request/response details where appropriate, always through approved access and masking. The goal isn't more logs — it's following one failed journey. The team traces order 78431: the payment request reached the application, passed OTP verification, and a downstream payment service rejected it. Now they know where to look next.

Step three is understand context — what was different? The same feature can behave differently depending on its surroundings: user role and permissions, device and app version, location and network, account state and amount, timing (peak periods, batch windows), and the sequence immediately before the failure. You are looking for a pattern hiding inside the word "random." Comparing successful and failed transactions, the team notices most failures involve international cards. That becomes the next hypothesis.

Step four is compare environments, not just code. "Same code, so it should behave the same" is a common but false assumption — production can differ from UAT in data, configuration, feature flags, permissions, integrations, service versions, traffic, network behaviour, schedules and infrastructure. The question is what exists in production that the test environment doesn't reproduce. Here, UAT uses a test payment provider while production routes certain international payments through another provider entirely. Same application, different path.

Step five is replicate smarter — recreate conditions, not just steps. Repeating login, select product, pay, failure may not recreate the issue. Match the surrounding conditions instead: same data, same user type, same device and app version, same configuration, same integration path, same sequence, similar timing or load where safe. The goal is the smallest set of conditions that triggers the failure, not a reckless copy of production. QA tests an international card through the same payment route with a similar payload, and the failure appears — for the first time, the team can reproduce it.

Step six is increase visibility, for when the system isn't telling you enough. Sometimes an issue can't be reproduced because the system doesn't expose enough evidence, and that absence is itself useful information. The team may need better structured logging, correlation IDs, metrics, alerts, audit events, temporary diagnostics or safer feature-level monitoring. A BA doesn't need to design the observability platform, but can ask: if this happens again, what evidence will we need to prove where it failed? That can become a requirement.

Step seven is isolate and narrow — change one thing at a time. With a hypothesis in hand, compare domestic vs international, one currency vs another, mobile vs web, existing vs new customer, one payment provider vs another, one configuration vs another — without changing five variables together. The goal is turning "it fails sometimes" into "it fails when these conditions are true." The team eventually isolates the trigger: an international card, a specific payment provider, and an address containing a special character. The failure is no longer random.

Step eight is prove and fix — don't stop at "probably." The root cause: a downstream payment service rejects certain address characters because of an encoding issue. Now the team has trigger, failure point and root cause. After the fix, verify that the original failing condition now succeeds, related scenarios still work, the fix behaves correctly under production-like conditions, and monitoring can detect recurrence where appropriate. "Developer says fixed" isn't closure. Evidence is closure.

When there's no strong hypothesis yet, look across a few broad areas for a better one: data (nulls, unexpected formats, boundary values, old or migrated records), configuration (feature flags, environment variables, thresholds, routing rules), code and logic (edge cases, race conditions, error handling, state transitions), dependencies (third-party services, timeouts, network issues, version differences), user and access (permissions, roles, entitlements, customer segments), and timing and load (peak traffic, scheduled jobs, asynchronous processing, concurrency). Don't blindly tick boxes — use these areas to generate better hypotheses.

The BA mistake to avoid: a user says it failed, the team says they tested it and it works, and both statements can be true. Don't turn the investigation into a debate about who is right. Ask what was different when it failed. Stay curious, not defensive.

Before closing the issue, confirm: can we explain the root cause, can we reproduce the trigger or prove it from evidence, has the original failing condition been verified after the fix, have related scenarios been checked, is monitoring sufficient if it happens again, have affected users or business teams been informed, and has the learning been documented? Sometimes an intermittent problem cannot be made perfectly deterministic — that's okay. Closure should be based on evidence, not exhaustion.

"Cannot reproduce" is not a root cause. It is an investigation status. If the user is facing it, the problem is real — even when your test passes. Don't keep repeating the same test and hoping the bug appears. Capture the failed journey. Compare the conditions. Find what changed. Narrow the trigger. Then prove it. A good investigation turns "random" into a pattern — and a pattern into a fix.`;

export const nobodyCanReproduceTheProductionIssue: Omit<Playbook, "readingTime"> = {
  slug: "nobody-can-reproduce-the-production-issue",
  title: "Nobody Can Reproduce the Production Issue",
  description:
    "A practical BA playbook for investigating intermittent production issues that nobody can reproduce on demand.",
  summary:
    "A worked payment-failure investigation showing how to capture the real story, preserve evidence, compare UAT and production, replicate the real conditions and isolate the trigger before closing an issue nobody can reproduce on demand.",
  category: "UAT",
  tags: ["Production", "UAT", "root cause"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Step",
  bodyText,
  audience: [
    "Business Analysts investigating intermittent or hard-to-reproduce production issues",
    "QA and Development teams triaging a \"works for us\" incident",
    "Support and Operations teams gathering evidence from affected users",
    "Anyone who's heard \"we can't reproduce it\" and needs a next step",
  ],
  seoTitle: "Nobody Can Reproduce the Production Issue",
  seoDescription:
    "A practical Business Analyst guide to investigating intermittent, hard-to-reproduce production issues — from capturing the real story to isolating the trigger, with a free investigation checklist.",
  closingHeading: ["“Cannot reproduce” is not a root cause.", "It is an investigation status."],
  closingBody:
    "If the user is facing it, the problem is real — even when your test passes. Capture the failed journey. Compare the conditions. Find what changed. Narrow the trigger. Then prove it. A good investigation turns “random” into a pattern—and a pattern into a fix.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "Production Issue Investigation Checklist",
  relatedPlaybookSlugs: [
    "uat-passed-production-failed",
    "two-systems-show-different-numbers",
    "impact-analysis-template",
  ],
  hacks: [
    {
      number: 1,
      title: "Listen & Capture",
      insight: "Get the real story, not \"can you reproduce it again?\"",
      explanation:
        "Ask what the user was trying to do, when it happened, what they expected and what happened instead. Capture timestamp, user/reference ID, transaction/order ID, error and screenshot.",
      whyItHelps: "\"Order 78431 failed at 14:07 after OTP verification\" gives the team somewhere to start. \"Payments fail randomly\" doesn't.",
    },
    {
      number: 2,
      title: "Collect Evidence",
      insight: "Preserve the failed journey before it disappears.",
      explanation:
        "Application logs, API responses, correlation or trace IDs, timestamps, audit history and monitoring — gathered through approved access and masking.",
      whyItHelps: "The goal isn't more logs. It's following one failed journey end to end.",
    },
    {
      number: 3,
      title: "Understand Context",
      insight: "Find what was different: user, device, location, data, timing, sequence.",
      explanation:
        "The same feature can behave differently depending on its surroundings. Compare successful and failed transactions to find the pattern hiding inside \"random.\"",
      whyItHelps: "Most failures aren't random — they cluster around a condition nobody has named yet.",
    },
    {
      number: 4,
      title: "Compare Environments",
      insight: "\"Same code\" doesn't mean the same system.",
      explanation:
        "Production can differ from UAT in data, configuration, feature flags, permissions, integrations, service versions, traffic and infrastructure.",
      whyItHelps: "Ask what exists in production that your test environment doesn't reproduce.",
    },
    {
      number: 5,
      title: "Replicate Smarter",
      insight: "Recreate conditions, not just steps.",
      explanation:
        "Match the same data, user type, device, configuration, integration path, sequence and timing — the smallest set of conditions that triggers the failure.",
      whyItHelps: "Repeating the user's click-by-click steps rarely recreates an intermittent issue; recreating the surrounding conditions does.",
    },
    {
      number: 6,
      title: "Increase Visibility",
      insight: "Sometimes the system isn't telling you enough.",
      explanation:
        "Better structured logging, correlation IDs, metrics, alerts, audit events or temporary diagnostics can turn an invisible failure into a traceable one.",
      whyItHelps: "\"If this happens again, what evidence will we need to prove where it failed?\" can become a requirement.",
    },
    {
      number: 7,
      title: "Isolate & Narrow",
      insight: "Change one thing at a time.",
      explanation:
        "Domestic vs international, one provider vs another, mobile vs web — narrow the hypothesis without changing five variables together.",
      whyItHelps: "Turns \"it fails sometimes\" into \"it fails when these conditions are true.\"",
    },
    {
      number: 8,
      title: "Prove & Fix",
      insight: "Don't stop at \"probably.\"",
      explanation:
        "Verify the original failing condition now succeeds, related scenarios still work, the fix holds under production-like conditions, and monitoring can detect recurrence.",
      whyItHelps: "\"Developer says fixed\" isn't closure. Evidence is closure.",
    },
  ],
};

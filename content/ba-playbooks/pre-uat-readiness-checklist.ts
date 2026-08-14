import type { Playbook } from "@/types/content";

const preUatReadinessChecklistTemplate = `BEFORE YOU SAY "START UAT"

[ ] Scope and build verified.
[ ] Cases and expected results ready.
[ ] Test data validated.
[ ] Environment stable.
[ ] Users and access working.
[ ] Integrations available.
[ ] Configuration correct.
[ ] Business testers aligned.
[ ] Defect/triage process clear.
[ ] Exit criteria agreed.
[ ] Support contacts known.

THE ONE QUESTION
What could prevent meaningful testing tomorrow? Find it today.

GOLDEN RULE
Test the right thing, with the right data, in the right conditions.`;

// Full narrative prose (including the beneficiary-verification example) lives
// in components/ba-playbooks/pre-uat-readiness-checklist-body.tsx, rendered
// via the customPlaybookBodies registry rather than from `hacks`. This is a
// plain-text mirror used only to compute an accurate reading time — see the
// `bodyText` field doc in types/content.ts.
const bodyText = `The calendar says UAT starts tomorrow. Test cases are written. Business users have blocked their calendars. Everyone says "we're ready." Monday morning arrives. The first tester logs in — their account doesn't work. Another tester discovers the test customer doesn't exist. The API points to the wrong service. A feature flag is still off. By lunchtime, nobody is testing the requirement. They're testing whether the test setup works. That's the difference between UAT scheduled and UAT ready.

User Acceptance Testing isn't another round of developer testing. It answers a business question: does this solution support the real business need well enough for us to accept it? That needs more than a working build — the right scope, scenarios, data, environment, users, integrations and configuration. If one is wrong, UAT can tell you the wrong story.

Imagine a bank is introducing a new beneficiary-verification flow. The requirement says transfers above ₹2 lakh to a new beneficiary require additional verification. Development is complete, system testing passed, UAT begins tomorrow. Before saying "go," what should the BA check?

Scope and build: confirm the requirement scope and deployed build actually match. If QA tested version 4.8 and UAT accidentally receives 4.7, every failure after that creates noise.

Test cases: good UAT scenarios represent how people actually use the system, not just the happy path. Beyond "new beneficiary, ₹3 lakh, verification appears," also test the boundary at exactly ₹2 lakh, just below the threshold at ₹1,99,999, whether verification applies to an existing beneficiary, what happens when the verification service is unavailable, a retry after a failed verification, whether the right user has permission to perform the action, and whether the transfer continues correctly afterwards. A useful question: what would make the business refuse to accept this feature?

Test data: the scenario exists, but does the data? Map each scenario to the data it requires — a customer with no prior beneficiary, an account with sufficient balance, a customer with a saved beneficiary, a test identity that triggers a failed verification, a user with a restricted role — and actually validate that data works, rather than trusting that "someone said it was loaded."

Environment: a bad environment can make a good feature look broken. For the beneficiary-verification flow, that means confirming the UAT build actually matches the release QA signed off, the verification service's UAT endpoint calls the real rules engine rather than a stub that always returns "verified," and last night's data refresh didn't wipe out the customer accounts the test cases depend on. More generally, check the correct build is deployed, the environment is accessible, the database is available, required services are running, there's no known blocking outage, test data was refreshed correctly, URLs and endpoints are correct, and no uncoordinated changes are happening during critical testing. It doesn't need to be perfect — it needs to be stable enough that failure means something, not that the ₹2 lakh transfer failed because the environment reset overnight.

Access and roles: the testers for this flow are branch relationship managers and operations staff, not developers. Never assume they had access last time. Check whether their UAT accounts can actually originate a transfer above ₹2 lakh, not just view one, whether the maker-checker workflow is configured for that amount, and whether their role includes the specific permission tied to this new step. More generally, confirm users are created, they can log in, roles and permissions are correct, they can reach dependent systems, MFA and VPN work, and segregation-of-duties rules are respected. Eight relationship managers discovering their login can't originate a transfer during the UAT call isn't testing — it's troubleshooting.

Integrations: your feature may work perfectly, but UAT usually tests a journey. For the beneficiary-verification flow, that journey looks like Transfer Initiation to Verification API to Core Banking Ledger to Fraud/Risk Screening to SMS/Notification Gateway. If the SMS gateway in UAT is a mock that never actually fires, a tester can "pass" a scenario that would leave a real customer waiting for an OTP that never arrives. Ask what other system must work for this scenario to finish, and check critical upstream and downstream dependencies before testers arrive.

Configuration: feature flags, thresholds, business rules, product configuration, reference data, routing, currencies, dates and user entitlements can quietly invalidate otherwise perfect testing. If the requirement says verification above ₹2 lakh but UAT is configured for ₹5 lakh, the code may be perfect and the test will still tell the wrong story — the same goes for a feature flag still switched off, an OTP retry limit that doesn't match production, or an NRI-account threshold nobody updated to match the new rule.

Stakeholders: technology can be ready while UAT still fails operationally. For this flow specifically, the branch operations lead, the fraud and risk owner, the release manager and the BA all need to agree, before Day 1, on what a passing scenario looks like, who raises a defect if a real ₹2 lakh transfer wrongly skips verification, and who has the authority to call a No-Go if the verification service isn't reliable enough to trust. More generally, everyone should know what's being tested, who's testing what, where results are recorded, how defects are raised, who triages them, what counts as a blocker, and who decides acceptance — plus the support path across engineering, QA, BA, environment, data and integration teams.

Don't ask if it's ready — ask what proves it. "Login tested," "build verified," "endpoint checked," "test data validated," "critical scenario executed" is evidence. "Someone confirmed it" is assurance. And agree what "UAT complete" looks like before testing starts: critical business scenarios executed, no open Severity 1 defects, agreed treatment for remaining defects, required business sign-off obtained, evidence stored, known limitations accepted.

The BA shouldn't personally become the environment engineer, test-data engineer, access administrator, QA lead and release manager. The job is to make readiness visible — coordinate, verify, expose gaps, not personally do everything.

Bring the key people together for a short readiness review, walk through scope and build, scenarios, data, environment, access, integrations, configuration, business users, support path and exit criteria, and answer one question: what could prevent meaningful testing tomorrow? Find it today.

Then decide. GO: critical prerequisites are ready, start UAT. CONDITIONAL GO: a known gap exists, but meaningful testing can proceed safely around it — document the limitation and continue. NO-GO: a prerequisite prevents meaningful testing — wrong build, unusable test data, a critical integration unavailable, testers who can't access the system. Postponing UAT by a day can be cheaper than wasting ten people's day pretending to test.

Good UAT doesn't begin because the calendar says Day 1. It begins when business users can execute meaningful scenarios and trust what the results are telling them. So before asking "are the business users ready to test?" ask: have we made it possible for them to test properly? UAT isn't ready because the test plan exists. It's ready when the business can test the right thing, with the right data, in the right conditions — and the team has evidence to prove it.`;

export const preUatReadinessChecklist: Omit<Playbook, "readingTime"> = {
  slug: "pre-uat-readiness-checklist",
  title: "What Exactly Should a BA Check Before UAT Starts?",
  description:
    "UAT scheduled isn't UAT ready. A BA field guide to the eight things worth verifying before anyone says \"Start UAT.\"",
  summary:
    "A worked example — a bank's new beneficiary-verification flow — walking through the eight things a BA should verify before UAT starts: scope and build, test cases, test data, environment, access, integrations, configuration and stakeholder readiness, ending in a GO / Conditional GO / No-Go decision and a free printable checklist.",
  category: "UAT",
  tags: ["UAT", "Readiness", "checklist"],
  author: "Surya",
  date: "2026-08-14",
  itemLabel: "Check",
  bodyText,
  audience: [
    "Business Analysts about to sign off that UAT can start",
    "QA leads and delivery managers running a pre-UAT readiness review",
    "Freshers and aspiring BAs learning what \"ready\" actually means beyond the test plan",
    "Anyone who's watched a UAT morning turn into troubleshooting instead of testing",
  ],
  seoTitle: "Pre-UAT Readiness Checklist for Business Analysts | BodhiProtocol",
  seoDescription:
    "What exactly should a BA check before UAT starts? An 8-point pre-UAT readiness framework — scope, test cases, data, environment, access, integrations, configuration and stakeholders — with a free checklist and GO / Conditional Go / No-Go decision guide.",
  closingHeading: ["Don't ask if it's ready.", "Ask what proves it is ready."],
  closingBody:
    "UAT isn't ready because the test plan exists. It's ready when the business can test the right thing, with the right data, in the right conditions — and the team has evidence to prove it.",
  closingTemplate: preUatReadinessChecklistTemplate,
  closingTemplateName: "Pre-UAT Readiness Checklist",
  relatedPlaybookSlugs: [
    "uat-passed-production-failed",
    "impact-analysis-template",
    "acceptance-criteria-playbook",
  ],
  hacks: [
    {
      number: 1,
      title: "Scope & Build",
      insight: "Confirm the requirement scope and the deployed build actually match.",
      whyItHelps: "If UAT receives the wrong build, every failure after that creates noise instead of signal.",
    },
    {
      number: 2,
      title: "Test Cases",
      insight: "Cover happy, negative, boundary, exception and end-to-end scenarios — not just the happy path.",
      whyItHelps: "The useful question is: what would make the business refuse to accept this feature?",
    },
    {
      number: 3,
      title: "Test Data",
      insight: "Map every scenario to the data it needs, then actually validate that data works.",
      whyItHelps: "The scenario existing doesn't mean the data exists — this is one of the biggest UAT killers.",
    },
    {
      number: 4,
      title: "Environment",
      insight: "Accessible, stable, correct build and endpoints, with required services available.",
      whyItHelps: "A bad environment can make a good feature look broken — it needs to be stable enough that failure means something.",
    },
    {
      number: 5,
      title: "Access & Roles",
      insight: "Never assume testers still have the access they had last time.",
      whyItHelps: "Eight business users discovering an access problem on the UAT call isn't testing — it's troubleshooting.",
    },
    {
      number: 6,
      title: "Integrations",
      insight: "UAT usually tests a journey, not just your feature — check upstream and downstream dependencies.",
      whyItHelps: "Your feature can work perfectly while the journey it depends on is not ready.",
    },
    {
      number: 7,
      title: "Configuration",
      insight: "Feature flags, thresholds, business rules and reference data can quietly invalidate perfect testing.",
      whyItHelps: "Perfect code tested against the wrong configuration still tells the wrong story.",
    },
    {
      number: 8,
      title: "Stakeholders",
      insight: "Everyone should know what's being tested, who owns what, and what counts as a blocker.",
      whyItHelps: "Technology can be ready while UAT still fails operationally.",
    },
  ],
};

import type { Playbook } from "@/types/content";

const releaseReadinessChecklist = `RELEASE READINESS CHECKLIST

[ ] Acceptance criteria are validated.
[ ] Required testing is complete.
[ ] Critical defects are resolved or accepted.
[ ] Dependencies are ready.
[ ] Required non-functional checks are complete.
[ ] Production data/configuration is ready.
[ ] Required approvals are obtained.
[ ] Deployment steps are understood.
[ ] Rollback/recovery is understood.
[ ] Monitoring and alerts are ready.
[ ] Operations/Support understand the change.
[ ] Post-go-live ownership is clear.
`;

export const storyIsDoneWhyCantWeReleaseIt: Omit<Playbook, "readingTime"> = {
  slug: "story-is-done-why-cant-we-release-it",
  title: "The Story Is Done. Why Can't We Release It?",
  description: "Jira says Done. Production says not yet. Here's the gap between the two.",
  summary:
    "An eight-gate framework — Acceptance, Testing, Dependencies, Non-functional, Data & Config, Sign-off, Deployment, Monitoring — for tracing why a story with green acceptance criteria still can't ship, worked through a beneficiary-validation release blocked by a missing certificate, plus a free one-page Release Readiness Checklist to download.",
  category: "Business Analysis",
  tags: ["Release Readiness", "Delivery", "Production"],
  author: "Surya",
  date: "2026-08-14",
  itemLabel: "Gate",
  intro: [
    "The developer has finished coding. QA has tested it. Acceptance criteria are green. Jira says DONE. So you ask: \"Great, can we release it?\" And someone replies: \"Not yet.\" Why? Because story completion and release readiness are not the same thing. A feature can work perfectly and still be unsafe or impossible to release.",
    "Imagine an insurance platform introducing a new claim-status feature: Submitted → Under Review → Approved → Rejected. Development is complete, QA passes every acceptance criterion, the demo looks perfect — but release is blocked. Production reference data isn't ready. A downstream API is still on the older version. Operations hasn't received the new process. Monitoring doesn't cover the integration. A security review is still open. The feature works. The release path doesn't.",
    "\"Done\" means something different to everyone in the room: code complete to the developer, testing passed to QA, acceptance criteria satisfied to the Product Owner, safe to deploy to Release Management, I can use it to the customer. So when someone says \"the story is done,\" ask done for whom — and ready for what? Then trace the release path through eight gates.",
  ],
  audience: [
    "Business Analysts who keep hearing \"not yet\" after Jira turns green",
    "Product Owners deciding what \"done\" actually means for a story",
    "Delivery leads tracing why a finished feature still can't ship",
    "QA and developers who want release blockers visible before go-live, not during it",
  ],
  seoTitle: "Release Readiness Checklist for Business Analysts | BodhiProtocol",
  seoDescription:
    "An eight-gate release readiness framework for Business Analysts — Acceptance, Testing, Dependencies, Non-functional, Data & Config, Sign-off, Deployment, Monitoring — with a free one-page checklist.",
  closingHeading: ["Done for the team", "is not the same as ready for the customer."],
  closingBody:
    "Jira is a workflow tool. It is not Production. A green ticket can tell you the team's work on this story is complete. It cannot always tell you customers can safely use this tomorrow. So when someone asks \"the story is Done, why can't we release it?\" — don't stare at the status. Trace the release path. Find the unmet condition. Remove the blocker early. A good BA doesn't just help a story reach Done. A good BA helps the value reach Production safely.",
  closingTemplate: releaseReadinessChecklist,
  closingTemplateName: "Release Readiness Checklist",
  download: {
    icon: "checklist",
    title: "Release Readiness Checklist — PDF",
    description: "The same eight gates on one printable page, ready to run in refinement or before go-live.",
    href: "/downloads/release-readiness-checklist.pdf",
    filename: "release-readiness-checklist.pdf",
    meta: "PDF · 1 page",
    cta: "Download the free PDF",
    analyticsEvent: "release_readiness_checklist_downloaded",
  },
  relatedPlaybookSlugs: ["uat-passed-production-failed", "requirement-changed-mid-sprint", "impact-analysis-template"],
  image: {
    src: "/images/ba-playbooks/story-is-done-why-cant-we-release-it-infographic.png",
    alt: "Infographic summarizing the release readiness framework: an example insurance claim-status feature blocked despite green acceptance criteria, five reasons release gets blocked, the eight-gate Acceptance, Testing, Dependencies, Non-functional, Data & Config, Sign-off, Deployment, Monitoring checklist, six common blocker categories (Process, Technical, Data, People, External, Risk), a nine-point closing checklist, and the takeaway that done for the team is not the same as ready for the customer.",
    width: 1024,
    height: 1536,
    caption: "The whole framework on one page — from a green Jira ticket to a traced, unblocked release.",
  },
  hacks: [
    {
      number: 1,
      title: "ACCEPTANCE — Did we build the right thing?",
      insight: "A green checkbox in Jira isn't proof. It's a claim that still needs checking.",
      list: [
        "Was the expected behaviour actually demonstrated?",
        "Are the important edge cases covered?",
        "Were business rules interpreted correctly?",
        "Has the right business owner validated the result?",
      ],
      whyItHelps: "If people still disagree about expected behaviour, the story isn't ready — no matter what the ticket status says.",
    },
    {
      number: 2,
      title: "TESTING — Have we proved enough?",
      insight: "Functional testing passing doesn't mean enough testing has happened.",
      list: [
        "Integration testing",
        "Regression testing",
        "UAT",
        "Performance testing",
        "Security testing",
        "Accessibility testing",
        "Resilience testing",
      ],
      explanation: "Not every story needs everything on this list. Ask what evidence is appropriate for the risk of this change — a button-text change and a payment-engine change shouldn't face identical gates.",
      whyItHelps: "Matching the testing depth to the actual risk is what keeps this gate fast for small changes and thorough for the ones that can't afford to be wrong.",
    },
    {
      number: 3,
      title: "DEPENDENCIES — Is everything around the story ready?",
      insight: "Your ticket can be 100% complete while the capability it delivers is only 80% ready.",
      list: [
        "Another story",
        "Another team",
        "An API",
        "A vendor",
        "Infrastructure",
        "Reference data",
        "A database change",
        "An approval",
        "A feature flag",
      ],
      whyItHelps: "Ask what has to be true outside this story for the customer journey to actually work — that question surfaces the dependency before it becomes a release-day surprise.",
    },
    {
      number: 4,
      title: "NON-FUNCTIONAL — Can it survive Production?",
      insight: "A feature can work perfectly for one tester and still fail in the real world.",
      list: [
        "Performance — what happens under real load?",
        "Security — are access and vulnerabilities addressed?",
        "Availability — what happens when a dependency fails?",
        "Auditability — can important actions be traced?",
        "Accessibility — can intended users use it?",
        "Recovery — can the team recover safely?",
      ],
      compare: {
        leftLabel: "Functional testing asks",
        left: "\"Does it work?\"",
        rightLabel: "Release readiness asks",
        right: "\"Can we operate it safely?\"",
      },
      whyItHelps: "These are two different questions with two different answers — a story can pass the first and still fail the second.",
    },
    {
      number: 5,
      title: "DATA & CONFIG — Is Production prepared?",
      insight: "Sometimes the code is fine. The environment isn't.",
      before: "The application expects PENDING_REVIEW. UAT has it. Production doesn't.",
      after: "Testing passes. Production still fails — and the code was never the problem. Production readiness was.",
      shiftLabel: "What actually broke",
      list: [
        "Configuration",
        "Feature flags",
        "Reference data",
        "Permissions",
        "Certificates / secrets",
        "Database changes",
        "Migration scripts",
        "Production data assumptions",
      ],
      whyItHelps: "Checking this gate before go-live catches the exact class of failure that no amount of extra functional testing would ever have caught.",
    },
    {
      number: 6,
      title: "SIGN-OFF — Have the right people approved?",
      insight: "Release day is the wrong time to discover an approval was never asked for.",
      list: ["Product", "Business", "Operations", "Risk", "Compliance", "Security", "Legal", "Architecture", "Release Management"],
      whyItHelps: "The BA does not need to own every approval. But the BA should know which ones affect the business outcome — before silence at the release meeting is the first sign one is missing.",
    },
    {
      number: 7,
      title: "DEPLOYMENT — Can we actually release it?",
      insight: "A good feature with a bad deployment plan is still a risky release.",
      list: [
        "What is the deployment sequence?",
        "Are scripts ready?",
        "Which dependency goes first?",
        "Is downtime required?",
        "Is a feature flag involved?",
        "Can we roll back?",
        "Is migration reversible?",
        "Who makes the go/no-go decision?",
      ],
      whyItHelps: "Every one of these questions is cheap to answer before release and expensive to answer during an incident.",
    },
    {
      number: 8,
      title: "MONITORING — What happens after go-live?",
      insight: "Release isn't the end of delivery. It's the beginning of real usage.",
      before: "The feature goes live at 10 PM. At 10:15 PM it starts failing.",
      after: "Who knows? — is not a question you want answered for the first time in production.",
      shiftLabel: "The scenario to avoid",
      list: [
        "What are we monitoring?",
        "What triggers an alert?",
        "Who receives it?",
        "What does Support need to know?",
        "Is there a runbook?",
        "Who owns issues after go-live?",
      ],
      whyItHelps: "Answering these before release turns a 10:15 PM surprise into a 10:15 PM alert with an owner already attached.",
    },
    {
      number: 9,
      title: "Trace the path, don't just report the status",
      insight: "\"The story is stuck\" creates confusion. A traced status creates action.",
      list: [
        "Acceptance — Ready",
        "Testing — Ready",
        "Dependencies — Ready",
        "Security — Ready",
        "Production configuration — Blocked: certificate missing",
      ],
      compare: {
        leftLabel: "Vague framing",
        left: "\"The story is stuck.\"",
        rightLabel: "Traced framing",
        right: "\"The feature is functionally complete. Release is blocked because the Production certificate hasn't been provisioned.\"",
      },
      whyItHelps: "A bank's beneficiary-validation feature hit exactly this: Jira said Done, functional testing passed, but release was blocked. Tracing the eight gates found the one unmet condition in fifteen minutes instead of a week of \"why isn't this live yet?\"",
    },
    {
      number: 10,
      title: "Name the blocker type, not the person to blame",
      insight: "Don't ask whose fault this is. Ask what condition for safe release is still unmet.",
      list: [
        "Process — missing approval, change gate, documentation or policy requirement",
        "Technical — environment mismatch, feature flag, defect or dependency",
        "Data — reference data, migration or data-quality concern",
        "People — approver unavailable or ownership unclear",
        "External — vendor or third-party dependency",
        "Risk — security concern, critical defect or insufficient testing",
      ],
      proTip: "During refinement, ask: \"What could stop this from reaching Production even if we build it correctly?\" That question exposes dependencies, approvals, data changes, security needs and operational requirements while they're still cheap to fix.",
      whyItHelps: "Most Done-but-not-released stories fall into one of these six buckets — naming the bucket points straight at who needs to act, instead of starting a blame conversation that doesn't move the release forward.",
    },
  ],
};

import type { Playbook } from "@/types/content";

const midSprintChangeNote = `MID-SPRINT CHANGE NOTE

CHANGE
Old behaviour:
New behaviour:
Thresholds / boundaries:
Exceptions:

WHY NOW
Regulatory / defect / new information / stakeholder preference / production risk:

BLAST RADIUS TOUCHED
[ ] Business rules   [ ] UI   [ ] API   [ ] Data
[ ] Config   [ ] Dependencies   [ ] Testing   [ ] Docs

EFFORT
What's already built:
What Dev / QA must redo:

DECISION
Option chosen: Absorb / Split / Swap / Defer / Stop & Rework
Requested by:
Assessed by:
Accepted by:

COMMUNICATED TO
[ ] Developer  [ ] QA  [ ] Product  [ ] Delivery  [ ] Ops / Support  [ ] Downstream teams`;

export const requirementChangedMidSprint: Omit<Playbook, "readingTime"> = {
  slug: "requirement-changed-mid-sprint",
  title: "The Requirement Changed Mid-Sprint. Now What?",
  description: "Don't just update Jira. Find the blast radius first.",
  summary:
    "An 8-step framework — Change, Why, Blast Radius, Effort, Options, Decision, Trace, Communicate — for handling a requirement change after a sprint has already started, worked through an Indian e-commerce verification-threshold change, plus a free checklist, editable impact note template and two completed examples to download.",
  category: "Business Analysis",
  tags: ["Requirements", "Delivery", "change-management"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Step",
  intro: [
    "The sprint is running. Development has started. QA has prepared the test cases. Then someone says: \"We need one small change.\" If you've worked on a project long enough, you know what usually comes next. The change may be small. The impact may not be.",
    "Here's the requirement. Imagine an e-commerce platform. The original requirement says: orders above ₹50,000 require additional customer verification. The BA writes the acceptance criteria. Development starts. QA prepares the scenarios. Three days into the sprint, the business says: \"Change ₹50,000 to ₹25,000.\" Then: \"And international customers should require verification regardless of order value.\" Two sentences changed. Should the BA simply update Jira? No — because the requirement changed in one place. The impact may have changed in ten.",
    "Your first question shouldn't be \"What should I change in the story?\" Ask: \"What does this change touch?\" Think of it as the blast radius: Requirement → Business Rules → UI / API / Data → Dependencies → Development → Testing → Release. The BA's job is to understand that radius before the team commits to the change.",
  ],
  audience: [
    "Business Analysts handling a requirement change after a sprint has already started",
    "Freshers and aspiring BAs learning that \"I'll update Jira\" isn't the right first move",
    "QAs and developers who need the blast radius mapped before they touch code or test cases",
    "Delivery leads and Product Owners deciding whether to absorb, split, swap, defer or stop the work",
  ],
  seoTitle: "Mid-Sprint Requirement Change Checklist for Business Analysts | BodhiProtocol",
  seoDescription:
    "An 8-step framework for handling a requirement change mid-sprint — Change, Why, Blast Radius, Effort, Options, Decision, Trace, Communicate — with a free checklist and impact note template.",
  closingHeading: ["A two-line requirement change", "can create a twenty-item delivery change."],
  closingBody:
    "Requirements changing mid-sprint isn't automatically a failure — new information appears, assumptions turn out to be wrong, regulations change. The dangerous part is treating a requirement change like a text edit. Find the blast radius. Make the decision visible. Then change the requirement.",
  closingTemplate: midSprintChangeNote,
  closingTemplateName: "Mid-Sprint Change Note",
  toolkit: {
    heading: "Free Mid-Sprint Change Toolkit",
    tagline: "The change may be small. The impact may not be.",
    description: "Get the printable checklist, editable impact note template and two completed examples.",
    compactDescription: "Download the checklist, template and completed examples in one practical toolkit.",
    zipHref: "/downloads/mid-sprint-change-toolkit.zip",
    zipFilename: "mid-sprint-change-toolkit.zip",
    analyticsPrefix: "mid_sprint_change",
    files: [
      { icon: "checklist", label: "Checklist — PDF", href: "/downloads/mid-sprint-requirement-change-checklist.pdf", filename: "mid-sprint-requirement-change-checklist.pdf" },
      { icon: "template", label: "Editable Impact Note — Markdown", href: "/downloads/mid-sprint-change-impact-note-template.md", filename: "mid-sprint-change-impact-note-template.md" },
      { icon: "examples", label: "Completed Examples — Markdown", href: "/downloads/mid-sprint-change-completed-examples.md", filename: "mid-sprint-change-completed-examples.md" },
      { icon: "examples", label: "Visual Summary — PNG", href: "/images/ba-playbooks/requirement-changed-mid-sprint-infographic.png", filename: "mid-sprint-change-visual-summary.png" },
    ],
  },
  relatedPlaybookSlugs: ["impact-analysis-template", "who-owns-the-requirement", "story-carried-over-four-sprints"],
  image: {
    src: "/images/ba-playbooks/requirement-changed-mid-sprint-infographic.png",
    alt: "Infographic summarizing the mid-sprint requirement change framework: an example verification-threshold change, the consequences of handling it well versus poorly, the eight-step Change, Why, Blast Radius, Effort, Options, Decision, Trace, Communicate playbook, the five options (Absorb, Split, Swap, Defer, Stop & Rework), a seven-point closing checklist, and the takeaway to find the blast radius and make the decision visible before changing the requirement.",
    width: 1024,
    height: 1536,
    caption: "The whole framework on one page — from “it's just one small change” to a documented decision.",
  },
  hacks: [
    {
      number: 1,
      title: "CHANGE — What exactly changed?",
      insight: "Get the new rule completely clear before you analyse anything.",
      before: "Orders above ₹50,000 require verification.",
      after: [
        "Orders above ₹25,000 require verification.",
        "International customers require verification regardless of amount.",
      ],
      shiftLabel: "Old rule → New rule",
      explanation:
        "Now the questions start. Does ₹25,000 mean above ₹25,000 or ₹25,000 and above? What happens at exactly ₹25,000? What makes someone \"international\" — nationality, billing country, shipping country, or account registration? One sentence can hide several decisions.",
      list: [
        "Does the threshold mean strictly greater than, or greater-than-or-equal?",
        "What happens at exactly the boundary value?",
        "What definition of \"international\" is the business actually using?",
      ],
      whyItHelps: "Before analysing impact, make the behaviour precise — an ambiguous rule produces an ambiguous impact analysis.",
    },
    {
      number: 2,
      title: "WHY — Why now?",
      insight: "This question changes the decision, not the requirement.",
      list: [
        "Compliance introduced a mandatory rule — delaying may not be possible.",
        "A stakeholder changed a preference — it may be safe to wait.",
        "The original requirement was wrong — existing development may already be incorrect.",
        "Production exposed a risk nobody considered.",
      ],
      explanation: "Same change. Different urgency. Ask \"why does this need to change now?\" — not to challenge the stakeholder, but to understand the constraint.",
      whyItHelps: "Urgency changes which options are even on the table in step 5.",
    },
    {
      number: 3,
      title: "BLAST RADIUS — What else moves?",
      insight: "Don't stop at the Jira story. Trace the change through the system and delivery chain.",
      visual: { steps: ["Requirement", "Business Rules", "UI / API / Data", "Dependencies", "Development", "Testing", "Release"] },
      list: [
        "Business rules — the threshold changed, and international customers now have an additional rule.",
        "UI — does the customer see a verification message, and does the wording change?",
        "API — is the threshold sent to another service? Does an API now need country information?",
        "Data — is customer country available, reliable and defined consistently?",
        "Rules / configuration — is ₹50,000 hardcoded, or is the rule configurable?",
        "Downstream systems — do Fraud, Risk, CRM, Operations or other systems consume the verification result?",
        "Testing — old scenarios may now be wrong; new boundary and exception cases are needed.",
        "Analytics and documentation — do reports, support procedures or operating guides still use the old rule?",
      ],
      whyItHelps: "\"Change ₹50,000 to ₹25,000\" isn't one change anymore once you trace it — that's impact analysis.",
    },
    {
      number: 4,
      title: "EFFORT — What's already built?",
      insight: "Don't estimate impact from the Jira ticket alone — talk to the people closest to the impact.",
      compare: {
        leftLabel: "If it's configurable",
        left: "\"It's configurable. Five-minute change.\" Great.",
        rightLabel: "If it's hardcoded in three places",
        right: "\"The threshold is used in three services and two are already complete.\" Different conversation.",
      },
      list: [
        "Ask Development how much of the original rule is already implemented.",
        "Ask QA which scenarios are already prepared or executed.",
        "Ask affected teams whether anything downstream depends on the original behaviour.",
      ],
      whyItHelps: "The same requirement change can mean five minutes or three days — and only the people building it know which.",
    },
    {
      number: 5,
      title: "OPTIONS — How should we handle it?",
      insight: "A BA adds value by bringing options, not just forwarding the change.",
      list: [
        "Absorb — the change is small, understood and safely fits the sprint. Do it now.",
        "Split — keep the original scope and create a separate story for the new behaviour. Deliver incrementally.",
        "Swap — the change matters but adds effort. Remove something else of similar effort. Protect capacity.",
        "Defer — the change is valid but not urgent enough to disturb current delivery. Move it to the next sprint.",
        "Stop & Rework — the new requirement makes current work wrong, unsafe or pointless. Stop, reassess and rework.",
      ],
      whyItHelps: "The BA may not make the final decision. But the BA should make the options and consequences visible.",
    },
    {
      number: 6,
      title: "DECISION — Who accepts the consequence?",
      insight: "Someone needs to decide — and discussion isn't ownership.",
      checklist: [
        "Who requested the change?",
        "Who assessed the impact?",
        "Who accepted the delivery consequence?",
      ],
      proTip: "A dangerous outcome is: \"We discussed it, so we assumed everyone agreed.\" Discussion isn't ownership.",
      whyItHelps: "Depending on the organisation, that decision may involve Product, Business, Engineering, QA, Delivery, Risk, Compliance or Operations — naming who made it prevents the \"who approved this?\" conversation later.",
    },
    {
      number: 7,
      title: "TRACE — Update the source of truth",
      insight: "Now update Jira. Not before.",
      checklist: [
        "Requirement — make old and new behaviour unambiguous",
        "Acceptance criteria — add thresholds, boundaries and exceptions",
        "Test cases — reflect the new behaviour",
        "Dependencies — link affected APIs, services, teams or stories",
        "Design / documentation — update anything people will rely on later",
        "Decision record — capture why the change happened and who agreed",
      ],
      whyItHelps: "You don't need a 12-page change document. You need enough history so that three months later someone can answer \"why does the system behave like this?\"",
    },
    {
      number: 8,
      title: "COMMUNICATE — Tell everyone whose work changed",
      insight: "Updating Jira doesn't mean everyone will notice.",
      before: "\"Requirement updated.\"",
      after:
        "\"Verification threshold changed from ₹50,000 to ₹25,000. International customers now require verification regardless of value. API mapping and QA scenarios are affected. The team agreed to absorb the change in this sprint.\"",
      shiftLabel: "The shift",
      explanation: "Tell the people whose work changed: Developer, QA, Product, Delivery, Operations, Support and downstream teams. Communicate the change and consequence, not merely that a ticket was updated.",
      whyItHelps: "Clarity beats assumption.",
    },
  ],
};

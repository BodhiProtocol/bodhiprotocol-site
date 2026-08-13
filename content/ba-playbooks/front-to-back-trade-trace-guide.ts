import type { Playbook } from "@/types/content";

const traceLog = `FRONT-TO-BACK TRACE LOG

Anchor ID:
Record type (trade / order / claim / ticket / other):

STAGE 1
System:
ID used here:
What arrived:
What went out:
Timestamp:
Status:
Notes / gap:

STAGE 2
System:
ID used here:
What arrived:
What went out:
Timestamp:
Status:
Notes / gap:

STAGE 3
System:
ID used here:
What arrived:
What went out:
Timestamp:
Status:
Notes / gap:

STAGE 4
System:
ID used here:
What arrived:
What went out:
Timestamp:
Status:
Notes / gap:

STAGE 5
System:
ID used here:
What arrived:
What went out:
Timestamp:
Status:
Notes / gap:

BREAK POINT
Stage where the story stopped matching:
What should have happened:
What actually happened:
Root cause type (data / definition / timing / processing / ownership):
`;

export const frontToBackTradeTraceGuide: Omit<Playbook, "readingTime"> = {
  slug: "front-to-back-trade-trace-guide",
  title: "Front-to-Back Trade Trace Guide",
  description: "Follow one ID, front to back, until the story stops matching.",
  summary:
    "A five-step trace framework — Tag, Route, Ask, Compare, Explain — for finding exactly where a trade, order, claim or ticket broke, using one Reliance trade and matching examples from e-commerce, insurance, healthcare and lending, plus a free trace log template.",
  category: "Capital Markets",
  tags: ["Investigation", "Trade Lifecycle", "root-cause"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Step",
  intro: [
    "Your manager forwards a message: \"Client says he sold his Reliance shares last week. Money's still not in his account. Can you find out what happened?\" You open three systems. Front Office shows the trade as done. Operations shows nothing flagged. Custody shows settlement pending. Everyone's technically right, and the client is still waiting.",
    "Swap \"trade\" for order, claim, ticket or patient visit, and you'll hit the exact same wall on any project — banking, e-commerce, insurance, healthcare, it doesn't matter. A record moves through five or six systems on its way from start to finish, something happens along the way, and every dashboard still says \"fine.\"",
    "The fix isn't asking who broke it. It's asking where, in that journey, the story stopped matching. That's a trace, and it fits into one word you can actually remember under pressure: TRACE — Tag, Route, Ask, Compare, Explain. Five steps, run in order, on almost any record with an ID attached to it.",
  ],
  audience: [
    "Freshers and BAs asked to investigate a broken trade, order or claim for the first time",
    "QAs and developers trying to isolate which stage in a pipeline actually failed",
    "Business Analysts doing root-cause or impact investigation across banking, e-commerce, insurance or healthcare systems",
    "Anyone handed an ID and told \"just find out what happened\"",
  ],
  seoTitle: "Front-to-Back Trade Trace Guide | BodhiProtocol",
  seoDescription:
    "A five-step trace framework — Tag, Route, Ask, Compare, Explain — for finding exactly where a trade, order, claim or ticket broke, with a free trace log template.",
  closingHeading: ["Don't ask who broke it.", "Ask where the story stopped matching."],
  closingBody:
    "Tag the ID, route the journey, ask what came in and went out at each stop, compare the data instead of the status, and name the exact point where the story stopped matching. That's the whole method — on a trade, an order, a claim or a ticket.",
  closingTemplate: traceLog,
  closingTemplateName: "Front-to-Back Trace Log",
  toolkit: {
    heading: "Free Front-to-Back Trace Toolkit",
    tagline: "Five steps. One page. Every industry.",
    description: "Get the printable TRACE checklist, editable trace log template and two completed examples.",
    compactDescription: "Download the checklist, template and completed examples in one practical toolkit.",
    zipHref: "/downloads/front-to-back-trace-toolkit.zip",
    zipFilename: "front-to-back-trace-toolkit.zip",
    analyticsPrefix: "front_to_back_trace",
    files: [
      { icon: "checklist", label: "Checklist — PDF", href: "/downloads/front-to-back-trace-checklist.pdf", filename: "front-to-back-trace-checklist.pdf" },
      { icon: "template", label: "Editable Trace Log — Markdown", href: "/downloads/front-to-back-trace-log-template.md", filename: "front-to-back-trace-log-template.md" },
      { icon: "examples", label: "Completed Examples — Markdown", href: "/downloads/front-to-back-trace-completed-example.md", filename: "front-to-back-trace-completed-example.md" },
    ],
  },
  relatedPlaybookSlugs: [
    "two-systems-show-different-numbers",
    "front-office-middle-office-back-office",
    "uat-passed-production-failed",
  ],
  hacks: [
    {
      number: 1,
      title: "T — Tag it: find the one ID that survives the whole journey",
      insight: "Before you open a single system, find the ID that ties every stage of this record together.",
      explanation:
        "A trade carries an order ID, then one or more execution IDs, then a trade ID, then a settlement reference. An e-commerce order carries an order number, a payment reference, a shipment tracking number. An insurance claim carries a claim number that outlives several internal case IDs. Systems don't always call it the same thing, and one ID upstream can turn into several downstream — one order split into three shipments, one parent order matched to several partial executions.",
      list: [
        "What is this record called in each system it passes through?",
        "Does one ID map to exactly one record downstream, or can it split (partial fills, split shipments) or merge (batched claims)?",
      ],
      whyItHelps: "Without a fixed anchor, you end up chasing four different reference numbers and calling it four different problems.",
    },
    {
      number: 2,
      title: "R — Route it: map the journey front to back",
      insight: "Before blaming a system, draw the stages the record actually passes through.",
      visual: { steps: ["Intake", "Processing", "Validation / Control", "Confirmation", "Completion"] },
      explanation:
        "The stage names change by industry, the shape doesn't. A brokerage like Zerodha or a global bank both run a trade through Order, Execution, Enrichment, Confirmation, Settlement. Flipkart and Amazon both run an order through Cart, Payment, Fulfilment, Shipping, Invoice. LIC and an insurer like Allstate both run a claim through Intake, Adjudication, Approval, Payment. A hospital chain like Apollo and a US health system both run a patient episode through Appointment, Encounter, Billing, Insurance Claim, Reimbursement. And a lender, from an Indian NBFC to a US bank, runs a loan through Application, Underwriting, Disbursal, Repayment Schedule. Different industries, same five-stage shape.",
      whyItHelps: "Once the journey is on paper, \"where did it break\" becomes a specific box to check, not a vague argument between teams.",
    },
    {
      number: 3,
      title: "A — Ask at each stop: what came in, and what went out?",
      insight: "At every stage, ask two separate questions, not one.",
      explanation:
        "Go stage by stage using the route you just mapped. At Execution, ask what came in (the order) and what went out (one or more fills). At Enrichment, ask what came in (the fill) and what went out (a fully-tagged trade with account, currency and settlement instruction attached). Don't skip a stage because it \"probably worked\" — the ones people skip are usually where the gap is.",
      list: [
        "What did this stage receive?",
        "What did this stage produce — and does it match what the next stage actually received?",
      ],
      whyItHelps: "Most breaks live in the gap between two stages, not inside either one — a status update that never fired, a field that didn't carry over, a batch job that quietly skipped a record.",
      whenToUse: "Use this the moment a status flag says \"complete\" but the person downstream says otherwise.",
    },
    {
      number: 4,
      title: "C — Compare the data, not just the status",
      insight: "A green status and a correct outcome are not the same thing.",
      before: "Settlement status: COMPLETE.",
      after: "Settlement status: COMPLETE — but the settlement instruction points to a closed account, so nothing actually moved.",
      explanation:
        "The same pattern shows up everywhere. An e-commerce order can show \"Delivered\" while the courier's own scan log shows the package still in transit. An insurance claim can show \"Payment Processed\" while the payment file rejected at the bank. A support ticket can show \"Resolved\" while the customer never received a reply. The status field is what the system was told to display. The record underneath it is what actually happened — and they can quietly disagree.",
      whyItHelps: "Status flags tell you what the system believes happened. The underlying record tells you what actually happened. Trust the second one.",
      proTip: "Pull the actual record at each stage instead of relying on a dashboard that summarises it. Summaries are exactly where these gaps hide.",
    },
    {
      number: 5,
      title: "E — Explain the drop-off point",
      insight: "The stage where what-went-in stops matching what-came-out is your break point — not the whole answer, but exactly where to dig.",
      explanation:
        "Back to the client's Reliance shares. Tag: the trade ID from the order links cleanly to one execution and one settlement reference — no split, no merge. Route: Order, Execution, Enrichment, Confirmation, Settlement. Ask and Compare, stage by stage: the trade was correctly executed and correctly confirmed. But the record Enrichment produced carries a settlement instruction for an account the client closed two months earlier — which is exactly why Settlement has been stuck on \"pending\" ever since. That's the drop-off point: not a Front Office problem, not a Custody problem, one enrichment record with a stale account number.",
      whyItHelps:
        "\"Somewhere between Front Office and Settlement\" isn't a finding. \"Trade left Middle Office correctly enriched, but the settlement instruction Back Office received points to a closed account\" is one someone can act on today.",
    },
    {
      number: 6,
      title: "Mistakes that stall a trace",
      insight: "The same handful of habits slow down almost every investigation.",
      list: [
        "Jumping to \"it's a technical bug\" before walking the record stage by stage",
        "Trusting a status flag over the actual underlying record",
        "Tracing forward only — sometimes the break happened upstream of where the symptom showed up",
        "Chasing a different ID at each stage instead of mapping them to one anchor first",
        "Treating one broken record as an isolated case without checking whether a whole batch is affected",
        "Not writing down what you found at each stop, and losing the trail after an interruption",
      ],
      whyItHelps: "Each of these can turn a 20-minute trace into a two-day argument.",
    },
    {
      number: 7,
      title: "Questions to keep in your pocket",
      insight: "These work whether you're tracing a trade, an order, a claim or a support ticket.",
      checklist: [
        "What's the anchor ID at this stage, and does it map cleanly to the previous stage's ID?",
        "What did this stage receive, exactly?",
        "What did this stage send onward, exactly?",
        "Is there a timestamp here, and does the sequence of timestamps make sense end to end?",
        "Who owns this stage, and what's the escalation path if it's stuck?",
        "Could this stage fail silently — no error, just wrong or missing data?",
        "Is this one broken record, or does the same gap show up in others from the same batch or day?",
      ],
      whyItHelps: "Asking these in order gets you to the drop-off point faster than asking \"what happened\" and waiting for someone to volunteer an answer.",
    },
  ],
};

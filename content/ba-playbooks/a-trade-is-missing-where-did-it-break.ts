import type { Playbook } from "@/types/content";

const investigationChecklist = `MISSING TRADE INVESTIGATION CHECKLIST

TRADE IDENTITY
[ ] Trade date, instrument, venue, side, quantity confirmed
[ ] Order ID and execution ID(s) captured

IDENTIFIER MAPPING
[ ] Order -> execution -> trade -> clearing -> settlement IDs linked
[ ] Cross-reference confirmed across every system

QUANTITY RECONCILIATION
[ ] Ordered vs executed vs booked vs settled quantities compared
[ ] Gap quantity identified and isolated

LAST PROVEN SUCCESS
[ ] Last stage with confirmed evidence identified
[ ] Evidence type recorded (report, acknowledgement, timestamp)

FIRST FAILED HANDOFF
[ ] Next expected record checked and named
[ ] Missing, rejected or held record identified

ROOT CAUSE
[ ] Rejection reason or error message captured
[ ] Cause classified: data, mapping, configuration, timing

REPAIR
[ ] Fix applied - correction, replay or mapping update
[ ] Duplicate risk checked before any replay

OWNER
[ ] Business and technical owner named
[ ] Ownership confirmed, not assumed

PREVENTION
[ ] Validation or monitoring added at the break point
[ ] Related trades checked for the same gap

CLOSURE EVIDENCE
[ ] Downstream processing verified end to end
[ ] Business decision recorded, not just "fixed"
`;

// Full narrative walkthrough (including the identity card, handoff table and
// 8-checkpoint trace) lives in
// components/ba-playbooks/a-trade-is-missing-where-did-it-break-body.tsx,
// rendered via the customPlaybookBodies registry rather than from `hacks`.
// This is a plain-text mirror used only to compute an accurate reading time
// — see the `bodyText` field doc in types/content.ts.
const bodyText = `Front Office says the trade was executed. Operations says they never received it. OMS shows FILLED. Settlement shows nothing. Nobody has proved where the trade travelled, or where it stopped. Don't ask only "where is the trade?" Ask "what is the last system that can prove it had the trade?"

A trade may be not created, not captured, rejected, held in an exception queue, or sitting somewhere else under another ID, state or business date. "Missing trade" is a symptom, not a diagnosis.

An institutional client buys 10,000 Reliance Industries shares on NSE. It executes in two fills: EXE-78421 for 6,000 shares, EXE-78422 for 4,000 shares. OMS says FILLED, 10,000 shares. Operations can find only 6,000. Where are the other 4,000?

Before opening ten systems, freeze the trade's identity: trade date, instrument, venue, side, quantity, order ID, execution IDs, account. IDs change as the trade moves — order ID to execution ID to trade ID to clearing reference to settlement instruction. You are not tracing one ID, you are tracing one economic event through changing IDs.

The investigation map: Order, Execution, Booking, Enrichment, Allocation and Confirmation, Clearing, Settlement, Reconciliation. At every handoff ask whether the sender produced the event, whether the receiver accepted or rejected it, and whether the expected business record got created.

Checkpoint 1: did it actually execute? Both EXE-78421 and EXE-78422 show as executed for their full quantities — all 10,000 shares executed. The break happened after execution.

Checkpoint 2: did every execution become a trade? EXE-78421 became TRD-99031. EXE-78422 produced no trade at all. The problem is smaller now: EXE-78422 executed but never became the expected booked trade.

Checkpoint 3: was it rejected? EXE-78421 had valid account mapping. EXE-78422 did not, and was rejected with ACCOUNT_MAPPING_NOT_FOUND. Front Office sees 10,000 executed. Operations sees 6,000 booked. Both are correct — they're looking at different lifecycle stages. The break: EXE-78422 executed successfully but failed booking because account enrichment failed.

The mental model: last proven success, then the handoff, then the first failed record, then the root cause. For this trade: last proven success is execution completed; the handoff is execution to booking; the first failed record is the booked trade missing for EXE-78422; the root cause is the account mapping rejection.

If the break isn't at booking, keep moving through the remaining checkpoints. Allocation and confirmation: did the booked trade become the correct downstream obligations? Clearing: are you looking for the original trade, or what it became? Settlement instruction: what tells cash and securities where to move? Settlement: instruction sent does not mean settled — what proves cash and securities actually moved? Many cash-equity transactions in India and the US use T+1, though exceptions exist, and India also has optional T+0 for eligible equity-cash transactions — use the trade and market rules, not habit, to confirm the expected settlement date. Reconciliation: is the trade actually incomplete, or is this view incomplete?

Build one handoff table instead of investigating through dozens of messages: stage, ID or reference, status, evidence, result. It shows the last success at execution, the first break at booking, and the cause at enrichment — no guessing.

Seven rules worth remembering: freeze the scope so everyone investigates the same trade; trace events, not screenshots; find the last proven point, then inspect the next handoff; reconcile quantities across the full path from ordered to settled; expect IDs to change and build the cross-reference map; check the unhappy path — where rejects go, who owns them, whether replay can create duplicates; and finish with ownership, documenting failure, cause, impact, repair, owner and prevention.

Ask better questions. Not "which team owns the trade" but "who owns the first failed handoff." Not "did the interface work" but "was the event sent, received and converted into the expected trade." Not "can you resend it" but "how do we know replay will not create a duplicate."

The market changes — Reliance on NSE or Microsoft in the US — but the questions don't: executed, booked, cleared, instructed, settled. Carry the questions across, not the assumptions.

Leave behind the incident logic, not just today's repair: the incident (EXE-78422 executed but failed booking because account enrichment could not resolve ACCT-IND-204), the impact (4,000 shares missing from downstream processing), the repair (correct the mapping, safely replay the execution, verify downstream processing), and the prevention (pre-booking validation, an alert to the exception owner, and monitoring executed quantity versus booked quantity). Repair fixes today's trade. Prevention improves tomorrow's system.

A missing trade is not solved by searching harder in one system. It is solved by finding the first broken handoff between systems.`;

export const aTradeIsMissingWhereDidItBreak: Omit<Playbook, "readingTime"> = {
  slug: "a-trade-is-missing-where-did-it-break",
  title: "A Trade Is Missing. Where Did It Break?",
  description: "A front-to-back investigation playbook for tracing a missing trade across systems.",
  summary:
    "One Reliance trade, split into two executions, where OMS shows 10,000 filled and Operations can only find 6,000 — an 8-checkpoint walkthrough for finding the first broken handoff between systems instead of searching harder in one.",
  category: "Capital Markets",
  tags: ["Capital Markets", "Trade Lifecycle", "Investigation", "Reconciliation"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Checkpoint",
  bodyText,
  audience: [
    "Freshers, BAs, QAs and developers learning capital markets",
    "Business Analysts investigating a missing or broken trade",
    "QAs and developers tracing an event across system boundaries",
    "Anyone who's heard \"must be a downstream issue\" with no proof behind it",
  ],
  seoTitle: "A Trade Is Missing. Where Did It Break? | BA Playbook",
  seoDescription:
    "A practical Business Analyst guide to investigating a missing trade — tracing order, execution, booking, enrichment, clearing and settlement to find the first broken handoff, with a free investigation checklist.",
  closingHeading: ["A missing trade isn't solved by searching harder in one system.", "It's solved by finding the first broken handoff between systems."],
  closingBody:
    "Map the IDs. Reconcile the quantities. Prove each handoff. Find the last successful record. Then find the first failed one.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "Missing Trade Investigation Checklist",
  relatedPlaybookSlugs: [
    "front-office-middle-office-back-office",
    "two-systems-show-different-numbers",
    "uat-passed-production-failed",
  ],
  hacks: [
    {
      number: 1,
      title: "Execution",
      insight: "Did it actually execute?",
      explanation: "Execution ID, quantity, price, timestamp, venue reference — don't rely on FILLED alone.",
      whyItHelps: "Confirms whether the break happened before or after execution.",
    },
    {
      number: 2,
      title: "Booking",
      insight: "Did every execution become a trade?",
      explanation: "Compare execution quantity against what actually got booked.",
      whyItHelps: "Narrows a vague \"missing trade\" down to one specific execution that never became a record.",
    },
    {
      number: 3,
      title: "Enrichment",
      insight: "Was it rejected, and why?",
      explanation: "Account mapping, reference data and validation errors live here.",
      whyItHelps: "This is usually where the root cause actually is — not where the trade was first noticed missing.",
    },
    {
      number: 4,
      title: "Allocation & Confirmation",
      insight: "Did the booked trade become the correct downstream obligations?",
      whyItHelps: "Checks allocations, destination accounts, confirmations and economics before assuming clearing is the problem.",
    },
    {
      number: 5,
      title: "Clearing",
      insight: "Are you looking for the original trade, or what it became?",
      whyItHelps: "Accepted, rejected, pending status, clearing reference and netting outcome all change the trade's shape.",
    },
    {
      number: 6,
      title: "Settlement instruction",
      insight: "What tells cash and securities where to move?",
      whyItHelps: "Cash account, securities account, settlement location, date, quantity and instruction status — the plan before the movement.",
    },
    {
      number: 7,
      title: "Settlement",
      insight: "What proves cash and securities actually moved?",
      explanation: "Instruction sent does not mean settled.",
      whyItHelps: "Securities movement, cash movement, settled quantity, fail status and timestamp are the actual proof.",
    },
    {
      number: 8,
      title: "Reconciliation",
      insight: "Is the trade incomplete, or is this view incomplete?",
      whyItHelps: "Position, cash ledger, reporting load, business date and cancel/rebook history can all explain an apparent gap that isn't one.",
    },
  ],
};

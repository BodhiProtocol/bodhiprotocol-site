import type { Playbook } from "@/types/content";

const investigationChecklist = `DATA MISMATCH INVESTIGATION CHECKLIST

[ ] Same metric
[ ] Same business definition
[ ] Same date
[ ] Same timezone
[ ] Same population
[ ] Same filters
[ ] Same status
[ ] Same source
[ ] Same identifiers
[ ] Duplicate check done
[ ] Missing-record check done
[ ] Small sample reconciled
[ ] Root cause classified
[ ] Business decision recorded
`;

export const twoSystemsShowDifferentNumbers: Omit<Playbook, "readingTime"> = {
  slug: "two-systems-show-different-numbers",
  title: "Two Systems Show Different Numbers",
  description: "A practical BA guide to investigating data mismatches.",
  summary:
    "A 14-step investigation sequence for the moment two systems disagree — confirming the metric, population, timing and definitions before anyone decides which number is \"wrong.\"",
  category: "Business Analysis",
  tags: ["Data", "reconciliation", "investigation"],
  author: "Surya",
  date: "2026-08-08",
  itemLabel: "Step",
  intro: [
    "System A: 1,248 trades. System B: 1,231 trades. Someone drops both screenshots into Teams and asks: \"which one is wrong?\"",
    "Maybe neither. Different numbers often come from different definitions, timing, populations, filters or processing states — not from either system being broken.",
    "The first job isn't finding the wrong number. The first job is making sure you're actually comparing the same thing.",
  ],
  audience: [
    "Business Analysts investigating data discrepancies",
    "BAs supporting reconciliation or control functions",
    "Anyone handed \"which number is right\" with no other context",
    "Product Owners triaging a data quality ticket",
  ],
  seoTitle: "How to Investigate Data Mismatches Between Systems",
  seoDescription:
    "A step-by-step BA guide to investigating why two systems show different numbers — confirming the metric, population, timing and definitions before assuming either system is wrong.",
  closingHeading: ["Neither number was \"wrong.\"", "They were never counting the same thing."],
  closingBody:
    "Most data mismatches resolve into a one-sentence answer once someone traces a handful of records instead of arguing about the totals. The totals are a symptom. The definition, timing or status gap underneath them is the actual finding.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "Data Mismatch Investigation Checklist",
  relatedPlaybookSlugs: [
    "front-to-back-trade-trace-guide",
    "front-office-middle-office-back-office",
    "impact-analysis-template",
  ],
  hacks: [
    {
      number: 1,
      title: "Confirm the metric",
      insight: "\"Trades\" alone is not a shared definition yet.",
      list: ["Trade?", "Order?", "Execution?", "Booking?", "Gross or net?"],
      whyItHelps: "Two teams can both be right and still disagree, if one is counting orders and the other is counting executions.",
    },
    {
      number: 2,
      title: "Confirm the time window",
      insight: "The same day can mean three different things to three different systems.",
      list: ["Business date, or calendar date?", "Which timezone?", "What's the cut-off?", "What time does the batch actually run?"],
      whyItHelps: "A trade booked at 11:58pm can land in \"today\" or \"tomorrow\" depending on which of these four answers a system uses.",
    },
    {
      number: 3,
      title: "Confirm the population",
      insight: "Before comparing counts, confirm both sides are counting the same slice of the world.",
      list: ["Market?", "Region?", "Client?", "Product?", "Venue?", "Status?"],
      whyItHelps: "One system scoped to EMEA and one scoped globally will never match, and neither is malfunctioning.",
    },
    {
      number: 4,
      title: "Confirm the source",
      insight: "Not every number comes from the same place, even when the screen looks the same.",
      list: ["Live database?", "API?", "Scheduled report?", "Cache?", "Warehouse?"],
      explanation: "A cached report lagging the live database by design isn't a bug. It's worth knowing before anyone spends an afternoon chasing it as one.",
      whyItHelps: "The source tells you how fresh the number is allowed to be — which sometimes fully explains the gap on its own.",
    },
    {
      number: 5,
      title: "Compare definitions, not just counts",
      insight: "The two systems can both be correct and still never agree.",
      compare: {
        leftLabel: "System A",
        left: "Counts an amended trade as one trade — the latest version only.",
        rightLabel: "System B",
        right: "Counts every trade version separately, including amendments.",
      },
      whyItHelps: "Both may be behaving exactly as designed. The mismatch is a definition gap, not a defect in either one.",
    },
    {
      number: 6,
      title: "Compare processing states",
      insight: "A count taken mid-pipeline will never match a count taken at the end of it.",
      visual: { steps: ["Received", "Validated", "Booked", "Matched", "Settled", "Rejected"] },
      whyItHelps: "If System A counts anything past \"Received\" and System B only counts \"Settled,\" the gap is explained before you look at a single row.",
    },
    {
      number: 7,
      title: "Check the filters",
      insight: "Somebody, at some point, probably applied a filter and forgot about it.",
      list: ["A UI filter left switched on", "Report defaults nobody remembers setting", "SQL WHERE conditions baked into the query", "Statuses excluded by default"],
      whyItHelps: "This single step resolves more mismatches than any of the others, and it's the easiest one to skip because it feels too simple to be the answer.",
    },
    {
      number: 8,
      title: "Check for duplicates",
      insight: "Sometimes the higher number is the wrong one, not the lower one.",
      whyItHelps: "A retried request, a re-run batch, or a join that fans out unexpectedly can all quietly inflate a count.",
    },
    {
      number: 9,
      title: "Check for missing records",
      insight: "And sometimes it's the lower number that's actually incomplete.",
      whyItHelps: "A failed load, a filter that silently drops nulls, or a join that drops unmatched rows can all quietly shrink one.",
    },
    {
      number: 10,
      title: "Compare identifiers",
      insight: "Matching on the wrong key can look exactly like a data mismatch.",
      list: ["Trade ID", "Order ID", "Transaction ID", "External ID"],
      whyItHelps: "If System A keys off an internal trade ID and System B keys off an external reference, records that genuinely match will look unmatched until the mapping is fixed.",
    },
    {
      number: 11,
      title: "Take a small sample before you touch the whole population",
      insight: "Do not start with all 100,000 rows.",
      whyItHelps: "Pick 5 to 10 individual mismatches and trace each one by hand. The pattern that explains all of them is usually visible after the third or fourth.",
      proTip: "If the same explanation accounts for your first five mismatches, it's very likely the explanation for the rest too — confirm it before assuming otherwise.",
    },
    {
      number: 12,
      title: "Sort what you find into reconciliation buckets",
      insight: "Not every mismatch is the same kind of mismatch. Separate them before explaining them.",
      visual: { steps: ["Only in A", "Only in B", "In both, values differ", "In both, match"] },
      whyItHelps: "\"Only in A\" points at a missing-record problem. \"In both, values differ\" points at a definition or timing problem. They need different investigations, not one shared explanation.",
    },
    {
      number: 13,
      title: "Classify the root cause",
      insight: "Every mismatch traces back to one of a small number of causes.",
      list: ["Data — something's missing or duplicated", "Definition — the two sides mean different things", "Timing — the two sides were measured at different moments", "Processing — the two sides are at different pipeline stages", "Reporting — the report layer, not the underlying data, is wrong", "Requirement — nobody actually specified which of these was correct"],
      whyItHelps: "Naming the category is most of the fix. \"It's a timing issue\" tells everyone what kind of conversation happens next.",
    },
    {
      number: 14,
      title: "Document the actual cause, not just that it's resolved",
      insight: "\"Fixed\" is not a finding. It's the absence of one.",
      before: "Data mismatch fixed.",
      after: "System B excludes trades in PENDING_ALLOCATION status while System A includes them. Business decision: System A's definition is correct; System B's report filter has been updated to match.",
      whyItHelps: "The next person who hits a similar mismatch — and there will be a next person — needs the actual cause, not a status update.",
    },
  ],
};

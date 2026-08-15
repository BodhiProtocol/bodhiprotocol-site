import type { Playbook } from "@/types/content";

const investigationChecklist = `MISSING DATA / BATCH INVESTIGATION CHECKLIST

Batch / job name:
Expected record count:
Actual record count:
Gap:

CHECKPOINT COUNTS
Source:
Extract:
Transform:
Validate:
Load:
Report:

First checkpoint where expected ≠ actual:
Root cause type (source / selection / transformation / validation / load / consumption):

[ ] Root cause identified and explained
[ ] Counts reconcile at every checkpoint
[ ] Rejected or skipped records are understood
[ ] Missing records are restored or accounted for
[ ] Downstream output is verified
[ ] Monitoring or reconciliation controls added where needed
[ ] Stakeholders understand what happened
[ ] The learning is documented
`;

export const batchRanSuccessfullyDataMissing: Omit<Playbook, "readingTime"> = {
  slug: "batch-ran-successfully-data-missing",
  title: "The Batch Ran Successfully. So Why Is the Data Missing?",
  description: "A green status proves the job finished. It doesn't prove the business outcome was correct.",
  summary:
    "A seven-checkpoint reconciliation method — Source, Extract, Transform, Validate, Load, Reconcile, Consume — for finding exactly where a \"successful\" batch quietly dropped records, worked through a bank trade-capture batch missing 2,000 trades, plus a free investigation checklist.",
  category: "Business Analysis",
  tags: ["Data", "reconciliation", "batch processing"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Checkpoint",
  intro: [
    "It's 8:30 AM. Operations opens the daily report. Yesterday: 48,216 records. Today: 46,193 records. More than 2,000 records are missing. Someone checks the overnight batch. Status: SUCCESS. The developer says the job completed successfully. Operations asks where the data is. Both can be right — a successful job proves the process finished. It does not prove the business outcome was correct.",
    "Picture a bank processing yesterday's trades overnight: Trade Source → Extract → Transform → Validate → Load → Reconcile → Report. The batch normally handles about 50,000 trades. Today the scheduler is green — no obvious technical failure — but the report is missing 2,000 trades. Don't start by staring at the final report. Follow the data.",
    "The fix isn't arguing about whether the batch \"worked.\" It's tracing the record count through every stage until you find the exact checkpoint where expected stops matching actual. That's what turns \"some data is missing\" into \"2,000 expected records disappeared between Transform and Validate\" — a problem someone can actually go fix.",
  ],
  audience: [
    "Business Analysts and Ops teams investigating a batch that reports SUCCESS but is missing data",
    "BAs supporting reconciliation, data quality or control functions",
    "QAs and developers trying to isolate which pipeline stage actually dropped records",
    "Anyone who's had to explain \"the job is green\" to someone holding the wrong number",
  ],
  seoTitle: "The Batch Ran Successfully — So Why Is the Data Missing? | BodhiProtocol",
  seoDescription:
    "A step-by-step BA guide to investigating missing data after a successful batch run — tracing counts through Source, Extract, Transform, Validate, Load, Reconcile and Consume to find the first gap.",
  closingHeading: ["A green status proves the process finished.", "It doesn't prove the business outcome was correct."],
  closingBody:
    "Next time a batch reports SUCCESS but the numbers don't add up, don't stop at the scheduler. Trace the count through Source, Extract, Transform, Validate, Load, Reconcile and Consume, and find the first checkpoint where expected stops matching actual. That's where the investigation actually starts — and reconciling counts at every checkpoint is how you make sure it doesn't happen quietly again.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "Missing Data / Batch Investigation Checklist",
  toolkit: {
    heading: "Free Batch Investigation Toolkit",
    tagline: "Seven checkpoints. One reconciliation. Every batch.",
    description: "Get the printable checklist, editable investigation template and two completed examples.",
    compactDescription: "Download the checklist, template and completed examples in one practical toolkit.",
    zipHref: "/downloads/batch-investigation-toolkit.zip",
    zipFilename: "batch-investigation-toolkit.zip",
    analyticsPrefix: "batch_investigation",
    files: [
      { icon: "checklist", label: "Checklist — PDF", href: "/downloads/batch-investigation-checklist.pdf", filename: "batch-investigation-checklist.pdf" },
      { icon: "template", label: "Investigation Template — Markdown", href: "/downloads/batch-investigation-template.md", filename: "batch-investigation-template.md" },
      { icon: "examples", label: "Completed Examples — Markdown", href: "/downloads/batch-investigation-completed-examples.md", filename: "batch-investigation-completed-examples.md" },
    ],
  },
  relatedPlaybookSlugs: ["two-systems-show-different-numbers", "front-to-back-trade-trace-guide", "impact-analysis-template"],
  image: {
    src: "/images/ba-playbooks/batch-ran-successfully-data-missing-infographic.png",
    alt: "Infographic summarizing the missing-data batch investigation framework: the golden rule to trust the data, follow the flow and prove the outcome; five common causes (bad or missing source data, filter or criteria issues, transformation logic issues, load or partial-load issues, and validation gaps); the seven-stage data flow from Source through Extract, Transform, Validate, Load, Reconcile to Consume; six common root-cause categories (data, filters, logic, load, validation, environment); an eight-point checklist to run before closing the issue; and the takeaway that a good BA validates the business outcome, not just the job status.",
    width: 1024,
    height: 1536,
    caption: "The whole framework on one page — from a green scheduler to a proven business outcome.",
  },
  hacks: [
    {
      number: 1,
      title: "SOURCE — Did the data exist?",
      insight: "Before blaming the batch, check whether the source ever had the missing records to begin with.",
      list: [
        "How many records were expected?",
        "How many were actually available?",
        "Did every source system deliver?",
        "Did anything arrive late?",
        "Were records incomplete, duplicated or malformed?",
        "Was the extraction window correct?",
      ],
      explanation:
        "If the source contained only 48,000 records, the problem may be upstream, before your pipeline ever touched the data. If the source had 50,000 but only 48,000 were extracted, you've already narrowed the problem to something inside your own process.",
      whyItHelps: "Counts turn \"some data is missing\" into \"2,000 expected records disappeared between Source and Extract\" — a much easier thing to investigate.",
    },
    {
      number: 2,
      title: "EXTRACT — Did we select everything we should?",
      insight: "A batch can run successfully while selecting the wrong population entirely.",
      list: [
        "The query says trade_date = yesterday, but some trades arrived after midnight.",
        "A filter excludes a newly introduced status.",
        "Extraction uses created_date while the business expects trade_date.",
      ],
      explanation: "The key question is: what selection criteria were actually used? Then compare Expected → Selected → Rejected.",
      whyItHelps: "A green extract can still be incomplete — the job succeeded at running the wrong query.",
    },
    {
      number: 3,
      title: "TRANSFORM — Did business logic remove records?",
      insight: "This is where data gets mapped, enriched, joined, aggregated, converted, deduplicated and classified — and where records quietly leave the population.",
      before: "50,000 entered transformation.",
      after: "48,200 left transformation.",
      shiftLabel: "The 1,800-record gap",
      list: [
        "A join requires reference data that doesn't exist for a new product.",
        "An unmapped currency drops records.",
        "Deduplication removes valid trades, not just duplicate ones.",
      ],
      whyItHelps: "Don't just ask whether transformation succeeded. Ask what rule caused these specific records to leave the expected population.",
    },
    {
      number: 4,
      title: "VALIDATE — Did something fail quietly?",
      insight: "Most pipelines validate before loading — but what happens when a record fails validation matters as much as the validation itself.",
      list: ["Account exists?", "Mandatory fields populated?", "Currency valid?", "Status allowed?", "Reference data available?"],
      explanation:
        "Does the entire batch stop on a failure, or does it reject the record and continue? A job can show SUCCESS while thousands of records sit in a rejection table, an error queue, an exception file or a dead-letter queue.",
      whyItHelps: "Don't ask only whether validation ran. Ask how many records passed, failed and were skipped.",
    },
    {
      number: 5,
      title: "LOAD — Did everything actually land?",
      insight: "Records passing validation is not the same as records reaching the target.",
      visual: { steps: ["Input", "Inserted", "Updated", "Rejected", "Committed"] },
      list: ["Constraint failures", "Duplicate-key errors", "Permission issues", "Storage problems", "Transaction rollbacks", "Partial commits"],
      whyItHelps: "\"Load completed\" is not enough on its own — you need the numbers at every one of these five states.",
    },
    {
      number: 6,
      title: "RECONCILE — Find the first gap",
      insight: "This is usually the fastest way to locate the issue, and it's often skipped in favour of guessing.",
      explanation:
        "Take the bank's overnight batch: Source 50,000, Extracted 50,000, Transformed 48,200, Validated 48,200, Loaded 48,200, Reported 48,200. The first gap appears during transformation — a new instrument type was introduced yesterday, the transformation joins every trade to a reference-data table, and that new instrument type has no reference mapping. The join drops those records. The batch still completes. Technically SUCCESS. Business outcome: 2,000 trades missing.",
      whyItHelps: "Without reconciliation, a team can spend hours checking the scheduler, the database and the report. With it, the rule is simple: find the first checkpoint where expected ≠ actual. That's usually where the investigation should begin.",
      proTip: "You can now explain the incident precisely: new instrument → missing reference mapping → join drops records → downstream population incomplete. That's far more useful than \"batch issue.\"",
    },
    {
      number: 7,
      title: "CONSUME — Is the data missing, or just invisible?",
      insight: "Sometimes the data reached the target just fine. The user simply can't see it.",
      list: [
        "Report filters are wrong",
        "The dashboard cache is stale",
        "Reporting dates differ from processing dates",
        "Permissions hide records",
        "The downstream extract hasn't refreshed",
        "The report reads a different table or view",
      ],
      whyItHelps: "\"Data missing from the pipeline\" and \"data missing from what the user sees\" are different problems that need different fixes.",
    },
    {
      number: 8,
      title: "What does SUCCESS actually mean?",
      insight: "This is the question that often changes the entire investigation.",
      compare: {
        leftLabel: "Technical SUCCESS",
        left: "Process started → no fatal exception → process ended.",
        rightLabel: "Business SUCCESS",
        right: "All expected records processed → exceptions identified → totals reconciled → downstream data available.",
      },
      whyItHelps: "The developer and Operations aren't disagreeing about facts — they're using different definitions of the same word. One of the BA's jobs is turning technical success into measurable business success. If SUCCESS can mean the first definition while an important outcome is wrong, the success criteria itself is incomplete.",
    },
    {
      number: 9,
      title: "Turn the incident into a better requirement",
      insight: "Fixing the issue is only half the job. Ask how this gets detected automatically tomorrow.",
      list: [
        "Source-vs-target reconciliation",
        "Rejected-record counts",
        "Control totals",
        "Tolerance thresholds",
        "Missing-data alerts",
        "Exception monitoring",
      ],
      explanation: "For example: \"Alert Operations if loaded record count differs from extracted count by more than 0.5%.\"",
      whyItHelps: "You didn't just help fix yesterday's problem. You reduced the chance of tomorrow's problem going unnoticed.",
      anchorLink: { label: "Use the closing checklist before you close the issue", href: "#closing-template" },
    },
  ],
};

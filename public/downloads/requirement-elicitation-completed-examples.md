# Requirement Elicitation — Completed Example Pack

Two worked discovery conversations, using the Requirement Elicitation Question Bank exactly as a Business Analyst would run it — starting from a stated request and finding the real requirement underneath.

---

# Example 1 — "We need an export button"

## Problem

- **What problem is this actually solving?** Finance manually re-keys reconciliation data from the trade dashboard into a spreadsheet every morning.
- **What happens if we do nothing?** Finance keeps spending 45 minutes a day on manual re-entry, with occasional transcription errors.

## Current state

- **What happens today?** A Finance analyst opens the dashboard, reads values off the screen, and types them into a reconciliation spreadsheet.
- **Who performs this today?** One Finance analyst, every business morning.
- **Is there a workaround already in use?** Yes — the analyst has been doing this by hand for over a year; nobody had formally asked for a better way.

## Users

- **Who asked for this?** The Finance team lead, on behalf of the analyst who does the manual work.
- **Who will actually use it day to day?** The same analyst.

## Trigger

A scheduled event — the analyst starts this process every morning at roughly 8:00 AM, once the overnight batch has completed.

## Process (happy path)

Dashboard shows reconciled trade data → analyst reviews it → analyst transfers relevant rows into the reconciliation spreadsheet → spreadsheet is used for the day's reconciliation sign-off.

## Business rules

Only trades in RECONCILED status should be included — trades still pending reconciliation are deliberately left out of the spreadsheet.

## Exceptions

- What happens if the overnight batch hasn't finished by 8:00 AM? — Analyst currently waits and checks again; this needs to remain true regardless of the eventual solution.
- What happens if a trade's reconciliation status changes after export? — Out of scope for a first version; the export is a point-in-time snapshot.

## Data

The data already exists on the dashboard — same source, same fields. No new data required.

## Dependencies

None beyond the existing dashboard and its data source.

## Success

Reconciliation prep time drops from 45 minutes to under 5 minutes, and the manual transcription errors (roughly one per week) stop entirely.

## What this turned into

Not an export button. The real requirement was: automatically deliver the RECONCILED-status trade data to Finance's spreadsheet format every morning by 7:45 AM, before the analyst even opens their laptop — a scheduled CSV export to a shared drive, not a manual click each day. The export button was one possible answer; a scheduled feed turned out to be the better one, because it removed the task entirely instead of just making it faster.

---

# Example 2 — "Can we add a notes field?"

## Problem

- **What problem is this actually solving?** Underwriters want to record why they approved or rejected a borderline loan application, but there's currently nowhere to capture that reasoning.
- **What happens if we do nothing?** Reasoning stays in underwriters' memory or in side emails, and audits can't reconstruct why a borderline decision was made.

## Current state

- **What happens today?** Underwriters approve or reject applications with just a status change — no structured place to explain a judgment call.
- **Is there a workaround already in use?** Some underwriters paste a comment into an unrelated "internal notes" field meant for something else, so the information exists but isn't reliably findable.

## Users

- **Who asked for this?** A Compliance lead, prompted by a recent audit finding.
- **Who will actually use it day to day?** Underwriters, when writing it. Compliance and Risk, when reading it back during an audit or dispute.

## Trigger

A user action — specifically, the moment an underwriter changes an application's status to Approved or Rejected on a borderline case.

## Business rules

- The reasoning field is mandatory only when the application is borderline (defined as a credit score within 20 points of the cutoff) — not for every application, to avoid adding friction to routine approvals.
- Once submitted, the reasoning cannot be edited, only appended to — to preserve an audit trail.

## Exceptions

- What if an underwriter tries to approve a borderline application without entering reasoning? — The status change should be blocked until the field is completed.
- What if the application isn't borderline? — No reasoning is required; the field doesn't even appear, to avoid slowing down clear-cut cases.

## Data

The reasoning text itself, timestamp, underwriter ID, and a link to the specific application and decision it explains.

## Dependencies

Needs the existing credit-score-cutoff logic to determine whether an application counts as "borderline" — that logic already exists elsewhere in the underwriting engine and just needs to be surfaced to this feature.

## Security

Only underwriters, Risk and Compliance should be able to read this field — not customer-facing support staff, since it may contain judgment calls not meant for customer communication.

## Success

100% of borderline decisions have a recorded reason, verifiable in the next compliance audit — versus the current state, where reasoning exists for maybe a third of borderline cases, informally.

## What this turned into

Not a generic "notes field." The real requirement was a mandatory, audit-locked reasoning capture that only appears for borderline decisions specifically — narrower and more useful than a free-text box available everywhere, which would likely have gone unused outside the cases Compliance actually cared about.

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

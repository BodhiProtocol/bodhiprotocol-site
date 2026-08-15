# Batch Investigation — Completed Example Pack

Two worked investigations, using the Missing Data / Batch Investigation Checklist exactly as a Business Analyst would fill it in after a batch reports SUCCESS but the numbers don't add up.

---

# Example 1 — Banking: 2,000 trades missing after an overnight batch

## The batch

- **Batch / job name:** Overnight Trade Capture Batch
- **Expected record count:** 50,000
- **Actual record count:** 48,200
- **Gap:** 1,800 trades

## Checkpoint counts

| Checkpoint | Count | Notes |
| --- | --- | --- |
| Source | 50,000 | All source systems delivered on time |
| Extract | 50,000 | Extraction window and query confirmed correct |
| Transform | 48,200 | **Gap appears here — see below** |
| Validate | 48,200 | Nothing further dropped |
| Load | 48,200 | Everything that reached Validate landed |
| Report | 48,200 | Matches Load exactly |

- **First checkpoint where expected ≠ actual:** Transform
- **Root cause type:** Transformation

## Root cause

A new instrument type was introduced yesterday. The transformation stage joins every trade to a reference-data table to enrich it with settlement details, and that new instrument type has no reference mapping yet. The join silently drops any trade it can't match, so those 1,800 trades never reach Validate. The batch still completes — technically SUCCESS — but 1,800 trades are missing from the business outcome.

## Before you close the issue

- [x] Root cause identified and explained
- [x] Counts reconcile at every checkpoint
- [x] Rejected or skipped records are understood
- [x] Missing records are restored or accounted for — reprocessed once the reference mapping was added
- [x] Downstream output is verified
- [x] Monitoring or reconciliation controls added where needed — new alert: notify Operations if loaded count differs from extracted count by more than 0.5%
- [x] Stakeholders understand what happened
- [x] The learning is documented

## Technical SUCCESS vs. Business SUCCESS

- **Technical SUCCESS:** Process started → no fatal exception → process ended.
- **Business SUCCESS:** All expected records processed → exceptions identified → totals reconciled → downstream data available. This batch achieved the first, not the second, until the reference mapping was fixed.

---

# Example 2 — E-commerce: Daily order feed short by 340 rows

## The batch

- **Batch / job name:** Daily Order Extract to Warehouse
- **Expected record count:** 12,940
- **Actual record count:** 12,600
- **Gap:** 340 orders

## Checkpoint counts

| Checkpoint | Count | Notes |
| --- | --- | --- |
| Source | 12,940 | Order Management System had all 12,940 orders |
| Extract | 12,600 | **Gap appears here — see below** |
| Transform | 12,600 | Nothing further dropped |
| Validate | 12,600 | All 12,600 passed validation |
| Load | 12,600 | Matches Validate exactly |
| Report | 12,600 | Matches Load exactly |

- **First checkpoint where expected ≠ actual:** Extract
- **Root cause type:** Selection

## Root cause

The extraction query filters on `order_date = yesterday`, but 340 orders placed between 11:45pm and midnight were recorded with a `created_timestamp` for yesterday and an `order_date` field that rolled to today due to a timezone conversion difference between the storefront (IST) and the warehouse feed (UTC). The extract technically ran successfully — it selected exactly what the query asked for. It just asked for the wrong population.

## Before you close the issue

- [x] Root cause identified and explained
- [x] Counts reconcile at every checkpoint
- [x] Rejected or skipped records are understood — none rejected; they were simply not selected
- [x] Missing records are restored or accounted for — included in the next day's run with a one-time backfill for the missed 340
- [x] Downstream output is verified
- [x] Monitoring or reconciliation controls added where needed — extract query updated to use `created_timestamp` converted to IST, matching business expectations
- [x] Stakeholders understand what happened
- [x] The learning is documented

## Technical SUCCESS vs. Business SUCCESS

- **Technical SUCCESS:** The extract ran, matched its query exactly, and completed without error.
- **Business SUCCESS:** Every order placed "yesterday" in the business's own timezone should have been included. The query's definition of "yesterday" and the business's definition were never the same thing until the timezone conversion was fixed.

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

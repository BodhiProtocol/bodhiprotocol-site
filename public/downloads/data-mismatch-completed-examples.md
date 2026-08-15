# Data Mismatch Investigation — Completed Example Pack

Two worked investigations, using the Data Mismatch Investigation Template exactly as a Business Analyst would fill it in when two systems disagree.

---

# Example 1 — Capital markets: 1,248 vs. 1,231 trades

## The mismatch

- **System A shows:** 1,248 trades
- **System B shows:** 1,231 trades
- **Who raised it, and when:** Operations, during morning reconciliation

## Confirm you're comparing the same thing

- **Metric:** Both sides say "trades," but System A counts every trade version including amendments, while System B counts only the latest version of each trade.
- **Time window:** Both use business date in the same timezone — not the issue here.
- **Population:** Both scoped to the same desk and product type — not the issue.
- **Source:** System A reads from the live trade capture database; System B reads from a nightly warehouse snapshot — both are current as of this morning's cut-off, so not the issue.
- **Definition differences:** This is the actual gap — see root cause below.
- **Processing state:** Both count trades at BOOKED status or later — not the issue.

## Rule out the easy explanations

- **Filters checked:** No unexpected filters found on either side.
- **Duplicate check done:** System A's higher count isn't duplication — each row is a genuinely distinct trade version.
- **Missing-record check done:** System B isn't missing records — it's deliberately collapsing amended trades to their latest version.
- **Identifiers compared:** Both key off the same trade ID, so mapping isn't the issue.

## Sample before you scale

| Record | Only in A | Only in B | In both, values differ | In both, match |
| --- | --- | --- | --- | --- |
| TRD-40021 (amended twice) | 2 extra rows (original + 1st amendment) |  |  |  |
| TRD-40055 (amended once) | 1 extra row (original) |  |  |  |
| TRD-40102 (no amendments) |  |  |  | ✓ |
| TRD-40118 (amended once) | 1 extra row (original) |  |  |  |

The pattern: every "extra" row in System A traces to a trade that was later amended. Confirmed on the first four samples — no need to trace all 17.

## Root cause

- **Category:** Definition
- **Explanation:** System A counts every trade version — original plus each amendment — as a separate "trade." System B counts only the current, latest version per trade. Both systems are behaving exactly as designed; they simply define "a trade" differently when amendments are involved.
- **Business decision recorded:** System B's definition (latest version only) is the one Operations actually wants for reconciliation purposes. System A's report has been updated to de-duplicate to the latest version per trade ID before displaying its count, so both dashboards now agree.

## Checklist

- [x] Same metric — confirmed different after investigation, now aligned
- [x] Same business definition — this was the actual root cause
- [x] Same date
- [x] Same timezone
- [x] Same population
- [x] Same filters
- [x] Same status
- [x] Same source
- [x] Same identifiers
- [x] Duplicate check done
- [x] Missing-record check done
- [x] Small sample reconciled
- [x] Root cause classified
- [x] Business decision recorded

---

# Example 2 — Retail: Warehouse system shows 2,140 units, e-commerce platform shows 2,095

## The mismatch

- **System A shows:** 2,140 units in stock (Warehouse Management System)
- **System B shows:** 2,095 units in stock (E-commerce platform, customer-facing)
- **Who raised it, and when:** A merchandiser noticed the gap while reviewing a low-stock alert

## Confirm you're comparing the same thing

- **Metric:** Both say "units in stock" for the same SKU.
- **Time window:** Warehouse system is real-time; e-commerce platform syncs stock levels every 15 minutes — a timing gap is possible but too small to explain 45 units on its own.
- **Population:** Same SKU, same warehouse — confirmed.
- **Source:** Warehouse system reads live inventory; e-commerce platform reads its own cached copy, refreshed on the 15-minute sync — worth checking whether the last sync actually ran.
- **Definition differences:** Warehouse system counts all physical units on shelf. E-commerce platform is supposed to show sellable stock — units minus anything reserved for pending orders not yet shipped.
- **Processing state:** This is the actual gap — see root cause below.

## Rule out the easy explanations

- **Filters checked:** No filter issue found.
- **Duplicate check done:** Not applicable to a stock-count comparison.
- **Missing-record check done:** Not applicable.
- **Identifiers compared:** Same SKU ID on both sides — confirmed via a spot check.

## Sample before you scale

Pulled the 45-unit gap directly: 45 units are attached to orders placed in the last 20 minutes that have been confirmed and reserved in the Warehouse Management System but hadn't yet reached the e-commerce platform's next 15-minute sync cycle.

## Root cause

- **Category:** Timing, compounded by a definition gap
- **Explanation:** The Warehouse system's 2,140 is physical units on shelf, correctly excluding nothing. The e-commerce platform's 2,095 should represent 2,140 minus reserved units — but at the moment of comparison, the platform's cached figure was mid-sync, reflecting reservations from 15 minutes ago rather than right now. The two numbers were never meant to match exactly at any given instant; they're supposed to converge within one sync cycle.
- **Business decision recorded:** This is expected behaviour, not a defect — but the 15-minute sync window was wider than merchandisers realized. Sync frequency increased to every 5 minutes, and a "last synced at [time]" label was added to the customer-facing stock display so nobody mistakes a sync lag for a data error again.

## Checklist

- [x] Same metric
- [ ] Same business definition — deliberately different (physical vs. sellable), and that's correct
- [x] Same date
- [x] Same timezone
- [x] Same population
- [x] Same filters
- [x] Same status
- [x] Same source (understood — one live, one cached, by design)
- [x] Same identifiers
- [x] Duplicate check done
- [x] Missing-record check done
- [x] Small sample reconciled
- [x] Root cause classified
- [x] Business decision recorded

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

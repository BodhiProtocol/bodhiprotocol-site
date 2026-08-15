# Data Mismatch Investigation Template

An editable worksheet for the moment two systems disagree — confirm you're comparing the same thing before deciding which number is "wrong." See [Two Systems Show Different Numbers](https://bodhiprotocol.com/ba-playbooks/two-systems-show-different-numbers) for the full 14-step method this template is built from.

## The mismatch

- **System A shows:**
- **System B shows:**
- **Who raised it, and when:**

## Confirm you're comparing the same thing

- **Metric** (trade / order / execution / booking, gross or net):
- **Time window** (business date vs. calendar date, timezone, cut-off):
- **Population** (market, region, client, product, venue, status):
- **Source** (live database, API, scheduled report, cache, warehouse):
- **Definition differences** (does each system count the same event the same way?):
- **Processing state** (received / validated / booked / matched / settled / rejected — same stage on both sides?):

## Rule out the easy explanations

- **Filters checked** (UI filter, report default, SQL WHERE condition, excluded statuses):
- **Duplicate check done** — could the higher number be inflated?
- **Missing-record check done** — could the lower number be incomplete?
- **Identifiers compared** (trade ID, order ID, transaction ID, external ID — same key on both sides?):

## Sample before you scale

Trace 5–10 individual mismatches by hand. Record what you find:

| Record | Only in A | Only in B | In both, values differ | In both, match |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

## Root cause

- **Category** (data / definition / timing / processing / reporting / requirement):
- **Explanation** (specific — not "fixed"):
- **Business decision recorded:**

## Checklist

- [ ] Same metric
- [ ] Same business definition
- [ ] Same date
- [ ] Same timezone
- [ ] Same population
- [ ] Same filters
- [ ] Same status
- [ ] Same source
- [ ] Same identifiers
- [ ] Duplicate check done
- [ ] Missing-record check done
- [ ] Small sample reconciled
- [ ] Root cause classified
- [ ] Business decision recorded

---

Template by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

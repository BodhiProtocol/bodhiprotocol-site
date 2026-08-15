# Missing Data / Batch Investigation Checklist

An editable template for tracing a "successful" batch to the exact checkpoint where expected record counts stopped matching actual. See the [Batch Ran Successfully, So Why Is the Data Missing?](https://bodhiprotocol.com/ba-playbooks/batch-ran-successfully-data-missing) guide for the seven-checkpoint method this template is built from.

## The batch

- **Batch / job name:**
- **Expected record count:**
- **Actual record count:**
- **Gap:**

## Checkpoint counts

| Checkpoint | Count | Notes |
| --- | --- | --- |
| Source |  |  |
| Extract |  |  |
| Transform |  |  |
| Validate |  |  |
| Load |  |  |
| Report |  |  |

- **First checkpoint where expected ≠ actual:**
- **Root cause type** (source / selection / transformation / validation / load / consumption):

## Before you close the issue

- [ ] Root cause identified and explained
- [ ] Counts reconcile at every checkpoint
- [ ] Rejected or skipped records are understood
- [ ] Missing records are restored or accounted for
- [ ] Downstream output is verified
- [ ] Monitoring or reconciliation controls added where needed
- [ ] Stakeholders understand what happened
- [ ] The learning is documented

## Technical SUCCESS vs. Business SUCCESS

- **Technical SUCCESS:** Process started → no fatal exception → process ended.
- **Business SUCCESS:** All expected records processed → exceptions identified → totals reconciled → downstream data available.

A batch can be the first without being the second. This template exists to prove the second one, not just the first.

---

Template by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

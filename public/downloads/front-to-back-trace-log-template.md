# Front-to-Back Trace Log

An editable template for tracing one record — a trade, order, claim or ticket — front to back until you find exactly where its story stopped matching. Use one copy of this log per investigation. See the [Front-to-Back Trade Trace Guide](https://bodhiprotocol.com/ba-playbooks/front-to-back-trade-trace-guide) for the full TRACE framework this template is built from.

## The record

- **Anchor ID:**
- **Record type** (trade / order / claim / ticket / other):
- **Reported by:**
- **Date raised:**
- **One-line description of the problem:**

## T — Tag it

- What is this record called in each system it passes through?
- Does the ID map cleanly to one record downstream, or can it split (partial fills, split shipments) or merge (batched claims)?

## R — Route it

List the stages this record actually passes through, front to back, before opening a single system:

1.
2.
3.
4.
5.

## Stage-by-stage trace

Copy this block once per stage in your route.

### Stage 1

- System:
- ID used here:
- What arrived:
- What went out:
- Timestamp:
- Status shown:
- Notes / gap found:

### Stage 2

- System:
- ID used here:
- What arrived:
- What went out:
- Timestamp:
- Status shown:
- Notes / gap found:

### Stage 3

- System:
- ID used here:
- What arrived:
- What went out:
- Timestamp:
- Status shown:
- Notes / gap found:

### Stage 4

- System:
- ID used here:
- What arrived:
- What went out:
- Timestamp:
- Status shown:
- Notes / gap found:

### Stage 5

- System:
- ID used here:
- What arrived:
- What went out:
- Timestamp:
- Status shown:
- Notes / gap found:

## C — Compare the data

- Does the status at each stage match the underlying record, or just what the dashboard displays?
- Where did you pull the actual record instead of trusting a summary?

## E — Explain the drop-off point

- **Stage where the story stopped matching:**
- **What should have happened:**
- **What actually happened:**
- **Root cause type** (data / definition / timing / processing / ownership):
- **Owner for the fix:**
- **Is this isolated, or does the same gap show up in other records from the same batch or day?**

## Questions to keep in your pocket

- [ ] What's the anchor ID at this stage, and does it map cleanly to the previous stage's ID?
- [ ] What did this stage receive, exactly?
- [ ] What did this stage send onward, exactly?
- [ ] Is there a timestamp here, and does the sequence of timestamps make sense end to end?
- [ ] Who owns this stage, and what's the escalation path if it's stuck?
- [ ] Could this stage fail silently — no error, just wrong or missing data?
- [ ] Is this one broken record, or does the same gap show up in others from the same batch or day?

---

Template by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

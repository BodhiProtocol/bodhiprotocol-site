# Front-to-Back Trace — Completed Example Pack

Two worked examples, using the Front-to-Back Trace Log exactly as a Business Analyst would fill it in during a real investigation. Names, systems and figures are illustrative, not any real company's confidential information.

---

# Example 1 — Capital Markets: A Reliance trade stuck on "settlement pending"

## The record

- **Anchor ID:** TRD-88214
- **Record type:** Trade (equity, NSE)
- **Reported by:** Relationship Manager, on behalf of the client
- **Date raised:** Six business days after trade date
- **One-line description of the problem:** Client sold Reliance Industries shares last week. Front Office shows the trade as done, Operations shows nothing flagged, but the money still hasn't reached the client's account.

## T — Tag it

- The order ID (ORD-4471) links to exactly one execution (EXE-9012), which links to exactly one trade ID (TRD-88214) and one settlement reference (STL-88214). No split, no merge — a single clean thread to follow.
- All four systems in the route use different labels for the same trade, but each one carries TRD-88214 somewhere in its record, so that's the anchor for this trace.

## R — Route it

1. Order (Front Office / OMS)
2. Execution (Front Office / Exchange confirmation)
3. Enrichment (Middle Office)
4. Confirmation (Middle Office)
5. Settlement (Back Office / Custody)

## Stage-by-stage trace

### Stage 1 — Order

- System: OMS
- ID used here: ORD-4471
- What arrived: Client instruction to sell 500 shares of Reliance Industries
- What went out: Order routed to the exchange
- Timestamp: 09:41:03
- Status shown: FILLED
- Notes / gap found: None — order captured correctly.

### Stage 2 — Execution

- System: Exchange confirmation feed
- ID used here: EXE-9012
- What arrived: Order ORD-4471
- What went out: One execution, 500 shares at market price
- Timestamp: 09:41:07
- Status shown: EXECUTED
- Notes / gap found: None — execution matches the order exactly.

### Stage 3 — Enrichment

- System: Middle Office trade capture
- ID used here: TRD-88214
- What arrived: Execution EXE-9012
- What went out: A fully-tagged trade with account, currency and settlement instruction attached
- Timestamp: 09:52:40
- Status shown: ENRICHED
- Notes / gap found: **The settlement instruction attached here points to a bank account the client closed roughly two months earlier.** This is the first point in the journey where the record itself is wrong, even though the status says success.

### Stage 4 — Confirmation

- System: Middle Office confirmation
- ID used here: TRD-88214
- What arrived: Enriched trade record
- What went out: Trade confirmation sent to the client and counterparty
- Timestamp: 10:15:00
- Status shown: CONFIRMED
- Notes / gap found: Confirmation only checks that the trade details (quantity, price, counterparty) match — it does not validate the settlement instruction, so the stale account passes through unnoticed.

### Stage 5 — Settlement

- System: Custody / Back Office
- ID used here: STL-88214
- What arrived: Confirmed trade with settlement instruction
- What went out: Nothing — settlement cannot complete against a closed account
- Timestamp: Still open six business days later
- Status shown: PENDING
- Notes / gap found: This is the symptom the client and Relationship Manager noticed. The actual cause sits three stages upstream, at Enrichment.

## C — Compare the data

- Front Office's "trade done" status is accurate for execution, but says nothing about settlement — comparing it against the Settlement system's own status (PENDING) is what exposes the gap.
- Pulling the actual enrichment record — not just its ENRICHED status flag — is what surfaces the stale account number. The status flag alone would never have shown it.

## E — Explain the drop-off point

- **Stage where the story stopped matching:** Enrichment (Middle Office)
- **What should have happened:** The settlement instruction should reflect the client's current, active account.
- **What actually happened:** Enrichment attached a settlement instruction for an account the client closed two months ago, and no downstream stage validates that instruction before it reaches Settlement.
- **Root cause type:** Data — the client's account-change wasn't reflected in the reference data Enrichment pulled from.
- **Owner for the fix:** Middle Office reference data team, to correct the instruction and add a validation check for closed accounts before confirmation.
- **Is this isolated, or a pattern?** Isolated to this client's record — the account closure event didn't propagate to the settlement-instruction reference table, most likely a one-off sync gap rather than a batch failure. Worth a quick check of other clients who closed accounts in the same period.

---

# Example 2 — E-commerce: An order stuck on "Delivered" that never arrived

## The record

- **Anchor ID:** ORD-70239
- **Record type:** Order (e-commerce, cash-on-delivery)
- **Reported by:** Customer support ticket
- **Date raised:** Two days after the app showed "Delivered"
- **One-line description of the problem:** Customer says the order never arrived, but the app still shows "Delivered" with no way to raise a return or refund.

## T — Tag it

- The order ID (ORD-70239) generated one payment reference (PAY-51820) and, because the order needed two boxes, **two separate shipment tracking numbers** (SHP-91004 and SHP-91005) — a one-to-many split that has to be tracked explicitly, or half the order looks fine while the other half is lost.

## R — Route it

1. Cart / Checkout
2. Payment
3. Fulfilment
4. Shipping
5. Delivery confirmation & Invoice

## Stage-by-stage trace

### Stage 1 — Cart / Checkout

- System: Order Management
- ID used here: ORD-70239
- What arrived: Customer's cart, two items requiring separate packaging
- What went out: One confirmed order, flagged for split shipment
- Timestamp: Day 0, 14:02
- Status shown: CONFIRMED
- Notes / gap found: None.

### Stage 2 — Payment

- System: Payment Service
- ID used here: PAY-51820
- What arrived: Order confirmation, cash-on-delivery method selected
- What went out: Payment authorization placeholder (amount due on delivery)
- Timestamp: Day 0, 14:02
- Status shown: AUTHORIZED
- Notes / gap found: None.

### Stage 3 — Fulfilment

- System: Warehouse Management
- ID used here: ORD-70239 → two pick-pack records
- What arrived: Order split into two packages by warehouse rules
- What went out: Two shipment records created — SHP-91004 and SHP-91005
- Timestamp: Day 1, 09:15
- Status shown: PACKED
- Notes / gap found: None yet — split is correct and expected.

### Stage 4 — Shipping

- System: Courier tracking feed
- ID used here: SHP-91004, SHP-91005
- What arrived: Two packages handed to courier
- What went out: SHP-91004 delivered and scanned. **SHP-91005 shows "Out for delivery" with no further scan — it stalled.**
- Timestamp: SHP-91004 delivered Day 3, 11:20. SHP-91005 last scanned Day 3, 08:40.
- Status shown: SHP-91004 = DELIVERED, SHP-91005 = OUT_FOR_DELIVERY
- Notes / gap found: This is the actual break — one of the two packages never completed its final scan.

### Stage 5 — Delivery confirmation & Invoice

- System: Order Management (customer-facing status)
- ID used here: ORD-70239
- What arrived: Delivery status for SHP-91004 and SHP-91005
- What went out: Order-level status shown to the customer
- Timestamp: Day 3, 11:25
- Status shown: DELIVERED (order-level)
- Notes / gap found: **The order-level status logic marks the whole order "Delivered" as soon as one linked shipment reports delivered, instead of waiting for both.** That's why the app shows "Delivered" while one package is still missing.

## C — Compare the data

- The order-level "Delivered" status looks definitive, but comparing it against the two underlying shipment records shows they disagree — one delivered, one still in transit.
- Pulling the courier's own scan log for SHP-91005 (rather than trusting the app's summarized status) is what shows the package stalled after "Out for delivery," not actually delivered.

## E — Explain the drop-off point

- **Stage where the story stopped matching:** The order-level status logic at Delivery confirmation, fed by an unresolved gap at Shipping.
- **What should have happened:** The order should only show "Delivered" once every linked shipment (SHP-91004 and SHP-91005) confirms delivery.
- **What actually happened:** The status logic updates the order to "Delivered" as soon as the first shipment confirms, silently ignoring the second, still-missing one.
- **Root cause type:** Processing — an aggregation rule that doesn't correctly handle split shipments.
- **Owner for the fix:** Order Management platform team, to fix the aggregation rule and separately investigate the stalled SHP-91005 with the courier.
- **Is this isolated, or a pattern?** Worth checking: any split-shipment order where one package delivers before the other is at risk of the same false "Delivered" status — likely a systemic pattern, not a one-off.

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

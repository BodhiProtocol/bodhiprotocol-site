# First User Story — Completed Example Pack

Two more worked examples of turning a vague request into a complete, Jira-ready user story — following the same discovery process as the guide's own "download button" walkthrough, applied to two different requests.

---

# Example 1 — "Can we add a search filter?"

## The request

A stakeholder says: "Can we add a search filter to the transactions page? It's hard to find things."

## Start with the problem, not the filter

**Why do you need this?** Customer support agents spend an average of 90 seconds scrolling through a customer's transaction list to find the one transaction a customer is calling about.

## Find the actual user

Not "users" — specifically, customer support agents viewing a customer's account during a live call.

## Find the outcome

Agents need to locate one specific transaction in under 10 seconds while a customer waits on the line.

## First draft

```
As a customer support agent,
I want to filter a customer's transaction list,
so that I can find the transaction a customer is asking about quickly.
```

## Add context

```
Agents currently scroll through a full, unfiltered transaction list during live calls, which
takes an average of 90 seconds and creates a poor customer experience. This is the top
complaint in post-call agent surveys about the support tooling.
```

## Business rules

1. Filters apply to date range, amount range, and transaction status (completed / pending / failed).
2. Filters can be combined (e.g. date range AND status).
3. The filtered list updates without a full page reload.

## Acceptance criteria

- **AC1** — Given an agent is viewing a customer's transaction list, when they set a date range filter, then only transactions within that range are shown.
- **AC2** — Given an agent applies both a date range and a status filter, when both are set, then only transactions matching both conditions are shown.
- **AC3** — Given no transactions match the applied filters, when the filter is set, then the agent sees "No transactions match these filters" instead of a blank list.

## Exceptions

- What if the customer has more transactions than one page can show, even after filtering? — Existing pagination applies to the filtered result set.
- What if an agent clears all filters? — The full list returns to its default, unfiltered state.

## Data requirements

Transaction date, amount, status, customer ID (to scope the query to the right customer).

## Dependencies

Transaction Service API must support server-side filtering — confirmed it already does, via existing query parameters not yet exposed in the UI.

## Out of scope

- Filtering by transaction category or merchant name — a possible follow-up, not this ticket.
- Saving a filter as a default view.

## Open questions

- Should the filter state persist if the agent navigates away and back during the same call? — Pending UX input.

---

# Example 2 — "Customers keep missing important notifications"

## The request

A stakeholder says: "We're getting complaints that customers miss important notifications. Can we make notifications more visible?"

## Start with the problem, not the visibility fix

**Why do you need this?** Customers report missing notifications about failed payments specifically — not all notification types. The complaint isn't about visibility in general.

## Find the actual user

Retail customers using the mobile app who have at least one recurring payment set up.

## Find the outcome

Customers need to know, reliably, when a recurring payment fails, so they can fix it before service is interrupted.

## First draft

```
As a customer with a recurring payment,
I want to be clearly notified when a payment fails,
so that I can fix the issue before my service is interrupted.
```

## Add context

```
Customers currently receive a single in-app notification when a recurring payment fails, with
the same visual treatment as a marketing notification. Support tickets show many customers
never saw it before their service was suspended.
```

## Business rules

1. A failed recurring payment triggers both a push notification and an in-app banner, not just one.
2. The notification must state the reason for failure if known (e.g. "card expired," "insufficient funds").
3. The notification remains visible (not auto-dismissed) until the customer either retries payment or explicitly dismisses it.

## Acceptance criteria

- **AC1** — Given a recurring payment fails, when the failure is recorded, then the customer receives a push notification within 5 minutes.
- **AC2** — Given a customer opens the app after a payment failure, when they land on the home screen, then a persistent banner shows the failure reason and a "Retry Payment" action.
- **AC3** — Given a customer successfully retries the payment, when the retry succeeds, then the banner is removed automatically.

## Exceptions

- What if the customer has push notifications disabled? — The in-app banner still appears; this is the fallback that AC2 exists to guarantee.
- What if the failure reason is unknown (a generic gateway error)? — Show "We couldn't process your payment" instead of guessing a reason.

## Data requirements

Payment status, failure reason code, customer notification preferences, push token.

## Dependencies

Push Notification Service, Payment Gateway failure-reason mapping (some gateways return generic codes that need translation to a customer-readable reason).

## Out of scope

- Changing the retry logic itself — this ticket only changes what the customer sees, not when retries happen automatically.
- Email notifications — a separate, already-existing channel not being changed here.

## Open questions

- Should the banner reappear on every app open until resolved, or only once per failure? — Pending Product decision.

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

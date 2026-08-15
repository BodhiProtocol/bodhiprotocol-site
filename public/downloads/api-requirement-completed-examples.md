# BA API Requirement Checklist — Completed Example Pack

Two worked API requirements, using the BA API Requirement Checklist exactly as a Business Analyst would fill it in before handing the requirement to development.

---

# Example 1 — GET /customers/{id}/balance

## Purpose

Let the mobile banking app display a customer's current account balance without exposing full transaction history.

## Consumer

- **Who calls this API?** The mobile banking app, on behalf of a logged-in customer.
- **When, and how often?** Every time the customer opens the Accounts screen — expect frequent, low-cost calls.

## Endpoint

`GET /customers/{id}/balance`

## Method

- [x] GET — read something, nothing changes

## Request fields

- **What information is sent?** Customer ID (in the URL path), auth token (in the header).
- **Which fields are mandatory?** Both — there is no optional field on this request.

## Validation

The customer ID in the path must match the authenticated customer's own ID — a customer cannot request another customer's balance.

## Response

```json
{
  "accountId": "ACC-88214",
  "balance": 45230.50,
  "currency": "INR",
  "asOf": "2026-08-15T09:12:00Z"
}
```

- **balance** — current available balance, not including pending holds
- **asOf** — timestamp the balance was calculated, since it's a snapshot, not real-time

## Status codes

| Code | Meaning here |
| --- | --- |
| 200 | Balance returned successfully |
| 401 | Customer is not logged in / token expired |
| 403 | Customer ID in the path doesn't match the authenticated customer |
| 404 | Account ID does not exist |
| 500 | Core banking system unavailable |

## Errors

A 403 and a 404 both show the same generic "We couldn't load your balance right now" to the customer — the app never reveals whether the ID mismatch was a permissions issue or a missing account, to avoid leaking account existence.

## Authentication

Bearer token issued at login, validated on every call.

## Authorisation

The token must belong to the customer whose ID appears in the path — no admin or support-agent override on this endpoint.

## Timeout

If the core banking system doesn't respond within 5 seconds, the app shows a cached "last known balance, as of [time]" with a stale-data indicator rather than a blank screen.

## Retry

Yes — GET is read-only and safe to retry without side effects.

## Duplicates

Not applicable — reading balance twice has no side effect either way.

## Downstream consumers

Only the mobile app today. If a future web dashboard also calls this, the response shape must stay backward-compatible.

## Audit

No — balance reads are not logged individually; only failed authentication attempts are logged, for security monitoring.

## Monitoring

Alert if the 500-error rate on this endpoint exceeds 1% over 5 minutes, or if p95 latency exceeds 3 seconds.

## Versioning

This is version 1 of the endpoint — no prior version exists.

---

# Example 2 — POST /payments

## Purpose

Let the checkout service submit a payment for processing, safely, even if the network is unreliable and the request might be sent more than once.

## Consumer

- **Who calls this API?** The Checkout Service, at the moment a customer confirms an order.
- **When, and how often?** Once per completed checkout — low volume, but each call matters (it moves money).

## Endpoint

`POST /payments`

## Method

- [x] POST — create something new

## Request fields

```json
{
  "idempotencyKey": "chk-70239-001",
  "orderId": "ORD-70239",
  "amount": 2499.00,
  "currency": "INR",
  "paymentMethodId": "PM-5521"
}
```

- **Mandatory:** idempotencyKey, orderId, amount, currency, paymentMethodId
- **Optional:** none

## Validation

- Amount must be greater than zero and match the order total exactly.
- The idempotency key must be unique per checkout attempt (generated once by the client, not regenerated on retry).

## Response

```json
{
  "paymentId": "PAY-51820",
  "status": "SUCCESS",
  "amount": 2499.00
}
```

## Status codes

| Code | Meaning here |
| --- | --- |
| 201 | Payment created and processed successfully |
| 400 | Amount doesn't match order total, or a mandatory field is missing |
| 401 | Checkout Service's own API key is invalid |
| 409 | A payment with this idempotency key already exists — see Duplicates below |
| 500 | Payment provider unavailable |

## Errors

A 400 tells the Checkout Service exactly which field failed validation, since this is a machine-to-machine call — no need to soften the message for a human reader.

## Authentication

Service-to-service API key, not a customer token — this endpoint is never called directly by a browser or app.

## Authorisation

The Checkout Service's API key is scoped to create payments only — it cannot refund or void.

## Timeout

If the payment provider doesn't respond within 15 seconds, the call is treated as unknown-outcome, not failure — the Checkout Service must check payment status before retrying, never assume it failed.

## Retry

Only with the same idempotency key. This is the central design decision of this whole requirement.

## Duplicates

If the same idempotency key arrives twice, the second call returns the original payment's result (200, not a new 201) instead of charging the customer twice. This is what makes the retry-on-timeout behaviour above safe.

## Downstream consumers

The Order Management system listens for a payment-completed event to update order status — a schema change here breaks that integration too, not just Checkout.

## Audit

Yes — every payment attempt, success or failure, is logged with the idempotency key for reconciliation and dispute investigation.

## Monitoring

Alert immediately on any 500 spike, and separately track the rate of 409 responses — an unexpectedly high 409 rate usually means the client is retrying more aggressively than intended.

## Versioning

This is version 2 — version 1 didn't require an idempotency key, which caused duplicate charges during a network outage. That incident is why this field is now mandatory.

---

Completed examples by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

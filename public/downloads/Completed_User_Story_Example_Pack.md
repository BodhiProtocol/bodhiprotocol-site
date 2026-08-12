# Completed User Story Example Pack

Two completed examples you can use as references: one India-focused UPI scenario and one international Capital Markets / Trade Surveillance scenario.

---

# Example 1 — India: UPI Payment Failure Experience

## User Story

**As a** customer  
**I want** to see why my UPI payment failed  
**So that** I know whether to retry, use another account, or contact my bank.

## Context

Customers may receive a generic message when a UPI payment fails and not understand what went wrong.

## Problem

Customers may retry unnecessarily or contact support because they do not know what action to take.

## Expected Behaviour

When a payment fails, show an understandable reason and, where appropriate, guidance on what to do next.

## Acceptance Criteria

### AC1 — Insufficient balance

**Given** the customer initiates a UPI payment  
**And** the linked account has insufficient balance  
**When** the transaction fails  
**Then** the customer should see a clear reason.

### AC2 — Bank temporarily unavailable

**Given** the bank is temporarily unavailable  
**When** the transaction cannot be completed  
**Then** the customer should be informed  
**And** advised to try again later.

## Business Rules

- **BR-01:** A failed payment must never appear successful.
- **BR-02:** Customer messages should use understandable language, not internal error codes.

## Dependencies

- The payment platform returns a meaningful failure status.
- Failure statuses are mapped to customer-friendly messages.
- The mobile app supports the new responses.

## Out of Scope

- Payment routing changes
- Bank-side processing changes
- Refund handling
- Card-payment failures

## Decision

- **Decision:** Show a customer-friendly message instead of the raw payment error.
- **Owner:** Payments Product
- **Reason:** Customers should not need to understand internal banking codes.

---

# Example 2 — International: Trade Surveillance Customer Risk Information

## User Story

**As a** Trade Surveillance Analyst  
**I want** alerts to show the customer's latest risk classification  
**So that** I can prioritise high-risk cases.

## Context

Analysts currently open another system to check customer risk classification while investigating an alert.

## Problem

Analysts spend extra time switching systems and may miss relevant risk information.

## Expected Behaviour

When an analyst opens an alert, show the latest available customer risk classification alongside the customer information.

## Acceptance Criteria

### AC1 — Risk classification available

**Given** customer risk information is available  
**When** the analyst opens the alert  
**Then** the latest risk classification should be displayed.

### AC2 — Risk classification unavailable

**Given** customer risk information cannot be retrieved  
**When** the analyst opens the alert  
**Then** show **"Risk information unavailable"**  
**And** do not present an older classification as current.

## Business Rules

- **BR-01:** Only the latest active risk classification should be shown.
- **BR-02:** Expired classifications must not appear current.
- **BR-03:** If no classification exists, make that clear.

## Data Requirements

| Data | Source | Required? | Notes |
|---|---|---:|---|
| Customer ID | Surveillance alert | Yes | Identifies customer |
| Risk classification | Risk system | Yes | Latest active value |
| Classification date | Risk system | Yes | Determines freshness |
| Risk reason | Risk system | No | Future scope |

## Assumptions

- One customer has one active risk classification.
- The risk system owns the classification.
- Surveillance users can view it.

## Open Questions

- What happens if the risk service times out?
- How old can the classification be before it becomes stale?
- Should analysts see the classification timestamp?
- Who owns the stale-data decision?

---

## What to Learn From These Examples

A story becomes more useful when it makes four things visible:

1. **Why** the change matters.
2. **What behaviour** is expected.
3. **What can go wrong** or remain unclear.
4. **Who owns** the important decisions.

The goal is not to fill every field. The goal is to make ambiguity visible before it becomes code.

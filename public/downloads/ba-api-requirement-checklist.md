# BA API Requirement Checklist

An editable checklist for writing an API-related requirement — the questions that turn "we need to call this API" into something developers and QA can actually build and test. See the [First Time Working With an API](https://bodhiprotocol.com/ba-playbooks/first-time-working-with-an-api) guide for the plain-English version of every term below.

## Purpose

What is this API for, in one sentence?

## Consumer

- **Who calls this API?**
- **When, and how often?**

## Endpoint

What is being asked for?

## Method

- [ ] GET — read something, nothing changes
- [ ] POST — create something new
- [ ] PUT / PATCH — update something that already exists
- [ ] DELETE — remove something

## Request fields

- **What information is sent?**
- **Which fields are mandatory?**

## Validation

What makes a request invalid?

## Response

- **What comes back?**
- **What does each field mean?**

## Status codes

Which codes are expected, and what does each one mean for this specific requirement?

| Code | Meaning here |
| --- | --- |
| 200 |  |
| 201 |  |
| 400 |  |
| 401 |  |
| 403 |  |
| 404 |  |
| 409 |  |
| 500 |  |

## Errors

What error responses are possible, and what should the user see for each?

## Authentication

How is the caller identified?

## Authorisation

What is the caller allowed to do, specifically?

## Timeout

What happens if the response takes too long?

## Retry

Can the request safely be sent again?

## Duplicates

What happens if the same request arrives twice?

## Downstream consumers

Who else relies on this response?

## Audit

Does this call need to be logged?

## Monitoring

How will we know if this API starts failing?

## Versioning

Is this a new version, or a change to an existing one?

---

Template by BodhiProtocol — https://bodhiprotocol.com/ba-playbooks

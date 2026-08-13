import type { Playbook } from "@/types/content";

const apiChecklist = `BA API REQUIREMENT CHECKLIST

PURPOSE
What is this API for, in one sentence?

CONSUMER
Who calls this API?
When, and how often?

ENDPOINT
What is being asked for?

METHOD
GET, POST, PUT/PATCH, or DELETE?

REQUEST FIELDS
What information is sent?
Which fields are mandatory?

VALIDATION
What makes a request invalid?

RESPONSE
What comes back?
What does each field mean?

STATUS CODES
Which codes are expected?
What does each one mean for this specific requirement?

ERRORS
What error responses are possible?
What should the user see for each?

AUTHENTICATION
How is the caller identified?

AUTHORISATION
What is the caller allowed to do, specifically?

TIMEOUT
What happens if the response takes too long?

RETRY
Can the request safely be sent again?

DUPLICATES
What happens if the same request arrives twice?

DOWNSTREAM CONSUMERS
Who else relies on this response?

AUDIT
Does this call need to be logged?

MONITORING
How will we know if this API starts failing?

VERSIONING
Is this a new version, or a change to an existing one?
`;

const tradeExample = `GET /trades/T12345

Response:
{
  "tradeId": "T12345",
  "status": "MATCHED",
  "quantity": 1000
}`;

export const firstTimeWorkingWithAnApi: Omit<Playbook, "readingTime"> = {
  slug: "first-time-working-with-an-api",
  title: "First Time Working With an API",
  description: "The API concepts a Business Analyst actually needs to understand.",
  summary:
    "The plain-English version of endpoints, methods, status codes, authentication vs authorisation, retries and idempotency — enough to ask the right questions in an API requirement discussion.",
  category: "Business Analysis",
  tags: ["APIs", "integration", "technical-literacy"],
  author: "Surya",
  date: "2026-08-08",
  itemLabel: "Concept",
  intro: [
    "The first time someone puts \"endpoint,\" \"payload,\" \"401\" and \"retry logic\" into the same sentence, APIs can sound a lot more complicated than they actually are.",
    "Strip all of that away and an API is this: System A asks System B for something, using a contract both sides already agreed on. That's enough to start.",
    "You don't need to build one. You need to know what to ask when someone else is building one for your requirement.",
  ],
  audience: [
    "Business Analysts new to integration work",
    "BAs writing an API-related requirement for the first time",
    "Product Owners working closely with technical teams",
    "Anyone who nods through \"endpoint\" and \"payload\" without asking",
  ],
  seoTitle: "API Guide for Business Analysts — First Time Working With APIs",
  seoDescription:
    "The API concepts a Business Analyst actually needs — endpoints, requests, status codes, authentication vs authorisation, retries and idempotency, explained in plain English with a real example.",
  closingHeading: ["You don't need to build the API.", "You need to know what to ask about it."],
  closingBody:
    "Every API requirement reduces to the same handful of questions: what's being asked for, what comes back, what happens when it fails, and who else is depending on the answer staying the same.",
  closingTemplate: apiChecklist,
  closingTemplateName: "BA API Requirement Checklist",
  relatedPlaybookSlugs: [
    "front-office-middle-office-back-office",
    "a-trade-is-missing-where-did-it-break",
  ],
  hacks: [
    {
      number: 1,
      title: "An API is one system asking another for something",
      insight: "Strip away the jargon and this is the entire idea.",
      visual: { steps: ["System A asks", "using an agreed contract", "System B answers"] },
      template: tradeExample,
      templateLabel: "Example request & response",
      explanation:
        "This is not mysterious. The system asked: \"give me trade T12345.\" The other system returned structured data describing it. Most of what you'll deal with as a BA stays at exactly this level.",
      whyItHelps: "Once the shape feels this ordinary, the rest of the vocabulary is just naming parts of something you already understand.",
    },
    {
      number: 2,
      title: "Endpoint, request, response — the only three nouns you actually need",
      insight: "Everything else is detail on top of these three.",
      list: [
        "Endpoint — the specific address you're asking",
        "Request — what you send, including what you're asking for",
        "Response — what comes back, and what it means",
      ],
      whyItHelps: "When a conversation starts drowning in acronyms, these three words are usually enough to steer it back to something you can follow.",
    },
    {
      number: 3,
      title: "The method says what kind of ask this is",
      insight: "GET, POST, PUT/PATCH, DELETE aren't trivia — they tell you what the requirement does to data.",
      list: [
        "GET — read something, nothing changes",
        "POST — create something new",
        "PUT / PATCH — update something that already exists",
        "DELETE — remove something",
      ],
      whyItHelps: "\"Does this read data or change it?\" is one of the first useful questions in any API requirement discussion, and the method usually answers it in one word.",
    },
    {
      number: 4,
      title: "Status codes are the system telling you what happened",
      insight: "You don't need to memorise these. You need to recognise the difference between a few of them.",
      list: [
        "200 — worked, here's your data",
        "201 — created successfully",
        "400 — the request itself was wrong",
        "401 — you're not signed in",
        "403 — you're signed in, but not allowed",
        "404 — that thing doesn't exist",
        "409 — conflicts with something already there",
        "500 — the other system broke, not you",
      ],
      whyItHelps: "A 401 and a 403 are different failures with different owners — one is a login problem, the other is a permission someone decided on purpose. That distinction changes who fixes it.",
    },
    {
      number: 5,
      title: "Every field is either mandatory or optional — decide which, on purpose",
      insight: "A field that's silently optional is a requirement nobody actually wrote down.",
      list: [
        "Which fields are mandatory for the request to work at all?",
        "What happens if an optional field is missing from the response?",
        "What happens if a mandatory one is missing — reject, or guess?",
      ],
      whyItHelps: "\"The field is usually there\" is not the same as \"the field is required.\" Development will build to whichever one you actually wrote.",
    },
    {
      number: 6,
      title: "Authentication and authorisation are two different questions",
      insight: "\"Who are you?\" and \"what are you allowed to do?\" get lumped together constantly. They aren't the same check.",
      compare: {
        leftLabel: "Authentication",
        left: "Proves who is calling — a login, a token, a key.",
        rightLabel: "Authorisation",
        right: "Decides what that caller is allowed to do, once they're proven.",
      },
      whyItHelps: "A caller can be authenticated and still not authorised — logged in, correctly, and still not allowed to see this particular trade.",
    },
    {
      number: 7,
      title: "Retries and duplicates are a requirements conversation, not just a technical one",
      insight: "\"Just retry it\" is a decision, even when nobody meant it to be one.",
      list: [
        "Can this request safely be sent again if it times out?",
        "What happens if the exact same request arrives twice?",
        "Could a retry create the same trade a second time?",
      ],
      explanation:
        "The technical word for \"safe to repeat without side effects\" is idempotency. You don't need the word. You need the question: if this gets sent twice by accident, does anything bad happen twice?",
      whyItHelps: "This is the question that's missing from most API requirements — not because it's hard, but because it's easy to assume the answer is obviously yes.",
    },
    {
      number: 8,
      title: "Find out who else is relying on the response before it changes",
      insight: "An API response is a promise to everyone already consuming it, not just to you.",
      list: [
        "Who else calls this today?",
        "What breaks for them if a field is renamed or removed?",
        "Is this a new version, or a breaking change to an old one?",
      ],
      whyItHelps: "\"We just need to add a field\" is usually safe. \"We need to change what an existing field means\" usually isn't — and the difference matters to people you may never talk to directly.",
    },
    {
      number: 9,
      title: "Plan for the moment the other system doesn't answer",
      insight: "A requirement that only describes a working API hasn't described the API yet.",
      before: "Requirement assumes the API always responds, instantly and correctly.",
      after: [
        "What happens if the API is unavailable?",
        "What happens if it times out?",
        "What does the user see while we wait, and after we give up?",
      ],
      whyItHelps: "This is the gap that turns into a production incident report six months later, usually starting with \"we never actually discussed what happens if...\"",
    },
  ],
};

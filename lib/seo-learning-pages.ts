export type SeoLearningSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type SeoLearningPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  sections: SeoLearningSection[];
  related: { label: string; href: string; description: string }[];
  faqs?: { question: string; answer: string }[];
};

export const seoLearningPages: SeoLearningPage[] = [
  {
    slug: "capital-markets-business-analyst",
    eyebrow: "Career roadmap",
    title: "Capital Markets Business Analyst Roadmap",
    description:
      "Learn the trade lifecycle, requirements skills, tools, and interview concepts needed for a capital markets BA role.",
    seoTitle: "Capital Markets Business Analyst Roadmap",
    seoDescription:
      "Learn how to become a capital markets business analyst: trade lifecycle, requirements, user stories, acceptance criteria, Jira, and interview prep.",
    intro: [
      "A capital markets business analyst sits between business teams, technology teams, operations, compliance, risk, and product owners. The role is not only about writing requirements. It is about understanding how trades move through systems, where risk appears, what users actually need, and how to translate messy business language into software teams can build and test.",
      "BodhiProtocol helps you learn the capital markets business analyst role through visual essays, plain-English explanations, practical tools, and structured learning paths.",
    ],
    sections: [
      {
        title: "What does a capital markets business analyst do?",
        paragraphs: [
          "A capital markets BA helps financial institutions define, improve, and deliver systems used across trading, post-trade processing, reporting, operations, and risk management.",
        ],
        items: [
          "Understand business problems from traders, operations, compliance, finance, and risk teams",
          "Write business requirements, functional requirements, user stories, and acceptance criteria",
          "Map trade lifecycle flows from execution to settlement and reporting",
          "Explain system behavior to developers, testers, and business users",
          "Support UAT, defect triage, reconciliation workflows, and production issue analysis",
        ],
      },
      {
        title: "Capital markets knowledge to learn first",
        items: [
          "Order books and price formation",
          "Trade execution and trade capture",
          "Confirmation, clearing, settlement, and reconciliation",
          "Repo, derivatives, margin, collateral, and regulatory reporting",
          "Trade identifiers, counterparty data, product data, and status workflows",
        ],
      },
      {
        title: "Business analysis skills you need",
        items: [
          "Stakeholder interviews and problem framing",
          "Current-state and future-state process mapping",
          "BRD, FRD, user stories, and acceptance criteria",
          "Jira backlog refinement and requirements traceability",
          "UAT planning, defect triage, and release support",
        ],
      },
      {
        title: "Suggested learning path",
        items: [
          "Start with the trade lifecycle so you understand how a trade moves through systems.",
          "Learn core capital markets concepts: order books, repo, clearinghouse novation, settlement, and reconciliation.",
          "Practice requirements writing by turning vague stakeholder sentences into user stories and acceptance criteria.",
          "Use tools like the Regulatory Acronym Map and Requirements Translator to build fluency.",
          "Prepare for interviews by explaining concepts simply, then showing how you would document and test them.",
        ],
      },
      {
        title: "Example BA requirement",
        paragraphs: [
          "Stakeholder sentence: We need to see failed settlements before the deadline.",
          "Better user story: As an operations analyst, I want a failed settlement worklist sorted by settlement date and priority so that I can investigate urgent breaks before cut-off.",
        ],
        items: [
          "Given a settlement has failed, when the settlement status is updated, then the trade appears in the failed settlement worklist.",
          "Given multiple failed settlements exist, when the user opens the worklist, then records are sorted by settlement date by default.",
          "Given a user filters by counterparty, when the filter is applied, then only failed settlements for that counterparty are displayed.",
        ],
      },
    ],
    related: [
      {
        label: "How to Start a BA Career From Scratch",
        href: "/essays/how-to-start-a-business-analyst-career-from-scratch",
        description:
          "No experience? Build evidence instead: a practical roadmap and a free portfolio project template.",
      },
      {
        label: "How Trade Execution Actually Works",
        href: "/essays/shiv-pressed-buy-trade-execution",
        description:
          "Follow one fictional buy order through brokers, matching, fills, and settlement.",
      },
      {
        label: "Trade Lifecycle for Business Analysts",
        href: "/trade-lifecycle-business-analyst",
        description:
          "Follow a trade from execution to settlement, reporting, and reconciliation.",
      },
      {
        label: "Capital Markets for Business Analysts",
        href: "/capital-markets-for-business-analysts",
        description:
          "Learn the domain concepts that appear in banking and trading systems.",
      },
      {
        label: "Requirements Translator",
        href: "https://requirements-translator.bodhiprotocol.com/",
        description: "Turn raw business requirements into structured user stories.",
      },
    ],
    faqs: [
      {
        question: "What does a capital markets business analyst do?",
        answer:
          "A capital markets business analyst works with business, technology, operations, risk, and compliance teams to define requirements, map processes, support delivery, and improve systems used in trading and post-trade workflows.",
      },
      {
        question: "What should I learn first for a capital markets BA role?",
        answer:
          "Start with the trade lifecycle, then learn clearing, settlement, reconciliation, trade data, requirements writing, user stories, acceptance criteria, Jira, and UAT.",
      },
    ],
  },
  {
    slug: "business-analyst-roadmap",
    eyebrow: "BA fundamentals",
    title: "Business Analyst Roadmap",
    description:
      "A practical roadmap for requirements, stakeholder analysis, user stories, acceptance criteria, Jira, UAT, SQL, and domain knowledge.",
    seoTitle: "Business Analyst Roadmap",
    seoDescription:
      "A practical business analyst roadmap covering requirements, stakeholder interviews, user stories, acceptance criteria, Jira, UAT, SQL, and domain knowledge.",
    intro: [
      "A business analyst helps teams understand what needs to be built, why it matters, and how success will be tested. The best business analysts are not just note-takers. They clarify problems, expose assumptions, connect stakeholders, and turn business needs into clear requirements.",
    ],
    sections: [
      {
        title: "Understand the business problem",
        items: [
          "Who has the problem?",
          "What happens today?",
          "What goes wrong?",
          "What changes if this is solved?",
          "What happens if we do nothing?",
          "How will success be measured?",
        ],
      },
      {
        title: "Learn stakeholder analysis",
        paragraphs: [
          "Business analysts work with business users, product owners, developers, testers, operations teams, compliance teams, support teams, and senior managers. Your job is to identify what each group needs and where their assumptions conflict.",
        ],
      },
      {
        title: "Learn requirements writing",
        paragraphs: [
          "Weak requirement: The system should show trade data.",
          "Better requirement: The system must display trade ID, product type, counterparty, trade date, settlement date, quantity, price, and current status for each trade in the operations worklist.",
        ],
      },
      {
        title: "Core BA tools",
        items: [
          "Jira",
          "Confluence",
          "Excel",
          "SQL",
          "Diagramming tools",
          "Wireframes",
          "API documentation",
          "PowerPoint",
        ],
      },
      {
        title: "Build domain knowledge",
        paragraphs: [
          "Domain knowledge makes your analysis sharper. A banking BA, healthcare BA, insurance BA, or e-commerce BA will face different workflows and terminology. For capital markets, start with trade lifecycle, clearing, settlement, reconciliation, and regulatory reporting.",
        ],
      },
    ],
    related: [
      {
        label: "How to Start a BA Career From Scratch",
        href: "/essays/how-to-start-a-business-analyst-career-from-scratch",
        description:
          "No experience? Build evidence instead: a practical roadmap and a free portfolio project template.",
      },
      {
        label: "Capital Markets Business Analyst Roadmap",
        href: "/capital-markets-business-analyst",
        description: "A focused path for BA roles in banking and capital markets.",
      },
      {
        label: "Acceptance Criteria Examples",
        href: "/acceptance-criteria-examples",
        description: "Practice testable Given/When/Then requirements.",
      },
      {
        label: "User Story Examples",
        href: "/user-story-examples-business-analyst",
        description: "See practical user stories for BA workflows.",
      },
    ],
    faqs: [
      {
        question: "What skills does a business analyst need?",
        answer:
          "Core skills include stakeholder analysis, requirements writing, user stories, acceptance criteria, and comfort with tools like Jira, Confluence, Excel, and SQL. Domain knowledge sharpens all of it.",
      },
      {
        question: "How do I become a business analyst with no experience?",
        answer:
          "Practice requirements writing and user stories on realistic scenarios, learn the core BA tools, and build domain knowledge in an industry you're targeting. Many BAs move in from adjacent roles like QA, support, or operations.",
      },
    ],
  },
  {
    slug: "capital-markets-for-business-analysts",
    eyebrow: "Domain guide",
    title: "Capital Markets for Business Analysts",
    description:
      "Plain-English capital markets concepts for BAs: order books, trade lifecycle, clearing, settlement, repo, reconciliation, and reporting.",
    seoTitle: "Capital Markets for Business Analysts",
    seoDescription:
      "Learn capital markets concepts for business analysts: order books, trade lifecycle, clearing, settlement, repo, derivatives, reconciliation, and reporting.",
    intro: [
      "Capital markets can feel difficult because the language is dense. But most of the work becomes easier once you understand a few repeated patterns: trades are agreed, captured, checked, cleared, settled, reported, and reconciled.",
      "A capital markets business analyst does not need to become a trader. But they do need to understand how financial transactions move through systems and where operational risk appears.",
    ],
    sections: [
      {
        title: "Order book",
        paragraphs: [
          "An order book is a live list of buy and sell interest. It helps explain how market prices form and why execution price can move as liquidity changes.",
        ],
      },
      {
        title: "Trade lifecycle",
        paragraphs: [
          "The trade lifecycle is the journey a trade takes from execution to settlement and reporting. Most BA requirements in capital markets connect to one lifecycle stage.",
        ],
      },
      {
        title: "Clearing",
        paragraphs: [
          "Clearing manages obligations after a trade is executed. In some markets, a clearinghouse steps in between buyer and seller through novation.",
        ],
      },
      {
        title: "Settlement",
        paragraphs: [
          "Settlement is when securities and cash are exchanged. Many operational issues become urgent as settlement date approaches.",
        ],
      },
      {
        title: "Repo",
        paragraphs: [
          "A repo looks like a loan, but legally it is structured as a sale and repurchase. That distinction matters when collateral ownership and default are involved.",
        ],
      },
      {
        title: "Reconciliation",
        paragraphs: [
          "Reconciliation compares records between systems to find breaks. BAs often define matching rules, exception queues, and workflows for resolving breaks.",
        ],
      },
      {
        title: "Regulatory reporting",
        paragraphs: [
          "Regulatory reporting sends required trade or transaction data to regulators or trade repositories. BAs often work on field mapping, validation rules, exceptions, and control reports.",
        ],
      },
    ],
    related: [
      {
        label: "How Trade Execution Actually Works",
        href: "/essays/shiv-pressed-buy-trade-execution",
        description:
          "Start with a beginner-friendly story of one order moving through the market.",
      },
      {
        label: "Capital Markets BA Roadmap",
        href: "/capital-markets-business-analyst",
        description: "Put these concepts into a practical career path.",
      },
      {
        label: "Repo explained",
        href: "/essays/repo-the-overnight-loan-thats-legally-two-trades",
        description: "Learn why repo is legally two trades.",
      },
      {
        label: "Regulatory Acronym Map",
        href: "https://regulatory-acronym-map.bodhiprotocol.com/",
        description: "Decode 100+ capital markets regulatory terms.",
      },
    ],
    faqs: [
      {
        question: "Do I need to be a trader to work in capital markets as a BA?",
        answer:
          "No. A capital markets BA needs to understand how financial transactions move through systems and where operational risk appears, not how to trade.",
      },
      {
        question: "What's the difference between clearing and settlement?",
        answer:
          "Clearing manages the obligations created by a trade. In many markets, a clearinghouse steps in as the counterparty to both sides through novation. Settlement is the actual exchange of cash and securities that follows.",
      },
    ],
  },
  {
    slug: "trade-lifecycle-business-analyst",
    eyebrow: "Capital markets basics",
    title: "Trade Lifecycle for Business Analysts",
    description:
      "Understand how a trade moves from order and execution through capture, confirmation, clearing, settlement, reporting, and reconciliation.",
    seoTitle: "Trade Lifecycle for Business Analysts",
    seoDescription:
      "A plain-English guide to the trade lifecycle for business analysts: order, execution, booking, confirmation, clearing, settlement, reporting, and reconciliation.",
    intro: [
      "The trade lifecycle explains what happens to a trade after a buyer and seller agree. For a capital markets business analyst, this is one of the most important concepts to understand because many requirements, defects, reports, and operational workflows are connected to lifecycle events.",
    ],
    sections: [
      {
        title: "1. Order",
        paragraphs: [
          "A trader or client creates an order to buy or sell a financial instrument.",
        ],
      },
      {
        title: "2. Execution",
        paragraphs: [
          "The order is matched or executed in a market, venue, platform, or bilateral agreement.",
        ],
      },
      {
        title: "3. Trade capture",
        paragraphs: [
          "The executed trade is recorded in an internal system with product, price, quantity, counterparty, dates, and identifiers.",
        ],
      },
      {
        title: "4. Validation",
        paragraphs: [
          "The system checks whether required fields are present and whether the trade follows business rules.",
        ],
      },
      {
        title: "5. Confirmation",
        paragraphs: [
          "Both sides agree on the trade details. If details do not match, an exception or break may be created.",
        ],
      },
      {
        title: "6. Clearing",
        paragraphs: [
          "For cleared products, a clearinghouse may become the counterparty to both sides of the trade.",
        ],
      },
      {
        title: "7. Settlement",
        paragraphs: [
          "Cash and securities move between parties. Settlement failure can create financial, operational, and regulatory risk.",
        ],
      },
      {
        title: "8. Reporting and reconciliation",
        paragraphs: [
          "The trade may need internal, external, or regulatory reporting. Records are then compared between systems so breaks can be investigated and resolved.",
        ],
      },
    ],
    related: [
      {
        label: "Capital Markets Business Analyst Roadmap",
        href: "/capital-markets-business-analyst",
        description: "Use the lifecycle as the foundation for your BA learning path.",
      },
      {
        label: "What a Trade Lifecycle Actually Looks Like",
        href: "/essays/what-a-trade-lifecycle-actually-looks-like",
        description: "Read the visual essay version.",
      },
      {
        label: "Novation explained",
        href: "/essays/novation-how-a-clearinghouse-becomes-everyones-counterparty",
        description: "Understand how a clearinghouse becomes everyone's counterparty.",
      },
    ],
    faqs: [
      {
        question: "What are the main stages of the trade lifecycle?",
        answer:
          "Order, execution, trade capture, validation, confirmation, clearing, settlement, and reporting/reconciliation. Most BA requirements and defects map to one of these stages.",
      },
      {
        question: "Why does the trade lifecycle matter for a business analyst?",
        answer:
          "It lets you trace where a requirement, defect, or report fits, and communicate clearly with operations, risk, and technology teams about what changed and why.",
      },
    ],
  },
  {
    slug: "business-analyst-interview-questions",
    eyebrow: "Interview prep",
    title: "Business Analyst Interview Questions",
    description:
      "Practice BA interview questions for requirements, user stories, acceptance criteria, Jira, UAT, stakeholders, and capital markets scenarios.",
    seoTitle: "Business Analyst Interview Questions",
    seoDescription:
      "Practice business analyst interview questions covering requirements, user stories, acceptance criteria, Jira, UAT, stakeholders, and capital markets scenarios.",
    intro: [
      "Business analyst interviews usually test how you think. The interviewer wants to know whether you can clarify ambiguity, write useful requirements, work with stakeholders, and support delivery.",
    ],
    sections: [
      {
        title: "General BA questions",
        items: [
          "What does a business analyst do?",
          "How do you gather requirements?",
          "What is the difference between a business requirement and a functional requirement?",
          "What is a user story?",
          "What makes acceptance criteria good?",
          "How do you handle conflicting stakeholder requirements?",
          "How do you support UAT?",
          "How do you investigate a production issue?",
        ],
      },
      {
        title: "Capital markets BA questions",
        items: [
          "Explain the trade lifecycle.",
          "What is the difference between clearing and settlement?",
          "What is reconciliation?",
          "What is a trade break?",
          "What is a clearinghouse?",
          "What is repo?",
          "What data fields would you expect on a trade record?",
          "How would you define requirements for a failed settlement queue?",
          "How would you test a regulatory reporting change?",
        ],
      },
      {
        title: "Strong answer pattern",
        items: [
          "Define the concept simply.",
          "Give a practical example.",
          "Explain why it matters to the business.",
          "Mention how you would document or test it.",
        ],
      },
    ],
    related: [
      {
        label: "Business Analyst Roadmap",
        href: "/business-analyst-roadmap",
        description: "Build the foundation before interview practice.",
      },
      {
        label: "Capital Markets BA Roadmap",
        href: "/capital-markets-business-analyst",
        description: "Prepare for domain-specific BA interviews.",
      },
      {
        label: "Acceptance Criteria Examples",
        href: "/acceptance-criteria-examples",
        description: "Practice testable interview examples.",
      },
    ],
    faqs: [
      {
        question: "What do interviewers look for in a BA interview?",
        answer:
          "Whether you can clarify ambiguity, write useful requirements, work with stakeholders, and support delivery, not just whether you know definitions.",
      },
      {
        question: "How should I answer a capital markets BA interview question?",
        answer:
          "Define the concept simply, give a practical example, explain why it matters to the business, and mention how you would document or test it.",
      },
    ],
  },
  {
    slug: "acceptance-criteria-examples",
    eyebrow: "Requirements practice",
    title: "Acceptance Criteria Examples for Business Analysts",
    description:
      "Learn acceptance criteria with practical Given/When/Then examples for login, worklists, reporting, reconciliation, and filters.",
    seoTitle: "Acceptance Criteria Examples for Business Analysts",
    seoDescription:
      "Learn acceptance criteria with practical business analyst examples using Given, When, Then for filters, worklists, login, reconciliation, and reporting.",
    intro: [
      "Acceptance criteria define the conditions a feature must satisfy before it can be accepted. They make requirements testable for developers, testers, product owners, and business users.",
    ],
    sections: [
      {
        title: "Format",
        paragraphs: ["Given [context], when [action], then [expected result]."],
      },
      {
        title: "Login example",
        paragraphs: [
          "User story: As a registered user, I want to log in so that I can access my account.",
        ],
        items: [
          "Given the user enters valid credentials, when they select login, then they are taken to the dashboard.",
          "Given the user enters an incorrect password, when they select login, then an error message is displayed.",
          "Given the account is locked, when the user tries to log in, then access is denied and the reset option is shown.",
        ],
      },
      {
        title: "Trade worklist example",
        paragraphs: [
          "User story: As an operations analyst, I want to view unmatched trades so that I can investigate reconciliation breaks.",
        ],
        items: [
          "Given a trade exists in the internal system but not the external file, when reconciliation runs, then the trade appears as unmatched.",
          "Given a trade is unmatched, when the user opens the worklist, then the trade ID, counterparty, product, amount, and status are displayed.",
          "Given the user filters by counterparty, when the filter is applied, then only breaks for that counterparty are shown.",
        ],
      },
      {
        title: "Report export example",
        items: [
          "Given open breaks exist, when the user selects export, then a CSV file is downloaded.",
          "Given no open breaks exist, when the user selects export, then the system displays a no records message.",
          "Given the user has applied filters, when the export runs, then only filtered records are included.",
        ],
      },
    ],
    related: [
      {
        label: "User Story Examples",
        href: "/user-story-examples-business-analyst",
        description: "Pair each story with testable acceptance criteria.",
      },
      {
        label: "Business Analyst Roadmap",
        href: "/business-analyst-roadmap",
        description: "See where acceptance criteria fit in the BA workflow.",
      },
      {
        label: "Requirements Translator",
        href: "https://requirements-translator.bodhiprotocol.com/",
        description: "Turn raw requirements into structured stories.",
      },
    ],
    faqs: [
      {
        question: "What is the Given/When/Then format?",
        answer:
          "A structured way to write acceptance criteria: given a starting context, when an action happens, then an expected result occurs. It makes requirements testable for developers, testers, and business users.",
      },
      {
        question: "How many acceptance criteria should a user story have?",
        answer:
          "Enough to cover the main path and the important edge cases, usually three to six. Too few leaves gaps; too many usually means the story should be split.",
      },
    ],
  },
  {
    slug: "user-story-examples-business-analyst",
    eyebrow: "Requirements practice",
    title: "User Story Examples for Business Analysts",
    description:
      "Practical user story examples for business analysts, including operations, reporting, reconciliation, filters, access, and exports.",
    seoTitle: "User Story Examples for Business Analysts",
    seoDescription:
      "Practical user story examples for business analysts, including operations, reporting, capital markets, reconciliation, login, filters, and exports.",
    intro: [
      "A user story describes what a user needs and why. It should be small enough to build, clear enough to test, and connected to a real business outcome.",
    ],
    sections: [
      {
        title: "User story format",
        paragraphs: ["As a [user], I want [capability], so that [business outcome]."],
      },
      {
        title: "Examples",
        items: [
          "As an operations analyst, I want to filter settlement breaks by counterparty so that I can focus on the breaks assigned to my team.",
          "As a manager, I want to export open reconciliation breaks so that I can review them in Excel before the daily operations meeting.",
          "As a support analyst, I want to view complete trade details so that I can investigate user queries without switching systems.",
          "As a compliance user, I want invalid reporting records to be flagged before submission so that we can correct errors before sending data to the regulator.",
          "As an administrator, I want to assign users to roles so that each user only sees the actions they are allowed to perform.",
        ],
      },
      {
        title: "Common mistakes",
        items: [
          "Writing system tasks instead of user needs",
          "Missing the business reason",
          "Making the story too large",
          "Adding too many unrelated requirements",
          "Writing acceptance criteria that cannot be tested",
        ],
      },
    ],
    related: [
      {
        label: "Acceptance Criteria Examples",
        href: "/acceptance-criteria-examples",
        description: "Make each story testable with Given/When/Then criteria.",
      },
      {
        label: "Business Analyst Roadmap",
        href: "/business-analyst-roadmap",
        description: "Learn the full BA workflow around user stories.",
      },
      {
        label: "Capital Markets BA Roadmap",
        href: "/capital-markets-business-analyst",
        description: "Apply user stories to capital markets workflows.",
      },
    ],
    faqs: [
      {
        question: "What is the user story format?",
        answer:
          'As a [user], I want [capability], so that [business outcome]. The "so that" clause keeps the story tied to a real business reason instead of just a system task.',
      },
      {
        question: "What's the difference between a user story and acceptance criteria?",
        answer:
          "A user story describes what a user needs and why. Acceptance criteria define the specific, testable conditions that must be true for that story to be considered done.",
      },
    ],
  },
  {
    slug: "indian-markets",
    eyebrow: "Domain guide",
    title: "How Indian Capital Markets Work",
    description:
      "The exchanges, clearing corporations, depositories, and regulator behind every trade on the NSE and BSE — and how an order becomes a settled holding.",
    seoTitle: "How Indian Capital Markets Work",
    seoDescription:
      "A plain-English guide to Indian capital markets: NSE and BSE, SEBI, clearing corporations, NSDL and CDSL depositories, and how equity trades clear and settle.",
    intro: [
      "Indian capital markets run on the same machinery as any other major market — an order book that matches buyers and sellers, a clearing corporation that stands between them, and a settlement system that moves securities and cash. What differs is the institutions that perform each step, and a settlement cycle that is among the fastest in the world.",
      "This guide walks through the parts in the order a trade actually meets them, then points to essays that go deeper on each mechanism.",
    ],
    sections: [
      {
        title: "Who does what",
        paragraphs: [
          "Four kinds of institution sit behind every Indian equity trade, and they are frequently confused with one another because their names all sound similar.",
        ],
        items: [
          "Exchanges — the NSE and BSE run the order books where buyers and sellers meet and trades are matched",
          "Clearing corporations — NSE Clearing and Indian Clearing Corporation step between the two sides so neither faces the other's credit risk",
          "Depositories — NSDL and CDSL hold shares in dematerialised form, so settlement is a book entry rather than a paper certificate",
          "SEBI — the regulator that sets the rules on disclosure, margin, market conduct, and surveillance",
        ],
      },
      {
        title: "How an equity trade moves",
        items: [
          "An order reaches the exchange through a broker, which checks limits and margin before releasing it",
          "The exchange's order book matches it against the best available price on the other side",
          "The clearing corporation novates the trade, becoming buyer to the seller and seller to the buyer",
          "Obligations are netted, so only the net position per member has to move",
          "Securities move between demat accounts at the depository and funds move through the banking system, on a T+1 cycle for Indian equities",
        ],
      },
      {
        title: "What is distinctive about the Indian market",
        items: [
          "Settlement is fast — India completed its move to a T+1 equity settlement cycle ahead of most major markets",
          "Holdings are dematerialised by default, so there is no physical certificate to reconcile against",
          "Retail participation is unusually high, and a large share of it arrives through mobile-first brokers",
          "Margin requirements are prescribed closely by the regulator rather than left to broker discretion",
          "Index derivatives volumes are very large relative to cash market turnover",
        ],
      },
      {
        title: "Where to start reading",
        items: [
          "Start with the order book — it is the structure every later mechanism assumes",
          "Then follow one order end to end through execution, clearing, and settlement",
          "Then read novation and margin, which explain what the clearing corporation is actually absorbing",
          "Then settlement finality, which explains the point at which a trade stops being reversible",
        ],
      },
    ],
    related: [
      {
        label: "How Order Books Actually Work",
        href: "/essays/how-order-books-work",
        description: "The two stacks of intent behind every price on an NSE ticker.",
      },
      {
        label: "Shiv Pressed Buy",
        href: "/essays/shiv-pressed-buy-trade-execution",
        description: "One order followed end to end across an Indian and a US market.",
      },
      {
        label: "The Essay Concept Map",
        href: "/essays/map",
        description: "Every essay as one network, with the reading order for each arc.",
      },
      {
        label: "Capital Markets Business Analyst",
        href: "/capital-markets-business-analyst",
        description: "How this domain knowledge maps onto a BA role.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between NSE and BSE?",
        answer:
          "Both are stock exchanges running order books in Indian securities. The BSE is the older institution and the NSE carries the larger share of equity and derivatives turnover, but the mechanism on each is the same: orders are matched by price and then time priority.",
      },
      {
        question: "What is the difference between a depository and a clearing corporation?",
        answer:
          "A clearing corporation manages the obligation created by a trade — it becomes the counterparty to both sides, collects margin, and nets what has to move. A depository holds the securities themselves, so settlement is a change of entry in an account rather than a physical delivery. NSDL and CDSL are depositories; NSE Clearing and ICCL are clearing corporations.",
      },
      {
        question: "What does T+1 settlement mean?",
        answer:
          "The trade is settled one working day after it is executed: securities reach the buyer's demat account and funds reach the seller on the next day, rather than two or three days later. A shorter cycle reduces the window in which either side can fail.",
      },
    ],
  },
];

export function getSeoLearningPage(slug: string) {
  const page = seoLearningPages.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`Unknown SEO learning page: ${slug}`);
  }

  return page;
}

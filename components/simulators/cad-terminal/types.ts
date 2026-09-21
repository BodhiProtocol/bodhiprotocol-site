type OrdStatus = "New" | "PartiallyFilled" | "Filled" | "PendingCancel" | "Canceled" | "Settled";

interface BlotterRecord {
  idLabel: "ClOrdID" | "TradeID";
  id: string;
  instrument: string;
  side: "Buy" | "Sell";
  qty: number;
  cumQty: number;
  leavesQty: number;
  status: OrdStatus;
  lastPrice: string;
}

type OutcomeId = "accepted" | "rejected-state" | "rejected-race" | "flagged-correction";

interface Outcome {
  id: OutcomeId;
  label: string;
  hint: string;
}

interface LogLine {
  time: string;
  kind: "sent" | "received" | "info";
  text: string;
  tone: "brand" | "destructive" | "muted";
}

interface Scenario {
  id: string;
  label: string;
  desk: string;
  record: BlotterRecord;
  requestType: "Cancel" | "Amend Qty" | "Amend Price" | "Correct" | "Delete";
  requestDetail: string;
  requestedBy: string;
  correctOutcome: OutcomeId;
  log: LogLine[];
  explanation: string;
  essay: { href: string; label: string };
}

export type { OrdStatus, BlotterRecord, Outcome, OutcomeId, LogLine, Scenario };

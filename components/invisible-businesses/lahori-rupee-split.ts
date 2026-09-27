// One ₹10 bottle of Lahori Zeera, split by where each paisa ends up. The tax
// share is exact (40% GST inside a ₹10 MRP); the shopkeeper and distributor
// cuts are estimates; the rest applies Archian Foods' reported FY25 cost ratios
// (on ₹540 Cr revenue) to what's left. Shared by the scroll tracker and the
// full-split diagram so the two can never disagree. Amounts sum to 10.00.

interface RupeeCut {
  label: string;
  amount: number;
  /** Profit is drawn in solid brand; everything else is a cost. */
  profit?: boolean;
}

interface RupeeStop {
  /** Must match the rehype-slug id of the stop's h2 in the MDX. */
  id: string;
  short: string;
  cuts: RupeeCut[];
}

const rupeeStops: RupeeStop[] = [
  { id: "stop-1-a-price-that-never-moves", short: "The price", cuts: [] },
  {
    id: "stop-2-the-fizz-tax",
    short: "The fizz tax",
    cuts: [{ label: "GST (40%)", amount: 2.86 }],
  },
  {
    id: "stop-3-the-shopkeeper",
    short: "The shopkeeper",
    cuts: [{ label: "Shopkeeper", amount: 1.2 }],
  },
  {
    id: "stop-4-the-distributor",
    short: "The distributor",
    cuts: [{ label: "Distributor", amount: 0.45 }],
  },
  {
    id: "stop-5-the-truck",
    short: "The truck",
    cuts: [{ label: "Freight", amount: 0.53 }],
  },
  {
    id: "stop-6-the-jeera-the-bottle-and-the-people",
    short: "Jeera, bottle, people",
    cuts: [
      { label: "Jeera, sugar & bottle", amount: 3.21 },
      { label: "People", amount: 0.64 },
      { label: "Everything else", amount: 0.86 },
    ],
  },
  {
    id: "stop-7-what-reaches-lahori",
    short: "What Lahori keeps",
    cuts: [{ label: "Lahori's profit", amount: 0.25, profit: true }],
  },
];

const allRupeeCuts = rupeeStops.flatMap((stop) => stop.cuts);

function formatRupees(amount: number) {
  return `₹${amount.toFixed(2)}`;
}

export { allRupeeCuts, formatRupees, rupeeStops };
export type { RupeeCut, RupeeStop };

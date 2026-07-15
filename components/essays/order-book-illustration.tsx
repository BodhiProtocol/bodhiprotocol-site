"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface OrderBookRow {
  bidQty: string;
  bidWidth: number;
  price: string;
  askWidth: number;
  askQty: string;
}

const rowsAboveMid: OrderBookRow[] = [
  { bidQty: "1,240", bidWidth: 62, price: "100.03", askWidth: 48, askQty: "1,120" },
  { bidQty: "980", bidWidth: 44, price: "100.02", askWidth: 60, askQty: "1,340" },
  { bidQty: "1,760", bidWidth: 78, price: "100.01", askWidth: 82, askQty: "1,890" },
];

const rowsBelowMid: OrderBookRow[] = [
  { bidQty: "3,210", bidWidth: 100, price: "99.99", askWidth: 87, askQty: "2,910" },
  { bidQty: "2,040", bidWidth: 64, price: "99.98", askWidth: 63, askQty: "2,120" },
  { bidQty: "1,530", bidWidth: 48, price: "99.97", askWidth: 42, askQty: "1,420" },
];

const sparkPoints = "0,22 12,19 24,20 36,12 48,15 60,7 72,10 84,4 100,5";

function OrderBookIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const barTransition = (delayMs: number) =>
    reducedMotion ? "none" : `width 650ms ease-out ${delayMs}ms`;

  const renderRow = (row: OrderBookRow, delayMs: number) => (
    <div key={row.price} className="grid grid-cols-[1fr_3.4rem_1fr] items-center gap-2 py-px">
      <div className="flex justify-end">
        <div
          className="flex h-[15px] items-center justify-start overflow-hidden rounded-[3px] bg-emerald-600 pl-1.5 text-[10px] font-semibold whitespace-nowrap text-white dark:bg-emerald-500"
          style={{
            width: played ? `${row.bidWidth}%` : "0%",
            minWidth: played ? "2.75rem" : 0,
            transition: barTransition(delayMs),
          }}
        >
          {row.bidQty}
        </div>
      </div>
      <span className="text-center text-muted-foreground">{row.price}</span>
      <div
        className="flex h-[15px] items-center justify-end overflow-hidden rounded-[3px] bg-rose-600 pr-1.5 text-[10px] font-semibold whitespace-nowrap text-white dark:bg-rose-500"
        style={{
          width: played ? `${row.askWidth}%` : "0%",
          minWidth: played ? "2.75rem" : 0,
          transition: barTransition(delayMs),
        }}
      >
        {row.askQty}
      </div>
    </div>
  );

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 grid grid-cols-[1fr_3.4rem_1fr] gap-2 text-[10px] font-bold tracking-wide">
        <span className="text-emerald-600 dark:text-emerald-500">BIDS</span>
        <span className="text-center text-muted-foreground">PRICE</span>
        <span className="text-right text-rose-600 dark:text-rose-500">ASKS</span>
      </div>

      {rowsAboveMid.map((row, i) => renderRow(row, i * 50))}

      <div className="my-1.5 grid grid-cols-[1fr_3.4rem_1fr] items-center gap-2 border-t border-b border-dashed border-border py-1.5">
        <span className="text-right text-[9px] font-bold tracking-wide text-brand">MID</span>
        <span className="text-center font-bold text-brand">100.00</span>
        <span className="text-[9px] font-bold tracking-wide text-brand">PRICE</span>
      </div>

      {rowsBelowMid.map((row, i) => renderRow(row, (rowsAboveMid.length + i) * 50))}

      <div className="mt-3.5 flex items-center justify-between gap-4">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          PRICE&nbsp;MOVEMENT
        </span>
        <svg viewBox="0 0 100 28" className="h-7 w-[100px] shrink-0" preserveAspectRatio="none">
          <polyline
            points={sparkPoints}
            fill="none"
            className="stroke-brand"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 220,
              strokeDashoffset: played ? 0 : 220,
              transition: reducedMotion ? "none" : "stroke-dashoffset 1s cubic-bezier(.16,1,.3,1) 850ms",
            }}
          />
          <circle
            cx="100"
            cy="5"
            r="3"
            className={
              played && !reducedMotion
                ? "fill-brand animate-[ob-pulse_2s_ease-out_2.1s_infinite]"
                : "fill-brand"
            }
            style={{
              opacity: played ? 1 : 0,
              transform: played ? "scale(1)" : "scale(0)",
              transformOrigin: "100px 5px",
              transition: reducedMotion
                ? "none"
                : "opacity 300ms ease 1750ms, transform 300ms cubic-bezier(.34,1.56,.64,1) 1750ms",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export { OrderBookIllustration };

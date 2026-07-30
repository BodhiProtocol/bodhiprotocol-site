function ReconciliationBreakPreview() {
  const rows = [
    ["Price", "2800.00", "2805.00"],
    ["Settle", "T+1", "T+2"],
    ["SSI", "HDFC-INR-42", "HDFC-INR-42"],
  ];

  return (
    <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-4 font-mono text-[10px] shadow-lg">
      <div className="mb-3 flex items-center justify-between text-[9px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
        <span>FO</span>
        <span>Break Scan</span>
        <span>BO</span>
      </div>
      <div className="space-y-2">
        {rows.map(([label, left, right], index) => {
          const broken = left !== right;
          return (
            <div
              key={label}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 py-2"
            >
              <span className="truncate text-card-foreground">{left}</span>
              <span
                className={
                  broken
                    ? "rounded-full bg-destructive/10 px-2 py-0.5 text-[8px] font-bold text-destructive"
                    : "rounded-full bg-brand/10 px-2 py-0.5 text-[8px] font-bold text-brand"
                }
              >
                {broken ? "BREAK" : "OK"}
              </span>
              <span className="truncate text-right text-card-foreground">{right}</span>
              <span className="col-span-3 text-[8px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                {index + 1}. {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ReconciliationBreakPreview };

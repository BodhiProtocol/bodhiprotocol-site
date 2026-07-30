function TradeLifecyclePreview() {
  const stages = ["Trade", "Match", "Clear", "Settle"];

  return (
    <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between font-mono text-[9px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
        <span>Lifecycle</span>
        <span>T+1</span>
      </div>
      <div className="relative">
        <div className="absolute top-4 right-4 left-4 h-px bg-border" />
        <div className="relative grid grid-cols-4 gap-2">
          {stages.map((stage, index) => (
            <div key={stage} className="flex flex-col items-center gap-2">
              <div
                className={
                  index < 3
                    ? "flex size-8 items-center justify-center rounded-full border border-brand bg-brand/10 font-mono text-[10px] font-bold text-brand"
                    : "flex size-8 items-center justify-center rounded-full border border-border bg-muted font-mono text-[10px] font-bold text-muted-foreground"
                }
              >
                {index + 1}
              </div>
              <span className="text-center font-mono text-[8px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                {stage}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 font-mono text-[9px] font-bold tracking-[0.12em] text-destructive uppercase">
        SSI exception at settlement
      </div>
    </div>
  );
}

export { TradeLifecyclePreview };

function CadTerminalPreview() {
  const rows = [
    { id: "ORD-4471", status: "New", tone: "bg-muted text-muted-foreground" },
    { id: "ORD-4472", status: "Partial", tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    { id: "TRD-8834", status: "Settled", tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-4 font-mono text-[10px] shadow-lg">
      <div className="mb-3 flex items-center justify-between text-[9px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
        <span>Blotter</span>
        <span>CAD Terminal</span>
      </div>
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 py-2"
          >
            <span className="truncate text-card-foreground">{row.id}</span>
            <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase ${row.tone}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CadTerminalPreview };

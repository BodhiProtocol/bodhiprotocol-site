interface ComparisonRow {
  cells: string[];
}

interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
}

// Small local table for narrative playbooks that walk through real
// comparison data (UAT vs. production, ask vs. confirm, option vs. use-when)
// rather than standalone tips. Wrapped in overflow-x-auto so wide rows scroll
// instead of breaking mobile layout.
function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {columns.map((column) => (
              <th
                key={column}
                className="px-3 py-2.5 font-mono text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index > 0 ? "border-t border-border" : undefined}>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2.5 align-top text-foreground/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ComparisonTable };
export type { ComparisonRow, ComparisonTableProps };

type MatchIndices = ReadonlyArray<readonly [number, number]>;

function HighlightedText({ text, indices }: { text: string; indices?: MatchIndices }) {
  if (!indices || indices.length === 0) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  indices.forEach(([start, end], i) => {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark key={i} className="rounded-sm bg-brand/20 text-brand">
        {text.slice(start, end + 1)}
      </mark>,
    );
    cursor = end + 1;
  });

  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}

export { HighlightedText };

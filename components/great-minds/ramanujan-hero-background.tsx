// Decorative, geometry-only motif — faint film-strip sprocket holes running
// down each edge, crossed by two frame-divider lines — evoking the negative
// diagram's filmstrip without reproducing the interactive diagram itself.
function RamanujanHeroBackground() {
  const holeYs = Array.from({ length: 12 }, (_, i) => 20 + i * 42);

  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      {holeYs.map((y) => (
        <rect key={`l-${y}`} x="26" y={y} width="10" height="16" rx="2" fill="currentColor" />
      ))}
      {holeYs.map((y) => (
        <rect key={`r-${y}`} x="764" y={y} width="10" height="16" rx="2" fill="currentColor" />
      ))}

      <line x1="260" y1="0" x2="260" y2="500" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 6" />
      <line x1="520" y1="0" x2="520" y2="500" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 6" />
    </svg>
  );
}

export { RamanujanHeroBackground };

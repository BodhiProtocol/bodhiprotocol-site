// Decorative, geometry-only motif: a telescoping row of frames shrinking
// left to right, evoking the product line's shrinking form factor without
// reproducing the hero diagram.
function MoritaHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="0" y1="400" x2="800" y2="400" stroke="currentColor" strokeWidth="0.75" />

      <rect x="60" y="220" width="180" height="180" rx="6" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="270" y="270" width="120" height="130" rx="5" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <rect x="420" y="310" width="80" height="90" rx="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <rect x="530" y="345" width="50" height="55" rx="3" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <rect x="610" y="368" width="26" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="0.6" />

      {Array.from({ length: 4 }, (_, i) => (
        <circle
          key={`wave-${i}`}
          cx="720"
          cy="384"
          r={20 + i * 16}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 5"
          opacity={0.55 - i * 0.1}
        />
      ))}

      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={`ripple-${i}`}
          x1={0}
          y1={420 + i * 14}
          x2={800}
          y2={420 + i * 14}
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="10 14"
          opacity={0.45 - i * 0.06}
        />
      ))}
    </svg>
  );
}

export { MoritaHeroBackground };

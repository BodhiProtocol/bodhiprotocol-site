// Decorative, geometry-only motif: a gantry crane over a hull waterline,
// evoking the Ulsan shipyard without reproducing the hero diagram.
function ChungHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="0" y1="340" x2="800" y2="340" stroke="currentColor" strokeWidth="0.75" />
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={`ripple-${i}`}
          x1={0}
          y1={360 + i * 16}
          x2={800}
          y2={360 + i * 16}
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="10 14"
          opacity={0.5 - i * 0.045}
        />
      ))}

      <path
        d="M540 340 L560 300 L700 300 L730 340 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <line x1="560" y1="300" x2="560" y2="240" stroke="currentColor" strokeWidth="1" />
      <line x1="500" y1="240" x2="640" y2="240" stroke="currentColor" strokeWidth="1" />
      <line x1="500" y1="240" x2="520" y2="270" stroke="currentColor" strokeWidth="0.6" />
      <line x1="640" y1="240" x2="600" y2="270" stroke="currentColor" strokeWidth="0.6" />
      <line x1="560" y1="255" x2="580" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />

      <line x1="150" y1="340" x2="150" y2="140" stroke="currentColor" strokeWidth="1" />
      <line x1="90" y1="150" x2="210" y2="150" stroke="currentColor" strokeWidth="1" />
      <line x1="150" y1="150" x2="150" y2="130" stroke="currentColor" strokeWidth="0.6" />
      <line x1="90" y1="150" x2="110" y2="180" stroke="currentColor" strokeWidth="0.5" />
      <line x1="210" y1="150" x2="190" y2="180" stroke="currentColor" strokeWidth="0.5" />
      <line x1="150" y1="160" x2="150" y2="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />

      <path
        d="M30 340 L60 300 L260 300 L280 340 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.6"
      />
    </svg>
  );
}

export { ChungHeroBackground };

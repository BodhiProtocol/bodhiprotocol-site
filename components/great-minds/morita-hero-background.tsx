// Decorative, geometry-only motif: a telescoping row of frames shrinking
// left to right, evoking the product line's shrinking form factor without
// reproducing the hero diagram. Kept to a compact footprint on the right
// side of the canvas (mirroring how the other Great Minds hero backgrounds
// stay clear of the text column once xMidYMid-slice scales the viewBox up
// to cover a wide hero) rather than spanning the full width.
function MoritaHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="540" y1="442" x2="780" y2="442" stroke="currentColor" strokeWidth="0.6" />

      <rect x="555" y="400" width="55" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <rect x="615" y="413" width="38" height="29" rx="3" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <rect x="658" y="424" width="24" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <rect x="687" y="431" width="14" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <rect x="706" y="435" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="0.5" />

      {Array.from({ length: 3 }, (_, i) => (
        <circle
          key={`wave-${i}`}
          cx="740"
          cy="438"
          r={6 + i * 7}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 5"
          opacity={0.55 - i * 0.12}
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
          opacity={0.4 - i * 0.05}
        />
      ))}
    </svg>
  );
}

export { MoritaHeroBackground };

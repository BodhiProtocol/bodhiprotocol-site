// Decorative, geometry-only motif (a faint horizontal race line with two
// converging lanes near the start) evoking the Photo Finish without
// duplicating the interactive hero diagram's detail.
function BellHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="440" y1="230" x2="480" y2="270" stroke="currentColor" strokeWidth="1.5" />
      <line x1="440" y1="310" x2="480" y2="270" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="480" y1="270" x2="760" y2="270" stroke="currentColor" strokeWidth="2" />
      <circle cx="480" cy="270" r="5" fill="currentColor" />
    </svg>
  );
}

export { BellHeroBackground };

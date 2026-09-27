// Decorative, geometry-only motif echoing the Cross diagram's shape — two
// lines converging to a point, then diverging again — without duplicating
// the interactive hero diagram's detail.
function BorlaugHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="480" y1="120" x2="620" y2="230" stroke="currentColor" strokeWidth="3" />
      <line x1="760" y1="120" x2="620" y2="230" stroke="currentColor" strokeWidth="3" />
      <line x1="620" y1="230" x2="620" y2="320" stroke="currentColor" strokeWidth="3" />
      <line x1="620" y1="320" x2="480" y2="420" stroke="currentColor" strokeWidth="3" />
      <line x1="620" y1="320" x2="760" y2="420" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export { BorlaugHeroBackground };

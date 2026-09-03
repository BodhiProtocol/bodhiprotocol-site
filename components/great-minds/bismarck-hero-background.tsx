// Decorative, geometry-only motif (a faint horizontal line with escalating
// then retreating station ticks, and a hatched zone at the end) evoking the
// Restraint Line without duplicating the interactive hero diagram's detail.
function BismarckHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="420" y1="270" x2="760" y2="270" stroke="currentColor" strokeWidth="2" />
      <line x1="460" y1="255" x2="460" y2="285" stroke="currentColor" strokeWidth="1.75" />
      <line x1="520" y1="255" x2="520" y2="285" stroke="currentColor" strokeWidth="1.75" />
      <line x1="580" y1="255" x2="580" y2="285" stroke="currentColor" strokeWidth="1.75" />
      <line x1="490" y1="255" x2="490" y2="285" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3" />
      <rect x="640" y="255" width="90" height="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  );
}

export { BismarckHeroBackground };

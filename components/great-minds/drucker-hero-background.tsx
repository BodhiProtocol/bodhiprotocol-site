// Decorative, geometry-only motif: a faint org-chart lattice (the corporate
// structure he spent his career studying) plus an echo of the hero loop
// diagram, without reproducing it exactly.
function DruckerHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="660" y1="90" x2="660" y2="140" stroke="currentColor" strokeWidth="0.5" />
      <line x1="600" y1="140" x2="720" y2="140" stroke="currentColor" strokeWidth="0.5" />
      <line x1="600" y1="140" x2="600" y2="190" stroke="currentColor" strokeWidth="0.5" />
      <line x1="660" y1="140" x2="660" y2="190" stroke="currentColor" strokeWidth="0.5" />
      <line x1="720" y1="140" x2="720" y2="190" stroke="currentColor" strokeWidth="0.5" />
      <rect x="642" y="70" width="36" height="20" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <rect x="582" y="190" width="36" height="20" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <rect x="642" y="190" width="36" height="20" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <rect x="702" y="190" width="36" height="20" fill="none" stroke="currentColor" strokeWidth="0.75" />

      <circle cx="120" cy="400" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx="120" cy="330" r="2.5" fill="currentColor" />
      <circle cx="184" cy="378" r="2.5" fill="currentColor" />
      <circle cx="163" cy="454" r="2.5" fill="currentColor" />
      <circle cx="77" cy="454" r="2.5" fill="currentColor" />
      <circle cx="56" cy="378" r="2.5" fill="currentColor" />

      <rect x="0" y="0" width="800" height="500" fill="none" stroke="currentColor" strokeWidth="0" />
    </svg>
  );
}

export { DruckerHeroBackground };

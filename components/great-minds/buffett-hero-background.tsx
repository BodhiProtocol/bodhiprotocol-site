// Decorative, geometry-only motif: a faint ledger grid (annual reports, the
// plain-spoken accounting he insisted on) plus a loose echo of the float
// loop's stadium curve, without reproducing the hero diagram exactly.
function BuffettHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="560" y="70" width="180" height="130" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <line x1="560" y1="96" x2="740" y2="96" stroke="currentColor" strokeWidth="0.5" />
      <line x1="560" y1="122" x2="740" y2="122" stroke="currentColor" strokeWidth="0.5" />
      <line x1="560" y1="148" x2="740" y2="148" stroke="currentColor" strokeWidth="0.5" />
      <line x1="560" y1="174" x2="740" y2="174" stroke="currentColor" strokeWidth="0.5" />
      <line x1="650" y1="70" x2="650" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 3" />

      <path
        d="M70,330 L230,330 A80,80 0 0 1 230,470 L70,470 A80,80 0 0 1 70,330 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 5"
      />
      <circle cx="150" cy="400" r="16" fill="none" stroke="currentColor" strokeWidth="0.6" />

      <rect x="0" y="0" width="800" height="500" fill="none" stroke="currentColor" strokeWidth="0" />
    </svg>
  );
}

export { BuffettHeroBackground };

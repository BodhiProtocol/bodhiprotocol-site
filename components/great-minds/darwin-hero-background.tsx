// Decorative, geometry-only motif (branching lines, node points) evoking
// the tree-of-life sketch without reproducing any specific illustration.
function DarwinHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="650" y1="480" x2="650" y2="360" stroke="currentColor" strokeWidth="1" />
      <path d="M650 360 Q 610 320 570 270" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M650 360 Q 690 320 730 270" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M570 270 Q 540 220 500 180" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <path d="M570 270 Q 590 220 610 175" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <path d="M730 270 Q 710 220 690 175" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <path d="M730 270 Q 760 225 790 190" fill="none" stroke="currentColor" strokeWidth="0.75" />

      <circle cx="650" cy="360" r="4" fill="currentColor" />
      <circle cx="570" cy="270" r="3" fill="currentColor" />
      <circle cx="730" cy="270" r="3" fill="currentColor" />
      <circle cx="500" cy="180" r="2.5" fill="currentColor" />
      <circle cx="610" cy="175" r="2.5" fill="currentColor" />
      <circle cx="690" cy="175" r="2.5" fill="currentColor" />
      <circle cx="790" cy="190" r="2.5" fill="currentColor" />

      <path
        d="M650 380 Q 600 400 560 420"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 4"
      />
      <circle cx="560" cy="420" r="2.5" fill="currentColor" />

      <line x1="30" y1="460" x2="230" y2="460" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      <line x1="60" y1="460" x2="60" y2="400" stroke="currentColor" strokeWidth="0.5" />
      <path d="M60 400 Q 30 370 10 340" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      <path d="M60 400 Q 90 370 110 335" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
    </svg>
  );
}

export { DarwinHeroBackground };

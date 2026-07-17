// Decorative, geometry-only motif (circle-in-square, construction lines) evoking
// Leonardo's technical-drawing style without reproducing any specific sketch.
function LeonardoHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="560" y="40" width="180" height="180" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="650" cy="130" r="104" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="546" y1="130" x2="754" y2="130" stroke="currentColor" strokeWidth="0.5" />
      <line x1="650" y1="26" x2="650" y2="234" stroke="currentColor" strokeWidth="0.5" />

      <circle cx="70" cy="420" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="70" cy="420" r="36" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <line x1="10" y1="420" x2="130" y2="420" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="70" y1="360" x2="70" y2="480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

      <path
        d="M120 60 Q 160 20 210 55 T 300 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 3"
      />
      <path
        d="M600 420 Q 650 460 700 430 T 780 445"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 3"
      />
    </svg>
  );
}

export { LeonardoHeroBackground };

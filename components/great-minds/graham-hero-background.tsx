// Decorative, geometry-only motif (a faint spiral echo, proofreader's cut
// marks, construction lines) evoking editing and compression without
// reproducing any specific diagram — same "construction lines, not artwork"
// convention as every other Great Minds hero background.
function GrahamHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M650 130 m0,-95 a95,95 0 1,1 -67,161 a67,67 0 1,1 47,-114 a40,40 0 1,1 -28,68"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="650" cy="130" r="4" fill="currentColor" />

      <path d="M40 420 L 60 400 M40 400 L 60 420" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="70" y1="410" x2="180" y2="410" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      <path d="M120 440 L 140 420 M120 420 L 140 440" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      <rect x="600" y="380" width="120" height="90" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="600" y1="425" x2="720" y2="425" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

      <path
        d="M220 60 Q 260 20 310 55 T 400 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 3"
      />
      <path
        d="M180 470 Q 220 440 270 465"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 3"
      />
    </svg>
  );
}

export { GrahamHeroBackground };

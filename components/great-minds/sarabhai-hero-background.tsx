// Decorative, geometry-only motif (ladder rails with gapped rungs, a bowed
// leap arc) echoing the hero diagram without duplicating it.
function SarabhaiHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="640" y1="40" x2="640" y2="460" stroke="currentColor" strokeWidth="1" />
      <line x1="700" y1="40" x2="700" y2="460" stroke="currentColor" strokeWidth="1" />
      <line x1="640" y1="70" x2="700" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="640" y1="430" x2="700" y2="430" stroke="currentColor" strokeWidth="1.5" />
      <line x1="640" y1="180" x2="700" y2="180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 5" />
      <line x1="640" y1="320" x2="700" y2="320" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 5" />

      <path
        d="M 670 70 C 770 180, 770 320, 670 430"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 4"
      />
      <circle cx="670" cy="70" r="4" fill="currentColor" />
      <circle cx="670" cy="430" r="4" fill="currentColor" />

      <rect x="60" y="380" width="140" height="90" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="60" y1="410" x2="200" y2="410" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="60" y1="440" x2="200" y2="440" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

      <path
        d="M 130 60 Q 170 20 220 55 T 310 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 3"
      />
    </svg>
  );
}

export { SarabhaiHeroBackground };

// Decorative, geometry-only motif — two diagonal lines crossing at a point,
// echoing the Intersection diagram without reproducing it.
function JobsHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="480" y1="120" x2="650" y2="290" stroke="currentColor" strokeWidth="1" />
      <line x1="820" y1="120" x2="650" y2="290" stroke="currentColor" strokeWidth="1" />
      <line x1="480" y1="460" x2="650" y2="290" stroke="currentColor" strokeWidth="1" />
      <line x1="820" y1="460" x2="650" y2="290" stroke="currentColor" strokeWidth="1" />

      <circle cx="650" cy="290" r="4" fill="currentColor" />
      <circle cx="480" cy="120" r="2.5" fill="currentColor" />
      <circle cx="820" cy="120" r="2.5" fill="currentColor" />
      <circle cx="480" cy="460" r="2.5" fill="currentColor" />
      <circle cx="820" cy="460" r="2.5" fill="currentColor" />

      <line x1="30" y1="60" x2="140" y2="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      <line x1="230" y1="60" x2="140" y2="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      <circle cx="140" cy="140" r="2" fill="currentColor" />
    </svg>
  );
}

export { JobsHeroBackground };

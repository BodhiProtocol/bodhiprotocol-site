// Decorative, geometry-only motif (the corner of a ruled prescription card
// with a few filled lines) evoking the Prescription without duplicating the
// interactive hero diagram's detail.
function BuddhaHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="560" y="360" width="200" height="130" rx="10" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="580" y1="395" x2="740" y2="395" stroke="currentColor" strokeWidth="3" />
      <line x1="580" y1="425" x2="700" y2="425" stroke="currentColor" strokeWidth="3" strokeDasharray="6 8" />
      <line x1="580" y1="455" x2="720" y2="455" stroke="currentColor" strokeWidth="3" strokeDasharray="6 8" />
    </svg>
  );
}

export { BuddhaHeroBackground };

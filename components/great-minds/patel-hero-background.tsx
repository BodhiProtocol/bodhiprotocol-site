// Decorative, geometry-only motif (scattered faint squares converging
// toward one point) evoking the integration of separate princely states
// without duplicating the interactive hero diagram's detail.
function PatelHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="500" y="140" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="560" y="110" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="640" y="150" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="700" y="120" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="511" y1="162" x2="620" y2="290" stroke="currentColor" strokeWidth="0.75" />
      <line x1="568" y1="126" x2="620" y2="290" stroke="currentColor" strokeWidth="0.75" />
      <line x1="650" y1="170" x2="620" y2="290" stroke="currentColor" strokeWidth="0.75" />
      <line x1="707" y1="134" x2="620" y2="290" stroke="currentColor" strokeWidth="0.75" />
      <rect x="580" y="280" width="80" height="34" rx="6" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export { PatelHeroBackground };

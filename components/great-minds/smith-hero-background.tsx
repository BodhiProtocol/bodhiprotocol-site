// Decorative, geometry-only motif: a faint ledger-and-scale motif evoking
// trade and exchange, without reproducing the hero diagram itself.
function SmithHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="660" y1="90" x2="660" y2="150" stroke="currentColor" strokeWidth="0.6" />
      <line x1="590" y1="120" x2="730" y2="120" stroke="currentColor" strokeWidth="0.6" />
      <path d="M 590 120 L 570 170 A 24 20 0 0 0 610 170 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <path d="M 730 120 L 710 170 A 24 20 0 0 0 750 170 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <line x1="620" y1="200" x2="700" y2="200" stroke="currentColor" strokeWidth="0.75" />

      <pattern id="smith-ledger-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M30 0 L0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </pattern>
      <rect x="60" y="340" width="220" height="130" fill="url(#smith-ledger-grid)" opacity="0.5" />
      <rect x="60" y="340" width="220" height="130" fill="none" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export { SmithHeroBackground };

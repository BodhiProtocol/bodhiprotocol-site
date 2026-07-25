// Decorative, geometry-only motif (a faint institutional grid crossed by a
// single large ring) evoking a balance sheet folded into a circuit, without
// reproducing the interactive five-node loop diagram itself.
function TataHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="tata-ledger" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0 L0 0 0 34" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="800" height="500" fill="url(#tata-ledger)" opacity="0.45" />

      <circle cx="640" cy="180" r="130" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 5" />
      <circle cx="640" cy="180" r="4" fill="currentColor" />

      <rect x="60" y="330" width="170" height="110" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="60" y1="365" x2="230" y2="365" stroke="currentColor" strokeWidth="0.4" />
      <line x1="60" y1="400" x2="230" y2="400" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export { TataHeroBackground };

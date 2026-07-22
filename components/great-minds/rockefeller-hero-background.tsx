// Decorative, geometry-only motif (ledger grid + gauge dials) evoking his
// bookkeeping habit and the refinery floor, without reproducing the hero
// diagram itself.
function RockefellerHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="rockefeller-ledger" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0 L0 0 0 34" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="800" height="500" fill="url(#rockefeller-ledger)" opacity="0.5" />

      <circle cx="660" cy="140" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="660" cy="140" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <line x1="660" y1="70" x2="660" y2="210" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
      <line x1="660" y1="140" x2="710" y2="105" stroke="currentColor" strokeWidth="0.75" />

      <circle cx="660" cy="140" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" />

      <rect x="50" y="380" width="140" height="90" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="50" y1="405" x2="190" y2="405" stroke="currentColor" strokeWidth="0.4" />
      <line x1="50" y1="430" x2="190" y2="430" stroke="currentColor" strokeWidth="0.4" />
      <line x1="50" y1="455" x2="190" y2="455" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export { RockefellerHeroBackground };

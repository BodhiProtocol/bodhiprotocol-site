// Decorative, geometry-only motif: ruled ledger-page lines plus a stylized
// composing stick / type-block, evoking the printer's trade and the private
// notebook without reproducing the hero diagram itself.
function FranklinHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1="560"
          y1={70 + i * 22}
          x2="740"
          y2={70 + i * 22}
          stroke="currentColor"
          strokeWidth="0.5"
        />
      ))}
      <line x1="590" y1="60" x2="590" y2="270" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />

      <rect x="60" y="360" width="150" height="26" fill="none" stroke="currentColor" strokeWidth="0.75" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={64 + i * 12} y="364" width="8" height="18" fill="currentColor" opacity="0.5" />
      ))}
      <line x1="60" y1="398" x2="210" y2="398" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
    </svg>
  );
}

export { FranklinHeroBackground };

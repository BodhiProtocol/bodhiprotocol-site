// Decorative, geometry-only motif (faint concentric ripples and a scatter of
// small dots evoking a specimen under glass) without reproducing the hero
// diagram itself.
function CurieHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="660" cy="140" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="660" cy="140" r="40" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" />
      <circle cx="660" cy="140" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      <circle cx="660" cy="140" r="4" fill="currentColor" />

      <circle cx="120" cy="420" r="1.5" fill="currentColor" />
      <circle cx="160" cy="440" r="1" fill="currentColor" />
      <circle cx="90" cy="450" r="1" fill="currentColor" />
      <circle cx="200" cy="410" r="1.5" fill="currentColor" />
      <circle cx="740" cy="380" r="1" fill="currentColor" />
      <circle cx="710" cy="410" r="1" fill="currentColor" />
    </svg>
  );
}

export { CurieHeroBackground };

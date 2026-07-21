// Decorative, geometry-only motif (a faint dot-grid and a soft oversized
// funnel silhouette in one corner) evoking Think Week's reading pile
// without reproducing the hero diagram itself.
function GatesHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="gates-dots" width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="800" height="500" fill="url(#gates-dots)" opacity="0.6" />

      <line x1="560" y1="40" x2="740" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <line x1="560" y1="40" x2="650" y2="220" stroke="currentColor" strokeWidth="1" />
      <line x1="740" y1="40" x2="650" y2="220" stroke="currentColor" strokeWidth="1" />
      <line x1="650" y1="220" x2="650" y2="260" stroke="currentColor" strokeWidth="1" />

      <rect x="60" y="380" width="60" height="44" rx="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <rect x="76" y="368" width="60" height="44" rx="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <rect x="92" y="356" width="60" height="44" rx="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export { GatesHeroBackground };

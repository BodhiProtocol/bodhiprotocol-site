// Decorative, geometry-only motif: a faint architect's blueprint grid crossed
// by a single horizontal founding line with a few rising markers — evoking a
// town plan sketched before the funding existed, without reproducing the
// interactive timeline diagram itself.
function JamsetjiHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="jamsetji-blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="800" height="500" fill="url(#jamsetji-blueprint)" opacity="0.4" />

      <line x1="120" y1="360" x2="700" y2="360" stroke="currentColor" strokeWidth="0.75" />
      <line x1="340" y1="330" x2="340" y2="390" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

      <line x1="180" y1="360" x2="180" y2="300" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="180" cy="292" r="5" fill="none" stroke="currentColor" strokeWidth="0.75" />

      <line x1="460" y1="360" x2="460" y2="270" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="460" cy="260" r="5" fill="none" stroke="currentColor" strokeWidth="0.75" />

      <line x1="560" y1="360" x2="560" y2="250" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="560" cy="240" r="5" fill="none" stroke="currentColor" strokeWidth="0.75" />

      <line x1="620" y1="360" x2="620" y2="230" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="620" cy="220" r="5" fill="none" stroke="currentColor" strokeWidth="0.75" />

      <rect x="120" y="410" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
      <rect x="200" y="410" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
    </svg>
  );
}

export { JamsetjiHeroBackground };

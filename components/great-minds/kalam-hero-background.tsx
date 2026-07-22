// Decorative, geometry-only motif (an ascent trajectory arc, a small triangular
// nose silhouette, and scattered stars) evoking spaceflight and the night sky
// without reproducing the hero diagram itself.
function KalamHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M60 460 Q 420 380 620 120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <g transform="translate(620 120) rotate(-35)">
        <path d="M0 -18 L10 10 L-10 10 Z" fill="currentColor" opacity="0.7" />
      </g>
      <circle cx="60" cy="460" r="4" fill="currentColor" />

      <circle cx="700" cy="70" r="1.5" fill="currentColor" />
      <circle cx="740" cy="140" r="1" fill="currentColor" />
      <circle cx="670" cy="180" r="1" fill="currentColor" />
      <circle cx="150" cy="90" r="1" fill="currentColor" />
      <circle cx="220" cy="60" r="1.5" fill="currentColor" />
      <circle cx="90" cy="150" r="1" fill="currentColor" />
    </svg>
  );
}

export { KalamHeroBackground };

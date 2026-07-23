// Decorative, geometry-only motif (a Roman arch silhouette and a scattering
// of night-sky stars, evoking a tent on campaign and the "view from above")
// without reproducing the hero diagram itself.
function MarcusAureliusHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M90 460 L90 300 A90 90 0 0 1 270 300 L270 460"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line x1="70" y1="460" x2="290" y2="460" stroke="currentColor" strokeWidth="1" />

      <circle cx="700" cy="70" r="1.5" fill="currentColor" />
      <circle cx="740" cy="140" r="1" fill="currentColor" />
      <circle cx="670" cy="180" r="1" fill="currentColor" />
      <circle cx="600" cy="90" r="1" fill="currentColor" />
      <circle cx="630" cy="230" r="1.5" fill="currentColor" />
      <circle cx="750" cy="220" r="1" fill="currentColor" />
      <circle cx="560" cy="150" r="1" fill="currentColor" />
    </svg>
  );
}

export { MarcusAureliusHeroBackground };

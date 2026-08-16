// Decorative, geometry-only motif — a milk churn silhouette and a scattering
// of small circles evoking droplets, without reproducing the pyramid
// diagram itself.
function KurienHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M120 460 L120 340 Q120 300 160 300 L200 300 Q240 300 240 340 L240 460"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse cx="180" cy="300" rx="60" ry="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="180" y1="270" x2="180" y2="300" stroke="currentColor" strokeWidth="1" />
      <line x1="100" y1="460" x2="260" y2="460" stroke="currentColor" strokeWidth="1" />

      <circle cx="680" cy="90" r="2" fill="currentColor" />
      <circle cx="710" cy="140" r="1.4" fill="currentColor" />
      <circle cx="650" cy="160" r="1.4" fill="currentColor" />
      <circle cx="730" cy="200" r="1.8" fill="currentColor" />
      <circle cx="660" cy="230" r="1.2" fill="currentColor" />
    </svg>
  );
}

export { KurienHeroBackground };

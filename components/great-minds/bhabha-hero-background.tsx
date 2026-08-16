// Decorative, geometry-only motif — a Bohr-style atom orbit (electron shells
// around a nucleus) paired with a faint skyline of institute-building
// silhouettes, evoking TIFR/BARC without reproducing the relay diagram.
function BhabhaHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="180" cy="380" r="3" fill="currentColor" />
      <ellipse cx="180" cy="380" rx="70" ry="26" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse
        cx="180"
        cy="380"
        rx="70"
        ry="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(60 180 380)"
      />
      <ellipse
        cx="180"
        cy="380"
        rx="70"
        ry="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(120 180 380)"
      />

      <rect x="620" y="300" width="40" height="160" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="668" y="340" width="30" height="120" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="706" y="270" width="34" height="190" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="610" y1="460" x2="750" y2="460" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export { BhabhaHeroBackground };

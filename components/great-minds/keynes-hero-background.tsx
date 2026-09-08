// Decorative, geometry-only motif: faint concentric ripples (spending
// recirculating through an economy) paired with a simple rising trend line,
// without reproducing the hero diagram itself.
function KeynesHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="650" cy="140" r="30" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="650" cy="140" r="55" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="650" cy="140" r="80" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="650" cy="140" r="105" fill="none" stroke="currentColor" strokeWidth="0.3" />

      <polyline
        points="60,440 130,420 200,430 270,380 340,395 410,340 480,355 550,300"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="550" cy="300" r="3" fill="currentColor" />

      <pattern id="keynes-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M30 0 L0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </pattern>
      <rect x="60" y="60" width="200" height="120" fill="url(#keynes-grid)" opacity="0.4" />
    </svg>
  );
}

export { KeynesHeroBackground };

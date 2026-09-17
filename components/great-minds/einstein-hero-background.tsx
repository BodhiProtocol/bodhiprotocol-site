// Decorative, geometry-only motif: a faint warped-grid echo plus scattered
// starfield dots, evoking curved spacetime without reproducing the hero
// diagram itself.
function EinsteinHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      {[120, 160, 200, 240].map((baseY) => (
        <path
          key={baseY}
          d={`M 480 ${baseY} Q 660 ${baseY + 50} 780 ${baseY}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      ))}
      <circle cx="660" cy="185" r="6" fill="currentColor" opacity="0.5" />

      {[
        [80, 380], [130, 420], [170, 360], [220, 440], [260, 390],
        [95, 440], [200, 400], [150, 470],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.3" fill="currentColor" opacity="0.5" />
      ))}
    </svg>
  );
}

export { EinsteinHeroBackground };

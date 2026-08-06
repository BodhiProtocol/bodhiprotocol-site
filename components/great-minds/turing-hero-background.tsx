// Decorative, geometry-only motif: a faint rotor-and-cipher-wheel cluster
// evoking Enigma, plus a row of binary-looking tick marks evoking the tape,
// without reproducing the hero diagram itself.
function TuringHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      {[600, 660, 720].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy={140 + i * 4} r="42" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx={cx} cy={140 + i * 4} r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {Array.from({ length: 8 }, (_, j) => {
            const angle = (j * 45 * Math.PI) / 180;
            const x = cx + 42 * Math.cos(angle);
            const y = 140 + i * 4 + 42 * Math.sin(angle);
            return <circle key={j} cx={x} cy={y} r="1.4" fill="currentColor" opacity="0.6" />;
          })}
        </g>
      ))}

      <line x1="60" y1="400" x2="320" y2="400" stroke="currentColor" strokeWidth="0.6" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={64 + i * 18} y="390" width="10" height="20" fill="none" stroke="currentColor" strokeWidth="0.4" />
      ))}
    </svg>
  );
}

export { TuringHeroBackground };

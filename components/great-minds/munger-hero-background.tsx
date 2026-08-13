// Decorative, geometry-only motif: a pilot-style pre-flight checklist block
// (his own analogy for the discipline) plus a faint law-book stack, without
// reproducing the hero's lens diagram itself.
function MungerHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="560" y="60" width="180" height="220" fill="none" stroke="currentColor" strokeWidth="0.6" />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x="576" y={84 + i * 32} width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {i % 2 === 0 ? (
            <path
              d={`M578,${89 + i * 32} L582,${93 + i * 32} L586,${85 + i * 32}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          ) : null}
          <line
            x1="598"
            y1={89 + i * 32}
            x2="720"
            y2={89 + i * 32}
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </g>
      ))}

      <rect x="60" y="380" width="150" height="14" fill="currentColor" opacity="0.4" />
      <rect x="70" y="366" width="150" height="14" fill="currentColor" opacity="0.3" />
      <rect x="80" y="352" width="150" height="14" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export { MungerHeroBackground };

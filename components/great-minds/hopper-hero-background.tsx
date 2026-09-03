// Decorative, geometry-only motif (faint text bars, a bowtie gate, and a
// binary tick grid) evoking the Compiler diagram without duplicating the
// interactive hero diagram's detail.
function HopperHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="480" y1="230" x2="560" y2="230" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="480" y1="245" x2="540" y2="245" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M 610,215 L 640,245 L 610,275 Z M 670,215 L 640,245 L 670,275 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={700 + col * 22}
            y={225 + row * 22}
            width={14}
            height={14}
            fill={(row + col) % 2 === 0 ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1"
          />
        )),
      )}
    </svg>
  );
}

export { HopperHeroBackground };

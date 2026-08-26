// Decorative, geometry-only motif: a faint supermarket-shelf grid (the
// everyday storefront where his research started) with a rising ticker line
// cutting across it (where the research ended up), without reproducing the
// hero's basket-fan diagram itself.
function LynchHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <rect
            key={`${row}-${col}`}
            x={560 + col * 34}
            y={70 + row * 46}
            width="26"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        )),
      )}
      <line x1="556" y1="66" x2="726" y2="66" stroke="currentColor" strokeWidth="0.8" />

      <polyline
        points="60,420 160,404 240,430 320,360 400,392 480,300 560,338 640,246"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.5"
      />
      {[
        [60, 420],
        [240, 430],
        [400, 392],
        [560, 338],
        [640, 246],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="currentColor" opacity="0.4" />
      ))}
    </svg>
  );
}

export { LynchHeroBackground };

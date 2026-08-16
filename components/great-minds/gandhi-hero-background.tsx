// Decorative, geometry-only motif — a hand-woven khadi weave (the crossed
// warp/weft of hand-spun cloth Gandhi promoted as Swadeshi's daily,
// personal act), evoking the material without reproducing the hero's
// spinning-wheel diagram itself.
function GandhiHeroBackground() {
  const warp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => 60 + index * 74);
  const weft = [0, 1, 2, 3, 4, 5].map((index) => 60 + index * 76);

  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      {warp.map((x) => (
        <line key={`warp-${x}`} x1={x} y1="30" x2={x} y2="470" stroke="currentColor" strokeWidth="1" />
      ))}
      {weft.map((y) => (
        <line key={`weft-${y}`} x1="20" y1={y} x2="780" y2={y} stroke="currentColor" strokeWidth="1" />
      ))}

      <circle cx="700" cy="70" r="1.5" fill="currentColor" />
      <circle cx="650" cy="140" r="1" fill="currentColor" />
      <circle cx="730" cy="170" r="1" fill="currentColor" />
    </svg>
  );
}

export { GandhiHeroBackground };

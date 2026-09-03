// Decorative, geometry-only motif (a faint horizontal beam resting on
// evenly spaced vertical pillars) evoking the load-bearing Constitution
// without duplicating the interactive hero diagram's detail.
function AmbedkarHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="470" y1="330" x2="760" y2="330" stroke="currentColor" strokeWidth="2" />
      <line x1="450" y1="180" x2="780" y2="180" stroke="currentColor" strokeWidth="2.5" />
      {[490, 550, 610, 670, 730].map((x) => (
        <line key={x} x1={x} y1="180" x2={x} y2="330" stroke="currentColor" strokeWidth="1.75" />
      ))}
    </svg>
  );
}

export { AmbedkarHeroBackground };

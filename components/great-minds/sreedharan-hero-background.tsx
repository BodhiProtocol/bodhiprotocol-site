// Decorative, geometry-only motif (a faint horizontal rail line with tie
// ticks and a trailing dashed "deadline" marker) evoking the Reverse-Engineered
// Timeline without duplicating the interactive hero diagram's detail.
function SreedharanHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="420" y1="300" x2="780" y2="300" stroke="currentColor" strokeWidth="2" />
      {Array.from({ length: 13 }, (_, i) => 440 + i * 28).map((x) => (
        <line key={x} x1={x} y1="290" x2={x} y2="310" stroke="currentColor" strokeWidth="1.5" />
      ))}
      <line x1="640" y1="255" x2="640" y2="292" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="700" y1="230" x2="700" y2="292" stroke="currentColor" strokeWidth="2" />
      <circle cx="700" cy="222" r="5" fill="currentColor" />
    </svg>
  );
}

export { SreedharanHeroBackground };

// Decorative, geometry-only motif — a bound bundle of bamboo strips (jiǎn),
// the medium Confucian texts were transmitted on for centuries before paper,
// evoking the source material without reproducing the hero diagram itself.
function ConfuciusHeroBackground() {
  const strips = [0, 1, 2, 3, 4, 5, 6, 7].map((index) => ({
    x: 90 + index * 22,
    height: 260 + (index % 3) * 30,
  }));

  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      {strips.map((strip) => (
        <rect
          key={strip.x}
          x={strip.x}
          y={420 - strip.height}
          width="10"
          height={strip.height}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
      <line x1="70" y1="200" x2="270" y2="200" stroke="currentColor" strokeWidth="1" />
      <line x1="70" y1="340" x2="270" y2="340" stroke="currentColor" strokeWidth="1" />

      <circle cx="700" cy="80" r="1.5" fill="currentColor" />
      <circle cx="650" cy="150" r="1" fill="currentColor" />
      <circle cx="730" cy="180" r="1" fill="currentColor" />
      <circle cx="600" cy="110" r="1" fill="currentColor" />
    </svg>
  );
}

export { ConfuciusHeroBackground };

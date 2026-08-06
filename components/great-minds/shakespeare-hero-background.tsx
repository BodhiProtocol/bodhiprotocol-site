// Decorative, geometry-only motif: a faint polygonal amphitheater outline
// plus a quill-stroke flourish, evoking the Globe without reproducing the
// hero diagram itself.
function ShakespeareHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const cx = 650;
        const cy = 170;
        const r1 = 60;
        const r2 = 100;
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(angle)}
            y1={cy + r1 * Math.sin(angle)}
            x2={cx + r2 * Math.cos(angle)}
            y2={cy + r2 * Math.sin(angle)}
            stroke="currentColor"
            strokeWidth="0.4"
          />
        );
      })}
      <circle cx="650" cy="170" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="650" cy="170" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />

      <path
        d="M 80 400 C 120 380, 140 420, 180 400 C 220 380, 240 420, 280 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export { ShakespeareHeroBackground };

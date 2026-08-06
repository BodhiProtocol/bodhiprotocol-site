// Decorative, geometry-only motif: a faint terrain-contour map plus a
// compass-rose glyph, evoking terrain assessment and pre-battle calculation
// without reproducing the hero diagram itself.
function SunTzuHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M 520 60 C 620 90, 680 150, 660 220 C 640 290, 560 300, 560 360 C 560 410, 620 430, 600 470"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M 580 40 C 680 80, 730 150, 710 230 C 690 310, 600 320, 600 380"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M 640 30 C 730 70, 770 140, 750 220"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />

      <circle cx="130" cy="400" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 3" />
      <line x1="130" y1="345" x2="130" y2="455" stroke="currentColor" strokeWidth="0.4" />
      <line x1="75" y1="400" x2="185" y2="400" stroke="currentColor" strokeWidth="0.4" />
      <path d="M130,345 L136,365 L124,365 Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export { SunTzuHeroBackground };

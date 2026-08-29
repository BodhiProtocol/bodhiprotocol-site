// Decorative, geometry-only motif: loose scattered propagator lines and
// vertex dots, evoking the diagram notation without reproducing the exact
// five-vertex hero diagram itself.
function FeynmanHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M 500,120 L 560,150 L 620,120" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M 560,150 Q 585,120 610,150 Q 635,180 660,150"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M 610,300 L 670,330 L 730,300" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M 490,340 Q 515,315 540,340 Q 565,365 590,340"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {[
        [500, 120], [620, 120], [560, 150], [660, 150],
        [610, 300], [730, 300], [490, 340], [590, 340],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" opacity="0.5" />
      ))}
    </svg>
  );
}

export { FeynmanHeroBackground };

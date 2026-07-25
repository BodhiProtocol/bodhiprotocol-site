// Decorative, geometry-only night-sky field — scattered points only, no
// connecting lines, so it sets atmosphere behind the foreground Orbit
// diagram without duplicating its structure. Coordinates are hand-authored
// (not Math.random) so server and client render identically.
const STAR_POINTS: { cx: number; cy: number; r: number }[] = [
  { cx: 60, cy: 40, r: 1.6 },
  { cx: 140, cy: 90, r: 1.1 },
  { cx: 210, cy: 55, r: 1.4 },
  { cx: 300, cy: 120, r: 1 },
  { cx: 380, cy: 60, r: 1.7 },
  { cx: 460, cy: 100, r: 1.2 },
  { cx: 540, cy: 45, r: 1.3 },
  { cx: 620, cy: 130, r: 1 },
  { cx: 700, cy: 70, r: 1.5 },
  { cx: 90, cy: 200, r: 1.2 },
  { cx: 190, cy: 250, r: 1 },
  { cx: 260, cy: 190, r: 1.6 },
  { cx: 340, cy: 280, r: 1.1 },
  { cx: 420, cy: 210, r: 1.4 },
  { cx: 500, cy: 260, r: 1 },
  { cx: 590, cy: 220, r: 1.3 },
  { cx: 680, cy: 270, r: 1.6 },
  { cx: 750, cy: 190, r: 1.1 },
  { cx: 120, cy: 360, r: 1.3 },
  { cx: 230, cy: 400, r: 1 },
  { cx: 330, cy: 350, r: 1.5 },
  { cx: 420, cy: 420, r: 1.1 },
  { cx: 520, cy: 370, r: 1.2 },
  { cx: 610, cy: 410, r: 1.6 },
  { cx: 700, cy: 350, r: 1 },
  { cx: 40, cy: 300, r: 1.2 },
  { cx: 760, cy: 430, r: 1.3 },
];

function JrdHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.1]"
      preserveAspectRatio="xMidYMid slice"
    >
      {STAR_POINTS.map((point, index) => (
        <circle key={index} cx={point.cx} cy={point.cy} r={point.r} fill="currentColor" />
      ))}
    </svg>
  );
}

export { JrdHeroBackground };

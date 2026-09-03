// Decorative, geometry-only motif (a faint triangle of three checking
// branches) evoking the Checking Triangle without duplicating the
// interactive hero diagram's detail.
function MadisonHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <polygon points="640,150 560,300 720,300" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="640" cy="150" r="7" fill="currentColor" />
      <circle cx="560" cy="300" r="7" fill="currentColor" />
      <circle cx="720" cy="300" r="7" fill="currentColor" />
    </svg>
  );
}

export { MadisonHeroBackground };

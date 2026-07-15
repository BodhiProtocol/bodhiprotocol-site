function LighthouseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M10 3h4l2 5H8l2-5Z" className="fill-brand-foreground" />
      <path d="M8 8h8l1.5 13h-11L8 8Z" className="fill-brand-foreground" />
      <path d="M9.2 12h5.6M8.6 16h6.8" stroke="var(--brand)" strokeWidth="1.2" />
    </svg>
  );
}

export { LighthouseGlyph };

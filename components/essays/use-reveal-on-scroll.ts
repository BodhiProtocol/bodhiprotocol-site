"use client";

import * as React from "react";

function useRevealOnScroll() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [played, setPlayed] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    if (query.matches) {
      setPlayed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, played, reducedMotion };
}

export { useRevealOnScroll };

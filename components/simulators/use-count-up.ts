"use client";

import * as React from "react";

function useCountUp(value: number, duration = 600) {
  const [display, setDisplay] = React.useState(value);
  const displayRef = React.useRef(value);

  React.useEffect(() => {
    const from = displayRef.current;
    const to = value;
    if (from === to) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      displayRef.current = to;
      setDisplay(to);
      return;
    }

    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      displayRef.current = current;
      setDisplay(current);
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}

export { useCountUp };

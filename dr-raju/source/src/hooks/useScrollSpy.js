import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the sticky nav can mark it.
 *
 * Scroll-position based rather than IntersectionObserver: several sections are
 * far taller than the viewport, so a ratio/intersection observer keeps firing
 * for a section the reader has already scrolled past, and the nav ends up
 * highlighting the wrong item. This picks the last section whose top has
 * crossed the reading line, which is stable regardless of section height.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line) current = id;
      }

      // At the very bottom of the page the last sections may never reach the
      // reading line, so pin the final entry once the footer is in view.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = ids[ids.length - 1];
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return activeId;
}
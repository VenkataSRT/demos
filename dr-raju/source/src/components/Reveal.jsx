import { useEffect, useRef } from "react";

/**
 * Reveals children once, the first time they scroll into view.
 *
 * Deliberately a CSS transition on a data attribute rather than a keyframe
 * animation: transitions are interruptible, so a reader who scrolls fast sees
 * content settle rather than snap (Emil, CSS Transitions vs Keyframes).
 *
 * Safety: `data-reveal` is only ever set from JS, and the hiding rule is scoped
 * to `.js`. With JavaScript unavailable the attribute is never written and every
 * element renders visible — no invisible content, no FOUC.
 */
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.setAttribute("data-revealed", "true");

    // No observer, or reduced motion requested: show immediately, no transition.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reveal();
      return;
    }

    el.setAttribute("data-reveal", "");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        io.disconnect(); // once per element, never re-animates
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
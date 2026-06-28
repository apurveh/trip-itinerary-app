import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}

export default function Reveal({ children, delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Start in the "to-animate" state only if we can observe; otherwise stay visible.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    setArmed(true); // we CAN animate, so begin hidden then reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      // forgiving: fire as soon as the top edge enters, even for tall elements
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    // Safety net: if nothing fired within 1s (e.g. already on-screen, tall), show anyway.
    const t = window.setTimeout(() => setShown(true), 1000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const cls = armed ? `reveal-anim ${shown ? "in" : ""}` : "reveal";
  return (
    <div ref={ref} className={cls} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

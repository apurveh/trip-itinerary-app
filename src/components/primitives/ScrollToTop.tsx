import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="btn"
      style={{
        position: "fixed",
        right: 22,
        bottom: 22,
        zIndex: 60,
        padding: "12px 14px",
        borderRadius: 0,
      }}
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  );
}

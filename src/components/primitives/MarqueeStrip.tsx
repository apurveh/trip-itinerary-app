interface MarqueeStripProps {
  items: string[];
  bg?: string;
  color?: string;
}

export default function MarqueeStrip({
  items,
  bg = "var(--wine)",
  color = "var(--cream)",
}: MarqueeStripProps) {
  return (
    <div
      style={{
        background: bg,
        color,
        padding: "10px 0",
        borderTop: "2px solid var(--ink)",
        borderBottom: "2px solid var(--ink)",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          animation: "marquee 38s linear infinite",
          gap: 40,
        }}
      >
        {[...items, ...items, ...items].map((it, i) => (
          <span
            key={i}
            className="t-stencil"
            style={{ fontSize: 18, letterSpacing: "0.18em" }}
          >
            ★ {it}
          </span>
        ))}
      </div>
    </div>
  );
}

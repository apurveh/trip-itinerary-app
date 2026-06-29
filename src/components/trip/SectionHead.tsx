interface SectionHeadProps {
  eyebrow: string;
  title: string;
}

/**
 * SectionHead — dual-label section heading used across all trip section cards.
 * Eyebrow: small t-mono uppercase wine label.
 * Title: plain readable h2 (EB Garamond, NOT Anton display).
 */
export default function SectionHead({ eyebrow, title }: SectionHeadProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p
        className="t-mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.3em",
          color: "var(--wine)",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontWeight: 600,
          fontSize: "clamp(1.2rem, 2vw + 0.5rem, 1.6rem)",
          margin: "4px 0 0",
          lineHeight: 1.25,
          color: "var(--ink)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

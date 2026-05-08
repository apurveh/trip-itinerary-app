export default function FooterStrip() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--manila-light)",
        padding: "32px 0",
        borderTop: "3px double var(--amber)",
      }}
    >
      <div
        className="case-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 18,
        }}
      >
        <div>
          <div
            className="t-stencil"
            style={{ fontSize: 18, letterSpacing: "0.18em", color: "var(--amber)" }}
          >
            THE CLARA &amp; APURVA FILES
          </div>
          <div
            className="t-mono"
            style={{ fontSize: 10, letterSpacing: "0.2em", marginTop: 6, opacity: 0.7 }}
          >
            EST. 2026 · COPENHAGEN ↔ EVERYWHERE
          </div>
        </div>
        <div
          className="t-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            opacity: 0.6,
            alignSelf: "end",
          }}
        >
          ACCESS GRANTED · CLARA ONLY · DO NOT DISTRIBUTE
        </div>
      </div>
    </footer>
  );
}

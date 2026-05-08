interface BackToHubProps {
  onBack: () => void;
}

export default function BackToHub({ onBack }: BackToHubProps) {
  return (
    <section style={{ padding: "30px 0 80px", textAlign: "center" }}>
      <div className="case-container">
        <div
          style={{
            display: "inline-block",
            border: "2px dashed var(--ink)",
            padding: "26px 40px",
            background: "var(--paper)",
          }}
        >
          <div
            className="t-mono"
            style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--wine)" }}
          >
            END OF FILE
          </div>
          <div
            className="t-display"
            style={{ fontSize: 48, margin: "6px 0 14px" }}
          >
            RETURN TO FILING CABINET
          </div>
          <button className="btn" onClick={onBack}>
            ← THE CLARA &amp; APURVA FILES
          </button>
        </div>
      </div>
    </section>
  );
}

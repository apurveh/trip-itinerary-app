import PassportStamp from "@/components/brand/PassportStamp";

export default function StampWall() {
  return (
    <div
      style={{
        background: "var(--cream)",
        border: "2px solid var(--ink)",
        padding: 24,
        boxShadow: "6px 6px 0 var(--ink)",
        height: "100%",
      }}
    >
      <div
        className="t-mono"
        style={{ fontSize: 11, letterSpacing: "0.24em", color: "var(--wine)" }}
      >
        § PASSPORT STAMPS
      </div>
      <h3 className="t-display" style={{ fontSize: 36, margin: "4px 0 18px" }}>
        EARN AS YOU GO
      </h3>
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "10px 0",
        }}
      >
        <PassportStamp code="001" locked />
        <PassportStamp code="002" locked />
        <PassportStamp code="003" locked />
      </div>
      <p
        className="t-typewriter"
        style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 16, lineHeight: 1.5 }}
      >
        Stamps land automatically the day a trip flips to <em>COMPLETED</em>. Until then, they
        sit here looking patient.
      </p>
    </div>
  );
}

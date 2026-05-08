import type { PendingFile } from "@/lib/types";

export default function PendingCard({ code, label, hint }: PendingFile) {
  return (
    <div
      style={{
        background: "var(--paper)",
        border: "2px dashed var(--pencil)",
        padding: "26px 24px",
        position: "relative",
        minHeight: 200,
        transform: "rotate(-1deg)",
      }}
    >
      <div
        className="t-mono"
        style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--pencil)" }}
      >
        {code}
      </div>
      <div
        className="t-display"
        style={{ fontSize: 36, marginTop: 8, color: "var(--ink-soft)", opacity: 0.8 }}
      >
        {label}
      </div>
      <div
        className="t-typewriter"
        style={{
          fontSize: 13,
          color: "var(--pencil)",
          marginTop: 14,
          fontStyle: "italic",
        }}
      >
        "{hint}"
      </div>
      <div style={{ position: "absolute", bottom: 18, right: 16 }}>
        <span className="redacted">████ ███████</span>
      </div>
    </div>
  );
}

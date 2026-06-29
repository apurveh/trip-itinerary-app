import { Link } from "react-router-dom";
import Stamp from "@/components/primitives/Stamp";

export default function NotFound() {
  return (
    <main className="case-container" style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
      <div style={{ display: "inline-block", marginBottom: 24, transform: "rotate(-4deg)" }}>
        <Stamp size="large">CASE FILE MISSING</Stamp>
      </div>
      <h1
        className="t-display"
        style={{
          fontSize: "clamp(64px, 11vw, 160px)",
          margin: "0",
          textShadow: "4px 4px 0 var(--amber), 8px 8px 0 var(--wine)",
        }}
      >
        404
      </h1>
      <p
        className="t-serif"
        style={{
          fontStyle: "italic",
          fontSize: 22,
          marginTop: 24,
          color: "var(--ink-soft)",
        }}
      >
        This dossier was redacted, misfiled, or never existed.
      </p>
      <Link to="/" className="btn" style={{ marginTop: 24, textDecoration: "none" }}>
        ← RETURN TO FILING CABINET
      </Link>
    </main>
  );
}

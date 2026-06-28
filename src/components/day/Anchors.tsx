import type { Anchor } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";

function ConfNumber({ k }: { k: string }) {
  const [v, set] = useLocalStorage<string>(`conf:${k}`, "");
  return (
    <input value={v} onChange={(e) => set(e.target.value)} placeholder="confirmation #"
      className="t-mono" style={{ fontSize: 11, padding: "4px 8px", border: "1.5px dashed var(--ink)", background: "var(--cream)" }} />
  );
}

export default function Anchors({ anchors }: { anchors: Anchor[] }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {anchors.map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start",
          border: "2px solid var(--ink)", background: "var(--paper)", padding: "12px 14px" }}>
          {a.time && <div className="t-display" style={{ fontSize: 22, color: "var(--wine)", minWidth: 86 }}>{a.time}</div>}
          <div style={{ flex: 1 }}>
            <div className="t-mono" style={{ fontSize: 13, fontWeight: 700 }}>{a.label}</div>
            <div className="t-typewriter" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{a.detail}</div>
            <div style={{ marginTop: 6, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              {a.booking === "booked" && <span className="t-stencil" style={{ color: "var(--teal)", fontSize: 12 }}>✓ BOOKED</span>}
              {a.booking === "booked" && a.confirmationKey && <ConfNumber k={a.confirmationKey} />}
              {a.booking === "toBook" && a.bookingLink &&
                <a href={a.bookingLink} target="_blank" rel="noreferrer" className="t-mono"
                   style={{ fontSize: 12, color: "var(--wine)" }}>BOOK THIS →</a>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

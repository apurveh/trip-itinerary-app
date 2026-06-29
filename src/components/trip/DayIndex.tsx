import { Link } from "react-router-dom";
import type { Trip } from "@/lib/types";
import Sticker from "@/components/primitives/Sticker";

export default function DayIndex({ trip }: { trip: Trip }) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {trip.days.map((d) => (
        <Link
          key={d.n}
          to={`/trips/${trip.slug}/day/${d.n}`}
          className="hover-lift"
          style={{
            display: "grid",
            gridTemplateColumns: "64px 1fr auto",
            gap: 16,
            alignItems: "center",
            border: "2px solid var(--ink)",
            background: "var(--paper)",
            boxShadow: "5px 5px 0 var(--ink)",
            padding: "14px 18px",
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          <div className="t-display" style={{ fontSize: 44, lineHeight: 1, color: "var(--wine)" }}>
            {String(d.n).padStart(2, "0")}
          </div>
          <div>
            <Sticker tone={d.sticker}>{d.label}</Sticker>
            <div
              className="t-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                marginTop: 6,
                color: "var(--ink-soft)",
              }}
            >
              {d.weekday} {d.date} · {d.title.toUpperCase()}
            </div>
          </div>
          <div
            className="t-typewriter"
            style={{ fontSize: 12, color: "var(--ink-soft)", textAlign: "right", maxWidth: 220 }}
          >
            {d.anchors[0]?.label ?? "Free roam"} →
          </div>
        </Link>
      ))}
    </div>
  );
}

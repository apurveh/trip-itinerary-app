import { Link } from "react-router-dom";
import type { Trip } from "@/lib/types";
import { tripStatusAt, nextAnchor } from "@/lib/tripClock";

export default function StatusBanner({ trip }: { trip: Trip }) {
  const nowISO = new Date().toISOString();
  const { status, dayNumber, daysUntil } = tripStatusAt(nowISO, trip.startISO, trip.endISO);
  const today = dayNumber ? trip.days.find((d) => d.n === dayNumber) : undefined;
  const nowHHMM = nowISO.slice(11, 16);
  const next = today ? nextAnchor(today, nowHHMM) : null;

  let line = "";
  if (status === "upcoming") line = `T-MINUS ${daysUntil} DAY${daysUntil === 1 ? "" : "S"} · OPERAZIONE TORINO`;
  else if (status === "in_progress" && today) line = `TODAY · DAY ${today.n} — ${today.label}`;
  else line = "CASE CLOSED · ARRIVEDERCI, AMORE";

  return (
    <div style={{ border: "2px solid var(--ink)", background: "var(--ink)", color: "var(--cream)",
      padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <div className="t-stencil" style={{ fontSize: 18, letterSpacing: "0.1em" }}>{line}</div>
      {today && (
        <div className="t-mono" style={{ fontSize: 12, display: "flex", gap: 14, alignItems: "center" }}>
          {next && <span>NEXT FIXED: {next.label}{next.time ? ` @ ${next.time}` : ""}</span>}
          <Link to={`/trips/${trip.slug}/day/${today.n}`} style={{ color: "var(--amber)" }}>OPEN TODAY →</Link>
        </div>
      )}
    </div>
  );
}

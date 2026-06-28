import type { Trip } from "@/lib/types";
export default function Rendezvous({ trip }: { trip: Trip }) {
  return (
    <div style={{ border: "2px solid var(--ink)", background: "var(--paper)", padding: 18, boxShadow: "5px 5px 0 var(--ink)" }}>
      <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--wine)" }}>RENDEZVOUS · COFFEE & FOOD</div>
      <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "grid", gap: 10 }}>
        {trip.food.map((c) => (
          <li key={c.name}>
            <div className="t-display" style={{ fontSize: 18 }}>{c.name}</div>
            <div className="t-typewriter" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{c.hours}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

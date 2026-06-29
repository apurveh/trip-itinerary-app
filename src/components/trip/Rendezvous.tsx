import type { Trip } from "@/lib/types";
import SectionHead from "@/components/trip/SectionHead";
export default function Rendezvous({ trip }: { trip: Trip }) {
  return (
    <div style={{ border: "2px solid var(--ink)", background: "var(--paper)", padding: 18, boxShadow: "5px 5px 0 var(--ink)" }}>
      <SectionHead eyebrow="RENDEZVOUS" title="Where to meet" />
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

import type { Trip } from "@/lib/types";
import { mapsLink } from "@/lib/mapsLink";
import SectionHead from "@/components/trip/SectionHead";
export default function Safehouse({ trip }: { trip: Trip }) {
  return (
    <div style={{ border: "2px solid var(--ink)", background: "var(--paper)", padding: 18, boxShadow: "5px 5px 0 var(--ink)" }}>
      <SectionHead eyebrow="SAFEHOUSE" title="Base / Apartment" />
      <div className="t-display" style={{ fontSize: 26, marginTop: 4 }}>{trip.base.address}</div>
      <div className="t-typewriter" style={{ fontSize: 12, color: "var(--ink-soft)" }}>Metro: {trip.base.metro}</div>
      <a href={mapsLink(trip.base.address)} target="_blank" rel="noreferrer" className="t-mono" style={{ fontSize: 12, color: "var(--wine)" }}>OPEN IN MAPS →</a>
      <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {trip.base.supermarkets.map((s) => (
          <span key={s} className="t-mono" style={{ fontSize: 11, border: "1.5px solid var(--ink)", padding: "3px 8px", background: "var(--cream)" }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

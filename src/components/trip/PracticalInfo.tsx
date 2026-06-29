import type { Trip } from "@/lib/types";
import SectionHead from "@/components/trip/SectionHead";

interface PracticalInfoProps {
  trip: Trip;
}

const SECTIONS = [
  { key: "transit", title: "TRANSIT", icon: "▲", color: "var(--ink)" },
  { key: "food", title: "FOOD", icon: "♦", color: "var(--wine)" },
  { key: "weather", title: "WEATHER", icon: "☀", color: "var(--amber-deep)" },
] as const;

export default function PracticalInfo({ trip }: PracticalInfoProps) {
  return (
    <section style={{ padding: "40px 0" }}>
      <div className="case-container">
        <SectionHead eyebrow="PRACTICAL" title="Practical info" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 22,
          }}
        >
          {SECTIONS.map((s, i) => (
            <div
              key={s.key}
              style={{
                background: "var(--paper)",
                border: "2px solid var(--ink)",
                boxShadow: "5px 5px 0 var(--ink)",
                padding: "20px 22px",
                position: "relative",
                transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22, color: s.color }}>{s.icon}</span>
                <div className="t-display" style={{ fontSize: 32, color: "var(--ink)" }}>
                  {s.title}
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0" }}>
                {trip.tips[s.key].map((tip, j) => (
                  <li
                    key={j}
                    className="t-typewriter"
                    style={{
                      fontSize: 13,
                      padding: "5px 0",
                      borderBottom: "1px dotted var(--pencil)",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: s.color, fontWeight: 700 }}>·</span>
                    <span style={{ flex: 1 }}>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

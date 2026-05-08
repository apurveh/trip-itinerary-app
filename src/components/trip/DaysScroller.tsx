import type { Trip } from "@/lib/types";
import DayCard from "./DayCard";

interface DaysScrollerProps {
  trip: Trip;
}

export default function DaysScroller({ trip }: DaysScrollerProps) {
  return (
    <section style={{ padding: "24px 0 24px", position: "relative" }}>
      <div
        className="case-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div
            className="t-mono"
            style={{ fontSize: 11, letterSpacing: "0.32em", color: "var(--wine)" }}
          >
            § 02 · DAILY DEBRIEF
          </div>
          <h2 className="t-display" style={{ fontSize: 64, margin: "4px 0 0" }}>
            EIGHT DAYS, EIGHT FILES.
          </h2>
        </div>
        <div
          className="t-typewriter"
          style={{ fontSize: 13, color: "var(--ink-soft)", maxWidth: 320 }}
        >
          Scroll →. Each card is a self-contained mission with moves, intel, and a budget pull.
        </div>
      </div>

      <div className="days-scroller" style={{ marginTop: 18 }}>
        {trip.days.map((d) => (
          <DayCard key={d.n} day={d} trip={trip} />
        ))}
      </div>
    </section>
  );
}

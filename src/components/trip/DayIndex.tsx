import { Link } from "react-router-dom";
import type { Trip } from "@/lib/types";
import Sticker from "@/components/primitives/Sticker";

export default function DayIndex({ trip }: { trip: Trip }) {
  return (
    <div className="case-container day-index">
      {trip.days.map((d) => (
        <Link
          key={d.n}
          to={`/trips/${trip.slug}/day/${d.n}`}
          className="hover-lift day-card"
        >
          <div className="day-card__num t-display">
            {String(d.n).padStart(2, "0")}
          </div>

          <div className="day-card__body">
            <Sticker tone={d.sticker}>{d.label}</Sticker>
            <div className="day-card__meta t-mono">
              {d.weekday} {d.date} · {d.title.toUpperCase()}
            </div>
          </div>

          <div className="day-card__aside">
            {/* Anchor label is supplementary — hidden on the narrowest screens
                (see globals.css) so the card never overflows the viewport. */}
            <div className="day-card__anchor t-typewriter">
              {d.anchors[0]?.label ?? "Free roam"}
            </div>
            {/* Explicit clickability affordance. The whole card is the <Link>,
                so this is a visual pill (not a nested <button>). */}
            <span className="day-card__open" aria-hidden="true">
              OPEN →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

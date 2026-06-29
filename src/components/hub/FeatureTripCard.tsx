import { useNavigate } from "react-router-dom";
import type { Trip } from "@/lib/types";
import PunchHoles from "@/components/primitives/PunchHoles";
import Tape from "@/components/primitives/Tape";
import Stamp from "@/components/primitives/Stamp";
import Sticker from "@/components/primitives/Sticker";
import Image from "@/components/primitives/Image";

interface FeatureTripCardProps {
  trip: Trip;
}

export default function FeatureTripCard({ trip }: FeatureTripCardProps) {
  const navigate = useNavigate();
  const onOpen = () => navigate(`/trips/${trip.slug}`);

  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="hover-lift feature-trip-card"
      style={{
        cursor: "pointer",
        position: "relative",
        background: "var(--manila-light)",
        border: "2px solid var(--ink)",
        borderTop: "32px solid var(--manila-edge)",
        boxShadow: "10px 10px 0 var(--ink), 14px 14px 0 var(--wine)",
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        minHeight: 460,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -56,
          left: 32,
          width: 220,
          height: 36,
          background: "var(--manila-edge)",
          border: "2px solid var(--ink)",
          borderBottom: "none",
          borderRadius: "8px 22px 0 0",
          padding: "8px 18px",
          color: "var(--ink)",
        }}
      >
        <div className="t-stencil" style={{ fontSize: 14, letterSpacing: "0.2em" }}>
          {trip.caseNumber} · TORINO
        </div>
      </div>

      <PunchHoles count={3} side="left" />
      <Tape style={{ top: -12, right: 80, transform: "rotate(8deg)", width: 110 }} />

      <div className="feature-trip-card__text" style={{ padding: "44px 38px 32px 56px", position: "relative" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span
            className="t-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              background: "var(--ink)",
              color: "var(--manila-light)",
              padding: "3px 8px",
            }}
          >
            STATUS · {trip.status.toUpperCase()}
          </span>
          <span
            className="t-mono"
            style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--wine)" }}
          >
            {trip.classification}
          </span>
        </div>

        <h3
          className="t-display"
          style={{
            fontSize: "clamp(48px, 6vw, 88px)",
            margin: "14px 0 4px",
            color: "var(--wine)",
            lineHeight: 0.92,
          }}
        >
          OPERAZIONE
          <br />
          TORINO
        </h3>
        <div className="t-stencil" style={{ fontSize: 18, color: "var(--ink-soft)" }}>
          {trip.destination} · {trip.dates}
        </div>

        <p
          className="t-serif"
          style={{
            fontStyle: "italic",
            fontSize: 19,
            marginTop: 18,
            marginBottom: 0,
            color: "var(--ink)",
          }}
        >
          "{trip.tagline}"
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "20px 0 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px 16px",
          }}
        >
          {(
            [
              ["DURATION", `${trip.duration} days · ${trip.duration - 1} nights`],
              ["BASE", trip.base.address],
              ["AGENTS", "Apurva + Clara"],
              ["DAYS PLOTTED", `${trip.days.length} / ${trip.duration}`],
              ["BUDGET", "~1,900 DKK couple"],
              ["WEATHER", "28–32°C · humid"],
            ] as const
          ).map(([k, v]) => (
            <li
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--pencil)",
                padding: "4px 0",
              }}
            >
              <span
                className="t-mono"
                style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--pencil)" }}
              >
                {k}
              </span>
              <span className="t-typewriter" style={{ fontSize: 12, color: "var(--ink)" }}>
                {v}
              </span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 22, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <button
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            OPEN DOSSIER →
          </button>
          <span
            className="t-mono"
            style={{ fontSize: 10, color: "var(--pencil)", letterSpacing: "0.18em" }}
          >
            8 DAY CARDS · 1 BUDGET REPORT · 3 INTEL DROPS
          </span>
        </div>
      </div>

      <div className="feature-trip-card__image" style={{ position: "relative", background: "var(--ink)", overflow: "hidden" }}>
        <Image
          src={trip.heroImage}
          alt=""
          width={1200}
          height={800}
          priority
          style={{
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.92) contrast(1.05)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(140deg, rgba(201,118,20,0.35) 0%, rgba(122,31,31,0.55) 100%)",
            mixBlendMode: "screen",
          }}
        />

        <div style={{ position: "absolute", top: 24, right: 24, color: "var(--cream)" }}>
          <div
            className="t-display"
            style={{
              fontSize: 96,
              lineHeight: 0.9,
              color: "rgba(255,236,180,0.9)",
              textShadow: "3px 3px 0 var(--wine-deep)",
            }}
          >
            {trip.id}
          </div>
          <div
            className="t-stencil"
            style={{
              fontSize: 16,
              letterSpacing: "0.22em",
              color: "var(--manila-light)",
              marginTop: -8,
            }}
          >
            CASE FILE
          </div>
        </div>

        <div
          style={{ position: "absolute", bottom: 18, left: 22, transform: "rotate(-4deg)" }}
        >
          <Stamp color="var(--cream)" rotate={-4}>
            {trip.status.toUpperCase()}
          </Stamp>
        </div>

        <div style={{ position: "absolute", left: 22, top: 22, color: "var(--cream)" }}>
          <Sticker tone="amber" rotate={-5}>
            ★ PIEDMONT
          </Sticker>
        </div>
      </div>
    </div>
  );
}

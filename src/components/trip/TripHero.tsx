import type { Trip } from "@/lib/types";
import AvatarChip from "@/components/brand/AvatarChip";
import Stamp from "@/components/primitives/Stamp";
import Sticker from "@/components/primitives/Sticker";
import Tape from "@/components/primitives/Tape";
import PunchHoles from "@/components/primitives/PunchHoles";

interface TripHeroProps {
  trip: Trip;
  onBack: () => void;
}

export default function TripHero({ trip, onBack }: TripHeroProps) {
  return (
    <section style={{ position: "relative", padding: "30px 0 40px", overflow: "hidden" }}>
      <div className="case-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <button className="btn ghost" onClick={onBack} style={{ fontSize: 12 }}>
            ← FILING CABINET
          </button>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              className="t-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--wine)" }}
            >
              {trip.classification}
            </span>
            <span
              className="t-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                background: "var(--amber)",
                color: "var(--ink)",
                padding: "3px 10px",
              }}
            >
              STATUS · {trip.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div
          className="dossier-folder"
          style={{
            position: "relative",
            background: "var(--manila-light)",
            border: "2px solid var(--ink)",
            borderTop: "36px solid var(--manila-edge)",
            boxShadow: "10px 10px 0 var(--ink), 14px 14px 0 var(--wine)",
            padding: "44px 44px 36px",
            minHeight: 460,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -64,
              left: 32,
              width: 280,
              height: 40,
              background: "var(--manila-edge)",
              border: "2px solid var(--ink)",
              borderBottom: "none",
              borderRadius: "8px 22px 0 0",
              padding: "10px 18px",
            }}
          >
            <div className="t-stencil" style={{ fontSize: 14, letterSpacing: "0.2em" }}>
              {trip.caseNumber} · OPERAZIONE TORINO
            </div>
          </div>

          <PunchHoles count={4} side="left" />
          <Tape style={{ top: -14, right: 100, width: 110, transform: "rotate(8deg)" }} />
          <Tape style={{ top: -14, right: 240, width: 90, transform: "rotate(-6deg)" }} />

          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: 38,
              alignItems: "center",
            }}
          >
            <div>
              <div
                className="t-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.32em",
                  color: "var(--wine)",
                }}
              >
                FIELD MANUAL · {trip.dates.toUpperCase()}
              </div>
              <h1
                className="t-display"
                style={{
                  fontSize: "clamp(64px, 11vw, 152px)",
                  margin: "8px 0 4px",
                  lineHeight: 0.88,
                  color: "var(--ink)",
                  textShadow: "4px 4px 0 var(--amber)",
                }}
              >
                OPERAZIONE
                <br />
                <span style={{ color: "var(--wine)" }}>TORINO</span>
              </h1>
              <p
                className="t-serif"
                style={{
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "var(--ink-soft)",
                  maxWidth: 520,
                  marginTop: 14,
                }}
              >
                "{trip.tagline}"
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
                {trip.travelers.map((t) => (
                  <AvatarChip key={t.name} traveler={t} big />
                ))}
              </div>

              <div style={{ marginTop: 22, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Sticker tone="amber" rotate={-4}>
                  ★ PIEDMONT
                </Sticker>
                <Sticker tone="wine" rotate={3}>
                  WINE COUNTRY
                </Sticker>
                <Sticker tone="teal" rotate={-2}>
                  FIRST TRIP TOGETHER
                </Sticker>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                className="photo"
                style={{ transform: "rotate(2deg)", maxWidth: 460, marginLeft: "auto" }}
              >
                <Tape
                  style={{
                    top: -10,
                    left: "50%",
                    marginLeft: -45,
                    transform: "rotate(-3deg)",
                  }}
                />
                <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                  <img src={trip.heroImage} alt="" />
                </div>
                <div className="caption">PIAZZA SAN CARLO · GOLDEN HOUR · CONFIDENTIAL</div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -10,
                  transform: "rotate(8deg)",
                }}
              >
                <Stamp size="large" rotate={8}>
                  {trip.classification}
                </Stamp>
              </div>
            </div>
          </div>

          <div
            className="meta-bar"
            style={{
              marginTop: 32,
              borderTop: "2px solid var(--ink)",
              paddingTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 0,
            }}
          >
            {(
              [
                ["DURATION", "8 DAYS"],
                ["BASE", "SUPERGA, TORINO"],
                ["AGENTS", "AP + CL"],
                ["BUDGET", "~6,600 DKK"],
                ["TEMP", "28–32°C HUMID"],
              ] as const
            ).map(([k, v], i) => (
              <div
                key={k}
                style={{
                  borderRight: i < 4 ? "1.5px dotted var(--pencil)" : "none",
                  padding: "0 14px",
                }}
              >
                <div
                  className="t-mono"
                  style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--pencil)" }}
                >
                  {k}
                </div>
                <div className="t-stencil" style={{ fontSize: 18, marginTop: 2 }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14, textAlign: "right" }}>
          <span
            className="t-mono"
            style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--pencil)" }}
          >
            {trip.exchangeNote}
          </span>
        </div>
      </div>
    </section>
  );
}

import AvatarChip from "@/components/brand/AvatarChip";
import FeatureTripCard from "@/components/hub/FeatureTripCard";
import WorldMapPanel from "@/components/hub/WorldMapPanel";
import StampWall from "@/components/hub/StampWall";
import FooterStrip from "@/components/hub/FooterStrip";
import MarqueeStrip from "@/components/primitives/MarqueeStrip";
import Reveal from "@/components/primitives/Reveal";
import { HUB_DATA } from "@/lib/hubData";
import { TURIN } from "@/lib/trips/turin";

export default function Hub() {
  const data = HUB_DATA;
  const trip = TURIN;

  return (
    <main>
      <section style={{ position: "relative", padding: "48px 0 24px" }}>
        <div className="case-container" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, right: 28, transform: "rotate(2deg)" }}>
            <div
              style={{
                border: "2px solid var(--ink)",
                padding: "4px 10px",
                background: "var(--cream)",
                boxShadow: "3px 3px 0 var(--ink)",
              }}
            >
              <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em" }}>
                DOSSIER · VOL. I
              </div>
              <div className="t-stencil" style={{ fontSize: 14, color: "var(--wine)" }}>
                {data.archive}
              </div>
            </div>
          </div>

          <div
            className="t-mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.32em",
              color: "var(--wine)",
              marginTop: 18,
            }}
          >
            ▌ INTERNAL · TRAVEL DIVISION · TWO-AGENT UNIT
          </div>

          <h1
            className="t-display"
            style={{
              fontSize: "clamp(64px, 11vw, 168px)",
              margin: "10px 0 0",
              color: "var(--ink)",
              textShadow: "4px 4px 0 var(--amber), 8px 8px 0 var(--wine)",
            }}
          >
            THE CLARA
            <br />
            &amp; APURVA <span style={{ color: "var(--wine)" }}>FILES</span>
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              marginTop: 28,
            }}
          >
            <p
              className="t-serif"
              style={{
                fontSize: "clamp(18px, 2vw, 24px)",
                fontStyle: "italic",
                maxWidth: 560,
                margin: 0,
                color: "var(--ink-soft)",
              }}
            >
              {data.tagline}
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {trip.travelers.map((t) => (
                <AvatarChip key={t.name} traveler={t} big />
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              border: "2px solid var(--ink)",
              background: "var(--paper)",
              boxShadow: "6px 6px 0 var(--ink)",
            }}
          >
            {data.stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "18px 20px",
                  borderRight:
                    i < data.stats.length - 1 ? "1.5px dashed var(--ink)" : "none",
                  position: "relative",
                }}
              >
                <div
                  className="t-display"
                  style={{ fontSize: 56, color: "var(--wine)", lineHeight: 1 }}
                >
                  {s.n}
                </div>
                <div
                  className="t-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    marginTop: 4,
                    color: "var(--ink-soft)",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip
        items={[
          "FILES 001 · OPERAZIONE TORINO",
          "DEPARTING 1 JULY 2026",
          "BASE: CORSO DANTE 72",
          "STATUS: UPCOMING",
          "BUDGET: ~1,900 DKK COUPLE",
          "SPONTANEITY ENGAGED",
        ]}
      />

      <section style={{ padding: "60px 0 40px" }}>
        <div className="case-container">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 28,
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                className="t-mono"
                style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--wine)" }}
              >
                § 01
              </div>
              <h2 className="t-display" style={{ fontSize: 56, margin: "4px 0 0" }}>
                OPEN CASE FILES
              </h2>
            </div>
            <div
              className="t-typewriter"
              style={{ fontSize: 13, color: "var(--ink-soft)", maxWidth: 360 }}
            >
              One active assignment. Click the manila folder to open the dossier.
            </div>
          </div>

          <Reveal>
            <FeatureTripCard trip={trip} />
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0 80px" }}>
        <div
          className="case-container map-grid"
          style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 36 }}
        >
          <Reveal>
            <WorldMapPanel />
          </Reveal>
          <Reveal delay={120}>
            <StampWall />
          </Reveal>
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}

import AvatarChip from "@/components/brand/AvatarChip";
import FeatureTripCard from "@/components/hub/FeatureTripCard";
import FooterStrip from "@/components/hub/FooterStrip";
import Reveal from "@/components/primitives/Reveal";
import { HUB_DATA } from "@/lib/hubData";
import { TURIN } from "@/lib/trips/turin";

export default function Hub() {
  const data = HUB_DATA;
  const trip = TURIN;

  return (
    <main>
      {/* ── Masthead ── */}
      <section style={{ padding: "48px 0 32px" }}>
        <div className="case-container">
          {/* Top row: classification label + dossier stamp (one accent) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div
              className="t-mono"
              style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--wine)" }}
            >
              ▌ INTERNAL · TRAVEL DIVISION · TWO-AGENT UNIT
            </div>

            {/* ONE decorative accent */}
            <div style={{ transform: "rotate(2deg)", flexShrink: 0 }}>
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
                <div className="t-stencil" style={{ fontSize: 13, color: "var(--wine)" }}>
                  {data.archive}
                </div>
              </div>
            </div>
          </div>

          <h1
            className="t-display"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 7rem)",
              margin: "0 0 18px",
              color: "var(--ink)",
              lineHeight: 1,
              textShadow: "2px 2px 0 var(--amber)",
            }}
          >
            THE CLARA
            <br />
            &amp; APURVA <span style={{ color: "var(--wine)" }}>FILES</span>
          </h1>

          <p
            className="t-serif"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.375rem)",
              fontStyle: "italic",
              margin: "0 0 20px",
              color: "var(--ink-soft)",
              maxWidth: 560,
            }}
          >
            {data.tagline}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {trip.travelers.map((t) => (
              <AvatarChip key={t.name} traveler={t} big />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stat strip — 3 real values, no overflow at 320px ── */}
      <section style={{ padding: "0 0 44px" }}>
        <div className="case-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: "2px solid var(--ink)",
              background: "var(--paper)",
              boxShadow: "6px 6px 0 var(--ink)",
            }}
          >
            {data.stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "16px 14px",
                  borderRight:
                    i < data.stats.length - 1 ? "1.5px dashed var(--ink)" : "none",
                }}
              >
                <div
                  className="t-display"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3.5rem)",
                    color: "var(--wine)",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="t-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    marginTop: 4,
                    color: "var(--ink-soft)",
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Active trip ── */}
      <section style={{ padding: "0 0 64px" }}>
        <div className="case-container">
          <div style={{ marginBottom: 24 }}>
            <div
              className="t-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                color: "var(--wine)",
                marginBottom: 4,
              }}
            >
              § 01
            </div>
            <h2
              className="t-display"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", margin: 0 }}
            >
              OPEN CASE FILES
            </h2>
          </div>

          <Reveal>
            <FeatureTripCard trip={trip} />
          </Reveal>
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}

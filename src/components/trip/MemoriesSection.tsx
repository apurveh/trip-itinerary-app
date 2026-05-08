import Tape from "@/components/primitives/Tape";

const ROTATIONS = [-2.4, 1.8, -1.2, 2.6, -2.1, 1.5];

export default function MemoriesSection() {
  return (
    <section style={{ padding: "40px 0 60px" }}>
      <div className="case-container">
        <div
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
              § 05 · MEMORIES
            </div>
            <h2 className="t-display" style={{ fontSize: 64, margin: "4px 0 0" }}>
              EVIDENCE TO BE COLLECTED.
            </h2>
          </div>
          <div
            className="t-typewriter"
            style={{ fontSize: 13, color: "var(--ink-soft)", maxWidth: 320 }}
          >
            Polaroids land here as the trip happens. Right now: an empty corkboard.
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            background: "linear-gradient(180deg, #c79961, #a37340)",
            border: "8px solid var(--ink-soft)",
            borderRadius: 4,
            padding: "32px 28px",
            minHeight: 280,
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 4px, transparent 4px 8px), linear-gradient(180deg, #c79961, #a37340)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 26,
          }}
        >
          {ROTATIONS.map((rot, i) => (
            <div
              key={i}
              className="photo"
              style={{ transform: `rotate(${rot}deg)` }}
            >
              <Tape
                style={{
                  top: -12,
                  left: "50%",
                  marginLeft: -45,
                  transform: `rotate(${i % 2 ? 4 : -4}deg)`,
                }}
              />
              <div
                style={{
                  aspectRatio: "1/1",
                  background: "var(--manila)",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid var(--ink)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    className="t-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "var(--pencil)",
                    }}
                  >
                    FRAME {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="t-stencil"
                    style={{
                      fontSize: 16,
                      color: "var(--ink-soft)",
                      marginTop: 4,
                    }}
                  >
                    NO IMAGE
                  </div>
                  <div
                    className="t-typewriter"
                    style={{
                      fontSize: 10,
                      color: "var(--pencil)",
                      marginTop: 4,
                      fontStyle: "italic",
                    }}
                  >
                    to be developed
                  </div>
                </div>
              </div>
              <div className="caption">— · — · 2026</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

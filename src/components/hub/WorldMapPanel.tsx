import Tape from "@/components/primitives/Tape";

export default function WorldMapPanel() {
  return (
    <div
      style={{
        background: "var(--paper)",
        border: "2px solid var(--ink)",
        padding: 24,
        boxShadow: "6px 6px 0 var(--ink)",
        position: "relative",
      }}
    >
      <Tape style={{ top: -12, left: 28, transform: "rotate(-6deg)" }} />
      <Tape style={{ top: -12, right: 28, transform: "rotate(7deg)" }} />
      <div
        className="t-mono"
        style={{ fontSize: 11, letterSpacing: "0.24em", color: "var(--wine)" }}
      >
        § FIELD MAP — KNOWN TERRITORY
      </div>
      <h3 className="t-display" style={{ fontSize: 36, margin: "4px 0 18px" }}>
        WHERE WE'VE BEEN
      </h3>

      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 8",
          background: "var(--manila-light)",
          border: "1.5px solid var(--ink)",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={"v" + i}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={400}
              stroke="rgba(26,22,18,0.08)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={"h" + i}
              x1={0}
              y1={i * 50}
              x2={800}
              y2={i * 50}
              stroke="rgba(26,22,18,0.08)"
              strokeWidth="1"
            />
          ))}
          <path
            d="M40 130 Q120 80 200 110 T320 140 Q360 150 380 200 Q360 240 300 250 Q220 260 160 230 Q80 200 40 180 Z"
            fill="rgba(122,31,31,0.18)"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <path
            d="M380 110 Q460 80 540 100 Q620 120 660 160 Q680 220 620 240 Q540 260 470 240 Q420 220 400 180 Q380 140 380 110 Z"
            fill="rgba(13,93,93,0.18)"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <path
            d="M560 280 Q620 270 700 290 Q740 310 720 340 Q660 360 600 340 Q560 320 560 280 Z"
            fill="rgba(201,118,20,0.18)"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <path
            d="M120 200 Q280 80 460 170"
            fill="none"
            stroke="var(--wine)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <g transform="translate(460, 170)">
            <circle r="22" fill="var(--classified)" opacity="0.18" />
            <circle r="10" fill="var(--classified)" stroke="var(--ink)" strokeWidth="2" />
            <circle r="3" fill="var(--cream)" />
          </g>
          <text
            x="475"
            y="160"
            fontFamily="Bebas Neue"
            fontSize="18"
            fill="var(--ink)"
            letterSpacing="2"
          >
            TORINO
          </text>
          <text x="475" y="178" fontFamily="IBM Plex Mono" fontSize="10" fill="var(--wine)">
            45.07°N · 7.69°E
          </text>
          <g transform="translate(440, 100)">
            <circle r="6" fill="var(--ink)" stroke="var(--cream)" strokeWidth="2" />
          </g>
          <text x="455" y="100" fontFamily="IBM Plex Mono" fontSize="10" fill="var(--ink-soft)">
            CPH · home base
          </text>
        </svg>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span
          className="t-mono"
          style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--pencil)" }}
        >
          ● COMPLETED · 0
        </span>
        <span
          className="t-mono"
          style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--wine)" }}
        >
          ◉ ACTIVE · 1
        </span>
        <span
          className="t-mono"
          style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--pencil)" }}
        >
          ○ PROPOSED · 3
        </span>
      </div>
    </div>
  );
}

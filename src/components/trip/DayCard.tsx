import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Day, Trip } from "@/lib/types";
import Sticker from "@/components/primitives/Sticker";
import Pill from "@/components/primitives/Pill";
import Tape from "@/components/primitives/Tape";

interface DayCardProps {
  day: Day;
  trip: Trip;
}

export default function DayCard({ day, trip }: DayCardProps) {
  const [hover, setHover] = useState(false);
  const prefersReduced = useReducedMotion();
  const totalDays = trip.days.length;

  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        background: "var(--paper)",
        border: "2px solid var(--ink)",
        boxShadow: hover
          ? "10px 10px 0 var(--wine), 14px 14px 0 var(--ink)"
          : "6px 6px 0 var(--ink)",
        transform: hover && !prefersReduced ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        padding: "20px 22px 22px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        className="t-display"
        aria-hidden
        style={{
          position: "absolute",
          top: -28,
          right: -10,
          fontSize: 280,
          lineHeight: 0.8,
          color: "var(--manila)",
          opacity: 0.7,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {String(day.n).padStart(2, "0")}
      </div>

      <Tape style={{ top: -12, left: 26, transform: "rotate(-6deg)" }} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div>
          <div
            className="t-mono"
            style={{ fontSize: 10, letterSpacing: "0.24em", color: "var(--wine)" }}
          >
            FILE 001 · DAY {String(day.n).padStart(2, "0")} /{" "}
            {String(totalDays).padStart(2, "0")}
          </div>
          <div
            className="t-display"
            style={{
              fontSize: 38,
              marginTop: 2,
              color: "var(--ink)",
              lineHeight: 1,
            }}
          >
            {day.title.toUpperCase()}
          </div>
          <div
            className="t-typewriter"
            style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}
          >
            {day.date} · {day.vibe}
          </div>
        </div>
        <Sticker tone={day.sticker} rotate={hover && !prefersReduced ? -8 : -3}>
          {day.label}
        </Sticker>
      </div>

      <div
        style={{
          position: "relative",
          marginTop: 14,
          border: "1.5px solid var(--ink)",
          aspectRatio: "16/9",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <img
          src={day.image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.95) contrast(1.04)",
            transform: hover && !prefersReduced ? "scale(1.04)" : "scale(1)",
            transition: "transform 600ms ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(26,22,18,0.5) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 12,
            right: 12,
            display: "flex",
            justifyContent: "space-between",
            color: "var(--cream)",
          }}
        >
          <span
            className="t-mono"
            style={{ fontSize: 10, letterSpacing: "0.2em" }}
          >
            EVIDENCE · {String(day.n).padStart(3, "0")}-A
          </span>
          <span
            className="t-mono"
            style={{ fontSize: 10, letterSpacing: "0.18em" }}
          >
            LEAD · {day.lead === "both" ? "AP + CL" : day.lead.toUpperCase()}
          </span>
        </div>
      </div>

      <p
        className="t-serif"
        style={{
          fontSize: 16,
          fontStyle: "italic",
          marginTop: 14,
          marginBottom: 10,
          color: "var(--ink)",
          position: "relative",
          zIndex: 1,
          lineHeight: 1.5,
        }}
      >
        <span style={{ background: "var(--cream)", padding: "0 4px" }}>BRIEF.</span>{" "}
        {day.brief}
      </p>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className="t-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "var(--wine)",
            marginTop: 6,
          }}
        >
          ▌ MOVES
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0" }}>
          {day.moves.map((m, i) => (
            <li
              key={i}
              className="t-typewriter"
              style={{
                fontSize: 13,
                padding: "3px 0",
                borderBottom: "1px dotted var(--pencil)",
                display: "flex",
                gap: 8,
              }}
            >
              <span style={{ color: "var(--amber-deep)", fontWeight: 700 }}>→</span>
              <span style={{ flex: 1 }}>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          position: "relative",
          zIndex: 1,
        }}
      >
        {day.pills.map((p, i) => (
          <Pill key={i} label={p.label} amt={p.amt} tone={p.tone} />
        ))}
        <span
          className="pill"
          style={{ background: "var(--ink)", color: "var(--cream)" }}
        >
          <span className="pill-label">DAY TOTAL</span>
          <span className="pill-amt">· {day.total}</span>
        </span>
      </div>

      <div className="intel" style={{ marginTop: 12, position: "relative", zIndex: 1 }}>
        {day.intel}
      </div>
    </motion.article>
  );
}

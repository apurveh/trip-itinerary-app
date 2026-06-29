import type { Trip } from "@/lib/types";
import AvatarChip from "@/components/brand/AvatarChip";
import Stamp from "@/components/primitives/Stamp";
import Image from "@/components/primitives/Image";

interface TripHeroProps {
  trip: Trip;
}

const HERO_TAGS = ["Piedmont", "Wine Country", "First Trip Together"];

/**
 * TripHero — mobile-first single-column hero. No absolute-positioned stamps,
 * tape, or rotated stickers layered over content. The hero image is never sliced.
 * Global CaseHeader already provides the ← FILING CABINET back affordance.
 */
export default function TripHero({ trip }: TripHeroProps) {
  // Strip "couple (fixed costs)" suffix — keep only the amount + currency
  const budgetDisplay = trip.budgetTotalDkk
    .replace("≈", "~")
    .replace(/ couple.*$/, "");
  const baseShort = trip.base.address.split(",")[0];
  const agents = trip.travelers.map((tr) => tr.initials).join(" + ");

  const metaItems: [string, string][] = [
    ["DURATION", `${trip.duration} DAYS`],
    ["BASE", baseShort],
    ["AGENTS", agents],
    ["BUDGET", budgetDisplay],
    ["TEMP", "30–35°C"],
  ];

  return (
    <section style={{ padding: "28px 0 36px" }}>
      <div className="case-container">
        {/* Eyebrow */}
        <p
          className="t-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.32em",
            color: "var(--wine)",
            margin: "0 0 10px",
            textTransform: "uppercase",
          }}
        >
          FIELD MANUAL · {trip.dates.toUpperCase()}
        </p>

        {/* Title — fluid clamp, ONE shadow, derived from codename */}
        <h1
          className="t-display"
          style={{
            fontSize: "clamp(2.4rem, 9vw, 5.5rem)",
            lineHeight: 0.92,
            margin: "0 0 14px",
            color: "var(--ink)",
            textShadow: "3px 3px 0 var(--amber)",
          }}
        >
          {trip.codename.toUpperCase()}
        </h1>

        {/* Tagline — italic serif quote voice */}
        <p
          className="t-serif"
          style={{
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            color: "var(--ink-soft)",
            margin: "0 0 20px",
          }}
        >
          &ldquo;{trip.tagline}&rdquo;
        </p>

        {/* Agents */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 22,
          }}
        >
          {trip.travelers.map((t) => (
            <AvatarChip key={t.name} traveler={t} big />
          ))}
        </div>

        {/* Flat tags — NOT rotated, NOT overlapping */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {HERO_TAGS.map((tag) => (
            <span
              key={tag}
              className="t-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                border: "1.5px solid var(--ink)",
                padding: "5px 11px",
                background: "var(--cream)",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hero image — full width, never clipped by a stamp */}
        <div style={{ marginBottom: 16 }}>
          <Image
            src={trip.heroImage}
            alt={`${trip.destination} — ${trip.codename}`}
            width={1200}
            height={1800}
            priority
          />
        </div>

        {/* ONE flat stamp accent — below the photo, not on it */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 24,
          }}
        >
          <Stamp rotate={0}>{trip.classification}</Stamp>
        </div>

        {/* Meta bar — wrapping auto-fit grid, never a fixed 5-col layout */}
        <div
          style={{
            borderTop: "2px solid var(--ink)",
            paddingTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "10px 0",
          }}
        >
          {metaItems.map(([k, v]) => (
            <div
              key={k}
              style={{ padding: "0 12px" }}
            >
              <div
                className="t-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "var(--pencil)",
                }}
              >
                {k}
              </div>
              <div className="t-stencil" style={{ fontSize: 16, marginTop: 2 }}>
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* Exchange note */}
        <div style={{ marginTop: 14, textAlign: "right" }}>
          <span
            className="t-mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--pencil)",
            }}
          >
            {trip.exchangeNote}
          </span>
        </div>
      </div>
    </section>
  );
}

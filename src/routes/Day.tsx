import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { loadTrip } from "@/lib/loadTrip";
import DayTimeline from "@/components/day/DayTimeline";
import DayGallery from "@/components/day/DayGallery";
import Image from "@/components/primitives/Image";
import Sticker from "@/components/primitives/Sticker";

export default function Day() {
  const { slug = "turin", n = "1" } = useParams();
  const navigate = useNavigate();
  const trip = loadTrip(slug);
  const day = trip?.days.find((d) => d.n === Number(n));

  // Scroll to top on day change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug, n]);

  if (!trip || !day) {
    return (
      <main className="case-container" style={{ padding: "80px 0" }}>
        <h1 className="t-display" style={{ fontSize: 56 }}>
          DAY NOT IN FILE
        </h1>
        <button className="btn" onClick={() => navigate(`/trips/${slug}`)}>
          ← BACK TO DOSSIER
        </button>
      </main>
    );
  }

  return (
    <main className="case-container" style={{ padding: "32px 0 80px" }}>
      {/* ── Back link ── */}
      <Link
        to={`/trips/${slug}`}
        className="t-mono"
        style={{ fontSize: 12, color: "var(--wine)" }}
      >
        ← DOSSIER
      </Link>

      {/* ── Hero image (aspect-ratio, not fixed height) ── */}
      {day.heroImage && (
        <div
          style={{
            marginTop: 16,
            border: "2px solid var(--ink)",
            boxShadow: "6px 6px 0 var(--ink)",
            overflow: "hidden",
          }}
        >
          <Image
            src={day.heroImage}
            alt={`${day.title} — Turin`}
            width={1200}
            height={675}
            priority
          />
        </div>
      )}

      {/* ── Header block ── */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 18,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Large day number */}
        <div
          className="t-display"
          style={{ fontSize: 88, lineHeight: 1, color: "var(--wine)", flexShrink: 0 }}
        >
          {String(day.n).padStart(2, "0")}
        </div>

        {/* Meta block */}
        <div style={{ display: "grid", gap: 6, paddingTop: 8, minWidth: 0 }}>
          {/* Flat sticker label (rotate=0 per spec "one flat Sticker") */}
          <Sticker tone={day.sticker} rotate={0}>
            {day.label}
          </Sticker>

          {/* Page title */}
          <h1
            className="t-display"
            style={{ fontSize: 40, margin: 0, lineHeight: 1, wordBreak: "break-word" }}
          >
            {day.title}
          </h1>

          {/* Weekday · date · vibe · lead */}
          <div
            className="t-mono"
            style={{ fontSize: 11, color: "var(--pencil)", letterSpacing: "0.06em" }}
          >
            {day.weekday} {day.date}
            {day.vibe ? ` · ${day.vibe}` : ""}
            {" · LEAD "}
            {day.lead.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Summary */}
      <p
        style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 17, lineHeight: 1.6, maxWidth: 640, marginTop: 16, marginBottom: 0, color: "var(--ink)" }}
      >
        {day.summary}
      </p>

      {/* Getting there */}
      <div
        className="t-typewriter"
        style={{
          fontSize: 12,
          color: "var(--ink-soft)",
          marginTop: 10,
          paddingTop: 10,
          borderTop: "1px dashed rgba(26,22,18,0.2)",
        }}
      >
        GETTING THERE · {day.transitFromBase}
      </div>

      {/* ── Shape-aware timeline ── */}
      <DayTimeline trip={trip} day={day} />

      {/* ── Gallery (guard: omit when empty) ── */}
      {day.photos.length > 0 && (
        <section style={{ marginTop: 40 }}>
          <h2
            className="t-display"
            style={{ fontSize: 26, marginBottom: 12 }}
          >
            GALLERY
          </h2>
          <DayGallery photos={day.photos} />
        </section>
      )}

      {/* ── Intel (guard: omit when empty) ── */}
      {day.intel.length > 0 && (
        <section style={{ marginTop: 40 }}>
          <h2
            className="t-display"
            style={{ fontSize: 26, marginBottom: 10 }}
          >
            INTEL
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
            {day.intel.map((item, i) => (
              <li
                key={i}
                className="intel"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Prev / Next day navigation ── */}
      <nav
        aria-label="Day navigation"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 48,
          gap: 12,
        }}
      >
        {day.n > 1 ? (
          <Link
            to={`/trips/${slug}/day/${day.n - 1}`}
            className="btn ghost"
          >
            ← DAY {String(day.n - 1).padStart(2, "0")}
          </Link>
        ) : (
          <span />
        )}

        {day.n < trip.days.length ? (
          <Link
            to={`/trips/${slug}/day/${day.n + 1}`}
            className="btn ghost"
          >
            DAY {String(day.n + 1).padStart(2, "0")} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}

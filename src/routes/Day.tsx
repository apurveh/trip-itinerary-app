import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { loadTrip } from "@/lib/loadTrip";
import Anchors from "@/components/day/Anchors";
import Sticker from "@/components/primitives/Sticker";

export default function Day() {
  const { slug = "turin", n = "1" } = useParams();
  const navigate = useNavigate();
  const trip = loadTrip(slug);
  const day = trip?.days.find((d) => d.n === Number(n));
  useEffect(() => { window.scrollTo({ top: 0 }); }, [slug, n]);
  if (!trip || !day) {
    return (
      <main className="case-container" style={{ padding: "80px 0" }}>
        <h1 className="t-display" style={{ fontSize: 56 }}>DAY NOT IN FILE</h1>
        <button className="btn" onClick={() => navigate(`/trips/${slug}`)}>← BACK TO DOSSIER</button>
      </main>
    );
  }
  return (
    <main className="case-container" style={{ padding: "32px 0 80px" }}>
      <Link to={`/trips/${slug}`} className="t-mono" style={{ fontSize: 12, color: "var(--wine)" }}>← DOSSIER</Link>
      <div style={{ marginTop: 16, display: "flex", gap: 18, alignItems: "baseline", flexWrap: "wrap" }}>
        <div className="t-display" style={{ fontSize: 96, lineHeight: 1, color: "var(--wine)" }}>{String(day.n).padStart(2, "0")}</div>
        <div>
          <Sticker tone={day.sticker}>{day.label}</Sticker>
          <h1 className="t-display" style={{ fontSize: 48, margin: "6px 0 0" }}>{day.title}</h1>
          <div className="t-mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{day.weekday} {day.date} · {day.vibe} · LEAD {day.lead.toUpperCase()}</div>
        </div>
      </div>
      <p className="t-serif" style={{ fontStyle: "italic", maxWidth: 640, marginTop: 18 }}>{day.summary}</p>
      <div className="t-typewriter" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 8 }}>GETTING THERE · {day.transitFromBase}</div>
      <h2 className="t-display" style={{ fontSize: 32, marginTop: 32 }}>⏱ ANCHORS</h2>
      <Anchors anchors={day.anchors} />
    </main>
  );
}

import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { loadTrip } from "@/lib/loadTrip";
import Anchors from "@/components/day/Anchors";
import IdeaCard from "@/components/day/IdeaCard";
import DayGallery from "@/components/day/DayGallery";
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
      {day.heroImage && (
        <img
          src={day.heroImage}
          alt={`${day.title} — Turin`}
          loading="lazy"
          style={{ display: "block", width: "100%", height: 220, objectFit: "cover",
            border: "2px solid var(--ink)", boxShadow: "6px 6px 0 var(--ink)", marginTop: 16 }}
        />
      )}
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
      {day.ideas.length > 0 && (<>
        <h2 className="t-display" style={{ fontSize: 32, marginTop: 36 }}>🎲 THE MENU</h2>
        <div className="t-typewriter" style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 12 }}>Pick any, skip any, in any order.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {day.ideas.map((idea, i) => <IdeaCard key={i} idea={idea} />)}
        </div>
      </>)}
      {day.photos.length > 0 && (<>
        <h2 className="t-display" style={{ fontSize: 32, marginTop: 36 }}>📸 GALLERY</h2>
        <DayGallery photos={day.photos} />
      </>)}
      {day.intel.length > 0 && (<>
        <h2 className="t-display" style={{ fontSize: 32, marginTop: 36 }}>🕵️ INTEL</h2>
        <ul className="t-typewriter" style={{ fontSize: 13, lineHeight: 1.7 }}>
          {day.intel.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </>)}
    </main>
  );
}

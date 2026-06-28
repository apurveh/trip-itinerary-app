import type { Idea } from "@/lib/types";
import { mapsLink } from "@/lib/mapsLink";

export default function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <article className="hover-lift" style={{ border: "2px solid var(--ink)", background: "var(--paper)",
      boxShadow: "5px 5px 0 var(--ink)", overflow: "hidden", display: "grid", gap: 0 }}>
      {idea.photo && (
        <img
          src={idea.photo.src}
          alt={idea.photo.alt}
          loading="lazy"
          style={{ display: "block", width: "100%", height: 140, objectFit: "cover",
            borderBottom: "2px solid var(--ink)" }}
        />
      )}
      <div style={{ padding: 16, display: "grid", gap: 6 }}>
      <div className="t-display" style={{ fontSize: 22 }}>{idea.name}</div>
      <div className="t-typewriter" style={{ fontSize: 13, color: "var(--ink-soft)" }}>{idea.why}</div>
      <div className="t-mono" style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.12em" }}>
        {[idea.area, idea.cost].filter(Boolean).join(" · ")}
      </div>
      {idea.tip && <div className="t-typewriter" style={{ fontSize: 12, color: "var(--wine)" }}>TIP · {idea.tip}</div>}
      <a href={mapsLink(idea.mapsQuery)} target="_blank" rel="noreferrer" className="t-mono"
         style={{ fontSize: 12, color: "var(--wine)", marginTop: 4 }}>OPEN IN MAPS →</a>
      </div>
    </article>
  );
}

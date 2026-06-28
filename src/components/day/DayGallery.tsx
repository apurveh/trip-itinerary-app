import type { Photo } from "@/lib/types";

export default function DayGallery({ photos }: { photos: Photo[] }) {
  if (!photos.length) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
      {photos.map((p, i) => (
        <figure key={i} style={{ margin: 0, border: "2px solid var(--ink)", boxShadow: "4px 4px 0 var(--ink)" }}>
          <img src={p.src} alt={p.alt} loading="lazy" style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
          {p.credit && <figcaption className="t-mono" style={{ fontSize: 9, padding: "2px 6px", color: "var(--ink-soft)" }}>{p.credit}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

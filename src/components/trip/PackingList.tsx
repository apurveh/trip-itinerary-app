import { useLocalStorage } from "@/lib/useLocalStorage";
import SectionHead from "@/components/trip/SectionHead";
export default function PackingList({ items }: { items: string[] }) {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>("packing", {});
  const toggle = (i: string) => setChecked({ ...checked, [i]: !checked[i] });
  return (
    <div style={{ border: "2px solid var(--ink)", background: "var(--paper)", padding: 18, boxShadow: "5px 5px 0 var(--ink)" }}>
      <SectionHead eyebrow="PACKING" title="Packing" />
      <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "grid", gap: 6 }}>
        {items.map((it) => (
          <li key={it}>
            <label className="t-typewriter" style={{ fontSize: 13, display: "flex", gap: 8, cursor: "pointer", textDecoration: checked[it] ? "line-through" : "none", opacity: checked[it] ? 0.55 : 1 }}>
              <input type="checkbox" checked={!!checked[it]} onChange={() => toggle(it)} /> {it}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

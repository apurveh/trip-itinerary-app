import type { Traveler } from "@/lib/types";

interface AvatarChipProps {
  traveler: Traveler;
  big?: boolean;
}

const COLORS: Record<string, { bg: string; ink: string }> = {
  amber: { bg: "#f3c987", ink: "var(--ink)" },
  pink: { bg: "#f0b8cd", ink: "var(--ink)" },
};

export default function AvatarChip({ traveler, big = false }: AvatarChipProps) {
  const c = COLORS[traveler.color] ?? COLORS.amber;
  const size = big ? 48 : 26;
  return (
    <div
      className="avatar-chip"
      style={{ padding: big ? "6px 16px 6px 6px" : undefined, fontSize: big ? 15 : 13 }}
    >
      <span
        className="avatar-dot"
        style={{ background: c.bg, width: size, height: size, fontSize: big ? 22 : 14 }}
        aria-hidden
      >
        {traveler.emoji}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <strong style={{ letterSpacing: "0.04em" }}>{traveler.name}</strong>
        {big && (
          <span
            className="t-mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              opacity: 0.6,
              textTransform: "uppercase",
            }}
          >
            {traveler.role}
          </span>
        )}
      </div>
    </div>
  );
}

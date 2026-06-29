import type { Traveler } from "@/lib/types";
import Avatar from "./Avatar";

interface AvatarChipProps {
  traveler: Traveler;
  big?: boolean;
}

export default function AvatarChip({ traveler, big = false }: AvatarChipProps) {
  const size = big ? 48 : 26;
  return (
    <div
      className="avatar-chip"
      style={{ padding: big ? "6px 16px 6px 6px" : undefined, fontSize: big ? 15 : 13 }}
    >
      <span
        className="avatar-dot"
        style={{
          width: size,
          height: size,
          background: "var(--paper)",
          overflow: "hidden",
        }}
        aria-hidden
      >
        <Avatar traveler={traveler} size={size} />
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

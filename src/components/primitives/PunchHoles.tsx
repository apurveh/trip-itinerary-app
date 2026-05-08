interface PunchHolesProps {
  count?: number;
  side?: "left" | "right";
}

export default function PunchHoles({ count = 3, side = "left" }: PunchHolesProps) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        [side]: -7,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "32px 0",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="punch" />
      ))}
    </div>
  );
}

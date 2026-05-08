interface PassportStampProps {
  code: string;
  locked?: boolean;
}

export default function PassportStamp({ code, locked = false }: PassportStampProps) {
  return (
    <div
      style={{
        width: 140,
        height: 140,
        display: "grid",
        placeItems: "center",
        border: "3px solid " + (locked ? "var(--pencil)" : "var(--classified)"),
        borderRadius: "50%",
        transform: "rotate(-8deg)",
        color: locked ? "var(--pencil)" : "var(--classified)",
        opacity: locked ? 0.35 : 0.85,
        position: "relative",
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 8,
          border: "1.5px dashed currentColor",
          borderRadius: "50%",
        }}
      />
      <div style={{ textAlign: "center", padding: 18 }}>
        <div className="t-stencil" style={{ fontSize: 11, letterSpacing: "0.18em" }}>
          {locked ? "STAMP PENDING" : "CASE CLOSED"}
        </div>
        <div className="t-display" style={{ fontSize: 28, marginTop: 4 }}>
          {code}
        </div>
        <div
          className="t-mono"
          style={{ fontSize: 9, marginTop: 4, letterSpacing: "0.15em" }}
        >
          {locked ? "AWAITING TRAVEL" : "FILE ARCHIVED"}
        </div>
      </div>
    </div>
  );
}

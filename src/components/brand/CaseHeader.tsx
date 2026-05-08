import { Link, useLocation } from "react-router-dom";

export default function CaseHeader() {
  const { pathname } = useLocation();
  const onHub = pathname === "/" || pathname === "";
  const onTrip = pathname.startsWith("/trips");

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--ink)",
        color: "var(--manila-light)",
        borderBottom: "3px double var(--amber)",
      }}
    >
      <div
        className="case-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 28px",
          gap: 24,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              border: "2px solid var(--amber)",
              display: "grid",
              placeItems: "center",
              transform: "rotate(-4deg)",
            }}
          >
            <span className="t-stencil" style={{ fontSize: 18, color: "var(--amber)" }}>
              C&amp;A
            </span>
          </div>
          <div className="t-stencil" style={{ fontSize: 14, letterSpacing: "0.22em" }}>
            THE CLARA &amp; APURVA FILES
          </div>
        </Link>
        <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Link
            to="/"
            className="t-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: onHub ? "var(--amber)" : "var(--manila-light)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            · The Hub
          </Link>
          <Link
            to="/trips/turin"
            className="t-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: onTrip ? "var(--amber)" : "var(--manila-light)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            · Files 001 / Torino
          </Link>
          <span
            className="t-mono"
            style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.15em" }}
          >
            CLEARANCE: COUPLE
          </span>
        </nav>
      </div>
    </header>
  );
}

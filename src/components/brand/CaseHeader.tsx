import { Link, useMatch } from "react-router-dom";

/**
 * CaseHeader — compact sticky bar, 56 px tall.
 * • position:sticky + top:0 reserves space naturally (no overlap).
 * • .safe-t adds env(safe-area-inset-top) for notched iOS devices.
 * • Wordmark always left; back affordance right (context-aware).
 * • All interactive targets use .tap (min-height 44 px).
 */
export default function CaseHeader() {
  const onDay  = useMatch("/trips/:slug/day/:n");
  const onTrip = useMatch("/trips/:slug");

  let backLink: { to: string; label: string } | null = null;
  if (onDay) {
    backLink = { to: `/trips/${onDay.params.slug}`, label: "← DAY INDEX" };
  } else if (onTrip) {
    backLink = { to: "/", label: "← FILING CABINET" };
  }

  return (
    <header
      className="safe-t"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        minHeight: "var(--header-h)",
        background: "var(--ink)",
        color: "var(--manila-light)",
        borderBottom: "2px solid var(--wine)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="case-container"
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          minWidth: 0,
          gap: 12,
        }}
      >
        {/* Wordmark — flex-shrinks so it never clips; ellipsis when space is tight */}
        <Link
          to="/"
          className="t-stencil tap"
          style={{
            fontSize: 13,
            letterSpacing: "0.18em",
            color: "var(--manila-light)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
            flexShrink: 1,
          }}
          aria-label="Home — The Clara & Apurva Files"
        >
          THE CLARA &amp; APURVA FILES
        </Link>

        {/* Push back affordance to the right */}
        <div style={{ flex: 1 }} aria-hidden="true" />

        {/* Context-aware back affordance */}
        {backLink && (
          <Link
            to={backLink.to}
            className="t-mono tap"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--manila-light)",
              textDecoration: "none",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {backLink.label}
          </Link>
        )}
      </div>
    </header>
  );
}

import type { BookingState } from "@/lib/types";

interface BookingChipProps {
  state: BookingState;
  link?: string;
  timeLock?: boolean;
}

/**
 * BookingChip — renders the booking status badge for an Anchor.
 *
 * - "booked"  → solid wine chip + ✓ checkmark + "BOOKED"
 * - "toBook"  → outlined ghost chip + → arrow + "BOOK THIS" link
 * - "na"      → renders nothing
 * - timeLock  → adds a red (var(--classified)) alarm ⚠ marker IN ADDITION to the chip
 *
 * Distinguishable by SHAPE + ICON + TEXT — never color alone.
 */
export default function BookingChip({
  state,
  link,
  timeLock = false,
}: BookingChipProps) {
  if (state === "na") return null;

  const isBooked = state === "booked";

  return (
    <span
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* Time-lock alarm — red marker shown IN ADDITION to the chip */}
      {timeLock && (
        <span
          className="t-stencil"
          aria-label="time-locked: do not miss"
          title="Hard time lock — cannot be missed"
          style={{
            color: "var(--classified)",
            fontSize: 12,
            letterSpacing: "0.06em",
          }}
        >
          ⚠ LOCK
        </span>
      )}

      {isBooked ? (
        /* ── BOOKED chip: non-interactive STATUS BADGE (solid wine + ✓) ──
           Not a .tap target — it's a badge, not a button. Inline minHeight
           keeps it visually consistent with the interactive chips. */
        <span
          className="t-stencil"
          aria-label="booked"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            minHeight: 30,
            padding: "0 12px",
            background: "var(--wine)",
            color: "var(--cream)",
            border: "2px solid var(--wine)",
            fontSize: 12,
            letterSpacing: "0.1em",
          }}
        >
          {/* Shape distinguisher: filled rectangle (via background fill) + ✓ */}
          <span aria-hidden="true">✓</span>
          BOOKED
        </span>
      ) : (
        /* ── TO-BOOK chip: interactive ghost LINK (outline only + →) ── */
        <a
          href={link ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="t-stencil tap"
          aria-label="book this (opens external booking page)"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "0 12px",
            background: "transparent",
            color: "var(--ink)",
            border: "2px solid var(--ink)",
            fontSize: 12,
            letterSpacing: "0.1em",
            textDecoration: "none",
            /* Shape distinguisher: outlined rectangle — no background fill */
          }}
        >
          {/* Shape distinguisher: outline only + → arrow */}
          <span aria-hidden="true">→</span>
          BOOK THIS
        </a>
      )}
    </span>
  );
}

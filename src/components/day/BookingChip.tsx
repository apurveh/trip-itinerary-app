import { useState } from "react";
import type { BookingState } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface BookingChipProps {
  state: BookingState;
  link?: string;
  confirmationKey?: string;
  timeLock?: boolean;
}

/**
 * BookingChip — renders the booking status badge for an Anchor.
 *
 * - "booked"  → solid wine chip + ✓ checkmark + "BOOKED" + optional conf-number input
 * - "toBook"  → outlined ghost chip + → arrow + "BOOK THIS" link; if confirmationKey is
 *               given and a conf number exists in localStorage the chip flips to the
 *               booked appearance locally (without a server round-trip).
 * - "na"      → renders nothing
 * - timeLock  → adds a red (var(--classified)) alarm ⚠ marker IN ADDITION to the chip
 *
 * Distinguishable by SHAPE + ICON + TEXT — never color alone.
 *
 * Hook split: chips WITH a confirmationKey persist via useLocalStorage (so the
 * flip-on-conf survives reloads); chips WITHOUT a key use transient useState and
 * never touch localStorage. Both paths feed the SAME confValue into the view, so
 * the single source of truth — driving both `hasConf` and the input — is intact.
 */
export default function BookingChip(props: BookingChipProps) {
  return props.confirmationKey ? (
    <KeyedBookingChip {...props} confirmationKey={props.confirmationKey} />
  ) : (
    <UnkeyedBookingChip {...props} />
  );
}

/** Persistent variant — flip-on-conf survives reloads via localStorage. */
function KeyedBookingChip(props: BookingChipProps & { confirmationKey: string }) {
  const [confValue, setConfValue] = useLocalStorage<string>(
    `conf:${props.confirmationKey}`,
    ""
  );
  return <ChipView {...props} confValue={confValue} setConfValue={setConfValue} />;
}

/** Transient variant — no confirmationKey, so it never touches localStorage. */
function UnkeyedBookingChip(props: BookingChipProps) {
  const [confValue, setConfValue] = useState("");
  return <ChipView {...props} confValue={confValue} setConfValue={setConfValue} />;
}

/** Presentational core — appearance + input, driven by a single confValue. */
function ChipView({
  state,
  link,
  confirmationKey,
  timeLock = false,
  confValue,
  setConfValue,
}: BookingChipProps & {
  confValue: string;
  setConfValue: (v: string) => void;
}) {
  if (state === "na") return null;

  // Effective state: toBook flips to booked once a conf number exists.
  const hasConf = Boolean(confirmationKey && confValue.trim());
  const effectiveState: BookingState =
    state === "toBook" && hasConf ? "booked" : state;

  const isBooked = effectiveState === "booked";

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

      {/* Conf-number input: shown whenever confirmationKey is provided.
          Uses the SAME state instance as the chip appearance check above,
          so typing a conf number immediately flips toBook → booked. */}
      {confirmationKey && (
        <input
          value={confValue}
          onChange={(e) => setConfValue(e.target.value)}
          placeholder="conf #"
          aria-label="confirmation number"
          className="t-mono tap"
          style={{
            fontSize: 16,
            padding: "0 8px",
            border: "1.5px dashed var(--ink)",
            background: "var(--cream)",
            maxWidth: "14ch",
            minWidth: "6ch",
            width: "14ch",
            /* min-height: 44px guaranteed by globals.css `input { min-height: 44px }` */
          }}
        />
      )}
    </span>
  );
}

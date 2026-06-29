import type { Anchor, Idea, IconName } from "@/lib/types";
import Icon from "@/components/primitives/Icon";
import { mapsLink } from "@/lib/mapsLink";
import BookingChip from "./BookingChip";

interface StopRowProps {
  anchor?: Anchor;
  idea?: Idea;
  timeLock?: boolean;
  stepIndex?: number;
  optional?: boolean;
  duration?: string;
}

/**
 * StopRow — one entry in the day timeline.
 *
 * Pass EITHER `anchor` OR `idea` (not both).
 *
 * Layout (mobile-first, 320px safe):
 *   [step#?] [type icon] [time?]  [name]
 *                                 [detail / why]
 *                                 [extras: area · cost · tip]
 *                                 [BookingChip] [map-pin link]
 *
 * Every interactive element has min-height 44px via `.tap`.
 * Map-pin is its own full tap target only when mapsQuery is present.
 */
export default function StopRow({
  anchor,
  idea,
  timeLock = false,
  stepIndex,
  optional = false,
  duration,
}: StopRowProps) {
  if (!anchor && !idea) return null;

  // Derive display values
  const isAnchor = Boolean(anchor);
  const label = anchor ? anchor.label : idea!.name;
  const detail = anchor ? anchor.detail : idea!.why;
  const mapsQuery = anchor ? anchor.mapsQuery : idea!.mapsQuery;

  // Icon name: anchors use their type; ideas use kind ?? "viewpoint" as fallback
  const iconName: IconName = isAnchor
    ? anchor!.type
    : ((idea!.kind ?? "viewpoint") as IconName);

  return (
    <article
      style={{
        display: "grid",
        /* Two columns: narrow left gutter (icon + optional step) + content */
        gridTemplateColumns: "auto 1fr",
        gap: "0 10px",
        padding: "12px 0",
        borderBottom: "1px solid rgba(26,22,18,0.12)",
        opacity: optional ? 0.85 : 1,
      }}
    >
      {/* ── LEFT GUTTER: step number (if route day) + type icon ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          paddingTop: 2,
        }}
      >
        {stepIndex !== undefined && (
          <span
            className="t-stencil"
            style={{
              fontSize: 11,
              color: "var(--wine)",
              lineHeight: 1,
            }}
          >
            {stepIndex}
          </span>
        )}
        <Icon name={iconName} size={18} />
      </div>

      {/* ── RIGHT CONTENT ── */}
      <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
        {/* Row 1: time + name (wrap on narrow screens) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "2px 10px",
          }}
        >
          {anchor?.time && (
            <time
              className="t-mono"
              dateTime={anchor.time}
              style={{
                fontSize: 12,
                color: "var(--wine)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {anchor.time}
            </time>
          )}
          <span
            className="t-display"
            style={{
              fontSize: 18,
              lineHeight: 1.1,
              /* Allow name to wrap rather than overflow */
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {label}
          </span>
          {duration && (
            <span
              className="t-mono"
              style={{
                fontSize: 10,
                color: "var(--pencil)",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {duration}
            </span>
          )}
          {optional && (
            <span
              className="t-mono"
              style={{
                fontSize: 10,
                color: "var(--pencil)",
                letterSpacing: "0.12em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              OPTIONAL
            </span>
          )}
        </div>

        {/* Row 2: one-line detail / why */}
        {detail && (
          <p
            className="t-typewriter"
            style={{
              margin: 0,
              fontSize: 13,
              color: "var(--ink-soft)",
              lineHeight: 1.4,
              /* Never overflow; wrap */
              overflowWrap: "break-word",
            }}
          >
            {detail}
          </p>
        )}

        {/* Row 3: idea extras (area · cost · tip) */}
        {idea && (idea.area || idea.cost || idea.tip) && (
          <div
            className="t-mono"
            style={{
              fontSize: 11,
              color: "var(--pencil)",
              letterSpacing: "0.06em",
              display: "flex",
              flexWrap: "wrap",
              gap: "2px 8px",
            }}
          >
            {idea.area && <span>{idea.area}</span>}
            {idea.cost && (
              <span style={{ color: "var(--ink)" }}>
                {idea.area ? "· " : ""}
                {idea.cost}
              </span>
            )}
            {idea.tip && (
              <span style={{ color: "var(--wine)" }}>
                TIP · {idea.tip}
              </span>
            )}
          </div>
        )}

        {/* Row 4: BookingChip + map-pin */}
        {(anchor || mapsQuery) && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8,
              marginTop: 4,
            }}
          >
            {/* BookingChip only for anchors */}
            {anchor && anchor.booking !== "na" && (
              <BookingChip
                state={anchor.booking}
                link={anchor.bookingLink}
                timeLock={timeLock}
              />
            )}

            {/* Map-pin: full tap target, only when mapsQuery is present */}
            {mapsQuery && (
              <a
                href={mapsLink(mapsQuery)}
                target="_blank"
                rel="noreferrer"
                className="tap"
                aria-label={`Open ${label} in maps`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "0 8px",
                  color: "var(--ink)",
                  textDecoration: "none",
                  border: "1.5px solid transparent",
                  /* Ensure full 44px tap target on its own */
                  minHeight: 44,
                }}
              >
                <Icon name="map-pin" size={16} title={`Map: ${label}`} />
                <span className="t-mono" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
                  MAP
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

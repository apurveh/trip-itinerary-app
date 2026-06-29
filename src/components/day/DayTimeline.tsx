import { useEffect, useRef } from "react";
import type { Anchor, Day, Idea, Trip } from "@/lib/types";
import { tripStatusAt, nextStop } from "@/lib/tripClock";
import StopRow from "@/components/day/StopRow";
import Icon from "@/components/primitives/Icon";

interface DayTimelineProps {
  trip: Trip;
  day: Day;
}

// ─── Live-highlight helpers ────────────────────────────────────────────────

function getNowHHMM(): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function hhmmToMin(hhmm: string): number {
  return parseInt(hhmm.slice(0, 2)) * 60 + parseInt(hhmm.slice(3, 5));
}

// ─── Unified item type ────────────────────────────────────────────────────

type TimelineItem =
  | { kind: "anchor"; anchor: Anchor; order: number; section?: string }
  | { kind: "idea"; idea: Idea; order: number; section?: string; optional?: boolean };

// ─── Component ────────────────────────────────────────────────────────────

export default function DayTimeline({ trip, day }: DayTimelineProps) {
  // Compute live status once per render (Date.now() — no interval, static render is fine)
  const nowISO = new Date().toISOString();
  const { status, dayNumber } = tripStatusAt(nowISO, trip.startISO, trip.endISO);
  const isToday = status === "in_progress" && dayNumber === day.n;

  const currentHHMM = isToday ? getNowHHMM() : "00:00";
  const currentMin = isToday ? hhmmToMin(currentHHMM) : 0;
  void currentMin; // unused after removing band logic — kept for future heat-window use

  const nextStopResult = isToday ? nextStop(day, currentHHMM) : null;
  const nextAnchorTarget: Anchor | null =
    nextStopResult !== null && nextStopResult.kind === "anchor"
      ? nextStopResult.anchor
      : null;

  // Ref for scroll-into-view on today (next timed anchor)
  const currentItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!isToday) return;
    if (currentItemRef.current) {
      currentItemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isToday]);

  // ── Build unified ordered sequence ──────────────────────────────────────

  const items: TimelineItem[] = [
    ...day.anchors.map((a) => ({
      kind: "anchor" as const,
      anchor: a,
      order: a.order ?? 0,
      section: a.section,
    })),
    ...day.ideas.map((i) => ({
      kind: "idea" as const,
      idea: i,
      order: i.order ?? 0,
      section: i.section,
      optional: i.optional,
    })),
  ];

  // Stable sort ascending by order (JS sort is stable since ES2019)
  items.sort((a, b) => a.order - b.order);

  if (items.length === 0) return null;

  // Pre-compute which items need a section divider
  const itemsWithDividers = items.map((item, idx) => {
    const prev = idx > 0 ? items[idx - 1] : null;
    const showDivider = item.section !== undefined && item.section !== prev?.section;
    return { ...item, showDivider };
  });

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 0 }}>
        {itemsWithDividers.map((item) => {
          const isNext =
            item.kind === "anchor" && isToday && item.anchor === nextAnchorTarget;
          const key = item.kind === "anchor" ? item.anchor.label : item.idea.name;

          return (
            <li
              key={key}
              ref={isNext ? currentItemRef : undefined}
              aria-current={isNext ? "true" : undefined}
              className={isNext ? "scroll-target" : undefined}
            >
              {/* Section divider — reuse band-heading style */}
              {item.showDivider && (
                <h2
                  className="t-display"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.18em",
                    color: "var(--pencil)",
                    marginTop: 32,
                    marginBottom: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    borderBottom: "1px solid rgba(26,22,18,0.15)",
                    paddingBottom: 6,
                  }}
                >
                  <Icon name="sun-arc" size={14} />
                  {item.section}
                </h2>
              )}

              {/* Stop row */}
              {item.kind === "anchor" ? (
                <StopRow
                  anchor={item.anchor}
                  timeLock={Boolean(item.anchor.timeLock)}
                  duration={item.anchor.duration}
                />
              ) : (
                <StopRow
                  idea={item.idea}
                  optional={item.optional}
                  duration={item.idea.duration}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

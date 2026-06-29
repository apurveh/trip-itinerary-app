import { useEffect, useRef } from "react";
import type { Anchor, BandKey, Day, Trip } from "@/lib/types";
import { buildAnchoredDay, anytimeIdeas, isHeatWindow, bandOf } from "@/lib/dayBands";
import { tripStatusAt, nextStop } from "@/lib/tripClock";
import StopRow from "@/components/day/StopRow";
import Icon from "@/components/primitives/Icon";

interface DayTimelineProps {
  trip: Trip;
  day: Day;
}

const BAND_LABELS: Record<BandKey, string> = {
  morning: "MORNING",
  midday: "MIDDAY",
  afternoon: "AFTERNOON",
  evening: "EVENING",
};

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

// ─── Component ────────────────────────────────────────────────────────────

export default function DayTimeline({ trip, day }: DayTimelineProps) {
  // Compute live status once per render (Date.now() — no interval, static render is fine)
  const nowISO = new Date().toISOString();
  const { status, dayNumber } = tripStatusAt(nowISO, trip.startISO, trip.endISO);
  const isToday = status === "in_progress" && dayNumber === day.n;

  const currentHHMM = isToday ? getNowHHMM() : "00:00";
  const currentMin = isToday ? hhmmToMin(currentHHMM) : 0;
  const currentBandKey: BandKey | null = isToday ? bandOf(currentMin) : null;

  const nextStopResult = isToday ? nextStop(day, currentHHMM) : null;
  const nextAnchorTarget: Anchor | null =
    nextStopResult !== null && nextStopResult.kind === "anchor"
      ? nextStopResult.anchor
      : null;

  // Refs for scroll-into-view on today
  const currentSectionRef = useRef<HTMLElement>(null);
  const currentItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!isToday) return;
    const el: Element | null = currentItemRef.current ?? currentSectionRef.current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isToday]);

  // ── ANCHORED ────────────────────────────────────────────────────────────
  if (day.shape === "anchored") {
    const bands = buildAnchoredDay(day);
    const ideas = anytimeIdeas(day);
    if (bands.length === 0 && ideas.length === 0) return null;

    return (
      <div>
        {bands.length > 0 && (
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 0 }}>
            {bands.map(({ band, anchors }) => {
              const isCurrent = isToday && band === currentBandKey;
              const hasHeat = anchors.some(
                (a) => a.startMin !== undefined && isHeatWindow(a.startMin),
              );
              return (
                <li key={band}>
                  <section
                    ref={isCurrent ? currentSectionRef : undefined}
                    aria-current={isCurrent ? "true" : undefined}
                    className="scroll-target"
                    style={{ marginTop: 32 }}
                  >
                    {/* Band heading */}
                    <h2
                      className="t-display"
                      style={{
                        fontSize: 13,
                        letterSpacing: "0.18em",
                        color: "var(--pencil)",
                        marginBottom: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        borderBottom: "1px solid rgba(26,22,18,0.15)",
                        paddingBottom: 6,
                      }}
                    >
                      <Icon name="sun-arc" size={14} />
                      {BAND_LABELS[band]}
                      {hasHeat && (
                        <span
                          className="t-mono"
                          style={{
                            fontSize: 10,
                            color: "var(--amber-deep)",
                            letterSpacing: "0.1em",
                            marginLeft: 8,
                          }}
                        >
                          ☀ HOT · INDOORS 13–16
                        </span>
                      )}
                    </h2>

                    {/* Anchors in this band */}
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {anchors.map((a) => {
                        const isNext = isToday && a === nextAnchorTarget;
                        return (
                          <li
                            key={a.label}
                            ref={isNext ? currentItemRef : undefined}
                            aria-current={isNext ? "true" : undefined}
                            className={isNext ? "scroll-target" : undefined}
                          >
                            <StopRow anchor={a} />
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </li>
              );
            })}
          </ol>
        )}

        {/* ANYTIME section */}
        {ideas.length > 0 && (
          <section style={{ marginTop: 36 }}>
            <h2
              className="t-display"
              style={{
                fontSize: 13,
                letterSpacing: "0.18em",
                color: "var(--pencil)",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderBottom: "1px solid rgba(26,22,18,0.15)",
                paddingBottom: 6,
              }}
            >
              <Icon name="map-pin" size={14} />
              ANYTIME · NEARBY
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {ideas.map((idea) => (
                <li key={idea.name}>
                  <StopRow idea={idea} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  // ── ROUTE ───────────────────────────────────────────────────────────────
  if (day.shape === "route") {
    const ideas = day.ideas;
    const untimedAnchors = day.anchors.filter((a) => !a.time);
    const timedAnchors = day.anchors.filter((a) => Boolean(a.time));

    if (untimedAnchors.length === 0 && ideas.length === 0 && timedAnchors.length === 0) {
      return null;
    }

    return (
      <div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 0 }}>
          {/* Logistics (untimed anchors) — no step number */}
          {untimedAnchors.map((a) => {
            const isNext = isToday && a === nextAnchorTarget;
            return (
              <li
                key={a.label}
                ref={isNext ? currentItemRef : undefined}
                aria-current={isNext ? "true" : undefined}
                className={isNext ? "scroll-target" : undefined}
              >
                <StopRow anchor={a} />
              </li>
            );
          })}

          {/* Numbered idea steps */}
          {ideas.map((idea, i) => (
            <li key={idea.name}>
              <StopRow idea={idea} stepIndex={i + 1} />
            </li>
          ))}

          {/* Timed anchors pinned with timeLock (e.g. return train) */}
          {timedAnchors.map((a) => {
            const isNext = isToday && a === nextAnchorTarget;
            return (
              <li
                key={a.label}
                ref={isNext ? currentItemRef : undefined}
                aria-current={isNext ? "true" : undefined}
                className={isNext ? "scroll-target" : undefined}
              >
                <StopRow anchor={a} timeLock />
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  // ── TRANSIT ─────────────────────────────────────────────────────────────
  if (day.shape === "transit") {
    const anchors = day.anchors;
    const ideas = day.ideas;
    if (anchors.length === 0 && ideas.length === 0) return null;

    return (
      <div>
        {anchors.length > 0 && (
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 0 }}>
            {anchors.map((a) => {
              const isNext = isToday && a === nextAnchorTarget;
              return (
                <li
                  key={a.label}
                  ref={isNext ? currentItemRef : undefined}
                  aria-current={isNext ? "true" : undefined}
                  className={isNext ? "scroll-target" : undefined}
                >
                  <StopRow anchor={a} timeLock={Boolean(a.time)} />
                </li>
              );
            })}
          </ol>
        )}

        {/* ANYTIME section */}
        {ideas.length > 0 && (
          <section style={{ marginTop: 36 }}>
            <h2
              className="t-display"
              style={{
                fontSize: 13,
                letterSpacing: "0.18em",
                color: "var(--pencil)",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderBottom: "1px solid rgba(26,22,18,0.15)",
                paddingBottom: 6,
              }}
            >
              <Icon name="map-pin" size={14} />
              ANYTIME · NEARBY
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {ideas.map((idea) => (
                <li key={idea.name}>
                  <StopRow idea={idea} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  return null;
}

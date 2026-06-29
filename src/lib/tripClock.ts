import type { Anchor, BandKey, Day, TripStatus } from "./types";
import { parseStartMin } from "./parseTime";

const DAY_MS = 86_400_000;
const toUTC = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const hhmmToMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));
const anchorMin = (a: Anchor) => a.startMin ?? parseStartMin(a.time);

export function tripStatusAt(nowISO: string, startISO: string, endISO: string): {
  status: TripStatus; dayNumber: number | null; daysUntil: number;
} {
  const now = toUTC(nowISO.slice(0, 10)), start = toUTC(startISO), end = toUTC(endISO);
  const daysUntil = Math.round((start - now) / DAY_MS);
  if (now < start) return { status: "upcoming", dayNumber: null, daysUntil };
  if (now > end) return { status: "completed", dayNumber: null, daysUntil: 0 };
  return { status: "in_progress", dayNumber: Math.round((now - start) / DAY_MS) + 1, daysUntil: 0 };
}

export function nextAnchor(day: Day, nowHHMM: string): Anchor | null {
  const now = hhmmToMin(nowHHMM);
  return [...day.anchors]
    .filter((a) => anchorMin(a) != null)
    .sort((x, y) => (anchorMin(x)! - anchorMin(y)!))
    .find((a) => anchorMin(a)! >= now) ?? null;
}

export function nextStop(
  day: Day,
  nowHHMM: string,
): { kind: "anchor"; anchor: Anchor } | { kind: "band"; band: BandKey } | null {
  const a = nextAnchor(day, nowHHMM);
  if (a) return { kind: "anchor", anchor: a };
  return null; // future: next non-empty band; null is correct when no later timed content
}

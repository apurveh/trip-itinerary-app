import type { Anchor, Day, TripStatus } from "./types";

const DAY_MS = 86_400_000;
const toUTC = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

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
  const timed = day.anchors.filter((a) => a.time && /^\d{2}:\d{2}/.test(a.time));
  const found = timed.find((a) => (a.time as string).slice(0, 5) >= nowHHMM);
  return found ?? null;
}

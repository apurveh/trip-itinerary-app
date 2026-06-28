// src/lib/dayBands.ts
import type { Anchor, BandKey, Day, Idea } from "./types";
import { parseStartMin } from "./parseTime";

const ORDER: BandKey[] = ["morning", "midday", "afternoon", "evening"];

export function bandOf(min: number): BandKey {
  if (min < 720) return "morning";
  if (min < 900) return "midday";
  if (min < 1080) return "afternoon";
  return "evening";
}

export function isHeatWindow(min: number): boolean {
  return min >= 780 && min < 960;
}

function minOf(a: Anchor): number | null {
  return a.startMin ?? parseStartMin(a.time);
}

export function buildAnchoredDay(day: Day): { band: BandKey; anchors: Anchor[] }[] {
  // Memoize each anchor's minutes once, so we don't recompute in both the sort and the loop.
  const mins = new Map<Anchor, number | null>(day.anchors.map((a) => [a, minOf(a)]));
  // Untimed anchors (null minutes) sort to the front via `?? -1`. They carry no temporal
  // position, so when processed first `lastBand` is still the initial "morning" default —
  // i.e. untimed anchors always land in "morning". This intentionally collapses the
  // "inherit previous timed anchor's band" branch into the morning default by design.
  const sorted = [...day.anchors].sort((x, y) => (mins.get(x) ?? -1) - (mins.get(y) ?? -1));
  const groups = new Map<BandKey, Anchor[]>();
  let lastBand: BandKey = "morning";
  for (const a of sorted) {
    const m = mins.get(a);
    const band: BandKey = m == null ? lastBand : bandOf(m);
    lastBand = band;
    if (!groups.has(band)) groups.set(band, []);
    groups.get(band)!.push(a);
  }
  return ORDER.filter((b) => groups.has(b)).map((b) => ({ band: b, anchors: groups.get(b)! }));
}

export function anytimeIdeas(day: Day): Idea[] {
  return day.ideas;
}

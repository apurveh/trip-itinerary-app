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
  const sorted = [...day.anchors].sort((x, y) => (minOf(x) ?? -1) - (minOf(y) ?? -1));
  const groups = new Map<BandKey, Anchor[]>();
  let lastBand: BandKey = "morning";
  for (const a of sorted) {
    const m = minOf(a);
    const band = m == null ? lastBand : bandOf(m);
    lastBand = band;
    (groups.get(band) ?? groups.set(band, []).get(band)!).push(a);
  }
  return ORDER.filter((b) => groups.has(b)).map((b) => ({ band: b, anchors: groups.get(b)! }));
}

export function anytimeIdeas(day: Day): Idea[] {
  return day.ideas;
}

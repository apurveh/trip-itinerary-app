// src/lib/dayBands.test.ts
import { describe, it, expect } from "vitest";
import { bandOf, isHeatWindow, buildAnchoredDay, anytimeIdeas } from "./dayBands";
import type { Day } from "./types";

describe("bandOf", () => {
  it("buckets by half-open ranges", () => {
    expect(bandOf(600)).toBe("morning");    // 10:00
    expect(bandOf(720)).toBe("midday");     // 12:00
    expect(bandOf(900)).toBe("afternoon");  // 15:00
    expect(bandOf(1080)).toBe("evening");   // 18:00
  });
});

describe("isHeatWindow", () => {
  it("is true 13:00–15:59, false outside", () => {
    expect(isHeatWindow(780)).toBe(true);   // 13:00
    expect(isHeatWindow(959)).toBe(true);    // 15:59
    expect(isHeatWindow(960)).toBe(false);   // 16:00
    expect(isHeatWindow(779)).toBe(false);
  });
});

const day = {
  shape: "anchored",
  anchors: [
    { label: "Egizio", time: "10:00", startMin: 600, type: "ticket", detail: "", booking: "booked" },
    { label: "Aperitivo", time: "19:00", startMin: 1140, type: "food", detail: "", booking: "na" },
    { label: "Check bags", type: "transit", detail: "", booking: "na" }, // untimed
  ],
  ideas: [{ name: "Piazza San Carlo", why: "", mapsQuery: "Piazza San Carlo, Torino" }],
} as unknown as Day;

describe("buildAnchoredDay", () => {
  it("groups timed anchors into ordered, non-empty bands", () => {
    const bands = buildAnchoredDay(day);
    expect(bands.map((b) => b.band)).toEqual(["morning", "evening"]);
    expect(bands[0].anchors.map((a) => a.label)).toContain("Egizio");
    expect(bands[0].anchors.map((a) => a.label)).toContain("Check bags"); // inherits morning
  });
});

describe("anytimeIdeas", () => {
  it("returns ideas as one group, untouched", () => {
    expect(anytimeIdeas(day).map((i) => i.name)).toEqual(["Piazza San Carlo"]);
  });
});

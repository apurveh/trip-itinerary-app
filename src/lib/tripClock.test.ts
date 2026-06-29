import { describe, it, expect } from "vitest";
import { tripStatusAt, nextAnchor, nextStop } from "./tripClock";
import type { Day } from "./types";

describe("tripStatusAt", () => {
  it("is upcoming before the trip with a daysUntil count", () => {
    const r = tripStatusAt("2026-06-28", "2026-07-01", "2026-07-08");
    expect(r.status).toBe("upcoming");
    expect(r.daysUntil).toBe(3);
    expect(r.dayNumber).toBeNull();
  });
  it("is in_progress on day 4 with the right day number", () => {
    const r = tripStatusAt("2026-07-04", "2026-07-01", "2026-07-08");
    expect(r.status).toBe("in_progress");
    expect(r.dayNumber).toBe(4);
  });
  it("is completed after the trip", () => {
    expect(tripStatusAt("2026-07-09", "2026-07-01", "2026-07-08").status).toBe("completed");
  });
});

describe("nextAnchor", () => {
  const day = { anchors: [
    { label: "A", time: "10:00", startMin: 600, type: "ticket", detail: "", booking: "na" },
    { label: "B", time: "15:00", startMin: 900, type: "ticket", detail: "", booking: "na" },
  ] } as unknown as Day;
  it("returns the first anchor whose time is >= now", () => {
    expect(nextAnchor(day, "12:00")?.label).toBe("B");
  });
  it("returns null when all anchors are past", () => {
    expect(nextAnchor(day, "16:00")).toBeNull();
  });
});

describe("nextStop", () => {
  const day = { shape: "anchored", ideas: [], anchors: [
    { label: "Egizio", time: "10:00", startMin: 600, type: "ticket", detail: "", booking: "booked" },
  ] } as unknown as Day;
  it("points at the next timed anchor before it", () => {
    const s = nextStop(day, "09:00");
    expect(s).toEqual({ kind: "anchor", anchor: expect.objectContaining({ label: "Egizio" }) });
  });
  it("falls back to null when nothing timed remains and no later band", () => {
    expect(nextStop(day, "11:00")).toBeNull();
  });
});

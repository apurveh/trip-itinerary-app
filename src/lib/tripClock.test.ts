import { describe, it, expect } from "vitest";
import { tripStatusAt, nextAnchor } from "./tripClock";
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
    { label: "A", time: "10:00", type: "ticket", detail: "", booking: "na" },
    { label: "B", time: "15:00", type: "ticket", detail: "", booking: "na" },
  ] } as unknown as Day;
  it("returns the first anchor whose time is >= now", () => {
    expect(nextAnchor(day, "12:00")?.label).toBe("B");
  });
  it("returns null when all anchors are past", () => {
    expect(nextAnchor(day, "16:00")).toBeNull();
  });
});

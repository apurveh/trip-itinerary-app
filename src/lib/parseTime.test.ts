import { describe, it, expect } from "vitest";
import { parseStartMin } from "./parseTime";

describe("parseStartMin", () => {
  it("parses a plain HH:MM", () => expect(parseStartMin("10:00")).toBe(600));
  it("parses leading prose ('from 07:00')", () => expect(parseStartMin("from 07:00")).toBe(420));
  it("parses approx prefix ('~04:45')", () => expect(parseStartMin("~04:45")).toBe(285));
  it("takes the FIRST time in a list ('ONLY 09:00 / 10:00 / 14:00 / 16:00')",
    () => expect(parseStartMin("ONLY 09:00 / 10:00 / 14:00 / 16:00")).toBe(540));
  it("takes the first of a range ('10:00–19:00')", () => expect(parseStartMin("10:00–19:00")).toBe(600));
  it("parses '≈ hourly to ~20:00'", () => expect(parseStartMin("≈ hourly to ~20:00")).toBe(1200));
  it("returns null for undefined", () => expect(parseStartMin(undefined)).toBeNull());
  it("returns null when no time present", () => expect(parseStartMin("Wake-up")).toBeNull());
});

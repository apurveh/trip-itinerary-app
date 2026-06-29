import { describe, it, expect } from "vitest";
import { mapsLink } from "./mapsLink";

describe("mapsLink", () => {
  it("builds a google maps search URL with encoded query", () => {
    expect(mapsLink("Sacra di San Michele")).toBe(
      "https://www.google.com/maps/search/?api=1&query=Sacra%20di%20San%20Michele"
    );
  });
});

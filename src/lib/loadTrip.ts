import type { Trip } from "./types";
import { TURIN } from "./trips/turin";

const TRIPS: Record<string, Trip> = {
  turin: TURIN,
};

export function loadTrip(slug: string): Trip | undefined {
  return TRIPS[slug];
}

export function listTrips(): Trip[] {
  return Object.values(TRIPS);
}

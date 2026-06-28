export type Tone = "amber" | "wine" | "teal" | "pink" | "cream" | "ink";

export interface Traveler {
  name: string;
  emoji: string;
  role: string;
  color: "amber" | "pink";
  initials: string;
}

export interface Photo {
  src: string;
  alt: string;
  credit?: string;
}

export type AnchorType = "ticket" | "market" | "transit" | "shuttle" | "flight";
export type BookingState = "booked" | "toBook" | "na";

export interface Anchor {
  label: string; // "Museo Egizio"
  time?: string; // "10:00" | "07:00–14:00" | undefined
  type: AnchorType;
  detail: string; // one line of what/where/how
  booking: BookingState;
  bookingLink?: string; // official URL when type === "ticket"/"shuttle"
  confirmationKey?: string; // localStorage key for a confirmation-number slot (booked tickets)
}

export interface Idea {
  name: string;
  why: string; // one-line why-it's-worth-it
  area?: string; // neighbourhood / nearest landmark
  cost?: string; // "15 € pp" — only when real
  tip?: string;
  photo?: Photo;
  mapsQuery: string; // fed to mapsLink()
}

export interface Day {
  n: number;
  weekday: string; // "Wed"
  date: string; // "1 Jul"
  title: string;
  label: string; // funky sticker label
  sticker: Tone;
  vibe: string;
  lead: "Apurva" | "Clara" | "both";
  summary: string;
  transitFromBase: string; // "Dante → Porta Nuova (Fermi), ~5 min"
  anchors: Anchor[];
  ideas: Idea[];
  photos: Photo[];
  intel: string[];
  heroImage: string;
}

export interface Cafe {
  name: string;
  hours: string;
  note?: string;
}

export interface BudgetEntry {
  cat: string;
  amt: number;
} // DKK, concrete only

export interface Tips {
  transit: string[];
  food: string[];
  weather: string[];
}

export interface Memory {
  caption: string;
  img: string | null;
}

export type TripStatus = "upcoming" | "in_progress" | "completed" | "memories";

export interface Trip {
  id: string;
  slug: string;
  caseNumber: string;
  codename: string;
  title: string;
  destination: string;
  dates: string;
  startISO: string;
  endISO: string;
  duration: number;
  status: TripStatus;
  tagline: string;
  classification: string;
  exchangeNote: string;
  heroImage: string;
  base: { address: string; metro: string; supermarkets: string[] };
  flights: { out: string; in: string }; // human strings
  travelers: Traveler[];
  days: Day[];
  food: Cafe[];
  packing: string[];
  tips: Tips;
  budget: BudgetEntry[];
  budgetTotalDkk: string; // e.g. "≈ 1,900 DKK couple"
  memories: Memory[];
}

export interface PendingFile {
  code: string;
  label: string;
  hint: string;
}

export interface HubData {
  brand: string;
  tagline: string;
  archive: string;
  stats: { n: string; label: string }[];
  pendingFiles: PendingFile[];
}

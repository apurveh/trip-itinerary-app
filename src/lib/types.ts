export type Tone = "amber" | "wine" | "teal" | "pink" | "cream" | "ink";

export interface Traveler {
  name: string;
  emoji: string;
  role: string;
  color: "amber" | "pink";
  initials: string;
}

export interface Pill {
  label: string;
  amt: string;
  tone: Tone;
}

export interface Day {
  n: number;
  date: string;
  title: string;
  label: string;
  lead: "Apurva" | "Clara" | "both";
  vibe: string;
  brief: string;
  moves: string[];
  pills: Pill[];
  total: string;
  intel: string;
  image: string;
  sticker: Tone;
}

export interface BudgetEntry {
  cat: string;
  amt: number;
}

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
  duration: number;
  status: TripStatus;
  tagline: string;
  base: string;
  classification: string;
  exchangeNote: string;
  heroImage: string;
  travelers: Traveler[];
  days: Day[];
  budget: BudgetEntry[];
  budgetTotal: { lo: number; hi: number };
  tips: Tips;
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

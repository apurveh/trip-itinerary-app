import type { Trip } from "../types";

import hero from "@/assets/trips/turin/hero.jpg";
import day1 from "@/assets/trips/turin/day-1.jpg";
import day2 from "@/assets/trips/turin/day-2.jpg";
import day3 from "@/assets/trips/turin/day-3.jpg";
import day4 from "@/assets/trips/turin/day-4.jpg";
import day5 from "@/assets/trips/turin/day-5.jpg";
import day6 from "@/assets/trips/turin/day-6.jpg";
import day7 from "@/assets/trips/turin/day-7.jpg";
import day8 from "@/assets/trips/turin/day-8.jpg";

export const TURIN: Trip = {
  id: "001",
  slug: "turin",
  caseNumber: "FILES 001",
  codename: "Operazione Torino",
  title: "Operazione Torino",
  destination: "Turin & Piedmont, Italy",
  dates: "1–8 July 2026",
  duration: 8,
  status: "upcoming",
  tagline: "First trip together. No one panic.",
  base: "Safehouse near Superga",
  classification: "TOP TIRAMISÙ",
  exchangeNote: "All prices in DKK · 1 EUR ≈ 7.47 DKK (May 2026)",
  heroImage: hero,
  travelers: [
    { name: "Apurva", emoji: "🕵️", role: "Field Agent", color: "amber", initials: "AP" },
    { name: "Clara", emoji: "🍷", role: "Cultural Attaché", color: "pink", initials: "CL" },
  ],
  days: [
    {
      n: 1,
      date: "Wed 1 Jul",
      title: "The arrival",
      label: "DAY ZERO ENERGY",
      lead: "both",
      vibe: "easy · jet-lagged · romantic",
      brief:
        "Land at TRN 10:00. Drop bags at the safehouse, stock the kitchen, take a soft orientation walk through the arcades at golden hour.",
      moves: [
        "SADEM bus airport → Porta Nuova",
        "Bus 61/68 toward Sassi",
        "Supermarket run — pasta, eggs, prosciutto, wine",
        "Stroll: Piazza Castello → San Carlo → Via Roma",
      ],
      pills: [
        { label: "transit in", amt: "120 DKK", tone: "teal" },
        { label: "first groceries", amt: "300–450 DKK", tone: "amber" },
      ],
      total: "420 DKK",
      intel: "Heads up — Royal Palace closed Wednesdays. We're going Thursday so we're fine.",
      image: day1,
      sticker: "amber",
    },
    {
      n: 2,
      date: "Thu 2 Jul",
      title: "Egyptian gold",
      label: "EGYPT IN ITALY",
      lead: "Apurva",
      vibe: "ancient · ornate · arcaded",
      brief:
        "Morning at the Museo Egizio — second-largest Egyptian collection on Earth. Afternoon: Royal Quarter. Aperitivo as a sport.",
      moves: [
        "Museo Egizio — book online, 2.5–3 hr",
        "Lunch home OR tavola calda near museum",
        "Palazzo Reale + Royal Museums (one combo ticket)",
        "Aperitivo in Piazza San Carlo",
      ],
      pills: [
        { label: "egizio", amt: "135 DKK pp", tone: "amber" },
        { label: "royal museums", amt: "110 DKK pp", tone: "wine" },
        { label: "aperitivo", amt: "60–75 DKK pp", tone: "pink" },
      ],
      total: "550 DKK",
      intel: "Turin invented the aperitivo. Snacks are generous — order one drink, eat dinner.",
      image: day2,
      sticker: "wine",
    },
    {
      n: 3,
      date: "Fri 3 Jul",
      title: "Tower & taste",
      label: "MOLE PATROL",
      lead: "both",
      vibe: "vertiginous · gourmand · medieval",
      brief:
        "Climb the Mole Antonelliana — Cinema museum + glass elevator. Then food-crawl the Quadrilatero and raid Porta Palazzo for tonight's pasta.",
      moves: [
        "Museo Nazionale del Cinema — combo ticket online",
        "Panino lunch at a local salumeria",
        "Quadrilatero Romano — narrow lanes, gelato",
        "Porta Palazzo market before 14:00",
      ],
      pills: [
        { label: "mole combo", amt: "170 DKK pp", tone: "amber" },
        { label: "panino", amt: "45 DKK pp", tone: "teal" },
        { label: "market haul", amt: "200 DKK couple", tone: "pink" },
      ],
      total: "630 DKK",
      intel: "Largest open-air market in Europe. Cheese before noon, you'll thank us.",
      image: day3,
      sticker: "teal",
    },
    {
      n: 4,
      date: "Sat 4 Jul",
      title: "Name of the rose",
      label: "THE ABBEY JOB",
      lead: "Apurva",
      vibe: "mountainside · monastic · cinematic",
      brief:
        "Day trip to the Sacra di San Michele — the abbey that inspired Eco's novel. Pack sandwiches. Hike up. Get the view. Lakeside walk on the way home.",
      moves: [
        "Train Porta Nuova → Avigliana (~35 min)",
        "Taxi to Sant'Ambrogio + Mortera trail (1.5 hr up)",
        "Abbey entry — picnic at the summit",
        "Lacs d'Avigliana, lakeside loop",
      ],
      pills: [
        { label: "trains", amt: "104 DKK couple", tone: "teal" },
        { label: "taxi up", amt: "110 DKK couple", tone: "wine" },
        { label: "abbey", amt: "60 DKK pp", tone: "amber" },
      ],
      total: "434 DKK",
      intel: "Mortera trail is gorgeous but real — boots on, water full, hat present.",
      image: day4,
      sticker: "wine",
    },
    {
      n: 5,
      date: "Sun 5 Jul",
      title: "Operation Superga",
      label: "LOCAL HEROES",
      lead: "both",
      vibe: "panoramic · proud · neighbourhood",
      brief:
        "The home turf mission. Rack tramway up to the Basilica, Royal Tombs, dome view. Picnic at the top. Hike down via Strada dei Colli.",
      moves: [
        "Sassi → Superga rack tram, Sunday return",
        "Basilica + Royal Tombs + dome combo",
        "Picnic at the summit benches (BYO)",
        "Strada dei Colli downhill — 1 hr to Sassi",
      ],
      pills: [
        { label: "rack tram", amt: "67 DKK pp", tone: "amber" },
        { label: "basilica combo", amt: "75 DKK pp", tone: "wine" },
        { label: "picnic kit", amt: "120 DKK couple", tone: "pink" },
      ],
      total: "404 DKK",
      intel: "First Sunday of the month — many state museums free. Worth a Royal Palace re-do.",
      image: day5,
      sticker: "amber",
    },
    {
      n: 6,
      date: "Mon 6 Jul",
      title: "Langhe wine country",
      label: "BAROLO BOULEVARD",
      lead: "Clara",
      vibe: "rolling · ruby · slow lunch",
      brief:
        "Big day. Train OR rental car to Alba, then La Morra → Barolo → Monforte d'Alba. Free tasting at Cantina Comunale. Carry a bottle home.",
      moves: [
        "OPTION A — train via Bra to Alba",
        "OPTION B — economy rental from Porta Nuova",
        "La Morra → Barolo → Monforte loop",
        "Cantina Comunale tasting (rated 4.7)",
      ],
      pills: [
        { label: "train route", amt: "150 DKK pp", tone: "teal" },
        { label: "rental option", amt: "450–600 DKK couple", tone: "wine" },
        { label: "bottle fund", amt: "110–225 DKK ea", tone: "pink" },
      ],
      total: "≈ 600 DKK",
      intel: "If we're driving — designate a sober photographer. The hills do not care.",
      image: day6,
      sticker: "wine",
    },
    {
      n: 7,
      date: "Tue 7 Jul",
      title: "The Italian Versailles",
      label: "ROYAL FLUSH",
      lead: "Clara",
      vibe: "regal · gilded · garden-grand",
      brief:
        "Reggia di Venaria — UNESCO Savoy palace. Open Tuesdays. 4–5 hours total: 2h palace, 2h gardens. Sunset stroll along the Po.",
      moves: [
        "Venaria Express bus from Piazza Castello",
        "Palace + Gardens combo ticket",
        "Lunch from home OR on-site café",
        "Po river + Parco del Valentino at sunset",
      ],
      pills: [
        { label: "bus return", amt: "44 DKK pp", tone: "teal" },
        { label: "venaria combo", amt: "150 DKK pp", tone: "amber" },
        { label: "café lunch", amt: "110–150 DKK pp", tone: "pink" },
      ],
      total: "≈ 480 DKK",
      intel: "Borgo Medievale is free. Sunset over the Po is the photograph you'll keep.",
      image: day7,
      sticker: "teal",
    },
    {
      n: 8,
      date: "Wed 8 Jul",
      title: "Departure",
      label: "ARRIVEDERCI, AMORE",
      lead: "both",
      vibe: "wistful · sun-struck · over-packed",
      brief:
        "Last morning. Eataly Lingotto raid for gifts, OR a final bicerin at Caffè Al Bicerin. Then SADEM to Caselle and home.",
      moves: [
        "Pack — wine in checked bag, oils in checked bag",
        "Eataly Lingotto OR Caffè Al Bicerin",
        "SADEM bus back to airport",
        "Cry softly. Plan the next file.",
      ],
      pills: [
        { label: "bicerin", amt: "75 DKK", tone: "wine" },
        { label: "transit out", amt: "120 DKK", tone: "teal" },
      ],
      total: "200 DKK",
      intel: "Hazelnut spread, taggiasca olives, one bottle of Barolo. Trust us.",
      image: day8,
      sticker: "amber",
    },
  ],
  budget: [
    { cat: "Airport transfers", amt: 240 },
    { cat: "GTT 7-day pass × 2", amt: 270 },
    { cat: "Day-trip trains", amt: 400 },
    { cat: "Venaria Express bus × 2", amt: 90 },
    { cat: "Sassi–Superga rack tram", amt: 135 },
    { cat: "Museum entries", amt: 1500 },
    { cat: "Groceries / cook-at-home", amt: 2000 },
    { cat: "Eating out", amt: 950 },
    { cat: "Aperitivo / coffee / gelato", amt: 500 },
    { cat: "Optional Langhe car rental", amt: 500 },
  ],
  budgetTotal: { lo: 6300, hi: 6900 },
  tips: {
    transit: [
      "GTT 7-day pass: ~135 DKK pp — pays off after Day 3",
      "Torino+Piemonte Card: 250–320 DKK pp if hitting 4+ sites",
      "Regional trains for day trips are separate and cheap",
    ],
    food: [
      "Porta Palazzo market — Saturday morning is peak",
      "Tajarin with butter & sage cooks in 30 minutes",
      "Vitello tonnato pre-made at any deli, no cooking required",
    ],
    weather: [
      "Hot — 28–32°C, often humid",
      "Museums in afternoon, walks at dawn / golden hour",
      "Refillable bottle — toret fountains everywhere, free",
    ],
  },
  memories: [
    { caption: "FILE EMPTY — to be developed", img: null },
    { caption: "FILE EMPTY — to be developed", img: null },
    { caption: "FILE EMPTY — to be developed", img: null },
    { caption: "FILE EMPTY — to be developed", img: null },
  ],
};

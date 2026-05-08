# The Clara & Apurva Files — Project Brief

> A personal travel hub for Apurva & Clara. Every trip we take becomes a new case file in the dossier.

**Version:** 1.0
**Last updated:** 8 May 2026
**Project owner:** Apurva
**Co-star:** Clara
**First case file:** Turin & Piedmont, 1–8 July 2026

---

## 1. The one-line pitch

A playful, funky, ever-growing personal travel hub for me (Apurva) and my girlfriend Clara — built around a detective **case file** aesthetic where every trip we take is a new dossier. The first case file is our trip to Turin, 1–8 July 2026. The site lives forever and gets a new file every time we travel.

---

## 2. Why I'm building this

- It's our **first trip together** and I want it to feel like a proper occasion, not a Google Doc.
- I want to **show off my front-end skills** with bold colors and fun animations.
- I want a **single home for every adventure** Clara and I go on — present and future.
- I want it to be a **gift to Clara** as much as it's a portfolio piece for me.
- I want to use **Claude Code and Claude (the visualizer / design side)** end-to-end as a learning experience for AI-assisted development.

---

## 3. Aesthetic — "Detective case file"

This is the through-line for every design decision. When in doubt, ask: *"would this appear in a 1970s spy thriller's evidence binder?"*

### Mood
- **Dossier / case file energy:** manila folders, classified stamps, redacted bars, file numbers, typewriter accents, evidence pinboards.
- Mixed with **modern, funky web** sensibility: bold flat colors, cheeky micro-copy, satisfying animations, scroll-triggered moments.
- For the Turin trip specifically, a slight **Italian travel-poster** tint: Piedmontese amber, wine red, deep teal accents.
- **Tone of voice:** playful and conspiratorial. Every day is a "mission", every tip is "intel", every booking is a "lead", every food stop is a "rendezvous".

### Visual devices to use
- **Three-digit case numbers** stamped on every trip (`FILES 001`, `FILES 002`, ...).
- **"Lead agent" tag per day** — whichever of us is more excited that day gets credited (Apurva 🕵️ or Clara 🍷).
- **Tilted sticker badges** for funky labels per day (`LOCAL HEROES`, `BAROLO BOULEVARD`, `EGYPT IN ITALY`).
- **Color-coded budget pills** — every cost shown as a small rounded chip.
- **"INTEL" callouts** for tips and warnings, styled like highlighted classified-document quotes.
- **Oversized day numbers** behind card titles for visual impact (faded, large, monospace).
- **Passport stamps** earned per completed trip — live on the hub forever and accumulate over time.
- **Two-traveler avatar bar** (Apurva + Clara) always visible, like dual-protagonist video-game UI.
- **Status pills** per trip: `UPCOMING` · `IN PROGRESS` · `COMPLETED` — color shifts as the trip progresses, so the page literally changes mood over time.

### Things to avoid
- Generic Bootstrap-y card layouts.
- Stock travel-blog vibes (no muted earth-tones-everywhere, no precious minimalism).
- Anything that feels like a corporate booking site (Booking.com, Expedia, etc.).
- Beige.
- Generic AI-aesthetic gradients and glassy frosted backgrounds.

---

## 4. Architecture — Two-level site

The site has exactly two kinds of pages.

### Level 1 — The Hub (`/`)
The homepage. The index of all our adventures.

**Contains:**
- Hero with brand name `THE CLARA & APURVA FILES` and a tagline.
- Two-traveler avatar element (Apurva + Clara) with their signature emojis/colors.
- A grid (or scrolling row) of **trip cards** — one per case file.
- A small **stats bar**: number of trips planned · trips completed · countries visited · stamps earned.
- A **filling-in world map** showing where we've been (one pin for now, more over time).
- Footer.

**Right now contains:** exactly one trip card — `Files 001: Operazione Torino`.

### Level 2 — A Trip Page (`/trips/:slug`, e.g. `/trips/turin`)
The full case-file experience for one trip.

**Contains:**
- Trip-specific hero with the trip's signature color palette and dates.
- Day-by-day **case files** (the day cards) — horizontal scroll with snap, or vertical stack on mobile.
- **Budget** breakdown with a playful animated bar chart and a total counter that counts up.
- **Practical info** section (transit, weather, money-saving tips).
- **Memories** section — empty placeholders now, real photos added during and after the trip.
- Back-to-hub link styled like a "return to filing cabinet" affordance.

The first trip page I'm building is `/trips/turin`. Future trips clone & re-skin this page with their own data and color palette.

---

## 5. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Build tool | **Vite** | Fast, modern, zero-config static output, perfect for GitHub Pages |
| Framework | **React + TypeScript** | Component reuse for day cards, type safety on the JSON data |
| Routing | **React Router** | Two-level site needs client-side routing |
| Styling | **Tailwind CSS** | Tokenized design system, fast iteration, no CSS file sprawl |
| Animation | **Framer Motion** | The fun stuff — scroll triggers, layout animations, hover states |
| Icons | **Lucide React** | Clean, free, code-friendly |
| Hosting | **GitHub Pages** | Free, simple, perfect for a static Vite build |
| Deployment | **GitHub Actions** + `gh-pages` branch | Push to main → site rebuilds |
| Data | Static **JSON files** in `/data` | No database needed; trips are just JSON |

**No backend.** Everything is static. Trip data lives in the repo.

---

## 6. Data model

### Folder layout
```
data/
├── trips.json              # Index of all trips — read by the hub
└── trips/
    ├── 001-turin.json      # Full Turin itinerary
    └── 002-future.json     # (added later, when next trip is planned)
```

### `trips.json` (the hub index)
```json
{
  "travelers": [
    { "name": "Apurva", "emoji": "🕵️", "color": "amber" },
    { "name": "Clara",  "emoji": "🍷", "color": "pink"  }
  ],
  "trips": [
    {
      "id": "001",
      "slug": "turin",
      "title": "Operazione Torino",
      "destination": "Turin & Piedmont, Italy",
      "dates": "1–8 July 2026",
      "status": "upcoming",
      "theme_color": "amber",
      "hero_image": "/assets/trips/turin/hero.jpg",
      "tagline": "First trip together. No one panic.",
      "duration_days": 8
    }
  ]
}
```

### `001-turin.json` (a single trip's data)
```json
{
  "id": "001",
  "slug": "turin",
  "title": "Operazione Torino",
  "destination": "Turin & Piedmont, Italy",
  "dates": "1–8 July 2026",
  "tagline": "First trip together. No one panic.",
  "base": "Safehouse near Superga",
  "status": "upcoming",
  "theme": {
    "primary": "amber",
    "accent": "wine",
    "background_pattern": "italian-tile"
  },
  "exchange_rate_note": "All prices in DKK. 1 EUR ≈ 7.47 DKK as of May 2026.",
  "days": [
    {
      "number": 1,
      "date": "Wed 1 July",
      "title": "The arrival",
      "funky_label": "DAY ZERO ENERGY",
      "lead_agent": "both",
      "vibe": "easy, jet-lagged, romantic",
      "mission_briefing": "Land at TRN 10am. Drop bags at the safehouse, stock the kitchen, and take a soft orientation walk through the arcades at golden hour.",
      "moves": [
        "SADEM bus airport → Porta Nuova",
        "Bus 61/68 toward Sassi",
        "Supermarket run (pasta, eggs, prosciutto, wine)",
        "Evening stroll: Piazza Castello → San Carlo → Via Roma"
      ],
      "budget_dkk_couple": 420,
      "cost_pills": [
        { "label": "transit in", "amount": "120 DKK couple" },
        { "label": "first groceries", "amount": "300–450 DKK couple" }
      ],
      "intel": "Heads up for tomorrow — Royal Palace is closed Wednesdays. We're going Thursday so we're fine.",
      "image": "/assets/trips/turin/day-1.jpg",
      "image_alt": "Turin's arcaded streets at golden hour"
    }
    // ... days 2–8 follow the same shape
  ],
  "budget_summary": [
    { "category": "Airport transfers (in + out)", "amount_dkk": 240 },
    { "category": "7-day GTT city transit pass × 2", "amount_dkk": 270 },
    { "category": "Day-trip trains (Avigliana + Alba/Langhe)", "amount_dkk": 400 },
    { "category": "Venaria Express bus × 2", "amount_dkk": 90 },
    { "category": "Sassi–Superga rack tram × 2", "amount_dkk": 135 },
    { "category": "Museum entries", "amount_dkk": 1500 },
    { "category": "Groceries / cook-at-home", "amount_dkk": 2000 },
    { "category": "Eating out", "amount_dkk": 950 },
    { "category": "Aperitivo / coffee / gelato fund", "amount_dkk": 500 },
    { "category": "Optional Langhe car rental", "amount_dkk": 500 }
  ],
  "budget_total_dkk": "6,300–6,900",
  "tips": {
    "transit": ["GTT 7-day pass: ~135 DKK pp", "Torino+Piemonte Card if hitting 4+ sites"],
    "food": ["Porta Palazzo market Saturday morning", "Tajarin with butter & sage at home", "Vitello tonnato pre-made from any deli"],
    "weather": ["Hot: 28–32°C, often humid", "Plan museums for hottest afternoons", "Refillable bottle — toret fountains are everywhere"]
  }
}
```

### Funky labels per Turin day (locked in)

| Day | Date | Title | Funky label |
|-----|------|-------|-------------|
| 1 | Wed 1 Jul | The arrival | `DAY ZERO ENERGY` |
| 2 | Thu 2 Jul | Egyptian gold | `EGYPT IN ITALY` |
| 3 | Fri 3 Jul | Tower & taste | `MOLE PATROL` |
| 4 | Sat 4 Jul | Name of the rose | `THE ABBEY JOB` |
| 5 | Sun 5 Jul | Operation Superga | `LOCAL HEROES` |
| 6 | Mon 6 Jul | Langhe wine country | `BAROLO BOULEVARD` |
| 7 | Tue 7 Jul | The Italian Versailles | `ROYAL FLUSH` |
| 8 | Wed 8 Jul | Departure | `ARRIVEDERCI, AMORE` |

---

## 7. Folder structure (the whole project)

```
clara-and-apurva-files/
├── README.md
├── PROJECT_BRIEF.md          ← this document
├── ADD_A_TRIP.md             ← how-to for adding future trips
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── index.html
├── data/
│   ├── trips.json
│   └── trips/
│       └── 001-turin.json
├── assets/
│   ├── brand/
│   │   ├── logo.svg
│   │   ├── apurva-avatar.png
│   │   └── clara-avatar.png
│   └── trips/
│       └── turin/
│           ├── hero.jpg
│           ├── day-1.jpg
│           └── day-2.jpg ... day-8.jpg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes/
│   │   ├── Hub.tsx           ← homepage
│   │   └── Trip.tsx          ← /trips/:slug
│   ├── components/
│   │   ├── brand/
│   │   │   ├── BrandHeader.tsx
│   │   │   ├── TravelerAvatars.tsx
│   │   │   └── PassportStamp.tsx
│   │   ├── hub/
│   │   │   ├── TripCard.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   └── WorldMap.tsx
│   │   └── trip/
│   │       ├── TripHero.tsx
│   │       ├── DayCard.tsx          ← THE CENTERPIECE
│   │       ├── DaysScroller.tsx
│   │       ├── BudgetChart.tsx
│   │       ├── IntelCallout.tsx
│   │       └── PracticalInfo.tsx
│   ├── lib/
│   │   ├── types.ts
│   │   └── loadTrip.ts
│   └── styles/
│       └── globals.css
└── .github/
    └── workflows/
        └── deploy.yml         ← GitHub Pages deployment
```

---

## 8. Build phases — what to do, in order

### Phase 0 — Setup (15 min, manual)
- [ ] Create GitHub repo: `clara-and-apurva-files` (public — required for free GitHub Pages)
- [ ] Clone locally, open in editor
- [ ] Drop the original itinerary PDF into the repo root for reference
- [ ] Create empty folders matching the structure above

### Phase 1 — Design exploration (Claude, web/desktop — NOT Claude Code)
Use the regular Claude chat for visual exploration before any code.

**Prompt 1.1 — Mood board for hub + day card:**
> Build me three visual directions for "The Clara & Apurva Files" — a detective case-file-themed travel site. Show me each direction as: (a) the homepage hub hero with brand title, traveler avatars, and one trip card, (b) a single day card from the Turin trip using Day 5 — "Operation Superga" — as the example. For each direction, give me a color palette with hex codes, Google Fonts pairing, and SVG mockups. Reference: dossier aesthetic, manila folders, classified stamps, but mixed with modern bold-color funky web design. Ship every visual element with the dual-protagonist (Apurva + Clara) avatar bar.

**Prompt 1.2 — Pick a direction and lock the system:**
> I'm going with Direction [X]. Generate a complete component spec sheet: exact CSS variables (colors, type scale, spacing, border-radius, shadows), animation duration tokens, and the full Tailwind config snippet. I'll feed this directly to Claude Code.

- [ ] Run prompt 1.1
- [ ] Pick a direction
- [ ] Run prompt 1.2 and save the result to `DESIGN_SYSTEM.md` in the repo

### Phase 2 — Content prep (30 min, manual)
- [ ] Fill out `data/trips.json` with the one Turin entry
- [ ] Fill out `data/trips/001-turin.json` with all 8 days using the schema above
- [ ] Use the funky-labels table from section 6 as the source of truth
- [ ] Write the "mission_briefing" for each day in the playful conspiratorial tone

### Phase 3 — Asset hunting (1 hour, manual)
- [ ] **1 hub hero image** — broad atmospheric shot (Italian map? old desk with passport? travel-coded)
- [ ] **1 Turin trip hero** — Mole Antonelliana at golden hour, or Po river
- [ ] **8 day images**, one per day, named `day-1.jpg` through `day-8.jpg`
- [ ] **2 avatar images** — Apurva and Clara (real photos, illustrated portraits, or initials)
- [ ] All images max 1600px wide, ~85% JPEG quality
- [ ] Sources: Unsplash, Pexels, Wikimedia Commons

### Phase 4 — Build with Claude Code (the main event)
Don't try to one-shot. Each session is one focused chunk.

#### Session 4.1 — Scaffold
> Set up a Vite + React + TypeScript + Tailwind project in this repo. Configure for GitHub Pages deployment (correct base path in vite.config.ts, gh-pages npm scripts, .github/workflows/deploy.yml). Install Framer Motion, React Router, Lucide React. Wire up Tailwind with the design tokens from DESIGN_SYSTEM.md. Set up two routes: `/` → Hub, `/trips/:slug` → Trip. Make sure routing works with GitHub Pages subpath.

#### Session 4.2 — Brand layer (used everywhere)
> Build the brand-layer components: `BrandHeader` (sticky top nav with the case-file title and traveler avatars), `TravelerAvatars` (Apurva & Clara, with hover tooltips and signature emojis), and `PassportStamp` (reusable stamp component for completed trips). Apply the case-file aesthetic from the design system. Add Framer Motion entrance animations.

#### Session 4.3 — The Hub
> Build the `Hub` route. Read `data/trips.json`. Render a hero with the brand title, the StatsBar (trips planned/completed/countries/stamps), and a grid of `TripCard` components. Each TripCard shows the case file number, status pill, destination, dates, tagline, and a hover state where the card lifts and the stamp rotates slightly. Make sure clicking a card navigates to `/trips/:slug`.

#### Session 4.4 — The DayCard (centerpiece — spend time here)
> Build the `DayCard` component. Props match the day schema from PROJECT_BRIEF.md section 6. Visual: image with colored overlay on top, oversized monospace day number behind, tilted sticker badge with the funky_label, mission briefing in serif italic, "moves" list with arrow bullets, budget pills row, INTEL callout. Use the trip's theme color. On hover: card lifts ~6px, sticker rotates a few more degrees, image zooms 3%. Use Framer Motion. Build it with Day 5 — Operation Superga — as the demo case until it looks right.

#### Session 4.5 — Trip page assembly
> Build the `Trip` route. Read `data/trips/{slug}.json`. Render: TripHero (full-bleed hero image, status pill, traveler avatars, dates), `DaysScroller` (horizontal scroll-snap row of all 8 DayCards on desktop, vertical stack on mobile), `BudgetChart` (animated bars that grow on scroll-into-view, count-up total, savings tips callout), `PracticalInfo` (the tips section). Add scroll-triggered reveals.

#### Session 4.6 — Polish
> Add: page-load entrance animations, scroll-to-top button, prefers-reduced-motion support, mobile responsive checks, basic SEO meta tags, favicon (a tiny stamp icon), 404 page styled as a "case file not found" dossier.

#### Session 4.7 — Deploy
> Deploy to GitHub Pages via the GitHub Actions workflow. Walk me through any issues with base path / image resolution. Verify `https://[username].github.io/clara-and-apurva-files/` works end-to-end.

### Phase 5 — Optional extras (after the MVP is live)
- [ ] **Countdown to trip** — animated days/hours/minutes counter on the hub
- [ ] **Pin map of Italy** — tiny SVG/Leaflet map with pins per day
- [ ] **Pack list toggle** — flips out from the trip page
- [ ] **Polaroid memory wall** — empty placeholders that get filled with photos during the trip
- [ ] **Spotify embed** — a shared trip playlist
- [ ] **"Status" auto-progression** — on July 1, the trip's status auto-flips to IN PROGRESS; on July 8, COMPLETED, and the passport stamp lands

### Phase 6 — Adding a future trip (forever-future you)
Once the structure is live, adding trip 002 is:
1. Append a trip entry to `data/trips.json`
2. Create `data/trips/002-{slug}.json` with the same schema
3. Drop hero + day images in `assets/trips/{slug}/`
4. Push to main — site rebuilds automatically

Document this in `ADD_A_TRIP.md` so it stays a 5-minute job forever.

---

## 9. Definition of done (for v1)

The site is "done" when all of the following are true:

- [ ] Live at `https://[username].github.io/clara-and-apurva-files/`
- [ ] Hub renders with brand, avatars, stats bar, and the Turin trip card
- [ ] Clicking the Turin card navigates to `/trips/turin` with correct routing
- [ ] All 8 day cards render correctly with images, budget pills, intel callouts
- [ ] Budget chart animates on scroll-into-view; total counts up
- [ ] All hover/scroll animations work smoothly
- [ ] Site is responsive on mobile (375px+) and desktop
- [ ] Reduced-motion preference is respected
- [ ] No console errors
- [ ] Lighthouse performance score > 90 on desktop
- [ ] Clara has seen it and laughed at least once

---

## 10. Open questions (decide before building)

- [ ] **Confirm the project name** as "The Clara & Apurva Files" — final?
- [ ] **Avatars**: real photos, illustrated portraits, or just initials in colored circles?
- [ ] **Day card layout**: horizontal scroll-snap (cinematic) or vertical stack (more readable)? Or responsive — horizontal on desktop, vertical on mobile?
- [ ] **Theme color for Turin**: locked-in amber + wine, or rotate per day card (every day a different color from the case-file palette)?
- [ ] **Repo public or private**? (Public required for free GitHub Pages unless you have GitHub Pro.)
- [ ] **Deploy domain**: `username.github.io/clara-and-apurva-files` or buy a custom domain like `claraandapurva.com`?

---

## 11. Glossary (so terminology stays consistent)

- **Hub** — the homepage at `/`. The index of all our adventures.
- **Trip page** — the detail page for one trip at `/trips/:slug`.
- **Case file** — synonym for a trip. Used in user-facing copy.
- **Day card** — the recurring component for a single day's plan inside a trip.
- **Funky label** — the short tilted-sticker phrase on each day card (`LOCAL HEROES`, etc.).
- **Mission briefing** — the playful prose summary of what the day looks like.
- **Moves** — the list of activities in a day (instead of "itinerary items").
- **Intel** — tips, warnings, heads-ups (instead of "notes").
- **Lead agent** — whichever of us is the day's main protagonist.
- **Stamp** — a passport-style stamp earned per completed trip.
- **Status** — `UPCOMING` · `IN PROGRESS` · `COMPLETED` · `MEMORIES` (after-the-fact archival mode).
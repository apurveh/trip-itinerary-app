# The Clara & Apurva Files — v2 Design Spec

**Date:** 2026-06-28
**Owner:** Apurva (am@sportztravel.dk)
**Trip:** Turin & Piedmont, 1–8 July 2026 (FILES 001 · Operazione Torino)
**Goal:** Turn a pretty-but-broken "flex" website into a genuinely usable, info-rich travel **tool** — while keeping the funky detective case-file aesthetic.

---

## 1. Problem statement

The current app builds successfully but is effectively **invisible and stale**:

1. **The killer bug — content never appears.** Every content block uses a scroll-reveal that starts at `opacity: 0` and only becomes visible when ≥15% of it intersects the viewport. The trip card, the day cards, and the budget block are all *taller than the viewport*, and the day cards sit in a *horizontal* scroller, so the 15% threshold is never met. Two mechanisms cause this:
   - `src/components/primitives/Reveal.tsx` — `IntersectionObserver` with `threshold: 0.15`.
   - `src/components/trip/DayCard.tsx` — Framer Motion `whileInView` with `viewport={{ amount: 0.15 }}`.
   - CSS: `.reveal { opacity: 0 }` in `globals.css`.
   Net effect: the Hub's "OPEN CASE FILES" and the trip page's centerpiece "EIGHT DAYS, EIGHT FILES" render blank. (Users with `prefers-reduced-motion` see *more* than the author, since that path forces `opacity: 1`.)
2. **Content is stale.** All itinerary data (`src/lib/trips/turin.ts`) reflects the *old* plan — old base ("Safehouse near Superga"), a Barolo/Langhe wine day, and Reggia di Venaria — none of which are in the new paper plan (`docs/Copy of Torino plan & info.docx`).
3. **No per-day depth.** Everything is one page; there's nowhere to put rich per-day detail.
4. **Thin/generic gallery.** One image per day, several of which are generic (trains, buses, taxis).

## 2. Approved decisions

| Decision | Choice |
|---|---|
| Tool depth | **Rich reference + live "Today / Now-Next" view** + check-off lists (browser-saved). No expense tracker, no offline PWA, no accounts. |
| Structure | **A dedicated page per day** (`/trips/turin/day/:n`). |
| Maps | **Tap-to-navigate "Open in Maps" links only** — no embedded maps. |
| Photos | **Reuse + cull the existing ~70-image folder**, supplement gaps from free sources; Apurva eyeballs before lock. |
| Day model | **Anchors + a menu of ideas** — pin only fixed things, list the rest as optional. NO hour-by-hour schedule. |
| Day 6 (Susa) | Keep activities loose, but **pin real return train times** so they're never stranded. |
| Budget | **Only concrete fixed costs** (transit, museum tickets, shuttle/tram, day-trip trains), de-emphasised. Drop inflated groceries/eating-out/aperitivo estimates. |
| Aesthetic | **Keep the case-file look entirely** — stickers, tape, stamps, pills, marquee, amber/wine/teal. Make it *work* and *richer*, don't redesign. |

Working style reference: see memory `travel-style-spontaneous` — spontaneous, anchors-not-schedules, light on budget.

## 3. Information architecture

Three levels (was two):

- **`/` — Hub.** Unchanged purpose; bug fixed. One case-file card → Turin.
- **`/trips/turin` — Trip overview.** Hero + live status banner + 8-day clickable index + trip-wide panels.
- **`/trips/turin/day/:n` — Day page (new centerpiece).** One rich page per day.

Routing stays `HashRouter` (correct for GitHub Pages project subpath). New nested route for day pages. Day pages scroll to top on navigation and link back to the trip overview.

## 4. Trip overview (`/trips/turin`)

- **Hero** — trip hero image, codename, dates, traveler avatars, status pill. (Reuse `TripHero`.)
- **Live status banner** ("DOSSIER STATUS") — date-driven (see §6).
- **8-day index** — clickable rows/cards, each: day number, funky label sticker, weekday/date, one-line vibe, the day's single most important anchor (e.g. "Egizio @ 10:00"). Click → day page. Replaces the broken horizontal `DaysScroller`.
- **Safehouse panel** — base = **Corso Dante 72, Turin** (Dante metro). Nearby supermarkets: Prestofresco, Carrefour Express, Pam Local.
- **Rendezvous panel** — café/food list with real opening hours: Tarì – Cake Lab, Tisaneria della Consolata, Caffè Elena, Caffè Al Bicerin, plus takeaway street food. (Hours per the paper plan.)
- **Packing checklist** — check-off, persisted in `localStorage`. Seeded with the paper plan's reminders (train+shuttle bundle ticket, flip-flops, towel, backpack for Lago Grande, carry ID for Day 4).
- **Practical intel** — transit (GTT passes, regional trains), weather, water (toret fountains), etc.
- **Budget (small/honest)** — only concrete fixed costs, de-emphasised.
- **Memories** — placeholder polaroids (post-trip).

## 5. Day page (`/trips/turin/day/:n`) — "Anchors + Menu"

Structure, top to bottom:

1. **Header** — oversized day number, tilted funky-label sticker, weekday + date, one-line vibe, lead agent, back-to-overview affordance.
2. **⏱️ ANCHORS** — the only fixed things, as a short pinned list:
   - Booked tickets show a **"✓ BOOKED"** stamp + a confirmation-number slot (editable, saved to `localStorage`).
   - Unbooked ticketed items show a **"BOOK THIS →"** flag with the official booking link.
   - Time-bound logistics (market open 07:00, shuttle/train times) listed plainly.
   - **"Getting there from Dante"** transit note per day.
3. **🎲 THE MENU** — a loose grid of ideas/spots (no times, do in any order or skip). Each idea card:
   - name, one-line *why it's worth it*, area, optional cost, a **tip**, a **photo**, and an **"Open in Maps →"** button (builds a `https://www.google.com/maps/search/?api=1&query=...` link; works as a hand-off to the phone's native maps).
4. **📸 Gallery** — a few verified photos of that day's actual locations.
5. **🕵️ INTEL** — tips/warnings in the classified-callout style.

## 6. Live "Today / Now-Next" layer

A date-driven banner on the trip overview (reads the real current date; no backend):

- **Before the trip:** `T-MINUS N DAYS · OPERAZIONE TORINO` countdown.
- **During (1–8 July):** `TODAY · DAY n — <LABEL>` with the **next fixed anchor** surfaced (e.g. "NEXT FIXED: Cinema Museum + lift @ 15:00") + a button jumping to today's day page.
- **After 8 July:** `CASE CLOSED` / memories mode.

Persistence: checklists and confirmation numbers in `localStorage` only.

## 7. The 8 days (new plan) + funky labels

Dates 1–8 July 2026 (verify weekday mapping during build; paper plan labels Day 1 = Wednesday).

| Day | Date | Substance | Funky label | Booked |
|----|------|-----------|-------------|--------|
| 1 | Wed 1 Jul | Arrival. Train airport → Porta Susa, bags at Radical Storage (app). **Morning intentionally unplanned/spontaneous.** Check-in Corso Dante 72 @ 15:00, supermarket run. | `TOUCHDOWN` | flights |
| 2 | Thu 2 Jul | **Museo Egizio @ 10:00 (BOOKED)** → Via Roma / Piazza San Carlo / Piazza Castello / Palazzo Reale. | `EGYPT IN ITALY` | ✓ Egizio |
| 3 | Fri 3 Jul | Museo Nazionale dell'Automobile (~2–3h) → Lingotto, riverside, aperitivo (Caffè Bellini, L'Aperitivo DiVino). | `MOTOR CITY` | book auto |
| 4 | Sat 4 Jul | Balôn + Porta Palazzo markets (from 07:00) → cake/coffee/lunch → **Mole Cinema Museum + panoramic lift @ 15:00 (BOOKED)**. Carry ID. | `MARKET RAID` | ✓ Cinema+lift |
| 5 | Sun 5 Jul | Sacra di San Michele + Lago Grande (Avigliana). Train + shuttle **bundle**; shuttle times are fixed. Flip-flops/towel/backpack. | `THE ABBEY JOB` | book bundle |
| 6 | Mon 6 Jul | Susa — Roman ruins (Arch of Augustus, amphitheatre, Porta Savoia, cathedral as *ideas*). **Return trains pinned**; day stays loose. | `ROMAN HOLIDAY` | book train |
| 7 | Tue 7 Jul | Monte dei Cappuccini viewpoint · Villa della Regina · Sassi–Superga rack tram · Basilica di Superga. | `LOCAL HEROES` | book tram |
| 8 | Wed 8 Jul | Departure. Dante → Porta Susa → airport. Flight 09:05 → CPH 11:10. | `ARRIVEDERCI, AMORE` | flights |

Flights: CPH → TRN 06:25–08:35 (Day 1); TRN → CPH 09:05–11:10 (Day 8).

## 8. Data model (rework `src/lib/types.ts`)

Shift from the current flat `Day` to a richer, content-clean shape:

- **Trip**: id, slug, caseNumber, codename, title, destination, dates, duration, status, tagline, base `{ address, metro, supermarkets[] }`, flights `{ out, in }`, classification, exchangeNote, heroImage, travelers[], days[], food[] (cafés w/ hours), packing[] (checklist seed), tips, budget[] (concrete only), budgetTotal, memories[].
- **Day**: n, weekday, date, title, label (funky), sticker (tone), vibe, lead, summary, transitFromBase, anchors[], ideas[], photos[], intel[].
- **Anchor**: label, time?, type (`ticket` | `market` | `transit` | `shuttle` | `flight`), detail, booking (`booked` | `toBook` | `na`), bookingLink?, confirmationKey? (localStorage key for the confirmation slot).
- **Idea** (a menu item / stop): name, why (one-liner), area, cost?, tip?, photo?, mapsQuery (string used to build the Open-in-Maps URL).
- **Photo**: src, alt, credit?.

Adding a future trip stays a **data-only** job (new `NNN-slug.ts` + images).

## 9. Components

**Fix:**
- `Reveal.tsx` + `.reveal` CSS + `DayCard` `whileInView` — make content **visible by default**; entrance animation becomes additive enhancement only (triggered via `IntersectionObserver` with a forgiving `rootMargin` and `threshold: 0`, and never able to leave content hidden). This is the single most important fix.

**Build:**
- `routes/Day.tsx` — the day page.
- `components/trip/DayIndex.tsx` — clickable 8-day index (replaces broken `DaysScroller` on the overview).
- `components/day/Anchors.tsx`, `components/day/IdeaCard.tsx`, `components/day/DayGallery.tsx`.
- `components/trip/StatusBanner.tsx` — live today/now-next/countdown.
- `components/trip/Safehouse.tsx`, `components/trip/Rendezvous.tsx`, `components/trip/PackingList.tsx`.
- `lib/useLocalStorage.ts` — small hook for checklists + confirmation numbers.
- `lib/mapsLink.ts` — build Open-in-Maps URLs.
- `lib/tripClock.ts` — date → trip status / today / next-anchor.

**Reuse (keep aesthetic):** `CaseHeader`, `TripHero`, `AvatarChip`, `PassportStamp`, `Sticker`, `Pill`, `Tape`, `Stamp`, `PunchHoles`, `MarqueeStrip`, `ScrollToTop`, budget + practical-info styling, `globals.css` palette/tokens.

**Retire/replace:** broken horizontal `DaysScroller` (replaced by `DayIndex` + day pages).

## 10. Photos plan

- Audit the ~70 images in `assets/images/`. **Cull generic** transport shots (trains/buses/taxis/airport) from primary use.
- Map real location shots to the new days (Egizio, Palazzo Reale, Mole/Cinema, Porta Palazzo, Quadrilatero, Sacra di San Michele, Avigliana lakes, Superga, Monte dei Cappuccini, Lingotto, Po riverside, Susa).
- Supplement gaps (Automobile Museum, Susa Roman ruins, Villa della Regina, Balôn market, specific cafés) from free sources (Wikimedia Commons / Unsplash), correctly attributed.
- Apurva reviews the final per-day photo set before lock.

## 11. Scope guardrails / non-goals

- No embedded/interactive maps (links only).
- No expense tracking, no booking integrations, no notifications/push.
- No offline PWA, no service worker.
- No accounts/backend — static site, GitHub Pages, `HashRouter`.
- No aesthetic redesign — extend the existing case-file system only.

## 12. Definition of done

- No blank sections: Hub card, day index, all 8 day pages, budget, packing all render on load.
- Every day page shows correct Anchors (with booked/▶book states) + Menu + gallery + intel from the new plan.
- Booked items (Egizio 10:00; Cinema+lift 15:00) show as confirmed with a working confirmation-number slot.
- Live status banner shows the right state for the current date.
- Packing checklist + confirmation numbers persist across reloads.
- "Open in Maps" links resolve to the correct place on a phone.
- Builds clean (`npm run build`), no console errors, responsive on mobile (375px+).
- Clara finds it actually useful on the trip.

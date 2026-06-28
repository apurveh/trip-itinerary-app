# Mobile-First Dossier Redesign — Design Spec

**Date:** 2026-06-28
**App:** The Clara & Apurva Files (Turin trip itinerary, React + Vite + TS + Tailwind)
**Primary device:** phone, used *during* the trip, often outdoors in bright sun

---

## 1. Problem

The app is built desktop-first with hardcoded pixel positioning, then patched for mobile
with `!important` overrides. On a phone it visibly breaks:

- **Overflow:** hub stats use `repeat(4, 1fr)` → the 4th ticket bleeds off-screen; the
  marquee text clips at the viewport edge.
- **Collisions:** `TripHero` uses absolute-positioned tape, stamps, a folder tab and rotated
  stickers with pixel offsets that assume a wide layout → on mobile they stack on top of each
  other and the content (e.g. the "TOP TIRAMISÙ" stamp slices through the polaroid).
- **Visual cacophony:** 5 font families (Anton, Bebas, Special Elite, IBM Plex Mono, Playfair),
  5 loud accent colors (wine, amber, teal, pink, classified-red), and 6 decoration systems
  (stamps, tape, stickers, punch-holes, redaction bars, marquee) all firing at once.
- **Wrong mental model for the itinerary:** the Day page leads with "THE MENU — pick any,
  skip any, in any order." The user wants a *sequenced plan* ("then this, then that"). The
  data already has timed `anchors` (a real spine); they're buried under the buffet.
- **Dead weight:** locked stamp wall, "ASSIGNMENT TBD" pending cards, empty "FILE EMPTY"
  memories, "00" stats, world-map panel — all render as placeholder clutter.
- **Weather understated:** says "28–32 °C"; early-July Turin realistically runs 30–35 °C with
  heatwaves higher, and the schedule isn't built around the heat.
- **Role framing:** Clara is labelled "Cultural Attaché" — reads as a sidekick to Apurva's
  "Field Agent." They should be co-equals.

The theme is not the problem. The lack of a disciplined system is.

## 2. Goals

1. **Mobile-first** — single-column, fluid, nothing ever overflows or collides on a phone.
2. **One disciplined visual system** — the dossier *soul* stays; the cacophony goes.
3. **Sequenced day plans** — each day reads as a morning→evening timeline ("what's next").
4. **Heat-aware** — realistic Turin July heat baked *into* the plan, not just a tips box.
5. **No dead weight** — remove every placeholder/empty section.
6. **Co-equal travelers** — Clara and Apurva both "Field Agent" rank.
7. **A disciplined pixel-art motif** — retro-game flavor that *unifies* rather than clashes.

## 3. Design system (the core of the fix)

### Typography — 5 fonts → 3, each with exactly one job
- `Anton` — large display titles only (page titles, day numbers, big stats).
- `IBM Plex Mono` — small uppercase labels & meta (times, tags, "FIELD MANUAL · 1–8 JULY").
- One readable serif (`EB Garamond` / `Playfair` for the italic "quote" voice) — body copy and
  the personal one-liners. Warm, legible at length in sunlight.
- **Removed as text faces:** Bebas Neue, and Special Elite as a *body* font (kept only,
  optionally, as a rare 1-line accent — it is unreadable at paragraph length on a phone).

### Color — 5 accents → 2 (+ rare highlight)
- **Base:** warm ink on manila paper (the identity — unchanged).
- **Primary accent:** wine. **Secondary:** amber, used sparingly.
- **Retired from structural use:** teal, pink, classified-red. Red may survive as *one* rare
  stamp highlight. Travelers no longer color-coded pink/amber as identity.

### Decoration — max ONE flat accent per screen
- No absolute-positioned tape/stamps/stickers piled over content. No rotation collisions.
- At most one un-rotated stamp **or** one strip of tape per screen, as deliberate punctuation.
- **Paper-grain `mix-blend: multiply` overlay:** removed on mobile (kills sunlight legibility
  + costs perf); at most a whisper (≤0.15 opacity) on larger screens.

### Pixel-art motif (new, disciplined)
A single coherent retro-game layer, all in the ink/wine/amber palette so it reads as one system:
- Pixel-art **icons** for anchor/stop types: ticket, transit/train, market, food, viewpoint,
  hydration. These replace the current lucide icons on the Day timeline.
- Pixel **map-pin** marker used on every "open in maps" affordance.
- A pixel **Mole Antonelliana / Turin skyline** silhouette as a hero/footer motif.
- Pixel **divider rules** between day-part bands and a pixel **heat/sun** badge.
- Implementation: inline SVG with crisp edges (`shape-rendering: crispEdges`) or small
  CSS box-shadow sprites — no raster assets, no new fonts. Kept monochromatic per context.

### Spacing & layout primitives
- Mobile-first fluid scale (e.g. `clamp` anchored to small screens, not shrunk from desktop).
- One container: comfortable side padding on mobile, max-width centered on desktop.
- Min 44px tap targets. Generous vertical rhythm. `overflow-x` impossible by construction.

## 4. Page redesigns

### Compact sticky header (App / CaseHeader)
- Short, never-clipping bar: wordmark + a back affordance on inner pages. No content cut off.

### Hub (`/`)
- **Masthead:** "THE CLARA & APURVA FILES" title (fluid, no shadow pile-up), tagline, the two
  travelers as equal chips.
- **One real stat line** built only from true values (e.g. "1 trip · 8 days · Turin"). No "00".
- **The one active trip** as a single clean feature card → opens the dossier.
- **Removed:** locked StampWall, "ASSIGNMENT TBD" PendingCards, WorldMapPanel, marquee clutter
  (a single quiet status strip may remain if it adds value, else cut).

### Trip dossier (`/trips/:slug`)
- **Hero:** rebuilt mobile-first — title, dates, tagline, the two agents, 2–3 *flat* tags (no
  rotated overlapping stickers), one hero photo that never gets sliced by a stamp. One small
  flat stamp accent max.
- **Meta bar:** stacks cleanly on mobile (no 5-col fixed grid); shows duration, base, agents,
  budget, and corrected temp.
- **Status banner:** kept (it's genuinely useful — T-minus / today / next fixed anchor).
- **Day index:** a clean vertical list of the 8 days, each linking to its timeline.
- **Safehouse / Rendezvous / Packing / Budget / Practical:** kept, restyled mobile-first to the
  new system; horizontal-scroll day scroller removed in favor of clean stacking.
- **Memories:** removed while empty (re-introduced later when real photos exist).

### Day timeline (`/trips/:slug/day/:n`) — the headline change
- Header: day number, title, the funky label (one flat sticker), weekday/date, lead agent,
  the personal summary, and "getting there."
- **Body = ONE vertical chronological timeline**, grouped into bands:
  **MORNING · MIDDAY · AFTERNOON · EVENING.**
  - Fixed/timed `anchors` are the **spine**: shown with time, place, one line, transit, a
    booking chip (booked ✓ / book-this →), confirmation-number slot, and a pixel map-pin link.
  - `ideas` (the old menu) become **optional inline side-stops** slotted into the right band —
    framed as "if you have time / nearby," never "in any order." Each keeps why/area/cost/tip/
    photo/map link.
  - The hot **13:00–16:00** band is explicitly an indoor-museum / siesta window.
- Gallery + Intel: kept below, restyled.
- **No more "THE MENU — pick any, skip any, in any order."**

## 5. Heat-awareness

- Weather data corrected to **~30–35 °C, humid, heatwaves higher**; "save indoor museums for the
  hot afternoon; hydrate; refill at the green *toret* fountains" elevated from a buried tip.
- Timeline-level cues: a pixel sun/heat badge on outdoor stops, "shade" tag on arcaded routes
  (Via Roma), indoor stops surfaced for the 13:00–16:00 band, hydration reminders in Intel.
- Packing already lists a refillable bottle; surface heat gear (hat, sunscreen) if missing.

## 6. Data / content changes

- `travelers`: both `role: "Field Agent"`; drop the pink/amber identity coloring as structural.
  Differentiation is by *who leads which day* (`lead`), already in the data — not by rank.
- `tips.weather`: rewritten to realistic heat (see §5).
- Day rendering: a small pure helper merges `anchors` + `ideas` into ordered day-part bands.
  Prefer a render-time transform over a data migration; if ideas need explicit ordering, add an
  optional `band?: "morning"|"midday"|"afternoon"|"evening"` to `Idea` (non-breaking).
- `hubData.stats`: replaced with real-value-only line; remove `pendingFiles` usage.

## 7. Component inventory

**Keep & restyle:** App/CaseHeader, ScrollToTop, Reveal, TripHero, StatusBanner, DayIndex,
Safehouse, Rendezvous, PackingList, BudgetSection, PracticalInfo, BackToHub, AvatarChip,
FeatureTripCard, Anchors (folded into the timeline), IdeaCard (becomes side-stop), DayGallery,
Sticker/Stamp/Tape/PunchHoles (demoted to disciplined accents).

**Remove (placeholder/dead weight):** StampWall, PassportStamp, PendingCard, WorldMapPanel,
MemoriesSection (while empty), MarqueeStrip (unless one quiet strip earns its place).

**Add:** pixel-icon set (anchor types, map-pin, sun/heat, skyline), a `Timeline`/day-band
renderer, and shared mobile-first layout/type tokens (migrate inline styles → CSS classes /
Tailwind utilities so the system is enforced in one place, not copy-pasted per component).

## 8. Approach to the styling refactor

The inline-style sprawl is why the system can't be enforced. Consolidate the recurring patterns
(cards, labels, timeline rows, chips, bands, pixel accents) into named CSS classes in
`globals.css` (extending the existing token block) and/or Tailwind utilities, then have
components consume them. This is what makes "one disciplined system" real rather than aspirational.
Refactor is scoped to components touched by this redesign — no unrelated rewrites.

## 9. Verification

- Manual: drive the running app at a phone width (~390px) across Hub → Trip → each Day; confirm
  zero horizontal overflow, no overlapping decorations, legible type, working map/booking links.
- Keep existing unit tests green (`mapsLink`, `tripClock`); add a test for the
  anchors+ideas → day-band merge helper.
- Cross-check at tablet/desktop widths for graceful scale-up.

## 10. Out of scope (this pass)

- New trips beyond Turin; real memories/photos; multi-trip archive features; backend/data
  persistence beyond the existing localStorage confirmation slots.

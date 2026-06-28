# Mobile-First Dossier Redesign — Design Spec (v2)

**Date:** 2026-06-28
**App:** The Clara & Apurva Files (Turin trip itinerary, React + Vite + TS + Tailwind)
**Primary device:** phone, used *during* the trip, outdoors, bright Italian summer sun, often
one-handed, frequently on roaming / spotty / no data.
**v2 note:** revised after a 5-lens adversarial review (accessibility, mobile-robustness,
performance/offline, UX/IA, visual-coherence). Changes from v1 are marked **[v2]**.

---

## 1. Problem

The app is desktop-first with hardcoded pixel positioning, patched for mobile with `!important`.
On a phone it visibly breaks:

- **Overflow:** hub stats `repeat(4,1fr)` → 4th ticket off-screen; marquee text clips at the edge.
- **Collisions:** `TripHero` absolute-positioned tape/stamps/tab/rotated stickers (pixel offsets)
  stack over content (the "TOP TIRAMISÙ" stamp slices the polaroid).
- **Cacophony:** 5 font families, 5 loud accent colors, 6 decoration systems firing at once.
- **Wrong itinerary model:** the Day page leads with "THE MENU — pick any, in any order" (a
  buffet) when the user wants sequenced "what's next" structure. The data has timed `anchors`
  (a real spine) buried under the menu.
- **Dead weight:** locked stamp wall, "ASSIGNMENT TBD" cards, empty memories, "00" stats, world map.
- **Weather understated** ("28–32 °C") and not built into the plan.
- **Role framing:** Clara = "Cultural Attaché" reads as Apurva's sidekick.

The theme is not the problem. The lack of a disciplined system is.

## 2. Goals

1. Mobile-first — single column, nothing overflows or collides on a phone.
2. One disciplined visual system — keep the dossier soul; kill the cacophony.
3. Sequenced day plans that respect a spontaneous traveller (anchors, not a clock cage).
4. Heat-aware — realistic Turin July heat baked into the plan, day-by-day.
5. No dead weight — remove every placeholder section **and its data**.
6. Co-equal travelers — Clara and Apurva both "Field Agent."
7. A disciplined **stencil-grid** icon motif (the "pixel" request, reframed — see §3.4).
8. **[v2]** Usable offline / on bad data — the defining condition of in-trip use (see §5).

## 3. Design system

### 3.1 Typography — 5 → 3 faces, each one job
- `Anton` — large display titles only (page titles, day numbers, big stats).
- `IBM Plex Mono` — small uppercase labels & meta (times, tags, eyebrows). **Min 12px**,
  tracking capped ~0.12em (wide tracking only ≥14px). **[v2]**
- Serif voices, split by job **[v2]**: **EB Garamond = body** (upright, ≥16px, readable in sun);
  **Playfair = the italic "quote" voice only** (short one-liners — never running body, never
  italic paragraphs).
- **Removed as text faces:** Bebas Neue; Special Elite as a *body* font (currently the global
  body font — this is a real refactor, not a token tweak). **[v2]**
- **[v2]** No pixel/stencil *text or numerals* ever — the grid motif is icon-only, so the
  letterform count stays at three.
- **[v2]** Type sizes in `rem`-anchored `clamp()` (not raw `px`/`vw`), so user font-scaling and
  200%-zoom work; display floors lowered for ≤360px; long display words `overflow-wrap:anywhere`.

### 3.2 Color — 5 → 2 accents (+ 1 functional red)
- Base: warm ink `#1a1612` on manila paper (identity — unchanged).
- **Primary:** wine `#7a1f1f`. **Secondary:** amber `#c97614`.
- **[v2] Amber is fill-only.** Amber on manila ≈ 2.35:1 / on paper ≈ 3.1:1 — fails WCAG and dies
  in sun. Amber may only sit *behind* dark ink (ink text on an amber chip). Any amber *foreground*
  uses `--amber-deep #8b4f08`. All load-bearing text is ink or wine.
- **[v2] The retired `--classified` red is repurposed as a functional time-lock alarm** — used
  ONLY on hard, miss-it-and-the-trip-breaks locks (e.g. Avigliana shuttle 09:00/10:00/14:00/16:00,
  the 06:13 departure train). Not decoration.
- **Retired from structural use:** teal, pink. **[v2]** Migrate `days[].sticker:"teal"` (Days 3, 6)
  and `travelers[].color` (pink/amber) out of the data — no color-as-identity.
- **[v2] Color never carries meaning alone.** Day-part order, booking state, and lead agent are
  encoded by label/shape/icon, not hue (see §3.3, §4, §6).

### 3.3 Booking state — encoded by shape + icon + text, never color **[v2]**
The trip's most safety-critical signal. Three states, visually distinct without relying on hue:
- **booked:** solid wine chip · ✓ · confirmation number shown.
- **to-book:** outlined/ghost chip · → · "BOOK THIS" (links to official site).
- **na:** plain mono, no chip.
- **hard time-lock:** the functional red alarm marker (§3.2) in addition.

### 3.4 Stencil-grid iconography (the "pixel" request, made coherent) **[v2 — major revision]**
8-bit "retro-game" pixels would clash (1980s digital vs 1940s analog). Reframed: keep the crisp
gridded **geometry**, drop the game **semantics**, so each icon reads as a *stencil / rubber-stamp
cut on a grid* — historically analog and on-theme.
- **Icon-only, monochrome ink, functional.** Renders via inline SVG `shape-rendering:crispEdges`,
  defined once as a shared `<symbol>` sprite (not duplicated per row).
- **Used as a *swap*, not an addition:** replaces the current lucide icons on stops + the maps glyph.
  - Anchor/stop types, reconciled to the data enums **[v2]**: ticket, train/transit, shuttle,
    flight, market, food, viewpoint, hydration (see §6 — enum + `Idea.kind` get extended).
  - A **sun-arc** glyph doubles as the day-part band marker (low→high→setting) AND the heat cue.
  - A map-pin on every stop that has a real destination.
- **Cut (net-new decoration that re-forks the brand):** the pixel Mole skyline hero motif and
  pixel divider rules. Heat cues ride the **existing stamp vocabulary** (a "☀ HOT · INDOORS 13–16"
  tag), not a new pixel badge.
- **Tiered decoration rule [v2]:** functional/systematic marks (stencil icons, map-pins, mono
  labels) are monochrome ink, repeat freely, and do **not** count as "the accent." The
  "one loud accent per screen" rule governs only decorative punctuation (a colored stamp/tape/
  sticker). One loud accent per screen; unlimited quiet functional marks.

### 3.5 Decoration & texture
- No absolute-positioned tape/stamps piled over content; no rotation collisions.
- **[v2] Paper-grain `mix-blend:multiply` overlay:** ship the removal now — `opacity:0` at
  ≤720px and under `prefers-reduced-transparency`; ≤0.12 elsewhere; never over body text. (It's
  also a fixed full-viewport multiply layer that repaints every scroll frame — perf + legibility.)
- Hard offset box-shadows kept only on interactive/sticker elements; never stacked; none on the
  masthead. **[v2]** Shadow offsets must fit *inside* container padding so they can't cause
  horizontal scroll at 320px.

### 3.6 People, places, things — one representation each **[v2]**
- **Places/memories = photos.** **Wayfinding/UI = stencil icons.** **People = ONE avatar system.**
- **Emoji avatars (🕵️/🍷) removed** — full-color, vendor-specific, off-palette, and re-encode the
  retired sidekick coding. Avatar treatment: **OPEN DECISION (§11) — stencil portraits vs a
  monochrome "passport/ID-photo" treatment.** Whichever is chosen is the *only* way people appear.

### 3.7 Layout primitives
- One container: comfortable mobile side-padding (≥16px), max-width centered on desktop, **plus a
  defined intermediate (tablet 600–1024px) layout** so iPad isn't a thin ribbon. **[v2]**
- Min **44px** tap targets, enforced (min-height + hit padding on every link/chip/input; inputs
  16px font to avoid iOS zoom-on-focus). **[v2]**
- Global **`:focus-visible { outline:3px solid var(--wine); outline-offset:2px }`** + distinct
  input focus ring. **[v2]**
- **Safe-area insets [v2]:** `<meta viewport … viewport-fit=cover>`; `env(safe-area-inset-*)`
  padding on the sticky header, the fixed ScrollToTop button, and any sticky strip.
- **Sticky-header offset [v2]:** a single `--header-h` token consumed by both the header and
  `scroll-margin-top`/`scroll-padding-top` on every in-page jump target, so anchored jumps don't
  hide behind the header.
- `overflow-x` impossible by construction; verified at 320px.

## 4. Day model — shapes, not a clock cage **[v2 — major revision]**

Each day declares a **shape** so loose days aren't forced into empty time-bands (honors the
traveller's "anchors, not schedules" style while still giving "what's next" structure):

- **`anchored`** (most city days): a vertical spine of the few **timed/fixed anchors** in order,
  each with time · place · one line · transit · booking chip (§3.3) · confirmation slot · map-pin.
  Untimed `ideas` are **NOT** interleaved as if scheduled — they collect into a single
  **"ANYTIME · NEARBY"** group rendered *after* the spine (each keeps why/area/cost/tip/photo/map).
- **`route`** (Susa Day 6, Superga Day 7): the ideas ARE the plan — render them as an **ordered
  walk** (step 1→N), not "optional side-stops." The one fixed thing (e.g. return train) is pinned.
- **`transit`** (arrival Day 1, departure Day 8): a **countdown checklist** of ordered steps with
  the single hard time (06:13 train, 04:45 wake) alarm-marked; no morning→evening bands.

Rules:
- **Band boundaries (only for `anchored`) are pinned + unit-tested [v2]:** morning <12:00 ·
  midday 12:00–14:59 (13:00–16:00 styled as the heat sub-window) · afternoon 15:00–17:59 ·
  evening ≥18:00. Empty bands render nothing (no empty header).
- **Banding/sorting reads a parsed `startMin`, never prose [v2]** (see §6) — the current
  `^\d{2}:\d{2}` regex silently drops "from 07:00", "ONLY 09:00 / 10:00…", "≈ hourly", which are
  the *most* time-critical anchors.
- **Empty states [v2]:** zero anchors / zero ideas / zero photos → the section is omitted (no
  empty headings; Day 6 & 8 have `photos: []`). `Day.tsx` must also guard `anchors` (currently
  unguarded).
- **Live "now / next" lives on the Day page [v2]**, not only the Trip banner: the current band and
  next stop highlight live (reuse `tripStatusAt`/`nextAnchor`), and "next" falls back to the next
  band/idea group when no timed anchor remains (so guidance doesn't go blank after 10:00).
- **Past/upcoming/in-progress states [v2]:** upcoming = plan; in-progress = live highlight;
  completed = static recap (no "book this"). Wire to the clock or drop the stale hardcoded
  `trip.status:"upcoming"`.

## 5. Heat-awareness & offline

### Heat **[v2 day-aware]**
- `tips.weather` corrected to **~30–35 °C, humid, heatwaves higher** (single source of truth; day
  badges derive from it — no drift).
- City days: surface indoor stops for the 13:00–16:00 heat window + a "☀ HOT · INDOORS 13–16" tag.
- **Day-trip days are outdoors midday** (Sacra shuttle 14:00, Susa, Superga) — heat guidance there
  is **shade · water · early-start**, not "go indoors." Heat copy is day-aware, not one global rule.
- Hydration / green *toret*-fountain cues on outdoor stops; confirm packing lists hat + sunscreen.

### Offline / performance **[v2 — was out of scope; now flagged as core]**
For a phone used mid-trip on bad data, "re-download everything from Google every time" is the
single biggest hole. **Recommended (OPEN DECISION §11 — adds scope):**
- **PWA + service worker** (`vite-plugin-pwa`/Workbox): precache the app shell (~74KB gz JS +
  ~4KB gz CSS + `turin.ts`) and self-hosted fonts; runtime-cache images (CacheFirst LRU). Add a
  web manifest so it installs to the home screen and opens instantly with no signal.
- **Images:** ~8 MB of 1080–1707px JPGs rendered at ~360px (3–5× oversampled). Resize to ~2×
  display width (≤~800px), emit AVIF/WebP via `srcset`/`<picture>` (e.g. `vite-imagetools`).
  Expect ~8 MB → ~1–1.5 MB. **In scope regardless of PWA.**
- **Every `<img>` gets intrinsic `width`/`height` or `aspect-ratio`** (zero do today) → no layout
  jump as images stream in on slow data. Day hero `height:220` fixed → `aspect-ratio`. **In scope.**
- **Self-host the 3 fonts** (woff2, Latin subset, `font-display:swap`); drop Google Fonts origins.
- Hero `fetchpriority="high"` + `decoding="async"`; below-fold stays `loading="lazy"`.
- Drop `framer-motion` (only `useReducedMotion` is used, already tree-shaken) → 5-line `matchMedia`
  hook. Low urgency, keeps the dep tree clean.

## 6. Data / content changes **[v2 expanded]**

- **`Anchor` gains** `startMin?: number` (parsed minutes-from-midnight for banding/sorting; prose
  `time` kept for display), `mapsQuery?: string` (render map-pin only when a real destination
  exists — not on "Wake-up"), and `confirmationKey` on **every bookable** anchor (MAUTO, Sacra
  train, Susa train, Sassi–Superga tram currently lack it). Booking chip flips toBook→booked
  locally once a confirmation is entered.
- **`Idea` gains** optional `kind?` (food/viewpoint/market/…) so side-stops pick a stencil icon
  deterministically instead of guessing from prose; ideas are **never** force-banded by array index.
- **`AnchorType` enum reconciled** with the icon set (add viewpoint/food/hydration or map them;
  shuttle/flight already exist).
- **`Day` gains** `shape: "anchored" | "route" | "transit"` (§4).
- **`travelers`:** both `role:"Field Agent"`; drop `color`/emoji as identity.
- **`tips.weather`** rewritten (§5); becomes the single weather source of truth.
- **Remove placeholder DATA**, not just its render: `memories:[FILE EMPTY ×4]`, `pendingFiles`,
  the "00" stat values. Keep `Memory`/`PendingFile` *types* for later.
- **Source-of-truth pass:** day intel references packing/weather rather than re-stating; idea
  `cost` vs Budget reconciled so the two layers can't contradict.
- **localStorage confirmations don't sync across the two phones** — note the limitation in-UI
  ("saved on this phone only"); true sync is out of scope.

## 7. Page redesigns

- **Sticky header:** short, never-clipping; wordmark + context-aware back. **[v2]** Day → back to
  Trip day-index (not Hub); Trip → back to Hub. Confirm `BackToHub` isn't used on Day pages.
- **Hub:** masthead (no shadow pile-up) + tagline + the two equal travelers; one real stat line
  (no "00"); the one active trip as a clean feature card. **Removed:** StampWall, PendingCards,
  WorldMapPanel, marquee clutter.
- **Trip dossier:** mobile-first hero (title, dates, tagline, two agents, 2–3 *flat* tags, one hero
  photo never sliced, ≤1 flat stamp); meta bar stacks (no 5-col fixed grid) with corrected temp;
  StatusBanner kept; clean vertical day index; Safehouse/Rendezvous/Packing/Budget/Practical kept
  & restyled with **dual labels [v2]** (themed mono eyebrow + plain heading: "RENDEZVOUS"→"Where to
  meet", "SAFEHOUSE"→"Base / Apartment"); horizontal day-scroller removed; Memories removed while
  empty.
- **Day:** the §4 shape-aware timeline; **prev/next-day controls [v2]**; gallery + intel below,
  restyled; live now/next highlight.

## 8. Component inventory

**Keep & restyle:** App/CaseHeader, ScrollToTop, Reveal, TripHero, StatusBanner, DayIndex,
Safehouse, Rendezvous, PackingList, BudgetSection, PracticalInfo, AvatarChip (re-skinned to the
chosen avatar system), FeatureTripCard, DayGallery, Sticker/Stamp/Tape/PunchHoles (disciplined
accents only).
**Refactor into the shape-aware Day:** Anchors (→ timed spine), IdeaCard (→ ANYTIME/NEARBY card or
route step). **Context-fix:** BackToHub (Day→Trip).
**Remove (placeholder/dead weight):** StampWall, PassportStamp, PendingCard, WorldMapPanel,
MemoriesSection (while empty), MarqueeStrip (unless one reduced-motion-safe, non-overflowing strip
earns its place).
**Add:** stencil-icon `<symbol>` sprite (types, sun-arc, map-pin); shape-aware `Timeline`/day-band
renderer + the parse/merge helper; shared mobile-first layout/type tokens (migrate inline styles →
CSS classes so the system is enforced in one place); responsive `<Image>` wrapper (srcset +
intrinsic dimensions); `matchMedia` reduced-motion hook.

## 9. Accessibility checklist **[v2]**

Amber fill-only · global `:focus-visible` + input ring · 44px targets · booking/band/lead encoded
by shape+icon+text not hue · grain off on mobile · timeline as `<ol>` with real `<h2>/<h3>` band
headings in document order and `<time>` for times · stencil SVGs `aria-hidden` with a visible text
label always present · meaningful hero `alt` (not `alt=""`) · italic limited to short quotes ·
reduced-motion disables marquee + reveal + hover-lift · skip-to-content link · confirm
`index.html` viewport allows pinch-zoom (no `maximum-scale`/`user-scalable=no`) · `.redacted` joke
`aria-hidden`.

## 10. Verification

- Manual at **320px and ~390px** across Hub → Trip → every Day shape (anchored/route/transit):
  zero horizontal overflow, no overlapping decorations, legible in simulated glare, working
  map/booking/confirmation/prev-next links; **landscape** and **200% text-zoom** passes.
- Unit tests: keep `mapsLink`, `tripClock` green; **add tests for** the time-string parser
  (`startMin` for "from 07:00", "ONLY 09:00 / 10:00", "≈ hourly", "10:00–19:00") and the
  band-boundary merge helper.
- Tablet/desktop scale-up check.

## 11. Open decisions for the user

1. **Offline/PWA (scope):** add the service-worker + manifest so the app works offline mid-trip?
   Strongly recommended for this use case; adds build setup. (Image resizing + intrinsic
   dimensions happen either way.)
2. **Avatar treatment:** stencil-grid portraits (reinforces the icon system) **or** a monochrome
   "passport/ID-photo" treatment (warmer, more personal)? This is *you two*, so it's your call.

## 12. Out of scope (this pass)

New trips beyond Turin; real memories/photos; multi-trip archive; cross-device confirmation sync;
backend persistence beyond the existing localStorage slots.

# Mobile-First Dossier Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild The Clara & Apurva Files as a disciplined, mobile-first travel dossier — a shape-aware day timeline, a tightened visual system with stencil-grid icons, corrected heat content, and no placeholder clutter.

**Architecture:** Three layers, built bottom-up. (1) **Data/logic**: extend the type model, add a robust time-string parser and a shape-aware day-band builder, migrate `turin.ts`. (2) **Design system**: collapse 5 fonts→3 and 5 accents→2 in `globals.css`, add a stencil-icon SVG sprite, a responsive `<Image>` wrapper. (3) **Components/pages**: rebuild Hub, Trip, and the shape-aware Day timeline on the new system; delete dead components. Logic units are built test-first; visual units are built then verified in the running app at 320px and 390px.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind 3, React Router 6 (HashRouter), Vitest. `vite-imagetools` added for responsive images. `framer-motion` removed.

## Global Constraints

- **Mobile-first**: no horizontal overflow at **320px**; verify at 320 + 390px, landscape, and 200% text-zoom.
- **Type**: only `Anton` (display), `IBM Plex Mono` (labels, min 12px, tracking ≤0.12em), `EB Garamond` (body, ≥16px, upright), `Playfair Display` (italic quote voice only). No Bebas, no Special-Elite-as-body, no pixel/stencil text.
- **Color**: ink `#1a1612` on manila; accents wine `#7a1f1f` + amber `#c97614`. **Amber is fill-only** (behind ink); amber foreground uses `--amber-deep #8b4f08`. `--classified` red is functional time-lock only. No teal/pink as identity. **Color never the sole carrier of meaning.**
- **Tap targets** ≥44px; inputs 16px font. Global `:focus-visible` outline.
- **Stencil icons**: monochrome ink, `shape-rendering:crispEdges`, `aria-hidden`, always paired with a visible text label. Icon-only (no pixel text). Functional marks don't count against the "one loud accent per screen" rule.
- **Avatars**: stencil-grid portraits only. No emoji.
- **Travelers**: both `role: "Field Agent"`.
- **No PWA / service worker** (user has reliable data). Image + font optimization still ships.
- **Copy**: dual-label nav sections (themed mono eyebrow + plain heading).
- **Commit** after every task. Keep `mapsLink` + `tripClock` tests green.

---

## File Structure

**New files**
- `src/lib/parseTime.ts` + `.test.ts` — time-string → minutes parser.
- `src/lib/dayBands.ts` + `.test.ts` — shape-aware band/route/transit builder.
- `src/components/primitives/Icon.tsx` — stencil `<symbol>` sprite + `<Icon name>`.
- `src/components/primitives/Image.tsx` — responsive `<img>` with srcset + intrinsic size.
- `src/components/brand/Avatar.tsx` — stencil portrait (replaces emoji path in AvatarChip).
- `src/components/day/StopRow.tsx` — one timeline stop (anchor or idea) + booking chip + map-pin.
- `src/components/day/DayTimeline.tsx` — shape-aware renderer (anchored/route/transit).
- `src/components/day/BookingChip.tsx` — booked/to-book/na/time-lock chip.
- `src/components/trip/SectionHead.tsx` — dual-label (eyebrow + plain heading) header.

**Modified**
- `src/lib/types.ts`, `src/lib/trips/turin.ts`, `src/lib/hubData.ts`, `src/lib/tripClock.ts` (+test).
- `src/styles/globals.css`, `index.html`, `vite.config.ts`, `package.json`, `tailwind.config.js`.
- `src/App.tsx`, `src/routes/Hub.tsx`, `src/routes/Trip.tsx`, `src/routes/Day.tsx`.
- `src/components/brand/CaseHeader.tsx`, `AvatarChip.tsx`; `src/components/trip/*` (TripHero, DayIndex, Safehouse, Rendezvous, PackingList, BudgetSection, PracticalInfo, BackToHub, StatusBanner); `src/components/day/*` (Anchors→folded, IdeaCard, DayGallery); `src/components/hub/FeatureTripCard.tsx`.

**Deleted**
- `src/components/hub/StampWall.tsx`, `src/components/brand/PassportStamp.tsx`, `src/components/hub/PendingCard.tsx`, `src/components/hub/WorldMapPanel.tsx`, `src/components/trip/MemoriesSection.tsx`, `src/components/primitives/MarqueeStrip.tsx`. (`Anchors.tsx` folded into `StopRow`/`DayTimeline`, then deleted.)

---

# PHASE 1 — Data & logic (test-first)

### Task 1: Time-string parser

**Files:**
- Create: `src/lib/parseTime.ts`
- Test: `src/lib/parseTime.test.ts`

**Interfaces:**
- Produces: `parseStartMin(time: string | undefined): number | null` — first `HH:MM` found anywhere in the string → minutes from midnight; `null` if none. Used by `dayBands.ts` (Task 3) and the data migration (Task 5).

- [ ] **Step 1: Write the failing test** (real strings from `turin.ts`)

```ts
// src/lib/parseTime.test.ts
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
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npx vitest run src/lib/parseTime.test.ts`
Expected: FAIL — `parseStartMin is not a function`.

- [ ] **Step 3: Implement**

```ts
// src/lib/parseTime.ts
/** First HH:MM anywhere in the string → minutes from midnight, else null. */
export function parseStartMin(time: string | undefined): number | null {
  if (!time) return null;
  const m = time.match(/(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const h = Number(m[1]), min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npx vitest run src/lib/parseTime.test.ts` — Expected: PASS (8 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/parseTime.ts src/lib/parseTime.test.ts
git commit -m "feat: robust anchor time-string parser"
```

---

### Task 2: Extend the type model

**Files:**
- Modify: `src/lib/types.ts`

**Interfaces:**
- Produces: extended `AnchorType`, `Anchor`, `Idea`, `Day`, `Traveler`; new `IconName`, `DayShape`, `BandKey`. Consumed by every later task.

- [ ] **Step 1: Edit `src/lib/types.ts`** — apply exactly these changes:

```ts
// AnchorType: add viewpoint, food, hydration (icon set parity)
export type AnchorType =
  | "ticket" | "market" | "transit" | "shuttle" | "flight"
  | "viewpoint" | "food" | "hydration";

// Idea kind so side-stops pick an icon deterministically (no prose-guessing)
export type IdeaKind = AnchorType;

export type DayShape = "anchored" | "route" | "transit";
export type BandKey = "morning" | "midday" | "afternoon" | "evening";

// Stencil icon names (Task 8 sprite)
export type IconName =
  | "ticket" | "market" | "transit" | "shuttle" | "flight"
  | "viewpoint" | "food" | "hydration" | "sun-arc" | "map-pin";
```

In `Anchor` add: `startMin?: number;` (parsed, for banding/sort), `mapsQuery?: string;` (map-pin only when a real destination), and allow `confirmationKey?` on any bookable (already optional — no change, but it will now be populated for `toBook` too). In `Idea` add: `kind?: IdeaKind;`. In `Day` add: `shape: DayShape;`. In `Traveler`: change `color: "amber" | "pink";` to `color?: never;` is overkill — instead **remove** the `color` and `emoji` requirement by making them optional and unused: set `emoji?: string;` and `color?: string;` (kept optional so the migration can delete them without a type break; the renderer ignores both).

- [ ] **Step 2: Typecheck**

Run: `npx tsc -b --noEmit` — Expected: PASS (types compile; data not yet migrated, so existing `turin.ts` still satisfies optional additions). If `Day.shape` being required breaks `turin.ts` compile, that is expected and fixed in Task 5; to keep this task green, temporarily mark `shape?: DayShape;` optional here and tighten to required at the end of Task 5.

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: extend types for day shapes, parsed times, idea kinds"
```

---

### Task 3: Shape-aware day-band builder

**Files:**
- Create: `src/lib/dayBands.ts`
- Test: `src/lib/dayBands.test.ts`

**Interfaces:**
- Consumes: `parseStartMin` (Task 1); `Anchor`, `Idea`, `Day`, `BandKey` (Task 2).
- Produces:
  - `bandOf(min: number): BandKey` — morning `<720`, midday `720–899`, afternoon `900–1079`, evening `≥1080`.
  - `isHeatWindow(min: number): boolean` — `780 ≤ min < 960` (13:00–16:00).
  - `buildAnchoredDay(day): { band: BandKey; anchors: Anchor[] }[]` — timed anchors sorted by `startMin` (falling back to `parseStartMin(time)`), grouped into bands in band order; **empty bands omitted**; untimed anchors inherit the previous timed anchor's band, else `morning`.
  - `anytimeIdeas(day): Idea[]` — all ideas, returned as the single "ANYTIME · NEARBY" group (never interleaved into bands).

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/dayBands.test.ts
import { describe, it, expect } from "vitest";
import { bandOf, isHeatWindow, buildAnchoredDay, anytimeIdeas } from "./dayBands";
import type { Day } from "./types";

describe("bandOf", () => {
  it("buckets by half-open ranges", () => {
    expect(bandOf(600)).toBe("morning");    // 10:00
    expect(bandOf(720)).toBe("midday");     // 12:00
    expect(bandOf(900)).toBe("afternoon");  // 15:00
    expect(bandOf(1080)).toBe("evening");   // 18:00
  });
});

describe("isHeatWindow", () => {
  it("is true 13:00–15:59, false outside", () => {
    expect(isHeatWindow(780)).toBe(true);   // 13:00
    expect(isHeatWindow(959)).toBe(true);    // 15:59
    expect(isHeatWindow(960)).toBe(false);   // 16:00
    expect(isHeatWindow(779)).toBe(false);
  });
});

const day = {
  shape: "anchored",
  anchors: [
    { label: "Egizio", time: "10:00", startMin: 600, type: "ticket", detail: "", booking: "booked" },
    { label: "Aperitivo", time: "19:00", startMin: 1140, type: "food", detail: "", booking: "na" },
    { label: "Check bags", type: "transit", detail: "", booking: "na" }, // untimed
  ],
  ideas: [{ name: "Piazza San Carlo", why: "", mapsQuery: "Piazza San Carlo, Torino" }],
} as unknown as Day;

describe("buildAnchoredDay", () => {
  it("groups timed anchors into ordered, non-empty bands", () => {
    const bands = buildAnchoredDay(day);
    expect(bands.map((b) => b.band)).toEqual(["morning", "evening"]);
    expect(bands[0].anchors.map((a) => a.label)).toContain("Egizio");
    expect(bands[0].anchors.map((a) => a.label)).toContain("Check bags"); // inherits morning
  });
});

describe("anytimeIdeas", () => {
  it("returns ideas as one group, untouched", () => {
    expect(anytimeIdeas(day).map((i) => i.name)).toEqual(["Piazza San Carlo"]);
  });
});
```

- [ ] **Step 2: Run, verify fail** — `npx vitest run src/lib/dayBands.test.ts` → FAIL.

- [ ] **Step 3: Implement**

```ts
// src/lib/dayBands.ts
import type { Anchor, BandKey, Day, Idea } from "./types";
import { parseStartMin } from "./parseTime";

const ORDER: BandKey[] = ["morning", "midday", "afternoon", "evening"];

export function bandOf(min: number): BandKey {
  if (min < 720) return "morning";
  if (min < 900) return "midday";
  if (min < 1080) return "afternoon";
  return "evening";
}

export function isHeatWindow(min: number): boolean {
  return min >= 780 && min < 960;
}

function minOf(a: Anchor): number | null {
  return a.startMin ?? parseStartMin(a.time);
}

export function buildAnchoredDay(day: Day): { band: BandKey; anchors: Anchor[] }[] {
  const sorted = [...day.anchors].sort((x, y) => (minOf(x) ?? 1e9) - (minOf(y) ?? 1e9));
  const groups = new Map<BandKey, Anchor[]>();
  let lastBand: BandKey = "morning";
  for (const a of sorted) {
    const m = minOf(a);
    const band = m == null ? lastBand : bandOf(m);
    lastBand = band;
    (groups.get(band) ?? groups.set(band, []).get(band)!).push(a);
  }
  return ORDER.filter((b) => groups.has(b)).map((b) => ({ band: b, anchors: groups.get(b)! }));
}

export function anytimeIdeas(day: Day): Idea[] {
  return day.ideas;
}
```

- [ ] **Step 4: Run, verify pass** — `npx vitest run src/lib/dayBands.test.ts` → PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/dayBands.ts src/lib/dayBands.test.ts
git commit -m "feat: shape-aware day-band builder with heat window"
```

---

### Task 4: Live now/next with fallback

**Files:**
- Modify: `src/lib/tripClock.ts`, `src/lib/tripClock.test.ts`

**Interfaces:**
- Produces: `nextStop(day, nowHHMM): { kind: "anchor"; anchor: Anchor } | { kind: "band"; band: BandKey } | null` — next timed anchor by `startMin`; if none remain, the next upcoming band that has content; else `null`. Existing `nextAnchor` kept for back-compat but reimplemented on `startMin`.

- [ ] **Step 1: Add failing tests** to `tripClock.test.ts`

```ts
import { nextStop } from "./tripClock";
// ...
describe("nextStop", () => {
  const day = { shape: "anchored", ideas: [], anchors: [
    { label: "Egizio", time: "10:00", startMin: 600, type: "ticket", detail: "", booking: "booked" },
  ] } as unknown as Day;
  it("points at the next timed anchor before it", () => {
    const s = nextStop(day, "09:00");
    expect(s).toEqual({ kind: "anchor", anchor: expect.objectContaining({ label: "Egizio" }) });
  });
  it("falls back to null when nothing timed remains and no later band", () => {
    expect(nextStop(day, "11:00")).toBeNull();
  });
});
```

Also update the existing `nextAnchor` test's day objects to include `startMin` so the regex change stays green (e.g. add `startMin: 600` / `startMin: 900` to the two anchors).

- [ ] **Step 2: Run, verify fail** — `npx vitest run src/lib/tripClock.test.ts` → FAIL on `nextStop`.

- [ ] **Step 3: Implement** — replace the `nextAnchor` body and add `nextStop`:

```ts
import { parseStartMin } from "./parseTime";
import { bandOf } from "./dayBands";
import type { BandKey } from "./types";

const hhmmToMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));
const anchorMin = (a: Anchor) => a.startMin ?? parseStartMin(a.time);

export function nextAnchor(day: Day, nowHHMM: string): Anchor | null {
  const now = hhmmToMin(nowHHMM);
  return [...day.anchors]
    .filter((a) => anchorMin(a) != null)
    .sort((x, y) => (anchorMin(x)! - anchorMin(y)!))
    .find((a) => anchorMin(a)! >= now) ?? null;
}

export function nextStop(day: Day, nowHHMM: string):
  | { kind: "anchor"; anchor: Anchor }
  | { kind: "band"; band: BandKey }
  | null {
  const a = nextAnchor(day, nowHHMM);
  if (a) return { kind: "anchor", anchor: a };
  return null; // future: next non-empty band; null is correct when no later timed content
}
```

- [ ] **Step 4: Run, verify pass** — `npx vitest run` (whole suite) → PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/tripClock.ts src/lib/tripClock.test.ts
git commit -m "feat: nextStop with parsed times; nextAnchor handles prose time strings"
```

---

### Task 5: Migrate `turin.ts`

**Files:**
- Modify: `src/lib/trips/turin.ts`

**Interfaces:** Consumes Task 1–2. After this task, set `Day.shape` to **required** in `types.ts` and re-run tsc.

- [ ] **Step 1: Apply data edits** (no test; verified by tsc + app render later):
  - **Day shapes:** `n:1`→`shape:"transit"`, `n:2..5`→`shape:"anchored"`, `n:6`→`shape:"route"`, `n:7`→`shape:"route"`, `n:8`→`shape:"transit"`.
  - **startMin:** add `startMin` to every anchor that has a `time`, using these parsed values: `06:25`→385, `15:00`→900 (×2: D1 check-in, D4), `10:00`→600 (D2), `10:00–19:00`→600 (D3), `from 07:00`→420 (D4), `07:45 / …`→465 (D5 train), `ONLY 09:00 / …`→540 (D5 shuttle), `ONLY 09:30 / …`→570 (D5 shuttle B), `≈ hourly to ~20:00`→1200 (D6), `~04:45`→285, `05:54`→354, `06:13`→373, `09:05`→545.
  - **Stickers off teal:** D3 `sticker:"teal"`→`"amber"`; D6 `sticker:"teal"`→`"wine"`.
  - **Confirmation slots on every bookable:** add `confirmationKey` to the 4 `toBook` anchors — MAUTO `"mauto-conf"`, Sacra train `"sacra-train-conf"`, Susa train `"susa-train-conf"`, Sassi–Superga tram `"superga-tram-conf"`.
  - **mapsQuery on anchors with a real destination** (skip "Wake-up"/generic transit): add `mapsQuery` to ticket/market/shuttle/viewpoint/food anchors, e.g. Museo Egizio `"Museo Egizio, Torino"`, MAUTO `"Museo dell'Automobile, Torino"`, Sacra shuttle stop, etc. Leave flights and "wake-up" without it.
  - **Idea kinds:** add `kind` to ideas where obvious — food (`tavola calda`, aperitivo, lunch), viewpoint (Superga, Monte Cappuccini, Sacra), market (Balon, Porta Palazzo).
  - **Travelers:** both `role: "Field Agent"`; delete `emoji` and `color` keys from both.
  - **Weather (single source of truth):** replace `tips.weather` with: `["Early July in Turin is hot — roughly 30–35 °C, humid, and hotter in a heatwave.", "On city days, save the indoor museums for the 13:00–16:00 peak and walk the arcaded streets (Via Roma) for shade.", "On the day-trips (Sacra, Susa, Superga) you're outdoors in the heat — start early, wear a hat, and carry water.", "Refill free at the green bull-head 'toret' fountains all over the city."]`.
  - **Packing:** add `"Sun hat"` and `"Sunscreen"` if absent.
  - **Remove placeholder data:** delete the 4 `memories: [{caption:"FILE EMPTY"...}]` entries (set `memories: []`).

- [ ] **Step 2: Tighten `Day.shape` to required** in `types.ts` (`shape: DayShape;`).

- [ ] **Step 3: Typecheck + tests** — `npx tsc -b --noEmit` PASS; `npx vitest run` PASS.

- [ ] **Step 4: Commit**

```bash
git add src/lib/types.ts src/lib/trips/turin.ts
git commit -m "feat: migrate Turin data — shapes, parsed times, conf slots, heat, no placeholders"
```

---

### Task 6: Clean hub data

**Files:**
- Modify: `src/lib/hubData.ts`

- [ ] **Step 1: Edit** — remove `pendingFiles` (and stop relying on it); replace `stats` with a single real line consumed as plain strings: `stats: [{ n: "01", label: "Trip planned" }, { n: "08", label: "Days in Turin" }, { n: "01", label: "First trip together" }]` (no "00" values). Keep `brand`, `tagline`, `archive`.

- [ ] **Step 2: Typecheck** — `npx tsc -b --noEmit`. If `HubData.pendingFiles` is required in `types.ts`, make it optional there and drop its usage; Hub no longer renders pending files.

- [ ] **Step 3: Commit**

```bash
git add src/lib/hubData.ts src/lib/types.ts
git commit -m "chore: remove placeholder hub stats and pending files"
```

---

# PHASE 2 — Design system

### Task 7: Rebuild design tokens, type system, and `index.html`

**Files:**
- Modify: `src/styles/globals.css`, `index.html`, `tailwind.config.js`

- [ ] **Step 1: `index.html`** — set fonts to the 3 retained families (drop Bebas + Special Elite) and add `viewport-fit=cover`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Anton&family=EB+Garamond:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />
```

(Self-hosting is a later optional optimization; keeping Google Fonts here but trimmed to 3 families is correct and unblocks the redesign.)

- [ ] **Step 2: `globals.css`** — apply these system changes (keep the color token block; adjust usage rules):
  - Add `:root { --header-h: 56px; }` and use it (Task 10).
  - `html` font-family → `'EB Garamond', Georgia, serif`; base body size `clamp(1rem, 0.95rem + 0.3vw, 1.125rem)` (≥16px). Body line-height 1.5.
  - `.t-display` font → `'Anton', system-ui, sans-serif` (unchanged family, but ensure no Bebas fallback elsewhere). `.t-stencil` → repoint to `'Anton'` (Bebas removed) OR replace `.t-stencil` usages with `.t-display`. `.t-typewriter` → `'IBM Plex Mono'` (Special Elite removed). `.t-serif` italic uses `'Playfair Display'`.
  - **Grain overlay:** wrap `body::before` rule so it only applies `@media (min-width: 721px)` at `opacity: 0.12`; add `@media (max-width:720px){ body::before{ display:none } }` and `@media (prefers-reduced-transparency: reduce){ body::before{ display:none } }`.
  - **Focus:** add `:focus-visible { outline: 3px solid var(--wine); outline-offset: 2px; }` and `input:focus-visible { outline-offset: 0; }`.
  - **Tap targets:** add `.tap { min-height: 44px; display: inline-flex; align-items: center; }` utility; inputs get `font-size: 16px; min-height: 44px;`.
  - **Scroll offset:** `:root { scroll-padding-top: var(--header-h); }` and `.scroll-target { scroll-margin-top: var(--header-h); }`.
  - **Amber rule:** add comment + ensure no rule sets amber as text color; add `.on-amber { background: var(--amber); color: var(--ink); }` and change any amber-foreground usage to `--amber-deep`.
  - **Reduced motion:** extend the existing block to add `*, .marquee { animation: none !important; }` for the marquee keyframes (marquee is being removed, but guard anyway).
  - **Safe area:** `.safe-b { padding-bottom: env(safe-area-inset-bottom); }`, `.safe-t { padding-top: env(safe-area-inset-top); }`.
  - **Container:** `.case-container { max-width: 1100px; padding: 0 16px; }` on mobile; `@media(min-width:600px){ padding:0 24px }`; `@media(min-width:1024px){ padding:0 32px }`.
  - Remove `.days-scroller` horizontal-scroll rules (Trip no longer uses it).

- [ ] **Step 3: `tailwind.config.js`** — align `fontFamily`/color tokens if referenced; otherwise no-op. Ensure content globs include `src/**/*.tsx`.

- [ ] **Step 4: Verify build + visual** — `npm run dev`, open at 390px: body renders in serif, no Special-Elite body, no console font 404s, focus ring visible on tab, no grain on mobile.

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css index.html tailwind.config.js
git commit -m "feat: disciplined token + type system, mobile-first, a11y focus/targets"
```

---

### Task 8: Stencil-grid icon sprite

**Files:**
- Create: `src/components/primitives/Icon.tsx`

**Interfaces:**
- Produces: `<IconSprite />` (mount once near root) + `<Icon name={IconName} size?={number} title?={string} />` — renders `<svg aria-hidden><use href="#i-<name>"/></svg>` with `shape-rendering:crispEdges`, `currentColor` fill.

- [ ] **Step 1: Implement** — define grid-built SVG symbols (each on a 16×16 viewBox, blocky stencil paths) for: `ticket, market, transit, shuttle, flight, viewpoint, food, hydration, sun-arc, map-pin`. Pattern:

```tsx
// src/components/primitives/Icon.tsx
import type { IconName } from "@/lib/types";

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {/* Each symbol: 16x16, paths snapped to the integer grid for a stencil/pixel read. */}
        <symbol id="i-ticket" viewBox="0 0 16 16">
          <path d="M2 4h12v3H13v2h1v3H2v-3h1V7H2z" fill="currentColor" />
        </symbol>
        {/* ...define the remaining symbols similarly (map-pin, sun-arc, train, etc.) */}
      </defs>
    </svg>
  );
}

export default function Icon({ name, size = 16, title }: { name: IconName; size?: number; title?: string }) {
  return (
    <svg width={size} height={size} aria-hidden={title ? undefined : true}
         role={title ? "img" : undefined} style={{ shapeRendering: "crispEdges", display: "inline-block", verticalAlign: "-0.15em" }}>
      {title && <title>{title}</title>}
      <use href={`#i-${name}`} />
    </svg>
  );
}
```

(Implementer draws each symbol's grid path; keep them monochrome `currentColor`, no gradients, integer coordinates only.)

- [ ] **Step 2: Mount `<IconSprite />`** once in `App.tsx` (top of the tree).

- [ ] **Step 3: Verify** — temporarily render all 10 icons on the Hub; confirm crisp blocky edges at 16px and 32px, inherit ink color, no layout shift. Remove the temp render.

- [ ] **Step 4: Commit**

```bash
git add src/components/primitives/Icon.tsx src/App.tsx
git commit -m "feat: stencil-grid icon sprite"
```

---

### Task 9: Responsive Image wrapper + image pipeline

**Files:**
- Create: `src/components/primitives/Image.tsx`
- Modify: `package.json`, `vite.config.ts`

**Interfaces:**
- Produces: `<Image src alt width height priority? className? />` — emits responsive `srcset` (via `vite-imagetools` query) + intrinsic `width`/`height` (reserve space → no CLS) + `loading`/`fetchpriority`/`decoding`.

- [ ] **Step 1: Add dependency**

Run: `npm i -D vite-imagetools` — Expected: installs, `package.json` updated.

- [ ] **Step 2: Configure** — add `imagetools()` to `vite.config.ts` plugins; set a default directive so trip JPGs resize to `w=400;800` and emit `webp` + fallback.

- [ ] **Step 3: Implement `Image.tsx`**

```tsx
// src/components/primitives/Image.tsx
interface Props { src: string; alt: string; width: number; height: number;
  priority?: boolean; className?: string; style?: React.CSSProperties; }
export default function Image({ src, alt, width, height, priority, className, style }: Props) {
  return (
    <img src={src} alt={alt} width={width} height={height} className={className}
      decoding="async" loading={priority ? "eager" : "lazy"}
      // @ts-expect-error fetchpriority is valid HTML, not yet in React types
      fetchpriority={priority ? "high" : undefined}
      style={{ display: "block", width: "100%", height: "auto", aspectRatio: `${width} / ${height}`, ...style }} />
  );
}
```

- [ ] **Step 4: Verify** — swap one image (Day hero) to `<Image>` with real intrinsic dims; `npm run build` succeeds; DevTools shows a downscaled/webp asset and no layout shift.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/components/primitives/Image.tsx
git commit -m "feat: responsive Image wrapper + imagetools pipeline"
```

---

# PHASE 3 — Components & pages

> Visual tasks: build, then **verify in `npm run dev` at 320px and 390px** (DevTools device toolbar). Acceptance = no horizontal overflow, no overlapping decorations, ≥44px targets, legible type, working links. Commit after each.

### Task 10: Sticky header with context-aware back

**Files:** Modify `src/App.tsx`, `src/components/brand/CaseHeader.tsx`

- [ ] **Step 1:** Rebuild `CaseHeader` as a compact sticky bar (`position: sticky; top: 0; height: var(--header-h)`, `.safe-t`, wine bottom border, wordmark left). Use `useLocation`/`useMatch` to show a back affordance on inner routes: on `/trips/:slug/day/:n` → "← DAY INDEX" linking to `/trips/:slug`; on `/trips/:slug` → "← FILING CABINET" linking to `/`; on Hub → none. Never clip the wordmark (truncate with ellipsis if needed).
- [ ] **Step 2:** Ensure `<IconSprite/>` (Task 8) and header sit above `<Outlet/>`.
- [ ] **Step 3: Verify** at 320/390px — header never overlaps content; back target correct per route; safe-area padding present.
- [ ] **Step 4: Commit** `git commit -m "feat: compact sticky header with context-aware back"`

---

### Task 11: Stencil avatar (replace emoji)

**Files:** Create `src/components/brand/Avatar.tsx`; modify `src/components/brand/AvatarChip.tsx`

- [ ] **Step 1:** Build `Avatar` rendering a small stencil-grid portrait per traveler (a simple monochrome ink "ID photo" on the grid, distinct silhouette per `name`; no emoji, no color). `AvatarChip` consumes `Avatar` + the name + `role` ("FIELD AGENT") in mono.
- [ ] **Step 2:** Remove all emoji/`color` usage from `AvatarChip`.
- [ ] **Step 3: Verify** — both chips read as one monochrome system; equal visual weight (no sidekick framing).
- [ ] **Step 4: Commit** `git commit -m "feat: stencil avatars; drop emoji and color identity"`

---

### Task 12: BookingChip + StopRow

**Files:** Create `src/components/day/BookingChip.tsx`, `src/components/day/StopRow.tsx`; reuse `ConfNumber` logic from `Anchors.tsx`

**Interfaces:**
- `<BookingChip state="booked"|"toBook"|"na" timeLock?:boolean link?:string confirmationKey?:string />` — booked = solid wine chip + ✓ + conf number; toBook = ghost chip + → + "BOOK THIS" link, flips to booked locally once a conf number is entered (reuse `useLocalStorage`); na = nothing; `timeLock` adds the red alarm marker.
- `<StopRow anchor? idea? />` — one timeline entry: stencil type icon + time (`<time>`) + name + one line + transit + `<BookingChip>` + map-pin (`<Icon name="map-pin"/>` linking `mapsLink(mapsQuery)`), rendered only when `mapsQuery` exists. Mobile: stacks; conf input `max-width: 14ch`. Every interactive child `.tap` (≥44px).

- [ ] **Step 1:** Implement both; move the `ConfNumber` input here (44px tall, 16px font). Time-lock red marker driven by a prop the timeline sets for known hard locks (Sacra shuttle, departure train).
- [ ] **Step 2: Verify at 320px** — a long place name + booking link + conf input do not overflow; ≥44px targets; map-pin only where a destination exists; booked vs to-book distinct without relying on color (shape + ✓/→ + text).
- [ ] **Step 3: Commit** `git commit -m "feat: BookingChip + StopRow (shape/icon/text, 44px, map-pin)"`

---

### Task 13: Shape-aware Day timeline

**Files:** Create `src/components/day/DayTimeline.tsx`; rewrite `src/routes/Day.tsx`; delete `src/components/day/Anchors.tsx`

**Interfaces:** Consumes `buildAnchoredDay`/`anytimeIdeas`/`isHeatWindow` (Task 3), `nextStop` (Task 4), `StopRow` (Task 12), `Icon` (Task 8).

- [ ] **Step 1:** `DayTimeline` switches on `day.shape`:
  - `anchored`: render `buildAnchoredDay(day)` as an `<ol>`; each band is a `<section className="scroll-target">` with an `<h2>` (`sun-arc` icon + band name); heat sub-window bands show the "☀ HOT · INDOORS 13–16" tag; below the spine, an "ANYTIME · NEARBY" `<section>` listing `anytimeIdeas(day)` via `StopRow` (idea mode). No "pick any, in any order" copy.
  - `route`: render ideas as an ordered `<ol>` of numbered steps (StopRow idea mode, step index shown); pin any timed anchor (return train) with a time-lock marker.
  - `transit`: render anchors as an ordered checklist `<ol>` (countdown), hard time (06:13 / 04:45) alarm-marked; no day-part bands.
- [ ] **Step 2:** Live highlight — when `tripStatusAt(now)` says this is today, mark the current band and `nextStop` target (`aria-current`), and scroll it into view (respecting `scroll-margin-top`). Past days render static (no "book this" emphasis).
- [ ] **Step 3:** Rewrite `Day.tsx` header per spec (day number, one flat sticker label, weekday/date, lead, summary, getting-there), then `<DayTimeline>`, then gallery (guard empty) + intel (guard empty). **Guard `anchors`/`ideas`/`photos` empty** — omit the section entirely. Add **prev/next-day** controls (links to `day/${n-1}`/`${n+1}`, hidden at ends). Day hero uses `<Image>` with `aspect-ratio`.
- [ ] **Step 4: Verify** each shape: D2 (anchored, bands + ANYTIME), D7 (route, no timed anchors → ordered steps, no empty bands), D8 (transit, countdown). 320/390px, no overflow, semantics (`<ol>`, headings, `<time>`).
- [ ] **Step 5: Commit** `git commit -m "feat: shape-aware day timeline (anchored/route/transit) + live now-next"`

---

### Task 14: Rebuild Hub

**Files:** Rewrite `src/routes/Hub.tsx`

- [ ] **Step 1:** Mobile-first single column: masthead (`THE CLARA & APURVA FILES`, fluid `rem` clamp, no shadow pile-up) + tagline + the two equal `AvatarChip`s; one real stat strip from cleaned `hubData` (no "00"); the active trip as one `FeatureTripCard`. Remove imports/usage of `WorldMapPanel`, `StampWall`, `PendingCard`, `MarqueeStrip`.
- [ ] **Step 2: Verify** 320/390px — stats never overflow (no 4-col fixed grid), title doesn't clip, single clean column.
- [ ] **Step 3: Commit** `git commit -m "feat: rebuild Hub mobile-first, remove placeholder sections"`

---

### Task 15: Rebuild TripHero + Trip page

**Files:** Rewrite `src/components/trip/TripHero.tsx`; modify `src/routes/Trip.tsx`; create `src/components/trip/SectionHead.tsx`

- [ ] **Step 1:** `SectionHead` = dual label (mono eyebrow + plain `<h2>` heading). Apply to Safehouse ("SAFEHOUSE" → "Base / Apartment"), Rendezvous ("RENDEZVOUS" → "Where to meet"), Packing, Budget, Practical.
- [ ] **Step 2:** Rebuild `TripHero` mobile-first: **no absolute-positioned tape/stamps over content**, no rotated overlapping stickers. Stack: eyebrow, title (fluid), tagline, two agents, 2–3 flat tags, one hero `<Image>` (never sliced), ≤1 flat stamp. Meta bar = wrapping grid (`repeat(auto-fit,minmax(120px,1fr))`), corrected temp `30–35°C`.
- [ ] **Step 3:** `Trip.tsx`: keep `StatusBanner`, `DayIndex`, the section cards, `BudgetSection`, `PracticalInfo`; **remove** `MemoriesSection`; ensure the section grid stacks on mobile. `BackToHub` → Hub.
- [ ] **Step 4: Verify** 320/390px — the Image#2 collision is gone; meta bar wraps; tags don't collide; everything stacks.
- [ ] **Step 5: Commit** `git commit -m "feat: rebuild TripHero + Trip page, dual-label sections, no collisions"`

---

### Task 16: Delete dead components + drop framer-motion

**Files:** Delete the 6 dead components; modify `src/lib/useLocalStorage.ts`? no — modify `BudgetSection.tsx`, `package.json`

- [ ] **Step 1:** Delete `StampWall.tsx`, `PassportStamp.tsx`, `PendingCard.tsx`, `WorldMapPanel.tsx`, `MemoriesSection.tsx`, `MarqueeStrip.tsx`. Grep to confirm zero imports remain: `grep -rn "StampWall\|PassportStamp\|PendingCard\|WorldMapPanel\|MemoriesSection\|MarqueeStrip" src` → no hits.
- [ ] **Step 2:** Replace `useReducedMotion` from framer-motion in `BudgetSection.tsx` with a 5-line `matchMedia('(prefers-reduced-motion: reduce)')` hook; remove `framer-motion` from `package.json`; `npm i`.
- [ ] **Step 3: Verify** — `npx tsc -b --noEmit` PASS, `npm run build` PASS, `grep framer src -r` → no hits.
- [ ] **Step 4: Commit** `git commit -m "chore: delete dead components; drop framer-motion"`

---

# PHASE 4 — Accessibility & verification

### Task 17: Accessibility sweep

**Files:** `src/App.tsx` (skip link), various (alt text, aria)

- [ ] **Step 1:** Add a skip-to-content link in `App.tsx` (`<a href="#main" className="sr-only-focusable">Skip to content</a>`) and `id="main"` on the page `<main>` (add `sr-only` + `:focus` reveal styles in `globals.css`).
- [ ] **Step 2:** Give the trip hero `<Image>` a real `alt` (e.g. "Piazza San Carlo at golden hour, Turin") — not `alt=""`. Confirm all stencil `<Icon>`s are `aria-hidden` and every icon has an adjacent text label. `aria-hidden` the `.redacted` joke if present.
- [ ] **Step 3: Verify** — keyboard-tab through Hub→Trip→Day: skip link works, focus ring visible everywhere, no keyboard traps; VoiceOver/screen-reader spot check that timeline reads as an ordered list with band headings.
- [ ] **Step 4: Commit** `git commit -m "feat: skip link, alt text, icon aria sweep"`

---

### Task 18: Image migration + final verification

**Files:** All components still using raw `<img>`

- [ ] **Step 1:** Replace remaining raw `<img>` (DayGallery, IdeaCard/StopRow photos, FeatureTripCard) with `<Image>` + real intrinsic dims; hero gets `priority`.
- [ ] **Step 2:** `npm run build` and check the `dist` image payload dropped substantially (was ~8 MB) — e.g. `du -sh dist/assets/*.webp | sort -h`.
- [ ] **Step 3: Full manual pass** (the spec §10 matrix): at **320px and 390px**, every route (Hub, Trip, Day×{anchored D2, route D7, transit D8}): no horizontal overflow, no overlapping decorations, ≥44px targets, legible in glare-sim, working map/booking/conf/prev-next/back links. Spot-check **landscape** and **200% text-zoom**. Run full suite `npx vitest run` → green.
- [ ] **Step 4: Commit** `git commit -m "feat: migrate images to responsive Image; final mobile verification"`

---

## Self-Review (completed during authoring)

- **Spec coverage:** §3.1 type→T7; §3.2 color→T5/T7; §3.3 booking→T12; §3.4 stencil→T8/T12/T13; §3.5 grain/shadows→T7; §3.6 avatars→T11; §3.7 layout/focus/44px/safe-area/scroll→T7/T10/T12; §4 day shapes→T1–T5/T13; §5 heat→T5, perf/images/fonts→T7/T9/T18, drop framer→T16; §6 data→T2/T5/T6; §7 pages→T10/T13/T14/T15; §8 inventory→T16 (+ builds throughout); §9 a11y→T7/T12/T17; §10 verify→T18. No gaps.
- **Placeholders:** logic tasks carry full code + real test values; visual tasks carry exact files, interfaces, classes, and concrete acceptance criteria (rendered-and-verified, since pixel TDD is not meaningful). The Icon symbol paths and full page JSX are drawn/assembled by the implementer against the given structure — intentional, not a placeholder.
- **Type consistency:** `parseStartMin`, `bandOf`/`isHeatWindow`/`buildAnchoredDay`/`anytimeIdeas`, `nextStop`, `IconName`, `DayShape`, `BandKey`, `<Image>`/`<Icon>`/`<StopRow>`/`<BookingChip>` signatures are consistent across tasks that consume them.

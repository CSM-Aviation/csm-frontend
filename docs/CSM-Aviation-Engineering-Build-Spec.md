# CSM Aviation — Engineering Build Spec

**Implementation plan derived from the Website Redesign brief (v1.0) + Brand Guidelines (v1.0)**
For the from-scratch rebuild on branch `new_guide_lines`. Companion to `CSM-Aviation-Website-Redesign.md` — that doc owns the *what/why* (design language); this doc owns the *how* (file structure, contracts, data, tasks).

---

## 00 · Scope & locked decisions

Decisions confirmed for this build (deviations from the design brief noted):

| Question | Decision | Implication |
|---|---|---|
| Deliverable | **Engineering build spec** | This document — routes, component contracts, token wiring, data layer, ticketable tasks. |
| Data source | **Existing API for fleet only** (`/api/fleet`); ignore all other API endpoints | Fleet is dynamic from `csmaviation-api.com`. SEO, vendors, testimonials, admin endpoints are **not used**. Everything non-fleet is static in-repo. |
| Page scope | **Core 8 + lighter-touch** | Build the 8 specced pages plus `/charter/quote`, `/charter/trip`, `/destinations`, `/destinations/[cityId]`, `/customer-experience`, `/faqs`, `/privacy-policy`, `/sitemap`. |
| Dropped from old site | Admin dashboard, careers, vendor-form, campaign/event pages (`/donor-5k`, `/newyear`, `/thanksgiving`, `/donornetworkwest`), F1 analytics | Not rebuilt. Out of scope for this spec. |

**Baseline:** the working tree is effectively empty — only `layout.tsx`, `page.tsx` (placeholder), `globals.css` (still default shadcn HSL tokens), `src/lib/utils.ts` survive on disk; 115 old files are staged-deleted. This is a greenfield build inside an existing Next project.

---

## 01 · Stack & repo baseline

Confirmed installed (`package.json`): Next `14.2.5` (App Router), React `18`, TypeScript `5`, Tailwind `3.4.1` + `tailwindcss-animate`, `framer-motion 11.5.4`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@vercel/analytics`, `@vercel/speed-insights`.

Config present: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`. Assets present under `public/images` (fleet, destinations, `Gold_argus_logos`, `LOGOS`) and `public/videos/compressed`. Brand fonts (Cormorant + Inter TTFs) and logo SVGs live in `docs/` and must be moved into the app.

**Server Components by default.** Client components only for: nav dropdowns/mobile drawer, fleet category filter, all forms, the scroll-reveal observer, and the scroll-progress horizon line.

---

## 02 · Target repository structure

```
src/
  app/
    layout.tsx                 # fonts, tokens import, metadata base, analytics, header/footer
    page.tsx                   # Home
    globals.css                # @tailwind + token import + base resets
    charter/
      page.tsx                 # Charter landing
      fleet/
        page.tsx               # Fleet overview (reads ?category=)
        [id]/page.tsx          # Fleet detail (dynamic, from API)
      quote/page.tsx           # lighter-touch
      trip/page.tsx            # lighter-touch
    management/page.tsx
    maintenance/page.tsx
    company/
      about/page.tsx
      contact/page.tsx
    destinations/
      page.tsx                 # lighter-touch
      [cityId]/page.tsx        # lighter-touch (static data)
    customer-experience/page.tsx
    faqs/page.tsx
    privacy-policy/page.tsx
    sitemap/page.tsx           # human sitemap page
    sitemap.ts                 # XML sitemap (next metadata route)
    robots.ts
  components/
    ui/                        # primitives: Button, Logo, Eyebrow, Container, ...
    layout/                    # Header, Footer, MobileDrawer, SectionBand
    horizon/                   # HorizonRule, HorizonDivider, Cheatline, ScrollProgress
    fleet/                     # FleetCard, FleetGrid, CategoryFilter, SpecTable
    proof/                     # StatBlock, ProofBar, AccreditationStrip
    forms/                     # Field, Select, Textarea, QuoteForm, TripForm, ContactForm
  content/                     # ALL static content (non-fleet)
    nav.ts                     # header/footer link model
    home.ts management.ts maintenance.ts about.ts charter.ts
    destinations.ts            # city data (port from old cityData.ts)
    faqs.ts accreditations.ts proof.ts
  lib/
    api/fleet.ts               # the ONLY data fetcher
    api/types.ts               # FleetItem + normalized Aircraft type
    motion.ts                  # durations/eases (mirror of token values)
    useReveal.ts               # IntersectionObserver + reduced-motion guard
    utils.ts                   # cn() (exists)
  styles/
    tokens.css                 # §19 of the design doc — single source of truth
public/
  fonts/                       # self-hosted variable TTFs (moved from docs/) — §3.3
  images/logos/                # brand logo SVGs (moved from docs/) + accreditation marks — §3.4
```

Conventions (from design doc §17): one component per file, **named exports**, no magic numbers (everything via tokens), tokens are the single source of truth — **no hard-coded hex in components**.

---

## 03 · Foundation setup (do this first — blocks everything)

### 3.1 Tokens

Create `src/styles/tokens.css` = verbatim copy of design doc **§19** `:root` block (color core + extended + text + state, type scale, tracking, space, radius, layout, elevation, motion). Replace the shadcn HSL block in `globals.css`. `globals.css` becomes:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "../styles/tokens.css";

@layer base {
  html { scroll-behavior: smooth; }
  body { background: var(--fog); color: var(--ink); font-family: var(--font-body); }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
  }
}
```

### 3.2 Tailwind mapping

Rewrite `tailwind.config.ts` `theme.extend` to **reference the tokens** (drop the old `csm-navy/csm-deep/...` palette entirely). Map brand colors, the fluid type sizes, spacing scale, radii, and eases to Tailwind so utilities stay token-bound:

```ts
colors: {
  petrol: 'var(--petrol)', fog: 'var(--fog)', saddle: 'var(--saddle)',
  gold: { DEFAULT:'var(--gold)', hover:'var(--gold-hover)', press:'var(--gold-press)' },
  abyss:'var(--abyss)', horizon:'var(--horizon)', sand:'var(--sand)',
  ink: { DEFAULT:'var(--ink)', soft:'var(--ink-soft)', faint:'var(--ink-faint)' },
  line: { DEFAULT:'var(--line)', dark:'var(--line-dark)' },
  // ... petrol-900/700/600/500, fog-raised/sunk, paper-on-dark/soft, focus/success/error
},
fontFamily: { display:['var(--font-display)'], body:['var(--font-body)'] },
fontSize: { display:'var(--t-display)', h1:'var(--t-h1)', h2:'var(--t-h2)', h3:'var(--t-h3)',
            lead:'var(--t-lead)', eyebrow:'var(--t-eyebrow)' },
spacing: { /* s1..s11 → var(--s-1)..var(--s-11) */ },
borderRadius: { sm:'var(--r-sm)', md:'var(--r-md)', lg:'var(--r-lg)' },
boxShadow: { float:'var(--shadow-float)' },
maxWidth: { content:'var(--content-max)' },
transitionTimingFunction: { calm:'var(--ease-calm)', horizon:'var(--ease-horizon)' },
```

### 3.3 Fonts (self-hosted)

Design doc §04/§17 require **both** Cormorant Garamond + Inter, self-hosted. Current `layout.tsx` loads Google Inter only — replace it.

The official **variable TTFs are now in `public/fonts/`** (moved from `docs/`, web-safe names): `Inter-Variable.ttf`, `Inter-Italic-Variable.ttf`, `CormorantGaramond-Variable.ttf`, `CormorantGaramond-Italic-Variable.ttf`. Use these directly as the source of truth — **no Google fonts**.

Load via `next/font/local` (one variable axis per family covers all weights), exposing the token CSS vars:

```ts
// in layout.tsx
import localFont from 'next/font/local';

const inter = localFont({
  src: [
    { path: '../../public/fonts/Inter-Variable.ttf',        style: 'normal' },
    { path: '../../public/fonts/Inter-Italic-Variable.ttf', style: 'italic' },
  ],
  variable: '--font-body', display: 'swap', preload: true,        // body/LCP face → preload
});

const cormorant = localFont({
  src: [
    { path: '../../public/fonts/CormorantGaramond-Variable.ttf',        style: 'normal' },
    { path: '../../public/fonts/CormorantGaramond-Italic-Variable.ttf', style: 'italic' },
  ],
  variable: '--font-display', display: 'swap', preload: true,     // hero headline
});
// <html className={`${inter.variable} ${cormorant.variable}`}> — vars feed tokens.css --font-body/--font-display
```

- `next/font/local` self-hosts + adds `font-display:swap` and adjusted fallback metrics (no CLS) without a build step.
- Enable Inter `tnum` (tabular) utility for specs/phone/stats (design doc §04).
- **Optional later perf pass:** subset these variable TTFs to Latin `woff2` (~70% smaller) and swap the `path`s — the source TTFs are heavy (~0.9–1 MB each). Not required to build; track as a budget optimization (§07).

### 3.4 Brand logo assets

The official logo SVGs are now in **`public/images/logos/`** (moved from `docs/`, web-safe names). Per brand rules, reproduce only from this master artwork — never re-typeset.

| File | Artwork | Use |
|---|---|---|
| `csm-block-petrol.svg` | Fog mark in a Deep-Petrol container (viewBox `0 0 84.05 61.18`) | **Block lockup** — preferred for busy/photographic grounds, footer, social. |
| `csm-mark-petrol.svg` | Open mark, Petrol `#0e2c3d` (viewBox `0 0 66.39 23.73`) | **Positive** mark on light/Fog grounds — header once solidified. |
| `csm-mark-fog.svg` | Open mark recolored to Fog `#f5f2ed` | **Reversed** mark on dark/Petrol grounds — header over hero. |

**Header logo strategy (design doc §08):** render `csm-mark-fog.svg` while the header is transparent over the dark hero, swap to `csm-mark-petrol.svg` once it gains the `--fog-raised` background on scroll. Build a small `Logo` component (`ui/Logo.tsx`, prop `tone: 'reversed' | 'positive' | 'block'`) wrapping `next/image` (or inline SVG for crispness/`currentColor` control); enforce the 90px min width + 1× cap-height clear space (brand §04). The two source block files were byte-identical — only one is kept.

> Accreditation marks (ARGUS Gold, NBAA, NATA, ACSF, Wyvern) for the `AccreditationStrip` already exist under `public/images/logos/` and `public/images/Gold_argus_logos/` — reuse, don't re-source.

### 3.5 Motion + reveal

`lib/motion.ts` exports the durations/eases (mirror token values for use in framer-motion / inline). `lib/useReveal.ts`: `IntersectionObserver` at ~15% threshold, reveal-once, returns `{ref, shown}`; **must** short-circuit to instantly-visible when `prefers-reduced-motion: reduce`. All scroll reveals and horizon draws route through this (design doc §06).

---

## 04 · Data layer

### 4.1 Fleet API — the only fetcher

Env (carry over from old `.env`): `NEXT_PUBLIC_API_BASE_URL=https://www.csmaviation-api.com`, `NEXT_PUBLIC_API_KEY=…`. Recommend moving the key to a **server-only** env (`API_KEY`, no `NEXT_PUBLIC_`) since fleet fetches happen in Server Components.

Endpoint: `GET /api/fleet` → `FleetItem[]`. Contract recovered from the old `apiService.ts`:

```ts
// lib/api/types.ts
export interface FleetItem {
  _id: string;
  aircraftName: string;
  registration: string;       // tail number
  seats: string;
  lavatory: string;
  altitude: string;
  cabinHeight: string; cabinLength: string; cabinWidth: string;
  doorHeight: string;  doorWidth: string;
  description: string;
  luggageCapacity: string;
  range: string; speed: string;
  wifi: string; amenities: string;
  category: string;           // RAW — must be normalized (see below)
  yor: string;                // year of refurbishment/manufacture
  imageUrls: string[];
}
```

```ts
// lib/api/fleet.ts  (Server Component usage)
export async function getFleet(): Promise<Aircraft[]> { /* fetch + map + normalize */ }
export async function getAircraft(id: string): Promise<Aircraft | null> { /* find by _id */ }
```

- Use Next's `fetch(..., { next: { revalidate: 300 } })` for **ISR caching** (replaces the old in-memory 5-min cache) so fleet pages stay static-fast but refresh.
- **Category normalization is required.** Design doc filters are `light | midsize | heavy | turboprop`; the API `category` field is free-form. Build a `normalizeCategory()` map and **log/handle unknowns** (don't silently drop an aircraft). Confirm the actual distinct `category` values returned by the live API before finalizing the map.
- Map `FleetItem` → a clean `Aircraft` view-model grouping fields into the design's **Cabin / Performance / Range** spec groups (§08 Spec Table) and stat-block fields (pax, range, speed, cabin height).
- `generateStaticParams()` on `/charter/fleet/[id]` from `getFleet()` `_id`s for static detail pages.
- Failure handling: if the API is down, fleet pages must degrade gracefully (in-voice empty/error state, §16) — not crash the build or the route.

### 4.2 Static content (everything else)

All non-fleet content lives in typed modules under `src/content/`. No CMS, no other API calls. This includes nav model, home/charter/management/maintenance/about copy, destinations (port `cityData.ts` → `content/destinations.ts`), FAQs, accreditations, proof stats. **Open content gaps to be filled by stakeholders** (tracked, not blockers for scaffolding): exact safety/years claims, hero headlines, About narrative, medical-charter proof copy, final destination list.

---

## 05 · Component contracts

All components consume tokens only, meet §18 a11y, and have explicit hover/focus/disabled/error states where interactive. Build order: primitives → horizon → layout → proof/fleet → forms.

| Component | File | Key props | Notes / states |
|---|---|---|---|
| `Button` | `ui/Button.tsx` | `variant: primary\|secondary\|ghost\|text`, `as: 'a'\|'button'`, `href?` | CVA-driven. Primary=Gold bg/Petrol text→`gold-hover`+underline-draw on hover; ghost for dark bands; focus = 2px `--focus` ring, 2px offset. Near-square `--r-md`, no shadow/gradient (§08). |
| `Logo` | `ui/Logo.tsx` | `tone: reversed\|positive\|block` | Wraps the `public/images/logos/` SVGs (§3.4). Reversed (Fog) over dark hero → positive (Petrol) on solid header. Enforce 90px min width + clear space (brand §04). |
| `Eyebrow` | `ui/Eyebrow.tsx` | `tone?: saddle\|gold` | Uppercase Inter 600, `--t-eyebrow`, 0.26em tracking. |
| `Container` | `ui/Container.tsx` | `width: contained\|bleed` | Max `--content-max`, page margins `--page-margin`. |
| `SectionBand` | `layout/SectionBand.tsx` | `tone: light\|dark\|abyss`, `width`, `eyebrow?`, `heading?`, `lead?`, `divider?: top\|bottom\|both` | The fundamental layout unit (§08). Drives the light/dark rhythm (§03). Optional vertical Petrol→Abyss gradient on dark. |
| `HorizonRule` | `horizon/HorizonRule.tsx` | `color: line\|line-dark\|gold`, `animate?` | SVG 1px, subtly arced. Draws on reveal via `useReveal` (§07). `aria-hidden`. |
| `HorizonDivider` | `horizon/HorizonDivider.tsx` | `tone` | Section divider wrapper around HorizonRule. |
| `ScrollProgress` | `horizon/ScrollProgress.tsx` | — | Client. ~3px Gold line at viewport top, fills on scroll. The single persistent Gold accent (§07). |
| `Cheatline` | `horizon/Cheatline.tsx` | `animate?` | Saddle-over-Gold 2:1 paired bars; **max once per page** (§07/brand §08). |
| `Header` | `layout/Header.tsx` | — | Persistent; transparent over hero → `--fog-raised`+`--shadow-float`+hairline on scroll. Section parents are **link AND dropdown** (fixes orphaned `/charter`,`/company`). Reversed logo on dark → positive on solid. Sticky **Request a Quote**. |
| `MobileDrawer` | `layout/MobileDrawer.tsx` | — | Full-height Fog drawer, large Cormorant items, pinned Quote + **Call Now** at bottom. Fixed mobile Call action everywhere (24/7 promise). |
| `Footer` | `layout/Footer.tsx` | — | 4 cols (Charter/Services/Company/Resources) + contact block + accreditation row + legal. Abyss ground. Links to `/sitemap`. **Do not** recreate the 5 historical 404 links (design doc §02 IA fix log). |
| `FleetCard` | `fleet/FleetCard.tsx` | `aircraft: Aircraft` | 16:10 image, Gold category eyebrow, Cormorant name, 3 tabular specs (pax·range·speed), "View aircraft". Hover: img +4% brightness, Gold rule slides under name. Separation via `--line`, no shadow (§08). |
| `FleetGrid` / `CategoryFilter` | `fleet/…` | `aircraft: Aircraft[]`, `active` | Filter is **URL-driven** (`?category=`), active gets Gold underline + `aria-current`. Calm fade on filter, no layout jank. |
| `SpecTable` | `fleet/SpecTable.tsx` | `groups: SpecGroup[]` | 2-col key/value, Inter `tnum`, `--line` row dividers, groups Cabin/Performance/Range; stacks to definition-list on mobile. |
| `StatBlock` / `ProofBar` | `proof/…` | `value`, `label`, `underline?` | Big Cormorant `--t-h1` number, Inter label, optional Gold horizon underline. Lives on dark bands. |
| `AccreditationStrip` | `proof/AccreditationStrip.tsx` | `items` | ARGUS Gold, NBAA, NATA, ACSF, Wyvern on Fog, grayscale→color on hover, each links out. Dedicated band, never footer fine print. Assets exist in `public/images/Gold_argus_logos` / `LOGOS`. |
| `Field`/`Select`/`Textarea` | `forms/…` | standard + `error?` | `--fog-sunk` well, 1px `--line`, **visible label above** (never placeholder-only), focus `--focus` ring, error `--error`+message, success `--success` (§08/§18). |
| `QuoteForm`/`TripForm`/`ContactForm` | `forms/…` | — | Multi-step (route&dates → pax&prefs → contact) with **drawing-horizon progress line**, not a chunky stepper. One group per view on mobile; sticky summary desktop. Contact form routes by inquiry type (charter/management/maintenance). |

---

## 06 · Page build specs

Each page = an ordered stack of `SectionBand`s alternating tone (§03 rhythm). Rendering mode and data deps below; band-by-band content is in design doc §09–§15. One `<h1>` per page, ordered headings, landmarks (§18).

### Core 8

| Route | Render | Bands → components (design doc §) | Data |
|---|---|---|---|
| `/` Home | Server (+ client islands) | Hero(Petrol→Abyss, horizon draw, Primary+Secondary CTA) · ProofBar(Fog) · WhatWeDo(7/5 asymmetric) · BeyondCharter(Petrol) · Reach(Fog) · AccreditationStrip · CTA+Cheatline · Footer (§09) | static (`content/home.ts`, `proof.ts`, `accreditations.ts`) |
| `/charter` | Server | Hero(Petrol) · ThreeModes(Fog: direct/medical/wholesale, each w/ proof) · HowItWorks(Petrol, horizon steps) · FleetTeaser(3–4 cards) · Reach · CTA (§10) | static + **fleet teaser via `getFleet()`** |
| `/charter/fleet` | Server; client `CategoryFilter` | Hero(Petrol) · CategoryFilter(`?category=`) · FleetGrid(1→2→3) · Reassurance(Petrol) · Footer (§11) | `getFleet()` |
| `/charter/fleet/[id]` | Server, `generateStaticParams` | Hero(Petrol→Abyss, image bleed under panel — the one grid-break) · AtAGlance stat blocks · SpecTable · Gallery(crossfade) · Inline quote CTA (pre-fills category) (§11) | `getAircraft(id)` |
| `/management` | Server | Hero(Petrol) · Pitch(Fog 5/7 editorial) · TransparencyProof(Petrol, mock report/stats) · WhyCSM(Fog) · CTA (§12) | static (`content/management.ts`) |
| `/maintenance` | Server | Hero(Petrol, Part 145) · Services(Fog, AOG emphasized) · Standards(Petrol) · ContactForService CTA (§13) | static |
| `/company/about` | Server | Hero(Petrol) · Story(Fog 7/5, Cormorant pull-quotes) · ByTheNumbers(Petrol stats) · Standards+AccreditationStrip(Fog) · CTA (§14) | static (`content/about.ts`) |
| `/company/contact` | Server + client `ContactForm` | Hero(Petrol compact, 24/7) · ContactGrid(Fog asymmetric: form + direct channels) · Map(branded, not raw embed) · Footer (§15) | static |

### Lighter-touch (derive from system; minimal bespoke spec)

| Route | Render | Build note |
|---|---|---|
| `/charter/quote` | client form | Multi-step `QuoteForm`; accepts `?category=` prefill from fleet detail. Primary CTA target site-wide. |
| `/charter/trip` | client form | `TripForm` (carry old `TripRequest` field shape). Secondary CTA ("Plan a Trip"). |
| `/destinations` | Server | Typographic city grid from `content/destinations.ts`; links to detail. |
| `/destinations/[cityId]` | Server, static params | Port old `cityData.ts`; band layout, images under `public/images/PopularDestinations`. |
| `/customer-experience` | Server | Testimonials as **static content** (not the old API/admin). Calm quote layout. |
| `/faqs` | Server | Accordion from `content/faqs.ts`; keyboard-operable, `aria-expanded`. |
| `/privacy-policy` | Server | Long-form prose band, ~66ch measure. |
| `/sitemap` | Server | Human sitemap from `content/nav.ts`. Plus `sitemap.ts` + `robots.ts` metadata routes. |

CTA band + Footer repeat on every page; build once, reuse.

---

## 07 · Analytics, SEO, metadata

**Analytics (design doc §17 — resolve IDs before launch):** GTM `GTM-KJVF5RFH`, GA4 `G-2FC101FT90`, Google Ads `AW-364956149`. Single `<head>` injector (`next/script` `afterInteractive`) + GTM `<noscript>` in `<body>`; fire `page_view` on App-Router route change via a small client tracker. Keep `@vercel/analytics` + `speed-insights` (already installed). **Must-fix:** ensure no `G-XXXXXXXXXX` placeholder ships; confirm the three IDs are live properties before relaunch.

**SEO:** per-page `generateMetadata` (title/description/OG/Twitter/canonical), `metadataBase: https://www.csmaviation.com`, handle `@CSMAviation`. New brand hero as OG image. `sitemap.ts`/`robots.ts` (or `next-sitemap`). Structured data: `Organization` + `LocalBusiness` (NAP: `(888) I-FLY-CSM` / `tel:+18884359276`, `charter@csmaviation.com`, base) + `Service` schema for charter/management/maintenance.

**Performance budget:** LCP < 2.5s, CLS < 0.1, INP < 200ms (mid-tier mobile). Type-led hero → LCP is text. `next/image` AVIF/WebP, explicit dimensions, lazy below fold; fleet imagery prioritized (heaviest payload). Any future hero video: muted, `playsinline`, poster-first, never blocks LCP.

---

## 08 · Accessibility acceptance criteria (§18 — non-negotiable)

- Contrast AA for all body/interactive text; **Gold & Horizon never used as body text on Fog** (enforce in token usage / lint review).
- Visible `--focus` ring on every interactive element (2px, 2px offset), never removed.
- Full keyboard nav: dropdowns open/close without trapping, forms fully tabbable, skip-to-content link.
- `prefers-reduced-motion`: horizon draws become static, reveals become ≤120ms opacity fades — wired via `useReveal` + the global CSS guard.
- Semantics: one `<h1>`/page, ordered headings, `header`/`nav`/`main`/`footer` landmarks, visible form labels, `aria-current` on active nav + active fleet filter.
- Meaningful `alt` on all imagery; decorative horizon SVGs `aria-hidden`.
- ≥44px touch targets, especially mobile Call/Quote actions.

---

## 09 · Milestones (ticketable)

**M1 — Foundation (blocks all).** tokens.css + globals rewrite · tailwind token mapping · self-host fonts (variable TTF via `next/font/local`, §3.3) · `motion.ts` + `useReveal` · `Logo` component wired to `public/images/logos/` (§3.4). *Exit: a page renders in brand colors/fonts with the logo and a working horizon reveal.* **Assets already staged in public/ (§3.3–3.4).**

**M2 — Primitives & chrome.** Button · Eyebrow · Container · SectionBand · HorizonRule/Divider/Cheatline/ScrollProgress · Header (link+dropdown) · MobileDrawer · Footer. *Exit: nav actually navigates; `/charter` & `/company` reachable.*

**M3 — Data layer & fleet.** `lib/api/fleet.ts` + types + category normalization + ISR · FleetCard/Grid/CategoryFilter · SpecTable · `/charter/fleet` + `/charter/fleet/[id]` with `generateStaticParams`. *Exit: live fleet renders, filterable, detail pages static.*

**M4 — Proof & core content pages.** StatBlock/ProofBar/AccreditationStrip · Home · Charter · Management · Maintenance · About. *Exit: core 8 minus contact complete.*

**M5 — Forms & lighter-touch.** Field/Select/Textarea · Quote/Trip/Contact forms (horizon progress) · Contact page · destinations (+[cityId]) · customer-experience · faqs · privacy · sitemap. *Exit: all in-scope routes live.*

**M6 — Analytics, SEO, a11y, perf hardening.** Analytics injector + route page_view · metadata/structured data/sitemap/robots · a11y audit (§08) · perf budget verification. *Exit: launch-ready.*

---

## 10 · Open items to confirm before/during build

1. **Live fleet `category` values** — enumerate distinct values from `/api/fleet` to finalize `normalizeCategory()`.
2. **Analytics IDs** — confirm GA4 + Ads are live properties; eliminate any placeholder.
3. **API key handling** — move to server-only env (not `NEXT_PUBLIC_`).
4. **Content fill** — hero headlines, exact safety/years claims, About narrative, medical-charter proof, final destinations & FAQ list, testimonials copy (now static).
5. **Hero video** — does an owned high-quality cabin/exterior asset exist? (`public/videos/compressed` has candidates to review.) Default stays type-led.
6. **Logo SVG reference** — `docs/CSM-Aviation-SVG-Logo-Code.txt` is stale (literal `$(cat …)` placeholders, and the files it names have moved). The live master artwork is now in `public/images/logos/` (§3.4); treat that as canonical and fix/retire the txt.

> **Assets relocated (done):** brand fonts → `public/fonts/` (§3.3); logo SVGs → `public/images/logos/` (§3.4). `docs/` no longer holds `.ttf`/`.svg` build assets.

---

*Build spec v1.0 · derived from CSM-Aviation-Website-Redesign.md v1.0 + Brand Guidelines v1.0. Scope locked per §00.*

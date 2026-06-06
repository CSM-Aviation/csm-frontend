# CSM Aviation — Website Redesign Documentation

**Design system + key-page specifications for a full website rebuild**
Version 1.0 · May 2026 · Prepared for design + engineering handoff

---

## How to read this document

This is a build brief, not a finished design. It defines the **design language** (foundations, tokens, components, motion) and then applies it to a **core page set** (Home, Charter, Fleet, Management, Maintenance, About, Contact). It deliberately stops short of pixel-perfect comps for all 17 pages — the design system here is meant to make those derivable.

The existing CSM Aviation Brand Guidelines (v1.0) are treated as the **starting point**, extended where the web demands it. Where this document diverges from print-era brand rules, the divergence is flagged and justified. Nothing here breaks the logo, the core palette, or the typographic pairing — it builds a digital system on top of them.

Everything is new. No layout, copy, or component from the current csmaviation.com is carried forward.

---

## Contents

1. Strategy & Positioning
2. Information Architecture
3. Design Foundations — Color
4. Design Foundations — Typography
5. Design Foundations — Space, Grid & Layout
6. Design Foundations — Motion
7. Signature Elements — The Horizon System
8. Component Library
9. Page Specs — Home
10. Page Specs — Charter
11. Page Specs — Fleet (Overview + Detail)
12. Page Specs — Management
13. Page Specs — Maintenance
14. Page Specs — About
15. Page Specs — Contact
16. Content & Voice
17. Technical Conventions
18. Accessibility
19. Design Tokens — Reference

---

## 01 · Strategy & Positioning

### The problem with the current site

The live site reads as a generic charter template: a stock hero video, three undifferentiated service cards, a destinations grid, and a dense footer doing most of the navigational work. The current header is effectively broken — the entire desktop nav is commented out and only a mobile accordion renders, so section landing pages (`/charter`, `/company`) are orphaned and unreachable. The brand's actual character — *understated quality, a calm sense of command, a Central Valley operator with a perfect medical-transport safety record* — never surfaces.

### The redesign thesis

**Calm command.** CSM is not the loudest jet brand; it's the one you trust with an organ-transport flight at 3 a.m. The site should feel like the operator: precise, reassuring, quietly proud, never overselling. We translate that into restraint — generous negative space, slow confident motion, one decisive accent at a time — rather than the high-gloss, high-contrast theatrics typical of luxury charter sites.

### Positioning pillars (every page should ladder to at least one)

| Pillar | What it means | Where it lives |
|---|---|---|
| **Trust earned in the air** | Perfect safety record, ARGUS Gold, 10+ yrs medical transport | Home, About, proof bars |
| **Central Valley reach** | Positioned to serve all of CA + NV from one base | Home, Charter, Destinations |
| **The whole aircraft lifecycle** | Charter, management, and Part 145 maintenance under one roof | Home "Beyond Charter", Management, Maintenance |
| **Seamless from intake to wheels-down** | Constant communication, transparency every step | Charter, Customer Experience |

### Primary audiences & their job-to-be-done

1. **Charter clients** (retail + repeat) — "Get me a price/trip fast, and make me feel safe." → Quote and Trip CTAs always one click away.
2. **Aircraft owners** — "Is management cheaper and more transparent than what I have?" → Management page leads with cost-of-ownership + reporting.
3. **Brokers / wholesale** — "Are you responsive and verifiable?" → Accreditations, 24/7 responsiveness, direct contact.
4. **Medical / organ-transport partners** — "Proven, on-demand, zero-failure." → Dedicated medical-charter proof.

### Success signals

Qualified quote/trip requests, time-to-quote-CTA, management-inquiry submissions, and a header that actually navigates (the current one doesn't).

---

## 02 · Information Architecture

### Core page set (this document specs these)

```
/                          Home
/charter                   Charter — section landing (FIX: was orphaned)
/charter/fleet             Fleet overview (+ ?category= light|midsize|heavy|turboprop)
/charter/fleet/[id]        Fleet detail
/management                Aircraft Management
/maintenance               Maintenance (Part 145)
/company/about             About
/company/contact           Contact
```

### Retained but lighter-touch (derive from system, not specced here)

`/charter/quote`, `/charter/trip`, `/destinations`, `/destinations/[cityId]`, `/customer-experience`, `/faqs`, `/privacy-policy`, `/sitemap`.

### Navigation model (replaces the broken current nav)

The new header is a real, persistent navigation surface — not a mobile-only accordion. Section parents are **clickable links AND dropdown toggles**, which directly fixes the orphaned `/charter` and `/company` landing pages.

**Primary header:**

```
[CSM logo]   Charter ▾    Aircraft Management    Maintenance    Company ▾        [ Request a Quote ]
                ├ Charter Overview  (/charter)              ┌ About CSM (/company/about)
                ├ Our Fleet         (/charter/fleet)        └ Contact   (/company/contact)
                ├ Destinations      (/destinations)
                ├ Request a Quote   (/charter/quote)
                └ Plan a Trip       (/charter/trip)
```

- The **Request a Quote** button is the one persistent accent action, present on every page (sticky on scroll).
- A secondary, always-available **Call Now** appears on mobile as a fixed bottom action (the 24/7 promise should never be more than a tap away).
- "Charter" and "Company" labels link to their landing pages on click *and* reveal the dropdown on hover/focus. On touch, first tap opens the menu, the explicit "Overview" item navigates.

### Footer

Keep the footer comprehensive (it's a legitimate secondary nav for a site this broad) but restructure into four clear columns — Charter, Services, Company, Resources — plus a contact block (phone `(888) I-FLY-CSM`, `charter@csmaviation.com`, socials) and the accreditation row (ARGUS Gold, NBAA, NATA, ACSF, Wyvern). Accreditation logos get a dedicated, dignified strip — they are core trust currency, not afterthoughts.

> **IA fix log:** `/charter` and `/company` get real entry points (dropdown "Overview" links). `/sitemap` is linked from the footer. The five historical 404 footer links (`/charter/empty-legs`, `/services/sales`, `/services/consulting`, `/company/team`, `/safety`) are not recreated.

---

## 03 · Design Foundations — Color

The brand palette carries over intact. The web system **extends** it with the functional values a print guideline never needed: surface elevations, states, focus rings, and a documented dark/light strategy.

### Core palette (from brand guidelines, unchanged)

| Token | Name | HEX | Role |
|---|---|---|---|
| `--petrol` | Deep Petrol | `#0F2D3D` | Primary brand, dark sections, structure |
| `--fog` | Fog | `#F4F1EC` | Calm ground, default page background |
| `--saddle` | Saddle | `#704A35` | Warm structural accent, edge bars |
| `--gold` | Burnished Gold | `#A88B5C` | The single decisive accent |
| `--abyss` | Abyss | `#061821` | Deepest ground, footers, overlays |
| `--horizon` | Horizon | `#7A95B5` | Cool secondary, sky tints (non-text) |
| `--sand` | Bleached Sand | `#D4C4A8` | Warm neutral, subtle fills |

### Extended web values (new — needed for UI)

These are derived tints/shades of the core palette so the system stays in-family. They exist because screens need elevation, hover, and state feedback that a print palette doesn't specify.

| Token | HEX | Derivation / Role |
|---|---|---|
| `--petrol-900` | `#0A2230` | Petrol darkened — pressed states, deep panels |
| `--petrol-700` | `#0F2D3D` | = base Petrol |
| `--petrol-600` | `#1B3F52` | Petrol raised — cards on dark, hover |
| `--petrol-500` | `#2A5066` | Borders/dividers on dark |
| `--fog-raised` | `#FBF9F5` | Fog lifted — cards on light |
| `--fog-sunk` | `#ECE7DD` | Fog recessed — input wells, inset panels |
| `--line` | `#DAD3C6` | Hairline dividers on light |
| `--line-dark` | `#22455A` | Hairline dividers on dark |
| `--gold-hover` | `#B89A6A` | Gold lifted on hover |
| `--gold-press` | `#917648` | Gold pressed |
| `--ink` | `#0F2D3D` | Body text on light (= Petrol) |
| `--ink-soft` | `#3D5562` | Secondary text on light |
| `--ink-faint` | `#6E8290` | Tertiary / captions on light |
| `--paper-on-dark` | `#F4F1EC` | Body text on dark (= Fog) |
| `--paper-soft` | `#C4D0D8` | Secondary text on dark |
| `--focus` | `#7A95B5` | Focus ring (Horizon — high enough contrast on both grounds) |
| `--success` | `#4F7A5B` | Form success (muted, in-family green) |
| `--error` | `#A6493C` | Form error (muted terracotta, not fire-red) |

> **Extension note:** State colors are deliberately desaturated to stay within the brand's calm register. No bright system-red/green — those would shout, and the brand never shouts.

### The 70 / 25 / 5 ratio — extended to digital

The print ratio (70 Fog / 25 Petrol / 5 Gold) holds, but on the web we read it **per viewport, not per page.** The page alternates light (Fog-dominant) and dark (Petrol) bands; within any single screenful, Fog or Petrol dominates, the other provides structure, and Gold never exceeds ~5% — used only for the primary CTA, active states, one accent rule, or an italic accent word. Gold is never a background field.

### Light / dark band strategy

The site is **light-default** (Fog grounds) with intentional **dark Petrol bands** for emphasis and rhythm. Think of scrolling as moving along a horizon: light sky, then deep water, then sky again. A typical page alternates:

```
Hero (Petrol/Abyss) → Intro (Fog) → Proof (Petrol) → Services (Fog) → CTA (Petrol) → Footer (Abyss)
```

No section uses a same-color block on a same-color ground (mirrors the brand's "don't place a block on a same-color ground" rule).

---

## 04 · Design Foundations — Typography

Brand typefaces carry over: **Cormorant Garamond** (display) and **Inter** (working text). The web system formalizes a fluid type scale, line-length rules, and the one place we extend beyond the brand spec.

### Typefaces & loading

- **Cormorant Garamond** — display, headlines, accent italics. Variable 300–700. Self-host `woff2` (subset Latin) to control loading; `font-display: swap` with Fog-colored fallback metrics to avoid layout shift.
- **Inter** — body, UI, labels, data. Variable 100–900, optical sizing on. Self-host.
- **Inter (tabular)** — use Inter's `tnum` feature for any aligned numbers (fleet specs, phone, stats).

> **Extension note:** The brand pairs only these two faces and forbids a third. We honor that — *but* introduce **uppercase letterspaced Inter** as a distinct typographic *role* (the "eyebrow"), already sanctioned by the brand's label spec (0.22–0.28em). No new font is added.

### Fluid type scale

Sizes use `clamp()` so they scale between a 390px mobile floor and a 1440px desktop ceiling. Display sizes lean on Cormorant's elegance at large sizes only — never for body.

| Token | Role | Font | Size (clamp) | Tracking | Line-height |
|---|---|---|---|---|---|
| `--t-display` | Hero headline | Cormorant 500 | `clamp(2.75rem, 6vw, 5.5rem)` | −0.03em | 1.02 |
| `--t-h1` | Page title | Cormorant 500 | `clamp(2.25rem, 4vw, 3.75rem)` | −0.025em | 1.06 |
| `--t-h2` | Section head | Cormorant 600 | `clamp(1.75rem, 2.6vw, 2.5rem)` | −0.02em | 1.12 |
| `--t-h3` | Subsection | Cormorant 600 | `clamp(1.35rem, 1.8vw, 1.75rem)` | −0.015em | 1.2 |
| `--t-lead` | Intro paragraph | Inter 400 | `clamp(1.125rem, 1.4vw, 1.375rem)` | 0 | 1.55 |
| `--t-body` | Body copy | Inter 400 | `1rem` (16px floor) | 0 | 1.6 |
| `--t-small` | Captions, meta | Inter 400 | `0.875rem` | 0 | 1.5 |
| `--t-eyebrow` | Eyebrow/label | Inter 600 | `0.75rem` | 0.26em | 1.4, UPPERCASE |
| `--t-data` | Specs/numbers | Inter 500 `tnum` | `1rem`–`1.25rem` | 0 | 1.3 |

### Typographic rules

- **One display idea per view** (brand rule, preserved). The hero gets the big Cormorant moment; sections below use `--t-h2` and down.
- **Accent italics carry the single gold moment** — e.g. a headline where one italic word is set in `--gold`. Use sparingly, as the brand prescribes.
- **Body is always Inter.** Never set body in Cormorant.
- **Measure:** body line-length capped at ~66ch; lead paragraphs ~52ch.
- **Eyebrows** label sections — uppercase Inter SemiBold, letterspaced, often in Saddle or Gold.

---

## 05 · Design Foundations — Space, Grid & Layout

### Spacing scale (8px base, with a 4px half-step)

`--s-1: 4px · --s-2: 8px · --s-3: 12px · --s-4: 16px · --s-5: 24px · --s-6: 32px · --s-7: 48px · --s-8: 64px · --s-9: 96px · --s-10: 128px · --s-11: 192px`

Section vertical rhythm uses `--s-9` to `--s-11` (`clamp`-fluid). Generous whitespace is structural here — it *is* the luxury signal. Resist the urge to fill.

### Grid

- **12-column** fluid grid. Max content width `1280px`; full-bleed bands extend edge-to-edge with inner content constrained.
- Gutters: `--s-5` mobile → `--s-6` desktop.
- Page margins: `--s-5` mobile → `clamp(24px, 6vw, 120px)` desktop. The wide desktop margin is part of the calm.
- **Asymmetry is welcome.** Editorial layouts (e.g. About, Management) can run a 7/5 or 5/7 split rather than centered symmetry. Centered symmetry is reserved for the hero and CTA bands.

### Layout principles

- **Horizon as a layout axis.** The logo's horizon rule is echoed as a structural device: section dividers, the baseline of hero type, the line under which content "sits." More in §07.
- **Overlap sparingly.** A fleet image may bleed under a Petrol panel; a stat may overlap a band edge. One grid-break per page maximum — restraint, not chaos.
- **Radius:** `--r-sm: 2px · --r-md: 4px · --r-lg: 8px`. The brand is precise and architectural — corners are nearly square. No pill buttons, no big rounded cards.
- **Shadows:** minimal. The brand forbids logo effects; we extend that ethos to UI. Elevation is communicated by surface tint (`--fog-raised`, `--petrol-600`) and hairlines (`--line`), not drop shadows. One permitted soft shadow token for floating elements (sticky nav, modals): `--shadow-float: 0 8px 30px rgba(6,24,33,0.12)`.

---

## 06 · Design Foundations — Motion

Motion = **calm command.** Slow, confident, deliberate. Nothing bouncy, nothing fast, nothing that draws attention to itself. The horizon doesn't jitter.

### Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-calm` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Default — settles in, no overshoot |
| `--ease-horizon` | `cubic-bezier(0.65, 0, 0.35, 1)` | Long reveals (lines drawing, bands) |
| `--dur-fast` | `200ms` | Hover, focus, small UI |
| `--dur-base` | `360ms` | Most transitions |
| `--dur-slow` | `720ms` | Section reveals, hero |
| `--dur-line` | `1100ms` | The horizon-line draw signature |

### Patterns

- **Page load:** one orchestrated reveal. Hero type fades + rises 16px staggered (60ms between lines); the horizon rule *draws* left-to-right (`--dur-line`, `--ease-horizon`) as the signature entrance.
- **Scroll reveals:** content fades in + rises 24px, `--dur-slow`, triggered ~15% into viewport via `IntersectionObserver`. Stagger groups by 80ms. Never animate on every scroll — reveal once.
- **Hover:** CTAs lift via background shift (Gold → `--gold-hover`) and a 1px underline-draw, not scale-bounce. Fleet cards raise their image brightness ~4% and slide a thin Gold rule.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` — all transforms/draws become instant opacity fades ≤120ms. The horizon line appears drawn, not animating. This is non-negotiable.

---

## 07 · Signature Elements — The Horizon System

This is the **one thing someone remembers.** The CSM logo already contains a horizon rule beneath the monogram (a "quiet nod to flight, lending the mark its sense of calm, level balance"). We promote that line from logo detail to **site-wide structural motif.**

### The Horizon Rule

A single, fine, level line — the brand's own gesture — used as:

1. **The signature load animation** — draws across the hero on entry.
2. **Section dividers** — a hairline that subtly arcs (echoing the logo's curved baseline) rather than a flat `<hr>`. SVG, 1px, in `--line` / `--line-dark` / `--gold` depending on band.
3. **A typographic baseline** — hero and major headlines sit *on* a horizon, content "rises" from it.
4. **Scroll progress** — a thin Gold horizon line at the top of the viewport fills as the user scrolls (the single persistent Gold accent, ~3px).

### The Cheatline (extended from brand §08)

The brand's paired-bar cheatline (heavy Saddle over fine Gold, 2:1) becomes a **digital accent band** used at most once per page — typically separating a dark CTA band from the footer, or anchoring the hero edge. Rules from the brand hold: parallel to edge, never angled/tapered, never more than two bars, never crowding the logo. On web it may animate its draw once on reveal.

### Sky tints

`--horizon` (the cool blue) and gradients between `--petrol` → `--abyss` evoke altitude without literal sky photography clichés. Dark bands may carry a near-invisible vertical gradient (Petrol top → Abyss bottom) for atmospheric depth rather than flat fill.

> **Why this matters:** it gives the redesign a proprietary visual signature derived *from the brand's own logo* — not a borrowed trend. Every page feels unmistakably CSM without a single extra graphic asset.

---

## 08 · Component Library

Components are described by purpose, anatomy, states, and the tokens they consume. All meet the accessibility bar in §18.

### Buttons

| Variant | Use | Default | Hover | Focus |
|---|---|---|---|---|
| **Primary** | The quote/trip CTA | Gold bg, Petrol text | `--gold-hover` bg + underline draw | 2px `--focus` ring, 2px offset |
| **Secondary** | "Learn more", section CTAs | Transparent, 1px Petrol border, Petrol text | Petrol bg, Fog text | ring |
| **Ghost (on dark)** | CTAs on Petrol bands | Transparent, 1px Fog border, Fog text | Fog bg, Petrol text | ring |
| **Text/link** | Inline, footer | Underline-on-hover, Saddle/Gold | underline draws L→R | ring |

Buttons are near-square (`--r-md`), Inter 600, generous padding (`--s-4` × `--s-6`), no shadow, no gradient. Calm, architectural.

### Header / Nav

Persistent top bar; transparent over hero, gains `--fog-raised` bg + `--shadow-float` + hairline on scroll past hero. Dropdowns open on hover (desktop) / tap (touch) with a `--dur-base` fade. Logo: reversed (Fog) mark over dark hero, positive (Petrol) mark once header solidifies. Mobile: full-height Fog drawer, large Cormorant nav items, persistent Quote + Call actions pinned at the bottom.

### Section Band

The fundamental layout unit. Props: `tone` (light | dark | abyss), `width` (contained | bleed), optional eyebrow, heading, lead, and a top/bottom horizon divider. Alternating tones create the page rhythm (§03).

### Fleet Card

Image (16:10, Petrol-tinted on hover), category eyebrow (Gold), aircraft name (Cormorant `--t-h3`), three key specs in tabular Inter (pax · range · speed), and a text-link "View aircraft." On hover: image brightness +4%, a thin Gold horizon rule slides in under the name. No drop shadow — separation via `--line`.

### Spec Table

For fleet detail. Two-column key/value, Inter `tnum`, hairline `--line` row dividers, label in `--ink-soft`, value in `--ink`. Groups: Cabin, Performance, Range. Fully responsive → stacks to definition-list on mobile.

### Stat / Proof Block

Big Cormorant number (`--t-h1`), Inter label beneath, optional Gold horizon underline. Used for "10+ years medical transport," "Perfect safety record," "ARGUS Gold." Lives in dark bands for contrast.

### Accreditation Strip

Horizontal row of partner marks (ARGUS Gold, NBAA, NATA, ACSF, Wyvern) on Fog, evenly spaced, grayscale-to-color on hover, each linking out. Dedicated band — never crammed into footer fine print.

### Form Controls (Quote / Trip / Contact)

Inputs sit in `--fog-sunk` wells, 1px `--line` border, Petrol text, label always visible above (no placeholder-only labels). Focus: `--focus` ring + border. Error: `--error` border + message below. Success: `--success`. Multi-step quote uses a thin horizon progress line, not a chunky stepper.

### Forms — Quote/Trip pattern

A 2–3 step request flow (route & dates → passengers & preferences → contact). Progress shown as a drawing horizon line. Generous spacing; one question group visible at a time on mobile. Sticky summary on desktop.

### Cheatline Divider

The branded paired-bar element (§07), used once per page max as a deliberate transition.

### Footer

Four-column nav + contact block + accreditation row + legal line. Abyss ground, Fog text, hairline `--line-dark` dividers, Gold used only on hover links.

---

## 09 · Page Spec — Home

**Goal:** establish calm command, route the four audiences quickly, surface trust proof early.

**Band sequence:**

1. **Hero — Petrol→Abyss gradient.** Reversed CSM mark in header. Cormorant `--t-display` headline expressing calm command (not "luxury jets" — something quieter and more confident, e.g. a line about being trusted with what matters). One italic Gold accent word. The **horizon rule draws** across on load. Single Primary CTA (Request a Quote) + Secondary (Plan a Trip). A restrained ambient element: slow vertical Petrol→Abyss gradient, optional very subtle grain. **Hero media decision: start type-led, no video.** A still or extremely subtle motion (slow parallax of a single horizon line) outperforms a busy stock video for *this* brand's calm register. *Switch to a short, muted, looping cabin/exterior video only if a high-quality owned asset exists* — never stock. Hook left in the component for it.
2. **Proof bar — Fog.** Three or four stat/proof blocks: perfect safety record · ARGUS Gold · 10+ yrs medical transport · 24/7. Tabular numbers. This is the trust down-payment, placed high.
3. **What we do — Fog→ light, asymmetric.** Three offers, but *not* three identical cards. A 7/5 editorial layout: Charter (lead, largest), then Management and Maintenance as supporting entries. Each links to its page. Replaces the current site's flat, undifferentiated trio.
4. **Beyond Charter — Petrol band.** Owner/operator story: the full-lifecycle pitch (charter + management + Part 145 under one roof). Two routes out: Management, Maintenance. Stat or two in Gold.
5. **Reach — Fog.** Central Valley positioning + popular destinations as a clean, typographic list/grid (Miami, NYC, LA, Las Vegas, +). Links to `/destinations`. Map treatment optional and subtle, not a gimmick.
6. **Accreditation strip — Fog.**
7. **CTA band — Petrol, with cheatline divider into footer.** "Speak to our team / Request a quote." Primary + Call Now.
8. **Footer — Abyss.**

---

## 10 · Page Spec — Charter (`/charter`)

**Goal:** the section landing the old site never let users reach. Orient all charter audiences and route them.

**Bands:**

1. **Hero — Petrol.** `--t-h1` "Charter" with a lead on the charter promise (intake → wheels-down, transparency throughout). Quote + Trip CTAs.
2. **The three charter modes — Fog.** Direct Charter to Public · Medical / Organ-Transport Charter · Wholesale / Broker. Each gets a real block with its own proof point (esp. medical: perfect safety record, 10+ yrs). These are CSM's actual differentiators — give them dignity, not stock-photo cards.
3. **How it works — Petrol.** 3–4 step horizon-line process (request → tailored options → confirm → fly), reinforcing "constant communication."
4. **Fleet teaser — Fog.** 3–4 fleet cards → link to `/charter/fleet`.
5. **Reach + destinations — Fog.**
6. **CTA band + footer.**

---

## 11 · Page Spec — Fleet

### Overview (`/charter/fleet`, `?category=`)

1. **Hero — Petrol.** "Our Fleet," lead on matching the aircraft to the trip.
2. **Category filter — Fog.** Light · Midsize · Heavy · Turboprop as a horizontal, URL-driven filter (`?category=`). Active category gets the Gold underline. Filtering animates cards with a calm fade, no layout jank.
3. **Fleet grid — Fog.** Fleet cards (§08), responsive 1→2→3 columns. Each links to detail.
4. **Reassurance band — Petrol.** Safety/standards note. CTA.
5. **Footer.**

### Detail (`/charter/fleet/[id]`)

1. **Hero — Petrol→Abyss.** Aircraft name (Cormorant), category eyebrow, hero image bleeding under a Petrol panel (the one permitted grid-break/overlap).
2. **At a glance — Fog.** Key specs as stat blocks (passengers, range, speed, cabin height).
3. **Full specs — Fog.** Spec table (§08): Cabin / Performance / Range.
4. **Gallery — Fog or Petrol.** Restrained, large imagery; calm crossfade, no carousels-with-dots clutter.
5. **Inline quote CTA — Petrol.** "Request this aircraft" pre-fills category in the quote flow.
6. **Footer.**

---

## 12 · Page Spec — Management

**Goal:** convert aircraft owners. Lead with money + transparency, the two things owners actually weigh.

**Bands:**

1. **Hero — Petrol.** Headline on lowering cost of ownership without lowering standards. CTA: "Talk to our team."
2. **The pitch — Fog, asymmetric 5/7.** On-demand flight department · lower cost of ownership · transparent monthly reporting · maintenance program. Editorial layout, not a card grid — owners read this carefully.
3. **Transparency proof — Petrol.** A representation of the "transparent monthly reporting" promise — a tasteful mock report excerpt or stat blocks. Show, don't just claim.
4. **Why CSM — Fog.** Ties to safety record + Part 145 in-house maintenance (lifecycle advantage).
5. **CTA band + footer.**

---

## 13 · Page Spec — Maintenance

**Goal:** establish Part 145 credibility for owners and third parties.

**Bands:**

1. **Hero — Petrol.** "FAA Certified Part 145 Repair Station." Credential leads.
2. **Services — Fog.** MRO services · aircraft engine repair · AOG services · aircraft parts. Clear, scannable, each with a one-line explainer. AOG (aircraft-on-ground) gets emphasis — it's the urgent, high-trust service.
3. **Standards / certifications — Petrol.** Part 145 + accreditation tie-in. Stat/proof blocks.
4. **Contact for service — Fog/Petrol CTA.** Direct line for AOG urgency.
5. **Footer.**

---

## 14 · Page Spec — About (`/company/about`)

**Goal:** the trust narrative. This is where "calm command" is told, not just implied.

**Bands:**

1. **Hero — Petrol.** A quiet, confident statement of who CSM is (Central Valley operator, trusted with what matters).
2. **Story — Fog, editorial 7/5.** Cormorant pull-quotes, Inter body, generous measure (~66ch). The voice from §16 lives here most fully. No corporate filler.
3. **By the numbers — Petrol.** Stat blocks: years operating, medical-transport record, accreditations held, reach.
4. **Standards & accreditations — Fog.** Accreditation strip with context (what ARGUS Gold / Wyvern actually mean — most visitors don't know).
5. **CTA band + footer.**

---

## 15 · Page Spec — Contact (`/company/contact`)

**Goal:** make reaching CSM effortless across every channel; honor the 24/7 promise.

**Bands:**

1. **Hero — Petrol, compact.** "Speak with us" + the 24/7 line.
2. **Contact grid — Fog, asymmetric.** Left: a short contact form (name, email, phone, message, inquiry type → routes to charter/management/maintenance). Right: direct channels — phone `(888) I-FLY-CSM` (tap-to-call, prominent), `charter@csmaviation.com`, socials, base location. Form uses §08 controls; success state in `--success`.
3. **Map / location — Fog.** Subtle, branded (Petrol/Fog styled), not a raw Google embed dropped in.
4. **Footer.**

---

## 16 · Content & Voice

### Voice (carried from brand, operationalized for web)

Refined and considered; plain-spoken; never overselling. The tone of a trusted operator — *precise, reassuring, quietly proud.* Safety and seamlessness lead. On the web specifically:

- **Lead with the reassurance, then the detail.** Headlines state the calm promise; body delivers proof.
- **Short sentences. Concrete nouns.** "Perfect safety record. Ten years. Organ-transport flights." beats adjective stacks.
- **No exclamation marks. No "world-class," "premier," "unparalleled."** The brand earns trust by understatement.
- **One accent moment per page** mirrors the one-Gold-accent rule — a single italic Cormorant phrase that carries the emotional beat.

### Microcopy

- Primary CTA: **"Request a Quote"** (consistent everywhere). Secondary: **"Plan a Trip."**
- Empty/loading/error states stay in-voice: calm, brief, never cute.
- Phone always rendered `(888) I-FLY-CSM` with `tel:+18884359276`.

### Do / Don't

| Do | Don't |
|---|---|
| State the safety record plainly, early | Bury accreditations in the footer |
| Differentiate medical / wholesale / retail charter | Three identical service cards |
| Let whitespace and one accent carry premium | Gloss it up with gradients + shadows |
| Write like a trusted operator | Write like a luxury-lifestyle brochure |

---

## 17 · Technical Conventions

### Stack

- **Next.js (App Router) + TypeScript** — continue the existing framework; it suits the static-leaning, SEO-sensitive content.
- **Styling:** CSS variables (tokens in §19) + a utility layer (Tailwind configured *to the tokens*, or CSS Modules). The token file is the single source of truth — no hard-coded hex anywhere in components.
- **Server Components by default;** client components only for interactive bits (nav dropdowns, filters, forms, scroll-reveal observer).
- **Images:** `next/image`, AVIF/WebP, explicit dimensions to prevent CLS, lazy below the fold. Fleet imagery is the heaviest payload — prioritize.
- **Fonts:** self-hosted via `next/font` (Cormorant + Inter), subset, `display: swap`, preloaded for the hero.

### Performance budget

- LCP < 2.5s, CLS < 0.1, INP < 200ms on mid-tier mobile.
- Hero: if type-led (recommended), LCP is text → trivially fast. If video is later added, it must be muted, `playsinline`, poster-first, and never block LCP.
- Total JS for a content page kept lean — most of this site is static content; resist SPA-heaviness.

### SEO

- Carry over the solid metadata baseline (per-page `title`, `description`, OG/Twitter, canonical, `metadataBase: https://www.csmaviation.com`, `@CSMAviation`). Replace the OG image with the new brand hero.
- `next-sitemap` for `sitemap.xml` + `robots.txt`.
- Structured data: `Organization` + `LocalBusiness` (NAP: phone, email, base), and `Service` schema for charter/management/maintenance.

### Analytics (from archive notes — resolve before launch)

- Re-implement GTM `GTM-KJVF5RFH`, GA4 `G-2FC101FT90`, Google Ads `AW-364956149` in a single `<head>` injector + GTM `<noscript>` in `<body>`; fire `page_view` on route change. Keep Ahrefs + Vercel Analytics/Speed Insights.
- **Must-fix:** remove the placeholder GA4 ID `G-XXXXXXXXXX`; confirm GA4 + Ads IDs are the live properties before relaunch.

### Code conventions

- Tokens → `styles/tokens.css` (§19), imported once.
- Components colocated; one component per file; named exports.
- No magic numbers — spacing/size/color always via tokens.
- Motion centralized in a small `motion.ts` (durations/eases) + a `useReveal` hook wrapping `IntersectionObserver` with the reduced-motion guard built in.

---

## 18 · Accessibility

Non-negotiable. The brand's "calm" must include calm for every user.

- **Contrast:** Fog-on-Petrol and Petrol-on-Fog clear WCAG AA for body (per brand). Gold and Horizon are **display/accent only — never body text on Fog** (brand rule, enforced in tokens). All interactive text meets AA (4.5:1) min.
- **Focus:** visible `--focus` ring on every interactive element, 2px, 2px offset; never removed.
- **Keyboard:** full nav operability, dropdowns open/close + trap nothing, forms fully tabbable, skip-to-content link.
- **Motion:** `prefers-reduced-motion` honored everywhere (§06) — horizon draws become static, reveals become instant fades.
- **Semantics:** one `<h1>` per page, ordered headings, landmarks (`header`/`nav`/`main`/`footer`), labelled forms (visible labels, not placeholder-only), `aria-current` on active nav/filter.
- **Media:** all images meaningful `alt`; decorative horizon SVGs `aria-hidden`. Any future video: muted, controls reachable, no autoplay sound.
- **Targets:** ≥44px touch targets; the mobile Call/Quote actions especially.

---

## 19 · Design Tokens — Reference

```css
:root {
  /* ── Color · core (brand) ── */
  --petrol:   #0F2D3D;
  --fog:      #F4F1EC;
  --saddle:   #704A35;
  --gold:     #A88B5C;
  --abyss:    #061821;
  --horizon:  #7A95B5;
  --sand:     #D4C4A8;

  /* ── Color · extended (web) ── */
  --petrol-900: #0A2230;
  --petrol-700: #0F2D3D;
  --petrol-600: #1B3F52;
  --petrol-500: #2A5066;
  --fog-raised: #FBF9F5;
  --fog-sunk:   #ECE7DD;
  --line:       #DAD3C6;
  --line-dark:  #22455A;
  --gold-hover: #B89A6A;
  --gold-press: #917648;

  /* ── Color · text ── */
  --ink:           #0F2D3D;
  --ink-soft:      #3D5562;
  --ink-faint:     #6E8290;
  --paper-on-dark: #F4F1EC;
  --paper-soft:    #C4D0D8;

  /* ── Color · state ── */
  --focus:   #7A95B5;
  --success: #4F7A5B;
  --error:   #A6493C;

  /* ── Type · families ── */
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body:    "Inter", system-ui, sans-serif;

  /* ── Type · scale (fluid) ── */
  --t-display: clamp(2.75rem, 6vw, 5.5rem);
  --t-h1:      clamp(2.25rem, 4vw, 3.75rem);
  --t-h2:      clamp(1.75rem, 2.6vw, 2.5rem);
  --t-h3:      clamp(1.35rem, 1.8vw, 1.75rem);
  --t-lead:    clamp(1.125rem, 1.4vw, 1.375rem);
  --t-body:    1rem;
  --t-small:   0.875rem;
  --t-eyebrow: 0.75rem;

  /* ── Type · tracking ── */
  --track-display: -0.03em;
  --track-h1:      -0.025em;
  --track-eyebrow: 0.26em;

  /* ── Space (8px base) ── */
  --s-1: 4px;   --s-2: 8px;   --s-3: 12px;  --s-4: 16px;
  --s-5: 24px;  --s-6: 32px;  --s-7: 48px;  --s-8: 64px;
  --s-9: 96px;  --s-10: 128px; --s-11: 192px;

  /* ── Radius ── */
  --r-sm: 2px; --r-md: 4px; --r-lg: 8px;

  /* ── Layout ── */
  --content-max: 1280px;
  --measure-body: 66ch;
  --measure-lead: 52ch;
  --page-margin: clamp(24px, 6vw, 120px);

  /* ── Elevation ── */
  --shadow-float: 0 8px 30px rgba(6, 24, 33, 0.12);

  /* ── Motion ── */
  --ease-calm:    cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-horizon: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 200ms;
  --dur-base: 360ms;
  --dur-slow: 720ms;
  --dur-line: 1100ms;
}
```

### Core rules carried from brand (quick reference)

| Rule | Value |
|---|---|
| Color ratio | 70 Fog / 25 Petrol / 5 Gold (per viewport on web) |
| Accent | One decisive Gold moment per view |
| Logo clear space | 1× cap-height of the C |
| Logo min size (screen) | 90px (monogram-only allowed for favicons/app marks) |
| Typefaces | Cormorant Garamond (display) · Inter (working text) — no third face |
| Display tracking | −0.025 to −0.03em |
| Label tracking | 0.22–0.28em, uppercase |
| Cheatline | Saddle over Gold, 2:1, parallel, ≤2 bars, never crowd the logo |

---

*CSM Aviation — Website Redesign Documentation · Version 1.0 · May 2026. Built on Brand Guidelines v1.0; digital extensions flagged inline.*

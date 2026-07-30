# dhamecourt.com — Redesign Plan

**Goal:** Transform dhamecourt.com into a site that uses the desktop layout and design
language of [superwhisper.com](https://superwhisper.com), applied to its current purpose:
Ronald d'Hamecourt's personal resume/landing page.

> **Note on the reference:** the sandbox this plan was written in cannot reach
> superwhisper.com (network policy), so the description of the reference design below is
> based on prior knowledge of the site rather than a live capture. Before or during
> implementation, a few desktop screenshots of superwhisper.com should be compared against
> the result to fine-tune spacing, colors, and typography.

---

## 1. The reference design language (superwhisper.com)

What makes that site feel the way it does:

| Element | Reference treatment |
|---|---|
| Theme | Dark, near-black page background; light text; monochrome palette with muted grays and a single restrained accent |
| Navigation | Slim sticky top bar: wordmark left, a few links, one prominent CTA button right; translucent/blurred background on scroll |
| Hero | Vertically centered, **center-aligned** large headline with tight letter-spacing; short muted sub-headline; one primary CTA; product visual below in a rounded, subtly bordered frame |
| Sections | Single column, stacked, generous vertical whitespace (~120–160px between sections), content constrained to a max-width container (~1100–1200px) |
| Cards | Feature content in a grid of rounded-corner cards, background slightly lighter than the page, 1px low-opacity white border, soft hover states |
| Typography | Clean geometric/neo-grotesque sans (Inter or similar); very large hero sizes (56–80px desktop), negative tracking on headings; body text in muted gray |
| Motion | Subtle: fade/slide-in on scroll, smooth hover transitions — never flashy |
| Footer | Minimal, small muted links, generous padding |

## 2. Current state of this repo

- Angular 21 standalone single-component app (`AppComponent`), no routes.
- One screen: light theme, left/right split (intro + CV download | LinkedIn/GitHub pills),
  gradient divider — largely the Angular starter template restyled.
- Bootstrap 5 is a dependency but only used for the download button classes.
- Global `styles.scss` is empty; all styling lives in `app.component.scss`.
- Assets: `resume.pdf`, favicon. No images of Ronald or work samples.

## 3. Target page structure

One page (no routing needed), top to bottom:

1. **Sticky nav** — "Ronald d'Hamecourt" wordmark left; links to page sections
   (About, Experience, Contact); "Download CV" button right (the site's primary CTA,
   styled like superwhisper's Download button). Transparent at top, blurred dark
   background once scrolled.
2. **Hero** — centered: large headline (e.g. name or a one-line positioning statement),
   muted sub-headline, primary "Download CV" button + secondary "LinkedIn" ghost button.
   Optional framed visual below (portrait or a stylized card) to mirror the product-shot slot.
3. **About / highlights** — a grid of 3–4 rounded cards (e.g. profile summary, key skills,
   languages/tools, notable accomplishments) in the reference card style.
4. **Experience** — condensed timeline or card list of roles pulled from the CV, each with
   period, title, and one-liner. Keeps the page useful even without downloading the PDF.
5. **Contact / links** — centered closing section: short line, LinkedIn + GitHub +
   Download CV, restyled from the current "pills" into the reference's button language.
6. **Footer** — minimal: © year, small muted links.

Sections 3 and 4 depend on content from `resume.pdf`; if that content shouldn't be on the
web page, they collapse into a single smaller highlights section and the page stays a
polished landing page.

## 4. Implementation phases

### Phase 1 — Design foundation
- Move design tokens to global `styles.scss` as CSS custom properties:
  `--bg` (near-black ≈ `#0b0b0c`), `--surface` (card ≈ `#151517`), `--border`
  (`rgba(255,255,255,.08)`), `--text` (`#f5f5f5`), `--text-muted` (`#9b9b9f`), one accent,
  spacing scale, radius scale (12–20px), max-width container.
- Load Inter (self-hosted or system-stack fallback) with tight heading tracking presets.
- Set dark `color-scheme`, page background, base typography, smooth scrolling.
- **Remove Bootstrap** (only the button uses it; it fights this aesthetic) — drop the
  dependency and replace with our own button styles: primary (light button on dark) and
  ghost (bordered transparent) variants.

### Phase 2 — Layout shell
- New standalone components: `NavbarComponent`, `FooterComponent`.
- Sticky nav with scroll-triggered translucent/blur background; anchor links with
  `scroll-behavior: smooth` and `scroll-margin-top` on sections.
- `AppComponent` becomes the section stack inside the shell.

### Phase 3 — Sections
- `HeroComponent`: centered layout, display-size headline, sub-headline, CTA pair.
- `HighlightsComponent`: card grid (CSS grid, `auto-fit/minmax`), hover lift + border glow.
- `ExperienceComponent`: role list/timeline (content extracted from the CV).
- `ContactComponent` + footer wiring.
- Keep everything data-driven with small typed arrays in the components (like the current
  pills loop) so content edits don't touch markup.

### Phase 4 — Motion & responsive polish
- Scroll-reveal (IntersectionObserver adding a `.visible` class; CSS transitions), honoring
  `prefers-reduced-motion`.
- Responsive pass: the reference is desktop-first but degrades to a stacked single column;
  cards go 3 → 2 → 1 columns; nav links collapse (simple menu or hide non-essential links)
  under ~700px.
- Hover/focus states, `:focus-visible` rings, color-contrast check on muted grays.

### Phase 5 — Meta & verification
- `index.html`: real `<title>` ("Ronald d'Hamecourt"), meta description, Open Graph tags,
  dark `theme-color`.
- Update the trivial `app.component.spec.ts` for the new structure.
- `ng build` clean; manual check at 1440/1024/375 widths; Lighthouse sanity pass
  (performance/accessibility).
- Compare against superwhisper.com desktop screenshots and adjust spacing/typography.

## 5. Decisions to confirm

1. **Page content depth** — full Experience section sourced from the CV on the page, or
   keep it minimal (hero + highlights + contact)?
2. **Hero headline** — name only, or a positioning line (e.g. role/specialty)?
3. **Hero visual** — portrait photo, stylized card, or none (pure typographic hero)?
4. **Bootstrap removal** — plan assumes yes; flag if it's needed for something upcoming.

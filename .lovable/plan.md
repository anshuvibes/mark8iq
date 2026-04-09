

# Full Site Refactor — dangerouslySetInnerHTML to React Components

## Scope

12 files to refactor (HomePage already done):

| File | Size | Complexity |
|------|------|------------|
| **ProductAdsPage.tsx** | 108KB | High — 21 component types |
| **ProductSightPage.tsx** | 106KB | High — identical structure to Ads |
| **ProductRecoPage.tsx** | 103KB | High — identical structure |
| **ProductShelfPage.tsx** | 100KB | High — identical structure |
| **ProductReturnsPage.tsx** | 94KB | High — identical structure |
| **Footer.tsx** | 63KB | Medium — single large block |
| **WhyUsPage.tsx** | 50KB | Medium — 9 component types |
| **AboutPage.tsx** | 50KB | Medium — 8 component types |
| **SuccessStoriesPage.tsx** | 27KB | Medium — 11 component types |
| **PricingPage.tsx** | 13KB | Medium — interactive tabs/slider |
| **Navbar.tsx** | 8KB | Low — already has JS logic |
| **ContactPage.tsx** | 5KB | Low — form + map |

**Total: ~780KB of HTML strings to convert to JSX.**

---

## Architecture: Shared Component Library

All 5 product pages share an identical structure with the same 21 component types. Instead of writing 5 separate pages, we build a shared component library and feed each page different data.

### Shared Components (used across 2+ pages)

```text
src/components/shared/
  GradientCircle.tsx        — 9 pages
  SectionTitle.tsx          — 8 pages
  ClipCard.tsx              — 8 pages
  InnerBanner.tsx           — 2 pages (About, WhyUs)
  ImgTitleDescription.tsx   — 2 pages (About, WhyUs)

src/components/product/
  ProductInsideBanner.tsx   — all 5 product pages
  ProductInsideBuiltFor.tsx — feature cards grid
  ProductInsideInsights.tsx — insights cards
  ProductVideoCard.tsx      — video card
  ProductCard.tsx           — cross-sell cards
  ProductOtherProducts.tsx  — other products section
  ProductPricing.tsx        — pricing calculator
  MarketPricing.tsx         — marketplace selector
  MarketPlaceItem.tsx       — marketplace logo item
  MarketDiscount.tsx        — discount/pricing summary
  CustomImageAccordion.tsx  — image accordion
  CustomAccordion.tsx       — FAQ section
  FeatureCard.tsx           — feature cards
  InsightsCard.tsx          — insight cards
  IconButton.tsx            — icon buttons
```

### Page-Specific Components

```text
src/components/about/      — AboutJourney
src/components/pricing/    — PricingPlanTab
src/components/success/    — SuccessStoriesBanner, Card, Wrapper
src/components/contact/    — ContactForm, ContactDetails
```

---

## Execution Plan (6 phases)

### Phase 1: Shared primitives
Build `GradientCircle`, `SectionTitle`, `ClipCard`, `InnerBanner`, `ImgTitleDescription` — small, stateless components used by almost every page.

### Phase 2: Product page component library + ProductAdsPage
Build all 15 product-specific shared components. Refactor **ProductAdsPage** as the template. Once verified, the other 4 become data-only rewrites.

### Phase 3: Remaining product pages
Apply the template to Sight, Shelf, Reco, Returns. Each page becomes a thin file passing page-specific data (titles, images, colors) to the shared product layout.

### Phase 4: About, WhyUs, SuccessStories
Refactor using shared primitives from Phase 1 plus page-specific components.

### Phase 5: Pricing, Contact
Pricing: interactive tabs and range slider need React state. Contact: form with React state for inputs.

### Phase 6: Navbar and Footer
Convert Navbar DOM manipulation to React state. Break 63KB Footer into sub-components. These go last since they affect every page.

---

## Potential Problems and Mitigations

1. **CSS class mismatch** — If JSX nesting differs from original HTML, mark8iq.css selectors won't match. Mitigation: Extract exact HTML structure before writing JSX, verify visually.

2. **Interactive state migration** — Pricing slider/tabs are currently static HTML. Must implement actual interaction logic in React. Mitigation: Reverse-engineer behavior from HTML data.

3. **Product page data extraction** — ~100KB per page. Mitigation: Use scripts to extract content programmatically.

4. **Footer complexity** — 63KB with newsletter forms, link columns, social icons. Mitigation: Break into sub-components.

5. **Navbar state** — Currently uses classList toggling. Must preserve desktop hover + mobile click. Mitigation: onMouseEnter/onMouseLeave for desktop, onClick for mobile with breakpoint check.

6. **Bundle size** — Content moves from strings to JSX (same size). Route-based lazy loading can optimize later if needed.

---

## What This Achieves

- Eliminates all `dangerouslySetInnerHTML` from the codebase
- Removes `useNavigateLinks` hook — React Router `<Link>` handles navigation
- Creates a reusable component library for the upcoming redesign
- Enables React state for all interactive elements
- Reduces tech debt to near-zero before the redesign phase


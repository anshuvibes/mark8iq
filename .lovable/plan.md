
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

The key insight is that **all 5 product pages share an identical structure** with the same 21 component types. Instead of writing 5 separate pages, we build a shared component library and feed each page different data.

### Shared Components (used across 2+ pages)

```text
src/components/shared/
  GradientCircle.tsx        — used in 9 pages
  SectionTitle.tsx          — used in 8 pages
  ClipCard.tsx              — used in 8 pages
  InnerBanner.tsx           — used in 2 pages (About, WhyUs)
  ImgTitleDescription.tsx   — used in 2 pages (About, WhyUs)

src/components/product/
  ProductInsideBanner.tsx   — used in all 5 product pages
  ProductInsideBuiltFor.tsx — 5 pages (feature cards grid)
  ProductInsideInsights.tsx — 5 pages (insights cards)
  ProductVideoCard.tsx      — 5 pages
  ProductCard.tsx           — 6 pages (cross-sell cards)
  ProductOtherProducts.tsx  — 5 pages
  ProductPricing.tsx        — 6 pages (pricing calculator)
  MarketPricing.tsx         — 6 pages (marketplace selector)
  MarketPlaceItem.tsx       — 6 pages
  MarketDiscount.tsx        — 6 pages
  CustomImageAccordion.tsx  — 5 pages (image accordion)
  CustomAccordion.tsx       — 5 pages (FAQ section)
  FeatureCard.tsx           — 5 pages
  InsightsCard.tsx          — 5 pages
  IconButton.tsx            — 6 pages
```

### Page-Specific Components

```text
src/components/about/
  AboutJourney.tsx

src/components/pricing/
  PricingPlanTab.tsx

src/components/success/
  SuccessStoriesBanner.tsx
  SuccessStoriesCard.tsx
  SuccessStoriesWrapper.tsx

src/components/contact/
  ContactForm.tsx
  ContactDetails.tsx
```

---

## Execution Plan (6 phases)

### Phase 1: Shared primitives
Build the 5 shared components used everywhere: `GradientCircle`, `SectionTitle`, `ClipCard`, `InnerBanner`, `ImgTitleDescription`. These are small, stateless, and used by almost every page.

### Phase 2: Product page component library
Build the 15 product-specific shared components. Then refactor **one product page** (ProductAdsPage) as the template. Once verified, the other 4 product pages become data-only rewrites — same components, different props (titles, descriptions, images, colors).

### Phase 3: Remaining product pages
Apply the template to ProductSight, ProductShelf, ProductReco, ProductReturns. Each page becomes a thin file that passes page-specific data to the shared product layout.

### Phase 4: About, WhyUs, SuccessStories
Refactor these 3 medium-complexity pages using the shared primitives from Phase 1 plus their page-specific components.

### Phase 5: Pricing, Contact
Refactor these 2 pages. Pricing has interactive tabs and a range slider — these need React state. Contact has a form that needs React state for inputs.

### Phase 6: Navbar and Footer
Refactor the global Navbar (already has JS logic via useEffect — convert to React state) and Footer (large but static). These affect every page, so they go last to minimize risk.

---

## Potential Problems and Mitigations

1. **CSS class mismatch**: If JSX nesting differs from the original HTML, mark8iq.css selectors may not match. **Mitigation**: Extract exact HTML structure from each page before writing JSX. Verify each section visually after conversion.

2. **Interactive state migration**: The Pricing page slider, tab switching, and marketplace selection are currently non-functional HTML. Converting to React state means we need to implement the actual interaction logic. **Mitigation**: Build state management carefully; the pricing calculator logic needs to be reverse-engineered from the HTML data attributes.

3. **Product page data extraction**: Each product page has ~100KB of content. Extracting all text, images, and SVGs accurately is error-prone. **Mitigation**: Use scripts to extract content programmatically, not manually.

4. **Footer complexity**: At 63KB, the Footer contains newsletter forms, multiple link columns, and social media icons. **Mitigation**: Break into sub-components (FooterLinks, FooterNewsletter, FooterSocial, FooterBottom).

5. **Navbar hover/click state**: Currently uses DOM classList toggling. Converting to React state must preserve both desktop hover and mobile click behavior. **Mitigation**: Use onMouseEnter/onMouseLeave for desktop, onClick for mobile, with a breakpoint check.

6. **Bundle size**: Moving 780KB of HTML strings into JSX components could increase the JS bundle. **Mitigation**: The content is the same — it just moves from string literals to JSX. Tree-shaking and code-splitting via route-based lazy loading can mitigate this if needed later.

---

## What This Achieves

- Eliminates all `dangerouslySetInnerHTML` from the codebase (except DesignSystem legacy examples)
- Removes `useNavigateLinks` hook entirely — React Router `<Link>` handles navigation
- Creates a reusable component library that makes future redesign work trivial
- Enables React state for all interactive elements (pricing calculator, forms, accordions)
- Makes every piece of content editable as JSX props
- Reduces tech debt to near-zero before the redesign phase begins

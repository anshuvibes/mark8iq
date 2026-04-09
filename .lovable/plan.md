

# Homepage Full Rewrite — From dangerouslySetInnerHTML to React Components

## Overview

Replace the current `HomePage.tsx` (which fetches a 92KB HTML blob and injects it via `dangerouslySetInnerHTML`) with a fully componentized React page using the new design system. The page will still use the existing `mark8iq.css` class names for styling (since those styles are already loaded and working), but all content will be proper JSX with React state management for interactivity.

## Architecture Decision

The refactored page will use **legacy CSS class names from mark8iq.css** for layout and styling (they already work and are pixel-perfect). The key change is structural: replacing a raw HTML string with a component tree. This means:
- All section titles, descriptions, images, links use JSX
- Accordions and interactive elements use React state (not DOM manipulation)
- The marquee animation uses CSS keyframes (already in index.css)
- No new CSS needs to be written for layout — mark8iq.css handles it

## Sections to Build (9 total)

| # | Section | Component | Key Content |
|---|---------|-----------|-------------|
| 1 | Hero Banner | `HeroBanner` | "Scale every mark8 confidently" + hero image + Amazon/AWS badges |
| 2 | E-comm Growth | `EcommGrowth` | Stats (₹60+ CR, ₹700+ CR, 14M+ units) + graph SVG |
| 3 | Architecture / Building Blocks | `BuildingBlocks` | 5 feature cards (Ads, Inventory, Returns, Finance, Research) with clip-path cards |
| 4 | Built for All Markets | `MarketMarquee` | Infinite scrolling marquee of 6 marketplace logos |
| 5 | Products (Video + Cards) | `ProductsSection` | Video card with play button + 6 product cards (Ads, Sight, Shelf, Reco, Returns, PO) |
| 6 | Trusted & Certified | `TrustedCertified` | 4 compliance logos (AICPA, Wing, DPIIT, GST) in scrolling rows |
| 7 | Engineered to Power (Image Accordion) | `ImageAccordion` | 6 accordion items with image panel that swaps on click |
| 8 | Stories of Real Outcomes | `StoriesSection` | Testimonial cards (Myntra/Flipkart) with brand logo slider |
| 9 | Insight Powered by Mark8 IQ | `IqInsight` | Dashboard preview image + "Experience Now" CTA |

Plus the existing `CustomAccordian` FAQ section ("Keep every detail on track") which is also in the HTML.

## File Structure

```text
src/
  pages/
    HomePage.tsx              ← Full rewrite (imports section components)
  components/
    home/
      HeroBanner.tsx
      EcommGrowth.tsx
      BuildingBlocks.tsx
      MarketMarquee.tsx
      ProductsSection.tsx
      TrustedCertified.tsx
      ImageAccordion.tsx
      StoriesSection.tsx
      IqInsight.tsx
      HomeFaq.tsx
```

## Implementation Steps

### Step 1: Create all 10 section components in `src/components/home/`

Each component:
- Uses the **exact same CSS class names** from mark8iq.css (e.g., `HomeBanner_HomeBanner__L79e6`, `container`, `section_spacing`)
- Renders JSX instead of HTML strings
- Uses the same image URLs from the original site
- Contains all text content inline (no lorem ipsum)

### Step 2: Rewrite `src/pages/HomePage.tsx`

Replace the fetch + dangerouslySetInnerHTML pattern with:
```tsx
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import HeroBanner from '../components/home/HeroBanner';
import EcommGrowth from '../components/home/EcommGrowth';
// ... all sections

export default function HomePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  return (
    <Layout>
      <main className="Home_HomePage__ceAKX">
        <div className="Home_gradient_wrap__ullU_">...</div>
        <div className="Home_content__dmT6r">
          <HeroBanner />
          <EcommGrowth />
          <BuildingBlocks />
          <MarketMarquee />
          <ProductsSection />
          <TrustedCertified />
          <ImageAccordion />
          <StoriesSection />
          <IqInsight />
          <HomeFaq />
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
```

### Step 3: Interactive elements use React state

**ImageAccordion**: `useState` for active index. Clicking a title sets the index, which controls both the text highlight and the image panel visibility via conditional className application.

**HomeFaq**: `useState` for open index. Click toggles the accordion body display.

**MarketMarquee**: Pure CSS animation via `@keyframes` — no JS needed.

**ProductsSection video**: Click handler toggles video play/pause.

### Step 4: Remove legacy files

- Delete `public/homePage.html` (92KB)
- Delete `src/pages/homePageContent.ts` (96KB duplicate)
- Remove the `fetch('/homePage.html')` pattern entirely

## Content Data (All Extracted)

All text, image URLs, links, and SVG icons have been extracted from the HTML. Key data points:

- **30 unique image URLs** (all from infytrix.info/admin.infytrix.info CDN)
- **6 marketplace logos** for marquee (Myntra, Amazon, Nykaa, Ajio, Meesho, Tira)
- **5 feature cards** with inline SVG icons
- **6 product cards** with logo SVGs and descriptions
- **6 accordion items** with titles, descriptions, and a shared screenshot image
- **4 compliance logos** (AICPA, Wing, DPIIT, GST)
- **2 testimonial cards** (Myntra CEO, Flipkart CEO)

## Risk Mitigation

- CSS classes from mark8iq.css are preserved exactly, so layout and responsive behavior remain identical
- Mobile breakpoints (`@media max-width: 767px`) are already handled by mark8iq.css
- The gradient circles, clip-path cards, and other visual flourishes use existing CSS — no new styles needed
- If any visual regression occurs, it can be fixed by adjusting the JSX structure to match the original HTML nesting

## What This Achieves

1. **Eliminates 92KB HTML fetch** on page load
2. **Enables React-native interactivity** (state, effects, event handlers as JSX props)
3. **Makes content editable** without parsing raw HTML strings
4. **Enables future component reuse** across pages
5. **Removes all DOM manipulation** from useEffect hooks




# Plan: Generate Comprehensive Site Documentation

## What We're Building

A single detailed Markdown file (`/mnt/documents/mark8iq-developer-docs.md`) containing everything a developer (Claude) needs to understand and extend this codebase. The document will include full source code inline for every component, since the target developer has a 1M token context window.

## Document Structure

1. **Project Overview** -- Tech stack, build tools, architecture philosophy
2. **Architecture Deep Dive** -- The hybrid CSS model (mark8iq.css + Tailwind + shadcn), the CSS variable bridge, why `preflight: false`
3. **Routing Map** -- Every route, which page component renders it, refactored vs legacy status
4. **Global Shell Components** -- Full source: `Layout.tsx` (mouse-following gradient + grid background), `Navbar.tsx` (scroll states, dropdowns, mobile hamburger), `Footer.tsx`
5. **Homepage (Refactored)** -- Full source of all 10 section components with explanations of the animation patterns (Motion `whileInView`, `AnimatePresence`, spring physics)
6. **Product Pages (Refactored)** -- The data-driven template pattern: `ProductPageLayout.tsx` + `ProductPageData` type + all 8 sub-components + one example data file
7. **Legacy Pages (Still dangerouslySetInnerHTML)** -- About, WhyUs, SuccessStories, Pricing, Contact, BlogSlug -- document their HTML blob pattern and `useNavigateLinks` hook
8. **Design System** -- CSS variable bridge (full `index.css`), typography classes, button/badge/input overrides, design tokens, product color map
9. **Shared Primitives** -- `SectionTitle`, `ClipCard`, `GradientCircle`, `IconButton` with full source
10. **Card Components** -- All 6 card components in `src/components/cards/`
11. **Background Effects -- MUST PRESERVE** -- The grid overlay (`bg-pattern.svg`), mouse-following radial gradient in `Layout.tsx`, per-page gradient circles, how they layer
12. **Animation System** -- Motion patterns used: `fadeInUp` preset, staggered reveals, `AnimatePresence` for accordions/sliders, spring hover effects
13. **Smooth Scrolling** -- Lenis configuration in `App.tsx`
14. **Known Issues & Tech Debt** -- Legacy pages still use `dangerouslySetInnerHTML`, Footer still uses `useNavigateLinks`
15. **Instructions for Homepage V2** -- How to create `/home-v2` route, share the design system, build new components alongside existing ones

## Technical Details

- The document will be ~80-120KB of Markdown with every component's full source code embedded in fenced code blocks
- Each component gets a brief explanation of what CSS classes it depends on and why
- The background effects section will be explicitly flagged as "DO NOT REMOVE" with detailed explanation of the three layers (grid SVG, mouse gradient, page gradient circles)
- Color map table showing all product colors and their CSS variable names
- Typography spec table from `index.css`

## Execution

Single script execution that writes the Markdown file to `/mnt/documents/mark8iq-developer-docs.md`. No UI changes needed.


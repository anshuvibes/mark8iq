

## Plan: Canopy-Style Scroll-Triggered Theme Switch for FragmentationV2

### Problem
When scrolling from the Hero/TrustStrip into FragmentationV2, there's nearly a full empty white screen before the dark transition begins. This happens because the GSAP ScrollTrigger is set to `start: 'top top'` -- the animation only starts when the 700vh container reaches the viewport top, meaning you scroll through ~100vh of white nothingness first.

### Solution
Implement a two-layer approach inspired by the Canopy audit:

1. **IntersectionObserver on FragmentationV2** toggles a theme class on the Layout wrapper (not `<body>`, since Layout wraps everything). When ~20% of the section enters the viewport, the wrapper transitions its background from white to dark over 0.7s via CSS transition.

2. **Adjust GSAP ScrollTrigger start** from `'top top'` to `'top 80%'` so content animations (pills, text) begin as the section enters the viewport rather than after a full viewport of dead scroll.

3. **Make FragmentationV2's own background transparent** during the dark phase -- the parent's CSS transition handles the white-to-dark shift. Keep the internal `bgRef` only for Phase 12 (dark-to-violet transition at the end).

### Files to edit (2 files)

**File 1: `src/components/home-v2/FragmentationV2.tsx`**
- Add a second `useEffect` with an `IntersectionObserver` (threshold ~0.15) watching `containerRef`
- On intersect: add class `frag-theme-dark` to `document.body` (or closest Layout ancestor)
- On exit: remove `frag-theme-dark`
- Handle bidirectional scroll (check `isIntersecting` + `boundingClientRect` to know scroll direction)
- Remove Phase 0's white-to-dark bg animation on `bgRef` -- body handles this now
- Keep Phase 12's dark-to-violet animation on `bgRef` (circle expand still needs it)
- Set `bgRef` initial backgroundColor to `transparent` instead of `#FFFFFF`
- Change ScrollTrigger `start` from `'top top'` to `'top 80%'` so pills start appearing as user scrolls into the section
- Cleanup: remove observer on unmount, remove body class on unmount

**File 2: `src/index.css`** (append at bottom, per design rules)
- Add CSS rules:
```css
/* Fragmentation scroll-driven theme transition */
body {
  transition: background-color 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
body.frag-theme-dark {
  background-color: #080D19;
}
```
- Add `.ignore-color-override` escape hatch for Navbar so it stays unaffected

### What stays untouched
- All GSAP phases 1-12 (pills, text, convergence, circle reveal) remain identical
- No changes to HomePageV2.tsx, Layout.tsx, HeroV2.tsx, TrustStripV2.tsx, or any other component
- No new packages (IntersectionObserver is native browser API)
- All copy unchanged

### Technical detail: Scroll direction handling
The observer callback checks `entry.isIntersecting` to add the class, and checks `entry.boundingClientRect.top > 0` on exit to only remove the class when scrolling back up (not when scrolling past). This prevents the theme from flipping back when the user scrolls through the section entirely.




## Plan: Rebuild FragmentationV2 — Scroll-Driven Problem Narrative

### What we're building

A full-screen, scroll-pinned animation sequence between TrustStripV2 and ProductSuiteV2. The visitor scrolls through three escalating layers of chaos (marketplaces → departments → personas), hits a dramatic pause ("Until now."), then watches everything collapse into a Mark8 IQ circle reveal that punches into the next section.

### Key improvements over the previous version

- **No dead space**: Background gradient bleed starts immediately on entry (no blank white gap)
- **Tighter scroll budget**: 400vh instead of 500vh — less wasted scroll before content appears
- **Idle floating animation**: Pills get subtle CSS float animation so they feel alive, not static
- **Better scroll phase map** with no empty ranges:

```text
Scroll Map (400vh = 4 viewport heights of scroll)
─────────────────────────────────────────────────
0.00–0.05  BG gradient bleed (#FFF → #080D19)
0.02–0.08  Marketplace pills fade in, scattered wide
0.08–0.25  Step 1 copy visible
0.22–0.28  Department tags appear from edges
0.28–0.45  Step 2 copy visible
0.42–0.48  Persona labels appear (outermost ring)
0.48–0.62  Step 3 copy visible
0.60–0.68  Pivot — "Until now." fade in/out
0.68–0.82  Consolidation — all elements converge to center
0.80–0.85  All pills/labels fade out as they reach center
0.82–0.95  Circle grows from center, bg shifts to #F5F0FF
0.88–0.93  Mark8 IQ logo fades in inside circle
0.91–0.96  "One platform absorbs it all." copy
0.95–1.00  Circle fills viewport → hard punch into ProductSuiteV2
```

### Files to modify

1. **`src/components/home-v2/FragmentationV2.tsx`** — Full rewrite with the new scroll map
2. **`src/pages/HomePageV2.tsx`** — Re-add FragmentationV2 import and component between TrustStripV2 and ProductSuiteV2

### Technical approach

**Container**: `height: 400vh`, `position: relative`. Inner sticky div at `100vh`.

**Background**: `useTransform(scrollYProgress, [0, 0.03, 0.06], ['#FFFFFF', '#150e22', '#080D19'])` — starts transitioning almost immediately so there's no white gap.

**FloatingPill component** (reused for marketplaces + departments):
- Positioned absolute at center with `x`/`y` motion values for scatter positions
- `useTransform` for convergence: holds scatter position until 0.68, then animates to `(0,0)` by 0.82
- CSS `@keyframes float` for subtle idle bobbing (translateY ±6px, 3-4s duration, randomized delay per pill)
- Marketplace pills: glass morphism style (`rgba(255,255,255,0.08)` bg, white border)
- Department pills: violet-tinted (`rgba(142,89,255,0.10)` bg, violet border)

**FloatingText component** (personas):
- Same convergence behavior but plain text, no pill background
- Color: `rgba(255,255,255,0.48)`

**Anchor copy**: Three `motion.div` elements with `m8-p1` class, absolute bottom ~30vh, fading in/out per the scroll map.

**Pivot**: "Until now." in `m8-h1-large`, center screen, scale 0.88→1, opacity fade in/out.

**Circle reveal**:
- 60px circle at center, `scale` transforms from 0 to 40
- Background color: `#F5F0FF` (violet tint for logo contrast)
- Mark8 IQ logo (Saira 48px, weight 400 "mark8" + weight 500 violet "IQ") fades in at z:30
- Consolidation copy "One platform absorbs it all." in `m8-p2`

**Grid overlay**: `bg-pattern-reverse.svg` at 0.06 opacity over the dark bg.

**No packages added. No files outside home-v2/ touched. All design rules followed** (motion/react import, no fontWeight 600/700, permitted colors only, m8-* typography classes).

### HomePageV2.tsx change

Add back the import and place `<FragmentationV2 />` between `<TrustStripV2 />` and `<ProductSuiteV2 />`.


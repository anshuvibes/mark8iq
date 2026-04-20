# MARK8 IQ — DESIGN SYSTEM RULES
# This file is the single source of truth for all design decisions in this codebase.
# Read this file completely before making any edit to any component.
# Every rule here overrides your defaults and training instincts.

---

## TYPOGRAPHY — NON-NEGOTIABLE

Use ONLY these CSS classes for all text. They are defined in src/index.css.
Never write inline font-size, font-weight, or letter-spacing on brand copy.
Never use Tailwind text-sm, text-base, text-lg, text-xl, text-2xl etc on brand copy.

```
.m8-h1-display  → 80px, weight 400, lh 110%, ls -0.03em
.m8-h1-large    → 60px, weight 400, lh 110%, ls -0.03em
.m8-h2          → 50px, weight 400, lh 60px,  ls -0.03em
.m8-h3-xl       → 40px, weight 400, lh 30px,  ls -0.03em
.m8-h3-l        → 35px, weight 400, lh 45px,  ls -0.03em
.m8-h3-m        → 30px, weight 400, lh 30px,  ls -0.03em
.m8-h4          → 28px, weight 400, lh 110%,  ls -0.03em
.m8-p1          → 25px, weight 400, lh 150%,  ls -0.03em
.m8-p2          → 24px, weight 400, lh 35px,  ls 0
.m8-p3          → 20px, weight 400, lh normal, ls 0
.m8-p3-medium   → 20px, weight 500, lh normal, ls 0
.m8-p4          → 18px, weight 400, lh normal, ls 0
.m8-p5          → 16px, weight 300, lh 24px,  ls 0
.m8-p6          → 14px, weight 300, lh normal, ls 0
```

---

## SECTION EYEBROW + HEADLINE PATTERN — UNIVERSAL

Every v2 section heading uses an eyebrow + headline structure. No exceptions.

Eyebrow uses `.m8-eyebrow` (defined in src/index.css):
- Söhne Mono, 11px, weight 400, letter-spacing 0.12em, uppercase, line-height 1
- Color: `var(--v2-text-secondary)` for neutral, accent hex for branded sections
- Margin-bottom: 10–12px before the headline

Headline follows directly after the eyebrow:
- `.m8-h2` preferred, or inline Saira 40px / 400 / -0.03em
- HARD RULE: Never place a paragraph sub-heading immediately beneath the headline as a secondary heading.
- Supporting copy goes as body text with clear visual separation, not as a tagline under the headline.

```tsx
<p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '12px' }}>AGENT MARK</p>
<h2 className="m8-h2" style={{ color: 'var(--v2-text)' }}>Your smartest team member never sleeps.</h2>
```

HARD RULE: font-weight 600 and 700 are permanently banned in this codebase.
HARD RULE: Maximum allowed font-weight is 500, used only via .m8-p3-medium.
HARD RULE: Never write fontWeight: 600 or fontWeight: 700 anywhere — not in JSX style props, not in className, not in CSS.

---

## COLORS — PERMITTED VALUES ONLY

```
Brand violet:      #8E59FF   (var(--color_primary))
Dark navy:         #080D19   (var(--color_neutral_dark))
Light bg:          #EDF0F7   (var(--color_neutral_light))
Body text:         #12182B   (var(--color_text))
White:             #FFFFFF
Grid base:         #F0F1F6
Cool gray section: #F2F2F4
Violet tint:       #F5F0FF

Product accent colors — use ONLY for left-borders, badge fills, icon tints:
  Mark8 Ads:       #dd4062  (magenta-red)
  Mark8 Sight:     #52bfbc  (teal)
  Mark8 Shelf:     #6895fc  (blue)
  Mark8 Returns:   #fc7459  (red-orange)
  Mark8 Reco:      #7cbc71  (green)
  Mark8 PO:        #fcb24f  (amber)
```

HARD RULE: Never use Tailwind slate, zinc, gray, purple, indigo, or violet color classes.
HARD RULE: Never introduce a color not on this list without explicit instruction.
HARD RULE: rgba() is permitted ONLY for card overlays, borders, and shadows within a section — never for section background colors.

---

## SECTION BACKGROUNDS — EXACT HEX VALUES

Every section background must be a solid hex value. No exceptions.

```
Hero:            #FFFFFF
Trust Strip:     #FFFFFF
Fragmentation:   animated via motion (starts #FFFFFF, transitions to #080D19)
Product Suite:   #FFFFFF
Role-Based:      #EDF0F7
Agent Mark:      #F2F2F4
Agent Foundry:   #FFFFFF
Proof:           #EDF0F7
Credentials:     #FFFFFF
CTA Block:       #8E59FF
Footer:          #12182B
```

---

## BUTTONS — USE EXISTING VARIANTS ONLY

```tsx
import { Button } from '@/components/ui/button';

// Available variants:
<Button variant="m8-violet">...</Button>         // violet fill, white text
<Button variant="m8-dark">...</Button>           // dark fill, white text
<Button variant="m8-outline-violet">...</Button> // violet outline, violet text
<Button variant="m8-cta">...</Button>            // white fill, violet text — CTA section only
<Button variant="m8-ghost">...</Button>          // no fill, no border

// Available sizes:
size="lg"   // 14px 28px padding, 18px font
size="sm"   // 6px 14px padding, 14px font
// default is 10px 20px padding, 16px font
```

HARD RULE: Never write custom button styles in JSX. Never use bg-purple, bg-indigo, or bg-violet Tailwind classes on buttons.

---

## ANIMATIONS — EXACT PATTERNS ONLY

```tsx
// CORRECT import — always:
import { motion } from 'motion/react';

// BANNED import — never:
import { motion } from 'framer-motion'; // DO NOT USE

// Scroll-triggered sections (everything except hero):
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-80px' }}
transition={{ duration: 0.6, ease: 'easeOut' }}

// Hero section only (fires on mount, not on scroll):
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}

// Stagger pattern for lists/grids:
transition={{ delay: index * 0.1 }}

// Hover spring:
whileHover={{ y: -3 }}
transition={{ type: 'spring', stiffness: 400, damping: 17 }}
```

HARD RULE: Never import from framer-motion. The package is not installed. motion/react is the correct package.
HARD RULE: Never use whileInView on the hero section. Hero animations use animate only.

---

## LAYOUT — USE EXISTING WRAPPERS

```tsx
import Layout from '../components/Layout';
// Layout provides: grid SVG background, mouse-follow violet gradient, Navbar
// Never re-implement any of these. Never add another grid or gradient element.

import Footer from '../components/Footer';
// Use the existing Footer component. Never create a new footer.
```

All new components for the v2 homepage go in: src/components/home-v2/
The v2 homepage page file is: src/pages/HomePageV2.tsx
The v2 route is: /home-v2

---

## FONT

Font family: Saira. Loaded via @font-face in src/mark8iq.css from Google Fonts CDN.
Do not add any <link> tags for fonts. Do not import DM Sans or any other font.
Reference font as: var(--font_primary) or 'Saira', sans-serif

---

## FILE PERMISSIONS

```
PERMITTED TO MODIFY:
  src/components/home-v2/*.tsx      — all v2 section components
  src/pages/HomePageV2.tsx          — v2 page file
  src/index.css                     — add new rules at bottom only, never delete existing
  src/components/ui/button.tsx      — add new variants only

PERMANENTLY OFF LIMITS — NEVER TOUCH:
  src/mark8iq.css                   — legacy CSS, read-only
  src/pages/HomePage.tsx            — existing homepage, must not change
  src/components/home/*.tsx         — old homepage components, must not change
  index.html                        — do not add or remove font links
```

---

## BANNED PATTERNS — NEVER DO THESE

- fontWeight: 600 or fontWeight: 700 anywhere in the codebase
- import from 'framer-motion'
- Inline fontSize on brand copy
- rgba() as a section background value
- Tailwind color classes: slate-*, zinc-*, gray-*, purple-*, indigo-*, violet-*
- Tailwind size classes on brand copy: text-sm, text-lg, text-xl, text-2xl etc
- Custom button styles bypassing the Button component
- Adding new CSS files
- Modifying mark8iq.css
- Re-implementing the Layout grid background or mouse gradient
- Using whileInView in the hero section

---

## HOW TO USE THIS FILE

At the start of every prompt sent to Lovable, the first instruction will be:

"Before making any changes, open and read docs/MARK8IQ_DESIGN_RULES.md in full.
Apply every rule in that file to all code you write in this session.
Do not proceed without reading it first."

This file is the design system authority. When in doubt, check this file before writing any code.

---
# END OF DESIGN RULES FILE

---
name: Eyebrow Pattern
description: Universal .m8-eyebrow class spec for v2 section labels and the rule against sub-heading paragraphs beneath headlines
type: design
---

Every v2 section heading uses an eyebrow + headline structure. No exceptions.

Eyebrow class: `.m8-eyebrow` (registered in src/index.css)
- Font: Söhne Mono (falls back to Saira)
- Size: 11px
- Weight: 400
- Letter-spacing: 0.12em
- Text-transform: uppercase
- Line-height: 1
- Color: per-section — `var(--v2-text-secondary)` for neutral, accent hex for branded (e.g. `#8E59FF` for Agent Mark)
- Margin-bottom: 10–12px before the headline

Headline follows directly after the eyebrow:
- Class: `m8-h2` preferred, or inline Saira 40px / 400 / -0.03em
- No paragraph sub-heading sits between eyebrow and headline, and no paragraph sub-heading sits immediately beneath the headline as a secondary heading.
- If supporting copy is needed, place it as body text with clear visual separation from the headline (not as a tagline directly under it).

Usage:
```tsx
<p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '12px' }}>AGENT MARK</p>
<h2 className="m8-h2" style={{ color: 'var(--v2-text)' }}>Your smartest team member never sleeps.</h2>
```

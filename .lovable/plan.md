

# Mark8 IQ Design System Documentation

## Purpose
Generate a comprehensive design system reference document that can be handed to any AI (e.g. Claude) to understand how the Mark8 IQ website is structured, styled, and built — so it can confidently extend or modify it.

## Output
A Markdown file written to `/mnt/documents/mark8iq-design-system.md`.

---

## Document Contents

### 1. Architecture Overview
- **Framework**: React 18 + Vite 5 + React Router (client-side SPA)
- **Styling approach**: Zero Tailwind / zero shadcn usage. All styling comes from a single global CSS file (`src/mark8iq.css`, ~3000 lines) containing hashed CSS module class names extracted from the original Next.js production build
- **Content rendering**: Every page uses `dangerouslySetInnerHTML` to inject pre-extracted HTML strings. There are no React component trees for page content — the HTML was scraped from the live site and pasted as string literals
- **Shared components**: Only 3 true React components exist — `Navbar`, `Footer`, and `Layout`. All three also use `dangerouslySetInnerHTML` with raw HTML strings
- **Link interception**: A custom `useNavigateLinks` hook intercepts clicks on `<a>` tags inside the raw HTML and calls `navigate()` for known internal paths

### 2. Page Component Pattern
Every page follows this exact template:
```
Layout > main[className="PageModule_PageName__hash"] > dangerouslySetInnerHTML
Layout > Footer
```
The `className` on `<main>` is critical — it scopes all the hashed CSS selectors in `mark8iq.css`. Each page has a unique class:
- Home: `Home_HomePage__ceAKX`
- About: `AboutUs_AboutUsPage__gTlQT`
- Contact: `GetInTouch_GetInTouchPage__65Scy`
- Pricing: `Pricing_PricingPage__B3Lk5`
- Why Us: `WhyUs_WhyUsPage__NG7Dv`
- Success Stories: `PressAndAwards_PressAndAwardsPage__5mwDx`
- All product pages: `ProductInside_ProductInsidePage__h7vgk`

### 3. Layout Wrapper Structure
```
CustomBg_CustomBg__mpBxm
  └── CustomBg_bg_gradient__9nROB (absolute gradient circle)
  └── CustomBg_bg_image__RIwVy (bg-pattern-reverse.svg repeating texture)
      └── Navbar
      └── {children}
```

### 4. Design Tokens (CSS Custom Properties)
All defined in `:root` in `mark8iq.css`:

**Font**: `--font_primary: "Saira", sans-serif` (Google Fonts, variable weight 100-900)

**Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--color_primary` | `#8e59ff` | Brand purple, gradients, accents |
| `--color_primary_light` | `#c1b0ff` | Lighter purple |
| `--color_primary_muted` | `#aeb3c8` | Muted text |
| `--color_primary_dark` | `#40445a` | Dark text, borders |
| `--color_primary_contrast` | `#edeff7` | Light text on dark bg |
| `--color_neutral_dark` | `#080d19` | Near-black, button fills |
| `--color_neutral_light` | `#edf0f7` | Light backgrounds |
| `--color_text` | `#12182b` | Primary body text |
| `--color_white` | `#ffffff` | White |
| `--color_black` | `#000000` | Black |
| `--color_blue` | `#6895fc` | Accent |
| `--color_teal` | `#52bfbc` | Accent |
| `--color_green` | `#7cbc71` | Accent |
| `--color_yellow` | `#fcb24f` | Accent |
| `--color_orange` | `#fc7459` | Accent |
| `--color_red` | `#dd4062` | Accent |

**Container widths** (responsive):
- `<768px`: 100%
- `768-991px`: 750px
- `992-1199px`: 970px
- `1200-1335px`: 1170px
- `≥1336px`: 1240px

### 5. Typography Utility Classes
| Class | Desktop | Mobile (<768px) |
|-------|---------|-----------------|
| `fs_80` | 80px / 1.125 | 40px |
| `fs_50` / `section_title` | 50px / 1.1, -3px tracking | 30px |
| `fs_40` | 40px / 1.25 | 26px |
| `fs_30` | 30px / 1.33 | 20px |
| `fs_18` / `section_desc` / `body` | 18px / 1.5 | 16px |
| `fs_16` | 16px / 1.5 | 14px |
| `fs_14` | 14px / 1.57 | — |
| `fs_12` | 12px / 1.57 | — |

**Weight classes**: `fw_300` through `fw_800`

### 6. Color Utility Classes
Apply background + text color combos: `bg_primary`, `bg_neutral_dark`, `bg_text`, `bg_neutral_light`, etc.
Text-only: `color_primary`, `color_text`, `color_neutral_dark`, etc.
Border: `border_primary`, `border_text`, etc.
Hover: `hover_bg_primary`, etc.

### 7. Spacing & Layout Utilities
- `.container` — centered, responsive width with 15px padding
- `.row` — flex wrap with -15px margin
- `.section_spacing` — `padding: 60px 0`
- `.br_30` — border-radius 30px
- `.br_20` — border-radius 20px
- `.text_center`, `.text_uppercase`

### 8. Button System
Two button variants, both using raw HTML class strings:

**Solid button** (dark):
```html
<span class="Button_btn_wrap__DW66V false">
  <button class="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 bg_neutral_dark">
    <span>Get in Touch</span>
  </button>
</span>
```

**Gradient-bordered button** (outline with shimmer):
```html
<span class="Button_btn_wrap__DW66V Button_gradientBordered__mLA7E">
  <button class="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7">
    <span>Contact Our Team</span>
  </button>
  <span class="Button_gradientBorderedBg__t_hMi"></span>
</span>
```
- Hover effect: `clip-path: circle()` expanding overlay
- Active: `transform: scale(0.9)`

### 9. Key Reusable Patterns

**ClipCard** — masked image card using CSS `mask-image` from SVG files in `/img/clip-shapes/`:
```
ClipCard_ClipCard__bXUlH > ClipCard_ClipCardInner__BFU7k (mask-image applied)
```

**GradientCircle** — large blurred purple circle for ambient backgrounds:
```html
<div class="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle"></div>
```
Styled: `filter: blur(100px); border-radius: 50%; min-height: 500px`

**Pre-footer CTA block** — rounded card with gradient circles and centered text + button. Class: `Footer_contact_btn_wrap__5hG97`

**Marquee** — infinite horizontal scroll using `rfm-marquee-container` / `rfm-marquee` classes with CSS `@keyframes rfm-scroll`

**CustomImageAccordian** — interactive tabbed content with image switching. Toggled via JS by adding/removing `CustomImageAccordian_active_item__IkUwc`

**CustomAccordian** — FAQ-style collapsible. Body visibility toggled by JS on `CustomAccordian_acc_body__hf1qd`

### 10. Interactive Behavior (JS in useEffect)
Since there is no React component tree for the page content, all interactivity is implemented via vanilla DOM manipulation in `useEffect` hooks:
- **Navbar dropdowns**: `mouseenter`/`mouseleave` toggling `Header_active__sryJG`
- **Mobile hamburger**: click toggles `Header_sidebar_opened__zLf90`
- **Accordion sections**: click handlers toggle active classes and `display` styles
- **Scroll animations**: `data-scroll="in"` forced on `fadeInUp` elements; character-animated headings forced to `opacity:1; transform:translate(0,0)`

### 11. Header / Navbar
Raw HTML string with hashed classes. Key classes:
- `Header_main_header__0zVVE` — outer wrapper
- `Header_links_wrap__d9pKH` — desktop nav links container
- `Header_dropdown__ogeNG` — dropdown menu (shown via `Header_active__sryJG`)
- `Header_hamburger_icon__jHERs` — mobile menu trigger
- `Header_sidebar_opened__zLf90` — mobile sidebar open state

### 12. Footer
Raw HTML string. Includes email input, social links, navigation columns, copyright. Key class: `Footer_main_footer__xevJU`

### 13. Critical Rules for Extending
1. **Never use Tailwind or shadcn** for any visible UI — all styling must use the existing CSS class system from `mark8iq.css`
2. **New page content** must be wrapped in a `<main>` with the correct hashed page class name
3. **New sections** should reuse existing class names (e.g. `section_spacing`, `container`, `fs_50`, `bg_neutral_dark`)
4. **New buttons** must use the exact HTML structure shown above — not `<Button>` components
5. **All images** from the original site load from `https://infytrix.info/...` — do not replace these
6. **Placeholder images** use `/assets/img-placeholder.png`
7. **Interactivity** must be added via `useEffect` DOM manipulation, not React state/JSX
8. **The `mark8iq.css` file is read-only** — add overrides in `src/index.css` only


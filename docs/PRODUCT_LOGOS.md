# Mark8 Product Logos — Usage Guide

## Location

All product logos live under `public/img/product-logos/`:

```
public/img/product-logos/
├── black/          ← For light backgrounds / light mode
│   ├── market-one.svg
│   ├── mark8-ads.svg
│   ├── mark8-iq.svg
│   ├── mark8-po.svg
│   ├── mark8-reco.svg
│   ├── mark8-returns.svg
│   ├── mark8-shelf.svg
│   └── mark8-sight.svg
└── white/          ← For dark backgrounds / dark mode
    ├── market-one.svg
    ├── mark8-ads.svg
    ├── mark8-iq.svg
    ├── mark8-po.svg
    ├── mark8-reco.svg
    ├── mark8-returns.svg
    ├── mark8-shelf.svg
    └── mark8-sight.svg
```

## Usage Rules

| Background | Folder | Example path |
|---|---|---|
| Light background / light mode | `black/` | `/img/product-logos/black/mark8-reco.svg` |
| Dark background / dark mode | `white/` | `/img/product-logos/white/mark8-reco.svg` |

## Product ↔ File Mapping

| Product | Slug (used in filenames & routes) |
|---|---|
| Market One | `market-one` |
| Mark8 Ads | `mark8-ads` |
| Mark8 IQ | `mark8-iq` |
| Mark8 PO | `mark8-po` |
| Mark8 Reco | `mark8-reco` |
| Mark8 Returns | `mark8-returns` |
| Mark8 Shelf | `mark8-shelf` |
| Mark8 Sight | `mark8-sight` |

## Helper Pattern

```tsx
// Derive the logo path from a product slug:
const logoPath = (slug: string, variant: 'black' | 'white' = 'black') =>
  `/img/product-logos/${variant}/${slug}.svg`;

// Example
<img src={logoPath('mark8-reco', 'black')} alt="Mark8 Reco" />
```

## Notes

- Always use the **black** variant on light surfaces and the **white** variant on dark surfaces to ensure legibility.
- These are SVGs — they scale cleanly to any size. Prefer setting width/height via CSS rather than hard-coding dimensions.
- When the app supports dark mode, swap variants dynamically based on the current theme.

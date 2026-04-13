

## Plan: Tone down the mouse-follow gradient to match the reference site's subtlety

### Problem
The gradient blob is functionally correct but visually too intense compared to the reference (infytrix.info). The reference shows a very faint, soft violet wash behind the grid — barely noticeable unless you look for it.

### Changes (single file: `src/index.css`, lines 936-940)

1. **Reduce opacity** from `0.55` to `0.18` — the reference gradient is extremely subtle
2. **Increase blur** from `150px` to `200px` — softer, wider spread like the reference
3. **Reduce blob size** from `400px` to `350px` — slightly tighter to avoid overwhelming

No z-index changes needed — the current layering (gradient z:0 → grid z:1 → content z:2) is already correct. The "too much" appearance is purely an intensity/opacity issue.

### What stays the same
- Mouse-follow logic in `Layout.tsx` — unchanged
- Grid pattern, z-index stack — unchanged
- No other files touched


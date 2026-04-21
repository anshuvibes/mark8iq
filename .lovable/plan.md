

## Goal
Tie the cursor visibility toggle directly to the existing `themeTrigger` ScrollTrigger so the cursor appears at the exact moment the theme flips dark→light (and hides on light→dark). Remove the separate `cursorZoneTrigger` that's drifting from the actual reveal point.

## File: `src/components/home-v2/FragmentationV2.tsx`

### Change 1 — Remove `cursorZoneTrigger` from the second useEffect
Delete the entire `cursorZoneTrigger = ScrollTrigger.create({...})` block (the one with `start: 'bottom 55%'` and `onEnter` removing `data-hide-cursor`).

Also remove `cursorZoneTrigger.kill();` from that useEffect's cleanup return.

### Change 2 — Augment `themeTrigger` callbacks in the first useEffect
Add cursor attribute toggling alongside the existing theme/logo color logic, so they fire on the same trigger boundary:

- `onEnter` (entering dark zone): `container.setAttribute('data-hide-cursor', 'true')`
- `onLeave` (exiting bottom into light): `container.removeAttribute('data-hide-cursor')`
- `onLeaveBack` (scrolling back up out of top): `container.removeAttribute('data-hide-cursor')`
- `onEnterBack` (scrolling back into dark from below): `container.setAttribute('data-hide-cursor', 'true')`

### Change 3 — Update first useEffect cleanup
Restore `data-hide-cursor="true"` on the container on unmount, so the cursor isn't left in a broken state if the user navigates away mid-scroll:

```ts
return () => {
  themeTrigger.kill();
  container.setAttribute('data-hide-cursor', 'true');
  setThemeRef.current('light');
};
```

## Answer to the question
Yes, the initial hidden state is preserved. The JSX renders `<div data-hide-cursor="true">` on mount, so before any ScrollTrigger fires the cursor is correctly hidden inside the fragmentation viewport. ScrollTriggers only fire on scroll boundary crossings — they do not need to fire `onEnter` to establish the initial state. The attribute is already there from JSX.

Untouched: `CustomCursor.tsx`, all animation values, timeline `t=` positions, `endStateZoneRef` pointer-events logic, `index.css`, `mark8iq.css`.


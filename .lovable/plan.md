
## Ready to Execute: Agent Mark Section ↔ Widget Unification

I have a complete plan with all edge cases mapped. No outstanding questions — switching to default mode will let me implement it.

### What will be built

A single Agent Mark "object" that floats as a pill at the bottom of the viewport, then physically docks into the Agent Mark section when scrolled into view, runs the auto-demo there, and re-floats when scrolled away.

### Files to be created

1. **`src/components/home-v2/AgentMarkDockContext.tsx`** *(new)*
   - React context exposing `dockRef: RefObject<HTMLDivElement>` and `dockState: 'floating' | 'docking' | 'docked' | 'undocking'`
   - Provider runs an `IntersectionObserver` on `dockRef` (rootMargin tuned to fire ~60% in view)
   - Exposes `setDockState` for the widget to update during FLIP transitions

2. **`src/components/home-v2/useAgentMarkDemo.ts`** *(new)*
   - Extracts the 5-prompt `DEMO_CYCLE` array and the typing phase machine (`idle → typing-user → loading → typing-insights → typing-rootcause → typing-recs → pause → next`) currently inline in `AgentMarkV2.tsx`
   - Exposes `{ phase, cycleIndex, currentPrompt, revealedWords, pause(), resume(), reset() }`
   - Honors `prefers-reduced-motion` (halves word reveal interval)
   - Pauses on `document.visibilitychange` (tab backgrounded)

### Files to be modified

3. **`src/components/home-v2/AgentMarkV2.tsx`**
   - Strip inline chat window rendering and demo logic
   - Keep eyebrow, headline ("Hello, I'm Agent Mark"), orb, gradient card background, intro text
   - Replace chat area with hollow `<div ref={dockRef} className="agent-mark-dock" />` of fixed dims (960×520 desktop, full-width minus 32px gutters mobile)
   - Reads `dockRef` from context

4. **`src/components/home-v2/AgentMarkWidget.tsx`**
   - Becomes single source of truth for ALL pill/panel/demo rendering
   - Reads `dockState` + `dockRef` from context
   - FLIP animation via `motion/react` `animate` prop interpolating `x, y, width, height, borderRadius` between floating coords (fixed bottom 24px, 480×52, radius 9999px) and dock coords (`dockRef.getBoundingClientRect()`)
   - Spring transition: `stiffness: 220, damping: 28`
   - Recalculates target coords on `dockState` change, `window.resize`, `ResizeObserver` on `dockRef`, and throttled `scroll` (rAF) during `'docking'`/`'undocking'`
   - When `dockState === 'docked'` and FLIP `onAnimationComplete` fires, mounts demo mode using `useAgentMarkDemo`
   - When user clicks "Ask Mark" while docked: pauses demo, swaps panel content to live chat (panel stays in dock); closing live chat resumes demo from current `cycleIndex`
   - When chat is open while floating and section starts entering: auto-closes chat (panel→pill animation), then docks
   - Scroll-lock (existing wheel/touchmove listeners) only active when live chat is open — never during demo
   - Existing fragmentation `IntersectionObserver` hide takes priority over docking
   - `emailSent` flag persisted in `sessionStorage` so re-opens skip the email-capture step
   - On mount: if `dockRef` is already in viewport (deep-link), start in `'docked'` state with no FLIP animation
   - Honors `prefers-reduced-motion`: snap between positions instead of tweening

5. **`src/pages/HomePageV2.tsx`**
   - Wrap `<main>` (or the entire `<Layout>` children) in `<AgentMarkDockProvider>` so both `AgentMarkV2` (section) and `AgentMarkWidget` (floating) share the same context

### Edge cases covered in implementation

| # | Case | Handling |
|---|---|---|
| E1 | Chat open while floating → scroll to section | Auto-close chat, then dock. State cleared. `emailSent` persisted |
| E2 | "Ask Mark" clicked while docked | Pause demo timers, swap to live chat in dock. Resume on close |
| E3 | Scroll while live chat open in dock | Page scroll-locked only during open chat |
| E4 | Window resize while docked | `ResizeObserver` snaps widget to new bounds (no animation) |
| E5 | Fast scroll through section | Spring interrupts cleanly. Demo waits for `onAnimationComplete` + `'docked'` |
| E6 | `prefers-reduced-motion` | Skip FLIP, snap. Halve demo word speed |
| E7 | Fragmentation overlap | Priority: `fragmentationHidden > docked > floating` |
| E8 | Mobile <768px | Dock collapses to full-width minus 32px gutters |
| E9 | Route change mid-dock | Provider cleanup resets to `'floating'`, clears demo timeouts |
| E10 | Email submitted, then dock | `emailSent` flag persisted in sessionStorage |
| E11 | Tab backgrounded | `visibilitychange` pauses demo, resumes on focus |
| E12 | Deep-link to section | Skip floating phase, start `'docked'` with no FLIP |

### What is NOT changing

- Visual design of pill, suggestions card, section card, orb
- Demo copy, suggestion prompts, email-capture flow
- Other V2 sections (Hero, Trust Strip, Fragmentation, Product Suite, Role-Based Value, Foundry, Proof, Credentials, CTA, Footer)
- `mark8iq.css`, `index.css` (read-only per project rules)

### Implementation order

1. `AgentMarkDockContext.tsx` (provider + IntersectionObserver)
2. `useAgentMarkDemo.ts` (extract phase machine from `AgentMarkV2`)
3. Refactor `AgentMarkV2.tsx` to layout-only with dock placeholder
4. Refactor `AgentMarkWidget.tsx` with FLIP + demo-mode + all edge handlers
5. Wrap `HomePageV2.tsx` in provider
6. Self-QA on /home-v2 across the 12 edge cases



## AI Summary Panel — Interactive Prototype

### What we are building

A new route `/dashboard/ads` with a mock Mark8 Ads dashboard layout and a fully interactive AI Summary Panel (right-side drawer). This is a design prototype with mock data — no real backend or AI integration. All interactions (analyse, suggestions, free chat) will use hardcoded responses that follow the PRD's INSIGHTS / ROOT CAUSE / RECOMMENDATIONS format.

### Technical approach

**New files to create:**

1. **`src/pages/DashboardAdsPage.tsx`** — Page component with a minimal mock dashboard (header bar with bell icon, AI icon, user avatar; a fake "Targeting Analysis" table area). Registers at `/dashboard/ads`.

2. **`src/components/ai-panel/AISummaryPanel.tsx`** — Main drawer component (right-side, ~420px wide). Manages all panel state: default view, active chat, loading, error, confirmations.

3. **`src/components/ai-panel/AIPanelHeader.tsx`** — Persistent header with greeting, New Chat icon, Close (X). Inline confirmation prompt for new chat when active chat exists.

4. **`src/components/ai-panel/HaltCard.tsx`** — Individual halt/highlight card with insight text and Analyse button. Inline conflict confirmation when active chat exists.

5. **`src/components/ai-panel/HaltsSection.tsx`** — Section 1: renders 4-5 halt cards, "Generated at" timestamp, "View all insights" link. Collapses to mini strip when chat is active.

6. **`src/components/ai-panel/SuggestionsSection.tsx`** — Section 2: renders 3 suggestion cards with stale filter label support.

7. **`src/components/ai-panel/ChatWindow.tsx`** — Scrollable chat thread with context pills (halt/suggestion variants), user bubbles, AI response blocks (INSIGHTS/ROOT CAUSE/RECOMMENDATIONS), feedback rows, date separators, thread dividers, "Load previous chats" link.

8. **`src/components/ai-panel/ChatInputBar.tsx`** — Input field with context label above it, send button, idle/disabled states.

9. **`src/components/ai-panel/AIResponseBlock.tsx`** — Structured response renderer: three sections with uppercase headers, divider lines, feedback row (thumbs up/down).

10. **`src/components/ai-panel/ViewAllInsightsModal.tsx`** — Modal listing all insight cards with Analyse CTAs and conflict warning.

11. **`src/data/aiPanelMockData.ts`** — All mock halts, suggestions, responses, and chat history.

**Route addition in `src/App.tsx`:**
```
<Route path="/dashboard/ads" element={<DashboardAdsPage />} />
```

### Design rules applied

- Font: Saira via `var(--font_primary)`, using `m8-p3` through `m8-p6` classes
- Colors: `#8E59FF` (violet active state), `#080D19` (dark), `#12182B` (text), `#EDF0F7` (section bg), `#FC7459` (Ads accent)
- Max font-weight: 500 (via `m8-p3-medium`)
- Buttons: `Button` component with `m8-violet`, `m8-ghost`, `m8-outline-violet` variants
- Animations: `motion/react` with standard scroll/mount patterns
- No Tailwind color utility classes on brand copy

### Screen states covered

| # | State | Implementation |
|---|-------|---------------|
| 1 | Dashboard default (panel closed) | AI icon in header, tooltip |
| 2 | Panel open, default | Halts + Suggestions + empty chat |
| 3 | Halt → context pill + RCA response | Flow 1 |
| 4 | Suggestion → context pill + response | Flow 2 |
| 5 | Free chat → user bubble + response | Flow 3 |
| 6 | Follow-up messages | Flow 4 |
| 7 | Halts collapsed to mini strip | Active chat state |
| 8 | Loading state | Pulsing dots, disabled input |
| 9 | Error state | Error message + Try again |
| 10 | Page nav mid-chat | Context change notice + divider |
| 11 | Load previous chats | Date separator + session tag |
| 12-13 | View All Insights popup | Default + conflict warning |
| 14 | New Chat confirmation | Inline below header |
| 15 | Analyse conflict confirmation | Inline in halts section |

### Mock behavior

- Clicking Analyse or a suggestion triggers a 3-second simulated loading state, then renders a hardcoded structured response
- Free-typed questions get a generic but properly formatted mock response
- Thumbs up/down toggle visual state only
- "Load previous chats" shows one hardcoded previous session
- Page navigation simulated via tabs (Targeting Analysis / Campaign / Placement) that update the context label and insert thread dividers

### What is NOT included

- No real AI/LLM integration (mock responses only)
- No data persistence (session memory only via React state)
- No Agent Mark connection
- No mic input


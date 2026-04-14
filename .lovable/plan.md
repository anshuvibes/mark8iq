

# Plan: Generate AI Summary Panel PRD Document

## What
Create a comprehensive Product Requirements Document (PRD) covering every feature, UI flow, navigation pattern, and interaction detail of the AI Summary Panel — written at the product/design level, not the code level. Output as a downloadable markdown file.

## Document Structure

The PRD will cover these sections:

1. **Product Overview** — What the AI Summary Panel is, where it lives (/dashboard/ads), and its purpose as an AI-powered analytical assistant for ad campaign management.

2. **Dashboard Layout** — The host page structure: dark top nav bar (logo, brand selector, date picker, bell, user profile, divider, Ask AI button), light sub-nav bar (marketplace tabs, view toggle, page tabs, filters), stats cards grid, data table.

3. **Panel Architecture** — Two rendering modes (inline push-and-shrink at 420px width, fixed overlay with spring animation). Panel toggle via "Ask AI" button. Panel persists state across open/close cycles.

4. **Welcome Experience** — The multi-beat animated onboarding sequence:
   - Beat 1: "Hey Satyam..." typed greeting
   - Beat 2: "I've been going through your Targeting Analysis" typed line
   - Beat 2.5: "Give me a moment" thinking state with loading dots, fades out
   - Beat 3: "Here are a few highlights" + staggered highlight cards (top 3) + "View all highlights" link
   - Beat 4: "Here are a few questions worth asking" + staggered suggestion chips (3 questions)
   - Animation plays once per session, skips on revisit

5. **Highlights System** — 5 pre-analysed data anomalies (halts). Three access points:
   - Welcome message cards with "Get Insights" buttons
   - Bottom sheet (slides up from input bar area, shows top 3 + "View all" link)
   - Full-panel list view (GSAP slide-in from right, numbered list, back arrow to return)
   - Selecting any highlight seeds the chat with a context pill and triggers AI analysis

6. **Goal FAQs System** — 5 strategic questions. Same dual-stage pattern as Highlights:
   - Bottom sheet preview (top 3 + "View all Goal FAQs")
   - Full-panel list view (GSAP animated, back arrow)
   - Selecting a FAQ seeds chat with a context pill and triggers AI response

7. **Chat Thread** — Single continuous thread with these message types:
   - **Welcome message** — Animated onboarding (described above)
   - **Context pill** — Shows the highlight/suggestion that started a query, with label "Starting from highlight/suggestion:"
   - **User bubble** — Right-aligned, rounded corners (12px top, 2px bottom-right), light grey background
   - **AI response** — Structured three-section response (Insights, Root Cause, Recommendations) with word-by-word typing animation
   - **Loading dots** — Three pulsing dots during 3-second simulated response time
   - **Error state** — Two variants: retryable (with "Try again" button) and persistent ("Still not working")
   - **Page divider** — Horizontal line with "Switched to: [page name]" when user navigates dashboard tabs
   - **Date separator** — Centered date label with horizontal rules on each side
   - **Insights list** — Numbered highlight cards with "Get Insights" buttons inline in chat
   - **Inline suggestions** — Suggestion chips that appear after the last AI response's feedback row

8. **AI Response Block** — Each AI answer contains:
   - **Insights** section header (violet, uppercase) + animated divider + typed body text
   - **Root Cause** section header + divider + typed body
   - **Recommendations** section header + divider + numbered list items (typed sequentially)
   - **Feedback row** — "Was this helpful?" with thumbs up/down (toggle states, violet for up, coral for down)
   - **Follow-up suggestions** — 2 suggestion chips appear after feedback row on the last response only
   - All content uses word-by-word typing at 25ms per word with 80ms section gaps

9. **Chat Input Bar** — Two-row layout inside a muted violet container:
   - **Context chip row** — Shows "Sharing [Page Name]" with product logo and dismiss (X) button. Dismissing shows "+ Add context" to re-enable. Persists the active dashboard page context.
   - **Input row** — Auto-growing textarea (36px to 160px), Enter to send (Shift+Enter for newline), violet border on focus
   - **Controls row** — Left: "Highlights" button (Sparkles icon) and "Goal FAQs" button (Target icon). Right: Send button (arrow up, violet when active, grey when disabled)
   - Disabled state during loading with "Generating response..." placeholder

10. **Chat History & Date Separators** — WhatsApp-style date grouping:
    - Date separators divide messages by day with horizontal rules
    - Date labels: Today, Yesterday, day names for current week, raw dates for older
    - **Sticky date pill** — Frosted glass pill floats at top of scroll area, shows only when scrolling UP through history, hides when scrolling down or at bottom
    - **Load more chats** — Button at top of thread for loading older history
    - **History loading** — When first highlight (h1) is selected on first interaction, 10 days of chat history loads with an 800ms loading spinner, then auto-scrolls to bottom

11. **Scroll Behavior** —
    - New user messages auto-scroll so the message sits at the top of the viewport
    - 75% viewport spacer at bottom of thread ensures messages can scroll to top
    - Top gradient fade (32px, white to transparent) masks content behind header
    - Bottom gradient fade (48px, white to transparent) masks content behind input bar
    - Lenis smooth scroll is disabled inside the panel (data-lenis-prevent)

12. **Page Context Awareness** —
    - Three dashboard pages: Targeting Analysis, Campaign, Placement
    - Switching pages inserts a "Switched to: [page name]" divider in the chat
    - Context notice banner appears: "You've moved to [page]. New questions will be based on this page." (dismissible)
    - Input bar context chip updates to reflect current page

13. **Navigation Entry Points Summary** —
    - "Ask AI" button in top nav → opens/closes panel
    - Welcome message highlight cards → seeds chat
    - Welcome message "View all highlights" → full highlights list
    - Welcome message suggestion chips → seeds chat
    - Input bar "Highlights" button → bottom sheet → full list
    - Input bar "Goal FAQs" button → bottom sheet → full list
    - Inline suggestion chips after AI responses → seeds follow-up
    - Free text input → sends user message

14. **Bottom Sheets** — Shared pattern for Highlights and Goal FAQs:
    - Semi-transparent backdrop overlay (15% opacity)
    - Slides up with cubic-bezier easing (0.22, 1, 0.36, 1)
    - Drag handle at top (32px wide, 3px tall pill)
    - Header with icon + title + count
    - Top 3 items as clickable cards with chevron
    - "View all" link at bottom with divider
    - Max height 70% of panel
    - Clicking backdrop dismisses

15. **Animations** —
    - Panel open: width transition 0.3s cubic-bezier (inline) or spring animation (overlay)
    - Full list views: GSAP slide-in from right (expo.out, 0.5s) with staggered item reveals (0.04s stagger)
    - Full list dismiss: GSAP slide-out to right (expo.in, 0.35s)
    - Welcome sequence: Multi-beat timed animation with word-by-word typing
    - AI responses: Sequenced section reveals with typed text and animated dividers
    - Highlight/suggestion cards: CSS opacity + translateY transitions

## Output

Single markdown file at `/mnt/documents/ai-summary-panel-prd.md`, approximately 800-1000 lines of well-structured product documentation.

## Technical Approach

Write the complete markdown content directly to the output file using a script. No external dependencies needed.


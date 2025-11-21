# Вечір при блекауті - UX Design Specification

_Created on 2025-11-20 by Vitalii_
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary

**Вечір при блекауті** is a browser-based casual 2D time-management game that transforms the Ukrainian blackout evening experience into a fun, cozy, and replayable gaming experience. Players manage an apartment during a blackout, keeping a «Затишок» (coziness) meter from dropping to zero while handling multiple time-pressured tasks.

The UX design centers around creating an intuitive, visually warm experience that makes the core gameplay loop immediately understandable: See event → Move to it → Interact → Get score/«Затишок» → Repeat.

**Core UX Principles:**
- **Instant Clarity**: Players understand what to do within 10 seconds
- **Visual Warmth**: Dark but cozy atmosphere with warm light sources
- **Immediate Feedback**: Every action has clear visual response
- **Progression Visibility**: XP, currency, and unlocks are prominently displayed
- **Cultural Authenticity**: Fully Ukrainian language and setting

---

## 1. Design System Foundation

### 1.1 Design System Choice

**Decision:** Custom 2D game UI system (no traditional web design system)

**Rationale:** 
This is a 2D browser-based game, not a traditional web application. Traditional design systems (Material UI, shadcn/ui, etc.) are optimized for forms, dashboards, and data interfaces - not game UIs. A custom game-optimized UI system provides:
- Complete visual control for the "Cozy Blackout" aesthetic
- Lightweight performance (minimal DOM elements)
- Game-specific components (HUD elements, event indicators, timers)
- Full control over animations and game feel

**Provides:**
- Custom HUD components (timer, «Затишок» bar, XP/level display, currency counter)
- Event indicator components (icons with timers)
- Game-specific buttons and panels
- Results screen components
- Shop UI components

**Customization Needs:**
- All components custom-built for game aesthetic
- CSS-based animations for performance
- Minimal JavaScript overhead for smooth gameplay

---

## 2. Core User Experience

### 2.1 Defining Experience

**Core Experience:** "See event → move to it → interact → get score/«Затишок» → repeat"

This is the defining interaction loop that players repeat throughout each 60-90 second evening session. The entire UX is optimized around making this loop as clear and satisfying as possible.

**What Makes It Unique:**
- Time-pressure mechanics (events expire if not handled)
- Multi-tasking (multiple events can be active simultaneously)
- Resource management («Затишок» meter that decays over time)
- Immediate gratification (instant feedback on every action)
- Cultural resonance (Ukrainian blackout setting)

**What Should Be Effortless:**
- Spotting new events (clear visual indicators)
- Understanding event priority (color-coded urgency)
- Moving to events (smooth, responsive controls)
- Interacting with events (single key press or click)
- Seeing progress (visible XP, currency, «Затишок» changes)

### 2.2 Experience Principles

**Speed:** Actions must feel instant - no waiting for animations or transitions during active gameplay. Visual feedback happens immediately (within 1-2 frames).

**Guidance:** Minimal hand-holding. Clear visual indicators do the teaching. First evening is tutorial-disguised-as-normal-play (slower timers, fewer events, hints appear once).

**Flexibility:** Simple controls (WASD + E) work universally. No complex button combinations. All actions achievable with keyboard-only for accessibility.

**Feedback:** Celebratory for successes (particles, sound, floating text), clear but not punishing for failures (subtle shake, visual indicator). «Затишок» changes are always visible.

---

## 3. Visual Foundation

### 3.1 Color System

**Theme Name:** "Cozy Blackout"

**Color Palette:**

**Background/Apartment:**
- Dark Night: `#1a1f2e` (main apartment background)
- Dark Grey: `#2d3442` (furniture, objects)
- Deep Blue: `#1e2740` (shadows, depth)

**Light Sources (Warm & Cozy):**
- Candle Yellow: `#f4a460` (primary light source)
- Warm Orange: `#ff8c42` (bright candles, lamps)
- Soft Glow: `#ffd700` (ambient warm light)

**UI/HUD:**
- Light Text: `#ffffff` (primary text)
- Near-White: `#f5f5f5` (secondary text)
- Accent Warm: `#ffd700` (accent for «Світлячки», highlights)
- Accent Teal: `#4ecdc4` (alternative accent, if needed)

**Semantic Colors:**
- Success: `#4caf50` (green - high «Затишок», completed events)
- Warning: `#ff9800` (orange - medium «Затишок», urgent events)
- Danger: `#f44336` (red - low «Затишок», expired events)
- Info: `#2196f3` (blue - minor events, neutral information)

**Event Priority Colors:**
- Minor Events: `#64b5f6` (soft blue - calm cat, blanket)
- Standard Events: `#fff176` (light yellow - phone, candle)
- Critical Events: `#ff8c42` (orange/red - kettle, power)

**«Затишок» Bar Gradient:**
- Low (0-33): Red `#f44336` → Orange `#ff9800`
- Medium (34-66): Orange `#ff9800` → Yellow `#ffeb3b`
- High (67-100): Yellow `#ffeb3b` → Green `#4caf50`

**Rationale:** 
The dark blues/greys create the night/blackout atmosphere, while warm yellows/oranges from light sources provide visual warmth and coziness - the emotional core of the experience. The UI uses light colors for readability against dark backgrounds, with warm accents to maintain the cozy feeling even in interface elements.

**Interactive Visualizations:**
- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

### 3.2 Typography System

**Font Families:**
- Primary (UI/Headings): System sans-serif stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- Body Text: Same system stack (consistency)
- Monospace (Optional): `"Courier New", monospace` (for timers if needed)

**Type Scale:**
- H1 (Screen Titles): 28px / 1.2 line-height / 600 weight
- H2 (Section Headers): 24px / 1.3 line-height / 600 weight
- H3 (Subsection): 20px / 1.4 line-height / 500 weight
- Body (UI Text): 16px / 1.5 line-height / 400 weight
- Small (Hints, Secondary): 14px / 1.4 line-height / 400 weight
- Tiny (Labels, Timers): 12px / 1.3 line-height / 400 weight

**Usage:**
- Headings: Screen titles, section headers in shop/results screens
- Body: Main UI text, button labels, shop descriptions
- Small: Hints, secondary information, contextual messages
- Tiny: Event timer counts, small labels, fine print

### 3.3 Spacing and Layout

**Base Unit:** 8px grid system

**Spacing Scale:**
- xs: 4px (tight spacing, between related elements)
- sm: 8px (small gaps, icon-to-text spacing)
- md: 16px (default spacing, between UI elements)
- lg: 24px (section spacing, between groups)
- xl: 32px (major sections, screen margins)
- 2xl: 48px (screen-level spacing)

**Layout Grid:**
- Game Screen: No fixed grid (flexible for apartment layout)
- UI Screens (Shop, Results): 12-column grid (max-width 1200px, centered)
- HUD: Absolute positioning with 8px padding from edges

**Container Widths:**
- Desktop: 1200px max-width (centered)
- Tablet: 90% width with 32px side margins
- Mobile: 100% width with 16px side margins

---

## 4. Design Direction

### 4.1 Chosen Design Approach

**Direction Name:** "Cozy Minimal Game UI"

**Layout Approach:**
- **Game Screen**: Full-screen gameplay area with overlay HUD (top bar + floating elements)
- **UI Screens**: Centered card-based layouts with clear hierarchy
- **Navigation**: Modal-style transitions between screens (game ↔ shop ↔ results)

**Visual Hierarchy:**
- **Dense HUD**: Information-rich but compact (all essential info visible)
- **Spacious Gameplay**: Clean apartment area with minimal UI overlay
- **Bold Primary Actions**: Large, prominent buttons (shop purchase, play again)
- **Subtle Secondary Info**: Small text, muted colors for less critical info

**Interaction Patterns:**
- **Modal Workflows**: Shop and results appear as full-screen overlays (pause game state)
- **Immediate Feedback**: No page transitions during gameplay - all feedback is inline
- **Progressive Disclosure**: First-time hints appear on first evening only

**Visual Weight:**
- **Balanced**: Clear structure with moderate visual weight
- **Soft Depth**: Subtle shadows for UI panels and cards
- **Rounded Corners**: Consistent 8px border-radius on all UI elements
- **Warm Accents**: Gold/yellow highlights for positive elements («Світлячки», XP gains)

**Rationale:**
This approach prioritizes gameplay clarity (unobstructed apartment view) while providing professional, polished UI screens for progression elements (shop, results). The dark background with warm light sources creates the cozy atmosphere, while clean UI ensures players can quickly understand their progress and options.

**Interactive Mockups:**
- Design Direction Showcase: [ux-design-directions.html](./ux-design-directions.html)

---


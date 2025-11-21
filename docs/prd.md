# Вечір при блекауті - Product Requirements Document

**Author:** Vitalii
**Date:** 2025-11-20
**Version:** 1.0

---

## Executive Summary

Вечір при блекауті is a browser-based casual 2D time-management game that transforms the familiar Ukrainian experience of an evening without electricity into a fun, cozy, and replayable gaming experience. Players manage an apartment during a blackout, keeping a «Затишок» (coziness) meter from dropping to zero while handling multiple time-pressured tasks. The game features short 60-90 second sessions, simple controls, and a clear progression system with XP, levels, in-game currency «Світлячки», customization options, and achievements.

The game positions itself not as a dramatization of blackouts, but as a celebration of the small rituals, chaos, and humor that emerge during an evening without electricity. This approach creates emotional resonance with Ukrainian players while maintaining a light, cozy, and non-offensive tone.

### What Makes This Special

**Cultural authenticity**: Fully Ukrainian language and setting, reflecting real experiences that many players have lived through. The game transforms a challenging real-world situation into a cozy, humorous experience.

**Perfect session length**: 60-90 seconds per play, ideal for quick breaks and casual gaming sessions.

**Clear progression**: XP, levels, currency, and unlockables provide tangible rewards that encourage return engagement.

**Emotional connection**: The game creates a unique emotional connection by gamifying a relatable, culturally specific experience in a respectful and entertaining way.

**Lightweight technology**: Browser-based 2D game with minimal dependencies, runs smoothly in Chrome without downloads.

---

## Project Classification

**Technical Type:** game
**Domain:** gaming
**Complexity:** low

This is a greenfield browser-based 2D game project designed for a hackathon timeframe. The game uses simple time-management mechanics with a progression system, making it accessible to casual players while demonstrating technical completeness through state management, persistence, and basic economy implementation.

The project focuses on polish over breadth - one polished apartment layout with 4-5 solid event types and a simple shop is prioritized over multiple half-baked features.

---

## Success Criteria

### Core Functionality Success
- Game is playable end-to-end: start → play evening → earn rewards → spend currency → unlock content
- All core mechanics work: movement, events, «Затишок» meter, progression
- Judges can: open link → play immediately → understand what's going on

### Progression System Success
- Progression system functional: XP, levels, currency, shop, achievements
- At least 1-2 real unlocks visible to judges (character skin, cat, or buff)
- XP and «Світлячки» counters clearly visible

### Polish & Stability Success
- No critical bugs that prevent gameplay (no character stuck, timer stops, events never clear)
- Runs smoothly in latest Chrome
- Smooth controls, readable UI, clear feedback
- Fully in Ukrainian language

### Scope Success
- 1-2 polished apartment layouts (better than many half-baked)
- 4-5 solid event types working well
- 1 simple shop with functional purchases
- Can be completed within hackathon timeframe

### Business Metrics

**Key Performance Indicators:**

1. **Session completion rate**: Percentage of started evenings that are completed (target: >80%)
2. **Return rate**: Players who come back after first session (target: >40% within 24 hours)
3. **Progression engagement**: Players who reach level 3+ (target: >60% of players)
4. **Currency usage**: Players who make at least one purchase with «Світлячки» (target: >50%)
5. **Achievement unlock rate**: Players who unlock at least one achievement (target: >70%)

---

## Product Scope

### MVP - Minimum Viable Product

**One Apartment Layout:**
- Single screen or simple 2-3 rooms
- One polished layout is better than multiple half-finished ones

**Character Movement:**
- Move with keyboard (WASD or arrow keys)
- Smooth, responsive controls
- Click or press E to interact with events

**Event Types (at least 3-4):**
- Low phone battery (plug into power bank)
- Boiling kettle (turn off)
- Candle needed or going out (light it)
- Cat stressed (calm it)

**Core Systems:**
- Evening timer (60-90 seconds)
- «Затишок» bar (visible, clear feedback)
- Scoring system: points per resolved event, penalties per failed event

**Basic Progression:**
- XP + visible level number
- «Світлячки» + very simple shop UI
- 3 shop items that can be bought:
  - 1 cosmetic (character skin)
  - 1 cosmetic (cat or candle)
  - 1 gameplay buff (e.g., +5% speed or +5 starting «Затишок»)
- At least 1 simple achievement:
  - "Evening with «Затишок» never below 50%"
  - "Resolved 10 events in one evening"
  - "Reach level 3"

**UI/UX:**
- Main gameplay screen
- Simple menu system (start, shop, achievements)
- Ukrainian language throughout
- Clear visual feedback for actions
- Simple tutorial/onboarding (first evening with tooltips)

### Growth Features (Post-MVP)

**Tier 1: Quick Wins (1-2 hours each)**
- Second unlockable item: Add one more shop item (cat or candle variant) to show variety
- Additional achievement: One more achievement badge (e.g., "Complete 5 evenings", "Keep Затишок above 70% for 3 evenings")
- Visual polish: Screen tint when «Затишок» is low, smoother animations
- Sound effects: Basic click/interaction sounds (no music needed)

**Tier 2: Enhanced Features (2-4 hours each)**
- Second apartment layout: Hard mode evening with more rooms and simultaneous events
- Event priorities system: Critical events have visual priority indicators
- More sophisticated event variations: Same event types but with slight variations (different locations, timing)
- Achievement gallery: Visual display of unlocked achievements
- Character selection: Choose between 2 characters before starting (if time for art assets)

**Tier 3: Nice-to-Have (4+ hours each)**
- Emergency events: Special challenges (dead power bank, no candles left) - adds drama
- More customization options: Additional cats, candles, decorations
- Difficulty modes: Easy/Normal/Hard selector
- Statistics screen: Track total evenings played, best score, average «Затишок»
- Tutorial skip option: For returning players

### Vision (Future)

**Extended Content:**
- Multiple locations (other buildings, cafés, co-working spaces)
- More complex apartment layouts with multiple floors
- Extended character roster with different starting stats
- Seasonal events and special evening types

**Advanced Systems:**
- Talent trees / perk systems for deeper progression
- Online leaderboards and achievements
- Social features (sharing scores, comparing progress)
- Daily challenges and special events

**Platform Expansion:**
- Mobile optimization (responsive design for tablets/phones)
- Progressive Web App (PWA) capabilities
- Offline play support

**Community Features:**
- User-generated content (custom apartment layouts)
- Community challenges
- Sharing and social integration

---

## Game Specific Requirements

### Game Mechanics

**Event Spawning:**
- Events appear every 3-4 seconds
- Max simultaneous events:
  - Level 1-2: 2 events maximum
  - Level 3-4: 3 events maximum
  - Level 5+: 4 events maximum

**Event Lifetime:**
- Each event has a countdown timer (5-10 seconds depending on difficulty)
- If event expires → lose «Затишок» and score penalty
- Visual indicator: Small icons above objects (phone, kettle, cat, candle) with circular timer

**Event Priorities:**
- **Critical Events** (kettle, power, candles):
  - Big «Затишок» penalty on failure
  - Decent reward on success
  - Higher priority in UI (more prominent indicators)
- **Soft Events** (cat, blanket):
  - Small «Затишок» penalty on failure
  - Slightly higher score bonus on success

**Win & Lose Conditions:**
- **Win Condition**: Evening timer reaches 0 while «Затишок» > 0
  - Player earns XP and «Світлячки» based on performance
- **Lose Condition**: «Затишок» hits 0 before the timer ends → evening ends early
  - Player still earns partial rewards if they made progress

**Difficulty Scaling:**
- Shorter event timers (less time to react)
- More simultaneous events (more multitasking required)
- Larger penalties for failures (steeper «Затишок» loss)
- Faster «Затишок» decay rate

### Progression & Economy

**«Затишок» Range:**
- 0-100 (starts at 60 on early levels)
- Decreases over time (decay rate)
- Increases when events are resolved successfully
- Decreases when events expire or fail

**Score System:**
- Arbitrary integer, starts at 0 each evening
- Increases with each resolved event
- Used to calculate XP at end of evening

**Event Types & Scoring:**
- **Minor Events** (nice-to-have: calm cat, bring blanket):
  - Points on resolve: +10
  - «Затишок» on resolve: +5
  - «Затишок» on failure: -5
- **Standard Events** (typical blackout tasks: charge phone, light candle):
  - Points on resolve: +15
  - «Затишок» on resolve: +8
  - «Затишок» on failure: -10
- **Critical Events** (safety/essential: turn off kettle, restore main light):
  - Points on resolve: +20
  - «Затишок» on resolve: +10
  - «Затишок» on failure: -20

**XP System:**
- XP = floor(total_score / 10) per evening
- Example: 200-point evening = 20 XP
- Level Up Formula:
  - Level 1 → 0 XP (starting level)
  - Level 2 → 100 XP
  - Level 3 → 300 XP
  - Level 4 → 600 XP

**«Світлячки» (In-Game Currency):**
- Base reward: 1 «Світлячок» for surviving (Затишок > 0 at end)
- Performance bonus: +1 if final Затишок ≥ 50
- Performance bonus: +1 if final Затишок ≥ 80
- Maximum: 3 «Світлячки» per evening (perfect run)

**Shop Items & Prices (MVP):**
- **3 items total** (sweet spot for hackathon MVP):
  1. Cosmetic (skin): New character skin - 3 «Світлячки»
  2. Cosmetic (cat/candle): New cat or fancy candle - 4 «Світлячки»
  3. Gameplay buff: Light gameplay effect (e.g., +5% speed or +5 starting «Затишок») - 5 «Світлячки»

**Level-Up Bonuses:**
- Faster movement speed
- Longer device battery life (more time before events)
- Higher starting «Затишок» value (starts at higher number)
- Slightly slower «Затишок» decay rate

### Platform Support

**Primary Platform:**
- Browser-based game (no downloads required)
- Primary target: Latest version of Google Chrome
- Optimized for desktop Chrome (e.g., width ~1280px)
- Basic responsiveness for smaller windows (mobile support is "nice to have")

**Technology Stack:**
- TypeScript + React, rendered via DOM + CSS (no heavy engine)
- Alternative: Lightweight 2D game framework/library (e.g., Phaser.js, PixiJS, or similar)
- Minimal dependencies for fast loading
- Good performance optimization for smooth gameplay

**State Management:**
- Local component state + simple context or hooks
- No Redux needed for MVP
- Keep state management simple and straightforward

**Persistence:**
- localStorage for:
  - Current level
  - Total XP
  - Amount of «Світлячки»
  - Purchased items
  - Last selected character/skin
  - Achievement progress

---

## User Experience Principles

### Overall Art Direction: "Cozy Blackout"

**Goal:** Visually, the game should look like dark, but not scary. Cozy, warm light inside a dark evening.

**Palette:**
- **Background / Apartment**: Dark blues/greys (night, blackout)
- **Light Sources** (candles, лампи, ліхтарики): Warm yellows/oranges (cozy feeling)
- **UI (HUD)**: Light, neutral (white/near-white text), with one accent color (e.g., warm yellow or soft teal)
- **Don't overcomplicate**: 3-4 main colors + some variations are enough

**Shapes & Style:**
- Simple, flat 2D shapes (no complicated pixel art)
- Soft rounded corners everywhere: panels, buttons, HUD elements → same border-radius
- Slight shadows behind popups and HUD cards to give depth

### Key Interactions

**Main Game Screen Layout (Professional HUD):**

**Top Bar:**
- **Left**: Evening timer (icon + "00:45" style)
- **Center**: «Затишок» bar:
  - Horizontal bar with gradient from red → yellow → green
  - Label inside or above: "Затишок"
- **Right**: XP & Level + «Світлячки»:
  - "Lv. 2" + small XP bar under it
  - Next to it: ✨ icon + "x 5" for «Світлячки»

**Middle (Gameplay Area):**
- The apartment itself
- Keep it relatively clean
- Avoid putting text over the play area
- All floating UI (event icons, timers) should be small and consistent

**Bottom (Optional):**
- Contextual hint / tiny tutorial messages:
  - "Підійдіть до телефону"
  - "Натисніть E, щоб взаємодіяти"

**Event UX – Making It Obvious and Satisfying:**

**Visual Signalling:**
- Icon above the object: Phone icon, kettle icon, cat icon, candle icon
- Color-coded priority (subtle, not neon):
  - Minor: soft blue
  - Standard: light yellow
  - Critical: orange/red
- Circular timer around the icon: A ring that slowly shrinks or a pie that fills

**Interaction Feedback:**

**When player resolves an event:**
- Icon: Briefly pops / scales up and fades out
- Show floating text:
  - +15 (points, in white)
  - +Затишок (maybe small green up arrow or +8)
- Maybe a tiny particle effect: A few small sparkles

**When player fails an event:**
- Icon: Shakes slightly and disappears with a "fail" color (desaturated red)
- Brief screen shake (very small)
- «Затишок» bar flashes red for ~200-300 ms

**Onboarding / First Run:**

**First-Run Overlay:**
- When the game first loads, dim everything slightly and show 3 tooltip bubbles:
  1. Over movement area: "Move with WASD / ⬆⬇⬅➡"
  2. Over your character: "Walk to glowing icons to interact"
  3. Over HUD: "Keep «Затишок» above 0 until evening ends"
- Each with a "Got it" or "Play" button

**First Evening = Tutorial in Disguise:**
- Spawn fewer events
- Give longer event timers
- Show 1-time small labels:
  - "Телефон майже розрядився"
  - "Кіт нервує"

**Results Screen:**

**Top:**
- "Вечір завершено!" or "Ви пережили вечір при блекауті ✨"

**Middle:**
- **Score**: Очки: 235
- **Затишок**: Final value + small icon
- **XP gained**: "+20 XP"
- **«Світлячки»**: "+2 ✨"
- **Animate changes**: XP bar smoothly filling from old to new

**If level up:**
- Show "Level Up! Lv. 1 → Lv. 2" with a small glow or confetti

**Bottom:**
- **Buttons**:
  - Primary: "Грати ще один вечір"
  - Secondary: "Магазин"

**Shop UX (Simple But Sexy):**

**Layout:**
- **Left side**: List/grid of items
- **Right side**: Detail of the selected item

**Top:**
- Title: "Магазин"
- «Світлячки»: ✨ x 7 (big, visible top-right)

**Main area:**
- Grid of 3 items (MVP target):
  - Each card: icon, name, price (✨ 3-5), state (Locked / Purchased / Equipped)
  - Mix: 1 cosmetic (skin), 1 cosmetic (cat/candle), 1 gameplay buff

**When you click an item:**

**Right panel:**
- Big icon/preview
- Name: e.g., "Скин: Айтішник"
- Effect (if any): "дає +5% до швидкості руху"
- Button:
  - "Купити" (if not owned and enough currency)
  - "Недостатньо світлячків" (disabled state)
  - "Обрати" (if owned but not selected)
  - "Використовується" (non-clickable)

**Micro-Animations & States:**
- **Buttons**: Hover (slightly brighter + small scale up), Active click (quick "press" animation)
- **HUD Elements**: When Затишок changes significantly (bar pulses or glows briefly), When «Світлячки» increase (small ✨ floats upward near the counter)

---

## Functional Requirements

### Core Gameplay

**FR1:** Players can move their character around the apartment using keyboard controls (WASD or arrow keys)

**FR2:** Players can interact with events by pressing E or clicking when near an event object

**FR3:** The game spawns events at regular intervals (every 3-4 seconds) with maximum simultaneous events based on player level

**FR4:** Each event displays a visual indicator (icon) above the object with a countdown timer showing time remaining

**FR5:** Events have priority levels (minor, standard, critical) that affect scoring and «Затишок» impact

**FR6:** Players can resolve events by reaching the event location and interacting with it before the timer expires

**FR7:** The game tracks and displays the «Затишок» meter (0-100) which decreases over time and changes based on event outcomes

**FR8:** The game tracks and displays the evening timer showing remaining time (60-90 seconds per evening)

**FR9:** The game calculates and displays score based on resolved events, with different point values for different event types

**FR10:** The game ends the evening when either the timer reaches 0 (win) or «Затишок» reaches 0 (lose)

### Progression System

**FR11:** Players earn XP at the end of each evening based on their total score (XP = floor(score / 10))

**FR12:** Players level up when they accumulate enough XP, with level thresholds: Level 2 (100 XP), Level 3 (300 XP), Level 4 (600 XP)

**FR13:** Players receive passive bonuses when leveling up (faster movement, longer device battery life, higher starting «Затишок», slower decay rate)

**FR14:** The game displays the player's current level and XP progress in the HUD

**FR15:** Players earn «Світлячки» currency at the end of each evening based on performance (1-3 «Світлячки» per evening)

**FR16:** The game displays the player's current «Світлячки» count in the HUD

**FR17:** Players can view and purchase items in the shop using «Світлячки»

**FR18:** The shop contains at least 3 items: 1 cosmetic character skin, 1 cosmetic item (cat/candle), and 1 gameplay buff

**FR19:** Players can equip purchased items (character skins, cosmetic items) to customize their appearance

**FR20:** Purchased gameplay buffs automatically apply their effects (e.g., +5% speed, +5 starting «Затишок»)

**FR21:** The game tracks and displays achievement progress

**FR22:** Players can unlock achievements by meeting specific conditions (e.g., "Evening with «Затишок» never below 50%", "Resolved 10 events in one evening", "Reach level 3")

**FR23:** The game displays unlocked achievements to the player

### Event System

**FR24:** The game supports at least 4 event types: low phone battery, boiling kettle, candle needed/going out, cat stressed

**FR25:** Each event type has specific interaction requirements (e.g., plug phone into power bank, turn off kettle, light candle, calm cat)

**FR26:** Events have different scoring values: minor events (+10 points), standard events (+15 points), critical events (+20 points)

**FR27:** Events have different «Затишок» impacts: minor events (+5/-5), standard events (+8/-10), critical events (+10/-20)

**FR28:** The game visually distinguishes event priorities through color coding (minor: soft blue, standard: light yellow, critical: orange/red)

**FR29:** When an event is resolved, the game provides visual feedback (icon animation, floating text showing points and «Затишок» gain)

**FR30:** When an event expires or fails, the game provides visual feedback (icon shake, screen shake, «Затишок» bar flash)

**FR31:** The game adjusts event difficulty based on player level (shorter timers, more simultaneous events, larger penalties at higher levels)

### User Interface

**FR32:** The game displays a main gameplay screen with HUD showing timer, «Затишок» bar, level, XP, and «Світлячки»

**FR33:** The game displays a results screen after each evening showing score, final «Затишок», XP gained, «Світлячки» earned, and level up notification if applicable

**FR34:** The game displays a shop screen where players can browse and purchase items

**FR35:** The game displays an achievements screen showing unlocked achievements

**FR36:** The game provides a simple menu system (start, shop, achievements)

**FR37:** The game displays contextual hints and tutorial messages during the first play session

**FR38:** The game shows a first-run overlay with tooltips explaining controls and objectives

**FR39:** The game provides visual feedback for all player actions (button hover states, click animations, state changes)

### Localization & Content

**FR40:** All game text, UI elements, and content are displayed in Ukrainian language

**FR41:** Key game terms remain in Ukrainian («Вечір при блекауті», «Світлячки», «Затишок»)

**FR42:** The game maintains a light, cozy, humorous tone throughout all content

### Data Persistence

**FR43:** The game saves player progress to localStorage (level, XP, «Світлячки», purchased items, achievements)

**FR44:** The game loads saved progress when the player returns to the game

**FR45:** The game persists the player's selected character skin and equipped items

### Technical Functionality

**FR46:** The game runs in a web browser without requiring downloads or installations

**FR47:** The game works reliably in the latest version of Google Chrome

**FR48:** The game maintains smooth frame rates (target: 60 FPS) during gameplay

**FR49:** The game loads quickly with minimal dependencies

**FR50:** The game handles player input responsively (keyboard and mouse)

---

## Non-Functional Requirements

### Performance

**NFR1:** The game must maintain a minimum frame rate of 60 FPS during active gameplay to ensure smooth character movement and event interactions

**NFR2:** The game must load and be playable within 3 seconds of opening the browser link

**NFR3:** The game must respond to player input (keyboard presses, mouse clicks) within 16ms to maintain responsive feel

**NFR4:** The game must handle up to 4 simultaneous events without performance degradation

**NFR5:** The game must use lightweight rendering (DOM + CSS or lightweight 2D framework) to minimize resource usage

### Accessibility

**NFR6:** The game must support keyboard-only navigation for all interactions (WASD/arrow keys for movement, E for interaction)

**NFR7:** The game must provide clear visual indicators for all interactive elements (events, buttons, UI elements)

**NFR8:** The game must use sufficient color contrast for text and UI elements to ensure readability

**NFR9:** The game must provide visual feedback for all actions (not relying solely on sound)

### Browser Compatibility

**NFR10:** The game must work reliably in the latest version of Google Chrome (primary target)

**NFR11:** The game must gracefully handle browser window resizing without breaking layout

**NFR12:** The game must function correctly when browser tab is inactive (pause/resume behavior)

### Data Management

**NFR13:** The game must save player progress to localStorage with debounced writes (save every 2-3 seconds) to prevent data loss

**NFR14:** The game must handle localStorage quota limits gracefully (warn user if storage is full)

**NFR15:** The game must validate loaded data from localStorage and handle corrupted or missing data gracefully

### User Experience

**NFR16:** The game must be understandable within 10 seconds for a first-time player (clear core loop, visible objectives)

**NFR17:** The game must provide clear visual feedback for all player actions (success, failure, state changes)

**NFR18:** The game must maintain consistent visual style throughout all screens (cozy blackout theme, consistent colors, rounded corners)

**NFR19:** The game must prevent blocking bugs that prevent gameplay (character stuck, timer stops, events never clear)

**NFR20:** The game must provide smooth, responsive character movement without jank or lag

### Content & Localization

**NFR21:** All game content must be in Ukrainian language with no English text in UI or gameplay

**NFR22:** The game must maintain appropriate tone (light, cozy, humorous) without offensive, political, or toxic content

**NFR23:** The game must respect cultural sensitivity by focusing on cozy, humorous aspects rather than dramatizing hardships

---

## References

**Source Documents:**
- Product Brief: `docs/product-brief-hackathon-game-2025-11-20.md`

---

_This PRD captures the essence of Вечір при блекауті - a cozy, culturally authentic time-management game that transforms the blackout evening experience into an engaging, replayable gaming experience with clear progression and rewards._

_Created through collaborative discovery between Vitalii and AI facilitator._


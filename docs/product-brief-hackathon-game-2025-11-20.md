# Product Brief: Вечір при блекауті

**Date:** 2025-11-20
**Author:** Vitalii
**Context:** Greenfield game project

---

## Executive Summary

Вечір при блекауті is a browser-based casual 2D time-management game that transforms the familiar Ukrainian experience of an evening without electricity into a fun, cozy, and replayable gaming experience. Players manage an apartment during a blackout, keeping a «Затишок» (coziness) meter from dropping to zero while handling multiple time-pressured tasks. The game features short 60-90 second sessions, simple controls, and a clear progression system with XP, levels, in-game currency «Світлячки», customization options, and achievements. Built for Ukrainian-speaking casual players who want a light, humorous take on a relatable real-life situation.

**Positioning Statement:** The game is not about the fear or drama of blackouts, but about the small rituals, chaos, and humor of an evening without electricity.

---

## Core Vision

### Problem Statement

Casual browser game players often struggle to find games that are:
- Quick to play (under 2 minutes per session)
- Emotionally resonant with familiar, relatable contexts
- Rewarding with clear progression and unlockable content
- Technically lightweight and accessible (no downloads, works in browser)
- Culturally specific rather than generic

For Ukrainian-speaking players specifically, there's a gap in games that authentically reflect their cultural context and experiences. The blackout evening scenario is deeply familiar to many Ukrainians, yet hasn't been gamified in a way that's both respectful and entertaining.

### Proposed Solution

Вечір при блекауті turns the blackout evening experience into a 2D time-management game where players:
- Control a character moving around an apartment during a blackout
- React to time-sensitive events (low phone battery, boiling kettle, stressed cat, requests for candles/blankets/flashlights)
- Maintain a «Затишок» (coziness) meter that must not drop to zero
- Complete short 60-90 second sessions representing one evening
- Earn XP to level up and unlock passive bonuses
- Collect «Світлячки» currency to purchase customization items
- Unlock achievements and new content through progression

The game uses a recognizable Ukrainian setting to create emotional resonance while keeping gameplay simple, accessible, and rewarding.

### Key Differentiators

- **Cultural authenticity**: Fully Ukrainian language and setting, reflecting real experiences
- **Emotional connection**: Transforms a challenging real-world situation into a cozy, humorous game
- **Perfect session length**: 60-90 seconds per play, ideal for quick breaks
- **Clear progression**: XP, levels, currency, and unlockables provide tangible rewards
- **Lightweight technology**: Browser-based 2D game with minimal dependencies, runs smoothly in Chrome
- **Non-toxic content**: Light, cozy, humorous tone without offensive content

---

## Target Users

### Primary Users

**Casual browser game players** who:
- Enjoy simple, quick time-killer games
- Want games that work instantly in a browser (no downloads)
- Prefer short sessions (1-3 minutes) over long gaming sessions
- Value clear progression and unlockable rewards
- Appreciate games with personality and cultural context

**Ukrainian-speaking users** who:
- Recognize and relate to the blackout evening context
- Want games that reflect their cultural experiences
- Appreciate Ukrainian language content in gaming
- Find humor and warmth in familiar situations

**Typical use case:**
Open a link in the browser → play 1–3 short evenings (60-90 seconds each) → earn XP and «Світлячки» → unlock something new (character, customization, achievement) → come back later to try to beat previous results or unlock more content.

### User Journey

1. **Discovery**: User finds the game link (social media, word of mouth, game portal)
2. **First play**: Opens in browser, sees simple tutorial, plays first evening
3. **Learning**: Understands core mechanics (movement, tasks, «Затишок» meter) within first session
4. **Progression**: Completes evenings, earns XP, levels up, unlocks bonuses
5. **Customization**: Spends «Світлячки» on characters, cats, candles, decorations
6. **Achievement hunting**: Works toward specific achievements (badges)
7. **Return engagement**: Comes back to unlock more, beat high scores, try different characters

---

## Success Metrics

### Business Objectives

- **Technical stability**: Game runs smoothly in latest Chrome with no critical bugs
- **Performance**: Lightweight implementation with good frame rates
- **Completeness**: Minimal but complete set of levels and features for hackathon scope
- **Cultural authenticity**: Fully Ukrainian language and setting implemented correctly

### Key Performance Indicators

1. **Session completion rate**: Percentage of started evenings that are completed (target: >80%)
2. **Return rate**: Players who come back after first session (target: >40% within 24 hours)
3. **Progression engagement**: Players who reach level 3+ (target: >60% of players)
4. **Currency usage**: Players who make at least one purchase with «Світлячки» (target: >50%)
5. **Achievement unlock rate**: Players who unlock at least one achievement (target: >70%)

---

## Core Gameplay Loop (Hackathon Priorities)

**Top Priority: Clear, Fun Core Loop**

The game must be understandable in under 10 seconds for a judge. The core loop is:

**"See event → move to it → interact → get score/Затишок → repeat."**

**Top Priority: Visible, Working Progression & Rewards**

- XP + level indicator (clearly visible)
- Counter for «Світлячки» (in-game currency)
- At least 1–2 real unlocks (e.g., a new character skin or buff) so judges see progression, not just read about it

**Top Priority: Polish Over Breadth**

Better: one apartment, 4–5 solid event types, 1 simple shop  
than many half-baked modes or screens.

- Smooth controls, readable UI, clear feedback (small animations/flash, sound, or color change) when you succeed/fail
- No blocking bugs (e.g., character stuck, timer stops, events never clear)
- Judges must be able to: open link → play immediately → understand what's going on

---

## Game Mechanics & Event System

### Event Spawning

- **Spawn interval**: Events appear every 3–4 seconds
- **Max simultaneous events**:
  - Level 1–2: 2 events maximum
  - Level 3–4: 3 events maximum
  - Level 5+: 4 events maximum

### Event Lifetime

- Each event has a countdown timer (5–10 seconds depending on difficulty)
- If event expires → lose «Затишок» and score penalty
- Visual indicator: Small icons above objects (phone, kettle, cat, candle) with circular timer

### Event Priorities

**Critical Events** (kettle, power, candles):
- Big «Затишок» penalty on failure
- Decent reward on success
- Higher priority in UI (more prominent indicators)

**Soft Events** (cat, blanket):
- Small «Затишок» penalty on failure
- Slightly higher score bonus on success

### Win & Lose Conditions

**Win Condition:**
- Evening timer reaches 0 while «Затишок» > 0
- Player earns XP and «Світлячки» based on performance

**Lose Condition:**
- «Затишок» hits 0 before the timer ends → evening ends early
- Player still earns partial rewards if they made progress

### Difficulty Scaling

Difficulty increases by:
- Shorter event timers (less time to react)
- More simultaneous events (more multitasking required)
- Larger penalties for failures (steeper «Затишок» loss)
- Faster «Затишок» decay rate

---

## Progression & Economy

### Why Progression System Matters (For Hackathon Judges)

The progression system is explicitly required by hackathon criteria. It demonstrates:
- **Engagement design**: Shows thought about player retention, not just a one-off toy
- **Technical completeness**: State management, persistence, basic economy implementation
- **Visible "wow" factor**: Judges can see "I did better than last time" and "I unlocked something"
- **Product potential**: Signals this could expand into a real product

**Primary value**: Engagement design (game feels complete & sticky)  
**Secondary value**: Technical completeness (state management, persistence, basic economy)

### Core Scales

**«Затишок» Range:**
- 0–100 (starts at 60 on early levels)
- Decreases over time (decay rate)
- Increases when events are resolved successfully
- Decreases when events expire or fail

**Score:**
- Arbitrary integer, starts at 0 each evening
- Increases with each resolved event
- Used to calculate XP at end of evening

### Event Types & Scoring

Events are grouped into 3 tiers with different point values and «Затишок» impacts:

**Minor Events** (nice-to-have: calm cat, bring blanket):
- Points on resolve: +10
- «Затишок» on resolve: +5
- «Затишок» on failure: -5

**Standard Events** (typical blackout tasks: charge phone, light candle):
- Points on resolve: +15
- «Затишок» on resolve: +8
- «Затишок» on failure: -10

**Critical Events** (safety/essential: turn off kettle, restore main light):
- Points on resolve: +20
- «Затишок» on resolve: +10
- «Затишок» on failure: -20

This creates clear risk/reward: ignoring critical events hurts significantly, while resolving them provides substantial rewards.

### XP System

**XP Calculation:**
- XP = floor(total_score / 10) per evening
- Example: 200-point evening = 20 XP

**Level Up Formula:**
- Level 1 → 0 XP (starting level)
- Level 2 → 100 XP
- Level 3 → 300 XP
- Level 4 → 600 XP

This scaling ensures:
- Judges can hit Level 2 easily (within 2–3 evenings)
- Potential to see Level 3 if they play 3–4 runs
- Enough progression to demonstrate the system works

### «Світлячки» (In-Game Currency)

**Earning «Світлячки» per evening:**
- Base reward: 1 «Світлячок» for surviving (Затишок > 0 at end)
- Performance bonus: +1 if final Затишок ≥ 50
- Performance bonus: +1 if final Затишок ≥ 80
- Maximum: 3 «Світлячки» per evening (perfect run)

**Earning Examples:**
- Bad but survived evening → 1 «Світлячок»
- Decent evening (Затишок ≥ 50) → 2 «Світлячки»
- Great evening (Затишок ≥ 80) → 3 «Світлячки»

**Shop Items & Prices (MVP):**

**Target: 3 items total** (sweet spot for hackathon MVP)

**Why 3 items?**
- **2 items**: Looks a bit empty/prototype-y. Judges might feel: "Nice, but this shop is barely used."
- **3 items**: Feels like a real list, not a placeholder. Still very easy to implement and balance. You can show variety.
- **4–6 items**: Starts to add content pressure (icons, texts, balancing). Risk: you'll spend time filling the shop instead of polishing the core loop.

**Recommended Mix (3 items):**
1. **Cosmetic (skin)**: New character skin - 3 «Світлячки»
2. **Cosmetic (cat/candle)**: New cat or fancy candle - 4 «Світлячки»
3. **Gameplay buff**: Light gameplay effect (e.g., +5% speed or +5 starting «Затишок») - 5 «Світлячки»

**Pricing Strategy:**
- All 3 items are buyable within 2–4 runs (with our «Світлячки» earning rules)
- At least 1 item has a visible gameplay effect (buff) so judges see it's not purely cosmetic
- Progressive pricing (3 → 4 → 5) creates a sense of progression

**Example Purchase Path:**
- Run 1: Earn 2 «Світлячки» (decent evening)
- Run 2: Earn 2 «Світлячки» → Total: 4 → Can buy character skin (3) or cat (4)
- Run 3: Earn 2 «Світлячки» → Total: 3+ → Can buy remaining items
- Run 4: Earn 2–3 «Світлячки» → Can buy gameplay buff (5)

This ensures judges can experience the full shop economy within a reasonable play session.

### Level-Up Bonuses

When player levels up, they unlock passive bonuses:
- Faster movement speed
- Longer device battery life (more time before events)
- Higher starting «Затишок» value (starts at higher number)
- Slightly slower «Затишок» decay rate

### Level-Up Feedback UX

**During Gameplay (Non-Blocking):**
- No intrusive modal (don't interrupt the evening)
- Small floating text near character or top HUD:
  - "+15" for score
  - Tiny "+Затишок" effect when resolving events
- Level badge in HUD (e.g., "Lv. 2"):
  - Quick pulse animation on level-up
  - Tiny glow for 1 second

**On End-of-Evening Result Screen:**
- If level changed, show "Level Up!" section:
  - "Level: 1 → 2" (clear progression display)
  - XP bar animates from old to new value
  - Optional small confetti or highlight effect
- This celebration is essential for judges to notice the progression

---

## Visual Style & UX Design

### Overall Art Direction: "Cozy Blackout"

**Goal:** Visually, the game should look like dark, but not scary. Cozy, warm light inside a dark evening.

**Palette:**
- **Background / Apartment**: Dark blues/greys (night, blackout)
- **Light Sources** (candles, лампи, ліхтарики): Warm yellows/oranges (cozy feeling)
- **UI (HUD)**: Light, neutral (white/near-white text), with one accent color (e.g., warm yellow or soft teal)
- **Don't overcomplicate**: 3–4 main colors + some variations are enough

**Shapes & Style:**
- Simple, flat 2D shapes (no complicated pixel art)
- Soft rounded corners everywhere: panels, buttons, HUD elements → same border-radius
- Slight shadows behind popups and HUD cards to give depth

### Main Game Screen Layout (Professional HUD)

**Think in zones, so it's clean and readable:**

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

This three-part structure (top HUD, center gameplay, bottom hints) feels very "real game" and impresses judges.

### Event UX – Making It Obvious and Satisfying

Events (phone low battery, kettle, cat, candle) are the core interaction. They must be easy to spot, easy to understand, and satisfying when resolved.

**Visual Signalling:**

For each event:
- **Icon above the object**: Phone icon, kettle icon, cat icon, candle icon
- **Color-coded priority** (subtle, not neon):
  - Minor: soft blue
  - Standard: light yellow
  - Critical: orange/red
- **Circular timer around the icon**: A ring that slowly shrinks or a pie that fills

So judges see: "Ah, something is happening THERE, and I see how long I have."

**Interaction Feedback:**

**When player resolves an event:**
- **Icon**: Briefly pops / scales up and fades out
- **Show floating text**:
  - +15 (points, in white)
  - +Затишок (maybe small green up arrow or +8)
- **Maybe a tiny particle effect**: A few small sparkles

**When player fails an event:**
- **Icon**: Shakes slightly and disappears with a "fail" color (desaturated red)
- **Brief screen shake** (very small)
- **«Затишок» bar flashes red** for ~200–300 ms

That kind of micro-feedback is cheap to implement but feels very polished.

### Onboarding / First Run

Judges will likely see your game for the first time, under time pressure. You want them to "get it" in 5 seconds.

**First-Run Overlay:**

When the game first loads, dim everything slightly and show 3 tooltip bubbles:

1. **Over movement area**: "Move with WASD / ⬆⬇⬅➡"
2. **Over your character**: "Walk to glowing icons to interact"
3. **Over HUD**: "Keep «Затишок» above 0 until evening ends"

Each with a "Got it" or "Play" button.

**First Evening = Tutorial in Disguise:**
- Spawn fewer events
- Give longer event timers
- You can also show 1-time small labels:
  - "Телефон майже розрядився"
  - "Кіт нервує"

After the 1st evening, show a results screen (see below) that explains XP and «Світлячки».

### Results Screen (Where You Really Impress Judges)

After each evening, show a clean summary panel:

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

Judges love:
- A sense of closure (what happened)
- A sense of progress (what changed)
- A clear CTA (what to do next)

### Shop UX (Simple But Sexy)

You don't need a huge shop. You need a beautiful, simple one.

**Layout:**

**Left side**: List/grid of items  
**Right side**: Detail of the selected item

**Example:**

**Top:**
- Title: "Магазин"
- «Світлячки»: ✨ x 7 (big, visible top-right)

**Main area:**
- Grid of 3 items (MVP target):
  - Each card: icon, name, price (✨ 3–5), state (Locked / Purchased / Equipped)
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

**Visual Polish:**
- Use consistent card design: same padding, same radius, same hover effect (slight scale + shadow)
- On purchase:
  - Quick currency counter animation (7 → 4), maybe with small "-3 ✨" floating near the price
  - Card gets a small checkmark

This screams "proper game" with 3 well-designed items that show variety (cosmetic + gameplay impact).

### Micro-Animations & States (Cheap But Powerful)

A few tiny touches go a long way:

**Buttons:**
- **Hover**: Slightly brighter + small scale up (e.g., 1.03)
- **Active click**: Quick "press" animation (scale down then back)

**HUD Elements:**
- **When Затишок changes significantly**: Bar pulses or glows briefly
- **When «Світлячки» increase**: Small ✨ floats upward near the counter

Use CSS transitions or simple JS animations; keep it subtle.

### Sound (If You Have Time)

Even minimal sound adds a lot:
- Soft click sound on button press
- Calm, low-volume ambient loop (rain outside, soft room hum)
- Tiny "success" sound for resolved event
- Soft "uh-oh" sound for failed event or low Затишок warning

**Important:** Add a mute button in the settings or corner of HUD. Judges appreciate that.

### UX Priorities Checklist (For Hackathon)

If you run out of time, apply this priority order:

1. ✅ **Readable HUD** (timer, Затишок, XP, «Світлячки»)
2. ✅ **Clear event indicators** (icons + timer + priority color)
3. ✅ **Results screen** with XP + currency + level up
4. ✅ **Simple shop** with 3 items (1 cosmetic skin, 1 cosmetic cat/candle, 1 gameplay buff)
5. ✅ **Basic onboarding overlay**
6. ✅ **Micro-animations & sounds** (if time remains)

---

## Onboarding & Tutorial

### First Evening (Tutorial)

**Reduced difficulty:**
- Fewer events (1–2 maximum)
- Slower timers (more time to react)
- Slower «Затишок» decay

**Tooltips overlay (one-time, dismissible):**
- "Move with WASD / arrow keys"
- "Press E / click to interact"
- "Keep your «Затишок» above 0 until the evening ends"
- Visual arrows pointing to:
  - Controls (Move, Interact)
  - «Затишок» bar
  - Timer

### After First Evening

**Result Screen:**
- **Performance Summary:**
  - "You earned X XP and Y «Світлячки»"
  - Final score display
  - Final «Затишок» percentage
- **Level-Up Celebration (if applicable):**
  - "Level: 1 → 2" (clear progression display)
  - XP bar animates from old to new value
  - Optional small confetti or highlight effect
- **Unlock Notification:**
  - "New unlock available!" (if shop item can be purchased)
- **Action Buttons:**
  - "Shop" (if «Світлячки» available)
  - "Play again"

This demonstrates thoughtful UX, not just mechanics.

---

## MVP Scope

### Must-Have for Hackathon

**One Apartment Layout:**
- Single screen or simple 2–3 rooms
- One polished layout is better than multiple half-finished ones

**Character Movement:**
- Move with keyboard (WASD or arrow keys)
- Smooth, responsive controls
- Click or press E to interact with events

**Event Types (at least 3–4):**
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

### Nice-to-Have (If Time Allows)

- Slightly harder "second layout" or "hard mode evening"
- More sophisticated priorities and event variations
- Small visual effects (screen tint when «Затишок» is low)
- Additional character skins (beyond the 3 MVP items)
- More achievements (2–3 total)
- Sound effects (optional, not critical)

### Should NOT Be in MVP (Easy to Drop)

- Multiple locations (other buildings, cafés, co-working)
- Very complex talent trees / perk systems
- Online leaderboards, accounts, backend
- Mobile optimization (Chrome desktop focus for MVP)
- Advanced emergency events (dead power bank, no candles left) - can be added post-MVP
- Extensive character roster (beyond 1–2 for MVP)
- Complex apartment layouts (beyond 1–2 for MVP)
- Social features (leaderboards, sharing)
- Music (sound effects are nice-to-have, music is out of scope)
- Advanced analytics beyond basic metrics

### MVP Success Criteria

**Core Functionality:**
- Game is playable end-to-end: start → play evening → earn rewards → spend currency → unlock content
- All core mechanics work: movement, events, «Затишок» meter, progression
- Judges can: open link → play immediately → understand what's going on

**Progression System:**
- Progression system functional: XP, levels, currency, shop, achievements
- At least 1–2 real unlocks visible to judges (character skin, cat, or buff)
- XP and «Світлячки» counters clearly visible

**Polish & Stability:**
- No critical bugs that prevent gameplay (no character stuck, timer stops, events never clear)
- Runs smoothly in latest Chrome
- Smooth controls, readable UI, clear feedback
- Fully in Ukrainian language

**Scope:**
- 1–2 polished apartment layouts (better than many half-baked)
- 4–5 solid event types working well
- 1 simple shop with functional purchases
- Can be completed within hackathon timeframe

### Post-MVP Hackathon Extensions

**If Time Allows (Priority Order):**

**Tier 1: Quick Wins (1-2 hours each)**
- **Second unlockable item**: Add one more shop item (cat or candle variant) to show variety
- **Additional achievement**: One more achievement badge (e.g., "Complete 5 evenings", "Keep Затишок above 70% for 3 evenings")
- **Visual polish**: Screen tint when «Затишок» is low, smoother animations
- **Sound effects**: Basic click/interaction sounds (no music needed)

**Tier 2: Enhanced Features (2-4 hours each)**
- **Second apartment layout**: Hard mode evening with more rooms and simultaneous events
- **Event priorities system**: Critical events have visual priority indicators
- **More sophisticated event variations**: Same event types but with slight variations (different locations, timing)
- **Achievement gallery**: Visual display of unlocked achievements
- **Character selection**: Choose between 2 characters before starting (if time for art assets)

**Tier 3: Nice-to-Have (4+ hours each)**
- **Emergency events**: Special challenges (dead power bank, no candles left) - adds drama
- **More customization options**: Additional cats, candles, decorations
- **Difficulty modes**: Easy/Normal/Hard selector
- **Statistics screen**: Track total evenings played, best score, average «Затишок»
- **Tutorial skip option**: For returning players

**Should NOT Attempt (Too Complex for Hackathon):**
- Multiple locations (other buildings, cafés)
- Complex talent trees / perk systems
- Online leaderboards or backend
- Mobile optimization (focus on desktop Chrome)
- Social features (sharing, multiplayer)
- Music composition (sound effects are enough)
- Story mode or narrative elements

**Decision Framework:**
- If you have 2-3 extra hours: Add Tier 1 items
- If you have 4-6 extra hours: Add Tier 1 + Tier 2 items
- If you have 8+ extra hours: Consider Tier 3, but prioritize polish over new features

**Remember**: One polished feature beats three half-finished ones. Better to have a perfect MVP than an incomplete extended version.

---

## Technical Preferences

**Platform:**
- Browser-based game (no downloads required)
- Primary target: Latest version of Google Chrome
- Optimized for desktop Chrome (e.g., width ~1280px)
- Basic responsiveness for smaller windows (mobile support is "nice to have")

**Technology Stack:**
- **Example approach**: TypeScript + React, rendered via DOM + CSS (no heavy engine)
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

**Technical Requirements:**
- Stable, bug-free core gameplay
- Responsive controls (keyboard/mouse)
- Smooth frame rates (target: 60 FPS)
- Fast load times
- No critical performance issues
- No blocking bugs (character stuck, timer stops, events never clear)

**Integration:**
- Standalone game (no backend required for MVP)
- No server-side components
- All data stored locally in browser

---

## Constraints & Requirements

**Platform & Technical:**
- Must be browser-based
- Must work reliably in latest Google Chrome
- Technically lightweight (2D graphics, minimal dependencies)
- Good performance with no critical bugs

**Language & Content:**
- Fully in Ukrainian (game, UI, all texts)
- Key terms remain in Ukrainian («Вечір при блекауті», «Світлячки», «Затишок»)
- No sexism, racism, politics, or toxic content
- Tone: light, cozy, humorous, non-offensive
- **Positioning**: The game is not about the fear or drama of blackouts, but about the small rituals, chaos, and humor of an evening without electricity

**Game Design:**
- Must include clear reward/progression system (XP, levels, currency, unlocks, achievements)
- Must be easy to understand (simple controls, short learning curve, quick restart)
- Short sessions (60-90 seconds per evening)

**Scope / Hackathon Constraints:**
- Designed to be buildable within hackathon timeframe
- Minimal but complete set of levels
- One main gameplay screen + simple menus
- Basic but functional implementation of XP, «Світлячки», and customization/achievements

---

## Risks and Assumptions

**Key Assumptions:**
- Players will find the blackout theme relatable and engaging
- Short 60-90 second sessions will encourage replay
- Progression system (XP, currency, unlocks) will drive return engagement
- Ukrainian language and cultural context will resonate with target audience
- Browser-based 2D game can be built within hackathon timeframe

**Potential Risks:**
- **Scope creep**: Feature set might expand beyond hackathon capacity
  - *Mitigation*: Strict MVP definition, prioritize core gameplay loop
- **Technical complexity**: Game mechanics might be more complex than anticipated
  - *Mitigation*: Start with simplest possible implementation, iterate
- **Performance issues**: Browser performance might not meet targets
  - *Mitigation*: Use lightweight framework, optimize early, test frequently
- **Cultural sensitivity**: Need to ensure respectful, non-offensive treatment of blackout theme
  - *Mitigation*: Focus on cozy, humorous tone; avoid making light of real hardships
- **Time constraints**: Hackathon deadline might limit polish
  - *Mitigation*: Prioritize playable core over polish; MVP mindset

**Technical State Structure:**
```typescript
interface GameState {
  player: {
    level: number;
    xp: number;
    svitlyachky: number;
    unlockedItems: string[];
  };
  currentEvening: {
    coziness: number;        // 0-100
    timeRemaining: number;   // seconds
    score: number;           // points earned
    activeEvents: Event[];    // currently active events
  };
}

interface Event {
  id: string;
  type: 'minor' | 'standard' | 'critical';
  eventType: 'phone' | 'kettle' | 'cat' | 'candle' | 'blanket';
  location: { x: number; y: number };
  timer: number;            // seconds remaining
  points: number;           // points if resolved
  cozinessReward: number;   // «Затишок» gain if resolved
  cozinessPenalty: number;  // «Затишок» loss if failed
}
```

**Resolved Technical Decisions:**
- Stack: TypeScript + React + CSS (DOM rendering) - no heavy game engine
- State management: `useState` + `useContext` (no Redux)
- Game loop: `requestAnimationFrame` or `setInterval` (60ms = ~16fps, fine for this)
- Persistence: localStorage with debounced writes (save every 2-3 seconds)
- Character movement: CSS `transform: translate()` - no physics engine
- Collision detection: Distance-based (if needed for interactions)

---

_This Product Brief captures the vision and requirements for Вечір при блекауті._

_It was created through collaborative discovery and reflects the unique needs of this greenfield game project._

_Next: Use the PRD workflow to create detailed product requirements from this brief._


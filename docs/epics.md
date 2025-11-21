# hackathon-game - Epic Breakdown

**Author:** Vitalii
**Date:** 2025-11-21
**Project Level:** game
**Target Scale:** hackathon

---

## Overview

This document provides the complete epic and story breakdown for hackathon-game, decomposing the requirements from the [PRD](./prd.md) into implementable stories.

**Living Document Notice:** This epic breakdown incorporates context from PRD, UX Design Specification, and Architecture documents to provide detailed, actionable stories for implementation.

**Epic Summary:**

This game project is organized into 5 epics that deliver incremental user value. UI work starts early and is interleaved with gameplay. Ukrainian localization and polish are added incrementally as features are built.

1. **Foundation** - Project setup and core infrastructure (necessary exception for greenfield project)
2. **Core Gameplay** - Character movement, event system, and core game loop (with early UI components)
3. **Progression System** - XP, levels, currency, shop, and achievements
4. **User Interface & Experience** - Screens, menus, onboarding, and visual feedback
5. **Final Polish & Integration** - Remaining polish, accessibility, and end-to-end testing

**Refinement Notes:**
- UI components (HUD) are built early alongside gameplay for faster iteration
- Ukrainian text is added incrementally as each feature is completed
- Visual polish is applied incrementally, not all at the end
- Stories are sized for single dev agent completion (bite-sized, focused)
- All stories include detailed BDD acceptance criteria with implementation specifics

---

## Functional Requirements Inventory

**Core Gameplay (FR1-FR10):**
- FR1: Players can move their character around the apartment using keyboard controls (WASD or arrow keys)
- FR2: Players can interact with events by pressing E or clicking when near an event object
- FR3: The game spawns events at regular intervals (every 3-4 seconds) with maximum simultaneous events based on player level
- FR4: Each event displays a visual indicator (icon) above the object with a countdown timer showing time remaining
- FR5: Events have priority levels (minor, standard, critical) that affect scoring and «Затишок» impact
- FR6: Players can resolve events by reaching the event location and interacting with it before the timer expires
- FR7: The game tracks and displays the «Затишок» meter (0-100) which decreases over time and changes based on event outcomes
- FR8: The game tracks and displays the evening timer showing remaining time (60-90 seconds per evening)
- FR9: The game calculates and displays score based on resolved events, with different point values for different event types
- FR10: The game ends the evening when either the timer reaches 0 (win) or «Затишок» reaches 0 (lose)

**Progression System (FR11-FR23):**
- FR11: Players earn XP at the end of each evening based on their total score (XP = floor(score / 10))
- FR12: Players level up when they accumulate enough XP, with level thresholds: Level 2 (100 XP), Level 3 (300 XP), Level 4 (600 XP)
- FR13: Players receive passive bonuses when leveling up (faster movement, longer device battery life, higher starting «Затишок», slower decay rate)
- FR14: The game displays the player's current level and XP progress in the HUD
- FR15: Players earn «Світлячки» currency at the end of each evening based on performance (1-3 «Світлячки» per evening)
- FR16: The game displays the player's current «Світлячки» count in the HUD
- FR17: Players can view and purchase items in the shop using «Світлячки»
- FR18: The shop contains at least 3 items: 1 cosmetic character skin, 1 cosmetic item (cat/candle), and 1 gameplay buff
- FR19: Players can equip purchased items (character skins, cosmetic items) to customize their appearance
- FR20: Purchased gameplay buffs automatically apply their effects (e.g., +5% speed, +5 starting «Затишок»)
- FR21: The game tracks and displays achievement progress
- FR22: Players can unlock achievements by meeting specific conditions (e.g., "Evening with «Затишок» never below 50%", "Resolved 10 events in one evening", "Reach level 3")
- FR23: The game displays unlocked achievements to the player

**Event System (FR24-FR31):**
- FR24: The game supports at least 4 event types: low phone battery, boiling kettle, candle needed/going out, cat stressed
- FR25: Each event type has specific interaction requirements (e.g., plug phone into power bank, turn off kettle, light candle, calm cat)
- FR26: Events have different scoring values: minor events (+10 points), standard events (+15 points), critical events (+20 points)
- FR27: Events have different «Затишок» impacts: minor events (+5/-5), standard events (+8/-10), critical events (+10/-20)
- FR28: The game visually distinguishes event priorities through color coding (minor: soft blue, standard: light yellow, critical: orange/red)
- FR29: When an event is resolved, the game provides visual feedback (icon animation, floating text showing points and «Затишок» gain)
- FR30: When an event expires or fails, the game provides visual feedback (icon shake, screen shake, «Затишок» bar flash)
- FR31: The game adjusts event difficulty based on player level (shorter timers, more simultaneous events, larger penalties at higher levels)

**User Interface (FR32-FR39):**
- FR32: The game displays a main gameplay screen with HUD showing timer, «Затишок» bar, level, XP, and «Світлячки»
- FR33: The game displays a results screen after each evening showing score, final «Затишок», XP gained, «Світлячки» earned, and level up notification if applicable
- FR34: The game displays a shop screen where players can browse and purchase items
- FR35: The game displays an achievements screen showing unlocked achievements
- FR36: The game provides a simple menu system (start, shop, achievements)
- FR37: The game displays contextual hints and tutorial messages during the first play session
- FR38: The game shows a first-run overlay with tooltips explaining controls and objectives
- FR39: The game provides visual feedback for all player actions (button hover states, click animations, state changes)

**Localization & Content (FR40-FR42):**
- FR40: All game text, UI elements, and content are displayed in Ukrainian language
- FR41: Key game terms remain in Ukrainian («Вечір при блекауті», «Світлячки», «Затишок»)
- FR42: The game maintains a light, cozy, humorous tone throughout all content

**Data Persistence (FR43-FR45):**
- FR43: The game saves player progress to localStorage (level, XP, «Світлячки», purchased items, achievements)
- FR44: The game loads saved progress when the player returns to the game
- FR45: The game persists the player's selected character skin and equipped items

**Technical Functionality (FR46-FR50):**
- FR46: The game runs in a web browser without requiring downloads or installations
- FR47: The game works reliably in the latest version of Google Chrome
- FR48: The game maintains smooth frame rates (target: 60 FPS) during gameplay
- FR49: The game loads quickly with minimal dependencies
- FR50: The game handles player input responsively (keyboard and mouse)

---

## FR Coverage Map

**Epic 1: Foundation**
- Infrastructure needs for all FRs
- Project setup, build system, core dependencies
- Enables all subsequent development

**Epic 2: Core Gameplay**
- FR1-FR10: Core gameplay mechanics
- FR24-FR31: Event system implementation
- FR46-FR50: Technical functionality (game loop, input handling, performance)

**Epic 3: Progression System**
- FR11-FR23: XP, levels, currency, shop, achievements
- FR43-FR45: Data persistence for progression data

**Epic 4: User Interface & Experience**
- FR32-FR39: All UI screens, HUD, menus, onboarding
- FR40-FR42: Ukrainian language integration (UI text)

**Epic 5: Final Polish & Integration**
- FR40-FR42: Complete Ukrainian localization (all content)
- Visual polish, animations, accessibility
- Final integration and testing

---

## Epic 1: Foundation

**Goal:** Establish project infrastructure, build system, and core dependencies to enable all subsequent development work. This epic creates the technical foundation that all other epics depend on.

### Story 1.1: Project Setup and Initialization

As a developer,
I want a properly configured React + TypeScript project with Vite,
So that I have a solid foundation for building the game.

**Acceptance Criteria:**

**Given** a new project directory
**When** I run the project initialization commands
**Then** the project is created with:
- Vite build tool configured for React + TypeScript
- TypeScript strict mode enabled
- Basic project structure (src/, public/, config files)
- Development server runs on `npm run dev`
- Build command produces optimized output in `dist/`

**And** the project structure follows the architecture document:
- `src/components/` for React components
- `src/core/` for game logic
- `src/hooks/` for custom React hooks
- `src/contexts/` for React Context providers
- `src/types/` for TypeScript type definitions
- `src/utils/` for utility functions
- `src/styles/` for CSS files

**And** TypeScript configuration includes:
- `"strict": true` for type safety
- `"target": "ES2020"` for modern JavaScript
- `"module": "ESNext"` for ES modules
- `"jsx": "react-jsx"` for React JSX transform

**Prerequisites:** None (first story)

**Technical Notes:**
- Use `npm create vite@latest hackathon-game -- --template react-ts`
- Verify Node.js 20 LTS is installed
- Follow architecture document section "Project Initialization"
- Ensure Vite dev server runs without errors
- Test that hot module replacement (HMR) works

### Story 1.2: Core Type Definitions

As a developer,
I want TypeScript type definitions for game state, events, and progression,
So that I have type safety throughout the codebase.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I create type definition files
**Then** the following types are defined in `src/types/`:
- `game.ts`: GameState interface with coziness, timeRemaining, score, activeEvents, isPlaying, isPaused, gameOver
- `events.ts`: GameEvent interface with id, type, priority, location, timer, points, cozinessReward, cozinessPenalty; EventType union ('phone' | 'kettle' | 'cat' | 'candle'); EventPriority union ('minor' | 'standard' | 'critical')
- `progression.ts`: ProgressionState interface with level, xp, svitlyachky, purchasedItems, equippedItems, achievements

**And** all types follow TypeScript best practices:
- Use interfaces for object shapes
- Use type aliases for unions/primitives
- No `any` types (use `unknown` if needed)
- Proper generic types where applicable

**And** types match the architecture document data structures exactly

**Prerequisites:** Story 1.1

**Technical Notes:**
- Reference architecture document "Data Architecture" section
- Ensure types are exported for use in other modules
- Add JSDoc comments for complex types
- Types should be ready for use in Story 2.1 (Game State Management)

### Story 1.3: React Context Setup for Game State

As a developer,
I want React Context providers for game state and progression state,
So that components can access and update game state throughout the application.

**Acceptance Criteria:**

**Given** type definitions exist
**When** I create Context providers
**Then** `src/contexts/GameContext.tsx` provides:
- GameContext with GameState type
- GameProvider component that wraps children
- Context value includes: current game state, update functions (setCoziness, setTimeRemaining, setScore, addEvent, removeEvent, etc.)
- Initial state matches default game state

**And** `src/contexts/ProgressionContext.tsx` provides:
- ProgressionContext with ProgressionState type
- ProgressionProvider component that wraps children
- Context value includes: current progression state, update functions (addXP, levelUp, addSvitlyachky, purchaseItem, unlockAchievement, etc.)
- Initial state loads from localStorage or uses defaults

**And** both contexts use React hooks (useState or useReducer) for state management
**And** context providers can be composed (ProgressionProvider wraps GameProvider or vice versa)
**And** TypeScript types are properly exported for context consumption

**Prerequisites:** Story 1.2

**Technical Notes:**
- Follow architecture document "State Management" section
- Use React Context API (no Redux per PRD)
- Consider using useReducer for complex state updates
- Prepare for localStorage integration in Story 1.4
- Context should be ready for use in Story 2.1

### Story 1.4: localStorage Utilities

As a developer,
I want type-safe localStorage utilities,
So that I can persist and load game data reliably.

**Acceptance Criteria:**

**Given** type definitions exist
**When** I create localStorage utilities
**Then** `src/utils/localStorage.ts` provides:
- `saveGameState(state: ProgressionState): void` - saves progression to localStorage with key `'hackathon-game:progression'`
- `loadGameState(): ProgressionState | null` - loads progression from localStorage, returns null if not found or corrupted
- `saveEquippedItems(items: EquippedItems): void` - saves equipped items with key `'hackathon-game:equipped-items'`
- `loadEquippedItems(): EquippedItems | null` - loads equipped items
- All functions handle errors gracefully (try-catch, return null on failure)
- All functions validate data structure before returning

**And** localStorage keys follow naming convention: `'hackathon-game:{key-name}'` in kebab-case
**And** functions handle localStorage quota limits (catch QuotaExceededError)
**And** functions handle corrupted data (JSON parse errors return null)
**And** TypeScript types ensure type safety (no `any`)

**Prerequisites:** Story 1.2

**Technical Notes:**
- Follow architecture document "Persistence" section
- Use JSON.stringify/parse for serialization
- Add error handling for edge cases (quota, corruption)
- Prepare for debounced saves in Story 3.1
- Keys must match architecture document localStorage schema

### Story 1.5: Game Constants and Configuration

As a developer,
I want centralized game constants and configuration,
So that game mechanics values are easy to adjust and maintain.

**Acceptance Criteria:**

**Given** the project is set up
**When** I create constants file
**Then** `src/utils/constants.ts` exports:
- `EVENING_DURATION`: 60-90 seconds (configurable)
- `COZINESS_START`: 60 (starting coziness value)
- `COZINESS_DECAY_RATE`: decay per second value
- `EVENT_SPAWN_INTERVAL`: 3-4 seconds
- `MAX_SIMULTANEOUS_EVENTS`: object mapping level to max events {1: 2, 2: 2, 3: 3, 4: 3, 5: 4}
- `EVENT_TIMER_DURATION`: object mapping level to timer duration (5-10 seconds based on difficulty)
- `EVENT_SCORING`: object with points for minor (+10), standard (+15), critical (+20)
- `EVENT_COZINESS_IMPACT`: object with rewards/penalties for each priority
- `XP_LEVEL_THRESHOLDS`: [0, 100, 300, 600] for levels 1-4
- `SVITLYACHKY_REWARDS`: base (1), bonus_50 (1), bonus_80 (1) for max 3 per evening
- `SHOP_ITEMS`: array of shop item definitions (3 items minimum)

**And** all constants are typed with TypeScript
**And** constants match PRD specifications exactly
**And** constants are exported for use throughout the codebase

**Prerequisites:** Story 1.1

**Technical Notes:**
- Reference PRD "Game Mechanics" and "Progression & Economy" sections
- Make constants easily adjustable for balancing
- Use descriptive constant names
- Consider making some constants level-dependent functions if needed

---

## Epic 2: Core Gameplay

**Goal:** Implement the core game loop, character movement, event system, and core mechanics that make the game playable. Players can move around, interact with events, and complete evenings.

### Story 2.1: Game State Management and Game Loop

As a player,
I want the game to run a continuous game loop that updates game state,
So that the evening timer counts down and game mechanics function properly.

**Acceptance Criteria:**

**Given** the game is initialized
**When** I start an evening
**Then** the game loop starts using `requestAnimationFrame`
**And** the game loop updates every frame (~60 FPS):
- Evening timer decreases by delta time
- «Затишок» meter decreases by decay rate (if no events affecting it)
- Active event timers count down
- Game state is updated in GameContext

**And** the game loop handles:
- Pause when browser tab is inactive (Page Visibility API)
- Resume when tab becomes active
- Cleanup on component unmount (cancel animation frame)

**And** the game loop integrates with React:
- Uses `useGameLoop` hook that wraps requestAnimationFrame
- Updates GameContext state via context update functions
- Triggers React re-renders when state changes
- Maintains 60 FPS performance (no frame drops)

**And** game state structure matches GameState interface from types
**And** initial game state is set when evening starts:
- coziness: 60 (or based on level bonuses)
- timeRemaining: 60-90 seconds (based on level)
- score: 0
- activeEvents: []
- isPlaying: true
- isPaused: false
- gameOver: false

**Prerequisites:** Story 1.3 (Game Context), Story 1.5 (Constants)

**Technical Notes:**
- Follow architecture document "Game Loop" section
- Use `requestAnimationFrame` for 60 FPS (not setInterval)
- Calculate delta time for frame-independent updates
- Use Page Visibility API to pause when tab inactive
- Implement `useGameLoop` hook in `src/hooks/useGameLoop.ts`
- Reference architecture document "Performance Considerations"

### Story 2.2: Apartment Layout and Background with Ukrainian Cozy Details

As a player,
I want to see an apartment layout with authentic Ukrainian cozy details,
So that I have a visually warm, culturally authentic game space to play in.

**Acceptance Criteria:**

**Given** the game is running
**When** I view the gameplay screen
**Then** `Apartment.tsx` component displays:
- Apartment background with dark blues/greys (night, blackout atmosphere)
- Simple 2D layout (single screen or 2-3 rooms)
- Furniture and objects positioned in the apartment
- Visual style matches "Cozy Blackout" theme
- **MVP Ukrainian cozy details** (4-5 items for cultural authenticity):

**1. Гном з JYSK (JYSK Gnome):**
- Small figure positioned on a shelf in the living room or near the TV
- Visual: Long шапка (hat), beard, tiny nose
- Subtle glow around him or tiny idle "wiggle" animation every few seconds
- Pure charm element - zero gameplay impact, adds humor and modern Ukrainian vibe

**2. Килим на стіні / етно-постер (Carpet on wall / ethno-poster):**
- Positioned behind the sofa or bed
- Visual: Stylized "килим на стіні" with simple folk-ish pattern, OR framed poster with geometric орнамент (без політики, просто орнамент)
- Optional: Slight texture or subtle parallax when character passes nearby (very minor effect)
- Adds "бабусина квартира" / old-school cozy vibe, works great with "затишок" theme

**3. Плед в клітинку на дивані (Plaid blanket on sofa):**
- Draped over the sofa in the living room
- Visual: Soft rectangular shape with plaid pattern (simple stripes)
- Warm tones: червоний / коричневий / беж (red / brown / beige)
- Optional micro-interaction: Could be used for Minor event "Принести плед" (bring blanket) - character activates it on sofa with short animation (see Story 2.6 for event integration)
- Very cozy element - screams "вечір, чай, плед, свічки"

**And** apartment layout:
- Defines boundaries for character movement
- Provides locations for event objects (phone, kettle, cat, candle positions)
- Uses simple shapes or sprites (no complex pixel art)
- Styled with CSS (dark background, warm light sources)
- Cozy details are decorative (except blanket which may be interactive)

**And** cozy details implementation:
- Simple CSS-styled elements or basic sprites
- Subtle animations (gnome wiggle, optional parallax) use CSS animations
- Performance-friendly (no heavy assets)
- Visible but not distracting from gameplay
- Adds cultural authenticity without complexity

**And** apartment is:
- Rendered as game container/background
- Sized appropriately for gameplay area
- Ready for character and event positioning
- Culturally authentic with Ukrainian cozy elements

**Prerequisites:** Story 2.1 (Game Loop), Story 1.5 (Constants)

**Technical Notes:**
- Follow UX design document "Visual Foundation" section
- Use CSS for styling (dark blues/greys background, warm accents for cozy details)
- Simple implementation for hackathon scope (CSS shapes or basic sprites)
- Cozy details are MVP items - prioritize these 3-4 for cultural authenticity
- Blanket can be referenced in Story 2.6 if used as Minor event type
- Prepare for character positioning in Story 2.3
- Reference PRD for apartment layout specifications
- These details enhance "затишок" theme without adding gameplay complexity

### Story 2.3: Character Visual and Movement System

As a player,
I want to see my character and move it around the apartment using keyboard controls,
So that I can reach events and interact with them.

**Acceptance Criteria:**

**Given** the game is running
**When** I press WASD or arrow keys
**Then** the character moves smoothly in the corresponding direction:
- W/↑: Move up
- S/↓: Move down
- A/←: Move left
- D/→: Move right
- Diagonal movement works when multiple keys pressed

**And** movement is:
- Smooth and responsive (no lag, immediate response to key press)
- Frame-rate independent (uses delta time, not fixed pixels per frame)
- Constrained to apartment boundaries (character cannot move outside play area)
- Uses CSS `transform: translate()` for GPU-accelerated movement (not top/left)

**And** character component (`src/components/game/Character.tsx`):
- Renders character visual (simple shape, sprite, or CSS-styled element)
- Displays at correct position in apartment
- Updates position smoothly during movement
- Character visual matches equipped skin (if any, Story 4.5)

**And** character position is stored in game state
**And** movement speed is configurable (base speed + level bonuses from Story 3.3)
**And** keyboard input handling:
- Listens for keydown/keyup events
- Tracks which keys are currently pressed
- Updates movement direction accordingly
- Cleans up event listeners on unmount

**And** movement works with both keyboard and is ready for mouse interaction (click to move - optional future enhancement)

**Prerequisites:** Story 2.2 (Apartment Layout), Story 2.1 (Game Loop)

**Technical Notes:**
- Follow architecture document "Character Movement" section
- Use React useEffect for keyboard event listeners
- Store character position in GameContext or local component state
- Use CSS transforms for performance (GPU-accelerated)
- Movement speed constant from Story 1.5, modified by level bonuses
- Character visual can be simple CSS-styled div or sprite
- Reference PRD FR1 for keyboard controls specification

### Story 2.4: Event Spawning System

As a player,
I want events to spawn at regular intervals,
So that I have time-pressured tasks to complete during the evening.

**Acceptance Criteria:**

**Given** the game is running
**When** the event spawn timer reaches the interval (3-4 seconds)
**Then** a new event is spawned if:
- Current active events count is below maximum for player level
- Event is randomly selected from available event types (phone, kettle, cat, candle)
- Event is assigned a random valid location in the apartment
- Event is assigned priority (minor, standard, critical) based on event type
- Event timer is set based on player level (5-10 seconds)

**And** the EventManager class (`src/core/EventManager.ts`) provides:
- `spawnEvent(level: number): GameEvent | null` - spawns event if conditions met
- `getActiveEvents(): GameEvent[]` - returns currently active events
- `getMaxSimultaneousEvents(level: number): number` - returns max events for level

**And** events are stored in game state (activeEvents array)
**And** event spawning respects maximum simultaneous events per level:
- Level 1-2: 2 events maximum
- Level 3-4: 3 events maximum
- Level 5+: 4 events maximum

**Prerequisites:** Story 2.1 (Game Loop), Story 2.2 (Apartment Layout), Story 1.2 (Types), Story 1.5 (Constants)

**Technical Notes:**
- Follow architecture document "Event System Pattern" section
- EventManager is a class (not React component) for testability
- Event spawning logic uses constants from Story 1.5
- Reference PRD FR3, FR24, FR31 for event spawning specifications
- Prepare for timer management in Story 2.5

### Story 2.5: Event Timer Management

As a player,
I want event timers to count down and expire properly,
So that events have time pressure and consequences for failure.

**Acceptance Criteria:**

**Given** events are active
**When** the game loop runs
**Then** the EventManager provides:
- `updateEvents(deltaTime: number): void` - updates all event timers every frame
- `resolveEvent(eventId: string): GameEvent | null` - marks event as resolved, returns event data
- `expireEvent(eventId: string): GameEvent | null` - marks event as expired, returns event data

**And** event timers:
- Count down every frame (frame-rate independent using delta time)
- Expire when timer reaches 0
- Expired events are automatically removed from active events
- Expired events apply coziness penalties (Story 2.7)

**And** EventManager integrates with game loop:
- `updateEvents()` is called every frame in game loop
- Timer updates are synchronized with game state
- Expired events trigger game state updates

**Prerequisites:** Story 2.4 (Event Spawning), Story 2.1 (Game Loop)

**Technical Notes:**
- Integrate EventManager with game loop (call updateEvents every frame)
- Timer management uses delta time for frame-rate independence
- Prepare for event types in Story 2.6

### Story 2.6: Event Types and Interaction Requirements

As a player,
I want different event types with specific interaction requirements,
So that I have variety in gameplay and different challenges to overcome.

**Acceptance Criteria:**

**Given** events are spawning
**When** an event of a specific type appears
**Then** the event has the correct properties:
- **Phone (low battery)**: standard priority, +15 points, +8/-10 coziness, interaction: "plug into power bank"
- **Kettle (boiling)**: critical priority, +20 points, +10/-20 coziness, interaction: "turn off"
- **Cat (stressed)**: minor priority, +10 points, +5/-5 coziness, interaction: "calm it"
- **Candle (needed/going out)**: standard priority, +15 points, +8/-10 coziness, interaction: "light it"

**And** each event type has:
- Unique visual identifier (icon type for Story 2.7)
- Specific interaction text/description
- Correct scoring values (from constants)
- Correct coziness impact (from constants)
- Appropriate timer duration based on priority and level

**And** event types are defined in `src/types/events.ts` as EventType union
**And** event type definitions match PRD FR24, FR25, FR26, FR27 exactly
**And** event interaction requirements are stored with event data

**Prerequisites:** Story 2.4 (Event Spawning), Story 1.2 (Types), Story 1.5 (Constants)

**Technical Notes:**
- Event types match PRD "Event Types & Scoring" section
- Event properties come from constants (Story 1.5)
- Prepare event data structure for visual rendering in Story 2.7
- Reference PRD for exact event type specifications
- **Optional enhancement**: Плед (blanket) from Story 2.2 could be used as a Minor event type "Принести плед" (bring blanket) - character goes to blanket location, activates it on sofa with short animation. This would add a 5th event type for variety, but is optional for MVP scope.

### Story 2.7: Event Icons and Visual Indicators

As a player,
I want to see visual icons above event objects with color-coded priorities,
So that I know where events are and how urgent they are.

**Acceptance Criteria:**

**Given** an event is active
**When** the event is rendered
**Then** `EventIndicator` component (`src/components/game/EventIndicator.tsx`) displays:
- Icon above the event object location (phone, kettle, cat, candle icons)
- Color-coded priority indicator:
  - Minor events: soft blue (#64b5f6)
  - Standard events: light yellow (#fff176)
  - Critical events: orange/red (#ff8c42)

**And** event indicators are:
- Positioned above event objects using absolute positioning
- Visible and readable against dark apartment background
- Sized appropriately (not too large, not too small)
- Stacked/offset if multiple events at same location

**And** event indicators update in real-time:
- Color remains consistent with priority
- Icon remains visible until event resolved or expired

**And** event indicators are removed when:
- Event is resolved (player interacts successfully)
- Event expires (timer reaches 0)

**Prerequisites:** Story 2.4 (Event Spawning), Story 2.6 (Event Types)

**Technical Notes:**
- Follow UX design document "Event UX" section
- Position indicators using absolute positioning relative to apartment container
- Reference PRD FR4, FR28 for visual indicator specifications
- Icons can be simple Unicode symbols or SVG (prepare for future asset integration)
- Prepare for timers in Story 2.8

### Story 2.8: Event Timer Display

As a player,
I want to see countdown timers on events,
So that I know how much time I have to resolve each event.

**Acceptance Criteria:**

**Given** an event is active
**When** the event is rendered
**Then** the EventIndicator displays a circular timer:
- Timer ring/pie that shrinks or fills as time decreases
- Timer text showing seconds remaining (e.g., "5s")
- Timer updates every frame smoothly

**And** timer display:
- Is visually integrated with event icon
- Uses color consistent with event priority
- Provides clear visual feedback of urgency
- Animates smoothly as time decreases

**And** timer behavior:
- Counts down in real-time (synchronized with EventManager timers)
- Updates every frame for smooth animation
- Disappears when event is resolved or expired

**Prerequisites:** Story 2.7 (Event Icons), Story 2.5 (Timer Management)

**Technical Notes:**
- Use CSS for timer ring animation (CSS animations or SVG)
- Timer display reads from EventManager timer values
- Reference UX design document for timer visual specifications

### Story 2.9: Event Interaction System

As a player,
I want to interact with events by pressing E or clicking when near them,
So that I can resolve events and earn points and «Затишок».

**Acceptance Criteria:**

**Given** I am near an active event (within interaction range, e.g., 50px)
**When** I press E key or click on the event
**Then** the event is resolved:
- Event is removed from active events
- Score increases by event's point value
- «Затишок» increases by event's coziness reward
- Visual feedback is shown (see Story 4.6 for details)

**And** interaction detection:
- Checks if character is within interaction range of event location
- Range is configurable (e.g., 50-100px distance)
- Works for both keyboard (E key) and mouse (click on event indicator)
- Only one event can be interacted with at a time

**And** interaction is prevented if:
- Character is too far from event
- Event has already expired
- Game is paused or over

**And** interaction triggers:
- Event resolution logic in EventManager
- Score and coziness updates in game state
- Achievement progress checks (if applicable, see Story 3.5)
- Visual feedback animations (Story 4.6)

**Prerequisites:** Story 2.3 (Character Movement), Story 2.7 (Event Icons)

**Technical Notes:**
- Calculate distance between character position and event location
- Use EventManager.resolveEvent() method
- Update game state via GameContext
- Reference PRD FR2, FR6 for interaction specifications
- Prepare for visual feedback in Story 4.6

### Story 2.10: «Затишок» Meter System

As a player,
I want the «Затишок» meter to decrease over time and change based on event outcomes,
So that I have a resource to manage during the evening.

**Acceptance Criteria:**

**Given** the game is running
**When** time passes
**Then** «Затишок» decreases by decay rate every second:
- Decay rate is configurable (from constants)
- Decay rate is affected by player level (slower at higher levels, Story 3.3)
- Decay is frame-rate independent (uses delta time)

**And** when events are resolved or expire:
- Resolved events: «Затишок» increases by event's coziness reward
- Expired events: «Затишок» decreases by event's coziness penalty
- «Затишок» is clamped between 0 and 100

**And** «Затишок» is displayed in HUD (Story 4.1):
- Horizontal bar with gradient (red → yellow → green)
- Bar updates smoothly when value changes
- Label shows "Затишок" text
- Current value is visible (percentage or number)

**And** «Затишок» affects game state:
- If «Затишок» reaches 0: game ends (lose condition, Story 2.11)
- Starting «Затишок» is affected by level bonuses (Story 3.3)

**Prerequisites:** Story 2.1 (Game Loop), Story 2.9 (Event Interaction)

**Technical Notes:**
- «Затишок» value stored in GameState
- Decay rate from constants (Story 1.5), modified by level
- Update «Затишок» in game loop
- Reference PRD FR7 for «Затишок» specifications
- Prepare for HUD display in Story 4.1

### Story 2.11: Evening Timer and Win/Lose Conditions

As a player,
I want the evening timer to count down and the game to end when I win or lose,
So that I know how much time I have and when the evening is complete.

**Acceptance Criteria:**

**Given** an evening has started
**When** the game is running
**Then** the evening timer counts down from initial duration (60-90 seconds):
- Timer decreases every second (frame-rate independent)
- Timer is displayed in HUD (Story 4.1) in "MM:SS" format (e.g., "01:30")
- Timer duration is affected by player level (longer at higher levels, optional)

**And** win condition:
- When timer reaches 0 AND «Затишок» > 0:
  - Game ends with win state
  - Results screen is shown (Story 4.3)
  - Rewards are calculated (XP, «Світлячки», Story 3.1)

**And** lose condition:
- When «Затишок» reaches 0 before timer ends:
  - Game ends with lose state
  - Results screen is shown (Story 4.3)
  - Partial rewards are calculated (if player made progress)

**And** game end state:
- isPlaying: false
- gameOver: true
- Game loop stops updating
- Player cannot interact with events anymore

**Prerequisites:** Story 2.1 (Game Loop), Story 2.10 («Затишок» Meter)

**Technical Notes:**
- Timer stored in GameState.timeRemaining
- Check win/lose conditions every frame in game loop
- Reference PRD FR8, FR10 for timer and win/lose specifications
- Prepare for results screen in Story 4.3

### Story 2.12: Scoring System

As a player,
I want my score to increase when I resolve events,
So that I can track my performance and earn XP at the end of the evening.

**Acceptance Criteria:**

**Given** I resolve an event
**When** the event is successfully resolved
**Then** my score increases by the event's point value:
- Minor events: +10 points
- Standard events: +15 points
- Critical events: +20 points

**And** score is:
- Displayed in results screen (Story 4.3)
- Used to calculate XP at end of evening (XP = floor(score / 10), Story 3.1)
- Reset to 0 at the start of each new evening
- Stored in GameState.score

**And** score calculation:
- Only increases on successful event resolution
- Does not decrease on event expiration (only «Затишок» penalty applies)
- Total score is sum of all resolved events' point values

**Prerequisites:** Story 2.9 (Event Interaction), Story 2.11 (Win/Lose Conditions)

**Technical Notes:**
- Score stored in GameState
- Score values from constants (Story 1.5)
- Reference PRD FR9 for scoring specifications
- Score is used in Story 3.1 for XP calculation

### Story 2.13: Evening Timer HUD Component

As a player,
I want to see the evening timer in the HUD,
So that I know how much time I have remaining.

**Acceptance Criteria:**

**Given** I am playing the game
**When** the gameplay screen is active
**Then** `Timer.tsx` component displays:
- Evening timer in "MM:SS" format (e.g., "01:30")
- Timer icon next to time display
- Timer updates every second
- Timer color changes based on time remaining (optional: red when < 10 seconds)

**And** timer component:
- Is positioned in HUD left section
- Reads timer value from GameContext
- Updates in real-time as timer counts down
- Styled according to UX design (light text, readable)

**And** timer text is in Ukrainian: "Час: 01:30" or similar format

**Prerequisites:** Story 2.11 (Evening Timer), Story 2.1 (Game Loop)

**Technical Notes:**
- Follow UX design document "Main Game Screen Layout" section
- Component reads from GameContext.timeRemaining
- Use CSS for styling and color transitions
- Ukrainian text added incrementally (Story 2.15)

### Story 2.14: «Затишок» Bar HUD Component

As a player,
I want to see the «Затишок» meter in the HUD,
So that I always know my current coziness level.

**Acceptance Criteria:**

**Given** I am playing the game
**When** the gameplay screen is active
**Then** `CozinessBar.tsx` component displays:
- Horizontal bar with gradient (red → yellow → green based on value)
- Label "Затишок" above or inside bar
- Bar fills/empties smoothly as value changes
- Current value visible (percentage or number, optional)

**And** coziness bar:
- Is positioned in HUD center section
- Reads coziness value from GameContext
- Updates in real-time as value changes
- Shows visual feedback when value changes significantly (pulse/glow, Story 4.9)

**And** bar styling:
- Gradient colors match UX design (red #f44336 → yellow #ffeb3b → green #4caf50)
- Smooth CSS transitions for value changes
- Readable against dark background

**And** label text is in Ukrainian: "Затишок"

**Prerequisites:** Story 2.10 («Затишок» Meter), Story 2.1 (Game Loop)

**Technical Notes:**
- Follow UX design document "Main Game Screen Layout" section
- Component reads from GameContext.coziness
- Use CSS gradients for bar colors
- Ukrainian text added incrementally (Story 2.15)

### Story 2.15: Ukrainian Text for Core Gameplay

As a Ukrainian-speaking player,
I want core gameplay text in Ukrainian,
So that the game feels authentic from the start.

**Acceptance Criteria:**

**Given** I am playing the game
**When** I view core gameplay elements
**Then** the following text is displayed in Ukrainian:
- Timer label: "Час" or similar
- «Затишок» label: "Затишок"
- Event interaction hints: "Натисніть E, щоб взаємодіяти"
- Event descriptions: "Телефон майже розрядився", "Кіт нервує", etc.
- Win/lose messages: "Вечір завершено!", "Ви пережили вечір при блекауті ✨"

**And** Ukrainian text:
- Is stored in `src/utils/translations.ts` or similar constants file
- Uses proper Ukrainian grammar and spelling
- Maintains light, cozy, humorous tone
- Is consistent across all gameplay elements

**And** text integration:
- Replaces English placeholder text in components
- All gameplay UI elements use Ukrainian text
- Key terms remain in Ukrainian («Затишок», «Світлячки»)

**Prerequisites:** Story 2.13 (Timer HUD), Story 2.14 (Coziness Bar), Story 2.9 (Event Interaction)

**Technical Notes:**
- Create translation constants file early
- Reference PRD FR40, FR41, FR42 for localization specifications
- Add Ukrainian text as features are built (incremental approach)
- Test with native Ukrainian speaker if possible

### Story 2.16: Visual Polish for Gameplay

As a player,
I want polished visual effects during gameplay,
So that the experience feels smooth and professional.

**Acceptance Criteria:**

**Given** I am playing the game
**When** I observe gameplay visuals
**Then** the following polish is applied:
- Smooth character movement animations (no jank)
- Smooth event indicator animations (icon appearance, timer updates)
- Smooth «Затишок» bar updates (no stuttering)
- Smooth timer countdown (no frame drops)
- Consistent visual style (colors, spacing, typography)

**And** performance polish:
- 60 FPS maintained during gameplay
- No visual glitches or layout issues
- Smooth CSS transitions and animations
- GPU-accelerated transforms for movement

**And** visual consistency:
- All gameplay elements follow "Cozy Blackout" theme
- Colors match UX design specifications
- Spacing follows 8px grid system
- Typography is consistent and readable

**Prerequisites:** Story 2.13 (Timer HUD), Story 2.14 (Coziness Bar), Story 2.3 (Character), Story 2.7 (Event Icons)

**Technical Notes:**
- Follow UX design document "Visual Foundation" section
- Use CSS variables for consistent colors
- Test performance in Chrome (primary target)
- Polish incrementally as features are built

---

## Epic 3: Progression System

**Goal:** Implement XP, levels, currency («Світлячки»), shop, and achievements so players have clear progression and rewards that encourage return engagement.

### Story 3.1: XP and Level System

As a player,
I want to earn XP and level up based on my performance,
So that I can unlock passive bonuses and see my progress.

**Acceptance Criteria:**

**Given** I complete an evening (win or lose)
**When** the evening ends
**Then** XP is calculated and added:
- XP = floor(total_score / 10)
- Example: 200 points = 20 XP
- XP is added to my total XP
- XP is displayed in results screen (Story 4.3)

**And** level up is checked:
- If total XP >= level threshold: level increases
- Level thresholds: Level 1 (0 XP), Level 2 (100 XP), Level 3 (300 XP), Level 4 (600 XP)
- Level up notification is shown (Story 4.3)
- Level up bonuses are applied (Story 3.3)

**And** level and XP are:
- Displayed in HUD (Story 4.1): "Lv. 2" with XP bar showing progress
- Saved to localStorage (Story 1.4)
- Loaded on game start (Story 1.4)
- Persisted across sessions

**And** ProgressionSystem class (`src/core/ProgressionSystem.ts`) provides:
- `calculateXP(score: number): number` - calculates XP from score
- `checkLevelUp(currentXP: number, currentLevel: number): { leveledUp: boolean, newLevel: number }` - checks if level up occurred
- `getXPForNextLevel(level: number): number` - returns XP needed for next level
- `getXPProgress(currentXP: number, level: number): number` - returns 0-1 progress to next level

**Prerequisites:** Story 2.12 (Scoring), Story 1.4 (localStorage), Story 1.3 (Progression Context)

**Technical Notes:**
- Follow architecture document "Progression System" section
- XP calculation from PRD FR11
- Level thresholds from constants (Story 1.5)
- Reference PRD FR12, FR14 for level system specifications
- Prepare for level bonuses in Story 3.3

### Story 3.2: «Світлячки» Currency System

As a player,
I want to earn «Світлячки» currency based on my performance,
So that I can purchase items in the shop.

**Acceptance Criteria:**

**Given** I complete an evening
**When** the evening ends
**Then** «Світлячки» are calculated and added:
- Base reward: 1 «Світлячок» if «Затишок» > 0 at end (survived)
- Performance bonus: +1 if final «Затишок» ≥ 50
- Performance bonus: +1 if final «Затишок» ≥ 80
- Maximum: 3 «Світлячки» per evening (perfect run)

**And** «Світлячки» are:
- Added to total currency
- Displayed in HUD (Story 4.2): ✨ icon + "x 5" format
- Displayed in results screen (Story 4.3): "+2 ✨" format
- Saved to localStorage (Story 1.4)
- Loaded on game start

**And** ProgressionSystem provides:
- `calculateSvitlyachky(finalCoziness: number, survived: boolean): number` - calculates currency earned
- Currency calculation matches PRD FR15 exactly

**Prerequisites:** Story 2.11 (Win/Lose), Story 1.4 (localStorage), Story 1.3 (Progression Context)

**Technical Notes:**
- Currency calculation from PRD FR15
- Reference PRD "«Світлячки» (In-Game Currency)" section
- Currency values from constants (Story 1.5)
- Prepare for shop integration in Story 3.4

### Story 3.3: Level-Up Bonuses

As a player,
I want to receive passive bonuses when I level up,
So that gameplay becomes easier and more rewarding as I progress.

**Acceptance Criteria:**

**Given** I level up
**When** my level increases
**Then** the following bonuses are automatically applied:
- Faster movement speed (increases by level, e.g., +5% per level)
- Longer device battery life (events spawn less frequently, +10% per level)
- Higher starting «Затишок» (increases starting value, +5 per level)
- Slower «Затишок» decay rate (decay is reduced, -5% per level)

**And** bonuses are:
- Applied immediately on level up
- Persisted (level is saved, bonuses recalculated on load)
- Visible in gameplay (player notices faster movement, easier events)
- Stack with purchased buffs (Story 3.4)

**And** bonus values are:
- Configurable in constants (Story 1.5)
- Balanced for smooth progression
- Applied in relevant game systems (movement, event spawning, coziness)

**Prerequisites:** Story 3.1 (XP/Level), Story 2.3 (Movement), Story 2.4 (Event Manager), Story 2.10 («Затишок»)

**Technical Notes:**
- Bonuses from PRD FR13
- Reference PRD "Level-Up Bonuses" section
- Apply bonuses in respective systems (movement speed, event spawn rate, etc.)
- Bonuses should be noticeable but not game-breaking

### Story 3.4: Shop System

As a player,
I want to browse and purchase items in a shop using «Світлячки»,
So that I can customize my character and unlock gameplay buffs.

**Acceptance Criteria:**

**Given** I have «Світлячки» currency
**When** I open the shop screen
**Then** I see a shop UI (Story 4.4) displaying:
- Grid/list of 3 shop items:
  1. Cosmetic character skin - 3 «Світлячки»
  2. Cosmetic cat/candle - 4 «Світлячки»
  3. Gameplay buff (e.g., +5% speed or +5 starting «Затишок») - 5 «Світлячки»
- Each item shows: icon, name, price, purchase state (Locked/Purchased/Equipped)
- My current «Світлячки» count is displayed

**And** when I click an item:
- Item details are shown (right panel or modal):
  - Big icon/preview
  - Name and description
  - Effect description (if gameplay buff)
  - Purchase button (if not owned and enough currency)
  - Equip button (if owned but not equipped)
  - "Використовується" state (if currently equipped)

**And** when I purchase an item:
- Currency is deducted (validates I have enough)
- Item is added to purchasedItems array
- Purchase is saved to localStorage
- UI updates to show "Purchased" state
- Currency counter animates (7 → 4)

**And** when I equip a cosmetic item:
- Item is added to equippedItems object
- Equipped state is saved to localStorage
- Item appears in game (character skin, cat, candle - Story 4.7)
- UI updates to show "Використовується" state

**And** when I purchase a gameplay buff:
- Buff effect is automatically applied (no equip needed)
- Buff persists across sessions (saved to localStorage)
- Buff stacks with level bonuses (Story 3.3)

**Prerequisites:** Story 3.2 (Currency), Story 1.4 (localStorage), Story 4.4 (Shop UI)

**Technical Notes:**
- Shop items from constants (Story 1.5)
- Reference PRD FR17, FR18, FR19, FR20 for shop specifications
- Shop UI implementation in Story 4.4
- Item effects applied in respective systems (movement, coziness, etc.)

### Story 3.5: Achievement System

As a player,
I want to unlock achievements by meeting specific conditions,
So that I have additional goals to work toward.

**Acceptance Criteria:**

**Given** I am playing the game
**When** I meet an achievement condition
**Then** the achievement is unlocked:
- Achievement is added to achievements array
- Achievement progress is tracked
- Unlock notification is shown (optional, Story 4.8)
- Achievement is saved to localStorage

**And** at least 3 achievements are implemented:
1. "Evening with «Затишок» never below 50%" - tracks if coziness stayed ≥ 50% all evening
2. "Resolved 10 events in one evening" - tracks total events resolved in single evening
3. "Reach level 3" - tracks when player reaches level 3

**And** achievement tracking:
- Progress is checked during gameplay (coziness, events resolved)
- Progress is checked on level up (level achievements)
- Progress persists across sessions (saved to localStorage)
- Achievements are displayed in achievements screen (Story 4.8)

**And** ProgressionSystem provides:
- `checkAchievements(gameState: GameState, progressionState: ProgressionState): string[]` - returns newly unlocked achievement IDs
- Achievement definitions in constants (Story 1.5)

**Prerequisites:** Story 2.10 («Затишок»), Story 2.9 (Events), Story 3.1 (Levels), Story 1.4 (localStorage), Story 4.8 (Achievements UI)

**Technical Notes:**
- Achievements from PRD FR21, FR22, FR23
- Reference PRD "Achievements" section
- Achievement tracking integrated into game loop and event resolution
- Achievements UI in Story 4.8

---

## Epic 4: User Interface & Experience

**Goal:** Implement all UI screens, HUD, menus, onboarding, and visual feedback so players have a polished, intuitive experience that makes the game easy to understand and enjoyable to play.

### Story 4.1: XP and Level HUD Display

As a player,
I want to see my level and XP progress in the HUD,
So that I can track my progression during gameplay.

**Acceptance Criteria:**

**Given** I am playing the game
**When** the gameplay screen is active
**Then** HUD right section displays:
- Level display: "Lv. 2" text (in Ukrainian: "Рівень 2")
- XP bar below level: shows progress to next level (0-1 fill)
- XP bar updates smoothly as XP increases
- Level and XP values update in real-time

**And** XP/Level display:
- Is positioned in HUD right section
- Reads from ProgressionContext (level, xp)
- Updates when level changes (pulse/glow animation, Story 4.9)
- Styled according to UX design (light text, warm accents)

**And** text is in Ukrainian: "Рівень" for level label

**Prerequisites:** Story 3.1 (XP/Level), Story 2.13 (Timer HUD), Story 2.14 (Coziness Bar)

**Technical Notes:**
- Follow UX design document "Main Game Screen Layout" section
- Component reads from ProgressionContext
- Use CSS for XP bar animation
- Ukrainian text added incrementally (Story 4.2)

### Story 4.2: «Світлячки» HUD Display and Ukrainian for Progression

As a player,
I want to see my «Світлячки» count in the HUD,
So that I know how much currency I have.

**Acceptance Criteria:**

**Given** I am playing the game
**When** the gameplay screen is active
**Then** HUD right section displays:
- «Світлячки» display: ✨ icon + "x 5" format
- Currency count updates in real-time
- Small animation when currency increases (✨ floats upward, Story 4.9)

**And** «Світлячки» display:
- Is positioned in HUD right section (next to level/XP)
- Reads from ProgressionContext (svitlyachky)
- Updates when currency changes
- Styled according to UX design (warm yellow/gold accent color)

**And** HUD integration:
- All HUD components (Timer, Coziness Bar, Level/XP, «Світлячки») are integrated into `HUD.tsx`
- HUD is positioned at top of screen with 8px padding
- HUD is always visible during gameplay
- HUD styled with dark background, light text, warm accents

**And** Ukrainian text for progression elements:
- Level label: "Рівень"
- XP label: "Досвід" (optional)
- Currency label: "Світлячки" (if shown as text)
- All progression-related text in Ukrainian

**Prerequisites:** Story 3.2 (Currency), Story 4.1 (XP/Level HUD)

**Technical Notes:**
- Follow UX design document "Main Game Screen Layout" section
- Component reads from ProgressionContext
- Reference PRD FR16 for «Світлячки» display specifications
- Ukrainian text added incrementally as progression features are built

### Story 4.3: Results Screen

As a player,
I want to see a results screen after each evening showing my performance and rewards,
So that I understand what I earned and can celebrate my progress.

**Acceptance Criteria:**

**Given** an evening ends (win or lose)
**When** the game transitions to results screen
**Then** `ResultsScreen.tsx` displays:

**Top section:**
- Title: "Вечір завершено!" or "Ви пережили вечір при блекауті ✨"

**Middle section:**
- Score: "Очки: 235" (final score from evening)
- Final «Затишок»: Value + small icon (e.g., "Затишок: 65%")
- XP gained: "+20 XP" (XP earned this evening)
- «Світлячки» earned: "+2 ✨" (currency earned this evening)
- XP bar animation: Smoothly fills from old XP to new XP value

**Level up section (if applicable):**
- "Level Up! Lv. 1 → Lv. 2" text
- Small glow or confetti effect (optional)
- XP bar shows new level progress

**Bottom section:**
- Primary button: "Грати ще один вечір" (starts new evening)
- Secondary button: "Магазин" (opens shop, Story 4.4)

**And** results screen:
- Appears as full-screen overlay (modal-style)
- Animates in smoothly (fade or slide transition)
- All values are accurate (from game state and progression calculations)
- Can be dismissed by clicking "Play again" button

**Prerequisites:** Story 2.11 (Win/Lose), Story 3.1 (XP), Story 3.2 (Currency), Story 4.4 (Shop - for button)

**Technical Notes:**
- Follow UX design document "Results Screen" section
- Reference PRD FR33 for results screen specifications
- Use CSS transitions for smooth animations
- Results screen reads from GameContext and ProgressionContext
- Prepare for shop navigation in Story 4.4

### Story 4.4: Shop Screen

As a player,
I want to browse and purchase items in a shop screen,
So that I can spend my «Світлячки» and customize my experience.

**Acceptance Criteria:**

**Given** I have «Світлячки» currency
**When** I open the shop screen
**Then** `Shop.tsx` displays:

**Top section:**
- Title: "Магазин"
- «Світлячки» display: ✨ x 7 (big, visible, top-right)

**Main area:**
- Grid/list of 3 shop items (from Story 3.4):
  - Each item card shows: icon, name, price (✨ 3-5), state (Locked/Purchased/Equipped)
  - Cards are clickable and show hover effect (slight scale + shadow)
  - Selected item is highlighted

**Right panel (when item selected):**
- Big icon/preview of selected item
- Name: e.g., "Скин: Айтішник"
- Description/effect: e.g., "дає +5% до швидкості руху" (if gameplay buff)
- Action button:
  - "Купити" (if not owned and enough currency)
  - "Недостатньо світлячків" (disabled, if not enough currency)
  - "Обрати" (if owned but not equipped)
  - "Використовується" (non-clickable, if currently equipped)

**And** shop interactions:
- Clicking item card selects it and shows details in right panel
- Purchasing item: Currency counter animates (7 → 4), card shows checkmark, state updates
- Equipping item: State updates to "Використовується", item appears in game (Story 4.7)
- Shop can be closed/returned to game via back button or menu

**And** shop screen:
- Appears as full-screen overlay (modal-style)
- Styled according to UX design (card-based layout, warm accents)
- All text in Ukrainian (Story 4.5)

**Prerequisites:** Story 3.4 (Shop System), Story 4.5 (Ukrainian for Shop)

**Technical Notes:**
- Follow UX design document "Shop UX" section
- Reference PRD FR34 for shop screen specifications
- Shop UI integrates with ProgressionContext for purchases
- Prepare for item effects in Story 4.7

### Story 4.5: Ukrainian Text for Shop and Results

As a Ukrainian-speaking player,
I want shop and results screen text in Ukrainian,
So that all game screens feel culturally authentic.

**Acceptance Criteria:**

**Given** I view the shop or results screen
**When** I see UI text
**Then** all text is displayed in Ukrainian:
- Shop screen: "Магазин", "Купити", "Обрати", "Використовується", "Недостатньо світлячків"
- Results screen: "Вечір завершено!", "Ви пережили вечір при блекауті ✨", "Очки", "Грати ще один вечір", "Магазин"
- Item names and descriptions in Ukrainian
- All button labels in Ukrainian

**And** Ukrainian text:
- Is stored in translation constants
- Uses proper Ukrainian grammar
- Maintains light, cozy, humorous tone
- Is consistent with gameplay text

**Prerequisites:** Story 4.3 (Results Screen), Story 4.4 (Shop Screen)

**Technical Notes:**
- Add Ukrainian text incrementally as screens are built
- Reference PRD FR40, FR41, FR42 for localization specifications
- Update translation constants file

### Story 4.6: Event Interaction Visual Feedback

As a player,
I want clear visual feedback when I resolve or fail events,
So that I understand the impact of my actions immediately.

**Acceptance Criteria:**

**Given** I interact with an event
**When** I successfully resolve an event
**Then** visual feedback is shown:
- Event icon: Briefly pops/scales up and fades out
- Floating text appears above event location:
  - "+15" (points, in white)
  - "+Затишок" or "+8" (coziness gain, green up arrow or number)
- Small particle effect: A few sparkles (optional, CSS animation)

**And** when an event expires or fails:
- Event icon: Shakes slightly and disappears with desaturated red color
- Brief screen shake: Very small shake effect (CSS transform)
- «Затишок» bar flashes red for ~200-300ms

**And** visual feedback:
- Appears immediately (within 1-2 frames)
- Does not obstruct gameplay
- Uses CSS animations for performance
- Matches UX design specifications

**Prerequisites:** Story 2.9 (Event Interaction), Story 2.7 (Event Icons), Story 2.14 (Coziness Bar)

**Technical Notes:**
- Follow UX design document "Event UX - Interaction Feedback" section
- Reference PRD FR29, FR30 for visual feedback specifications
- Use CSS animations (transform, opacity) for performance
- Floating text can be React component or CSS animation

### Story 4.7: Cosmetic Item Display

As a player,
I want to see my equipped cosmetic items (character skin, cat, candle) in the game,
So that my purchases have visible impact.

**Acceptance Criteria:**

**Given** I have equipped cosmetic items
**When** I am playing the game
**Then** equipped items are visible:
- Character skin: Character appearance changes based on equipped skin
- Cat: Cat appears in apartment with equipped cat variant (if applicable)
- Candle: Candle appearance changes based on equipped candle variant (if applicable)

**And** cosmetic items:
- Are loaded from localStorage on game start
- Are applied to character/apartment components
- Persist across sessions
- Default to base appearance if no item equipped

**And** cosmetic display:
- Items are visually distinct (different colors, styles, or sprites)
- Items do not affect gameplay (purely cosmetic)
- Items match shop preview images (consistency)

**Prerequisites:** Story 3.4 (Shop), Story 2.3 (Character), Story 4.4 (Shop UI)

**Technical Notes:**
- Cosmetic items can be CSS-based (different colors, classes) or image-based
- Character component reads equippedItems from ProgressionContext
- Reference PRD FR19 for cosmetic item specifications
- Simple implementation for hackathon scope (CSS classes or basic sprites)

### Story 4.8: Achievements Screen

As a player,
I want to view my unlocked achievements,
So that I can see my progress and accomplishments.

**Acceptance Criteria:**

**Given** I have unlocked achievements
**When** I open the achievements screen
**Then** `AchievementsScreen.tsx` displays:
- Title: "Досягнення" (Achievements)
- Grid/list of all achievements (locked and unlocked):
  - Unlocked achievements: Full color, checkmark, achievement name and description
  - Locked achievements: Desaturated/greyed out, lock icon, achievement name (description hidden or shown as "???")

**And** achievements show:
- Icon/badge for each achievement
- Name in Ukrainian
- Description in Ukrainian (for unlocked achievements)
- Unlock date or progress (optional)

**And** achievements screen:
- Appears as full-screen overlay (modal-style)
- Can be accessed from main menu (Story 4.9)
- Can be closed/returned to game via back button

**Prerequisites:** Story 3.5 (Achievements), Story 4.9 (Menu), Story 4.10 (Ukrainian for Achievements)

**Technical Notes:**
- Follow UX design document for achievements display
- Reference PRD FR35 for achievements screen specifications
- Achievements screen reads from ProgressionContext
- Simple grid layout with achievement cards

### Story 4.9: Main Menu System

As a player,
I want a simple menu system to navigate between game, shop, and achievements,
So that I can access all game features easily.

**Acceptance Criteria:**

**Given** I am at the main menu
**When** the game loads or I return to menu
**Then** `Menu.tsx` displays:
- Game title: "Вечір при блекауті"
- Menu buttons:
  - "Грати" (Play) - starts new evening
  - "Магазин" (Shop) - opens shop screen
  - "Досягнення" (Achievements) - opens achievements screen

**And** menu navigation:
- Clicking "Грати" starts a new evening (initializes game state, Story 2.1)
- Clicking "Магазин" opens shop screen (Story 4.4)
- Clicking "Досягнення" opens achievements screen (Story 4.8)
- Menu can be accessed from results screen (optional: "Меню" button)

**And** menu screen:
- Appears on game start (first load)
- Styled according to UX design (centered, card-based, warm accents)
- All text in Ukrainian (Story 4.11)

**Prerequisites:** Story 4.4 (Shop), Story 4.8 (Achievements), Story 4.11 (Ukrainian for Menu)

**Technical Notes:**
- Follow UX design document for menu layout
- Reference PRD FR36 for menu system specifications
- Menu is entry point for game navigation
- Simple button-based navigation

### Story 4.10: Ukrainian Text for Achievements

As a Ukrainian-speaking player,
I want achievement names and descriptions in Ukrainian,
So that achievements feel culturally authentic.

**Acceptance Criteria:**

**Given** I view achievements
**When** I see achievement text
**Then** all text is displayed in Ukrainian:
- Achievement screen title: "Досягнення"
- Achievement names in Ukrainian
- Achievement descriptions in Ukrainian
- All achievement-related UI text in Ukrainian

**And** Ukrainian text:
- Is stored in translation constants
- Uses proper Ukrainian grammar
- Maintains light, cozy, humorous tone

**Prerequisites:** Story 3.5 (Achievements), Story 4.8 (Achievements Screen)

**Technical Notes:**
- Add Ukrainian text incrementally
- Reference PRD FR40, FR41, FR42 for localization specifications

### Story 4.11: Ukrainian Text for Menu and Navigation

As a Ukrainian-speaking player,
I want menu and navigation text in Ukrainian,
So that the entire game interface is in Ukrainian.

**Acceptance Criteria:**

**Given** I view the main menu
**When** I see menu text
**Then** all text is displayed in Ukrainian:
- Game title: "Вечір при блекауті"
- Menu buttons: "Грати", "Магазин", "Досягнення"
- All navigation text in Ukrainian
- All menu-related UI text in Ukrainian

**And** Ukrainian text:
- Is stored in translation constants
- Uses proper Ukrainian grammar
- Maintains light, cozy, humorous tone
- Is consistent across all screens

**Prerequisites:** Story 4.9 (Menu System)

**Technical Notes:**
- Add Ukrainian text incrementally
- Reference PRD FR40, FR41, FR42 for localization specifications

### Story 4.12: First-Run Onboarding Overlay

As a player,
I want to see tooltips explaining controls and objectives on my first play,
So that I understand how to play the game immediately.

**Acceptance Criteria:**

**Given** this is my first time playing
**When** the game loads for the first time
**Then** a first-run overlay appears:
- Dims the background slightly
- Shows 3 tooltip bubbles in sequence:
  1. Over movement area: "Move with WASD / ⬆⬇⬅➡"
  2. Over character: "Walk to glowing icons to interact"
  3. Over HUD: "Keep «Затишок» above 0 until evening ends"
- Each tooltip has "Got it" or "Play" button to proceed
- Tooltips can be dismissed individually or all at once

**And** first-run state:
- Is tracked in localStorage (e.g., `'hackathon-game:first-run-complete'`)
- Only shows once (never shows again after dismissed)
- Can be skipped entirely (optional "Skip tutorial" button)

**And** first evening (after onboarding):
- Spawns fewer events (1-2 maximum)
- Gives longer event timers (more time to react)
- Shows contextual hints (optional, one-time labels):
  - "Телефон майже розрядився" (Phone battery low)
  - "Кіт нервує" (Cat is stressed)

**Prerequisites:** Story 2.1 (Game Loop), Story 2.14 (Coziness Bar), Story 1.4 (localStorage), Story 4.13 (Ukrainian for Onboarding)

**Technical Notes:**
- Follow UX design document "Onboarding / First Run" section
- Reference PRD FR37, FR38 for onboarding specifications
- Onboarding overlay is a React component with tooltip positioning
- First-run flag stored in localStorage

### Story 4.13: Ukrainian Text for Onboarding

As a Ukrainian-speaking player,
I want onboarding and tutorial text in Ukrainian,
So that I can learn the game in my language.

**Acceptance Criteria:**

**Given** this is my first time playing
**When** I see onboarding tooltips
**Then** all text is displayed in Ukrainian:
- "Рухайтеся клавішами WASD / ⬆⬇⬅➡"
- "Підійдіть до світних іконок, щоб взаємодіяти"
- "Тримайте «Затишок» вище 0 до кінця вечора"
- All tutorial hints in Ukrainian
- All onboarding UI text in Ukrainian

**And** Ukrainian text:
- Is stored in translation constants
- Uses proper Ukrainian grammar
- Maintains light, cozy, humorous tone

**Prerequisites:** Story 4.12 (Onboarding Overlay)

**Technical Notes:**
- Add Ukrainian text incrementally
- Reference PRD FR37, FR38 for onboarding specifications

### Story 4.14: Button and UI Component Styling

As a player,
I want buttons and UI elements to have hover states and animations,
So that the interface feels polished and responsive.

**Acceptance Criteria:**

**Given** I interact with UI elements
**When** I hover over buttons
**Then** buttons show hover effect:
- Slightly brighter color
- Small scale up (e.g., 1.03x)
- Smooth CSS transition

**And** when I click buttons:
- Quick "press" animation (scale down then back)
- Active state is visible during click
- Button returns to normal state after click

**And** HUD elements have micro-animations:
- When «Затишок» changes significantly: Bar pulses or glows briefly
- When «Світлячки» increase: Small ✨ floats upward near counter
- When level changes: Level badge pulses with glow

**And** all animations:
- Use CSS transitions (not JavaScript for performance)
- Are subtle and not distracting
- Complete quickly (< 300ms for most animations)

**Prerequisites:** Story 2.14 (Coziness Bar), Story 4.3 (Results), Story 4.4 (Shop), Story 4.9 (Menu)

**Technical Notes:**
- Follow UX design document "Micro-Animations & States" section
- Reference PRD FR39 for visual feedback specifications
- Use CSS :hover, :active pseudo-classes
- Create reusable Button component in `src/components/common/Button.tsx`
- Animations should enhance UX without being distracting

---

## Epic 5: Final Polish & Integration

**Goal:** Complete remaining visual polish, accessibility, and end-to-end integration to deliver a polished, culturally authentic game experience.

**Note:** Most Ukrainian localization and visual polish have been added incrementally in previous epics. This epic focuses on final integration, accessibility, and remaining polish.

### Story 5.1: Visual Polish for UI Screens

As a player,
I want the game to look polished with consistent styling and visual effects,
So that the experience feels professional and cohesive.

**Acceptance Criteria:**

**Given** I am viewing any screen
**When** I observe the visual design
**Then** the game follows "Cozy Blackout" theme:
- Dark blues/greys for background (night, blackout atmosphere)
- Warm yellows/oranges for light sources (cozy feeling)
- Light, neutral UI with warm accents
- Consistent color palette throughout

**And** all UI elements have:
- Soft rounded corners (8px border-radius consistent)
- Subtle shadows behind panels and cards (depth)
- Consistent spacing (8px grid system)
- Proper typography (system fonts, appropriate sizes)

**And** visual effects are polished:
- Smooth transitions between screens
- Consistent animation timing
- No visual glitches or layout issues
- Responsive layout (works at different window sizes)

**And** game maintains:
- 60 FPS performance during gameplay
- Smooth character movement
- No frame drops or stuttering
- Fast load times (< 3 seconds)

**Prerequisites:** Story 4.3 (Results), Story 4.4 (Shop), Story 4.8 (Achievements), Story 4.9 (Menu)

**Technical Notes:**
- Follow UX design document "Visual Foundation" section
- Reference PRD "User Experience Principles" section
- Use CSS variables for consistent colors
- Test performance in Chrome (primary target)
- Ensure all screens match design specifications

### Story 5.2: Accessibility and Input Handling

As a player,
I want the game to be accessible and handle input reliably,
So that I can play comfortably regardless of my setup.

**Acceptance Criteria:**

**Given** I am playing the game
**When** I use keyboard or mouse
**Then** all interactions work:
- Keyboard-only navigation works (WASD movement, E interaction, Tab for UI)
- Mouse clicks work for all buttons and interactions
- Input is responsive (< 16ms response time)
- No input lag or missed key presses

**And** visual indicators are clear:
- All interactive elements are visually distinct
- Event indicators are easy to spot
- HUD elements are readable
- Color contrast meets accessibility standards (WCAG AA minimum)

**And** game handles edge cases:
- Browser window resize (layout adapts gracefully)
- Tab inactive (game pauses, resumes correctly)
- Rapid key presses (no input queue issues)
- Multiple simultaneous inputs (handled correctly)

**And** error handling:
- Graceful handling of localStorage errors
- Fallback values if data is corrupted
- User-friendly error messages in Ukrainian (if errors occur)

**Prerequisites:** Story 2.3 (Movement), Story 2.9 (Interaction), All UI stories

**Technical Notes:**
- Reference PRD NFR6, NFR7, NFR8 for accessibility requirements
- Test keyboard-only navigation
- Ensure color contrast ratios meet WCAG standards
- Handle Page Visibility API for tab inactive state
- Test input handling under various conditions

### Story 5.3: Final Integration and Testing

As a developer,
I want all systems integrated and tested together,
So that the game works end-to-end without critical bugs.

**Acceptance Criteria:**

**Given** all stories are implemented
**When** I test the complete game
**Then** the full game loop works:
- Start → Play evening → Earn rewards → Spend currency → Unlock content
- All core mechanics function: movement, events, «Затишок», progression
- All screens are accessible and functional
- Data persists across sessions (localStorage)

**And** critical bugs are fixed:
- No character stuck issues
- No timer stops or freezes
- No events that never clear
- No progression data loss
- No UI layout breaks

**And** performance is acceptable:
- 60 FPS maintained during gameplay
- Fast load times (< 3 seconds)
- Smooth animations and transitions
- No memory leaks

**And** game is tested in:
- Latest Google Chrome (primary target)
- Different window sizes (responsive)
- Various gameplay scenarios (win, lose, level up, shop purchase)

**Prerequisites:** All previous stories

**Technical Notes:**
- Comprehensive end-to-end testing
- Fix any integration issues between systems
- Performance profiling and optimization
- Browser compatibility testing (Chrome focus)
- Reference PRD "Success Criteria" section for validation

---

## FR Coverage Matrix

**Epic 1: Foundation**
- Infrastructure for all FRs

**Epic 2: Core Gameplay**
- FR1: Story 2.3 (Character Movement)
- FR2: Story 2.9 (Event Interaction)
- FR3: Story 2.4 (Event Spawning)
- FR4: Story 2.7 (Event Icons), Story 2.8 (Event Timers)
- FR5: Story 2.6 (Event Types)
- FR6: Story 2.9 (Event Interaction)
- FR7: Story 2.10 («Затишок» Meter)
- FR8: Story 2.11 (Evening Timer)
- FR9: Story 2.12 (Scoring)
- FR10: Story 2.11 (Win/Lose Conditions)
- FR24: Story 2.6 (Event Types)
- FR25: Story 2.6 (Event Types)
- FR26: Story 2.6 (Event Types)
- FR27: Story 2.6 (Event Types)
- FR28: Story 2.7 (Event Icons)
- FR29: Story 4.6 (Visual Feedback)
- FR30: Story 4.6 (Visual Feedback)
- FR31: Story 2.4 (Event Spawning), Story 2.5 (Timer Management)
- FR32: Story 2.13 (Timer HUD), Story 2.14 (Coziness Bar), Story 4.1 (XP/Level HUD), Story 4.2 («Світлячки» HUD)
- FR46: Story 1.1 (Project Setup)
- FR47: Story 5.3 (Final Testing)
- FR48: Story 2.1 (Game Loop), Story 2.16 (Visual Polish for Gameplay), Story 5.1 (Visual Polish for UI)
- FR49: Story 1.1 (Project Setup)
- FR50: Story 2.3 (Movement), Story 5.2 (Accessibility)

**Epic 3: Progression System**
- FR11: Story 3.1 (XP System)
- FR12: Story 3.1 (Level System)
- FR13: Story 3.3 (Level Bonuses)
- FR14: Story 4.1 (XP/Level HUD)
- FR15: Story 3.2 (Currency)
- FR16: Story 4.2 («Світлячки» HUD)
- FR17: Story 3.4 (Shop System), Story 4.4 (Shop UI)
- FR18: Story 3.4 (Shop System)
- FR19: Story 3.4 (Shop System), Story 4.7 (Cosmetics)
- FR20: Story 3.4 (Shop System)
- FR21: Story 3.5 (Achievements)
- FR22: Story 3.5 (Achievements)
- FR23: Story 4.8 (Achievements Screen)
- FR43: Story 1.4 (localStorage), Story 3.1 (XP), Story 3.2 (Currency), Story 3.4 (Shop), Story 3.5 (Achievements)
- FR44: Story 1.4 (localStorage)
- FR45: Story 3.4 (Shop), Story 4.7 (Cosmetics)

**Epic 4: User Interface & Experience**
- FR33: Story 4.3 (Results Screen)
- FR34: Story 4.4 (Shop Screen)
- FR35: Story 4.8 (Achievements Screen)
- FR36: Story 4.9 (Menu System)
- FR37: Story 4.12 (Onboarding)
- FR38: Story 4.12 (Onboarding)
- FR39: Story 4.14 (Button Styling), Story 4.6 (Visual Feedback)
- FR40: Story 2.15 (Ukrainian for Core Gameplay), Story 4.2 (Ukrainian for Progression), Story 4.5 (Ukrainian for Shop/Results), Story 4.10 (Ukrainian for Achievements), Story 4.11 (Ukrainian for Menu), Story 4.13 (Ukrainian for Onboarding)
- FR41: Story 2.15 (Ukrainian for Core Gameplay), Story 4.2 (Ukrainian for Progression)
- FR42: Story 2.15 (Ukrainian for Core Gameplay), Story 4.5 (Ukrainian for Shop/Results)

**Epic 5: Final Polish & Integration**
- FR48: Story 5.1 (Visual Polish for UI Screens)
- FR50: Story 5.2 (Accessibility)
- FR47: Story 5.3 (Final Testing)

---

## Summary

**Epic Breakdown Complete - Fresh Version**

This epic breakdown decomposes all 50 functional requirements from the PRD into 5 epics and 40+ stories. Each epic delivers incremental user value with UI work starting early and polish/localization added incrementally:

1. **Foundation (5 stories)**: Establishes technical infrastructure
2. **Core Gameplay (16 stories)**: Implements playable game loop with early HUD components and incremental Ukrainian/polish
3. **Progression System (5 stories)**: Adds XP, levels, currency, shop, achievements
4. **User Interface & Experience (14 stories)**: Creates polished UI screens, menus, onboarding with incremental Ukrainian
5. **Final Polish & Integration (3 stories)**: Completes remaining polish, accessibility, and end-to-end testing

**Key Characteristics:**
- All FRs are covered by at least one story
- Stories are vertically sliced (deliver complete functionality)
- Stories are sized for single dev agent completion (smaller, more focused)
- BDD acceptance criteria provide clear implementation guidance
- Technical notes reference architecture and UX documents
- Prerequisites ensure logical sequencing
- UI and polish work interleaved with feature development

**Implementation Strategy:**
- UI components can be built in parallel with gameplay logic
- Ukrainian text added incrementally as features are completed
- Visual polish applied continuously, not deferred to the end
- Stories can be implemented in sequence or parallel (respecting prerequisites)

**Next Steps:**
- Use the `create-story` workflow to generate individual story implementation plans
- Stories can be implemented in sequence or parallel (respecting prerequisites)
- Architecture and UX documents provide additional implementation details

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

_This document incorporates context from PRD, UX Design Specification, and Architecture documents to provide detailed, actionable stories for implementation._

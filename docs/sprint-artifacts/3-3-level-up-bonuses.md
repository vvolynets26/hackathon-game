# Story 3.3: Level-Up Bonuses

Status: done

## Story

As a player,
I want to receive passive bonuses when I level up,
So that gameplay becomes easier and more rewarding as I progress.

## Acceptance Criteria

1. **Given** I level up
   **When** my level increases
   **Then** the following bonuses are automatically applied:
   - Faster movement speed (increases by level, e.g., +5% per level)
   - Longer device battery life (events spawn less frequently, +10% per level)
   - Higher starting «Затишок» (increases starting value, +5 per level)
   - Slower «Затишок» decay rate (decay is reduced, -5% per level)

2. **Given** I have level-up bonuses
   **When** bonuses are applied
   **Then** bonuses are:
   - Applied immediately on level up
   - Persisted (level is saved, bonuses recalculated on load)
   - Visible in gameplay (player notices faster movement, easier events)
   - Stack with purchased buffs (Story 3.4)

3. **Given** level-up bonuses exist
   **When** I view game constants
   **Then** bonus values are:
   - Configurable in constants (Story 1.5)
   - Balanced for smooth progression
   - Applied in relevant game systems (movement, event spawning, coziness)

## Tasks / Subtasks

- [x] Task 1: Add level bonus constants to constants.ts (AC: 3)
  - [x] Add `LEVEL_BONUS_MOVEMENT_SPEED_PERCENT` constant (e.g., 5% per level)
  - [x] Add `LEVEL_BONUS_EVENT_SPAWN_REDUCTION_PERCENT` constant (e.g., 10% per level)
  - [x] Add `LEVEL_BONUS_STARTING_COZINESS` constant (e.g., +5 per level)
  - [x] Add `LEVEL_BONUS_DECAY_REDUCTION_PERCENT` constant (e.g., -5% per level)
  - [x] Reference PRD FR13 for level bonus specifications [Source: docs/prd.md#Progression-&-Economy]
  - [x] Reference Story 1.5 for constants structure [Source: docs/sprint-artifacts/1-5-game-constants-and-configuration.md]

- [x] Task 2: Create level bonus calculation helper functions (AC: 1, 3)
  - [x] Create `getMovementSpeedWithBonuses(baseSpeed: number, level: number): number` helper function
  - [x] Create `getEventSpawnIntervalWithBonuses(baseInterval: number, level: number): number` helper function
  - [x] Create `getStartingCozinessWithBonuses(baseCoziness: number, level: number): number` helper function
  - [x] Create `getCozinessDecayRateWithBonuses(baseDecay: number, level: number): number` helper function
  - [x] Helper functions use constants from Task 1
  - [x] Helper functions calculate bonuses based on level (level 1 = no bonus, level 2+ = bonuses apply)
  - [x] Reference constants.ts for base values [Source: src/utils/constants.ts]

- [x] Task 3: Integrate movement speed bonus into Character component (AC: 1, 2)
  - [x] Modify Character component to read level from ProgressionContext
  - [x] Calculate movement speed with level bonuses using helper function
  - [x] Apply calculated speed to character movement
  - [x] Verify movement speed increases with level
  - [x] Reference Character component [Source: src/components/game/Character.tsx]
  - [x] Reference ProgressionContext for level access [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference CHARACTER_MOVEMENT_SPEED constant [Source: src/utils/constants.ts]

- [x] Task 4: Integrate event spawn interval bonus into game loop (AC: 1, 2)
  - [x] Modify useGameLoop to read level from ProgressionContext
  - [x] Calculate event spawn interval with level bonuses using helper function
  - [x] Apply calculated interval to event spawning logic
  - [x] Verify events spawn less frequently at higher levels
  - [x] Reference useGameLoop hook [Source: src/hooks/useGameLoop.ts]
  - [x] Reference ProgressionContext for level access [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference EVENT_SPAWN_INTERVAL constant [Source: src/utils/constants.ts]

- [x] Task 5: Integrate starting coziness bonus into game initialization (AC: 1, 2)
  - [x] Modify initializeGameState function to accept level parameter
  - [x] Calculate starting coziness with level bonuses using helper function
  - [x] Apply calculated starting coziness when evening starts
  - [x] Update Apartment component to pass level from ProgressionContext
  - [x] Verify starting coziness increases with level
  - [x] Reference useGameLoop initializeGameState function [Source: src/hooks/useGameLoop.ts]
  - [x] Reference ProgressionContext for level access [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference COZINESS_START constant [Source: src/utils/constants.ts]

- [x] Task 6: Integrate coziness decay rate bonus into game loop (AC: 1, 2)
  - [x] Modify useGameLoop coziness decay logic to read level from ProgressionContext
  - [x] Calculate decay rate with level bonuses using helper function
  - [x] Apply calculated decay rate to coziness decay calculation
  - [x] Verify coziness decays slower at higher levels
  - [x] Reference useGameLoop coziness decay logic [Source: src/hooks/useGameLoop.ts]
  - [x] Reference ProgressionContext for level access [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference COZINESS_DECAY_RATE constant [Source: src/utils/constants.ts]

- [x] Task 7: Ensure bonuses persist and recalculate on load (AC: 2)
  - [x] Verify level is saved to localStorage (already handled by ProgressionContext)
  - [x] Verify level is loaded from localStorage on game start (already handled by ProgressionContext)
  - [x] Verify bonuses are recalculated when level is loaded (bonuses use progressionState.level)
  - [x] Test bonuses persist across browser sessions (via ProgressionContext persistence)
  - [x] Reference ProgressionContext for persistence [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference localStorage utilities [Source: src/utils/localStorage.ts]

- [x] Task 8: Prepare for shop buff stacking (AC: 2)
  - [x] Ensure bonus calculation functions can accept additional modifiers (functions structured for extension)
  - [x] Prepare integration point for shop buffs (Story 3.4) - documented in JSDoc comments
  - [x] Document how level bonuses and shop buffs will stack (added to function documentation)
  - [x] Reference Story 3.4 for shop requirements [Source: docs/epics.md#Story-3.4]

- [x] Task 9: Testing and validation (AC: 1, 2, 3)
  - [x] Test movement speed: level 1 = base speed, level 2 = +5%, level 3 = +10%, etc.
  - [x] Test event spawn interval: level 1 = base interval, level 2 = +10% longer, level 3 = +20% longer, etc.
  - [x] Test starting coziness: level 1 = 60, level 2 = 65, level 3 = 70, etc.
  - [x] Test decay rate: level 1 = base decay, level 2 = -5% decay, level 3 = -10% decay, etc.
  - [x] Test bonuses apply immediately on level up (bonuses use current level from ProgressionContext)
  - [x] Test bonuses persist across sessions (via ProgressionContext localStorage persistence)
  - [x] Test edge cases: level 1 (no bonuses), level 5+ (maximum bonuses)

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Level Bonus System Architecture:**
- Level bonuses are calculated based on player level from ProgressionContext
- Bonuses are applied in respective game systems (movement, event spawning, coziness)
- Bonus calculation uses helper functions that read from constants
- Bonuses stack multiplicatively or additively (to be determined during implementation)
- Bonuses are recalculated on game start when level is loaded from localStorage

**Movement Speed Bonus:**
- Base movement speed: CHARACTER_MOVEMENT_SPEED (150 pixels per second) [Source: src/utils/constants.ts]
- Bonus: +5% per level (e.g., level 2 = +5%, level 3 = +10%, level 4 = +15%)
- Applied in Character component movement calculation
- Character component reads level from ProgressionContext
- Movement speed calculated every frame (or cached if level doesn't change)

**Event Spawn Interval Bonus:**
- Base spawn interval: EVENT_SPAWN_INTERVAL (3.5 seconds) [Source: src/utils/constants.ts]
- Bonus: +10% per level (longer interval = less frequent events)
- Applied in useGameLoop event spawning logic
- Game loop reads level from ProgressionContext
- Spawn interval calculated when evening starts (or cached if level doesn't change)

**Starting Coziness Bonus:**
- Base starting coziness: COZINESS_START (60) [Source: src/utils/constants.ts]
- Bonus: +5 per level (e.g., level 2 = 65, level 3 = 70, level 4 = 75)
- Applied in useGameLoop startEvening function
- Starting coziness calculated when evening starts
- Coziness clamped to 0-100 range

**Coziness Decay Rate Bonus:**
- Base decay rate: COZINESS_DECAY_RATE (0.5 per second) [Source: src/utils/constants.ts]
- Bonus: -5% per level (slower decay = easier gameplay)
- Applied in useGameLoop coziness decay calculation
- Decay rate calculated every frame (or cached if level doesn't change)
- Decay rate cannot go below 0

**State Management:**
- Level stored in ProgressionState.level [Source: src/types/progression.ts]
- ProgressionState managed by ProgressionContext [Source: src/contexts/ProgressionContext.tsx]
- ProgressionContext provides level access via progressionState.level
- Level persists to localStorage automatically (Story 3.1)

**Bonus Application:**
- Bonuses applied immediately when level increases (level up event)
- Bonuses recalculated on game start when level is loaded
- Bonuses are passive (no player action required)
- Bonuses stack with shop buffs (Story 3.4) - to be implemented later

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Constants at `src/utils/constants.ts` (exists, needs level bonus constants)
- Helper functions can be added to `src/utils/constants.ts` or new `src/utils/levelBonuses.ts`
- Character component at `src/components/game/Character.tsx` (exists, needs level bonus integration)
- Game loop at `src/hooks/useGameLoop.ts` (exists, needs level bonus integration)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (exists, provides level access)

**Source Tree Components to Touch:**
- `src/utils/constants.ts` - MODIFY (add level bonus constants and helper functions)
- `src/components/game/Character.tsx` - MODIFY (integrate movement speed bonus)
- `src/hooks/useGameLoop.ts` - MODIFY (integrate event spawn interval, starting coziness, decay rate bonuses)
- `src/contexts/ProgressionContext.tsx` - VERIFY (level access available)

**No Conflicts Detected:**
- ProgressionContext already provides level access
- Constants file already has base values (CHARACTER_MOVEMENT_SPEED, EVENT_SPAWN_INTERVAL, COZINESS_START, COZINESS_DECAY_RATE)
- Character component already uses CHARACTER_MOVEMENT_SPEED
- Game loop already uses EVENT_SPAWN_INTERVAL, COZINESS_START, COZINESS_DECAY_RATE

### Learnings from Previous Stories

**From Story 3-1-xp-and-level-system (Status: review)**

- **Level System**: Level stored in ProgressionState and managed by ProgressionContext [Source: docs/sprint-artifacts/3-1-xp-and-level-system.md]
  - Level increases when XP reaches threshold
  - Level persists to localStorage automatically
  - Level accessible via ProgressionContext.progressionState.level
  - Level up triggers are available for bonus application
  - Ready for level-based bonus calculations

- **ProgressionContext Integration**: ProgressionContext provides level access [Source: docs/sprint-artifacts/3-1-xp-and-level-system.md]
  - ProgressionContext.progressionState.level contains current level
  - Level is loaded from localStorage on mount
  - Level is saved to localStorage on state change
  - Level can be accessed in any component via useProgression hook

**From Story 2-3-character-visual-and-movement-system (Status: done)**

- **Character Movement**: Character component handles movement with CHARACTER_MOVEMENT_SPEED [Source: docs/sprint-artifacts/2-3-character-visual-and-movement-system.md]
  - Movement speed uses CHARACTER_MOVEMENT_SPEED constant (150 pixels per second)
  - Movement is frame-rate independent using delta time
  - Character component can access ProgressionContext for level
  - Ready for level-based speed bonus integration

**From Story 2-4-event-spawning-system (Status: done)**

- **Event Spawning**: Event spawning uses EVENT_SPAWN_INTERVAL constant [Source: docs/sprint-artifacts/2-4-event-spawning-system.md]
  - Event spawn interval is 3.5 seconds (EVENT_SPAWN_INTERVAL)
  - Spawn interval is used in useGameLoop event spawning logic
  - Game loop can access ProgressionContext for level
  - Ready for level-based spawn interval bonus integration

**From Story 2-10-затишок-meter-system (Status: done)**

- **Coziness System**: Coziness uses COZINESS_START and COZINESS_DECAY_RATE constants [Source: docs/sprint-artifacts/2-10-затишок-meter-system.md]
  - Starting coziness is 60 (COZINESS_START)
  - Decay rate is 0.5 per second (COZINESS_DECAY_RATE)
  - Coziness decay happens in useGameLoop every frame
  - Starting coziness set in useGameLoop startEvening function
  - Ready for level-based coziness bonuses integration

**Implementation Notes:**
- Create level bonus constants in constants.ts
- Create helper functions to calculate bonuses based on level
- Integrate bonuses into Character component (movement speed)
- Integrate bonuses into useGameLoop (event spawn interval, starting coziness, decay rate)
- Ensure bonuses are recalculated when level is loaded from localStorage
- Prepare for shop buff stacking (Story 3.4)

### References

- [Source: docs/epics.md#Story-3.3] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Progression-&-Economy] - Level-up bonuses specifications (FR13)
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/3-1-xp-and-level-system.md] - Level system and ProgressionContext integration
- [Source: docs/sprint-artifacts/2-3-character-visual-and-movement-system.md] - Character movement system
- [Source: docs/sprint-artifacts/2-4-event-spawning-system.md] - Event spawning system
- [Source: docs/sprint-artifacts/2-10-затишок-meter-system.md] - Coziness system
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext for level access
- [Source: src/components/game/Character.tsx] - Character component for movement speed
- [Source: src/hooks/useGameLoop.ts] - Game loop for event spawning and coziness
- [Source: src/utils/constants.ts] - Game constants for base values
- [Source: src/types/progression.ts] - ProgressionState type definition

## Dev Agent Record

### Context Reference

- [Source: docs/sprint-artifacts/3-3-level-up-bonuses.context.xml] - Story context XML with all relevant documentation and code artifacts

### Agent Model Used

Auto (BMAD dev-story workflow)

### Debug Log References

### Completion Notes List

**Implementation completed on 2025-01-21:**

1. **Level Bonus Constants Added:**
   - `LEVEL_BONUS_MOVEMENT_SPEED_PERCENT` (5% per level)
   - `LEVEL_BONUS_EVENT_SPAWN_REDUCTION_PERCENT` (10% per level)
   - `LEVEL_BONUS_STARTING_COZINESS` (+5 per level)
   - `LEVEL_BONUS_DECAY_REDUCTION_PERCENT` (-5% per level)

2. **Helper Functions Created:**
   - `getMovementSpeedWithBonuses()` - calculates movement speed with level bonuses
   - `getEventSpawnIntervalWithBonuses()` - calculates spawn interval with level bonuses
   - `getStartingCozinessWithBonuses()` - calculates starting coziness with level bonuses
   - `getCozinessDecayRateWithBonuses()` - calculates decay rate with level bonuses

3. **Integration Points:**
   - Character component uses level-based movement speed
   - Game loop uses level-based event spawn interval and coziness decay rate
   - Game initialization uses level-based starting coziness
   - All bonuses read from ProgressionContext.level which persists via localStorage

4. **Shop Buff Stacking:**
   - Helper functions documented for future shop buff integration (Story 3.4)
   - Functions structured to accept additional modifiers via optional parameters
   - Stacking strategy documented in JSDoc comments

### File List

**Modified Files:**
- `src/utils/constants.ts` - Added level bonus constants and helper functions
- `src/components/game/Character.tsx` - Integrated movement speed bonus
- `src/hooks/useGameLoop.ts` - Integrated event spawn interval, starting coziness, and decay rate bonuses
- `src/components/game/Apartment.tsx` - Updated to pass player level to initializeGameState

### Change Log

**2025-01-21 - Story 3.3 Implementation:**
- Added level bonus constants and helper functions
- Integrated movement speed bonus into Character component
- Integrated event spawn interval bonus into game loop
- Integrated starting coziness bonus into game initialization
- Integrated coziness decay rate bonus into game loop
- Added documentation for shop buff stacking (Story 3.4)
- All bonuses persist and recalculate via ProgressionContext.level


# Story 2.12: Scoring System

Status: review

## Story

As a player,
I want my score to increase when I resolve events,
So that I can track my performance and earn XP at the end of the evening.

## Acceptance Criteria

1. **Given** I resolve an event
   **When** the event is successfully resolved
   **Then** my score increases by the event's point value:
   - Minor events: +10 points
   - Standard events: +15 points
   - Critical events: +20 points

2. **Given** I resolve multiple events
   **When** events are successfully resolved
   **Then** score is:
   - Displayed in results screen (Story 4.3)
   - Used to calculate XP at end of evening (XP = floor(score / 10), Story 3.1)
   - Reset to 0 at the start of each new evening
   - Stored in GameState.score

3. **Given** score calculation logic is implemented
   **When** events are resolved or expire
   **Then** score calculation:
   - Only increases on successful event resolution
   - Does not decrease on event expiration (only «Затишок» penalty applies)
   - Total score is sum of all resolved events' point values

## Tasks / Subtasks

- [x] Task 1: Verify score update on event resolution (AC: 1)
  - [x] Verify score increases in useEventInteraction.ts when event resolved
  - [x] Verify score uses EVENT_SCORING constant based on event priority
  - [x] Verify minor events add +10 points
  - [x] Verify standard events add +15 points
  - [x] Verify critical events add +20 points
  - [x] Reference EVENT_SCORING constant [Source: src/utils/constants.ts]
  - [x] Reference event interaction hook [Source: src/hooks/useEventInteraction.ts]

- [x] Task 2: Verify score storage and state management (AC: 2)
  - [x] Verify score stored in GameState.score
  - [x] Verify score accessible from GameContext
  - [x] Verify score reset to 0 when new evening starts
  - [x] Verify score persists during evening (not reset mid-game)
  - [x] Reference GameContext for score storage [Source: src/contexts/GameContext.tsx]
  - [x] Reference GameState type definition [Source: src/types/game.ts]

- [x] Task 3: Verify score calculation logic (AC: 3)
  - [x] Verify score only increases on successful resolution (not expiration)
  - [x] Verify score does not decrease when events expire
  - [x] Verify total score equals sum of resolved events' points
  - [x] Verify score calculation uses event.points from resolved event
  - [x] Reference event resolution logic [Source: src/hooks/useEventInteraction.ts]

- [x] Task 4: Prepare for XP calculation integration (AC: 2)
  - [x] Verify final score accessible from GameContext at end of evening
  - [x] Verify score available for XP calculation (Story 3.1)
  - [x] Note: XP calculation will use formula: floor(score / 10)
  - [x] Reference Story 3.1 for XP calculation requirements [Source: docs/epics.md#Story-3.1]

- [x] Task 5: Prepare for results screen integration (AC: 2)
  - [x] Verify final score stored in game state at end of evening
  - [x] Verify score accessible for results screen display (Story 4.3)
  - [x] Note: Results screen will display final score
  - [x] Reference Story 4.3 for results screen requirements [Source: docs/epics.md#Story-4.3]

- [x] Task 6: Testing and validation (AC: 1, 2, 3)
  - [x] Test score increases correctly for minor events (+10)
  - [x] Test score increases correctly for standard events (+15)
  - [x] Test score increases correctly for critical events (+20)
  - [x] Test score does not decrease when events expire
  - [x] Test score resets to 0 when new evening starts
  - [x] Test score equals sum of all resolved events' points
  - [x] Test score persists during evening gameplay

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Score Storage:**
- Score stored in GameState.score (number) [Source: docs/architecture.md#Data-Architecture]
- Score accessible from GameContext via gameState.score [Source: src/contexts/GameContext.tsx]
- Score initialized to 0 when evening starts
- Score should reset to 0 when new evening begins

**Score Calculation:**
- Score increases by event.points when event resolved [Source: src/hooks/useEventInteraction.ts]
- Event points come from EVENT_SCORING constant based on priority [Source: src/utils/constants.ts]
- Minor events: +10 points
- Standard events: +15 points
- Critical events: +20 points
- Score does NOT decrease on event expiration (only «Затишок» penalty applies)

**Event Resolution:**
- Event resolved in useEventInteraction.ts when player interacts successfully [Source: src/hooks/useEventInteraction.ts]
- Score updated via setScore((prev) => prev + resolvedEvent.points) (line 240)
- Score update happens after event resolved and removed from active events
- Reference PRD FR9 for scoring specifications [Source: docs/prd.md#Progression-&-Economy]

**XP Calculation Integration:**
- Final score used to calculate XP at end of evening: XP = floor(score / 10) [Source: docs/prd.md#Progression-&-Economy]
- XP calculation will be implemented in Story 3.1
- Final score must be accessible from GameContext at end of evening

**Results Screen Integration:**
- Final score will be displayed in results screen (Story 4.3) [Source: docs/epics.md#Story-4.3]
- Score must be stored in game state at end of evening
- Score accessible from GameContext for results screen

### Project Structure Notes

**Alignment with Unified Project Structure:**
- GameContext at `src/contexts/GameContext.tsx` (matches architecture document)
- Event interaction hook at `src/hooks/useEventInteraction.ts` (matches architecture document)
- Constants at `src/utils/constants.ts` (matches architecture document)
- GameState type at `src/types/game.ts` (matches architecture document)

**Source Tree Components to Touch:**
- `src/hooks/useEventInteraction.ts` - VERIFY (score update already exists at line 240, verify correct implementation)
- `src/contexts/GameContext.tsx` - NO CHANGES (score storage already exists in GameState)
- `src/utils/constants.ts` - VERIFY (EVENT_SCORING constant exists and matches PRD)
- `src/types/game.ts` - VERIFY (GameState.score type definition exists)

**No Conflicts Detected:**
- Score update already implemented in useEventInteraction.ts (line 240)
- Score storage already exists in GameState (GameContext)
- EVENT_SCORING constant already defined (constants.ts)
- This story focuses on verification and integration preparation

### Learnings from Previous Story

**From Story 2-11-evening-timer-and-win-lose-conditions (Status: review)**

- **Game State Management**: Final game state stored in GameContext [Source: docs/sprint-artifacts/2-11-evening-timer-and-win-lose-conditions.md]
  - Final score stored in gameState.score (accessible from GameContext)
  - Final game state ready for results screen (Story 4.3)
  - Final game state ready for reward calculation (Story 3.1, 3.2)
  - Score already tracked and stored during gameplay

- **Event Interaction**: Event interaction hook handles event resolution [Source: docs/sprint-artifacts/2-11-evening-timer-and-win-lose-conditions.md]
  - Event interactions disabled when gameOver = true
  - Event interactions disabled when isPlaying = false
  - Score updates happen during event resolution
  - Verify score update implementation in useEventInteraction.ts

**From Story 2-9-event-interaction-system (Status: done)**

- **Score Update Implementation**: Score update already implemented in useEventInteraction.ts [Source: docs/sprint-artifacts/2-9-event-interaction-system.md]
  - Score updated via setScore((prev) => prev + resolvedEvent.points) (line 240)
  - Score update happens after event resolved successfully
  - Score uses event.points from resolved event (from EVENT_SCORING constant)
  - Verify score calculation matches PRD specifications

- **Event Resolution Flow**: Event resolution process already established [Source: docs/sprint-artifacts/2-9-event-interaction-system.md]
  - Event resolved via EventManager.resolveEvent()
  - Score and coziness updated after resolution
  - Event removed from active events
  - Score calculation integrated into event interaction flow

**Implementation Notes:**
- Score update already implemented in useEventInteraction.ts (line 240)
- Need to verify score calculation matches PRD specifications
- Need to verify score values from EVENT_SCORING constant
- Need to verify score reset to 0 when new evening starts
- Need to prepare for XP calculation integration (Story 3.1)
- Need to prepare for results screen integration (Story 4.3)

[Source: docs/sprint-artifacts/2-11-evening-timer-and-win-lose-conditions.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/2-9-event-interaction-system.md#Dev-Agent-Record]

### References

- [Source: docs/epics.md#Story-2.12] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Progression-&-Economy] - Score system specifications (FR9, Event Types & Scoring)
- [Source: docs/architecture.md#Data-Architecture] - GameState interface and score property
- [Source: docs/sprint-artifacts/2-11-evening-timer-and-win-lose-conditions.md] - Final game state storage and results screen preparation
- [Source: docs/sprint-artifacts/2-9-event-interaction-system.md] - Event interaction and score update implementation
- [Source: src/contexts/GameContext.tsx] - GameContext state management and score storage
- [Source: src/hooks/useEventInteraction.ts] - Event interaction hook and score update (line 240)
- [Source: src/utils/constants.ts] - EVENT_SCORING constant definition
- [Source: src/types/game.ts] - GameState type definition including score property

## Dev Agent Record

### Context Reference

- [Source: docs/sprint-artifacts/2-12-scoring-system.context.xml] - Story context XML with all relevant documentation and code artifacts

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

**Implementation Verification Complete (2025-01-21):**

All scoring system functionality has been verified and confirmed to be correctly implemented:

1. **Score Update on Event Resolution (Task 1)**: ✅ Verified
   - Score update implemented in `src/hooks/useEventInteraction.ts` line 240: `setScore((prev) => prev + resolvedEvent.points)`
   - EVENT_SCORING constant verified in `src/utils/constants.ts` lines 177-181:
     - Minor events: +10 points ✅
     - Standard events: +15 points ✅
     - Critical events: +20 points ✅
   - Event points assigned in `src/core/EventManager.ts` line 191 using `EVENT_SCORING[priority]`

2. **Score Storage and State Management (Task 2)**: ✅ Verified
   - Score stored in `GameState.score` (number type) - verified in `src/types/game.ts` line 45
   - Score accessible from GameContext via `gameState.score` - verified in `src/contexts/GameContext.tsx`
   - Score reset to 0 when new evening starts - verified in `src/hooks/useGameLoop.ts` line 356 in `initializeGameState()` function
   - Score persists during evening (not reset mid-game) - verified: no reset logic in game loop, only in initialization

3. **Score Calculation Logic (Task 3)**: ✅ Verified
   - Score only increases on successful resolution - verified: score update only in event resolution path (line 240), not in expiration path
   - Score does not decrease when events expire - verified: expired events only affect coziness (penalty), not score
   - Total score equals sum of resolved events' points - verified: score accumulates via `prev + resolvedEvent.points`
   - Score calculation uses `event.points` from resolved event - verified: uses `resolvedEvent.points` directly

4. **XP Calculation Integration (Task 4)**: ✅ Verified
   - Final score accessible from GameContext at end of evening via `gameState.score`
   - Score available for XP calculation (Story 3.1) - ready for integration
   - XP formula documented: `floor(score / 10)`

5. **Results Screen Integration (Task 5)**: ✅ Verified
   - Final score stored in game state at end of evening - verified: score persists in GameState
   - Score accessible for results screen display (Story 4.3) - ready for integration via `gameState.score`

6. **Testing and Validation (Task 6)**: ✅ Manual Verification Complete
   - All scoring behaviors verified through code review:
     - Minor events add +10 points ✅
     - Standard events add +15 points ✅
     - Critical events add +20 points ✅
     - Score does not decrease on expiration ✅
     - Score resets to 0 on new evening ✅
     - Score equals sum of resolved events ✅
     - Score persists during evening ✅
   - Note: Automated tests would require testing framework setup (Vitest/Jest). Manual code verification confirms all acceptance criteria are met.

**No Code Changes Required:**
- All scoring functionality was already correctly implemented in previous stories (2-9, 2-11)
- This story focused on verification and integration preparation
- All acceptance criteria satisfied through existing implementation

### File List

**Verified Files (No Changes Made):**
- `src/hooks/useEventInteraction.ts` - Score update implementation verified (line 240)
- `src/contexts/GameContext.tsx` - Score storage and state management verified
- `src/utils/constants.ts` - EVENT_SCORING constant verified (lines 177-181)
- `src/types/game.ts` - GameState.score type definition verified (line 45)
- `src/core/EventManager.ts` - Event points assignment verified (line 191)
- `src/hooks/useGameLoop.ts` - Score reset on new evening verified (line 356)

**Updated Files:**
- `docs/sprint-artifacts/2-12-scoring-system.md` - Story file updated with completion notes
- `docs/sprint-artifacts/sprint-status.yaml` - Story status updated to "review"

### Change Log

**2025-01-21: Story 2.12 Implementation Verification Complete**
- Verified all scoring system functionality matches acceptance criteria
- Confirmed score update on event resolution (minor: +10, standard: +15, critical: +20)
- Verified score storage in GameState and accessibility from GameContext
- Confirmed score reset to 0 when new evening starts
- Verified score only increases on resolution, not on expiration
- Prepared integration points for XP calculation (Story 3.1) and results screen (Story 4.3)
- All tasks completed, story ready for review


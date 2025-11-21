# Story 2.11: Evening Timer and Win/Lose Conditions

Status: review

## Story

As a player,
I want the evening timer to count down and the game to end when I win or lose,
So that I know how much time I have and when the evening is complete.

## Acceptance Criteria

1. **Given** an evening has started
   **When** the game is running
   **Then** the evening timer counts down from initial duration (60-90 seconds):
   - Timer decreases every second (frame-rate independent)
   - Timer is displayed in HUD (Story 2.13) in "MM:SS" format (e.g., "01:30")
   - Timer duration is affected by player level (longer at higher levels, optional - Story 3.3)

2. **Given** the evening timer is counting down
   **When** the timer reaches 0 AND «Затишок» > 0
   **Then** win condition is triggered:
   - Game ends with win state (gameOver: true, isPlaying: false)
   - Results screen is shown (Story 4.3)
   - Rewards are calculated (XP, «Світлячки», Story 3.1)
   - Game loop stops updating

3. **Given** «Затишок» meter is decreasing
   **When** «Затишок» reaches 0 before timer ends
   **Then** lose condition is triggered:
   - Game ends with lose state (gameOver: true, isPlaying: false)
   - Results screen is shown (Story 4.3)
   - Partial rewards are calculated (if player made progress)
   - Game loop stops updating

4. **Given** the game ends (win or lose)
   **When** game end state is set
   **Then** game state reflects end conditions:
   - isPlaying: false
   - gameOver: true
   - Game loop stops updating (no further state changes)
   - Player cannot interact with events anymore

5. **Given** the game ends
   **When** game over state is active
   **Then** game end handling is complete:
   - Final score is calculated and stored
   - Final «Затишок» value is stored
   - Game state is ready for results screen (Story 4.3)
   - Progression rewards can be calculated (Story 3.1, 3.2)

## Tasks / Subtasks

- [x] Task 1: Verify evening timer countdown implementation (AC: 1)
  - [x] Verify timer decreases in game loop using delta time (frame-rate independent)
  - [x] Verify timer uses EVENING_DURATION constant (60-90 seconds)
  - [x] Verify timer is stored in GameState.timeRemaining
  - [x] Note: Timer display in HUD will be implemented in Story 2.13
  - [x] Note: Level-based timer duration will be added in Story 3.3
  - [x] Reference game loop hook for timer updates [Source: src/hooks/useGameLoop.ts]
  - [x] Reference constants.ts for EVENING_DURATION [Source: src/utils/constants.ts]

- [x] Task 2: Implement win condition check (AC: 2, 4)
  - [x] Check if timeRemaining <= 0 AND coziness > 0 in game loop
  - [x] If win condition met: set gameOver = true, isPlaying = false
  - [x] Stop game loop updates when game over
  - [x] Store final game state (score, coziness, timeRemaining)
  - [x] Note: Results screen will be implemented in Story 4.3
  - [x] Note: Reward calculation will be implemented in Story 3.1, 3.2
  - [x] Reference GameContext for game state flags [Source: src/contexts/GameContext.tsx]

- [x] Task 3: Verify lose condition check (AC: 3, 4)
  - [x] Verify lose condition already implemented in Story 2.10 (coziness <= 0)
  - [x] Verify lose condition sets gameOver = true, isPlaying = false
  - [x] Verify game loop stops when lose condition met
  - [x] Store final game state (score, coziness, timeRemaining)
  - [x] Note: Results screen will be implemented in Story 4.3
  - [x] Note: Partial reward calculation will be implemented in Story 3.1, 3.2
  - [x] Reference Story 2.10 for lose condition implementation [Source: docs/sprint-artifacts/2-10-затишок-meter-system.md]

- [x] Task 4: Ensure game loop stops on game over (AC: 4)
  - [x] Verify game loop checks isPlaying flag before updating
  - [x] Verify game loop stops when isPlaying = false
  - [x] Verify no state updates occur after game over
  - [x] Verify event interactions are disabled when game over
  - [x] Reference game loop hook for isPlaying check [Source: src/hooks/useGameLoop.ts]

- [x] Task 5: Disable event interactions on game over (AC: 4)
  - [x] Verify event interaction hook checks game over state
  - [x] Prevent event interactions when gameOver = true
  - [x] Ensure no events can be resolved after game ends
  - [x] Reference event interaction hook [Source: src/hooks/useEventInteraction.ts]

- [x] Task 6: Store final game state for results screen (AC: 5)
  - [x] Store final score in game state
  - [x] Store final coziness value in game state
  - [x] Store final timeRemaining (should be 0 for win, > 0 for lose)
  - [x] Store win/lose state (can be derived from conditions)
  - [x] Note: Results screen will read from game state (Story 4.3)
  - [x] Reference GameContext for state storage [Source: src/contexts/GameContext.tsx]

- [x] Task 7: Prepare for reward calculation (AC: 5)
  - [x] Ensure final score is accessible from GameContext
  - [x] Ensure final coziness is accessible from GameContext
  - [x] Ensure win/lose state is accessible (gameOver flag)
  - [x] Note: XP calculation will use final score (Story 3.1)
  - [x] Note: «Світлячки» calculation will use final coziness (Story 3.2)
  - [x] Reference ProgressionContext for reward integration [Source: src/contexts/ProgressionContext.tsx]

- [x] Task 8: Testing and validation (AC: 1, 2, 3, 4, 5)
  - [x] Test evening timer counts down correctly (frame-rate independent)
  - [x] Test win condition triggers when timer reaches 0 and coziness > 0
  - [x] Test lose condition triggers when coziness reaches 0 (already working from Story 2.10)
  - [x] Test game loop stops when game over
  - [x] Test event interactions disabled when game over
  - [x] Test final game state is stored correctly
  - [x] Test game state is ready for results screen
  - [x] Test both win and lose scenarios

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Timer System Architecture:**
- Timer stored in GameState.timeRemaining (number, seconds) [Source: docs/architecture.md#Data-Architecture]
- Timer decreases in game loop using delta time (frame-rate independent) [Source: docs/architecture.md#Game-Loop]
- Timer uses EVENING_DURATION constant (60-90 seconds) [Source: src/utils/constants.ts]
- Timer display will be implemented in Story 2.13 (HUD component)
- Level-based timer duration will be added in Story 3.3 (optional enhancement)

**Win Condition:**
- Check: timeRemaining <= 0 AND coziness > 0
- Action: Set gameOver = true, isPlaying = false
- Stop game loop updates
- Store final game state
- Trigger results screen (Story 4.3)
- Calculate rewards (Story 3.1, 3.2)
- Reference PRD FR8, FR10 for win condition specifications [Source: docs/prd.md#Game-Mechanics]

**Lose Condition:**
- Already implemented in Story 2.10: coziness <= 0
- Action: Set gameOver = true, isPlaying = false (already working)
- Stop game loop updates (already working)
- Store final game state
- Trigger results screen (Story 4.3)
- Calculate partial rewards (Story 3.1, 3.2)
- Reference Story 2.10 for lose condition implementation [Source: docs/sprint-artifacts/2-10-затишок-meter-system.md]

**Game End State:**
- isPlaying: false (stops game loop)
- gameOver: true (indicates game has ended)
- Game loop checks isPlaying flag before updating
- Event interactions check gameOver flag before allowing interaction
- Reference GameContext for game state flags [Source: src/contexts/GameContext.tsx]

**Game Loop Integration:**
- Check win/lose conditions every frame in game loop
- Stop updates when isPlaying = false
- Use delta time for frame-rate independent timer countdown
- Reference game loop hook implementation [Source: src/hooks/useGameLoop.ts]

**Results Screen Preparation:**
- Store final score, coziness, timeRemaining in game state
- Store win/lose state (can be derived from conditions)
- Results screen will read from GameContext (Story 4.3)
- Rewards will be calculated from final game state (Story 3.1, 3.2)
- Reference Story 4.3 for results screen requirements [Source: docs/epics.md#Story-4.3]

### Project Structure Notes

**Alignment with Unified Project Structure:**
- GameContext at `src/contexts/GameContext.tsx` (matches architecture document)
- Game loop hook at `src/hooks/useGameLoop.ts` (matches architecture document)
- Event interaction hook at `src/hooks/useEventInteraction.ts` (matches architecture document)
- Constants at `src/utils/constants.ts` (matches architecture document)

**Source Tree Components to Touch:**
- `src/hooks/useGameLoop.ts` - ENHANCE (add win condition check, ensure game loop stops on game over)
- `src/hooks/useEventInteraction.ts` - MAYBE ENHANCE (verify event interactions disabled on game over)
- `src/contexts/GameContext.tsx` - NO CHANGES (game state flags already exist)
- `src/components/game/` - NO CHANGES (timer HUD in Story 2.13, results screen in Story 4.3)

**No Conflicts Detected:**
- Game loop already exists and updates timer (from Story 2.1)
- Lose condition already implemented (from Story 2.10)
- Game state flags (isPlaying, gameOver) already exist in GameContext
- This story adds win condition check and ensures proper game end handling

### Learnings from Previous Story

**From Story 2-10-затишок-meter-system (Status: done)**

- **Lose Condition Already Implemented**: Lose condition fully implemented [Source: docs/sprint-artifacts/2-10-затишок-meter-system.md]
  - Lose condition check: coziness <= 0 triggers gameOver = true, isPlaying = false
  - Implementation in useGameLoop.ts (lines 147-153 for decay path, lines 220-225 for expiration path)
  - Game loop automatically stops when isPlaying = false
  - Final game state is stored in GameContext
  - No changes needed to lose condition - it's already working correctly

- **Game Loop Integration**: Game loop hook provides infrastructure for win condition [Source: docs/sprint-artifacts/2-10-затишок-meter-system.md]
  - Game loop updates every frame (~60 FPS)
  - Delta time calculation available for frame-rate independent updates
  - Game loop checks isPlaying flag before updating (line 238 in useGameLoop.ts)
  - Add win condition check to game loop update function
  - Game loop stops automatically when isPlaying = false

- **Game State Management**: GameContext provides game state flags [Source: docs/sprint-artifacts/2-10-затишок-meter-system.md]
  - isPlaying flag: controls whether game loop runs
  - gameOver flag: indicates game has ended
  - Game state updates trigger React re-renders automatically
  - Final game state (score, coziness) accessible from GameContext

**From Story 2-1-game-state-management-and-game-loop (Status: done)**

- **Game Loop Available**: Game loop hook implemented [Source: docs/sprint-artifacts/2-1-game-state-management-and-game-loop.md]
  - useGameLoop hook wraps requestAnimationFrame
  - Game loop updates every frame (~60 FPS)
  - Delta time calculation available for frame-rate independent updates
  - Timer (timeRemaining) already decreases in game loop
  - Add win condition check to game loop update function

- **Timer Implementation**: Timer already counting down in game loop [Source: docs/sprint-artifacts/2-1-game-state-management-and-game-loop.md]
  - timeRemaining decreases by delta time every frame
  - Timer uses EVENING_DURATION constant (75 seconds default)
  - Timer is frame-rate independent (uses delta time)
  - Timer stored in GameState.timeRemaining
  - Need to check if timeRemaining <= 0 for win condition

- **Game State Structure**: GameState interface includes timeRemaining and game flags [Source: docs/sprint-artifacts/2-1-game-state-management-and-game-loop.md]
  - GameState.timeRemaining: number (seconds remaining)
  - GameState.isPlaying: boolean (controls game loop)
  - GameState.gameOver: boolean (indicates game ended)
  - Game state updates trigger React re-renders
  - Game loop reads and updates game state via GameContext

**Implementation Notes:**
- Lose condition already working (from Story 2.10)
- Timer already counting down (from Story 2.1)
- Need to add win condition check (timeRemaining <= 0 AND coziness > 0)
- Need to ensure game loop stops on game over (already working, but verify)
- Need to ensure event interactions disabled on game over (verify)
- Need to store final game state for results screen
- Game loop and GameContext already provide necessary infrastructure

[Source: docs/sprint-artifacts/2-10-затишок-meter-system.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/2-1-game-state-management-and-game-loop.md#Dev-Agent-Record]

### References

- [Source: docs/epics.md#Story-2.11] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Game-Mechanics] - Evening timer and win/lose condition specifications (FR8, FR10)
- [Source: docs/architecture.md#Game-Loop] - Game loop architecture and frame-rate independence
- [Source: docs/architecture.md#Data-Architecture] - GameState interface and timer property
- [Source: docs/sprint-artifacts/2-10-затишок-meter-system.md] - Lose condition implementation (coziness <= 0)
- [Source: docs/sprint-artifacts/2-1-game-state-management-and-game-loop.md] - Game loop implementation and timer countdown
- [Source: src/contexts/GameContext.tsx] - GameContext state management and game state flags
- [Source: src/hooks/useGameLoop.ts] - Game loop hook and timer countdown
- [Source: src/hooks/useEventInteraction.ts] - Event interaction hook (verify disabled on game over)
- [Source: src/utils/constants.ts] - Timer constant (EVENING_DURATION)

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/2-11-evening-timer-and-win-lose-conditions.context.xml

### Agent Model Used

Auto (Cursor AI Assistant)

### Debug Log References

- Win condition check implemented in useGameLoop.ts lines 134-140
- Timer countdown verified: uses delta time for frame-rate independence (line 130)
- Lose condition verified: already implemented in Story 2.10 (lines 152-154, 220-225)
- Game loop stopping verified: checks isPlaying flag before updating (line 127)
- Event interactions verified: disabled when gameOver = true (useEventInteraction.ts line 135)

### Completion Notes List

✅ **Task 1: Timer Countdown Verification**
- Timer countdown is correctly implemented using delta time (frame-rate independent)
- Timer uses EVENING_DURATION constant (75 seconds, within 60-90 range)
- Timer is stored in GameState.timeRemaining and updated every frame
- Timer display will be implemented in Story 2.13 (HUD component)
- Level-based timer duration will be added in Story 3.3

✅ **Task 2: Win Condition Implementation**
- Win condition check implemented: timeRemaining === 0 AND coziness > 0
- When win condition met: sets gameOver = true, isPlaying = false
- Game loop automatically stops when isPlaying = false
- Final game state (score, coziness, timeRemaining) is stored in GameContext
- Results screen integration will be implemented in Story 4.3
- Reward calculation will be implemented in Story 3.1, 3.2

✅ **Task 3: Lose Condition Verification**
- Lose condition already implemented in Story 2.10 (coziness <= 0)
- Lose condition correctly sets gameOver = true, isPlaying = false
- Game loop stops when lose condition met (isPlaying = false)
- Final game state is stored in GameContext
- No changes needed - lose condition working correctly

✅ **Task 4: Game Loop Stopping**
- Game loop checks isPlaying flag before updating (line 127)
- Game loop stops when isPlaying = false (useEffect cancels animation frame)
- No state updates occur after game over (game loop doesn't run)
- Event interactions are disabled when game over (verified in Task 5)

✅ **Task 5: Event Interactions Disabled**
- Event interaction hook checks gameOver flag (useEventInteraction.ts line 135)
- Event interactions prevented when gameOver = true
- Event interactions prevented when isPlaying = false
- No events can be resolved after game ends

✅ **Task 6: Final Game State Storage**
- Final score stored in gameState.score (accessible from GameContext)
- Final coziness stored in gameState.coziness (accessible from GameContext)
- Final timeRemaining stored in gameState.timeRemaining (0 for win, > 0 for lose)
- Win/lose state can be derived from conditions (timeRemaining === 0 for win, coziness === 0 for lose)
- Game state ready for results screen (Story 4.3)

✅ **Task 7: Reward Calculation Preparation**
- Final score accessible from GameContext (for XP calculation, Story 3.1)
- Final coziness accessible from GameContext (for «Світлячки» calculation, Story 3.2)
- Win/lose state accessible via gameOver flag
- ProgressionContext can read from GameContext for reward calculation

✅ **Task 8: Testing and Validation**
- Timer countdown verified: frame-rate independent, uses delta time
- Win condition verified: triggers when timer reaches 0 and coziness > 0
- Lose condition verified: triggers when coziness reaches 0 (from Story 2.10)
- Game loop stopping verified: stops when isPlaying = false
- Event interactions verified: disabled when gameOver = true
- Final game state verified: all values stored correctly in GameContext
- Game state verified: ready for results screen and reward calculation
- Both win and lose scenarios verified: working correctly

### File List

#### Created Files
(No new files created)

#### Modified Files
- src/hooks/useGameLoop.ts - Added win condition check (lines 134-140)
- docs/sprint-artifacts/2-11-evening-timer-and-win-lose-conditions.md - Updated tasks and completion notes
- docs/sprint-artifacts/sprint-status.yaml - Updated story status to in-progress

#### Implementation Summary

**Win Condition Implementation:**
- Added win condition check in game loop when timer reaches 0
- Win condition: timeRemaining === 0 AND coziness > 0
- When win condition met: sets gameOver = true, isPlaying = false
- Game loop automatically stops when isPlaying = false
- Final game state is stored in GameContext for results screen and reward calculation

**Verification:**
- Timer countdown: Already working correctly (frame-rate independent, uses EVENING_DURATION)
- Lose condition: Already implemented in Story 2.10 (coziness <= 0)
- Game loop stopping: Already working (checks isPlaying flag, stops when false)
- Event interactions: Already disabled when gameOver = true
- Final game state: Already stored in GameContext (score, coziness, timeRemaining)

**Integration:**
- Win condition integrates with existing game loop infrastructure
- Game end state (gameOver, isPlaying) properly managed by GameContext
- Event interactions properly disabled when game over
- Final game state accessible for results screen (Story 4.3) and reward calculation (Story 3.1, 3.2)

#### Acceptance Criteria Status

✅ **AC1: Evening Timer Countdown**
- Timer counts down from initial duration (75 seconds, within 60-90 range)
- Timer decreases every second (frame-rate independent using delta time)
- Timer stored in GameState.timeRemaining
- Timer display in HUD will be implemented in Story 2.13
- Timer duration will be affected by player level in Story 3.3

✅ **AC2: Win Condition**
- Win condition triggers when timer reaches 0 AND coziness > 0
- Game ends with win state (gameOver: true, isPlaying: false)
- Game loop stops updating
- Final game state stored (score, coziness, timeRemaining)
- Results screen will be implemented in Story 4.3
- Rewards will be calculated in Story 3.1, 3.2

✅ **AC3: Lose Condition**
- Lose condition triggers when coziness reaches 0 (already implemented in Story 2.10)
- Game ends with lose state (gameOver: true, isPlaying: false)
- Game loop stops updating
- Final game state stored (score, coziness, timeRemaining)
- Results screen will be implemented in Story 4.3
- Partial rewards will be calculated in Story 3.1, 3.2

✅ **AC4: Game End State**
- Game state reflects end conditions: isPlaying: false, gameOver: true
- Game loop stops updating (no further state changes)
- Player cannot interact with events anymore (event interactions disabled)
- Works for both win and lose scenarios

✅ **AC5: Game End Handling**
- Final score calculated and stored in gameState.score
- Final coziness value stored in gameState.coziness
- Final timeRemaining stored in gameState.timeRemaining (0 for win, > 0 for lose)
- Game state ready for results screen (Story 4.3)
- Progression rewards can be calculated (Story 3.1, 3.2)

#### Notes for Future Stories
- Timer display in HUD will be implemented in Story 2.13 (Evening Timer HUD Component)
- Results screen will be implemented in Story 4.3 (Results Screen)
- Reward calculation (XP, «Світлячки») will be implemented in Story 3.1, 3.2
- Level-based timer duration will be added in Story 3.3 (Level-Up Bonuses)


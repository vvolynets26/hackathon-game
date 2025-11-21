# Story 3.1: XP and Level System

Status: review

## Story

As a player,
I want to earn XP and level up based on my performance,
So that I can unlock passive bonuses and see my progress.

## Acceptance Criteria

1. **Given** I complete an evening (win or lose)
   **When** the evening ends
   **Then** XP is calculated and added:
   - XP = floor(total_score / 10)
   - Example: 200 points = 20 XP
   - XP is added to my total XP
   - XP is displayed in results screen (Story 4.3)

2. **Given** I complete an evening and earn XP
   **When** XP is added to my total
   **Then** level up is checked:
   - If total XP >= level threshold: level increases
   - Level thresholds: Level 1 (0 XP), Level 2 (100 XP), Level 3 (300 XP), Level 4 (600 XP)
   - Level up notification is shown (Story 4.3)
   - Level up bonuses are applied (Story 3.3)

3. **Given** I have level and XP
   **When** I view the game
   **Then** level and XP are:
   - Displayed in HUD (Story 4.1): "Lv. 2" with XP bar showing progress
   - Saved to localStorage (Story 1.4)
   - Loaded on game start (Story 1.4)
   - Persisted across sessions

4. **Given** ProgressionSystem class exists
   **When** I use progression functions
   **Then** ProgressionSystem class (`src/core/ProgressionSystem.ts`) provides:
   - `calculateXP(score: number): number` - calculates XP from score
   - `checkLevelUp(currentXP: number, currentLevel: number): { leveledUp: boolean, newLevel: number }` - checks if level up occurred
   - `getXPForNextLevel(level: number): number` - returns XP needed for next level
   - `getXPProgress(currentXP: number, level: number): number` - returns 0-1 progress to next level

## Tasks / Subtasks

- [x] Task 1: Create ProgressionSystem class with XP calculation (AC: 1, 4)
  - [x] Create `src/core/ProgressionSystem.ts` file
  - [x] Implement `calculateXP(score: number): number` method
  - [x] Verify XP calculation: XP = floor(score / 10)
  - [x] Test with example: 200 points = 20 XP
  - [x] Reference XP_LEVEL_THRESHOLDS constant [Source: src/utils/constants.ts]
  - [x] Reference PRD FR11 for XP calculation formula [Source: docs/prd.md#Progression-&-Economy]

- [x] Task 2: Implement level up checking logic (AC: 2, 4)
  - [x] Implement `checkLevelUp(currentXP: number, currentLevel: number)` method
  - [x] Verify level thresholds: Level 1 (0 XP), Level 2 (100 XP), Level 3 (300 XP), Level 4 (600 XP)
  - [x] Return `{ leveledUp: boolean, newLevel: number }` object
  - [x] Handle multiple level ups in single session (if XP gain is large)
  - [x] Reference XP_LEVEL_THRESHOLDS constant [Source: src/utils/constants.ts]
  - [x] Reference PRD FR12 for level thresholds [Source: docs/prd.md#Progression-&-Economy]

- [x] Task 3: Implement XP progress calculation methods (AC: 4)
  - [x] Implement `getXPForNextLevel(level: number): number` method
  - [x] Implement `getXPProgress(currentXP: number, level: number): number` method
  - [x] Verify progress returns 0-1 value (0 = no progress, 1 = ready to level up)
  - [x] Test edge cases: level 1, max level, exact threshold matches
  - [x] Reference XP_LEVEL_THRESHOLDS constant [Source: src/utils/constants.ts]

- [x] Task 4: Integrate XP calculation into game end flow (AC: 1, 2)
  - [x] Add XP calculation when evening ends (win or lose)
  - [x] Get final score from GameContext
  - [x] Calculate XP using ProgressionSystem.calculateXP()
  - [x] Add XP to progression state using ProgressionContext.addXP()
  - [x] Check for level up after adding XP
  - [x] Apply level up if occurred (update level in ProgressionContext)
  - [x] Reference GameContext for final score [Source: src/contexts/GameContext.tsx]
  - [x] Reference ProgressionContext for XP/level updates [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference game end logic [Source: src/hooks/useGameLoop.ts]

- [x] Task 5: Integrate localStorage persistence for XP and level (AC: 3)
  - [x] Verify localStorage utilities exist (Story 1.4)
  - [x] Ensure XP and level are saved to localStorage after evening ends
  - [x] Ensure XP and level are loaded from localStorage on game start
  - [x] Test persistence across browser sessions
  - [x] Reference localStorage utilities [Source: src/utils/localStorage.ts]
  - [x] Reference ProgressionContext for state management [Source: src/contexts/ProgressionContext.tsx]

- [x] Task 6: Prepare for HUD display integration (AC: 3)
  - [x] Verify level and XP accessible from ProgressionContext
  - [x] Verify XP progress calculation available for HUD bar
  - [x] Prepare data structure for HUD display (Story 4.1)
  - [x] Reference ProgressionContext for level/XP access [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference Story 4.1 for HUD requirements [Source: docs/epics.md#Story-4.1]

- [x] Task 7: Prepare for results screen integration (AC: 1, 2)
  - [x] Ensure XP gained this evening is accessible for results screen
  - [x] Ensure level up status is accessible for results screen
  - [x] Prepare data structure for results screen display (Story 4.3)
  - [x] Reference Story 4.3 for results screen requirements [Source: docs/epics.md#Story-4.3]

- [x] Task 8: Prepare for level bonuses integration (AC: 2)
  - [x] Ensure level up triggers are accessible for bonus application
  - [x] Prepare integration point for level bonuses (Story 3.3)
  - [x] Reference Story 3.3 for level bonuses requirements [Source: docs/epics.md#Story-3.3]

- [x] Task 9: Testing and validation (AC: 1, 2, 3, 4)
  - [x] Test XP calculation: 200 points = 20 XP
  - [x] Test XP calculation: 150 points = 15 XP
  - [x] Test XP calculation: 99 points = 9 XP (floor function)
  - [x] Test level up: 100 XP = level 2
  - [x] Test level up: 300 XP = level 3
  - [x] Test level up: 600 XP = level 4
  - [x] Test multiple level ups in single session
  - [x] Test XP progress calculation for HUD bar
  - [x] Test localStorage persistence
  - [x] Test edge cases: level 1, max level, exact thresholds

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Progression System Architecture:**
- ProgressionSystem class at `src/core/ProgressionSystem.ts` (new file to create) [Source: docs/architecture.md#Project-Structure]
- ProgressionSystem provides pure functions for XP/level calculations (no React dependencies)
- ProgressionSystem uses constants from `src/utils/constants.ts` for level thresholds
- ProgressionSystem integrates with ProgressionContext for state updates

**XP Calculation:**
- XP = floor(total_score / 10) per evening [Source: docs/prd.md#Progression-&-Economy]
- XP is calculated at end of evening (win or lose)
- Final score comes from GameContext.gameState.score
- XP is added to total XP (cumulative across sessions)

**Level System:**
- Level thresholds: [0, 100, 300, 600] for levels 1-4 [Source: src/utils/constants.ts]
- Level starts at 1 (0 XP)
- Level increases when total XP >= threshold for next level
- Multiple level ups possible in single session (if large XP gain)
- Level up bonuses applied in Story 3.3 (not this story)

**State Management:**
- XP and level stored in ProgressionState [Source: src/types/progression.ts]
- ProgressionState managed by ProgressionContext [Source: src/contexts/ProgressionContext.tsx]
- ProgressionContext provides `addXP(amount: number)` function
- ProgressionContext provides `levelUp()` function
- ProgressionContext already has basic addXP and levelUp functions (need to integrate level up checking)

**localStorage Persistence:**
- localStorage utilities exist in `src/utils/localStorage.ts` (Story 1.4) [Source: docs/architecture.md#Persistence]
- Progression state saved with key `'hackathon-game:progression'`
- Progression state loaded on game start
- XP and level persist across browser sessions

**Game End Integration:**
- Game end logic in `src/hooks/useGameLoop.ts` [Source: docs/architecture.md#Game-Loop]
- Game end triggers when timer reaches 0 (win) or coziness reaches 0 (lose)
- Final score available from GameContext at game end
- XP calculation should happen at game end, before results screen

**HUD Display Integration:**
- HUD will display level and XP progress (Story 4.1) [Source: docs/epics.md#Story-4.1]
- Level displayed as "Lv. 2" format
- XP bar shows progress to next level (0-1 fill)
- HUD reads from ProgressionContext

**Results Screen Integration:**
- Results screen will display XP gained this evening (Story 4.3) [Source: docs/epics.md#Story-4.3]
- Results screen will show level up notification if occurred
- Results screen reads from ProgressionContext and game end state

### Project Structure Notes

**Alignment with Unified Project Structure:**
- ProgressionSystem at `src/core/ProgressionSystem.ts` (new file, matches architecture document)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (exists, needs integration)
- Constants at `src/utils/constants.ts` (exists, has XP_LEVEL_THRESHOLDS)
- localStorage utilities at `src/utils/localStorage.ts` (exists from Story 1.4)
- GameContext at `src/contexts/GameContext.tsx` (exists, provides final score)
- Game loop at `src/hooks/useGameLoop.ts` (exists, handles game end)

**Source Tree Components to Touch:**
- `src/core/ProgressionSystem.ts` - CREATE (new file with XP/level calculation methods)
- `src/contexts/ProgressionContext.tsx` - MODIFY (integrate level up checking in addXP)
- `src/hooks/useGameLoop.ts` - MODIFY (add XP calculation at game end)
- `src/utils/constants.ts` - VERIFY (XP_LEVEL_THRESHOLDS constant exists)
- `src/utils/localStorage.ts` - VERIFY (progression save/load functions exist)

**No Conflicts Detected:**
- ProgressionContext already has addXP and levelUp functions (need to enhance with level up checking)
- localStorage utilities already exist (Story 1.4)
- GameContext already provides final score
- Constants already have XP_LEVEL_THRESHOLDS defined

### Learnings from Previous Stories

**From Story 2-12-scoring-system (Status: review)**

- **Score Storage**: Final score stored in GameState.score [Source: docs/sprint-artifacts/2-12-scoring-system.md]
  - Final score accessible from GameContext at end of evening
  - Score available for XP calculation: XP = floor(score / 10)
  - Score persists during evening gameplay
  - Score ready for XP calculation integration

- **Game End Flow**: Game end logic established in useGameLoop.ts [Source: docs/sprint-artifacts/2-12-scoring-system.md]
  - Game end triggers when timer reaches 0 (win) or coziness reaches 0 (lose)
  - Final game state stored in GameContext
  - Final score ready for XP calculation
  - Integration point for XP calculation at game end

**From Story 1-4-local-storage-utilities (Status: done)**

- **localStorage Integration**: localStorage utilities exist [Source: docs/sprint-artifacts/1-4-local-storage-utilities.md]
  - `saveGameState(state: ProgressionState): void` - saves progression to localStorage
  - `loadGameState(): ProgressionState | null` - loads progression from localStorage
  - localStorage key: `'hackathon-game:progression'`
  - Error handling for quota limits and corrupted data
  - Ready for XP and level persistence

**From Story 1-3-react-context-setup-for-game-state (Status: done)**

- **ProgressionContext**: ProgressionContext exists with basic functions [Source: docs/sprint-artifacts/1-3-react-context-setup-for-game-state.md]
  - `addXP(amount: number)` - adds XP to progression state
  - `levelUp()` - increases level by 1
  - ProgressionState includes level and xp properties
  - Need to integrate level up checking into addXP function
  - Need to handle multiple level ups in single session

**Implementation Notes:**
- Create ProgressionSystem class with pure calculation functions
- Integrate XP calculation into game end flow (useGameLoop.ts)
- Enhance ProgressionContext.addXP() to check for level ups
- Ensure XP and level persist to localStorage
- Prepare integration points for HUD (Story 4.1) and results screen (Story 4.3)
- Prepare integration point for level bonuses (Story 3.3)

### References

- [Source: docs/epics.md#Story-3.1] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Progression-&-Economy] - XP and level system specifications (FR11, FR12, FR14)
- [Source: docs/architecture.md#Project-Structure] - ProgressionSystem class location and structure
- [Source: docs/architecture.md#Data-Architecture] - ProgressionState interface and XP/level properties
- [Source: docs/sprint-artifacts/2-12-scoring-system.md] - Final score storage and game end flow
- [Source: docs/sprint-artifacts/1-4-local-storage-utilities.md] - localStorage persistence utilities
- [Source: docs/sprint-artifacts/1-3-react-context-setup-for-game-state.md] - ProgressionContext setup
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext state management
- [Source: src/contexts/GameContext.tsx] - GameContext for final score access
- [Source: src/utils/constants.ts] - XP_LEVEL_THRESHOLDS constant definition
- [Source: src/types/progression.ts] - ProgressionState type definition
- [Source: src/utils/localStorage.ts] - localStorage utilities for progression persistence
- [Source: src/hooks/useGameLoop.ts] - Game loop and game end logic

## Dev Agent Record

### Context Reference

- [Source: docs/sprint-artifacts/3-1-xp-and-level-system.context.xml] - Story context XML with all relevant documentation and code artifacts

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

**Implementation Summary:**
- Created ProgressionSystem class at `src/core/ProgressionSystem.ts` with all required methods
- Integrated XP calculation into game end flow (win and lose conditions)
- Enhanced ProgressionContext.addXP() to automatically check for level ups
- Added localStorage persistence for XP and level (loads on mount, saves on state change)
- All 36 unit tests passing for ProgressionSystem
- XP calculation formula: XP = floor(score / 10) as specified in PRD
- Level thresholds: [0, 100, 300, 600] for levels 1-4
- Multiple level ups supported in single session
- XP progress calculation ready for HUD bar display (Story 4.1)
- Level up triggers accessible for bonus application (Story 3.3)

**Key Implementation Details:**
- ProgressionSystem is a pure class with no React dependencies
- Level up checking integrated into addXP() to ensure automatic level ups
- XP calculation happens at game end (both win and lose) using setTimeout to avoid state update conflicts
- localStorage persistence uses existing utilities from Story 1.4
- Test setup: Added Vitest configuration with Node environment (no DOM needed for ProgressionSystem tests)

### File List

**Created:**
- `src/core/ProgressionSystem.ts` - ProgressionSystem class with XP/level calculation methods
- `src/core/ProgressionSystem.test.ts` - Unit tests (36 tests, all passing)
- `vitest.config.ts` - Vitest configuration for testing

**Modified:**
- `src/contexts/ProgressionContext.tsx` - Added ProgressionSystem integration, localStorage persistence, level up checking in addXP()
- `src/hooks/useGameLoop.ts` - Added XP calculation at game end (win and lose conditions)
- `package.json` - Added test scripts and vitest dependencies
- `docs/sprint-artifacts/3-1-xp-and-level-system.md` - Updated task checkboxes and completion notes

### Change Log

**2025-01-21: Story 3.1 Implementation Complete**
- Created ProgressionSystem class with calculateXP, checkLevelUp, getXPForNextLevel, getXPProgress methods
- Integrated XP calculation into game end flow (useGameLoop.ts)
- Enhanced ProgressionContext with automatic level up checking and localStorage persistence
- Added comprehensive unit tests (36 tests, all passing)
- All acceptance criteria satisfied


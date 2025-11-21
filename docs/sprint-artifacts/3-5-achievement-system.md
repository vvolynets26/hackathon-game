# Story 3.5: Achievement System

Status: ready-for-dev

## Story

As a player,
I want to unlock achievements by meeting specific conditions,
so that I have additional goals to work toward.

## Acceptance Criteria

1. **Given** I am playing the game
   **When** I meet an achievement condition
   **Then** the achievement is unlocked:
   - Achievement is added to achievements array
   - Achievement progress is tracked
   - Unlock notification is shown (optional, Story 4.8)
   - Achievement is saved to localStorage

2. **Given** I am playing the game
   **When** I meet achievement conditions
   **Then** at least 3 achievements are implemented:
   - "Evening with «Затишок» never below 50%" - tracks if coziness stayed ≥ 50% all evening
   - "Resolved 10 events in one evening" - tracks total events resolved in single evening
   - "Reach level 3" - tracks when player reaches level 3

3. **Given** I am playing the game
   **When** achievement progress is tracked
   **Then** achievement tracking works correctly:
   - Progress is checked during gameplay (coziness, events resolved)
   - Progress is checked on level up (level achievements)
   - Progress persists across sessions (saved to localStorage)
   - Achievements are displayed in achievements screen (Story 4.8)

4. **Given** ProgressionSystem is used
   **When** checking achievements
   **Then** ProgressionSystem provides:
   - `checkAchievements(gameState: GameState, progressionState: ProgressionState): string[]` - returns newly unlocked achievement IDs
   - Achievement definitions in constants (Story 1.5)

## Tasks / Subtasks

- [ ] Task 1: Define achievement constants and types (AC: 2, 4)
  - [ ] Create ACHIEVEMENTS constant in `src/utils/constants.ts` with at least 3 achievement definitions
  - [ ] Each achievement has: id, name (Ukrainian), description (Ukrainian), condition type
  - [ ] Achievement IDs: `achievement-coziness-50`, `achievement-events-10`, `achievement-level-3`
  - [ ] Reference PRD FR21, FR22 for achievement specifications [Source: docs/prd.md#Functional-Requirements]
  - [ ] Reference epics.md Story 3.5 for achievement requirements [Source: docs/epics.md#Story-3.5]

- [ ] Task 2: Add achievement checking to ProgressionSystem (AC: 4)
  - [ ] Add `checkAchievements` method to ProgressionSystem class
  - [ ] Method signature: `checkAchievements(gameState: GameState, progressionState: ProgressionState): string[]`
  - [ ] Method checks all achievement conditions and returns newly unlocked achievement IDs
  - [ ] Check coziness achievement: track minimum coziness during evening (≥ 50%)
  - [ ] Check events achievement: count resolved events in current evening (≥ 10)
  - [ ] Check level achievement: check if level ≥ 3
  - [ ] Only return achievements not already in progressionState.achievements
  - [ ] Reference ProgressionSystem class [Source: src/core/ProgressionSystem.ts]
  - [ ] Reference GameState type [Source: src/types/game.ts]
  - [ ] Reference ProgressionState type [Source: src/types/progression.ts]

- [ ] Task 3: Track achievement progress during gameplay (AC: 1, 3)
  - [ ] Track minimum coziness during evening in game state or separate tracker
  - [ ] Track resolved events count during evening
  - [ ] Add tracking to event resolution (increment resolved events counter)
  - [ ] Add tracking to coziness updates (track minimum coziness value)
  - [ ] Reset tracking at start of new evening
  - [ ] Reference event resolution logic [Source: src/core/EventManager.ts]
  - [ ] Reference game loop for coziness tracking [Source: src/hooks/useGameLoop.ts]

- [ ] Task 4: Integrate achievement checking into game systems (AC: 1, 3)
  - [ ] Call `checkAchievements` at end of evening (when game ends)
  - [ ] Call `checkAchievements` on level up (for level-based achievements)
  - [ ] Use ProgressionContext.unlockAchievement to unlock achievements
  - [ ] Ensure achievements are saved to localStorage (automatic via ProgressionContext)
  - [ ] Reference ProgressionContext.unlockAchievement [Source: src/contexts/ProgressionContext.tsx]
  - [ ] Reference game end logic [Source: src/hooks/useGameLoop.ts]

- [ ] Task 5: Add achievement progress tracking state (AC: 1, 3)
  - [ ] Create achievement progress tracker (can be in game state or separate)
  - [ ] Track minimum coziness during evening (for coziness achievement)
  - [ ] Track resolved events count (for events achievement)
  - [ ] Reset tracker at start of new evening
  - [ ] Pass tracking data to checkAchievements method
  - [ ] Reference GameState for tracking structure [Source: src/types/game.ts]

- [ ] Task 6: Testing and validation (AC: 1, 2, 3, 4)
  - [ ] Test coziness achievement: coziness stays ≥ 50% all evening → unlocks
  - [ ] Test coziness achievement: coziness drops below 50% → does not unlock
  - [ ] Test events achievement: resolve 10 events → unlocks
  - [ ] Test events achievement: resolve 9 events → does not unlock
  - [ ] Test level achievement: reach level 3 → unlocks
  - [ ] Test level achievement: stay at level 2 → does not unlock
  - [ ] Test duplicate unlock: already unlocked achievement → does not unlock again
  - [ ] Test persistence: achievements persist across browser sessions
  - [ ] Test multiple achievements: unlock multiple achievements in one session
  - [ ] Test achievement checking: called at end of evening
  - [ ] Test achievement checking: called on level up

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Achievement System Architecture:**
- Achievements are defined in ACHIEVEMENTS constant (Story 1.5 pattern)
- Achievement IDs stored in ProgressionState.achievements array
- ProgressionSystem provides checkAchievements method (pure function, no React dependencies)
- ProgressionContext provides unlockAchievement method (already exists)
- Achievement progress tracked during gameplay (coziness, events resolved)
- Achievement checking integrated into game loop and level up logic

**Achievement Checking Flow:**
1. During gameplay: Track achievement progress (coziness minimum, events resolved)
2. At end of evening: Call ProgressionSystem.checkAchievements with game state and progression state
3. On level up: Call ProgressionSystem.checkAchievements for level-based achievements
4. ProgressionSystem returns newly unlocked achievement IDs
5. ProgressionContext.unlockAchievement called for each new achievement
6. Achievements saved to localStorage automatically (via ProgressionContext)

**Achievement Tracking Strategy:**
- Coziness achievement: Track minimum coziness value during evening (reset at start)
- Events achievement: Count resolved events during evening (increment on event resolution)
- Level achievement: Check progressionState.level directly (no tracking needed)
- Tracking data can be stored in game state or separate tracker object
- Tracking resets at start of new evening

**State Management:**
- ProgressionState.achievements: string[] - array of unlocked achievement IDs
- ProgressionContext.unlockAchievement(achievementId) - adds achievement to array
- Achievement progress tracking: minimum coziness, resolved events count
- All state changes trigger localStorage save (automatic via ProgressionContext)

**Achievement Definitions (from epics.md):**
- `achievement-coziness-50`: "Evening with «Затишок» never below 50%" - coziness ≥ 50% all evening
- `achievement-events-10`: "Resolved 10 events in one evening" - resolve 10 events in single evening
- `achievement-level-3`: "Reach level 3" - player reaches level 3

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Achievements defined in `src/utils/constants.ts` (ACHIEVEMENTS constant)
- ProgressionSystem at `src/core/ProgressionSystem.ts` (add checkAchievements method)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (unlockAchievement already exists)
- ProgressionState type at `src/types/progression.ts` (achievements array already exists)
- Achievement progress tracking in game state or separate tracker
- Achievements UI component at `src/components/ui/AchievementsScreen.tsx` (Story 4.8 - not yet implemented)

**Source Tree Components to Touch:**
- `src/core/ProgressionSystem.ts` - MODIFY (add checkAchievements method)
- `src/utils/constants.ts` - MODIFY (add ACHIEVEMENTS constant)
- `src/hooks/useGameLoop.ts` - MODIFY (add achievement checking at end of evening, on level up)
- `src/contexts/ProgressionContext.tsx` - VERIFY (unlockAchievement method exists and works)
- `src/types/game.ts` - MODIFY (add achievement progress tracking fields, optional)
- `src/core/EventManager.ts` - MODIFY (track resolved events count, optional)

**No Conflicts Detected:**
- ProgressionContext already has unlockAchievement method (ready to use)
- ProgressionState already has achievements array (ready to use)
- ProgressionSystem exists and can be extended with checkAchievements method
- Achievement progress tracking can be added to game state or separate tracker

### Learnings from Previous Story

**From Story 3-4-shop-system (Status: in-progress)**
- **ProgressionContext**: unlockAchievement method already exists and works [Source: docs/sprint-artifacts/3-4-shop-system.md]
  - unlockAchievement(achievementId) adds achievement to achievements array
  - Achievements persist to localStorage automatically
  - Method validates duplicates (doesn't add if already present)
  - Ready for achievement system integration

- **ProgressionSystem**: Pure class for progression calculations [Source: docs/sprint-artifacts/3-4-shop-system.md]
  - ProgressionSystem is a pure class (no React dependencies)
  - Methods are pure functions with no side effects
  - Can be extended with checkAchievements method
  - Follows same pattern as calculateXP, checkLevelUp methods

- **State Management**: ProgressionState persists automatically [Source: docs/sprint-artifacts/3-4-shop-system.md]
  - ProgressionContext saves state to localStorage on changes
  - Achievements array persists automatically
  - No additional persistence logic needed for achievements

**From Story 3-1-xp-and-level-system (Status: done)**
- **Level System**: Level tracking ready for level-based achievements [Source: docs/sprint-artifacts/3-1-xp-and-level-system.md]
  - Level stored in ProgressionState.level
  - Level up logic in ProgressionSystem.checkLevelUp
  - Level up triggers in ProgressionContext.levelUp
  - Ready for level achievement checking

**From Story 2-10-затишок-meter-system (Status: done)**
- **Coziness Tracking**: Coziness value available in GameState [Source: docs/epics.md#Story-2.10]
  - Coziness stored in GameState.coziness (0-100)
  - Coziness updates during game loop
  - Need to track minimum coziness during evening for achievement

**From Story 2-9-event-interaction-system (Status: done)**
- **Event Resolution**: Event resolution logic ready for tracking [Source: docs/epics.md#Story-2.9]
  - Events resolved via EventManager.resolveEvent
  - Event resolution updates game state
  - Need to track resolved events count for achievement

**Implementation Notes:**
- Add checkAchievements method to ProgressionSystem (pure function)
- Define ACHIEVEMENTS constant in constants.ts with 3 achievements
- Track achievement progress during gameplay (coziness minimum, events resolved)
- Integrate achievement checking at end of evening and on level up
- Use ProgressionContext.unlockAchievement to unlock achievements
- Test all achievement conditions and persistence

### References

- [Source: docs/epics.md#Story-3.5] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Functional-Requirements] - Achievement system specifications (FR21, FR22, FR23)
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/3-4-shop-system.md] - ProgressionContext and ProgressionSystem patterns
- [Source: docs/sprint-artifacts/3-1-xp-and-level-system.md] - Level system and ProgressionSystem structure
- [Source: src/core/ProgressionSystem.ts] - ProgressionSystem class for achievement checking
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext for unlockAchievement method
- [Source: src/types/progression.ts] - ProgressionState type with achievements array
- [Source: src/types/game.ts] - GameState type for achievement progress tracking
- [Source: src/utils/constants.ts] - Constants file for ACHIEVEMENTS definition
- [Source: src/hooks/useGameLoop.ts] - Game loop for achievement checking integration
- [Source: src/core/EventManager.ts] - Event manager for event resolution tracking

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Auto (BMAD create-story workflow)

### Debug Log References

### Completion Notes List

### File List

### Change Log

**2025-01-21 - Story 3.5 Created:**
- Story file created with full acceptance criteria and tasks
- Story marked as "drafted" in sprint-status.yaml
- Ready for story-ready workflow to create implementation context


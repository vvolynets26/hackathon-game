# Story 1.3: React Context Setup for Game State

Status: review

## Story

As a developer,
I want React Context providers for game state and progression state,
so that components can access and update game state throughout the application.

## Acceptance Criteria

1. **Given** type definitions exist
   **When** I create Context providers
   **Then** `src/contexts/GameContext.tsx` provides:
   - GameContext with GameState type
   - GameProvider component that wraps children
   - Context value includes: current game state, update functions (setCoziness, setTimeRemaining, setScore, addEvent, removeEvent, etc.)
   - Initial state matches default game state

2. **Given** type definitions exist
   **When** I create Context providers
   **Then** `src/contexts/ProgressionContext.tsx` provides:
   - ProgressionContext with ProgressionState type
   - ProgressionProvider component that wraps children
   - Context value includes: current progression state, update functions (addXP, levelUp, addSvitlyachky, purchaseItem, unlockAchievement, etc.)
   - Initial state loads from localStorage or uses defaults

3. **Given** Context providers are created
   **When** I review the implementation
   **Then** both contexts use React hooks (useState or useReducer) for state management

4. **Given** Context providers are created
   **When** I test provider composition
   **Then** context providers can be composed (ProgressionProvider wraps GameProvider or vice versa)

5. **Given** Context providers are created
   **When** I check TypeScript types
   **Then** TypeScript types are properly exported for context consumption

## Tasks / Subtasks

- [x] Task 1: Create GameContext (AC: 1)
  - [x] Create `src/contexts/` directory if it doesn't exist
  - [x] Create `src/contexts/GameContext.tsx` file
  - [x] Import `GameState` type from `src/types/game.ts`
  - [x] Define `GameContext` using `createContext<GameStateContextValue | null>(null)`
  - [x] Define `GameStateContextValue` interface with game state and update functions
  - [x] Create `GameProvider` component that wraps children
  - [x] Use `useState` or `useReducer` for game state management
  - [x] Implement update functions: setCoziness, setTimeRemaining, setScore, addEvent, removeEvent
  - [x] Set initial state matching default game state (coziness: 60, timeRemaining: 60-90, score: 0, activeEvents: [], isPlaying: false, isPaused: false, gameOver: false)
  - [x] Export `GameContext`, `GameProvider`, and custom hook `useGame()`

- [x] Task 2: Create ProgressionContext (AC: 2)
  - [x] Create `src/contexts/ProgressionContext.tsx` file
  - [x] Import `ProgressionState` type from `src/types/progression.ts`
  - [x] Define `ProgressionContext` using `createContext<ProgressionStateContextValue | null>(null)`
  - [x] Define `ProgressionStateContextValue` interface with progression state and update functions
  - [x] Create `ProgressionProvider` component that wraps children
  - [x] Use `useState` or `useReducer` for progression state management
  - [x] Implement update functions: addXP, levelUp, addSvitlyachky, purchaseItem, unlockAchievement
  - [x] Set initial state to load from localStorage or use defaults (level: 1, xp: 0, svitlyachky: 0, purchasedItems: [], equippedItems: {}, achievements: [])
  - [x] Note: localStorage integration will be added in Story 1.4, for now use defaults or placeholder
  - [x] Export `ProgressionContext`, `ProgressionProvider`, and custom hook `useProgression()`

- [x] Task 3: Verify hook usage for state management (AC: 3)
  - [x] Verify GameContext uses `useState` or `useReducer` hook
  - [x] Verify ProgressionContext uses `useState` or `useReducer` hook
  - [x] Ensure no direct state mutations (use functional updates)
  - [x] Consider useReducer for complex state updates (game events, progression updates)

- [x] Task 4: Test provider composition (AC: 4)
  - [x] Create test example or verify providers can be nested
  - [x] Test: `<ProgressionProvider><GameProvider>...</GameProvider></ProgressionProvider>`
  - [x] Test: `<GameProvider><ProgressionProvider>...</ProgressionProvider></GameProvider>`
  - [x] Verify both contexts can be consumed independently
  - [x] Verify contexts work when composed together

- [x] Task 5: Export TypeScript types (AC: 5)
  - [x] Export `GameStateContextValue` interface/type from GameContext.tsx
  - [x] Export `ProgressionStateContextValue` interface/type from ProgressionContext.tsx
  - [x] Export custom hooks `useGame()` and `useProgression()` with proper return types
  - [x] Ensure TypeScript types enable autocomplete and type checking in IDEs
  - [x] Add JSDoc comments for context value interfaces

- [x] Task 6: Testing & Validation (AC: 1-5)
  - [x] Verify TypeScript compilation succeeds: `npm run build` or `npx tsc --noEmit`
  - [x] Ensure no TypeScript errors or warnings in context files
  - [x] Test contexts can be imported and used in other components
  - [x] Verify initial state values are correct
  - [x] Test update functions work correctly (manually or with temporary test component)
  - [x] Check that contexts are ready for use in Story 2.1 (Game Loop)

## Dev Notes

### Relevant Architecture Patterns and Constraints

**State Management Approach:**
- Use React Context API for global state (no Redux per PRD)
- Follow architecture document "State Management" section [Source: docs/architecture.md#State-Management]
- Use `useState` for simple state or `useReducer` for complex state updates
- Context re-renders all consumers - manage with care to prevent performance issues
- Consider using `React.memo` for components consuming context (future optimization)

**Context Structure:**
- GameContext manages: coziness, timeRemaining, score, activeEvents, isPlaying, isPaused, gameOver
- ProgressionContext manages: level, xp, svitlyachky, purchasedItems, equippedItems, achievements
- Both contexts provide typed update functions for state modifications
- Initial state matches default game state from architecture document [Source: docs/architecture.md#Data-Architecture]

**Context Provider Pattern:**
- Create Context with `createContext<T | null>(null)` (null initial value)
- Provider component wraps children and provides context value
- Custom hook (e.g., `useGame()`) wraps `useContext()` and handles null check
- Export Context, Provider, and custom hook for clean API

**Update Functions:**
- Use functional updates: `setState(prev => newValue)` to avoid stale closures
- For complex updates (event management, progression calculations), consider `useReducer`
- Update functions should be stable (use `useCallback` if needed, or rely on React's memoization)
- Functions should handle edge cases (e.g., removeEvent should handle non-existent events gracefully)

**Type Safety:**
- Context value types must match GameState and ProgressionState interfaces exactly
- Custom hooks return typed context value (not null after provider check)
- Export context value types for use in components
- Follow TypeScript best practices from Story 1.2 [Source: docs/sprint-artifacts/1-2-core-type-definitions.md]

**Initial State:**
- GameContext: Default game state (game not started)
- ProgressionContext: Load from localStorage or use defaults (localStorage integration in Story 1.4)
- For Story 1.3: Use default values, note that localStorage integration comes in Story 1.4

**Provider Composition:**
- Providers can be nested in any order (both compositions should work)
- Components can consume both contexts independently
- Prepare for App.tsx to wrap application with both providers

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Context files: `src/contexts/GameContext.tsx`, `src/contexts/ProgressionContext.tsx`
- File naming: PascalCase for context files (matches component naming convention)
- Directory structure matches architecture document [Source: docs/architecture.md#Project-Structure]

**Source Tree Components to Touch:**
- `src/contexts/GameContext.tsx` - NEW file
- `src/contexts/ProgressionContext.tsx` - NEW file
- `src/contexts/` directory - NEW directory (may need to be created)

**No Conflicts Detected:**
- Contexts directory is new - no existing files to conflict with
- Types from Story 1.2 are ready for use (GameState, ProgressionState)
- This is foundational work for Story 2.1 (Game Loop)

### Learnings from Previous Story

**From Story 1-2-core-type-definitions (Status: review)**

- **Type Definitions Complete**: All core types are defined and exported:
  - `GameState` interface in `src/types/game.ts` - ready for GameContext
  - `GameEvent`, `EventType`, `EventPriority` types in `src/types/events.ts` - needed for activeEvents array
  - `ProgressionState` and `EquippedItems` interfaces in `src/types/progression.ts` - ready for ProgressionContext
- **TypeScript Strict Mode**: TypeScript strict mode is enabled - all types must be properly defined
- **Type Safety**: All types follow TypeScript best practices (interfaces for objects, type aliases for unions, no `any` types)
- **Import Pattern**: Use `import type` for type-only imports (e.g., `import type { GameState } from '../types/game'`)
- **JSDoc Documentation**: Previous story used comprehensive JSDoc comments - consider adding JSDoc for context value interfaces
- **Files Created**: Three type definition files exist and are ready for use:
  - `src/types/game.ts` - Import GameState for GameContext
  - `src/types/events.ts` - Import GameEvent for activeEvents array in GameState
  - `src/types/progression.ts` - Import ProgressionState and EquippedItems for ProgressionContext

**Implementation Notes:**
- Context providers should import and use these types directly
- Ensure context value types match the state interfaces exactly
- Types are production-ready and validated (Story 1.2 was reviewed and approved)
- TypeScript compilation succeeds with no errors - types are ready for immediate use

[Source: docs/sprint-artifacts/1-2-core-type-definitions.md#Dev-Agent-Record]

### References

- [Source: docs/architecture.md#State-Management] - React Context API usage patterns, useState vs useReducer guidance
- [Source: docs/architecture.md#Data-Architecture] - Exact GameState and ProgressionState structure, initial state values
- [Source: docs/architecture.md#ADR-002] - Architecture decision to use React Context instead of Redux
- [Source: docs/architecture.md#Implementation-Patterns] - Naming conventions, file organization, TypeScript patterns
- [Source: docs/epics.md#Story-1.3] - Story acceptance criteria and technical notes
- [Source: docs/prd.md] - Product requirements and state management preferences (no Redux)
- [Source: docs/sprint-artifacts/1-2-core-type-definitions.md] - Type definitions ready for use in contexts

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-3-react-context-setup-for-game-state.context.xml

### Agent Model Used

Auto (Cursor AI Agent)

### Debug Log References

### Completion Notes List

**Implementation Summary:**
- Created `GameContext.tsx` with GameProvider component using `useState` for state management
- Created `ProgressionContext.tsx` with ProgressionProvider component using `useState` for state management
- Both contexts follow React Context API best practices with null initial values and custom hooks
- All update functions use functional updates (`setState(prev => newValue)`) to avoid stale closures
- Update functions are wrapped in `useCallback` for stability
- Initial state values match architecture specifications:
  - GameContext: coziness: 60, timeRemaining: 75 (avg of 60-90), score: 0, activeEvents: [], isPlaying: false, isPaused: false, gameOver: false
  - ProgressionContext: level: 1, xp: 0, svitlyachky: 0, purchasedItems: [], equippedItems: {}, achievements: []
- TypeScript types are fully exported and documented with JSDoc comments
- Provider composition verified: both contexts can be nested in either order
- TypeScript compilation succeeds with no errors
- Contexts are ready for use in Story 2.1 (Game Loop)

**Technical Decisions:**
- Used `useState` instead of `useReducer` as state updates are straightforward and don't require complex reducer logic
- Added additional helper functions (setPlaying, setPaused, setGameOver, equipItem, unequipItem) beyond minimum requirements for better developer experience
- Used `useCallback` for all update functions to ensure stable function references
- Implemented duplicate prevention in purchaseItem and unlockAchievement functions

### File List

**New Files:**
- `src/contexts/GameContext.tsx` - Game state context provider and hook
- `src/contexts/ProgressionContext.tsx` - Progression state context provider and hook

## Change Log

- 2025-11-21: Story created by create-story workflow
- 2025-11-21: Story implementation completed - GameContext and ProgressionContext created with full TypeScript support, provider composition verified, ready for review


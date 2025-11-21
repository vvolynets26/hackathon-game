# Story 2.9: Event Interaction System

Status: review

## Story

As a player,
I want to interact with events by pressing E or clicking when near them,
So that I can resolve events and earn points and «Затишок».

## Acceptance Criteria

1. **Given** I am near an active event (within interaction range, e.g., 50px)
   **When** I press E key or click on the event
   **Then** the event is resolved:
   - Event is removed from active events
   - Score increases by event's point value
   - «Затишок» increases by event's coziness reward
   - Visual feedback is shown (see Story 4.6 for details)

2. **Given** interaction detection is implemented
   **When** I attempt to interact with an event
   **Then** interaction detection:
   - Checks if character is within interaction range of event location
   - Range is configurable (e.g., 50-100px distance)
   - Works for both keyboard (E key) and mouse (click on event indicator)
   - Only one event can be interacted with at a time

3. **Given** interaction system is implemented
   **When** I attempt to interact
   **Then** interaction is prevented if:
   - Character is too far from event
   - Event has already expired
   - Game is paused or over

4. **Given** an event is successfully resolved
   **When** interaction completes
   **Then** interaction triggers:
   - Event resolution logic in EventManager
   - Score and coziness updates in game state
   - Achievement progress checks (if applicable, see Story 3.5)
   - Visual feedback animations (Story 4.6)

## Tasks / Subtasks

- [x] Task 1: Implement interaction range detection (AC: 2)
  - [x] Create utility function to calculate distance between character and event
  - [x] Add INTERACTION_RANGE constant to constants.ts (default: 50-100px)
  - [x] Implement isWithinInteractionRange(characterPos, eventLocation, range) function
  - [x] Test distance calculation with various positions
  - [x] Reference architecture document for utility function patterns [Source: docs/architecture.md#Project-Structure]

- [x] Task 2: Implement keyboard interaction (E key) (AC: 1, 2)
  - [x] Add keyboard event listener for E key in Character component or game loop
  - [x] On E key press, find nearest event within interaction range
  - [x] If event found, trigger interaction
  - [x] Handle multiple events (select nearest or first found)
  - [x] Clean up event listeners on component unmount
  - [x] Reference PRD FR2 for keyboard interaction specification [Source: docs/prd.md#Core-Gameplay]

- [x] Task 3: Implement mouse interaction (click on event indicator) (AC: 1, 2)
  - [x] Add onClick handler to EventIndicator component
  - [x] On click, check if character is within interaction range
  - [x] If within range, trigger interaction
  - [x] Prevent interaction if character too far
  - [x] Reference Story 2.7 for EventIndicator component structure [Source: docs/sprint-artifacts/2-7-event-icons-and-visual-indicators.md]

- [x] Task 4: Implement interaction prevention logic (AC: 3)
  - [x] Check character distance before allowing interaction
  - [x] Check if event has expired (timer <= 0) before allowing interaction
  - [x] Check if game is paused (isPaused === true) before allowing interaction
  - [x] Check if game is over (gameOver === true) before allowing interaction
  - [x] Return early if any prevention condition is met
  - [x] Reference GameContext for game state flags [Source: src/contexts/GameContext.tsx]

- [x] Task 5: Integrate EventManager.resolveEvent() for event resolution (AC: 1, 4)
  - [x] Call EventManager.resolveEvent() with eventId, activeEvents, removeEvent callback
  - [x] Handle null return (event not found)
  - [x] Extract event data from resolved event
  - [x] Reference EventManager.resolveEvent() method signature [Source: src/core/EventManager.ts#resolveEvent]

- [x] Task 6: Update game state on event resolution (AC: 1, 4)
  - [x] Update score: call setScore(prev => prev + resolvedEvent.points)
  - [x] Update coziness: call setCoziness(prev => prev + resolvedEvent.cozinessReward)
  - [x] Ensure state updates are functional (avoid stale closures)
  - [x] Reference GameContext update functions [Source: src/contexts/GameContext.tsx]

- [x] Task 7: Ensure only one event can be interacted with at a time (AC: 2)
  - [x] Add interaction lock flag or debounce mechanism
  - [x] Prevent multiple simultaneous interactions
  - [x] Release lock after interaction completes
  - [x] Test with rapid key presses or clicks

- [x] Task 8: Prepare for visual feedback integration (AC: 1, 4)
  - [x] Note: Visual feedback will be implemented in Story 4.6
  - [x] Ensure interaction system provides event data needed for feedback
  - [x] Document what data is available for visual feedback
  - [x] Reference Story 4.6 for visual feedback requirements [Source: docs/epics.md#Story-4.6]

- [x] Task 9: Prepare for achievement progress checks (AC: 4)
  - [x] Note: Achievement system will be implemented in Story 3.5
  - [x] Ensure interaction system can trigger achievement checks
  - [x] Document interaction events for achievement tracking
  - [x] Reference Story 3.5 for achievement requirements [Source: docs/epics.md#Story-3.5]

- [x] Task 10: Testing and validation (AC: 1, 2, 3, 4)
  - [x] Test keyboard interaction (E key) with character near event
  - [x] Test keyboard interaction (E key) with character far from event
  - [x] Test mouse interaction (click) with character near event
  - [x] Test mouse interaction (click) with character far from event
  - [x] Test interaction prevention when game paused
  - [x] Test interaction prevention when game over
  - [x] Test interaction prevention when event expired
  - [x] Test score updates on successful interaction
  - [x] Test coziness updates on successful interaction
  - [x] Test event removal on successful interaction
  - [x] Test only one event can be interacted with at a time
  - [x] Test interaction with multiple events (select nearest)
  - [x] Test interaction range accuracy (50-100px)

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Interaction System Architecture:**
- Character position is stored in Character component state [Source: docs/sprint-artifacts/2-3-character-visual-and-movement-system.md]
- Event locations are stored in GameEvent.location property (x, y coordinates)
- EventManager.resolveEvent() method exists and handles event removal [Source: src/core/EventManager.ts#resolveEvent]
- GameContext provides update functions: setScore, setCoziness, removeEvent [Source: src/contexts/GameContext.tsx]
- EventIndicator component already exists and displays events [Source: docs/sprint-artifacts/2-7-event-icons-and-visual-indicators.md]
- Follow architecture document "Event System Pattern" section [Source: docs/architecture.md#Game-Event-System-Pattern]

**Distance Calculation:**
- Use Euclidean distance formula: sqrt((x2-x1)² + (y2-y1)²)
- Character position available from Character component state
- Event location available from GameEvent.location property
- Interaction range should be configurable constant (50-100px default)
- Store INTERACTION_RANGE constant in constants.ts [Source: docs/architecture.md#Project-Structure]

**Interaction Detection Flow:**
1. Player presses E key or clicks event indicator
2. System finds character position (from Character component or GameContext)
3. System finds event location (from GameEvent.location)
4. Calculate distance between character and event
5. If distance <= INTERACTION_RANGE:
   - Check prevention conditions (game paused, game over, event expired)
   - If all checks pass, trigger interaction
6. Call EventManager.resolveEvent() to remove event
7. Update game state (score, coziness)
8. Trigger visual feedback (Story 4.6)

**Keyboard Input Handling:**
- Add keyboard event listener for E key (keydown or keyup)
- Listener should be in Character component or game loop hook
- Use useEffect for event listener setup/cleanup
- Check for 'e' or 'E' key code
- Reference architecture document for input handling patterns [Source: docs/architecture.md#Communication-Patterns]

**Mouse Input Handling:**
- Add onClick handler to EventIndicator component
- Handler should check character distance before allowing interaction
- Prevent default click behavior if needed
- Reference Story 2.7 for EventIndicator component structure [Source: docs/sprint-artifacts/2-7-event-icons-and-visual-indicators.md]

**State Updates:**
- Use functional updates: setScore(prev => prev + points) to avoid stale closures
- Use functional updates: setCoziness(prev => prev + reward) to avoid stale closures
- State updates trigger React re-renders automatically
- Reference GameContext for update function patterns [Source: src/contexts/GameContext.tsx]

**Integration Points:**
- Character component: Provides character position for distance calculation
- EventIndicator component: Provides click handler for mouse interaction
- EventManager: Provides resolveEvent() method for event resolution
- GameContext: Provides state update functions (setScore, setCoziness, removeEvent)
- Game loop: May need to check for keyboard input (E key) in game loop hook

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Character component at `src/components/game/Character.tsx` (matches architecture document)
- EventIndicator component at `src/components/game/EventIndicator.tsx` (matches architecture document)
- EventManager at `src/core/EventManager.ts` (matches architecture document)
- GameContext at `src/contexts/GameContext.tsx` (matches architecture document)
- Constants at `src/utils/constants.ts` (matches architecture document)

**Source Tree Components to Touch:**
- `src/components/game/Character.tsx` - ENHANCE (add keyboard interaction handler for E key)
- `src/components/game/EventIndicator.tsx` - ENHANCE (add onClick handler for mouse interaction)
- `src/utils/constants.ts` - ENHANCE (add INTERACTION_RANGE constant)
- `src/utils/` - NEW (create distance calculation utility function, e.g., `distance.ts` or add to existing utils)
- `src/hooks/useGameLoop.ts` - MAYBE ENHANCE (if keyboard input handled in game loop)

**No Conflicts Detected:**
- Character component already handles keyboard input for movement (WASD/arrows)
- EventIndicator component already displays events (Story 2.7)
- EventManager.resolveEvent() method already exists
- GameContext already provides state update functions
- This story adds interaction logic without modifying existing core functionality

### Learnings from Previous Story

**From Story 2-8-event-timer-display (Status: done)**

- **EventIndicator Component Available**: EventIndicator component fully implemented [Source: docs/sprint-artifacts/2-8-event-timer-display.md]
  - Component displays event icons with priority colors and circular timer ring
  - Component receives event object with timer, location, and all event properties
  - Component structure is solid, can add onClick handler for mouse interaction
  - Component uses CSS Modules for styling (`EventIndicator.module.css`)

- **Event Timer Updates**: EventManager.updateEvents() updates timers every frame [Source: docs/sprint-artifacts/2-8-event-timer-display.md]
  - EventManager.updateEvents() called in game loop
  - Event timers decrement by deltaTime every frame
  - Timer updates trigger React re-renders (event.timer property changes)
  - Expired events (timer <= 0) should prevent interaction

- **EventManager.resolveEvent() Method**: EventManager has resolveEvent() method [Source: docs/sprint-artifacts/2-8-event-timer-display.md]
  - Method signature: `resolveEvent(eventId: string, activeEvents: GameEvent[], removeEventCallback: RemoveEventCallback): GameEvent | null`
  - Method removes event from active events and returns event data
  - Returns null if event not found
  - Use this method for event resolution (not manual removal)

- **GameContext State Management**: GameContext provides update functions [Source: docs/sprint-artifacts/2-8-event-timer-display.md]
  - setScore, setCoziness, removeEvent functions available
  - Use functional updates to avoid stale closures
  - State updates trigger React re-renders automatically

- **Performance Patterns**: CSS animations use GPU-accelerated transforms [Source: docs/sprint-artifacts/2-8-event-timer-display.md]
  - Interaction feedback should use CSS animations (Story 4.6)
  - GPU acceleration via transform properties
  - Smooth animations at 60 FPS

**From Story 2-3-character-visual-and-movement-system (Status: done)**

- **Character Position Available**: Character component stores position in state [Source: docs/sprint-artifacts/2-3-character-visual-and-movement-system.md]
  - Character position stored as `{ x: number, y: number }` in component state
  - Position updated every frame via movement
  - Position constrained to apartment boundaries
  - Use character position for distance calculation

- **Keyboard Input Handling**: Character component handles keyboard input [Source: docs/sprint-artifacts/2-3-character-visual-and-movement-system.md]
  - Component uses useEffect for keyboard event listeners
  - Listens for keydown/keyup events
  - Tracks which keys are currently pressed
  - Can add E key handler to existing keyboard input system

**Implementation Notes:**
- EventIndicator component already exists and can be enhanced with onClick handler
- Character component already handles keyboard input, can add E key handler
- EventManager.resolveEvent() method ready to use
- GameContext provides all necessary state update functions
- Distance calculation utility function needs to be created
- Interaction range constant needs to be added to constants.ts
- Interaction prevention logic needs to check game state flags

[Source: docs/sprint-artifacts/2-8-event-timer-display.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/2-3-character-visual-and-movement-system.md#Dev-Agent-Record]

### References

- [Source: docs/epics.md#Story-2.9] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Core-Gameplay] - Core gameplay specifications (FR2, FR6)
- [Source: docs/prd.md#Event-System] - Event system specifications (FR24-FR31)
- [Source: docs/ux-design-specification.md#Event-UX] - Event UX and interaction specifications
- [Source: docs/architecture.md#Game-Event-System-Pattern] - Event system architecture pattern
- [Source: docs/architecture.md#Communication-Patterns] - Input handling and event communication patterns
- [Source: docs/architecture.md#Project-Structure] - Component structure and file locations
- [Source: docs/sprint-artifacts/2-8-event-timer-display.md] - Event indicator implementation
- [Source: docs/sprint-artifacts/2-7-event-icons-and-visual-indicators.md] - Event indicator component structure
- [Source: docs/sprint-artifacts/2-3-character-visual-and-movement-system.md] - Character component and movement system
- [Source: src/core/EventManager.ts] - EventManager implementation and resolveEvent() method
- [Source: src/contexts/GameContext.tsx] - GameContext state management and update functions
- [Source: src/components/game/Character.tsx] - Character component and position management
- [Source: src/components/game/EventIndicator.tsx] - EventIndicator component structure

## Dev Agent Record

### Context Reference

- [Source: docs/sprint-artifacts/2-9-event-interaction-system.context.xml] - Story context XML with full implementation details

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

**Implementation Summary:**
- Created distance calculation utility (`src/utils/distance.ts`) with `calculateDistance()` and `isWithinInteractionRange()` functions
- Added `INTERACTION_RANGE` constant (75px) to `src/utils/constants.ts`
- Created `useEventInteraction` hook (`src/hooks/useEventInteraction.ts`) to centralize interaction logic
- Enhanced Character component with E key handling for keyboard interaction
- Enhanced EventIndicator component with onClick handler for mouse interaction
- Added character position tracking to GameContext for event interaction
- Implemented interaction prevention logic (distance, expired, paused, game over)
- Integrated EventManager.resolveEvent() for event resolution
- Implemented interaction lock to prevent multiple simultaneous interactions
- All acceptance criteria satisfied

**Visual Feedback Preparation (Story 4.6):**
- Interaction system provides resolved event data with:
  - Event location (x, y coordinates) for floating text positioning
  - Event points value for "+X" floating text
  - Event cozinessReward value for "+Затишок" floating text
  - Event type and priority for icon animation
- Event data is available immediately after `handleEventInteraction()` returns true
- Story 4.6 can hook into interaction completion to trigger visual feedback animations

**Achievement Progress Preparation (Story 3.5):**
- Interaction system can trigger achievement checks after successful event resolution
- Event resolution data available includes:
  - Event type (phone, kettle, cat, candle)
  - Event priority (minor, standard, critical)
  - Points awarded
  - Coziness reward
- Story 3.5 can track "Resolved 10 events in one evening" achievement by:
  - Listening to successful interactions (handleEventInteraction returns true)
  - Counting resolved events per evening session
  - Checking count on evening end

### File List

**New Files:**
- `src/utils/distance.ts` - Distance calculation utilities
- `src/hooks/useEventInteraction.ts` - Event interaction hook

**Modified Files:**
- `src/utils/constants.ts` - Added INTERACTION_RANGE constant
- `src/contexts/GameContext.tsx` - Added characterPosition state and setCharacterPosition function
- `src/components/game/Character.tsx` - Added E key handling and character position tracking
- `src/components/game/EventIndicator.tsx` - Added onClick handler for mouse interaction

## Change Log

- **2025-01-21**: Story created - Event Interaction System with keyboard (E key) and mouse (click) interaction support
- **2025-01-21**: Implementation complete - All tasks completed, interaction system fully functional, ready for review


# Story 2.6: Event Types and Interaction Requirements

Status: review

## Story

As a player,
I want different event types with specific interaction requirements,
so that I have variety in gameplay and different challenges to overcome.

## Acceptance Criteria

1. **Given** events are spawning
   **When** an event of a specific type appears
   **Then** the event has the correct properties:
   - **Phone (low battery)**: standard priority, +15 points, +8/-10 coziness, interaction: "plug into power bank"
   - **Kettle (boiling)**: critical priority, +20 points, +10/-20 coziness, interaction: "turn off"
   - **Cat (stressed)**: minor priority, +10 points, +5/-5 coziness, interaction: "calm it"
   - **Candle (needed/going out)**: standard priority, +15 points, +8/-10 coziness, interaction: "light it"

2. **Given** event types are defined
   **When** I review the event type system
   **Then** each event type has:
   - Unique visual identifier (icon type for Story 2.7)
   - Specific interaction text/description
   - Correct scoring values (from constants)
   - Correct coziness impact (from constants)
   - Appropriate timer duration based on priority and level

3. **Given** event types are implemented
   **When** I check the type definitions
   **Then** event types are defined in `src/types/events.ts` as EventType union
   **And** event type definitions match PRD FR24, FR25, FR26, FR27 exactly

4. **Given** events are created
   **When** an event is spawned
   **Then** event interaction requirements are stored with event data
   **And** interaction text/description is accessible for UI display (Story 2.9)

5. **Given** event type to priority mapping exists
   **When** events are spawned
   **Then** the mapping correctly assigns:
   - phone → standard priority
   - kettle → critical priority
   - cat → minor priority
   - candle → standard priority

6. **Given** event properties are set
   **When** events are created
   **Then** all properties match constants from `src/utils/constants.ts`:
   - Points values from EVENT_SCORING constant
   - Coziness rewards/penalties from EVENT_COZINESS_IMPACT constant
   - Timer durations from getEventTimerDuration(level) function

## Tasks / Subtasks

- [x] Task 1: Verify event type definitions (AC: 3)
  - [x] Check `src/types/events.ts` has EventType union with all 4 types
  - [x] Verify EventType includes: 'phone', 'kettle', 'cat', 'candle'
  - [x] Ensure EventPriority union includes: 'minor', 'standard', 'critical'
  - [x] Verify GameEvent interface has all required properties
  - [x] Reference PRD FR24 for event type specifications [Source: docs/prd.md#Event-Types-&-Scoring]

- [x] Task 2: Verify event type to priority mapping (AC: 5)
  - [x] Check EventManager has EVENT_TYPE_TO_PRIORITY mapping
  - [x] Verify phone → standard priority
  - [x] Verify kettle → critical priority
  - [x] Verify cat → minor priority
  - [x] Verify candle → standard priority
  - [x] Ensure mapping is used in spawnEvent() method
  - [x] Reference PRD for priority specifications [Source: docs/prd.md#Event-Types-&-Scoring]

- [x] Task 3: Verify event properties match constants (AC: 1, 6)
  - [x] Check EVENT_SCORING constant has correct values:
    - minor: +10 points
    - standard: +15 points
    - critical: +20 points
  - [x] Check EVENT_COZINESS_IMPACT constant has correct values:
    - minor: +5/-5 coziness
    - standard: +8/-10 coziness
    - critical: +10/-20 coziness
  - [x] Verify EventManager uses constants when creating events
  - [x] Ensure points and coziness values come from constants (not hardcoded)
  - [x] Reference PRD FR26, FR27 for scoring and coziness specifications [Source: docs/prd.md#Event-Types-&-Scoring]

- [x] Task 4: Add interaction requirements to event data (AC: 4)
  - [x] Define interaction text/descriptions for each event type:
    - phone: "plug into power bank" (Ukrainian: "Підключити до павербанку")
    - kettle: "turn off" (Ukrainian: "Вимкнути")
    - cat: "calm it" (Ukrainian: "Заспокоїти")
    - candle: "light it" (Ukrainian: "Запалити")
  - [x] Add interactionText property to GameEvent interface OR create separate mapping
  - [x] Store interaction requirements in constants or type definitions
  - [x] Make interaction text accessible for UI display (Story 2.9)
  - [x] Reference PRD FR25 for interaction requirements [Source: docs/prd.md#Event-Types-&-Scoring]

- [x] Task 5: Verify event visual identifiers (AC: 2)
  - [x] Ensure each event type has unique identifier for visual rendering
  - [x] Document icon/visual mapping for Story 2.7:
    - phone: 📱 or phone icon
    - kettle: 🫖 or kettle icon
    - cat: 🐱 or cat icon
    - candle: 🕯️ or candle icon
  - [x] Prepare event data structure for visual rendering in Story 2.7
  - [x] Note: Visual rendering implementation is in Story 2.7

- [x] Task 6: Verify timer duration logic (AC: 2, 6)
  - [x] Check getEventTimerDuration(level) function exists in constants.ts
  - [x] Verify timer duration is based on priority and level
  - [x] Ensure EventManager uses getEventTimerDuration() when creating events
  - [x] Verify timer durations are appropriate (5-10 seconds based on difficulty)
  - [x] Reference PRD FR31 for difficulty scaling [Source: docs/prd.md#Game-Mechanics]

- [x] Task 7: Testing and validation (AC: 1, 2, 3, 4, 5, 6)
  - [x] Test phone events have standard priority, +15 points, +8/-10 coziness
  - [x] Test kettle events have critical priority, +20 points, +10/-20 coziness
  - [x] Test cat events have minor priority, +10 points, +5/-5 coziness
  - [x] Test candle events have standard priority, +15 points, +8/-10 coziness
  - [x] Test event type to priority mapping is correct
  - [x] Test event properties come from constants (not hardcoded)
  - [x] Test interaction requirements are accessible for each event type
  - [x] Verify all event types match PRD specifications exactly
  - [x] Test timer durations are appropriate for each priority/level

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Event Type System:**
- Event types are defined as union type in `src/types/events.ts` [Source: docs/architecture.md#Data-Architecture]
- Event type to priority mapping is in EventManager class [Source: docs/sprint-artifacts/2-4-event-spawning-system.md]
- Event properties come from constants in `src/utils/constants.ts` [Source: docs/sprint-artifacts/1-5-game-constants-and-configuration.md]
- Follow architecture document "Event System Pattern" section [Source: docs/architecture.md#Game-Event-System-Pattern]

**Event Properties Data Flow:**
1. Event type is randomly selected (phone, kettle, cat, candle)
2. Priority is assigned based on EVENT_TYPE_TO_PRIORITY mapping
3. Points value comes from EVENT_SCORING[priority]
4. Coziness reward/penalty comes from EVENT_COZINESS_IMPACT[priority]
5. Timer duration comes from getEventTimerDuration(level)
6. Interaction text comes from event type mapping (to be added)
7. Event created with all properties and added to GameContext

**Type Safety:**
- EventType union ensures only valid event types can be created
- EventPriority union ensures only valid priorities can be assigned
- GameEvent interface ensures all required properties are present
- TypeScript types prevent invalid event configurations

**Constants Usage:**
- EVENT_SCORING: Priority-based points (minor: +10, standard: +15, critical: +20)
- EVENT_COZINESS_IMPACT: Priority-based rewards/penalties (minor: +5/-5, standard: +8/-10, critical: +10/-20)
- getEventTimerDuration(level): Level-based timer durations (5-10 seconds)
- EVENT_TYPE_TO_PRIORITY: Event type to priority mapping (already in EventManager)

**Interaction Requirements:**
- Each event type needs specific interaction text/description
- Interaction text should be in Ukrainian for UI display (Story 2.9)
- Interaction requirements should be stored with event data or in constants
- Interaction text will be used in Story 2.9 for player interaction hints

**Visual Identifiers:**
- Each event type needs unique visual identifier (icon) for Story 2.7
- Icons can be emoji or SVG (prepare for future asset integration)
- Visual identifiers are documented here but implemented in Story 2.7

**Performance Considerations:**
- Event type mapping should be efficient (constant-time lookups)
- Constants should be accessed directly (no function calls for simple values)
- Event creation should be fast (no unnecessary computations)

**Integration Points:**
- Event types already defined in Story 1.2 type definitions
- Event spawning already implemented in Story 2.4
- EventManager already has type to priority mapping
- Constants already defined in Story 1.5
- Prepare for visual rendering in Story 2.7
- Prepare for interaction system in Story 2.9

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Event types defined in `src/types/events.ts` (matches architecture document)
- Event constants in `src/utils/constants.ts` (matches architecture document)
- EventManager class in `src/core/EventManager.ts` (already exists from Story 2.4)
- Type definitions follow TypeScript naming conventions

**Source Tree Components to Touch:**
- `src/types/events.ts` - VERIFY (ensure EventType union has all 4 types, GameEvent interface complete)
- `src/utils/constants.ts` - VERIFY (ensure EVENT_SCORING and EVENT_COZINESS_IMPACT match PRD)
- `src/core/EventManager.ts` - VERIFY (ensure EVENT_TYPE_TO_PRIORITY mapping is correct)
- `src/core/EventManager.ts` - MODIFY (add interaction text mapping if needed)

**No Conflicts Detected:**
- Event types already defined in Story 1.2
- Event spawning already implemented in Story 2.4
- Constants already defined in Story 1.5
- EventManager already exists from Story 2.4

### Learnings from Previous Story

**From Story 2-5-event-timer-management (Status: review)**

- **EventManager Available**: EventManager class is available at `src/core/EventManager.ts` [Source: docs/sprint-artifacts/2-4-event-spawning-system.md]
  - EventManager already has EVENT_TYPE_TO_PRIORITY mapping
  - EventManager uses constants for points and coziness values
  - EventManager creates events with all required properties
  - EventManager integrates with game loop for timer updates

- **Event Timer Pattern**: Story 2.5 implements event timer countdown
  - Timer updates use delta time for frame-rate independence
  - Timer expiration triggers coziness penalties
  - Event timers are managed in EventManager.updateEvents()
  - Timer durations come from getEventTimerDuration(level)

**From Story 2-4-event-spawning-system (Status: review)**

- **Event Spawning Available**: EventManager.spawnEvent() is available [Source: docs/sprint-artifacts/2-4-event-spawning-system.md]
  - Event spawning uses EVENT_TYPE_TO_PRIORITY mapping
  - Event spawning uses constants for points and coziness
  - Event spawning creates events with all required properties
  - Events are added to GameContext for state management

- **Event Type Mapping**: Story 2.4 implements event type to priority mapping
  - Mapping: phone → standard, kettle → critical, cat → minor, candle → standard
  - Mapping is stored as constant in EventManager
  - Mapping is used when creating events in spawnEvent()

**From Story 1-5-game-constants-and-configuration (Status: done)**

- **Constants Available**: Game constants are available at `src/utils/constants.ts` [Source: docs/sprint-artifacts/1-5-game-constants-and-configuration.md]
  - EVENT_SCORING constant has priority-based points
  - EVENT_COZINESS_IMPACT constant has priority-based rewards/penalties
  - getEventTimerDuration(level) function provides level-based timer durations
  - Constants match PRD specifications exactly

**From Story 1-2-core-type-definitions (Status: done)**

- **Type Definitions Available**: Event types are defined at `src/types/events.ts` [Source: docs/sprint-artifacts/1-2-core-type-definitions.md]
  - EventType union includes: 'phone', 'kettle', 'cat', 'candle'
  - EventPriority union includes: 'minor', 'standard', 'critical'
  - GameEvent interface has all required properties
  - Types match architecture document data structures

**Implementation Notes:**
- This story is primarily a verification and enhancement story
- Most event type infrastructure is already in place from previous stories
- Main task is to verify all properties match PRD and add interaction requirements
- Interaction text will be used in Story 2.9 for player interaction hints
- Visual identifiers are documented here but implemented in Story 2.7

[Source: docs/sprint-artifacts/2-5-event-timer-management.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/2-4-event-spawning-system.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/1-5-game-constants-and-configuration.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/1-2-core-type-definitions.md#Dev-Agent-Record]

### References

- [Source: docs/epics.md#Story-2.6] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Event-Types-&-Scoring] - Event type specifications (FR24, FR25, FR26, FR27)
- [Source: docs/prd.md#Game-Mechanics] - Event difficulty scaling (FR31)
- [Source: docs/architecture.md#Game-Event-System-Pattern] - Event system architecture pattern
- [Source: docs/architecture.md#Data-Architecture] - Event type definitions and data structures
- [Source: docs/sprint-artifacts/1-2-core-type-definitions.md] - Event type definitions (EventType union, EventPriority union, GameEvent interface)
- [Source: docs/sprint-artifacts/1-5-game-constants-and-configuration.md] - Game constants including EVENT_SCORING, EVENT_COZINESS_IMPACT, getEventTimerDuration()
- [Source: docs/sprint-artifacts/2-4-event-spawning-system.md] - Event spawning implementation and EVENT_TYPE_TO_PRIORITY mapping
- [Source: docs/sprint-artifacts/2-5-event-timer-management.md] - Event timer management and update logic

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/2-6-event-types-and-interaction-requirements.context.xml

### Agent Model Used

Cursor Auto (bmad-begin)

### Debug Log References

- No debug issues encountered during implementation

### Completion Notes List

- **Task 1-3, 6**: Verified existing event type definitions, priority mappings, constants, and timer logic. All match PRD specifications exactly.
- **Task 4**: Added interaction requirements to event data:
  - Created `EVENT_INTERACTION_TEXT` constant in `src/utils/constants.ts` with English and Ukrainian text for all 4 event types
  - Added `interactionText` property to `GameEvent` interface in `src/types/events.ts`
  - Updated `EventManager.spawnEvent()` to include interaction text when creating events
  - Interaction text is now accessible for UI display in Story 2.9
- **Task 5**: Verified event visual identifiers are documented (implementation in Story 2.7)
- **Task 7**: Validated all acceptance criteria through code review:
  - All event types have correct priority, points, and coziness values
  - Event type to priority mapping is correct
  - All properties come from constants (no hardcoded values)
  - Interaction text is accessible for each event type
  - Timer durations are appropriate for each priority/level
- **Build Verification**: TypeScript compilation successful, no type errors

### File List

- `src/types/events.ts` - Added `interactionText` property to `GameEvent` interface
- `src/utils/constants.ts` - Added `EVENT_INTERACTION_TEXT` constant with interaction text for all event types
- `src/core/EventManager.ts` - Updated `spawnEvent()` to include interaction text when creating events

## Change Log

**2025-01-21** - Story created via create-story workflow
- Initial story draft created from epics.md and architecture patterns
- Acceptance criteria extracted from Story 2.6 in epics.md
- Tasks created based on acceptance criteria and architecture patterns
- Learnings from previous stories (2.5, 2.4, 1.5, 1.2) integrated
- Story focuses on verification and enhancement of existing event type system

**2025-01-21** - Story implementation completed via dev-story workflow
- Verified all event type definitions, priority mappings, and constants match PRD
- Added interaction requirements: created EVENT_INTERACTION_TEXT constant and added interactionText property to GameEvent interface
- Updated EventManager to include interaction text when creating events
- All acceptance criteria validated and tasks completed
- TypeScript compilation successful, ready for review


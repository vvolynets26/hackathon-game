# Story 2.15: Ukrainian Text for Core Gameplay

Status: review

## Story

As a Ukrainian-speaking player,
I want core gameplay text in Ukrainian,
So that the game feels authentic from the start.

## Acceptance Criteria

1. **Given** I am playing the game
   **When** I view core gameplay elements
   **Then** the following text is displayed in Ukrainian:
   - Timer label: "Час" or similar (already implemented in Timer component)
   - «Затишок» label: "Затишок" (already implemented in CozinessBar component)
   - Event interaction hints: "Натисніть E, щоб взаємодіяти" or similar
   - Event descriptions: "Телефон майже розрядився", "Кіт нервує", etc.
   - Win/lose messages: "Вечір завершено!", "Ви пережили вечір при блекауті ✨"

2. **Given** Ukrainian text constants are created
   **When** I examine the codebase
   **Then** Ukrainian text:
   - Is stored in `src/utils/translations.ts` or similar constants file
   - Uses proper Ukrainian grammar and spelling
   - Maintains light, cozy, humorous tone
   - Is consistent across all gameplay elements

3. **Given** components use Ukrainian text
   **When** I view gameplay UI elements
   **Then** text integration:
   - Replaces English placeholder text in components
   - All gameplay UI elements use Ukrainian text
   - Key terms remain in Ukrainian («Затишок», «Світлячки»)

4. **Given** event interaction occurs
   **When** I interact with events or view event tooltips
   **Then** event-related text is in Ukrainian:
   - Event interaction hints (tooltips, accessibility text)
   - Event type descriptions (phone, kettle, cat, candle)
   - Event interaction feedback messages

## Tasks / Subtasks

- [x] Task 1: Create translations constants file (AC: 2)
  - [x] Create `src/utils/translations.ts` file
  - [x] Define Ukrainian text constants for core gameplay:
    - Timer labels: "Час"
    - Coziness labels: "Затишок"
    - Event interaction hints: "Натисніть E, щоб взаємодіяти"
    - Event descriptions: "Телефон майже розрядився", "Кіт нервує", "Чайник кипить", "Свічка згасає"
    - Win/lose messages: "Вечір завершено!", "Ви пережили вечір при блекауті ✨"
  - [x] Use proper Ukrainian grammar and spelling
  - [x] Maintain light, cozy, humorous tone
  - [x] Export constants for use in components
  - [x] Reference PRD FR40, FR41, FR42 for localization requirements [Source: docs/prd.md#Localization-&-Content]

- [x] Task 2: Update EventIndicator component with Ukrainian text (AC: 1, 4)
  - [x] Update `src/components/game/EventIndicator.tsx`
  - [x] Replace English tooltip text with Ukrainian: "Натисніть E, щоб взаємодіяти" or similar
  - [x] Add Ukrainian event type descriptions for accessibility (alt text, aria-label)
  - [x] Import translations from `src/utils/translations.ts`
  - [x] Update title attribute with Ukrainian text
  - [x] Ensure event type names are in Ukrainian (phone → "Телефон", kettle → "Чайник", cat → "Кіт", candle → "Свічка")
  - [x] Reference EventIndicator component structure [Source: src/components/game/EventIndicator.tsx]

- [x] Task 3: Add Ukrainian text for event descriptions (AC: 1, 4)
  - [x] Add event type descriptions to translations.ts:
    - Phone: "Телефон майже розрядився"
    - Kettle: "Чайник кипить"
    - Cat: "Кіт нервує"
    - Candle: "Свічка згасає"
  - [x] Update EventIndicator or event display components to show Ukrainian descriptions
  - [x] Ensure descriptions match PRD event types [Source: docs/prd.md#Event-Types-&-Scoring]

- [x] Task 4: Add win/lose messages (AC: 1)
  - [x] Add win/lose message constants to translations.ts:
    - Win: "Вечір завершено!" or "Ви пережили вечір при блекауті ✨"
    - Lose: "Затишок закінчився" or similar
  - [x] Note: Win/lose messages will be displayed in results screen (Story 4.3), but constants should be prepared now
  - [x] Reference PRD for win/lose conditions [Source: docs/prd.md#Game-Mechanics]

- [x] Task 5: Verify existing Ukrainian text consistency (AC: 1, 3)
  - [x] Review Timer component - already has "Час:" label (no changes needed)
  - [x] Review CozinessBar component - already has "Затишок" label (no changes needed)
  - [x] Review WelcomeScreen component - already has Ukrainian text (no changes needed)
  - [x] Ensure all Ukrainian text uses same translation constants file for consistency
  - [x] Update Timer and CozinessBar to import from translations.ts if not already done

- [x] Task 6: Testing and validation (AC: 1, 2, 3, 4)
  - [x] Test all gameplay UI elements display Ukrainian text correctly
  - [x] Test event interaction hints are in Ukrainian
  - [x] Test event descriptions are in Ukrainian
  - [x] Test translations file exports all required constants
  - [x] Test components import and use translations correctly
  - [x] Test Ukrainian text maintains proper grammar and tone
  - [x] Test key terms remain in Ukrainian («Затишок», «Світлячки»)
  - [x] Test text is readable and consistent across components
  - [x] Build successful, no linting errors

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Translation Constants Structure:**
- Create `src/utils/translations.ts` file for centralized Ukrainian text [Source: docs/architecture.md#Project-Structure]
- Use TypeScript const objects or enums for type safety
- Export named constants for each text string
- Follow naming convention: `TRANSLATIONS` object with nested properties

**Component Integration:**
- Components import translations from `src/utils/translations.ts`
- Replace hardcoded strings with translation constants
- Maintain existing component structure (no major refactoring)
- Timer and CozinessBar already have Ukrainian text - verify consistency

**Event System Integration:**
- EventIndicator component needs Ukrainian tooltips and accessibility text
- Event type descriptions should match PRD specifications [Source: docs/prd.md#Event-Types-&-Scoring]
- Event interaction hints should guide players in Ukrainian

**Ukrainian Language Requirements:**
- All text must use proper Ukrainian grammar and spelling
- Maintain light, cozy, humorous tone (PRD FR42) [Source: docs/prd.md#Localization-&-Content]
- Key terms remain in Ukrainian: «Затишок», «Світлячки», «Вечір при блекауті»
- Reference PRD FR40, FR41, FR42 for localization specifications [Source: docs/prd.md#Localization-&-Content]

**Text Integration Strategy:**
- Incremental approach: Add Ukrainian text as features are built
- Replace English placeholder text with Ukrainian translations
- Ensure all gameplay UI elements use Ukrainian text
- Prepare win/lose messages for future results screen (Story 4.3)

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Translations file at `src/utils/translations.ts` (matches architecture document utils structure)
- Components remain in existing locations:
  - `src/components/game/EventIndicator.tsx` - UPDATE (add Ukrainian text)
  - `src/components/ui/Timer.tsx` - VERIFY (already has Ukrainian text)
  - `src/components/ui/CozinessBar.tsx` - VERIFY (already has Ukrainian text)
  - `src/components/ui/WelcomeScreen.tsx` - VERIFY (already has Ukrainian text)

**Source Tree Components to Touch:**
- `src/utils/translations.ts` - CREATE (new translations constants file)
- `src/components/game/EventIndicator.tsx` - UPDATE (add Ukrainian tooltips and accessibility text)
- `src/components/ui/Timer.tsx` - VERIFY/UPDATE (ensure uses translations.ts if not already)
- `src/components/ui/CozinessBar.tsx` - VERIFY/UPDATE (ensure uses translations.ts if not already)

**No Conflicts Detected:**
- Translations file is new, no existing implementation
- EventIndicator already has English tooltip - will be replaced with Ukrainian
- Timer and CozinessBar already have Ukrainian text - just need to verify consistency

### Learnings from Previous Story

**From Story 2-14-затишок-bar-hud-component (Status: review)**

- **Component Pattern**: Components read from GameContext via useGame hook [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md]
  - Use `const { gameState } = useGame()` to access game state
  - Component re-renders when context updates
  - No need for local state if reading directly from context

- **Styling Approach**: CSS Modules used for component styling [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md]
  - Timer component uses CSS Modules (`Timer.module.css`)
  - CozinessBar component uses CSS Modules (`CozinessBar.module.css`)
  - Follows architecture ADR-005: CSS Modules for Styling

- **Ukrainian Text Already Present**: Timer and CozinessBar components already have Ukrainian text [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md]
  - Timer: "Час:" label (line 62 in Timer.tsx)
  - CozinessBar: "Затишок" label (line 90 in CozinessBar.tsx)
  - These should be moved to translations.ts for consistency

- **HUD Integration**: HUD integrated into Apartment component [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md]
  - HUD rendered in `Apartment.tsx` component
  - HUD always visible during gameplay
  - No need to modify Apartment component for this story

**From Story 2-13-evening-timer-hud-component (Status: done)**

- **HUD Structure**: HUD component exists with three-section layout [Source: docs/sprint-artifacts/2-13-evening-timer-hud-component.md]
  - Left section: Timer component (already has Ukrainian "Час:" label)
  - Center section: CozinessBar component (already has Ukrainian "Затишок" label)
  - Right section: Empty for future XP/Level (Story 4.1, 4.2)

**Implementation Notes:**
- Create translations.ts file early to centralize all Ukrainian text
- Update EventIndicator component to use Ukrainian tooltips and accessibility text
- Verify Timer and CozinessBar use translations.ts for consistency
- Prepare win/lose messages for future results screen (Story 4.3)
- Event descriptions should match PRD event types exactly

[Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/2-13-evening-timer-hud-component.md#Dev-Agent-Record]

### References

- [Source: docs/epics.md#Story-2.15] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Localization-&-Content] - Ukrainian language requirements (FR40, FR41, FR42)
- [Source: docs/prd.md#Event-Types-&-Scoring] - Event type specifications for descriptions
- [Source: docs/architecture.md#Project-Structure] - Component structure and file locations
- [Source: docs/architecture.md#ADR-005] - CSS Modules styling approach
- [Source: src/components/game/EventIndicator.tsx] - EventIndicator component structure
- [Source: src/components/ui/Timer.tsx] - Timer component (already has Ukrainian text)
- [Source: src/components/ui/CozinessBar.tsx] - CozinessBar component (already has Ukrainian text)
- [Source: src/components/ui/WelcomeScreen.tsx] - WelcomeScreen component (already has Ukrainian text)
- [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md] - Previous story learnings

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/2-15-ukrainian-text-for-core-gameplay.context.xml

### Agent Model Used

Auto (Cursor AI)

### Debug Log References

### Completion Notes List

✅ **Task 1 - Translations Constants File**: Created `src/utils/translations.ts` with centralized Ukrainian text constants. Organized by category (gameplay, eventTypes, eventDescriptions, messages). All text follows PRD FR40, FR41, FR42 requirements for Ukrainian language, proper grammar, and cozy tone.

✅ **Task 2 - EventIndicator Component**: Updated EventIndicator component to use Ukrainian text from translations.ts. Replaced English tooltip with Ukrainian text including event type names, priority labels, and interaction hints. Added Ukrainian aria-label and alt text for accessibility. Event type names translated: phone → "Телефон", kettle → "Чайник", cat → "Кіт", candle → "Свічка".

✅ **Task 3 - Event Descriptions**: Added event descriptions to translations.ts matching PRD specifications. EventIndicator now displays Ukrainian descriptions in tooltips and accessibility attributes.

✅ **Task 4 - Win/Lose Messages**: Added win/lose message constants to translations.ts. Messages prepared for future results screen (Story 4.3). Win: "Ви пережили вечір при блекауті ✨", Lose: "Затишок закінчився".

✅ **Task 5 - Text Consistency**: Updated Timer and CozinessBar components to import from translations.ts for consistency. Both components now use centralized translation constants instead of hardcoded strings. WelcomeScreen already has Ukrainian text and doesn't need changes for this story.

✅ **Task 6 - Testing**: All tests passed. Build successful with no linting errors. All components correctly import and use translations. Ukrainian text maintains proper grammar and tone. Key terms remain in Ukrainian («Затишок», «Світлячки»).

### File List

- `src/utils/translations.ts` - NEW: Ukrainian translations constants file
- `src/components/game/EventIndicator.tsx` - MODIFIED: Added Ukrainian text for tooltips, aria-labels, and alt text
- `src/components/ui/Timer.tsx` - MODIFIED: Updated to use translations.ts for timer label
- `src/components/ui/CozinessBar.tsx` - MODIFIED: Updated to use translations.ts for coziness label

## Change Log

- 2025-01-21: Story created by create-story workflow
- 2025-01-21: Implementation complete - All tasks completed, story ready for review


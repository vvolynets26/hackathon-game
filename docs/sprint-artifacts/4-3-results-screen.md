# Story 4.3: Results Screen

Status: ready-for-dev

## Story

As a player,
I want to see a results screen after each evening showing my performance and rewards,
So that I understand what I earned and can celebrate my progress.

## Acceptance Criteria

1. **Given** an evening ends (win or lose)
   **When** the game transitions to results screen
   **Then** `ResultsScreen.tsx` displays:
   - **Top section:**
     - Title: "Вечір завершено!" or "Ви пережили вечір при блекауті ✨"
   - **Middle section:**
     - Score: "Очки: 235" (final score from evening)
     - Final «Затишок»: Value + small icon (e.g., "Затишок: 65%")
     - XP gained: "+20 XP" (XP earned this evening)
     - «Світлячки» earned: "+2 ✨" (currency earned this evening)
     - XP bar animation: Smoothly fills from old XP to new XP value
   - **Level up section (if applicable):**
     - "Level Up! Lv. 1 → Lv. 2" text
     - Small glow or confetti effect (optional)
     - XP bar shows new level progress
   - **Bottom section:**
     - Primary button: "Грати ще один вечір" (starts new evening)
     - Secondary button: "Магазин" (opens shop, Story 4.4)

2. **Given** the results screen is displayed
   **When** I observe the screen behavior
   **Then** the results screen:
   - Appears as full-screen overlay (modal-style)
   - Animates in smoothly (fade or slide transition)
   - All values are accurate (from game state and progression calculations)
   - Can be dismissed by clicking "Play again" button

## Tasks / Subtasks

- [ ] Task 1: Create ResultsScreen component structure (AC: 1, 2)
  - [ ] Create `src/components/ui/ResultsScreen.tsx` component
  - [ ] Component reads from GameContext using `useGame()` hook (score, final coziness, gameOver state)
  - [ ] Component reads from ProgressionContext using `useProgression()` hook (XP gained, level up status, currency earned)
  - [ ] Component displays as full-screen overlay (modal-style)
  - [ ] Component animates in smoothly (fade or slide transition using CSS)
  - [ ] Reference GameContext [Source: src/contexts/GameContext.tsx]
  - [ ] Reference ProgressionContext [Source: src/contexts/ProgressionContext.tsx]
  - [ ] Reference UX design "Results Screen" section [Source: docs/ux-design-specification.md]

- [ ] Task 2: Implement top section with title (AC: 1)
  - [ ] Display title: "Вечір завершено!" for lose condition or "Ви пережили вечір при блекауті ✨" for win condition
  - [ ] Determine win/lose condition from GameContext (gameOver state, coziness > 0 = win)
  - [ ] Style title according to UX design (H1 typography, centered)
  - [ ] Add Ukrainian translations for win/lose messages (already prepared in Story 2.15)
  - [ ] Reference translations file [Source: src/utils/translations.ts]
  - [ ] Reference PRD win/lose messages [Source: docs/prd.md#Results-Screen]

- [ ] Task 3: Implement middle section with performance metrics (AC: 1)
  - [ ] Display score: "Очки: {score}" (read from GameContext.gameState.score)
  - [ ] Display final «Затишок»: "Затишок: {coziness}%" with small icon (read from GameContext.gameState.coziness)
  - [ ] Display XP gained: "+{xpGained} XP" (calculate from ProgressionContext - XP before evening vs after)
  - [ ] Display «Світлячки» earned: "+{svitlyachkyEarned} ✨" (calculate from ProgressionContext - currency before evening vs after)
  - [ ] Implement XP bar animation: Smoothly fills from old XP to new XP value
  - [ ] Use XPLevelDisplay component or similar for XP bar (reuse from Story 4.1)
  - [ ] Style metrics according to UX design (readable text, proper spacing)
  - [ ] Reference GameContext for game state [Source: src/contexts/GameContext.tsx]
  - [ ] Reference ProgressionContext for progression data [Source: src/contexts/ProgressionContext.tsx]
  - [ ] Reference XPLevelDisplay component [Source: src/components/ui/XPLevelDisplay.tsx]

- [ ] Task 4: Implement level up section (AC: 1)
  - [ ] Check if level up occurred (compare level before evening vs after from ProgressionContext)
  - [ ] If level up: Display "Level Up! Lv. {oldLevel} → Lv. {newLevel}" text
  - [ ] Add small glow or confetti effect (optional, CSS animation)
  - [ ] Update XP bar to show new level progress (use ProgressionSystem.getXPProgress)
  - [ ] Style level up section prominently (larger text, warm accent color)
  - [ ] Reference ProgressionSystem for level calculations [Source: src/core/ProgressionSystem.ts]

- [ ] Task 5: Implement bottom section with action buttons (AC: 1, 2)
  - [ ] Create primary button: "Грати ще один вечір" (starts new evening)
  - [ ] Create secondary button: "Магазин" (opens shop, Story 4.4 - prepare navigation)
  - [ ] Primary button resets game state and starts new evening (call GameContext reset/start functions)
  - [ ] Secondary button navigates to shop screen (prepare for Story 4.4, can be placeholder for now)
  - [ ] Buttons styled according to UX design (primary: large, prominent; secondary: smaller, less prominent)
  - [ ] Buttons have hover states and click animations (Story 4.14)
  - [ ] Add Ukrainian translations for button labels
  - [ ] Reference Button component if available [Source: src/components/common/Button.tsx]
  - [ ] Reference UX design button specifications [Source: docs/ux-design-specification.md]

- [ ] Task 6: Implement screen animations and transitions (AC: 2)
  - [ ] Create `src/components/ui/ResultsScreen.module.css` stylesheet
  - [ ] Implement fade-in or slide-in animation for screen appearance
  - [ ] Implement smooth CSS transitions for all value updates
  - [ ] Implement XP bar fill animation (smoothly from old to new value)
  - [ ] Style overlay background (dimmed, full-screen)
  - [ ] Ensure animations are performance-friendly (CSS-based, GPU-accelerated)
  - [ ] Reference UX design animation specifications [Source: docs/ux-design-specification.md]

- [ ] Task 7: Integrate ResultsScreen into game flow (AC: 1, 2)
  - [ ] Add ResultsScreen component to main game component (App.tsx or GameCanvas)
  - [ ] Show ResultsScreen when gameOver is true (from GameContext)
  - [ ] Hide ResultsScreen when "Play again" button is clicked
  - [ ] Ensure ResultsScreen appears after evening ends (win or lose)
  - [ ] Test screen appears and dismisses correctly
  - [ ] Reference game flow from Story 2.11 [Source: docs/epics.md#Story-2.11]

- [ ] Task 8: Calculate and display accurate values (AC: 1, 2)
  - [ ] Calculate XP gained this evening (store XP before evening starts, compare at end)
  - [ ] Calculate «Світлячки» earned this evening (store currency before evening starts, compare at end)
  - [ ] Verify score is accurate (from GameContext.gameState.score)
  - [ ] Verify final «Затишок» is accurate (from GameContext.gameState.coziness)
  - [ ] Verify level up status is accurate (compare level before vs after)
  - [ ] Store evening start state for comparison (XP, currency, level)
  - [ ] Reference ProgressionSystem for calculations [Source: src/core/ProgressionSystem.ts]

- [ ] Task 9: Testing and validation (AC: 1, 2)
  - [ ] Test results screen displays correctly after win condition
  - [ ] Test results screen displays correctly after lose condition
  - [ ] Test all values are accurate (score, coziness, XP, currency)
  - [ ] Test level up section appears when level up occurs
  - [ ] Test level up section does not appear when no level up
  - [ ] Test XP bar animation fills smoothly
  - [ ] Test screen animates in smoothly
  - [ ] Test "Play again" button starts new evening
  - [ ] Test "Магазин" button navigation (prepare for Story 4.4)
  - [ ] Test screen can be dismissed correctly
  - [ ] Test Ukrainian text displays correctly

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Results Screen Architecture:**
- Results screen is a full-screen overlay component (modal-style)
- Component reads from both GameContext and ProgressionContext
- Component displays after evening ends (gameOver = true)
- Component can be dismissed to start new evening or navigate to shop
- Component uses CSS animations for smooth transitions

**GameContext Integration:**
- GameContext provides `gameState` with: score, coziness, gameOver, isPlaying
- Use `useGame()` hook to access GameContext
- Read final score from `gameState.score`
- Read final coziness from `gameState.coziness`
- Check gameOver state to determine when to show results screen
- Reset game state when "Play again" button clicked

**ProgressionContext Integration:**
- ProgressionContext provides `progressionState` with: level, xp, svitlyachky
- Use `useProgression()` hook to access ProgressionContext
- Calculate XP gained: Store XP before evening starts, compare at end
- Calculate currency earned: Store currency before evening starts, compare at end
- Check level up: Compare level before evening vs after
- ProgressionContext automatically persists to localStorage

**XP Bar Animation:**
- Reuse XPLevelDisplay component or similar pattern from Story 4.1
- Animate XP bar from old XP value to new XP value smoothly
- Use CSS transitions for smooth animation (GPU-accelerated)
- Calculate XP progress using ProgressionSystem.getXPProgress(currentXP, level)

**Win/Lose Condition:**
- Win: gameOver = true AND coziness > 0 (timer reached 0)
- Lose: gameOver = true AND coziness = 0 («Затишок» reached 0)
- Display appropriate title based on win/lose condition
- Win/lose messages already prepared in translations.ts (Story 2.15)

**Screen Navigation:**
- "Play again" button: Resets game state, starts new evening
- "Магазин" button: Navigates to shop screen (Story 4.4 - prepare navigation, can be placeholder)
- Screen can be dismissed by clicking "Play again" button
- Prepare navigation system for shop screen integration

**Styling Guidelines:**
- Full-screen overlay with dimmed background
- Centered card-based layout (matches UX design)
- Warm accent colors for highlights (level up, currency)
- Light text on dark background (matches "Cozy Blackout" theme)
- Smooth CSS transitions for all animations
- Typography: H1 for title, body for metrics, buttons styled prominently

**Ukrainian Text Integration:**
- All text in Ukrainian (title, metrics labels, button labels)
- Win/lose messages already in translations.ts (Story 2.15)
- Add button labels to translations.ts
- Reference PRD FR40-FR42 for localization requirements

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Results screen component at `src/components/ui/ResultsScreen.tsx` (to be created)
- Results screen stylesheet at `src/components/ui/ResultsScreen.module.css` (to be created)
- GameContext at `src/contexts/GameContext.tsx` (already exists)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (already exists)
- Translations file at `src/utils/translations.ts` (already exists, needs button labels)
- ProgressionSystem at `src/core/ProgressionSystem.ts` (already exists)
- XPLevelDisplay component at `src/components/ui/XPLevelDisplay.tsx` (already exists, can be reused)

**Source Tree Components to Touch:**
- `src/components/ui/ResultsScreen.tsx` - CREATE (new component)
- `src/components/ui/ResultsScreen.module.css` - CREATE (new stylesheet)
- `src/components/ui/App.tsx` or game container - MODIFY (add ResultsScreen integration)
- `src/utils/translations.ts` - MODIFY (add button labels if needed)
- `src/contexts/GameContext.tsx` - READ (access game state)
- `src/contexts/ProgressionContext.tsx` - READ (access progression state)

**No Conflicts Detected:**
- Results screen is new component, no conflicts with existing components
- GameContext and ProgressionContext already provide required data
- Win/lose messages already prepared in translations.ts (Story 2.15)
- XPLevelDisplay component can be reused for XP bar display
- Shop navigation can be prepared as placeholder (Story 4.4)

### Learnings from Previous Story

**From Story 4-2-світлячки-hud-display-and-ukrainian-for-progression (Status: ready-for-dev)**
- **ProgressionContext Usage**: ProgressionContext provides full progression state [Source: docs/sprint-artifacts/4-2-світлячки-hud-display-and-ukrainian-for-progression.md]
  - Use `useProgression()` hook to access `progressionState` (level, xp, svitlyachky)
  - ProgressionContext updates trigger React re-renders automatically
  - ProgressionContext state persists via localStorage (automatic)
  - Currency is accessible via `progressionState.svitlyachky`
  - Ready for results screen integration

- **HUD Component Pattern**: HUD components follow consistent pattern [Source: src/components/ui/HUD.tsx]
  - Components read from contexts using hooks
  - Components use CSS Modules for styling
  - Components update reactively when context state changes
  - Components styled with warm accent colors and light text
  - Results screen can follow similar pattern for consistency

- **XPLevelDisplay Component**: XPLevelDisplay component available for reuse [Source: src/components/ui/XPLevelDisplay.tsx]
  - Component displays level and XP progress
  - Component calculates XP progress using `ProgressionSystem.getXPProgress(currentXP, level)`
  - Component uses CSS Modules for styling
  - Component can be reused in results screen for XP bar display
  - Component already styled with warm accent colors

- **Ukrainian Text Pattern**: Ukrainian translations follow consistent pattern [Source: src/utils/translations.ts]
  - Translations stored in `translations.ts` file
  - Win/lose messages already prepared (Story 2.15)
  - Button labels should be added to translations file
  - All UI text should use Ukrainian translations
  - Reference PRD FR40-FR42 for localization requirements

- **Styling Pattern**: Components use warm accent colors and light text [Source: src/components/ui/XPLevelDisplay.module.css]
  - Light text color (#ffffff) for readability
  - Warm accent color (#ffd700) for highlights
  - Smooth CSS transitions for value updates
  - CSS Modules for scoped styling
  - Results screen should follow similar styling pattern

**Implementation Notes:**
- Create ResultsScreen component that reads from both GameContext and ProgressionContext
- Calculate XP gained and currency earned by comparing before/after values
- Reuse XPLevelDisplay component or pattern for XP bar display
- Use CSS animations for smooth screen transitions and XP bar fill
- Add Ukrainian translations for button labels
- Prepare shop navigation as placeholder (Story 4.4)
- Test screen appears correctly after win and lose conditions
- Ensure all values are accurate from game state and progression calculations

### References

- [Source: docs/epics.md#Story-4.3] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Results-Screen] - Results screen specifications (FR33)
- [Source: docs/prd.md#FR33] - Results screen requirement: "The game displays a results screen after each evening showing score, final «Затишок», XP gained, «Світлячки» earned, and level up notification if applicable"
- [Source: docs/prd.md#FR40-FR42] - Ukrainian localization requirements
- [Source: docs/ux-design-specification.md] - UX design specifications for results screen
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/4-2-світлячки-hud-display-and-ukrainian-for-progression.md] - Previous story learnings and patterns
- [Source: docs/sprint-artifacts/3-1-xp-and-level-system.md] - XP system implementation and integration points
- [Source: docs/sprint-artifacts/3-2-світлячки-currency-system.md] - Currency system implementation and integration points
- [Source: docs/sprint-artifacts/2-12-scoring-system.md] - Scoring system implementation and integration points
- [Source: docs/sprint-artifacts/2-11-evening-timer-and-win-lose-conditions.md] - Win/lose conditions and game end state
- [Source: docs/sprint-artifacts/2-15-ukrainian-text-for-core-gameplay.md] - Win/lose messages already prepared
- [Source: src/components/ui/XPLevelDisplay.tsx] - XPLevelDisplay component for reuse
- [Source: src/components/ui/HUD.tsx] - HUD component pattern for consistency
- [Source: src/contexts/GameContext.tsx] - GameContext for game state access
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext for progression state access
- [Source: src/core/ProgressionSystem.ts] - ProgressionSystem for XP/level calculations
- [Source: src/utils/translations.ts] - Translations file for Ukrainian text

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List


# Story 4.1: XP and Level HUD Display

Status: review

## Story

As a player,
I want to see my level and XP progress in the HUD,
So that I can track my progression during gameplay.

## Acceptance Criteria

1. **Given** I am playing the game
   **When** the gameplay screen is active
   **Then** HUD right section displays:
   - Level display: "Lv. 2" text (in Ukrainian: "Рівень 2")
   - XP bar below level: shows progress to next level (0-1 fill)
   - XP bar updates smoothly as XP increases
   - Level and XP values update in real-time

2. **Given** the HUD is displayed
   **When** I observe the XP/Level display
   **Then** the display:
   - Is positioned in HUD right section
   - Reads from ProgressionContext (level, xp)
   - Updates when level changes (pulse/glow animation, Story 4.9)
   - Styled according to UX design (light text, warm accents)

3. **Given** I am viewing the level display
   **When** I see the text
   **Then** the text is in Ukrainian: "Рівень" for level label

## Tasks / Subtasks

- [x] Task 1: Create XP/Level display component (AC: 1, 2, 3)
  - [x] Create `src/components/ui/XPLevelDisplay.tsx` component
  - [x] Component reads level and xp from ProgressionContext using `useProgression()` hook
  - [x] Display level text: "Рівень {level}" (Ukrainian)
  - [x] Calculate XP progress: use `ProgressionSystem.getXPProgress(currentXP, level)` helper
  - [x] Display XP bar with fill percentage (0-1, CSS width percentage)
  - [x] Component updates reactively when ProgressionContext state changes
  - [x] Reference ProgressionContext [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference ProgressionSystem [Source: src/core/ProgressionSystem.ts]
  - [x] Reference UX design "Main Game Screen Layout" [Source: docs/ux-design-specification.md#Main-Game-Screen-Layout]

- [x] Task 2: Style XP/Level display component (AC: 2)
  - [x] Create `src/components/ui/XPLevelDisplay.module.css` stylesheet
  - [x] Style level text: light text color (#ffffff), appropriate font size (16px body)
  - [x] Style XP bar: horizontal bar with background and fill
  - [x] XP bar fill: warm accent color (#ffd700 or similar)
  - [x] Add smooth CSS transitions for XP bar fill updates
  - [x] Position component for HUD right section integration
  - [x] Reference UX design color system [Source: docs/ux-design-specification.md#Color-System]
  - [x] Reference UX design typography [Source: docs/ux-design-specification.md#Typography-System]

- [x] Task 3: Integrate XP/Level display into HUD component (AC: 1, 2)
  - [x] Import XPLevelDisplay component into `src/components/ui/HUD.tsx`
  - [x] Add XPLevelDisplay to HUD right section (replacing placeholder comment)
  - [x] Verify HUD layout: left (Timer), center (CozinessBar), right (XPLevelDisplay)
  - [x] Ensure HUD right section styling accommodates XP/Level display
  - [x] Test HUD displays correctly during gameplay
  - [x] Reference HUD component [Source: src/components/ui/HUD.tsx]
  - [x] Reference HUD layout from UX design [Source: docs/ux-design-specification.md#Main-Game-Screen-Layout]

- [x] Task 4: Add level change animation preparation (AC: 2)
  - [x] Document level change detection (compare previous level to current level)
  - [x] Prepare CSS class for pulse/glow animation (to be used in Story 4.9)
  - [x] Add comment noting animation will be implemented in Story 4.9
  - [x] Reference Story 4.9 for animation implementation [Source: docs/epics.md#Story-4.9]

- [x] Task 5: Testing and validation (AC: 1, 2, 3)
  - [x] Test component displays correct level from ProgressionContext
  - [x] Test component displays correct XP progress calculation
  - [x] Test XP bar fill updates smoothly when XP increases
  - [x] Test component updates when level changes
  - [x] Test component updates when XP changes
  - [x] Test Ukrainian text displays correctly ("Рівень")
  - [x] Test component integrates correctly in HUD right section
  - [x] Test HUD layout remains correct with new component

## Dev Notes

### Relevant Architecture Patterns and Constraints

**HUD Layout Architecture:**
- HUD component (`src/components/ui/HUD.tsx`) uses three-section layout: left, center, right
- Left section: Timer component (Story 2.13)
- Center section: CozinessBar component (Story 2.14)
- Right section: XP/Level display (this story) + «Світлячки» display (Story 4.2)
- HUD positioned at top of screen with 8px padding
- HUD styled with dark background, light text, warm accents

**ProgressionContext Integration:**
- ProgressionContext provides `progressionState` with `level` and `xp` properties
- Use `useProgression()` hook to access ProgressionContext
- Component should reactively update when ProgressionContext state changes
- ProgressionSystem provides helper functions for XP calculations

**XP Progress Calculation:**
- Use `ProgressionSystem.getXPProgress(currentXP, level)` to calculate 0-1 progress value
- Progress value represents fraction to next level (0 = current level start, 1 = next level)
- XP bar fill width = progress * 100% (CSS width percentage)

**Component Structure:**
- Create new component: `XPLevelDisplay.tsx` in `src/components/ui/`
- Component is presentational (reads from context, displays UI)
- Component uses CSS Modules for styling
- Component follows React best practices (functional component, hooks)

**Styling Guidelines:**
- Light text color (#ffffff) for readability against dark HUD background
- Warm accent color (#ffd700) for XP bar fill (matches «Світлячки» accent)
- Smooth CSS transitions for XP bar fill updates (transition: width 0.3s ease)
- Typography: 16px body text for level label, appropriate sizing for XP bar

### Project Structure Notes

**Alignment with Unified Project Structure:**
- HUD component at `src/components/ui/HUD.tsx` (already exists, needs integration)
- New component: `src/components/ui/XPLevelDisplay.tsx` (to be created)
- New stylesheet: `src/components/ui/XPLevelDisplay.module.css` (to be created)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (already exists)
- ProgressionSystem at `src/core/ProgressionSystem.ts` (already exists)

**Source Tree Components to Touch:**
- `src/components/ui/HUD.tsx` - MODIFY (add XPLevelDisplay to right section)
- `src/components/ui/XPLevelDisplay.tsx` - CREATE (new component)
- `src/components/ui/XPLevelDisplay.module.css` - CREATE (new stylesheet)

**No Conflicts Detected:**
- HUD component already has placeholder comment for right section (Story 4.1, 4.2)
- ProgressionContext already provides level and xp in progressionState
- ProgressionSystem already has getXPProgress helper function
- HUD right section is ready for XP/Level display integration

### Learnings from Previous Story

**From Story 3-4-shop-system (Status: done)**
- **ProgressionContext**: ProgressionContext provides full progression state including level and xp [Source: docs/sprint-artifacts/3-4-shop-system.md]
  - Use `useProgression()` hook to access `progressionState.level` and `progressionState.xp`
  - ProgressionContext updates trigger React re-renders automatically
  - ProgressionContext state persists via localStorage (automatic)
  - Ready for HUD display integration

**From Story 3-1-xp-and-level-system (Status: done)**
- **XP and Level System**: ProgressionSystem provides helper functions for XP calculations [Source: docs/epics.md#Story-3.1]
  - `ProgressionSystem.getXPProgress(currentXP, level)` returns 0-1 progress value
  - `ProgressionSystem.getXPForNextLevel(level)` returns XP needed for next level
  - Level and XP stored in ProgressionState and accessible via ProgressionContext
  - Ready for HUD display integration

**From Story 2-13-evening-timer-hud-component (Status: done)**
- **HUD Component**: HUD component structure established with three-section layout [Source: src/components/ui/HUD.tsx]
  - HUD uses left, center, right sections
  - Timer component integrated in left section
  - CozinessBar component integrated in center section
  - Right section has placeholder comment for XP/Level and «Світлячки» displays
  - Ready for XP/Level display integration

**From Story 2-14-затишок-bar-hud-component (Status: done)**
- **HUD Styling**: HUD styled with dark background, light text, warm accents [Source: docs/epics.md#Story-2.14]
  - HUD positioned at top of screen with 8px padding
  - HUD uses CSS Modules for styling
  - CozinessBar component demonstrates HUD component styling patterns
  - Ready for XP/Level display styling integration

**Implementation Notes:**
- Create XPLevelDisplay component that reads from ProgressionContext
- Use ProgressionSystem.getXPProgress for XP bar calculation
- Integrate component into HUD right section
- Style component according to UX design (light text, warm accents)
- Add Ukrainian text ("Рівень") for level label
- Prepare for level change animation (Story 4.9)
- Test component updates reactively when progression state changes

### References

- [Source: docs/epics.md#Story-4.1] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Main-Game-Screen-Layout] - HUD layout specifications (FR32, FR14)
- [Source: docs/ux-design-specification.md#Main-Game-Screen-Layout] - HUD layout and styling specifications
- [Source: docs/ux-design-specification.md#Color-System] - Color palette and accent colors
- [Source: docs/ux-design-specification.md#Typography-System] - Typography scale and usage
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/3-4-shop-system.md] - ProgressionContext integration patterns
- [Source: docs/sprint-artifacts/3-1-xp-and-level-system.md] - XP and level system implementation
- [Source: src/components/ui/HUD.tsx] - HUD component structure and integration point
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext for level and xp access
- [Source: src/core/ProgressionSystem.ts] - ProgressionSystem for XP progress calculation

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Auto (BMAD dev-story workflow)

### Debug Log References

### Completion Notes List

**Implementation completed: 2025-01-21**

1. **XPLevelDisplay Component Created** (`src/components/ui/XPLevelDisplay.tsx`)
   - Component reads level and XP from ProgressionContext using `useProgression()` hook
   - Displays level text in Ukrainian: "Рівень {level}"
   - Calculates XP progress using `ProgressionSystem.getXPProgress(currentXP, level)`
   - Displays XP bar with fill percentage (0-100% CSS width)
   - Component updates reactively when ProgressionContext state changes
   - Level change detection prepared for future animation (Story 4.9)

2. **XPLevelDisplay Stylesheet Created** (`src/components/ui/XPLevelDisplay.module.css`)
   - Level text styled with light color (#ffffff), 16px body font size
   - XP bar styled as horizontal bar with dark background and warm gold fill (#ffd700)
   - Smooth CSS transitions for XP bar fill updates (0.3s ease)
   - Component positioned for HUD right section integration
   - Responsive adjustments for smaller screens
   - GPU-accelerated transitions for performance

3. **HUD Integration** (`src/components/ui/HUD.tsx`)
   - XPLevelDisplay imported and added to HUD right section
   - HUD layout verified: left (Timer), center (CozinessBar), right (XPLevelDisplay)
   - HUD right section styling accommodates XP/Level display
   - Component integrated successfully with existing HUD structure

4. **Ukrainian Translation Added** (`src/utils/translations.ts`)
   - Added `progression.level: 'Рівень'` to TRANSLATIONS object
   - Level label displays correctly in Ukrainian

5. **Level Change Animation Preparation**
   - Level change detection implemented using `useRef` and `useEffect`
   - CSS comments added noting animation will be implemented in Story 4.9
   - Structure prepared for pulse/glow animation when level changes

**All acceptance criteria met:**
- ✅ HUD right section displays level and XP progress
- ✅ Level display shows "Рівень {level}" in Ukrainian
- ✅ XP bar shows progress to next level (0-1 fill)
- ✅ XP bar updates smoothly as XP increases
- ✅ Level and XP values update in real-time
- ✅ Component positioned in HUD right section
- ✅ Component reads from ProgressionContext
- ✅ Component styled according to UX design (light text, warm accents)
- ✅ Ukrainian text displays correctly ("Рівень")

**Testing:**
- Component displays correct level from ProgressionContext ✓
- Component displays correct XP progress calculation ✓
- XP bar fill updates smoothly when XP increases ✓
- Component updates when level changes ✓
- Component updates when XP changes ✓
- Ukrainian text displays correctly ("Рівень") ✓
- Component integrates correctly in HUD right section ✓
- HUD layout remains correct with new component ✓

**Code Quality Fix (2025-01-21):**
- Fixed React linting error: Changed ProgressionSystem instantiation from useRef to useMemo
- Resolved "Cannot access refs during render" error by using useMemo hook instead
- All tests pass (49/49) ✓
- Component linting errors resolved ✓

### File List

**Created:**
- `src/components/ui/XPLevelDisplay.tsx` - XP/Level display component
- `src/components/ui/XPLevelDisplay.module.css` - Component stylesheet

**Modified:**
- `src/components/ui/HUD.tsx` - Integrated XPLevelDisplay component
- `src/utils/translations.ts` - Added progression.level translation


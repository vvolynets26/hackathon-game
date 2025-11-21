# Story 4.2: «Світлячки» HUD Display and Ukrainian for Progression

Status: ready-for-dev

## Story

As a player,
I want to see my «Світлячки» count in the HUD,
So that I know how much currency I have.

## Acceptance Criteria

1. **Given** I am playing the game
   **When** the gameplay screen is active
   **Then** HUD right section displays:
   - «Світлячки» display: ✨ icon + "x 5" format
   - Currency count updates in real-time
   - Small animation when currency increases (✨ floats upward, Story 4.9)

2. **Given** the HUD is displayed
   **When** I observe the «Світлячки» display
   **Then** the display:
   - Is positioned in HUD right section (next to level/XP)
   - Reads from ProgressionContext (svitlyachky)
   - Updates when currency changes
   - Styled according to UX design (warm yellow/gold accent color)

3. **Given** all HUD components are displayed
   **When** I view the HUD layout
   **Then** the HUD integration:
   - All HUD components (Timer, Coziness Bar, Level/XP, «Світлячки») are integrated into `HUD.tsx`
   - HUD is positioned at top of screen with 8px padding
   - HUD is always visible during gameplay
   - HUD styled with dark background, light text, warm accents

4. **Given** I am viewing progression elements
   **When** I see progression-related text
   **Then** Ukrainian text for progression elements:
   - Level label: "Рівень" (already added in Story 4.1)
   - XP label: "Досвід" (optional, if shown as text)
   - Currency label: "Світлячки" (if shown as text label)
   - All progression-related text in Ukrainian

## Tasks / Subtasks

- [ ] Task 1: Create «Світлячки» display component (AC: 1, 2)
  - [ ] Create `src/components/ui/SvitlyachkyDisplay.tsx` component
  - [ ] Component reads `svitlyachky` from ProgressionContext using `useProgression()` hook
  - [ ] Display currency count: ✨ icon + "x {count}" format
  - [ ] Component updates reactively when ProgressionContext state changes
  - [ ] Reference ProgressionContext [Source: src/contexts/ProgressionContext.tsx]
  - [ ] Reference UX design "Main Game Screen Layout" [Source: docs/ux-design-specification.md#Main-Game-Screen-Layout]

- [ ] Task 2: Style «Світлячки» display component (AC: 2)
  - [ ] Create `src/components/ui/SvitlyachkyDisplay.module.css` stylesheet
  - [ ] Style currency display: warm yellow/gold accent color (#ffd700 or similar)
  - [ ] Style ✨ icon: appropriate size, positioned next to count
  - [ ] Style count text: light text color (#ffffff), readable font size
  - [ ] Position component for HUD right section integration
  - [ ] Add smooth CSS transitions for currency updates
  - [ ] Prepare for animation when currency increases (Story 4.9)
  - [ ] Reference UX design color system [Source: docs/ux-design-specification.md#Color-System]
  - [ ] Reference UX design typography [Source: docs/ux-design-specification.md#Typography-System]

- [ ] Task 3: Integrate «Світлячки» display into HUD component (AC: 3)
  - [ ] Import SvitlyachkyDisplay component into `src/components/ui/HUD.tsx`
  - [ ] Add SvitlyachkyDisplay to HUD right section (next to XPLevelDisplay)
  - [ ] Verify HUD layout: left (Timer), center (CozinessBar), right (XPLevelDisplay, SvitlyachkyDisplay)
  - [ ] Ensure HUD right section styling accommodates both displays
  - [ ] Test HUD displays correctly during gameplay
  - [ ] Reference HUD component [Source: src/components/ui/HUD.tsx]
  - [ ] Reference HUD layout from UX design [Source: docs/ux-design-specification.md#Main-Game-Screen-Layout]

- [ ] Task 4: Add currency increase animation preparation (AC: 1)
  - [ ] Document currency increase detection (compare previous value to current value)
  - [ ] Prepare CSS class for ✨ float-up animation (to be used in Story 4.9)
  - [ ] Add comment noting animation will be implemented in Story 4.9
  - [ ] Reference Story 4.9 for animation implementation [Source: docs/epics.md#Story-4.9]

- [ ] Task 5: Add Ukrainian text for progression elements (AC: 4)
  - [ ] Add `progression.xp: 'Досвід'` to `src/utils/translations.ts` (optional, if XP label shown)
  - [ ] Add `progression.svitlyachky: 'Світлячки'` to `src/utils/translations.ts` (if currency label shown as text)
  - [ ] Update progression-related components to use Ukrainian translations
  - [ ] Verify all progression text displays correctly in Ukrainian
  - [ ] Reference translations file [Source: src/utils/translations.ts]
  - [ ] Reference PRD localization requirements [Source: docs/prd.md#FR40-FR42]

- [ ] Task 6: Testing and validation (AC: 1, 2, 3, 4)
  - [ ] Test component displays correct currency count from ProgressionContext
  - [ ] Test component updates when currency changes
  - [ ] Test component updates when currency increases (addSvitlyachky called)
  - [ ] Test component integrates correctly in HUD right section
  - [ ] Test HUD layout remains correct with new component
  - [ ] Test Ukrainian text displays correctly (if labels shown)
  - [ ] Test component styled according to UX design (warm yellow/gold accent)
  - [ ] Test currency display format (✨ icon + "x {count}")

## Dev Notes

### Relevant Architecture Patterns and Constraints

**HUD Layout Architecture:**
- HUD component (`src/components/ui/HUD.tsx`) uses three-section layout: left, center, right
- Left section: Timer component (Story 2.13)
- Center section: CozinessBar component (Story 2.14)
- Right section: XPLevelDisplay (Story 4.1) + SvitlyachkyDisplay (this story)
- HUD positioned at top of screen with 8px padding
- HUD styled with dark background, light text, warm accents

**ProgressionContext Integration:**
- ProgressionContext provides `progressionState` with `svitlyachky` property
- Use `useProgression()` hook to access ProgressionContext
- Component should reactively update when ProgressionContext state changes
- Currency value is stored as number (integer count of «Світлячки»)

**Currency Display Format:**
- Display format: ✨ icon + "x {count}" (e.g., "✨ x 5")
- Icon should be Unicode ✨ character or SVG icon
- Count should update smoothly when currency changes
- Warm yellow/gold accent color (#ffd700) to match «Світлячки» theme

**Component Structure:**
- Create new component: `SvitlyachkyDisplay.tsx` in `src/components/ui/`
- Component is presentational (reads from context, displays UI)
- Component uses CSS Modules for styling
- Component follows React best practices (functional component, hooks)

**Styling Guidelines:**
- Warm yellow/gold accent color (#ffd700) for currency display
- Light text color (#ffffff) for readability against dark HUD background
- ✨ icon sized appropriately (not too large, not too small)
- Smooth CSS transitions for currency updates
- Typography: readable font size matching other HUD elements

**Ukrainian Text Integration:**
- All progression-related text should use Ukrainian translations
- Level label "Рівень" already added in Story 4.1
- XP label "Досвід" optional (if shown as text)
- Currency label "Світлячки" optional (if shown as text label, not just icon + count)
- Add translations to `src/utils/translations.ts` in `progression` section

### Project Structure Notes

**Alignment with Unified Project Structure:**
- HUD component at `src/components/ui/HUD.tsx` (already exists, needs integration)
- New component: `src/components/ui/SvitlyachkyDisplay.tsx` (to be created)
- New stylesheet: `src/components/ui/SvitlyachkyDisplay.module.css` (to be created)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (already exists)
- Translations file at `src/utils/translations.ts` (already exists, needs updates)

**Source Tree Components to Touch:**
- `src/components/ui/HUD.tsx` - MODIFY (add SvitlyachkyDisplay to right section)
- `src/components/ui/SvitlyachkyDisplay.tsx` - CREATE (new component)
- `src/components/ui/SvitlyachkyDisplay.module.css` - CREATE (new stylesheet)
- `src/utils/translations.ts` - MODIFY (add progression translations if needed)

**No Conflicts Detected:**
- HUD component already has placeholder comment for «Світлячки» display (Story 4.2)
- ProgressionContext already provides `svitlyachky` in progressionState
- XPLevelDisplay already integrated in HUD right section (Story 4.1)
- HUD right section is ready for «Світлячки» display integration

### Learnings from Previous Story

**From Story 4-1-xp-and-level-hud-display (Status: review)**
- **XPLevelDisplay Component**: XPLevelDisplay component created and integrated in HUD right section [Source: docs/sprint-artifacts/4-1-xp-and-level-hud-display.md]
  - Component reads level and XP from ProgressionContext using `useProgression()` hook
  - Component displays level text in Ukrainian: "Рівень {level}"
  - Component calculates XP progress using `ProgressionSystem.getXPProgress(currentXP, level)`
  - Component updates reactively when ProgressionContext state changes
  - Component uses CSS Modules for styling (`XPLevelDisplay.module.css`)
  - Component positioned in HUD right section
  - Level label translation added: `progression.level: 'Рівень'` in `translations.ts`

- **HUD Integration Pattern**: HUD right section now contains XPLevelDisplay [Source: src/components/ui/HUD.tsx]
  - HUD component structure: left (Timer), center (CozinessBar), right (XPLevelDisplay)
  - Placeholder comment exists for «Світлячки» display: `{/* Currency («Світлячки») display will be added in Story 4.2 */}`
  - HUD right section styling accommodates multiple displays
  - Ready for «Світлячки» display integration

- **Styling Pattern**: XPLevelDisplay uses warm accent colors and light text [Source: src/components/ui/XPLevelDisplay.module.css]
  - Light text color (#ffffff) for readability
  - Warm accent color (#ffd700) for XP bar fill
  - Smooth CSS transitions for value updates
  - CSS Modules for scoped styling
  - Ready for consistent styling with «Світлячки» display

- **ProgressionContext Usage**: ProgressionContext provides full progression state [Source: src/contexts/ProgressionContext.tsx]
  - Use `useProgression()` hook to access `progressionState.svitlyachky`
  - ProgressionContext updates trigger React re-renders automatically
  - ProgressionContext state persists via localStorage (automatic)
  - Ready for «Світлячки» display integration

**Implementation Notes:**
- Create SvitlyachkyDisplay component that reads from ProgressionContext
- Use same pattern as XPLevelDisplay for consistency
- Integrate component into HUD right section next to XPLevelDisplay
- Style component according to UX design (warm yellow/gold accent color)
- Add Ukrainian translations if text labels are shown
- Prepare for currency increase animation (Story 4.9)
- Test component updates reactively when currency changes

### References

- [Source: docs/epics.md#Story-4.2] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Main-Game-Screen-Layout] - HUD layout specifications (FR32, FR16)
- [Source: docs/prd.md#FR16] - «Світлячки» display specification: "The game displays the player's current «Світлячки» count in the HUD"
- [Source: docs/prd.md#FR40-FR42] - Ukrainian localization requirements
- [Source: docs/ux-design-specification.md#Main-Game-Screen-Layout] - HUD layout and styling specifications
- [Source: docs/ux-design-specification.md#Color-System] - Color palette and accent colors
- [Source: docs/ux-design-specification.md#Typography-System] - Typography scale and usage
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/4-1-xp-and-level-hud-display.md] - Previous story learnings and patterns
- [Source: src/components/ui/HUD.tsx] - HUD component structure and integration point
- [Source: src/components/ui/XPLevelDisplay.tsx] - XPLevelDisplay component pattern for consistency
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext for currency access
- [Source: src/utils/translations.ts] - Translations file for Ukrainian text

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List


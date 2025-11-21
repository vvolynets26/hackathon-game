# Story 2.16: Visual Polish for Gameplay

Status: review

## Story

As a player,
I want polished visual effects during gameplay,
So that the experience feels smooth and professional.

## Acceptance Criteria

1. **Given** I am playing the game
   **When** I observe gameplay visuals
   **Then** the following polish is applied:
   - Smooth character movement animations (no jank)
   - Smooth event indicator animations (icon appearance, timer updates)
   - Smooth «Затишок» bar updates (no stuttering)
   - Smooth timer countdown (no frame drops)
   - Consistent visual style (colors, spacing, typography)

2. **Given** the game is running
   **When** I observe performance
   **Then** performance polish:
   - 60 FPS maintained during gameplay
   - No visual glitches or layout issues
   - Smooth CSS transitions and animations
   - GPU-accelerated transforms for movement

3. **Given** I view gameplay elements
   **When** I observe visual consistency
   **Then** visual consistency:
   - All gameplay elements follow "Cozy Blackout" theme
   - Colors match UX design specifications
   - Spacing follows 8px grid system
   - Typography is consistent and readable

## Tasks / Subtasks

- [x] Task 1: Optimize character movement animations (AC: 1)
  - [x] Review `src/components/game/Character.tsx` for movement implementation
  - [x] Ensure movement uses CSS `transform: translate()` for GPU acceleration (not top/left)
  - [x] Verify frame-rate independent movement using delta time
  - [x] Test smooth movement with no jank or stuttering
  - [x] Ensure movement speed is consistent and responsive
  - [x] Reference architecture document for movement patterns [Source: docs/architecture.md#Character-Movement]

- [x] Task 2: Polish event indicator animations (AC: 1)
  - [x] Review `src/components/game/EventIndicator.tsx` for animation implementation
  - [x] Ensure icon appearance uses smooth CSS transitions
  - [x] Verify timer updates animate smoothly (no stuttering)
  - [x] Test event indicator animations at 60 FPS
  - [x] Ensure animations don't cause frame drops
  - [x] Reference UX design for event indicator specifications [Source: docs/ux-design-specification.md#Event-UX]

- [x] Task 3: Optimize «Затишок» bar updates (AC: 1)
  - [x] Review `src/components/ui/CozinessBar.tsx` for update implementation
  - [x] Ensure bar fill updates use CSS transitions (not JavaScript animations)
  - [x] Verify smooth gradient transitions as value changes
  - [x] Test bar updates with no stuttering or visual glitches
  - [x] Ensure updates are frame-rate independent
  - [x] Reference CozinessBar component implementation [Source: src/components/ui/CozinessBar.tsx]

- [x] Task 4: Optimize timer countdown display (AC: 1)
  - [x] Review `src/components/ui/Timer.tsx` for countdown implementation
  - [x] Ensure timer updates smoothly (no frame drops)
  - [x] Verify timer text updates are synchronized with game loop
  - [x] Test timer countdown at 60 FPS
  - [x] Ensure timer doesn't cause performance issues
  - [x] Reference Timer component implementation [Source: src/components/ui/Timer.tsx]

- [x] Task 5: Ensure consistent visual style (AC: 1, 3)
  - [x] Review all gameplay components for color consistency
  - [x] Verify colors match UX design "Cozy Blackout" theme:
    - Background: Dark blues/greys (#1a1f2e, #2d3442, #1e2740)
    - Light sources: Warm yellows/oranges (#f4a460, #ff8c42, #ffd700)
    - UI text: Light colors (#ffffff, #f5f5f5)
    - Accents: Warm yellow (#ffd700) for highlights
  - [x] Verify spacing follows 8px grid system across all components
  - [x] Check typography consistency (system sans-serif, proper type scale)
  - [x] Ensure border-radius is consistent (8px for rounded corners)
  - [x] Reference UX design color system [Source: docs/ux-design-specification.md#Color-System]
  - [x] Reference UX design typography [Source: docs/ux-design-specification.md#Typography-System]
  - [x] Reference UX design spacing [Source: docs/ux-design-specification.md#Spacing-and-Layout]

- [x] Task 6: Performance optimization and testing (AC: 2)
  - [x] Test game performance in Chrome (primary target browser)
  - [x] Verify 60 FPS maintained during gameplay using browser DevTools
  - [x] Check for visual glitches or layout issues
  - [x] Ensure all CSS transitions are GPU-accelerated
  - [x] Verify character movement uses transform (not top/left)
  - [x] Test with multiple simultaneous events to ensure performance
  - [x] Profile performance and optimize any bottlenecks
  - [x] Reference architecture performance considerations [Source: docs/architecture.md#Performance-Considerations]

- [x] Task 7: Visual consistency audit (AC: 3)
  - [x] Audit all gameplay components for "Cozy Blackout" theme compliance
  - [x] Verify colors match UX design specifications exactly
  - [x] Check spacing follows 8px grid system
  - [x] Verify typography is consistent (font family, sizes, weights)
  - [x] Ensure all components use CSS variables for colors (if applicable)
  - [x] Test visual consistency across all gameplay screens
  - [x] Reference UX design visual foundation [Source: docs/ux-design-specification.md#Visual-Foundation]

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Performance Optimization:**
- Use CSS `transform: translate()` for character movement (GPU-accelerated) [Source: docs/architecture.md#Character-Movement]
- Use CSS transitions for animations (not JavaScript) for better performance
- Ensure frame-rate independent updates using delta time
- Target 60 FPS during gameplay [Source: docs/architecture.md#Performance-Considerations]
- Use requestAnimationFrame for game loop (already implemented in Story 2.1)

**Visual Consistency:**
- Follow "Cozy Blackout" theme from UX design specification [Source: docs/ux-design-specification.md#Color-System]
- Use CSS variables for consistent colors across components
- Follow 8px grid system for spacing [Source: docs/ux-design-specification.md#Spacing-and-Layout]
- Use consistent typography system (system sans-serif stack) [Source: docs/ux-design-specification.md#Typography-System]
- Maintain consistent border-radius (8px) for rounded corners

**Component Patterns:**
- Components use CSS Modules for styling [Source: docs/architecture.md#ADR-005]
- Components read from GameContext for state (no local state duplication)
- Smooth transitions use CSS transitions (not JavaScript animations)
- GPU-accelerated transforms for movement and animations

**Polish Strategy:**
- Polish incrementally as features are built (not all at once)
- Focus on smooth animations and consistent visual style
- Test performance in Chrome (primary target browser)
- Ensure no visual glitches or layout issues

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Components remain in existing locations:
  - `src/components/game/Character.tsx` - OPTIMIZE (movement animations)
  - `src/components/game/EventIndicator.tsx` - OPTIMIZE (indicator animations)
  - `src/components/ui/CozinessBar.tsx` - OPTIMIZE (bar updates)
  - `src/components/ui/Timer.tsx` - OPTIMIZE (timer countdown)
- CSS Modules files for styling:
  - `src/components/game/Character.module.css` - OPTIMIZE
  - `src/components/game/EventIndicator.module.css` - OPTIMIZE
  - `src/components/ui/CozinessBar.module.css` - OPTIMIZE
  - `src/components/ui/Timer.module.css` - OPTIMIZE

**Source Tree Components to Touch:**
- `src/components/game/Character.tsx` - OPTIMIZE (ensure GPU-accelerated movement)
- `src/components/game/EventIndicator.tsx` - OPTIMIZE (smooth animations)
- `src/components/ui/CozinessBar.tsx` - OPTIMIZE (smooth bar updates)
- `src/components/ui/Timer.tsx` - OPTIMIZE (smooth countdown)
- CSS Module files for each component - OPTIMIZE (ensure smooth transitions)

**No Conflicts Detected:**
- This story focuses on polish and optimization, not new features
- All components already exist from previous stories
- Changes are performance and visual consistency improvements

### Learnings from Previous Story

**From Story 2-15-ukrainian-text-for-core-gameplay (Status: review)**

- **Translations System**: Centralized translations file at `src/utils/translations.ts` [Source: docs/sprint-artifacts/2-15-ukrainian-text-for-core-gameplay.md]
  - All Ukrainian text stored in translations constants
  - Components import from translations.ts for consistency
  - Pattern established for text management

- **Component Patterns**: Components use CSS Modules for styling [Source: docs/sprint-artifacts/2-15-ukrainian-text-for-core-gameplay.md]
  - Timer component uses CSS Modules (`Timer.module.css`)
  - CozinessBar component uses CSS Modules (`CozinessBar.module.css`)
  - EventIndicator component uses CSS Modules
  - Follows architecture ADR-005: CSS Modules for Styling

- **HUD Integration**: HUD components integrated into Apartment component [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md]
  - HUD rendered in `Apartment.tsx` component
  - HUD always visible during gameplay
  - Three-section layout: Timer (left), CozinessBar (center), empty (right for future XP/Level)

- **GameContext Pattern**: Components read from GameContext via useGame hook [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md]
  - Use `const { gameState } = useGame()` to access game state
  - Component re-renders when context updates
  - No need for local state if reading directly from context

**From Story 2-14-затишок-bar-hud-component (Status: review)**

- **Gradient Implementation**: CozinessBar uses CSS linear-gradient for bar colors [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md]
  - Gradient function maps coziness value (0-100) to gradient colors
  - Three ranges: Low (red → orange), Medium (orange → yellow), High (yellow → green)
  - Smooth transitions using CSS transitions for performance

- **Styling Approach**: CSS Modules used for component styling [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md]
  - Components use CSS Modules for scoped styles
  - Smooth transitions using CSS transitions
  - GPU-accelerated transforms for animations

**Implementation Notes:**
- Focus on optimizing existing components for smooth animations
- Ensure all animations use CSS transitions (not JavaScript)
- Verify GPU acceleration for movement and transforms
- Test performance in Chrome to ensure 60 FPS
- Maintain visual consistency with UX design specifications
- Use CSS variables for colors if not already implemented

[Source: docs/sprint-artifacts/2-15-ukrainian-text-for-core-gameplay.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md#Dev-Agent-Record]

### References

- [Source: docs/epics.md#Story-2.16] - Story acceptance criteria and technical notes
- [Source: docs/ux-design-specification.md#Visual-Foundation] - Color system, typography, spacing specifications
- [Source: docs/ux-design-specification.md#Color-System] - "Cozy Blackout" theme color palette
- [Source: docs/ux-design-specification.md#Typography-System] - Typography specifications
- [Source: docs/ux-design-specification.md#Spacing-and-Layout] - 8px grid system and spacing scale
- [Source: docs/architecture.md#Character-Movement] - Character movement implementation patterns
- [Source: docs/architecture.md#Performance-Considerations] - Performance optimization guidelines
- [Source: docs/architecture.md#ADR-005] - CSS Modules styling approach
- [Source: src/components/game/Character.tsx] - Character component to optimize
- [Source: src/components/game/EventIndicator.tsx] - EventIndicator component to optimize
- [Source: src/components/ui/CozinessBar.tsx] - CozinessBar component to optimize
- [Source: src/components/ui/Timer.tsx] - Timer component to optimize
- [Source: docs/sprint-artifacts/2-15-ukrainian-text-for-core-gameplay.md] - Previous story learnings
- [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md] - Previous story learnings

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/2-16-visual-polish-for-gameplay.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

**Implementation Summary (2025-01-21):**
- ✅ Optimized character movement animations with GPU-accelerated transforms (`translate3d` instead of `translate`)
- ✅ Enhanced all CSS animations with `will-change`, `translateZ(0)`, and `backface-visibility: hidden` for GPU acceleration
- ✅ Polished event indicator animations with smooth CSS transitions and GPU acceleration
- ✅ Optimized «Затишок» bar updates with smooth CSS transitions for width and background changes
- ✅ Optimized timer countdown display with GPU-accelerated transitions
- ✅ Ensured consistent visual style across all components:
  - Updated root font-family to system sans-serif stack from UX design specification
  - Updated border-radius values to 8px (0.5rem) for UI elements
  - Verified colors match "Cozy Blackout" theme specifications
  - Verified spacing follows 8px grid system
  - Verified typography uses correct font sizes from UX design specification
- ✅ Fixed React linting errors (refs accessed during render - now using state/useMemo)
- ✅ All components use GPU-accelerated transforms for smooth 60 FPS performance
- ✅ Performance optimizations verified: all animations use CSS transitions, transforms are GPU-accelerated

### File List

**Modified Files:**
- `src/components/game/Character.tsx` - Optimized movement with GPU-accelerated transform, fixed ref access during render
- `src/components/game/Character.module.css` - Enhanced animations with GPU acceleration hints
- `src/components/game/EventIndicator.tsx` - Optimized positioning with GPU-accelerated transform, fixed ref access during render
- `src/components/game/EventIndicator.module.css` - Enhanced animations with GPU acceleration hints
- `src/components/ui/CozinessBar.module.css` - Optimized bar updates with GPU acceleration hints
- `src/components/ui/Timer.module.css` - Optimized timer display with GPU acceleration hints
- `src/components/ui/HUD.module.css` - Updated spacing and color comments for UX design compliance
- `src/index.css` - Updated root font-family to system sans-serif stack, updated background color to match UX design

## Change Log

- 2025-01-21: Story created by create-story workflow
- 2025-01-21: Story implementation complete - all tasks completed, optimized animations, ensured visual consistency, marked as review


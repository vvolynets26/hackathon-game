# Story 2.2: Apartment Layout and Background with Ukrainian Cozy Details

Status: drafted

## Story

As a player,
I want to see an apartment layout with authentic Ukrainian cozy details,
so that I have a visually warm, culturally authentic game space to play in.

## Acceptance Criteria

1. **Given** the game is running
   **When** I view the gameplay screen
   **Then** `Apartment.tsx` component displays:
   - Apartment background with dark blues/greys (night, blackout atmosphere)
   - Simple 2D layout (single screen or 2-3 rooms)
   - Furniture and objects positioned in the apartment
   - Visual style matches "Cozy Blackout" theme
   - **MVP Ukrainian cozy details** (3-4 items for cultural authenticity):
     - **Гном з JYSK (JYSK Gnome)**: Small figure on shelf with subtle glow or idle wiggle animation
     - **Килим на стіні / етно-постер**: Carpet on wall or ethno-poster behind sofa/bed with folk pattern
     - **Плед в клітинку на дивані**: Plaid blanket on sofa with warm tones (red/brown/beige)

2. **Given** the apartment layout is rendered
   **When** I view the gameplay area
   **Then** apartment layout:
   - Defines boundaries for character movement (character cannot move outside play area)
   - Provides locations for event objects (phone, kettle, cat, candle positions)
   - Uses simple shapes or sprites (no complex pixel art)
   - Styled with CSS (dark background, warm light sources)
   - Cozy details are decorative (except blanket which may be interactive in Story 2.6)

3. **Given** cozy details are implemented
   **When** I view the apartment
   **Then** cozy details:
   - Simple CSS-styled elements or basic sprites
   - Subtle animations (gnome wiggle, optional parallax) use CSS animations
   - Performance-friendly (no heavy assets)
   - Visible but not distracting from gameplay
   - Adds cultural authenticity without complexity

4. **Given** the apartment component is created
   **When** the game renders
   **Then** apartment is:
   - Rendered as game container/background
   - Sized appropriately for gameplay area
   - Ready for character and event positioning (Story 2.3, 2.4)
   - Culturally authentic with Ukrainian cozy elements

## Tasks / Subtasks

- [ ] Task 1: Create Apartment component structure (AC: 1, 4)
  - [ ] Create `src/components/game/Apartment.tsx` file
  - [ ] Set up component with TypeScript types
  - [ ] Create CSS module file `src/components/game/Apartment.module.css`
  - [ ] Follow component naming conventions [Source: docs/architecture.md#Naming-Conventions]

- [ ] Task 2: Implement apartment background and layout (AC: 1, 2)
  - [ ] Create dark background with "Cozy Blackout" theme colors (dark blues/greys: #1a1f2e, #2d3442, #1e2740) [Source: docs/ux-design-specification.md#Color-System]
  - [ ] Design simple 2D layout (single screen or 2-3 rooms)
  - [ ] Position furniture and objects in apartment
  - [ ] Define apartment boundaries (for character movement constraints in Story 2.3)
  - [ ] Set up event object locations (phone, kettle, cat, candle positions) for Story 2.4
  - [ ] Use CSS for styling (no complex pixel art)

- [ ] Task 3: Implement Ukrainian cozy details (AC: 1, 3)
  - [ ] **Гном з JYSK**: Create small figure on shelf
    - [ ] Position in living room or near TV
    - [ ] Style with long шапка (hat), beard, tiny nose
    - [ ] Add subtle glow or tiny idle "wiggle" animation (CSS animation, every few seconds)
    - [ ] Pure charm element - zero gameplay impact
  - [ ] **Килим на стіні / етно-постер**: Create carpet on wall or ethno-poster
    - [ ] Position behind sofa or bed
    - [ ] Style with simple folk-ish pattern or geometric орнамент (без політики)
    - [ ] Optional: Add subtle texture or parallax effect when character passes nearby (very minor)
  - [ ] **Плед в клітинку на дивані**: Create plaid blanket on sofa
    - [ ] Drape over sofa in living room
    - [ ] Style as soft rectangular shape with plaid pattern (simple stripes)
    - [ ] Use warm tones: червоний / коричневий / беж (red / brown / beige)
    - [ ] Prepare for optional micro-interaction in Story 2.6 (Minor event "Принести плед")

- [ ] Task 4: Implement CSS animations for cozy details (AC: 3)
  - [ ] Create gnome wiggle animation (CSS keyframes, subtle movement)
  - [ ] Add optional parallax effect for килим (very subtle, only if performance allows)
  - [ ] Ensure animations are performance-friendly (CSS animations, not JavaScript)
  - [ ] Test animations don't cause frame drops (maintain 60 FPS)

- [ ] Task 5: Define apartment boundaries and event locations (AC: 2, 4)
  - [ ] Create apartment boundary constants or configuration
  - [ ] Define event object positions (phone, kettle, cat, candle) as coordinates
  - [ ] Export boundary and location data for use in Story 2.3 (character movement) and Story 2.4 (event spawning)
  - [ ] Ensure boundaries are clear and match apartment visual layout

- [ ] Task 6: Integration and testing (AC: 1, 2, 3, 4)
  - [ ] Verify apartment renders correctly in game container
  - [ ] Test apartment boundaries are properly defined
  - [ ] Verify cozy details are visible but not distracting
  - [ ] Test CSS animations perform well (no frame drops)
  - [ ] Verify apartment is ready for character positioning (Story 2.3)
  - [ ] Verify event locations are accessible for event system (Story 2.4)

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Component Pattern:**
- Create `Apartment.tsx` in `src/components/game/` directory [Source: docs/architecture.md#Project-Structure]
- Use CSS Modules for styling: `Apartment.module.css` [Source: docs/architecture.md#Structure-Patterns]
- Follow PascalCase naming for component: `Apartment` [Source: docs/architecture.md#Naming-Conventions]
- Component should be a functional React component with TypeScript types

**Styling Pattern:**
- Use CSS for all styling (dark blues/greys background, warm accents) [Source: docs/ux-design-specification.md#Color-System]
- Follow "Cozy Blackout" theme colors from UX design specification
- Use CSS animations for subtle effects (gnome wiggle, optional parallax)
- Keep styling simple for hackathon scope (CSS shapes, no complex pixel art)

**Performance Considerations:**
- Use CSS animations (not JavaScript) for performance [Source: docs/architecture.md#Performance-Considerations]
- Ensure animations don't cause frame drops (maintain 60 FPS)
- Keep assets lightweight (no heavy images, use CSS shapes)
- Test performance in Chrome (primary target browser)

**Integration Points:**
- Apartment boundaries will be used by Character component (Story 2.3) for movement constraints
- Event locations will be used by EventManager (Story 2.4) for event spawning
- Apartment serves as game container/background for all gameplay elements

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Component file: `src/components/game/Apartment.tsx` (matches architecture document)
- CSS module: `src/components/game/Apartment.module.css` (matches structure patterns)
- Directory structure: `src/components/game/` already exists (created in Story 1.1 setup)

**Source Tree Components to Touch:**
- `src/components/game/Apartment.tsx` - NEW file (apartment layout component)
- `src/components/game/Apartment.module.css` - NEW file (apartment styling)
- `src/utils/constants.ts` - MODIFIED (add apartment boundaries and event locations if needed, or create separate config)

**No Conflicts Detected:**
- Game component directory already exists from Story 1.1 setup
- CSS Modules pattern established in architecture
- Component structure follows established patterns

### Learnings from Previous Story

**From Story 2-1-game-state-management-and-game-loop (Status: done)**

- **Game Loop Available**: `useGameLoop` hook is available at `src/hooks/useGameLoop.ts` [Source: docs/sprint-artifacts/2-1-game-state-management-and-game-loop.md]
  - Game loop runs at 60 FPS using `requestAnimationFrame`
  - Delta time calculation ensures frame-independent updates
  - Page Visibility API pauses/resumes game when tab inactive/active
  - Game loop updates GameContext state every frame

- **GameContext Integration**: GameContext is available at `src/contexts/GameContext.tsx` with all update functions
  - Apartment component can read game state if needed (e.g., for dynamic lighting based on events)
  - Game state structure matches GameState interface from `src/types/game.ts`

- **Performance Pattern**: Story 2.1 established 60 FPS performance requirement
  - All animations must maintain smooth frame rates
  - Use CSS animations (not JavaScript) for performance
  - Test animations don't cause frame drops

- **Implementation Note**: Apartment component is visual-only in this story
  - No game state updates needed (that's handled by game loop)
  - Apartment provides visual context and defines boundaries/locations
  - Character movement (Story 2.3) will use apartment boundaries
  - Event spawning (Story 2.4) will use event locations defined here

**From Story 1-5-game-constants-and-configuration (Status: done)**

- **Constants Available**: Game mechanics constants are available in `src/utils/constants.ts`
  - Can add apartment-specific constants if needed (boundaries, event locations)
  - Follow existing constant naming patterns
  - Export constants for use in other components

**Implementation Notes:**
- Apartment layout is the visual foundation for all gameplay
- This story establishes the game space where all events and character movement will occur
- Cozy details add cultural authenticity without gameplay complexity
- Prepare for character positioning in Story 2.3
- Prepare for event system integration in Story 2.4

[Source: docs/sprint-artifacts/2-1-game-state-management-and-game-loop.md#Dev-Agent-Record]
[Source: docs/sprint-artifacts/1-5-game-constants-and-configuration.md]

### References

- [Source: docs/epics.md#Story-2.2] - Story acceptance criteria and technical notes
- [Source: docs/ux-design-specification.md#Visual-Foundation] - Color system, typography, and visual design specifications
- [Source: docs/ux-design-specification.md#Color-System] - "Cozy Blackout" theme colors (dark blues/greys, warm yellows/oranges)
- [Source: docs/architecture.md#Naming-Conventions] - Component naming patterns (PascalCase)
- [Source: docs/architecture.md#Structure-Patterns] - CSS Modules pattern and component organization
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/architecture.md#Performance-Considerations] - 60 FPS performance requirements
- [Source: docs/prd.md#Product-Scope] - MVP apartment layout specifications (single screen or 2-3 rooms)
- [Source: docs/sprint-artifacts/2-1-game-state-management-and-game-loop.md] - Game loop implementation and patterns

## Dev Agent Record

### Context Reference

- `docs/sprint-artifacts/2-2-apartment-layout-and-background-with-ukrainian-cozy-details.context.xml` - Story context XML with implementation guidance, constraints, and artifacts

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log

- 2025-01-21: Story created and drafted by create-story workflow


# Story 4.7: Cosmetic Item Display

Status: review

## Story

As a player,
I want to see my equipped cosmetic items (character skin, cat, candle) in the game,
So that my purchases have visible impact.

## Acceptance Criteria

1. **Given** I have equipped cosmetic items
   **When** I am playing the game
   **Then** equipped items are visible:
   - Character skin: Character appearance changes based on equipped skin
   - Cat: Cat appears in apartment with equipped cat variant (if applicable)
   - Candle: Candle appearance changes based on equipped candle variant (if applicable)

2. **Given** I have equipped cosmetic items
   **When** the game loads
   **Then** cosmetic items:
   - Are loaded from localStorage on game start
   - Are applied to character/apartment components
   - Persist across sessions
   - Default to base appearance if no item equipped

3. **Given** I am viewing cosmetic items in the game
   **When** I observe the cosmetic display
   **Then** cosmetic display:
   - Items are visually distinct (different colors, styles, or sprites)
   - Items do not affect gameplay (purely cosmetic)
   - Items match shop preview images (consistency)

## Tasks / Subtasks

- [x] Task 1: Read equipped items from ProgressionContext in Character component (AC: 1, 2)
  - [x] Modify `src/components/game/Character.tsx` to read `progressionState.equippedItems.characterSkin` from ProgressionContext
  - [x] Use `useProgression()` hook to access progression state
  - [x] Store equipped skin ID in component state or use directly in render
  - [x] Reference ProgressionContext [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference equippedItems type [Source: src/types/progression.ts]

- [x] Task 2: Apply character skin visual styling (AC: 1, 3)
  - [x] Create CSS classes for different character skins in `src/components/game/Character.module.css`
  - [x] For `skin-cozy-sweater`: Add distinct visual styling (e.g., different color, pattern, or CSS class)
  - [x] Apply skin CSS class conditionally based on `equippedItems.characterSkin`
  - [x] Default to base appearance if no skin equipped
  - [x] Ensure skin is visually distinct from base character
  - [x] Reference SHOP_ITEMS constant for skin IDs [Source: src/utils/constants.ts]
  - [x] Reference Character component structure [Source: src/components/game/Character.tsx]

- [x] Task 3: Read equipped cat/candle items in Apartment component (AC: 1, 2)
  - [x] Modify `src/components/game/Apartment.tsx` to read `progressionState.equippedItems.cat` and `progressionState.equippedItems.candle` from ProgressionContext
  - [x] Use `useProgression()` hook to access progression state
  - [x] Store equipped cat/candle IDs in component state or use directly in render
  - [x] Reference ProgressionContext [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference equippedItems type [Source: src/types/progression.ts]

- [x] Task 4: Display equipped cat in apartment (AC: 1, 3)
  - [x] Add cat visual element to `src/components/game/Apartment.tsx` (if not already present)
  - [x] Position cat in apartment layout (e.g., on sofa, near furniture)
  - [x] Create CSS classes for different cat variants in `src/components/game/Apartment.module.css`
  - [x] For `cat-ginger`: Add distinct visual styling (e.g., different color, pattern, or CSS class)
  - [x] Apply cat CSS class conditionally based on `equippedItems.cat`
  - [x] Default to base cat appearance if no cat equipped (or hide if no base cat)
  - [x] Ensure cat is visually distinct and matches shop preview
  - [x] Reference SHOP_ITEMS constant for cat IDs [Source: src/utils/constants.ts]
  - [x] Reference Apartment component structure [Source: src/components/game/Apartment.tsx]

- [x] Task 5: Display equipped candle in apartment (AC: 1, 3)
  - [x] Add candle visual element to `src/components/game/Apartment.tsx` (if not already present)
  - [x] Position candle in apartment layout (e.g., on table, shelf)
  - [x] Create CSS classes for different candle variants in `src/components/game/Apartment.module.css`
  - [x] For candle cosmetic items: Add distinct visual styling (e.g., different color, glow, or CSS class)
  - [x] Apply candle CSS class conditionally based on `equippedItems.candle`
  - [x] Default to base candle appearance if no candle equipped (or hide if no base candle)
  - [x] Ensure candle is visually distinct and matches shop preview
  - [x] Reference SHOP_ITEMS constant for candle IDs [Source: src/utils/constants.ts]
  - [x] Reference Apartment component structure [Source: src/components/game/Apartment.tsx]

- [x] Task 6: Ensure cosmetic items persist across sessions (AC: 2)
  - [x] Verify ProgressionContext loads equippedItems from localStorage on mount
  - [x] Verify equippedItems are saved to localStorage when changed (via equipItem/unequipItem)
  - [x] Test cosmetic items persist after page refresh
  - [x] Test cosmetic items persist after closing and reopening game
  - [x] Reference localStorage utilities [Source: src/utils/localStorage.ts]
  - [x] Reference ProgressionContext persistence [Source: src/contexts/ProgressionContext.tsx]

- [x] Task 7: Ensure cosmetic items default to base appearance (AC: 2)
  - [x] Verify Character component shows base appearance when `equippedItems.characterSkin` is undefined
  - [x] Verify Apartment component shows base cat/candle (or hides) when `equippedItems.cat`/`equippedItems.candle` is undefined
  - [x] Test cosmetic items default correctly on first play (no items equipped)
  - [x] Test cosmetic items default correctly after unequipping
  - [x] Reference default appearance handling in components

- [x] Task 8: Ensure cosmetic items are purely cosmetic (AC: 3)
  - [x] Verify character skins do not affect movement speed or gameplay mechanics
  - [x] Verify cat/candle cosmetics do not affect event spawning or interactions
  - [x] Verify cosmetic items only change visual appearance
  - [x] Test gameplay mechanics unchanged with different cosmetic items equipped
  - [x] Reference gameplay mechanics separation from cosmetics

- [x] Task 9: Ensure cosmetic items match shop preview (AC: 3)
  - [x] Verify character skin in game matches shop preview image/description
  - [x] Verify cat/candle in game matches shop preview image/description
  - [x] Ensure visual consistency between shop and gameplay
  - [x] Test cosmetic items are recognizable from shop to game
  - [x] Reference shop preview implementation [Source: src/components/ui/Shop.tsx]

- [x] Task 10: Testing and validation (AC: 1, 2, 3)
  - [x] Test character skin displays correctly when equipped
  - [x] Test character skin defaults to base when not equipped
  - [x] Test cat displays correctly when equipped
  - [x] Test candle displays correctly when equipped
  - [x] Test cosmetic items persist across sessions
  - [x] Test cosmetic items default correctly on first play
  - [x] Test cosmetic items do not affect gameplay
  - [x] Test cosmetic items match shop preview
  - [x] Test multiple cosmetic items can be equipped simultaneously
  - [x] Test unequipping cosmetic items works correctly

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Cosmetic Item Display Architecture:**
- Cosmetic items are purely visual and do not affect gameplay mechanics
- Character component reads equippedItems.characterSkin from ProgressionContext
- Apartment component reads equippedItems.cat and equippedItems.candle from ProgressionContext
- Cosmetic items are applied via CSS classes for simple hackathon implementation
- Cosmetic items persist via localStorage (automatic via ProgressionContext)
- Cosmetic items default to base appearance when not equipped

**ProgressionContext Integration:**
- ProgressionContext provides `progressionState.equippedItems` with structure:
  - `equippedItems.characterSkin?: string` - Equipped character skin ID
  - `equippedItems.cat?: string` - Equipped cat cosmetic ID
  - `equippedItems.candle?: string` - Equipped candle cosmetic ID
- Use `useProgression()` hook to access ProgressionContext
- Equipped items are loaded from localStorage on game start (automatic via ProgressionContext)
- Equipped items are saved to localStorage when changed via equipItem/unequipItem (automatic via ProgressionContext)

**Shop Items (from constants.ts):**
- `skin-cozy-sweater`: Cosmetic character skin, 3 «Світлячки»
- `cat-ginger`: Cosmetic cat, 4 «Світлячки»
- Candle cosmetic items may be added in future (currently cat-ginger may serve dual purpose or candle items may be added)
- Items have: id, name, price, type (cosmetic/buff), description

**Character Skin Implementation:**
- Character component already has visual structure (body, arms, legs, eyes)
- Apply CSS classes conditionally based on `equippedItems.characterSkin`
- For `skin-cozy-sweater`: Add distinct styling (e.g., different body color, sweater pattern via CSS)
- Default to base appearance when no skin equipped
- Skin should be visually distinct but maintain character silhouette

**Cat/Candle Cosmetic Implementation:**
- Apartment component displays apartment layout and background
- Add cat/candle visual elements to apartment layout
- Apply CSS classes conditionally based on `equippedItems.cat` and `equippedItems.candle`
- For `cat-ginger`: Add distinct styling (e.g., different color, pattern via CSS)
- Default to base appearance (or hide) when not equipped
- Cat/candle should be positioned appropriately in apartment layout

**Styling Guidelines:**
- Use CSS classes for cosmetic variants (simple for hackathon scope)
- Cosmetic items can use CSS colors, patterns, or basic sprites
- Ensure cosmetic items are visually distinct from base appearance
- Maintain visual consistency with "Cozy Blackout" theme
- Cosmetic items should be subtle but noticeable
- Match shop preview styling for consistency

**Persistence:**
- Equipped items are automatically saved to localStorage via ProgressionContext
- Equipped items are automatically loaded from localStorage on game start
- No additional persistence logic needed (handled by ProgressionContext)

**Gameplay Separation:**
- Cosmetic items are purely visual and do not affect:
  - Character movement speed
  - Event spawning or interactions
  - Game mechanics or scoring
  - Progression or achievements
- Only visual appearance changes

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Character component at `src/components/game/Character.tsx` (MODIFY - add skin display)
- Character stylesheet at `src/components/game/Character.module.css` (MODIFY - add skin CSS classes)
- Apartment component at `src/components/game/Apartment.tsx` (MODIFY - add cat/candle display)
- Apartment stylesheet at `src/components/game/Apartment.module.css` (MODIFY - add cat/candle CSS classes)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (READ - access equippedItems)
- SHOP_ITEMS constant at `src/utils/constants.ts` (READ - get cosmetic item IDs)

**Source Tree Components to Touch:**
- `src/components/game/Character.tsx` - MODIFY (read equippedItems.characterSkin, apply skin CSS class)
- `src/components/game/Character.module.css` - MODIFY (add skin CSS classes)
- `src/components/game/Apartment.tsx` - MODIFY (read equippedItems.cat/candle, display cat/candle)
- `src/components/game/Apartment.module.css` - MODIFY (add cat/candle CSS classes)
- `src/contexts/ProgressionContext.tsx` - READ (access progressionState.equippedItems)
- `src/utils/constants.ts` - READ (SHOP_ITEMS constant for cosmetic item IDs)

**No Conflicts Detected:**
- Character component already has comment about "Support for equipped skins (Story 4.5)" - ready for implementation
- ProgressionContext already provides equippedItems structure and equipItem/unequipItem methods (Story 3.4)
- Shop system already implements equip functionality (Story 4.4)
- Apartment component already exists and can be extended with cat/candle display

### Learnings from Previous Story

**From Story 3-4-shop-system (Status: done)**
- **Shop System Backend**: Shop system backend fully implemented [Source: docs/sprint-artifacts/3-4-shop-system.md]
  - ProgressionContext.equipItem(slot, itemId) validates purchase, adds to equippedItems
  - ProgressionContext.unequipItem(slot) removes item from equippedItems
  - Equipped items persist via localStorage (automatic via ProgressionContext)
  - Ready for cosmetic item display integration

- **Shop Items**: SHOP_ITEMS constant defined with cosmetic items [Source: src/utils/constants.ts]
  - `skin-cozy-sweater`: Cosmetic character skin, 3 «Світлячки»
  - `cat-ginger`: Cosmetic cat, 4 «Світлячки»
  - Items have: id, name, price, type (cosmetic), description
  - Ready for cosmetic item display

**From Story 4-4-shop-screen (Status: done)**
- **Shop UI**: Shop screen fully implemented [Source: docs/sprint-artifacts/4-4-shop-screen.md]
  - Shop screen allows players to equip cosmetic items via "Обрати" button
  - Equipped items show "Використовується" state in shop
  - Shop UI prepares for cosmetic item display in game (Story 4.7)
  - Ready for cosmetic item display integration

**From Story 2-3-character-visual-and-movement-system (Status: done)**
- **Character Component**: Character component fully implemented [Source: src/components/game/Character.tsx]
  - Character component has visual structure (body, arms, legs, eyes)
  - Character component already has comment about "Support for equipped skins (Story 4.5)"
  - Character component uses CSS Modules for styling
  - Character component reads from ProgressionContext for level bonuses
  - Ready for cosmetic skin display integration

**From Story 2-2-apartment-layout-and-background (Status: done)**
- **Apartment Component**: Apartment component fully implemented [Source: src/components/game/Apartment.tsx]
  - Apartment component displays apartment layout and background
  - Apartment component has Ukrainian cozy details (Гном з JYSK, Килим на стіні, Плед в клітинку)
  - Apartment component uses CSS Modules for styling
  - Apartment component can be extended with cat/candle cosmetic display
  - Ready for cosmetic cat/candle display integration

**Implementation Notes:**
- Read equippedItems from ProgressionContext in Character and Apartment components
- Apply CSS classes conditionally based on equipped item IDs
- Create distinct visual styling for each cosmetic variant
- Ensure cosmetic items default to base appearance when not equipped
- Verify cosmetic items persist across sessions
- Test cosmetic items do not affect gameplay
- Ensure cosmetic items match shop preview

### References

- [Source: docs/epics.md#Story-4.7] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#FR19] - Cosmetic item requirement: "Players can equip purchased items (character skins, cosmetic items) to customize their appearance"
- [Source: docs/prd.md#FR45] - Persistence requirement: "The game persists the player's selected character skin and equipped items"
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/3-4-shop-system.md] - Shop system backend implementation
- [Source: docs/sprint-artifacts/4-4-shop-screen.md] - Shop screen UI implementation
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext for equippedItems access
- [Source: src/components/game/Character.tsx] - Character component for skin display
- [Source: src/components/game/Apartment.tsx] - Apartment component for cat/candle display
- [Source: src/utils/constants.ts] - SHOP_ITEMS constant for cosmetic item IDs
- [Source: src/types/progression.ts] - ProgressionState and EquippedItems type definitions

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

**Implementation Summary:**
- Character component reads `progressionState.equippedItems.characterSkin` and applies CSS class conditionally
- Character skin `skin-cozy-sweater` has distinct warm beige sweater styling with subtle pattern
- Apartment component conditionally renders cat and candle based on equipped items
- Cat `cat-ginger` displays on sofa with orange/ginger coloring and cat ears
- Candle displays on shelf with animated flame effect
- All cosmetic items default to base appearance (or hidden) when not equipped
- Cosmetic items are purely visual - no gameplay impact
- Persistence handled automatically by ProgressionContext via localStorage
- All acceptance criteria validated and met

### File List

**Created:**
- (No new files - modifications only)

**Modified:**
- `src/components/game/Character.tsx` - Added cosmetic skin display (reads from ProgressionContext, applies CSS class)
- `src/components/game/Character.module.css` - Added `skin-cozy-sweater` CSS class with distinct styling
- `src/components/game/Apartment.tsx` - Added cosmetic cat/candle display (reads from ProgressionContext, conditional rendering)
- `src/components/game/Apartment.module.css` - Added `cosmeticCat`, `cat-ginger`, `cosmeticCandle` CSS classes with styling and animations

### Change Log

**2025-01-21 - Story 4.7 Created:**
- Story file created with full acceptance criteria and tasks
- Story marked as "drafted" in sprint-status.yaml
- Ready for story-ready workflow to create implementation context

**2025-01-21 - Story 4.7 Implementation Complete:**
- Character component now reads equipped skin from ProgressionContext
- Character skin CSS styling added for `skin-cozy-sweater` variant
- Apartment component now reads equipped cat/candle from ProgressionContext
- Cat cosmetic display added with `cat-ginger` variant styling
- Candle cosmetic display added with animated flame effect
- All cosmetic items default to base appearance when not equipped
- Cosmetic items are purely visual and do not affect gameplay
- Persistence handled automatically by ProgressionContext (localStorage)
- All acceptance criteria met


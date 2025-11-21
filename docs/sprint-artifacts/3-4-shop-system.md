# Story 3.4: Shop System

Status: in-progress

## Story

As a player,
I want to browse and purchase items in a shop using «Світлячки»,
So that I can customize my character and unlock gameplay buffs.

## Acceptance Criteria

1. **Given** I have «Світлячки» currency
   **When** I open the shop screen
   **Then** I see a shop UI (Story 4.4) displaying:
   - Grid/list of 3 shop items:
     1. Cosmetic character skin - 3 «Світлячки»
     2. Cosmetic cat/candle - 4 «Світлячки»
     3. Gameplay buff (e.g., +5% speed or +5 starting «Затишок») - 5 «Світлячки»
   - Each item shows: icon, name, price, purchase state (Locked/Purchased/Equipped)
   - My current «Світлячки» count is displayed

2. **Given** I am viewing a shop item
   **When** I click an item
   **Then** item details are shown (right panel or modal):
   - Big icon/preview
   - Name and description
   - Effect description (if gameplay buff)
   - Purchase button (if not owned and enough currency)
   - Equip button (if owned but not equipped)
   - "Використовується" state (if currently equipped)

3. **Given** I have enough «Світлячки» currency
   **When** I purchase an item
   **Then** the purchase is processed:
   - Currency is deducted (validates I have enough)
   - Item is added to purchasedItems array
   - Purchase is saved to localStorage
   - UI updates to show "Purchased" state
   - Currency counter animates (7 → 4)

4. **Given** I have purchased a cosmetic item
   **When** I equip a cosmetic item
   **Then** the item is equipped:
   - Item is added to equippedItems object
   - Equipped state is saved to localStorage
   - Item appears in game (character skin, cat, candle - Story 4.7)
   - UI updates to show "Використовується" state

5. **Given** I purchase a gameplay buff
   **When** the buff is purchased
   **Then** the buff effect is applied:
   - Buff effect is automatically applied (no equip needed)
   - Buff persists across sessions (saved to localStorage)
   - Buff stacks with level bonuses (Story 3.3)

## Tasks / Subtasks

- [x] Task 1: Add shop purchase method to ProgressionContext (AC: 3, 5)
  - [x] Modify `purchaseItem` method to validate currency before purchase
  - [x] Add currency deduction logic: `svitlyachky -= item.price`
  - [x] Add item ID to purchasedItems array if not already present
  - [x] Save updated progression state to localStorage (automatic via ProgressionContext)
  - [x] Return success/failure status for UI feedback
  - [x] Reference ProgressionContext.purchaseItem [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference SHOP_ITEMS constant for item prices [Source: src/utils/constants.ts]
  - [x] Reference PRD FR17, FR18 for shop specifications [Source: docs/prd.md#Progression-&-Economy]

- [x] Task 2: Add shop buff application logic (AC: 5)
  - [x] Create helper function to get purchased buff items: `getPurchasedBuffs(purchasedItems: string[]): ShopItem[]`
  - [x] Create helper function to calculate buff effects: `getBuffEffect(itemId: string): { type: string, value: number }`
  - [x] Integrate buff effects into level bonus helper functions (Story 3.3)
  - [x] Update `getMovementSpeedWithBonuses` to accept shop buff parameter
  - [x] Update `getStartingCozinessWithBonuses` to accept shop buff parameter
  - [x] Update `getCozinessDecayRateWithBonuses` to accept shop buff parameter
  - [x] Buffs stack additively with level bonuses (documented in Story 3.3)
  - [x] Reference level bonus helper functions [Source: src/utils/constants.ts]
  - [x] Reference Story 3.3 for buff stacking strategy [Source: docs/sprint-artifacts/3-3-level-up-bonuses.md]

- [x] Task 3: Integrate shop buffs into game systems (AC: 5)
  - [x] Modify Character component to read purchased buffs from ProgressionContext
  - [x] Apply movement speed buff in Character component movement calculation
  - [x] Modify useGameLoop to read purchased buffs from ProgressionContext
  - [x] Apply starting coziness buff in game initialization
  - [x] Apply coziness decay buff in coziness decay calculation
  - [x] Verify buffs persist across sessions (via ProgressionContext)
  - [x] Reference Character component [Source: src/components/game/Character.tsx]
  - [x] Reference useGameLoop hook [Source: src/hooks/useGameLoop.ts]
  - [x] Reference ProgressionContext for buff access [Source: src/contexts/ProgressionContext.tsx]

- [x] Task 4: Add shop item state helpers (AC: 1, 2, 4)
  - [x] Create helper function: `isItemPurchased(itemId: string, purchasedItems: string[]): boolean`
  - [x] Create helper function: `isItemEquipped(itemId: string, equippedItems: EquippedItems): boolean`
  - [x] Create helper function: `getItemState(itemId: string, progressionState: ProgressionState): 'locked' | 'purchased' | 'equipped'`
  - [x] Create helper function: `canAffordItem(itemId: string, svitlyachky: number): boolean`
  - [x] Helper functions use SHOP_ITEMS constant for item data
  - [x] Helper functions use ProgressionState for purchase/equip state
  - [x] Reference SHOP_ITEMS constant [Source: src/utils/constants.ts]
  - [x] Reference ProgressionState type [Source: src/types/progression.ts]

- [x] Task 5: Update ProgressionContext equipItem method for shop integration (AC: 4)
  - [x] Verify `equipItem` method validates item is purchased before equipping
  - [x] Verify `equipItem` method saves equipped state to localStorage (automatic via ProgressionContext)
  - [x] Verify `equipItem` method handles all cosmetic slots (characterSkin, cat, candle)
  - [x] Add validation: item must be in purchasedItems array
  - [x] Add validation: item must be cosmetic type (not buff)
  - [x] Reference ProgressionContext.equipItem [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference EquippedItems type [Source: src/types/progression.ts]

- [x] Task 6: Prepare shop UI integration points (AC: 1, 2, 3, 4)
  - [x] Document shop UI component requirements (Story 4.4)
  - [x] Document shop item display format (icon, name, price, state)
  - [x] Document purchase flow (click → validate → purchase → update UI)
  - [x] Document equip flow (click → equip → update UI → apply to game)
  - [x] Document currency display format (✨ x N)
  - [x] Reference Story 4.4 for shop UI implementation [Source: docs/epics.md#Story-4.4]

- [ ] Task 7: Testing and validation (AC: 1, 2, 3, 4, 5)
  - [ ] Test purchase: insufficient currency (should fail gracefully)
  - [ ] Test purchase: sufficient currency (should deduct currency, add to purchasedItems)
  - [ ] Test purchase: duplicate purchase (should not add duplicate item ID)
  - [ ] Test equip: purchased cosmetic item (should add to equippedItems)
  - [ ] Test equip: unpurchased item (should fail gracefully)
  - [ ] Test buff: gameplay buff purchase (should apply effect automatically)
  - [ ] Test buff stacking: level bonus + shop buff (should stack correctly)
  - [ ] Test persistence: purchases persist across browser sessions
  - [ ] Test persistence: equipped items persist across browser sessions
  - [ ] Test persistence: buff effects persist across browser sessions

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Shop System Architecture:**
- Shop items are defined in SHOP_ITEMS constant (Story 1.5)
- Shop items have unique IDs, names, prices, types (cosmetic/buff), descriptions
- Purchased items stored in ProgressionState.purchasedItems array
- Equipped items stored in ProgressionState.equippedItems object
- ProgressionContext provides purchaseItem and equipItem methods
- All shop state persists via localStorage (Story 1.4)

**Purchase Flow:**
1. Player clicks item in shop UI (Story 4.4)
2. UI validates currency (canAffordItem helper)
3. UI calls ProgressionContext.purchaseItem(itemId)
4. ProgressionContext validates currency, deducts, adds to purchasedItems
5. ProgressionContext saves to localStorage
6. UI updates to show "Purchased" state
7. Currency counter animates (if UI supports)

**Equip Flow (Cosmetic Items):**
1. Player clicks "Equip" button on purchased cosmetic item
2. UI calls ProgressionContext.equipItem(slot, itemId)
3. ProgressionContext validates item is purchased and cosmetic type
4. ProgressionContext adds item to equippedItems[slot]
5. ProgressionContext saves to localStorage
6. UI updates to show "Використовується" state
7. Item appears in game (Story 4.7)

**Buff Application Flow (Gameplay Buffs):**
1. Player purchases gameplay buff item
2. Item ID added to purchasedItems array
3. Game systems read purchasedItems on initialization
4. Buff effects calculated using helper functions
5. Buffs applied in respective systems (movement, coziness)
6. Buffs stack with level bonuses (Story 3.3)
7. Buffs persist across sessions (via ProgressionContext)

**Buff Stacking Strategy:**
- Level bonuses and shop buffs stack additively
- Example: Level 2 (+5% speed) + Shop buff (+5% speed) = +10% total speed
- Buff calculation functions accept optional shop buff parameter
- Buffs are read from ProgressionState.purchasedItems
- Buff effects applied in level bonus helper functions (Story 3.3)

**State Management:**
- ProgressionState.purchasedItems: string[] - array of purchased item IDs
- ProgressionState.equippedItems: EquippedItems - object with equipped cosmetic slots
- ProgressionState.svitlyachky: number - current currency amount
- ProgressionContext provides purchaseItem(itemId) and equipItem(slot, itemId) methods
- All state changes trigger localStorage save (automatic via ProgressionContext)

**Shop Items (from constants.ts):**
- `skin-cozy-sweater`: Cosmetic character skin, 3 «Світлячки»
- `cat-ginger`: Cosmetic cat, 4 «Світлячки»
- `buff-speed`: Gameplay buff (+5% speed), 5 «Світлячки»

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Shop items defined in `src/utils/constants.ts` (SHOP_ITEMS constant)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (provides purchaseItem, equipItem)
- ProgressionState type at `src/types/progression.ts` (purchasedItems, equippedItems)
- Shop UI component at `src/components/ui/Shop.tsx` (Story 4.4 - not yet implemented)
- Buff helper functions in `src/utils/constants.ts` (level bonus functions, extend for shop buffs)

**Source Tree Components to Touch:**
- `src/contexts/ProgressionContext.tsx` - MODIFY (enhance purchaseItem, equipItem validation)
- `src/utils/constants.ts` - MODIFY (add shop buff helper functions, extend level bonus functions)
- `src/components/game/Character.tsx` - MODIFY (apply movement speed buff)
- `src/hooks/useGameLoop.ts` - MODIFY (apply coziness buffs)
- `src/types/progression.ts` - VERIFY (purchasedItems, equippedItems types correct)

**No Conflicts Detected:**
- ProgressionContext already has purchaseItem and equipItem methods (need validation enhancement)
- SHOP_ITEMS constant already defined in constants.ts
- Level bonus helper functions already prepared for shop buff extension (Story 3.3)
- ProgressionState already has purchasedItems and equippedItems properties

### Learnings from Previous Stories

**From Story 3-2-світлячки-currency-system (Status: done)**
- **Currency System**: Currency stored in ProgressionState.svitlyachky [Source: docs/sprint-artifacts/3-2-світлячки-currency-system.md]
  - Currency calculated and added at end of evening
  - Currency persists to localStorage automatically
  - Currency accessible via ProgressionContext.progressionState.svitlyachky
  - Ready for shop purchase integration

**From Story 3-3-level-up-bonuses (Status: done)**
- **Level Bonuses**: Level bonus helper functions prepared for shop buff extension [Source: docs/sprint-artifacts/3-3-level-up-bonuses.md]
  - Helper functions documented for shop buff stacking
  - Functions structured to accept optional shop buff parameters
  - Stacking strategy documented (additive stacking)
  - Ready for shop buff integration

**From Story 1-4-local-storage-utilities (Status: done)**
- **Persistence**: ProgressionState persists to localStorage automatically [Source: docs/sprint-artifacts/1-4-local-storage-utilities.md]
  - ProgressionContext saves state to localStorage on changes
  - Purchased items and equipped items persist automatically
  - No additional persistence logic needed for shop

**From Story 1-3-react-context-setup-for-game-state (Status: done)**
- **ProgressionContext**: Context provides purchaseItem and equipItem methods [Source: docs/sprint-artifacts/1-3-react-context-setup-for-game-state.md]
  - purchaseItem(itemId) adds item to purchasedItems array
  - equipItem(slot, itemId) adds item to equippedItems object
  - Methods need validation enhancement for shop integration
  - Ready for shop purchase/equip integration

**Implementation Notes:**
- Enhance ProgressionContext.purchaseItem to validate currency and deduct
- Enhance ProgressionContext.equipItem to validate purchase and cosmetic type
- Create shop buff helper functions to read purchased buffs
- Extend level bonus helper functions to accept shop buff parameters
- Integrate buff effects into Character component and useGameLoop
- Prepare shop UI integration points (Story 4.4)
- Test purchase, equip, buff application, and persistence

### References

- [Source: docs/epics.md#Story-3.4] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Progression-&-Economy] - Shop system specifications (FR17, FR18, FR19, FR20)
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/3-2-світлячки-currency-system.md] - Currency system and ProgressionContext integration
- [Source: docs/sprint-artifacts/3-3-level-up-bonuses.md] - Level bonus system and buff stacking strategy
- [Source: docs/sprint-artifacts/1-4-local-storage-utilities.md] - localStorage persistence system
- [Source: docs/sprint-artifacts/1-3-react-context-setup-for-game-state.md] - ProgressionContext setup
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext for purchase/equip methods
- [Source: src/utils/constants.ts] - Shop items and level bonus helper functions
- [Source: src/types/progression.ts] - ProgressionState type definition
- [Source: src/components/game/Character.tsx] - Character component for movement speed buff
- [Source: src/hooks/useGameLoop.ts] - Game loop for coziness buffs

## Dev Agent Record

### Context Reference

- [Source: docs/sprint-artifacts/3-4-shop-system.context.xml] - Story context XML with all relevant documentation and code artifacts (to be created)

### Agent Model Used

Auto (BMAD create-story workflow)

### Debug Log References

### Completion Notes List

**2025-01-21 - Story 3.4 Implementation Complete:**
- Enhanced `purchaseItem` method in ProgressionContext to validate currency and deduct cost
- Enhanced `equipItem` method in ProgressionContext to validate purchase and cosmetic type
- Added shop buff helper functions: `getPurchasedBuffs`, `getBuffEffect`
- Extended level bonus functions to accept shop buff parameters:
  - `getMovementSpeedWithBonuses` now accepts `shopBuffPercent` parameter
  - `getStartingCozinessWithBonuses` now accepts `shopBuffAmount` parameter
  - `getCozinessDecayRateWithBonuses` now accepts `shopBuffReductionPercent` parameter
- Integrated shop buffs into Character component (movement speed buff)
- Integrated shop buffs into useGameLoop (coziness buffs - structure ready for future buffs)
- Added shop item state helper functions: `isItemPurchased`, `isItemEquipped`, `getItemState`, `canAffordItem`
- All shop state persists via ProgressionContext (automatic localStorage save)
- Shop UI integration points documented (Story 4.4 will implement UI)
- Implementation ready for testing and shop UI integration (Story 4.4)

### File List

**Files to Modify:**
- `src/contexts/ProgressionContext.tsx` - Enhance purchaseItem and equipItem methods
- `src/utils/constants.ts` - Add shop buff helper functions, extend level bonus functions
- `src/components/game/Character.tsx` - Apply movement speed buff
- `src/hooks/useGameLoop.ts` - Apply coziness buffs

**Files to Create:**
- None (shop UI component in Story 4.4)

### Change Log

**2025-01-21 - Story 3.4 Created:**
- Story file created with full acceptance criteria and tasks
- Story marked as "drafted" in sprint-status.yaml
- Ready for story-ready workflow to create implementation context


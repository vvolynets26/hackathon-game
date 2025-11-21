# Story 4.4: Shop Screen

Status: review

## Story

As a player,
I want to browse and purchase items in a shop screen,
So that I can spend my «Світлячки» and customize my experience.

## Acceptance Criteria

1. **Given** I have «Світлячки» currency
   **When** I open the shop screen
   **Then** `Shop.tsx` displays:
   - **Top section:**
     - Title: "Магазин"
     - «Світлячки» display: ✨ x 7 (big, visible, top-right)
   - **Main area:**
     - Grid/list of 3 shop items (from Story 3.4):
       - Each item card shows: icon, name, price (✨ 3-5), state (Locked/Purchased/Equipped)
       - Cards are clickable and show hover effect (slight scale + shadow)
       - Selected item is highlighted
   - **Right panel (when item selected):**
     - Big icon/preview of selected item
     - Name: e.g., "Скин: Айтішник"
     - Description/effect: e.g., "дає +5% до швидкості руху" (if gameplay buff)
     - Action button:
       - "Купити" (if not owned and enough currency)
       - "Недостатньо світлячків" (disabled, if not enough currency)
       - "Обрати" (if owned but not equipped)
       - "Використовується" (non-clickable, if currently equipped)

2. **Given** I am viewing the shop screen
   **When** I interact with shop items
   **Then** shop interactions work:
   - Clicking item card selects it and shows details in right panel
   - Purchasing item: Currency counter animates (7 → 4), card shows checkmark, state updates
   - Equipping item: State updates to "Використовується", item appears in game (Story 4.7)
   - Shop can be closed/returned to game via back button or menu

3. **Given** the shop screen is displayed
   **When** I observe the screen behavior
   **Then** the shop screen:
   - Appears as full-screen overlay (modal-style)
   - Styled according to UX design (card-based layout, warm accents)
   - All text in Ukrainian (Story 4.5)

## Tasks / Subtasks

- [x] Task 1: Create Shop component structure (AC: 1, 2, 3)
  - [x] Create `src/components/ui/Shop.tsx` component
  - [x] Component reads from ProgressionContext using `useProgression()` hook (svitlyachky, purchasedItems, equippedItems)
  - [x] Component displays as full-screen overlay (modal-style)
  - [x] Component styled with card-based layout, warm accents
  - [x] Reference ProgressionContext [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference SHOP_ITEMS constant [Source: src/utils/constants.ts]
  - [x] Reference UX design "Shop UX" section [Source: docs/ux-design-specification.md]
  - [x] Reference PRD FR34 for shop screen specifications [Source: docs/prd.md#Shop-UX]

- [x] Task 2: Implement top section with title and currency display (AC: 1)
  - [x] Display title: "Магазин" (Ukrainian)
  - [x] Display «Світлячки» count: ✨ x {count} (big, visible, top-right)
  - [x] Currency display reads from ProgressionContext.progressionState.svitlyachky
  - [x] Style title according to UX design (H1 typography, centered)
  - [x] Style currency display prominently (warm accent color, large size)
  - [x] Reference ProgressionContext for currency [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference translations file [Source: src/utils/translations.ts]

- [x] Task 3: Implement main area with shop items grid (AC: 1)
  - [x] Create grid/list layout for shop items
  - [x] Load shop items from SHOP_ITEMS constant (3 items minimum)
  - [x] For each item, display card with:
     - Icon (from item definition or placeholder)
     - Name (from item definition, Ukrainian)
     - Price (✨ {price} format)
     - State indicator (Locked/Purchased/Equipped) using shop item state helpers
  - [x] Cards are clickable and show hover effect (slight scale + shadow)
  - [x] Selected item is highlighted (border or background change)
  - [x] Use shop item state helper functions: `getItemState`, `isItemPurchased`, `isItemEquipped`, `canAffordItem`
  - [x] Reference SHOP_ITEMS constant [Source: src/utils/constants.ts]
  - [x] Reference shop item state helpers [Source: src/utils/constants.ts - from Story 3.4]
  - [x] Reference UX design card layout [Source: docs/ux-design-specification.md#Shop-UX]

- [x] Task 4: Implement right panel with item details (AC: 1)
  - [x] Create right panel component/section for selected item details
  - [x] When item is selected, display:
     - Big icon/preview of selected item
     - Name: e.g., "Скин: Айтішник" (from item definition, Ukrainian)
     - Description/effect: e.g., "дає +5% до швидкості руху" (if gameplay buff, from item definition)
  - [x] Display action button based on item state:
     - "Купити" (if not owned and enough currency) - enabled
     - "Недостатньо світлячків" (if not enough currency) - disabled
     - "Обрати" (if owned but not equipped) - enabled
     - "Використовується" (if currently equipped) - non-clickable, disabled style
  - [x] Use `canAffordItem` helper to determine button state
  - [x] Use `getItemState` helper to determine button text
  - [x] Style right panel according to UX design (card-based, warm accents)
  - [x] Reference shop item state helpers [Source: src/utils/constants.ts - from Story 3.4]
  - [x] Reference UX design right panel layout [Source: docs/prd.md#Shop-UX]

- [x] Task 5: Implement purchase functionality (AC: 2)
  - [x] When "Купити" button is clicked:
     - Validate currency using `canAffordItem` helper
     - Call ProgressionContext.purchaseItem(itemId)
     - Handle purchase result (success/failure)
     - Update UI to show "Purchased" state
     - Animate currency counter (7 → 4) using CSS transition
     - Card shows checkmark or "Purchased" indicator
  - [x] Handle purchase errors gracefully (insufficient currency, already purchased)
  - [x] Update item state display after purchase
  - [x] Reference ProgressionContext.purchaseItem [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference shop item state helpers [Source: src/utils/constants.ts - from Story 3.4]

- [x] Task 6: Implement equip functionality (AC: 2)
  - [x] When "Обрати" button is clicked:
     - Validate item is purchased using `isItemPurchased` helper
     - Call ProgressionContext.equipItem(slot, itemId)
     - Handle equip result (success/failure)
     - Update UI to show "Використовується" state
     - Item appears in game (Story 4.7 - prepare integration)
  - [x] Handle equip errors gracefully (not purchased, invalid slot)
  - [x] Update item state display after equip
  - [x] Determine item slot from item type (characterSkin, cat, candle)
  - [x] Reference ProgressionContext.equipItem [Source: src/contexts/ProgressionContext.tsx]
  - [x] Reference shop item state helpers [Source: src/utils/constants.ts - from Story 3.4]
  - [x] Reference Story 4.7 for cosmetic item display [Source: docs/epics.md#Story-4.7]

- [x] Task 7: Implement shop navigation and closing (AC: 2, 3)
  - [x] Add back button or close button to shop screen
  - [x] Back button returns to game/menu (hide shop screen)
  - [x] Shop can be accessed from results screen (Story 4.3 - "Магазин" button)
  - [x] Shop can be accessed from main menu (Story 4.9 - prepare integration)
  - [x] Implement screen state management (show/hide shop)
  - [x] Reference Story 4.3 for results screen navigation [Source: docs/sprint-artifacts/4-3-results-screen.md]
  - [x] Reference Story 4.9 for menu navigation [Source: docs/epics.md#Story-4.9]

- [x] Task 8: Implement shop screen animations and transitions (AC: 2, 3)
  - [x] Create `src/components/ui/Shop.module.css` stylesheet
  - [x] Implement fade-in or slide-in animation for screen appearance
  - [x] Implement smooth CSS transitions for currency counter animation
  - [x] Implement hover effects for item cards (slight scale + shadow)
  - [x] Implement selection highlight animation
  - [x] Style overlay background (dimmed, full-screen)
  - [x] Ensure animations are performance-friendly (CSS-based, GPU-accelerated)
  - [x] Reference UX design animation specifications [Source: docs/ux-design-specification.md#Micro-Animations-&-States]

- [x] Task 9: Integrate Shop into game flow (AC: 2, 3)
  - [x] Add Shop component to main game component (App.tsx or game container)
  - [x] Show Shop when shop button is clicked (from results screen or menu)
  - [x] Hide Shop when back button is clicked
  - [x] Ensure Shop appears as full-screen overlay (modal-style)
  - [x] Test shop appears and closes correctly
  - [x] Reference game flow from Story 4.3 [Source: docs/sprint-artifacts/4-3-results-screen.md]

- [x] Task 10: Add Ukrainian text integration (AC: 3)
  - [x] Add shop screen text to translations file
  - [x] Title: "Магазин"
  - [x] Button labels: "Купити", "Обрати", "Використовується", "Недостатньо світлячків"
  - [x] Item names and descriptions in Ukrainian (from SHOP_ITEMS constant)
  - [x] All UI text uses Ukrainian translations
  - [x] Reference translations file [Source: src/utils/translations.ts]
  - [x] Reference PRD FR40-FR42 for localization requirements [Source: docs/prd.md#Localization-&-Content]

- [x] Task 11: Testing and validation (AC: 1, 2, 3)
  - [x] Test shop screen displays correctly with all 3 items
  - [x] Test item cards show correct state (Locked/Purchased/Equipped)
  - [x] Test item selection shows details in right panel
  - [x] Test purchase: sufficient currency (should deduct, update state)
  - [x] Test purchase: insufficient currency (should show disabled button)
  - [x] Test purchase: already purchased (should show "Обрати" button)
  - [x] Test equip: purchased cosmetic item (should update state to "Використовується")
  - [x] Test equip: gameplay buff (should not show equip button, auto-applied)
  - [x] Test currency counter animation
  - [x] Test shop navigation (open/close)
  - [x] Test Ukrainian text displays correctly
  - [x] Test shop screen styled according to UX design

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Shop Screen Architecture:**
- Shop screen is a full-screen overlay component (modal-style)
- Component reads from ProgressionContext (currency, purchased items, equipped items)
- Component uses SHOP_ITEMS constant for item definitions
- Component uses shop item state helper functions from Story 3.4
- Component integrates with ProgressionContext.purchaseItem and equipItem methods
- Component styled with card-based layout, warm accents (UX design)

**ProgressionContext Integration:**
- ProgressionContext provides `progressionState` with: svitlyachky, purchasedItems, equippedItems
- Use `useProgression()` hook to access ProgressionContext
- Call `purchaseItem(itemId)` to purchase items (validates currency, deducts, adds to purchasedItems)
- Call `equipItem(slot, itemId)` to equip cosmetic items (validates purchase, adds to equippedItems)
- All state changes trigger localStorage save (automatic via ProgressionContext)

**Shop Item State Helpers (from Story 3.4):**
- `isItemPurchased(itemId, purchasedItems)`: Check if item is purchased
- `isItemEquipped(itemId, equippedItems)`: Check if item is equipped
- `getItemState(itemId, progressionState)`: Get item state ('locked' | 'purchased' | 'equipped')
- `canAffordItem(itemId, svitlyachky)`: Check if player can afford item
- Helper functions use SHOP_ITEMS constant for item data

**Shop Items (from constants.ts):**
- `skin-cozy-sweater`: Cosmetic character skin, 3 «Світлячки»
- `cat-ginger`: Cosmetic cat, 4 «Світлячки»
- `buff-speed`: Gameplay buff (+5% speed), 5 «Світлячки»
- Items have: id, name, price, type (cosmetic/buff), description, icon

**Purchase Flow:**
1. Player clicks "Купити" button on item
2. UI validates currency using `canAffordItem` helper
3. UI calls ProgressionContext.purchaseItem(itemId)
4. ProgressionContext validates currency, deducts, adds to purchasedItems
5. ProgressionContext saves to localStorage
6. UI updates to show "Purchased" state
7. Currency counter animates (CSS transition)

**Equip Flow (Cosmetic Items):**
1. Player clicks "Обрати" button on purchased cosmetic item
2. UI validates item is purchased using `isItemPurchased` helper
3. UI calls ProgressionContext.equipItem(slot, itemId)
4. ProgressionContext validates item is purchased and cosmetic type
5. ProgressionContext adds item to equippedItems[slot]
6. ProgressionContext saves to localStorage
7. UI updates to show "Використовується" state
8. Item appears in game (Story 4.7)

**Gameplay Buffs:**
- Gameplay buffs are automatically applied when purchased (no equip needed)
- Buffs persist across sessions (saved to purchasedItems)
- Buffs stack with level bonuses (Story 3.3)
- Shop UI should not show equip button for gameplay buffs

**Screen Navigation:**
- Shop can be accessed from results screen (Story 4.3 - "Магазин" button)
- Shop can be accessed from main menu (Story 4.9 - prepare integration)
- Shop can be closed via back button or close button
- Shop appears as full-screen overlay (modal-style)

**Styling Guidelines:**
- Full-screen overlay with dimmed background
- Card-based layout for shop items (matches UX design)
- Warm accent colors for highlights (currency, selected item)
- Light text on dark background (matches "Cozy Blackout" theme)
- Smooth CSS transitions for all animations
- Typography: H1 for title, body for item names, buttons styled prominently
- Hover effects: slight scale + shadow on item cards
- Selection highlight: border or background change

**Ukrainian Text Integration:**
- All text in Ukrainian (title, button labels, item names, descriptions)
- Text stored in translations.ts file
- Item names and descriptions from SHOP_ITEMS constant (should be in Ukrainian)
- Reference PRD FR40-FR42 for localization requirements

### Project Structure Notes

**Alignment with Unified Project Structure:**
- Shop screen component at `src/components/ui/Shop.tsx` (to be created)
- Shop screen stylesheet at `src/components/ui/Shop.module.css` (to be created)
- ProgressionContext at `src/contexts/ProgressionContext.tsx` (already exists)
- SHOP_ITEMS constant at `src/utils/constants.ts` (already exists)
- Shop item state helpers at `src/utils/constants.ts` (from Story 3.4)
- Translations file at `src/utils/translations.ts` (already exists, needs shop text)

**Source Tree Components to Touch:**
- `src/components/ui/Shop.tsx` - CREATE (new component)
- `src/components/ui/Shop.module.css` - CREATE (new stylesheet)
- `src/components/ui/App.tsx` or game container - MODIFY (add Shop integration)
- `src/utils/translations.ts` - MODIFY (add shop text if needed)
- `src/contexts/ProgressionContext.tsx` - READ (access progression state, call purchaseItem/equipItem)
- `src/utils/constants.ts` - READ (SHOP_ITEMS constant, shop item state helpers)

**No Conflicts Detected:**
- Shop screen is new component, no conflicts with existing components
- ProgressionContext already provides purchaseItem and equipItem methods (Story 3.4)
- SHOP_ITEMS constant already defined in constants.ts
- Shop item state helpers already created in Story 3.4
- Results screen already has "Магазин" button (Story 4.3 - prepare integration)

### Learnings from Previous Story

**From Story 3-4-shop-system (Status: done)**
- **Shop System Backend**: Shop system backend fully implemented [Source: docs/sprint-artifacts/3-4-shop-system.md]
  - ProgressionContext.purchaseItem(itemId) validates currency, deducts cost, adds to purchasedItems
  - ProgressionContext.equipItem(slot, itemId) validates purchase, adds to equippedItems
  - Shop item state helper functions created: `isItemPurchased`, `isItemEquipped`, `getItemState`, `canAffordItem`
  - Shop buffs automatically applied when purchased (no equip needed)
  - All shop state persists via localStorage (automatic via ProgressionContext)
  - Ready for shop UI integration

- **Shop Items**: SHOP_ITEMS constant defined with 3 items [Source: src/utils/constants.ts]
  - `skin-cozy-sweater`: Cosmetic character skin, 3 «Світлячки»
  - `cat-ginger`: Cosmetic cat, 4 «Світлячки»
  - `buff-speed`: Gameplay buff (+5% speed), 5 «Світлячки»
  - Items have: id, name, price, type (cosmetic/buff), description, icon
  - Ready for shop UI display

- **Shop Item State Helpers**: Helper functions available for shop UI [Source: src/utils/constants.ts]
  - `isItemPurchased(itemId, purchasedItems)`: Check if item is purchased
  - `isItemEquipped(itemId, equippedItems)`: Check if item is equipped
  - `getItemState(itemId, progressionState)`: Get item state ('locked' | 'purchased' | 'equipped')
  - `canAffordItem(itemId, svitlyachky)`: Check if player can afford item
  - Helper functions use SHOP_ITEMS constant for item data
  - Ready for shop UI integration

**From Story 4-3-results-screen (Status: in-progress)**
- **Results Screen Navigation**: Results screen has "Магазин" button [Source: docs/sprint-artifacts/4-3-results-screen.md]
  - Results screen button prepares navigation to shop screen
  - Shop navigation can be integrated when shop screen is ready
  - Ready for shop screen integration

**From Story 4-1-xp-and-level-hud-display (Status: done)**
- **ProgressionContext Usage**: ProgressionContext provides full progression state [Source: docs/sprint-artifacts/4-1-xp-and-level-hud-display.md]
  - Use `useProgression()` hook to access `progressionState` (svitlyachky, purchasedItems, equippedItems)
  - ProgressionContext updates trigger React re-renders automatically
  - ProgressionContext state persists via localStorage (automatic)
  - Ready for shop screen integration

- **Component Pattern**: UI components follow consistent pattern [Source: src/components/ui/XPLevelDisplay.tsx]
  - Components read from contexts using hooks
  - Components use CSS Modules for styling
  - Components update reactively when context state changes
  - Components styled with warm accent colors and light text
  - Shop screen can follow similar pattern for consistency

**Implementation Notes:**
- Create Shop component that reads from ProgressionContext
- Use shop item state helper functions to determine item states
- Integrate with ProgressionContext.purchaseItem and equipItem methods
- Implement card-based layout with hover effects and selection highlight
- Add right panel for item details with action buttons
- Implement currency counter animation
- Add Ukrainian text for all UI elements
- Prepare navigation integration with results screen and menu
- Test purchase, equip, and navigation flows

### References

- [Source: docs/epics.md#Story-4.4] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#Shop-UX] - Shop screen specifications (FR34)
- [Source: docs/prd.md#FR34] - Shop screen requirement: "The game displays a shop screen where players can browse and purchase items"
- [Source: docs/prd.md#FR40-FR42] - Ukrainian localization requirements
- [Source: docs/ux-design-specification.md] - UX design specifications for shop screen
- [Source: docs/ux-design-specification.md#Shop-UX] - Shop UX layout and styling
- [Source: docs/ux-design-specification.md#Micro-Animations-&-States] - Animation specifications
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/3-4-shop-system.md] - Shop system backend implementation
- [Source: docs/sprint-artifacts/4-3-results-screen.md] - Results screen navigation integration
- [Source: docs/sprint-artifacts/4-1-xp-and-level-hud-display.md] - ProgressionContext usage patterns
- [Source: src/contexts/ProgressionContext.tsx] - ProgressionContext for purchase/equip methods
- [Source: src/utils/constants.ts] - SHOP_ITEMS constant and shop item state helpers
- [Source: src/types/progression.ts] - ProgressionState type definition
- [Source: src/utils/translations.ts] - Translations file for Ukrainian text

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

**2025-01-21 - Story 4.4 Implementation Complete:**
- Created Shop component (`src/components/ui/Shop.tsx`) with full-screen overlay, item grid, and details panel
- Implemented purchase and equip functionality using ProgressionContext methods
- Added Ukrainian translations for all shop UI text
- Integrated shop navigation from results screen
- Styled shop screen with card-based layout, warm accents, and smooth animations
- All acceptance criteria met: shop displays 3 items, purchase/equip works, Ukrainian text throughout
- Shop can be accessed from results screen via "Магазин" button
- Currency counter animates smoothly using CSS transitions
- Item states (Locked/Purchased/Equipped) display correctly
- Action buttons update based on item state and currency availability

### File List

**Created:**
- `src/components/ui/Shop.tsx` - Shop component with purchase/equip functionality
- `src/components/ui/Shop.module.css` - Shop component styles with animations

**Modified:**
- `src/App.tsx` - Added shop state management and Shop component integration
- `src/components/ui/ResultsScreen.tsx` - Added onShopClick prop to navigate to shop
- `src/utils/translations.ts` - Added shop screen Ukrainian translations

### Change Log

**2025-01-21 - Story 4.4 Created:**
- Story file created with full acceptance criteria and tasks
- Story marked as "drafted" in sprint-status.yaml
- Ready for story-ready workflow to create implementation context

**2025-01-21 - Story 4.4 Implementation Complete:**
- Implemented Shop component with all acceptance criteria
- All tasks completed and tested
- Story marked as "review" in sprint-status.yaml
- Ready for code review workflow


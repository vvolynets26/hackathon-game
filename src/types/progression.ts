/**
 * Progression System Type Definitions
 * 
 * Defines types for player progression, including leveling, currency,
 * purchased items, equipped cosmetics, and achievements.
 * 
 * Progression state persists across game sessions via localStorage.
 */

/**
 * Represents equipped cosmetic items that affect visual appearance.
 * 
 * All properties are optional, allowing players to mix and match cosmetics.
 * Each property stores an item ID string that references a specific cosmetic.
 * 
 * @property characterSkin - ID of the equipped character skin/costume
 * @property cat - ID of the equipped cat appearance
 * @property candle - ID of the equipped candle appearance
 * 
 * @example
 * ```typescript
 * const equipped: EquippedItems = {
 *   characterSkin: 'skin-cozy-sweater',
 *   cat: 'cat-ginger',
 *   candle: 'candle-vintage'
 * };
 * ```
 */
export interface EquippedItems {
  /** ID of the equipped character skin/costume */
  characterSkin?: string;
  /** ID of the equipped cat appearance */
  cat?: string;
  /** ID of the equipped candle appearance */
  candle?: string;
}

/**
 * Represents the player's progression state across all game sessions.
 * 
 * This state tracks:
 * - Level and experience points (XP)
 * - Currency («Світлячки» / fireflies)
 * - Purchased cosmetic items
 * - Currently equipped items
 * - Unlocked achievements
 * 
 * Progression state is persisted in localStorage and updated after each game session.
 * 
 * @property level - Current player level (starts at 1)
 * @property xp - Current experience points accumulated
 * @property svitlyachky - Current currency amount («Світлячки» / fireflies)
 * @property purchasedItems - Array of item IDs that have been purchased
 * @property equippedItems - Currently equipped cosmetic items
 * @property achievements - Array of achievement IDs that have been unlocked
 * 
 * @example
 * ```typescript
 * const progression: ProgressionState = {
 *   level: 5,
 *   xp: 1250,
 *   svitlyachky: 150,
 *   purchasedItems: ['skin-cozy-sweater', 'cat-ginger'],
 *   equippedItems: {
 *     characterSkin: 'skin-cozy-sweater',
 *     cat: 'cat-ginger'
 *   },
 *   achievements: ['first-win', 'perfect-evening']
 * };
 * ```
 */
export interface ProgressionState {
  /** Current player level (starts at 1) */
  level: number;
  /** Current experience points accumulated */
  xp: number;
  /** Current currency amount («Світлячки» / fireflies) */
  svitlyachky: number;
  /** Array of item IDs that have been purchased */
  purchasedItems: string[];
  /** Currently equipped cosmetic items */
  equippedItems: EquippedItems;
  /** Array of achievement IDs that have been unlocked */
  achievements: string[];
}


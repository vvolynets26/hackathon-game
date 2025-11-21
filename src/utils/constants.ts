/**
 * Game Constants and Configuration
 * 
 * Centralized game mechanics values for easy adjustment and maintenance.
 * All constants are typed with TypeScript and match PRD specifications exactly.
 * 
 * Constants are organized by category:
 * - Timing: Evening duration, event spawn intervals
 * - Coziness: Starting values and decay rates
 * - Events: Spawning, timers, scoring, and impact values
 * - Progression: XP thresholds, currency rewards
 * - Shop: Item definitions and prices
 * 
 * @example
 * ```typescript
 * import { EVENING_DURATION, COZINESS_START, EVENT_SCORING } from './utils/constants';
 * 
 * // Use in game loop
 * const initialTime = EVENING_DURATION;
 * const startingCoziness = COZINESS_START;
 * 
 * // Use in event system
 * const points = EVENT_SCORING[event.priority];
 * ```
 */

import type { EventPriority, EventType } from '../types/events';

// ============================================================================
// Timing Constants
// ============================================================================

/**
 * Duration of an evening session in seconds.
 * 
 * PRD specifies 60-90 seconds per evening. Default is 75 seconds (middle value).
 * This can be made configurable in the future for difficulty settings.
 * 
 * @see docs/prd.md#Game-Mechanics - Win & Lose Conditions
 */
export const EVENING_DURATION = 75 as const;

/**
 * Interval between event spawns in seconds.
 * 
 * PRD specifies events appear every 3-4 seconds. Default is 3.5 seconds (middle value).
 * 
 * @see docs/prd.md#Game-Mechanics - Event Spawning
 */
export const EVENT_SPAWN_INTERVAL = 3.5 as const;

// ============================================================================
// Coziness Constants
// ============================================================================

/**
 * Starting coziness value at the beginning of an evening.
 * 
 * PRD specifies «Затишок» starts at 60 on early levels.
 * Range is 0-100.
 * 
 * @see docs/prd.md#Progression-&-Economy - «Затишок» Range
 */
export const COZINESS_START = 60 as const;

/**
 * Coziness decay rate per second.
 * 
 * Represents how much coziness decreases each second during gameplay.
 * PRD mentions decay rate but doesn't specify exact value.
 * Using reasonable default of 0.5 per second (can be adjusted for balancing).
 * 
 * @see docs/prd.md#Progression-&-Economy - «Затишок» Range
 */
export const COZINESS_DECAY_RATE = 0.5 as const;

// ============================================================================
// Event System Constants
// ============================================================================

/**
 * Maximum number of simultaneous events based on player level.
 * 
 * PRD specifies:
 * - Level 1-2: 2 events maximum
 * - Level 3-4: 3 events maximum
 * - Level 5+: 4 events maximum
 * 
 * Use helper function `getMaxSimultaneousEvents(level: number)` for lookups.
 * 
 * @see docs/prd.md#Game-Mechanics - Event Spawning
 */
export const MAX_SIMULTANEOUS_EVENTS = {
  1: 2,
  2: 2,
  3: 3,
  4: 3,
  5: 4,
} as const;

/**
 * Helper function to get maximum simultaneous events for a given level.
 * 
 * Returns the maximum number of events that can be active at once for the specified level.
 * Falls back to level 5 value for levels above 5.
 * 
 * @param level - Player level (1-based)
 * @returns Maximum number of simultaneous events
 * 
 * @example
 * ```typescript
 * const maxEvents = getMaxSimultaneousEvents(3); // Returns 3
 * ```
 */
export function getMaxSimultaneousEvents(level: number): number {
  if (level <= 0) {
    return MAX_SIMULTANEOUS_EVENTS[1];
  }
  if (level <= 5) {
    return MAX_SIMULTANEOUS_EVENTS[level as keyof typeof MAX_SIMULTANEOUS_EVENTS];
  }
  return MAX_SIMULTANEOUS_EVENTS[5];
}

/**
 * Event timer duration in seconds based on player level.
 * 
 * PRD specifies 5-10 seconds depending on difficulty/level.
 * Lower levels get longer timers (easier), higher levels get shorter timers (harder).
 * 
 * Use helper function `getEventTimerDuration(level: number)` for lookups.
 * 
 * @see docs/prd.md#Game-Mechanics - Event Lifetime
 */
export const EVENT_TIMER_DURATION = {
  1: 10, // 10 seconds for level 1 (easiest)
  2: 9,  // 9 seconds for level 2
  3: 8,  // 8 seconds for level 3
  4: 7,  // 7 seconds for level 4
  5: 5,  // 5 seconds for level 5+ (hardest)
} as const;

/**
 * Helper function to get event timer duration for a given level.
 * 
 * Returns the timer duration in seconds for events at the specified level.
 * Falls back to level 5 value for levels above 5.
 * 
 * @param level - Player level (1-based)
 * @returns Timer duration in seconds
 * 
 * @example
 * ```typescript
 * const timer = getEventTimerDuration(1); // Returns 10
 * ```
 */
export function getEventTimerDuration(level: number): number {
  if (level <= 0) {
    return EVENT_TIMER_DURATION[1];
  }
  if (level <= 5) {
    return EVENT_TIMER_DURATION[level as keyof typeof EVENT_TIMER_DURATION];
  }
  return EVENT_TIMER_DURATION[5];
}

/**
 * Points awarded for resolving events based on priority.
 * 
 * PRD specifies:
 * - Minor events: +10 points
 * - Standard events: +15 points
 * - Critical events: +20 points
 * 
 * @see docs/prd.md#Progression-&-Economy - Event Types & Scoring
 */
export const EVENT_SCORING: Readonly<Record<EventPriority, number>> = {
  minor: 10,
  standard: 15,
  critical: 20,
} as const;

/**
 * Coziness impact (rewards and penalties) for events based on priority.
 * 
 * PRD specifies:
 * - Minor events: +5 on resolve, -5 on failure
 * - Standard events: +8 on resolve, -10 on failure
 * - Critical events: +10 on resolve, -20 on failure
 * 
 * @see docs/prd.md#Progression-&-Economy - Event Types & Scoring
 */
export const EVENT_COZINESS_IMPACT: Readonly<
  Record<EventPriority, { reward: number; penalty: number }>
> = {
  minor: {
    reward: 5,
    penalty: -5,
  },
  standard: {
    reward: 8,
    penalty: -10,
  },
  critical: {
    reward: 10,
    penalty: -20,
  },
} as const;

/**
 * Interaction text for each event type.
 * 
 * Defines the interaction requirement text for each event type in both English and Ukrainian.
 * Used for UI display to show players what action they need to take.
 * 
 * PRD specifies:
 * - phone: "plug into power bank" / "Підключити до павербанку"
 * - kettle: "turn off" / "Вимкнути"
 * - cat: "calm it" / "Заспокоїти"
 * - candle: "light it" / "Запалити"
 * 
 * @see docs/prd.md#Event-Types-&-Scoring - FR25: Interaction Requirements
 */
export interface EventInteractionText {
  /** English interaction text */
  en: string;
  /** Ukrainian interaction text */
  uk: string;
}

export const EVENT_INTERACTION_TEXT: Readonly<
  Record<EventType, EventInteractionText>
> = {
  phone: {
    en: 'plug into power bank',
    uk: 'Підключити до павербанку',
  },
  kettle: {
    en: 'turn off',
    uk: 'Вимкнути',
  },
  cat: {
    en: 'calm it',
    uk: 'Заспокоїти',
  },
  candle: {
    en: 'light it',
    uk: 'Запалити',
  },
} as const;

// ============================================================================
// Progression Constants
// ============================================================================

/**
 * XP thresholds required to reach each level.
 * 
 * PRD specifies:
 * - Level 1 → 0 XP (starting level)
 * - Level 2 → 100 XP
 * - Level 3 → 300 XP
 * - Level 4 → 600 XP
 * 
 * Array index corresponds to level (index 0 = level 1, index 1 = level 2, etc.)
 * 
 * @see docs/prd.md#Progression-&-Economy - XP System
 */
export const XP_LEVEL_THRESHOLDS = [0, 100, 300, 600] as const;

/**
 * Helper function to get XP threshold for a given level.
 * 
 * Returns the minimum XP required to reach the specified level.
 * For levels beyond the array, returns the last threshold.
 * 
 * @param level - Target level (1-based)
 * @returns Minimum XP required for that level
 * 
 * @example
 * ```typescript
 * const threshold = getXPThreshold(3); // Returns 300
 * ```
 */
export function getXPThreshold(level: number): number {
  if (level <= 0) {
    return XP_LEVEL_THRESHOLDS[0];
  }
  const index = level - 1;
  if (index < XP_LEVEL_THRESHOLDS.length) {
    return XP_LEVEL_THRESHOLDS[index];
  }
  return XP_LEVEL_THRESHOLDS[XP_LEVEL_THRESHOLDS.length - 1];
}

/**
 * «Світлячки» (fireflies) currency rewards per evening based on performance.
 * 
 * PRD specifies:
 * - Base reward: 1 «Світлячок» for surviving (Затишок > 0 at end)
 * - Performance bonus: +1 if final Затишок ≥ 50
 * - Performance bonus: +1 if final Затишок ≥ 80
 * - Maximum: 3 «Світлячки» per evening (perfect run)
 * 
 * @see docs/prd.md#Progression-&-Economy - «Світлячки» (In-Game Currency)
 */
export const SVITLYACHKY_REWARDS = {
  base: 1,      // For surviving (Затишок > 0 at end)
  bonus_50: 1,  // If final Затишок ≥ 50
  bonus_80: 1,  // If final Затишок ≥ 80
} as const;

/**
 * Maximum «Світлячки» that can be earned per evening.
 * 
 * Calculated as base + bonus_50 + bonus_80 = 3.
 */
export const MAX_SVITLYACHKY_PER_EVENING =
  SVITLYACHKY_REWARDS.base +
  SVITLYACHKY_REWARDS.bonus_50 +
  SVITLYACHKY_REWARDS.bonus_80;

// ============================================================================
// Shop Constants
// ============================================================================

/**
 * Type representing a shop item.
 * 
 * Shop items can be either cosmetic (visual appearance) or gameplay buffs.
 */
export interface ShopItem {
  /** Unique identifier for the item */
  id: string;
  /** Display name of the item (in Ukrainian) */
  name: string;
  /** Price in «Світлячки» */
  price: number;
  /** Type of item: 'cosmetic' for visual items, 'buff' for gameplay effects */
  type: 'cosmetic' | 'buff';
  /** Description of the item (in Ukrainian) */
  description: string;
  /** Optional effect description for gameplay buffs (in Ukrainian) */
  effect?: string;
}

/**
 * Shop items available for purchase.
 * 
 * PRD specifies 3 items minimum for MVP:
 * 1. Cosmetic character skin - 3 «Світлячки»
 * 2. Cosmetic cat/candle - 4 «Світлячки»
 * 3. Gameplay buff - 5 «Світлячки»
 * 
 * @see docs/prd.md#Progression-&-Economy - Shop Items & Prices (MVP)
 */
export const SHOP_ITEMS: ReadonlyArray<ShopItem> = [
  {
    id: 'skin-cozy-sweater',
    name: 'Скин: Затишний светр',
    price: 3,
    type: 'cosmetic',
    description: 'Новий образ для персонажа - затишний светр',
  },
  {
    id: 'cat-ginger',
    name: 'Рудий кіт',
    price: 4,
    type: 'cosmetic',
    description: 'Новий кіт або свічка для квартири',
  },
  {
    id: 'buff-speed',
    name: 'Буст швидкості',
    price: 5,
    type: 'buff',
    description: 'Легкий ігровий ефект',
    effect: 'дає +5% до швидкості руху',
  },
] as const;

/**
 * Get all purchased buff items from purchased items array.
 * 
 * Filters purchasedItems to return only items that are gameplay buffs (type: 'buff').
 * 
 * @param purchasedItems - Array of purchased item IDs
 * @returns Array of ShopItem objects that are buffs
 * 
 * @example
 * ```typescript
 * const buffs = getPurchasedBuffs(['buff-speed', 'skin-cozy-sweater']); // Returns [buff-speed item]
 * ```
 */
export function getPurchasedBuffs(purchasedItems: string[]): ShopItem[] {
  return SHOP_ITEMS.filter((item) => item.type === 'buff' && purchasedItems.includes(item.id));
}

/**
 * Get buff effect for a specific item ID.
 * 
 * Returns the buff effect type and value for a gameplay buff item.
 * Currently supports:
 * - 'buff-speed': +5% movement speed
 * 
 * @param itemId - Shop item ID
 * @returns Buff effect object with type and value, or null if item is not a buff or not found
 * 
 * @example
 * ```typescript
 * const effect = getBuffEffect('buff-speed'); // Returns { type: 'speed', value: 5 }
 * ```
 */
export function getBuffEffect(itemId: string): { type: string; value: number } | null {
  const item = SHOP_ITEMS.find((shopItem) => shopItem.id === itemId);
  
  if (!item || item.type !== 'buff') {
    return null;
  }
  
  // Map item IDs to buff effects
  // Currently only supports speed buff
  if (itemId === 'buff-speed') {
    return { type: 'speed', value: 5 }; // +5% movement speed
  }
  
  // Future buffs can be added here
  // if (itemId === 'buff-coziness') {
  //   return { type: 'startingCoziness', value: 5 }; // +5 starting coziness
  // }
  
  return null;
}

/**
 * Check if an item has been purchased.
 * 
 * @param itemId - Shop item ID
 * @param purchasedItems - Array of purchased item IDs
 * @returns True if item is purchased, false otherwise
 * 
 * @example
 * ```typescript
 * const isPurchased = isItemPurchased('buff-speed', ['buff-speed', 'skin-cozy-sweater']); // Returns true
 * ```
 */
export function isItemPurchased(itemId: string, purchasedItems: string[]): boolean {
  return purchasedItems.includes(itemId);
}

/**
 * Check if an item is currently equipped.
 * 
 * @param itemId - Shop item ID
 * @param equippedItems - EquippedItems object with equipped cosmetic slots
 * @returns True if item is equipped in any slot, false otherwise
 * 
 * @example
 * ```typescript
 * const isEquipped = isItemEquipped('skin-cozy-sweater', { characterSkin: 'skin-cozy-sweater' }); // Returns true
 * ```
 */
export function isItemEquipped(itemId: string, equippedItems: { characterSkin?: string; cat?: string; candle?: string }): boolean {
  return equippedItems.characterSkin === itemId || 
         equippedItems.cat === itemId || 
         equippedItems.candle === itemId;
}

/**
 * Get the current state of a shop item.
 * 
 * Returns 'locked' if not purchased, 'purchased' if purchased but not equipped,
 * or 'equipped' if currently equipped.
 * 
 * @param itemId - Shop item ID
 * @param progressionState - ProgressionState object with purchasedItems and equippedItems
 * @returns Item state: 'locked' | 'purchased' | 'equipped'
 * 
 * @example
 * ```typescript
 * const state = getItemState('skin-cozy-sweater', progressionState); // Returns 'purchased' or 'equipped'
 * ```
 */
export function getItemState(
  itemId: string,
  progressionState: { purchasedItems: string[]; equippedItems: { characterSkin?: string; cat?: string; candle?: string } }
): 'locked' | 'purchased' | 'equipped' {
  if (isItemEquipped(itemId, progressionState.equippedItems)) {
    return 'equipped';
  }
  if (isItemPurchased(itemId, progressionState.purchasedItems)) {
    return 'purchased';
  }
  return 'locked';
}

/**
 * Check if player can afford an item.
 * 
 * @param itemId - Shop item ID
 * @param svitlyachky - Current currency amount
 * @returns True if player has enough currency, false otherwise
 * 
 * @example
 * ```typescript
 * const canAfford = canAffordItem('buff-speed', 5); // Returns true (item costs 5)
 * ```
 */
export function canAffordItem(itemId: string, svitlyachky: number): boolean {
  const item = SHOP_ITEMS.find((shopItem) => shopItem.id === itemId);
  if (!item) {
    return false;
  }
  return svitlyachky >= item.price;
}

// ============================================================================
// Achievement Constants
// ============================================================================

/**
 * Achievement condition type.
 * 
 * Defines the type of condition required to unlock an achievement.
 * - 'coziness': Coziness stayed above threshold all evening
 * - 'events': Resolved a certain number of events in one evening
 * - 'level': Reached a specific level
 */
export type AchievementConditionType = 'coziness' | 'events' | 'level';

/**
 * Achievement definition.
 * 
 * Represents a single achievement that can be unlocked by meeting specific conditions.
 * 
 * @property id - Unique achievement ID (e.g., 'achievement-coziness-50')
 * @property name - Achievement name in Ukrainian
 * @property description - Achievement description in Ukrainian
 * @property conditionType - Type of condition required to unlock
 * @property conditionValue - Value required for condition (e.g., 50 for coziness ≥ 50%, 10 for 10 events, 3 for level 3)
 */
export interface Achievement {
  /** Unique achievement ID */
  id: string;
  /** Achievement name in Ukrainian */
  name: string;
  /** Achievement description in Ukrainian */
  description: string;
  /** Type of condition required to unlock */
  conditionType: AchievementConditionType;
  /** Value required for condition */
  conditionValue: number;
}

/**
 * Achievement definitions.
 * 
 * Contains all available achievements in the game.
 * Each achievement has a unique ID, name, description, and condition.
 * 
 * Achievements:
 * - `achievement-coziness-50`: Evening with «Затишок» never below 50%
 * - `achievement-events-10`: Resolved 10 events in one evening
 * - `achievement-level-3`: Reach level 3
 * 
 * @see docs/sprint-artifacts/3-5-achievement-system.md - Achievement system story
 * @see docs/epics.md#Story-3.5 - Achievement system epic
 */
export const ACHIEVEMENTS: ReadonlyArray<Achievement> = [
  {
    id: 'achievement-coziness-50',
    name: 'Затишна вечірка',
    description: 'Провести вечір з «Затишок» не нижче 50%',
    conditionType: 'coziness',
    conditionValue: 50,
  },
  {
    id: 'achievement-events-10',
    name: 'Майстер подій',
    description: 'Вирішити 10 подій за один вечір',
    conditionType: 'events',
    conditionValue: 10,
  },
  {
    id: 'achievement-level-3',
    name: 'Досвідчений гравець',
    description: 'Досягти 3 рівня',
    conditionType: 'level',
    conditionValue: 3,
  },
] as const;

/**
 * Get achievement by ID.
 * 
 * @param achievementId - Achievement ID
 * @returns Achievement object, or undefined if not found
 * 
 * @example
 * ```typescript
 * const achievement = getAchievement('achievement-coziness-50');
 * ```
 */
export function getAchievement(achievementId: string): Achievement | undefined {
  return ACHIEVEMENTS.find((achievement) => achievement.id === achievementId);
}

// ============================================================================
// Character Movement Constants
// ============================================================================

/**
 * Base character movement speed in pixels per second.
 * 
 * Represents the default movement speed for the character.
 * This value is modified by level bonuses (Story 3.3).
 * 
 * Using 150 pixels per second as a reasonable default for smooth movement.
 * This can be adjusted for balancing.
 * 
 * @see docs/epics.md#Story-2.3 - Character Movement System
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonuses modify this
 */
export const CHARACTER_MOVEMENT_SPEED = 150 as const;

// ============================================================================
// Level Bonus Constants
// ============================================================================

/**
 * Movement speed bonus per level (percentage).
 * 
 * PRD specifies faster movement speed as a passive bonus when leveling up.
 * Each level beyond level 1 increases movement speed by this percentage.
 * Example: Level 2 = +5%, Level 3 = +10%, Level 4 = +15%
 * 
 * @see docs/prd.md#Progression-&-Economy - Level-Up Bonuses (FR13)
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonus system
 */
export const LEVEL_BONUS_MOVEMENT_SPEED_PERCENT = 5 as const;

/**
 * Event spawn interval reduction per level (percentage).
 * 
 * PRD specifies longer device battery life (events spawn less frequently) as a passive bonus.
 * Each level beyond level 1 increases the spawn interval by this percentage.
 * Longer interval = less frequent events = easier gameplay.
 * Example: Level 2 = +10% longer interval, Level 3 = +20% longer interval
 * 
 * @see docs/prd.md#Progression-&-Economy - Level-Up Bonuses (FR13)
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonus system
 */
export const LEVEL_BONUS_EVENT_SPAWN_REDUCTION_PERCENT = 10 as const;

/**
 * Starting coziness bonus per level (absolute value).
 * 
 * PRD specifies higher starting «Затишок» as a passive bonus when leveling up.
 * Each level beyond level 1 adds this value to the starting coziness.
 * Example: Level 1 = 60, Level 2 = 65, Level 3 = 70, Level 4 = 75
 * 
 * Note: Starting coziness is clamped to 0-100 range.
 * 
 * @see docs/prd.md#Progression-&-Economy - Level-Up Bonuses (FR13)
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonus system
 */
export const LEVEL_BONUS_STARTING_COZINESS = 5 as const;

/**
 * Coziness decay rate reduction per level (percentage).
 * 
 * PRD specifies slower «Затишок» decay rate as a passive bonus when leveling up.
 * Each level beyond level 1 reduces the decay rate by this percentage.
 * Slower decay = easier gameplay.
 * Example: Level 2 = -5% decay, Level 3 = -10% decay, Level 4 = -15% decay
 * 
 * Note: Decay rate cannot go below 0.
 * 
 * @see docs/prd.md#Progression-&-Economy - Level-Up Bonuses (FR13)
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonus system
 */
export const LEVEL_BONUS_DECAY_REDUCTION_PERCENT = 5 as const;

/**
 * Calculate movement speed with level bonuses and shop buffs applied.
 * 
 * Returns the movement speed with level-based bonuses and shop buffs applied.
 * Level 1 = base speed (no bonus)
 * Level 2+ = base speed + (level - 1) * percentage bonus
 * Shop buffs stack additively with level bonuses.
 * 
 * **Shop Buff Stacking (Story 3.4):**
 * Shop buffs stack additively with level bonuses.
 * Example: Level 2 (+5%) + Shop buff (+5%) = +10% total bonus
 * 
 * @param baseSpeed - Base movement speed in pixels per second
 * @param level - Player level (1-based)
 * @param shopBuffPercent - Optional shop buff percentage bonus (default: 0)
 * @returns Movement speed with bonuses applied
 * 
 * @example
 * ```typescript
 * const speed = getMovementSpeedWithBonuses(150, 2); // Returns 157.5 (150 * 1.05)
 * const speed = getMovementSpeedWithBonuses(150, 2, 5); // Returns 165 (150 * 1.10)
 * ```
 * 
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonus system
 * @see docs/sprint-artifacts/3-4-shop-system.md - Shop buff stacking (Story 3.4)
 */
export function getMovementSpeedWithBonuses(baseSpeed: number, level: number, shopBuffPercent: number = 0): number {
  let bonusMultiplier = 1;
  
  // Level bonus
  if (level > 1) {
    bonusMultiplier += ((level - 1) * LEVEL_BONUS_MOVEMENT_SPEED_PERCENT) / 100;
  }
  
  // Shop buff (stacks additively)
  if (shopBuffPercent > 0) {
    bonusMultiplier += shopBuffPercent / 100;
  }
  
  return baseSpeed * bonusMultiplier;
}

/**
 * Calculate event spawn interval with level bonuses applied.
 * 
 * Returns the event spawn interval with level-based bonuses applied.
 * Level 1 = base interval (no bonus)
 * Level 2+ = base interval + (level - 1) * percentage bonus (longer interval = less frequent)
 * 
 * **Shop Buff Stacking (Story 3.4):**
 * Shop buffs that affect event spawn rate will stack additively with level bonuses.
 * To extend this function for shop buffs, add an optional parameter:
 * `getEventSpawnIntervalWithBonuses(baseInterval, level, shopBuffPercent = 0)`
 * 
 * @param baseInterval - Base spawn interval in seconds
 * @param level - Player level (1-based)
 * @returns Spawn interval with bonuses applied (in seconds)
 * 
 * @example
 * ```typescript
 * const interval = getEventSpawnIntervalWithBonuses(3.5, 2); // Returns 3.85 (3.5 * 1.10)
 * const interval = getEventSpawnIntervalWithBonuses(3.5, 3); // Returns 4.2 (3.5 * 1.20)
 * ```
 * 
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonus system
 * @see docs/sprint-artifacts/3-4-shop-system.md - Shop buff stacking (Story 3.4)
 */
export function getEventSpawnIntervalWithBonuses(baseInterval: number, level: number): number {
  if (level <= 1) {
    return baseInterval; // No bonus for level 1
  }
  const bonusMultiplier = 1 + ((level - 1) * LEVEL_BONUS_EVENT_SPAWN_REDUCTION_PERCENT) / 100;
  return baseInterval * bonusMultiplier;
}

/**
 * Calculate starting coziness with level bonuses and shop buffs applied.
 * 
 * Returns the starting coziness value with level-based bonuses and shop buffs applied.
 * Level 1 = base coziness (no bonus)
 * Level 2+ = base coziness + (level - 1) * bonus amount
 * Shop buffs stack additively with level bonuses.
 * 
 * Result is clamped to 0-100 range.
 * 
 * **Shop Buff Stacking (Story 3.4):**
 * Shop buffs that increase starting coziness stack additively with level bonuses.
 * Example: Level 2 (+5) + Shop buff (+5) = +10 total starting coziness
 * 
 * @param baseCoziness - Base starting coziness (0-100)
 * @param level - Player level (1-based)
 * @param shopBuffAmount - Optional shop buff absolute bonus (default: 0)
 * @returns Starting coziness with bonuses applied (clamped to 0-100)
 * 
 * @example
 * ```typescript
 * const coziness = getStartingCozinessWithBonuses(60, 1); // Returns 60
 * const coziness = getStartingCozinessWithBonuses(60, 2); // Returns 65
 * const coziness = getStartingCozinessWithBonuses(60, 2, 5); // Returns 70
 * ```
 * 
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonus system
 * @see docs/sprint-artifacts/3-4-shop-system.md - Shop buff stacking (Story 3.4)
 */
export function getStartingCozinessWithBonuses(baseCoziness: number, level: number, shopBuffAmount: number = 0): number {
  let total = baseCoziness;
  
  // Level bonus
  if (level > 1) {
    total += (level - 1) * LEVEL_BONUS_STARTING_COZINESS;
  }
  
  // Shop buff (stacks additively)
  if (shopBuffAmount > 0) {
    total += shopBuffAmount;
  }
  
  return Math.max(0, Math.min(100, total)); // Clamp to 0-100 range
}

/**
 * Calculate coziness decay rate with level bonuses and shop buffs applied.
 * 
 * Returns the coziness decay rate with level-based bonuses and shop buffs applied.
 * Level 1 = base decay rate (no bonus)
 * Level 2+ = base decay rate - (level - 1) * percentage reduction
 * Shop buffs stack multiplicatively with level bonuses.
 * 
 * Result cannot go below 0.
 * 
 * **Shop Buff Stacking (Story 3.4):**
 * Shop buffs that reduce decay rate stack multiplicatively with level bonuses.
 * Example: Level 2 (-5%) + Shop buff (-5%) = ~-10% total reduction
 * 
 * @param baseDecay - Base decay rate per second
 * @param level - Player level (1-based)
 * @param shopBuffReductionPercent - Optional shop buff percentage reduction (default: 0)
 * @returns Decay rate with bonuses applied (cannot be negative)
 * 
 * @example
 * ```typescript
 * const decay = getCozinessDecayRateWithBonuses(0.5, 1); // Returns 0.5
 * const decay = getCozinessDecayRateWithBonuses(0.5, 2); // Returns 0.475 (0.5 * 0.95)
 * const decay = getCozinessDecayRateWithBonuses(0.5, 2, 5); // Returns ~0.45 (0.5 * 0.95 * 0.95)
 * ```
 * 
 * @see docs/sprint-artifacts/3-3-level-up-bonuses.md - Level bonus system
 * @see docs/sprint-artifacts/3-4-shop-system.md - Shop buff stacking (Story 3.4)
 */
export function getCozinessDecayRateWithBonuses(baseDecay: number, level: number, shopBuffReductionPercent: number = 0): number {
  let reductionMultiplier = 1;
  
  // Level bonus reduction
  if (level > 1) {
    reductionMultiplier *= (1 - ((level - 1) * LEVEL_BONUS_DECAY_REDUCTION_PERCENT) / 100);
  }
  
  // Shop buff reduction (stacks multiplicatively)
  if (shopBuffReductionPercent > 0) {
    reductionMultiplier *= (1 - shopBuffReductionPercent / 100);
  }
  
  const adjusted = baseDecay * reductionMultiplier;
  return Math.max(0, adjusted); // Ensure decay rate cannot go below 0
}

// ============================================================================
// Apartment Layout Constants
// ============================================================================

/**
 * Apartment boundaries for character movement constraints.
 * 
 * Defines the playable area where the character can move.
 * Coordinates are relative to the apartment container (0,0 = top-left).
 * 
 * Used by Character component (Story 2.3) for movement constraints.
 * 
 * @see docs/sprint-artifacts/2-2-apartment-layout-and-background-with-ukrainian-cozy-details.md
 */
export interface ApartmentBoundaries {
  /** Minimum X coordinate (left boundary) */
  minX: number;
  /** Maximum X coordinate (right boundary) */
  maxX: number;
  /** Minimum Y coordinate (top boundary) */
  minY: number;
  /** Maximum Y coordinate (bottom boundary) */
  maxY: number;
}

/**
 * Apartment boundaries configuration.
 * 
 * Defines the playable area as a percentage of the apartment container.
 * Actual pixel values will be calculated based on container size.
 * 
 * Boundaries:
 * - Left: 5% from left edge (padding for walls/furniture)
 * - Right: 95% from left edge (padding for walls/furniture)
 * - Top: 10% from top edge (padding for ceiling/HUD)
 * - Bottom: 90% from top edge (padding for floor/furniture)
 */
export const APARTMENT_BOUNDARIES: ApartmentBoundaries = {
  minX: 0.05,  // 5% from left
  maxX: 0.95,  // 95% from left
  minY: 0.10,  // 10% from top
  maxY: 0.90,  // 90% from top
} as const;

/**
 * Event object locations in the apartment.
 * 
 * Defines where events can spawn (phone, kettle, cat, candle positions).
 * Coordinates are relative to the apartment container (0,0 = top-left).
 * Values are percentages (0.0 to 1.0) for responsive positioning.
 * 
 * Used by EventManager (Story 2.4) for event spawning.
 * 
 * @see docs/sprint-artifacts/2-2-apartment-layout-and-background-with-ukrainian-cozy-details.md
 */
export interface EventLocations {
  /** Phone event location (living room, near sofa) */
  phone: { x: number; y: number };
  /** Kettle event location (kitchen, on counter) */
  kettle: { x: number; y: number };
  /** Cat event location (living room, floor area) */
  cat: { x: number; y: number };
  /** Candle event location (living room, near light sources) */
  candle: { x: number; y: number };
}

/**
 * Event object locations configuration.
 * 
 * Positions are defined as percentages of container dimensions:
 * - x: 0.0 = left edge, 1.0 = right edge
 * - y: 0.0 = top edge, 1.0 = bottom edge
 * 
 * Locations are positioned near furniture/objects where events make sense:
 * - Phone: Near sofa (living room)
 * - Kettle: On kitchen counter
 * - Cat: Floor area in living room
 * - Candle: Near light sources (living room)
 */
export const EVENT_LOCATIONS: EventLocations = {
  phone: { x: 0.25, y: 0.70 },   // Near sofa in living room
  kettle: { x: 0.75, y: 0.65 },   // On kitchen counter
  cat: { x: 0.40, y: 0.80 },      // Floor area in living room
  candle: { x: 0.30, y: 0.50 },   // Near light sources in living room
} as const;

// ============================================================================
// Interaction Constants
// ============================================================================

/**
 * Maximum distance in pixels for event interaction.
 * 
 * Players can interact with events when the character is within this range.
 * PRD specifies 50-100px distance. Default is 75px (middle value).
 * 
 * This range is used for both keyboard (E key) and mouse (click) interactions.
 * 
 * @see docs/prd.md#Core-Gameplay - FR2: Event Interaction
 * @see docs/sprint-artifacts/2-9-event-interaction-system.md
 */
export const INTERACTION_RANGE = 75 as const;


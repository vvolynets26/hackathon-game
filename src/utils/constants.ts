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

import type { EventPriority } from '../types/events';

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


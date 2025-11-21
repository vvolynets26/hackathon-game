/**
 * localStorage Utilities
 * 
 * Provides type-safe utilities for persisting and loading game data from localStorage.
 * Handles errors gracefully, validates data structures, and manages localStorage quota limits.
 * 
 * All localStorage keys follow the naming convention: `'hackathon-game:{key-name}'` in kebab-case.
 * 
 * @example
 * ```typescript
 * import { saveGameState, loadGameState } from './utils/localStorage';
 * 
 * // Save progression state
 * const progression: ProgressionState = { level: 1, xp: 0, ... };
 * saveGameState(progression);
 * 
 * // Load progression state
 * const loaded = loadGameState();
 * if (loaded) {
 *   // Use loaded state
 * }
 * ```
 */

import type { ProgressionState, EquippedItems } from '../types/progression';

/**
 * localStorage key constants following naming convention.
 * 
 * Format: `'hackathon-game:{key-name}'` in kebab-case.
 */
const STORAGE_KEYS = {
  PROGRESSION: 'hackathon-game:progression',
  EQUIPPED_ITEMS: 'hackathon-game:equipped-items',
} as const;

/**
 * Type guard to validate ProgressionState structure.
 * 
 * Checks that all required properties exist and have correct types.
 * 
 * @param data - Data to validate (parsed from JSON)
 * @returns true if data matches ProgressionState interface
 */
function isValidProgressionState(data: unknown): data is ProgressionState {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;

  if (
    typeof obj.level !== 'number' ||
    typeof obj.xp !== 'number' ||
    typeof obj.svitlyachky !== 'number' ||
    !Array.isArray(obj.purchasedItems) ||
    !obj.purchasedItems.every((item) => typeof item === 'string') ||
    typeof obj.equippedItems !== 'object' ||
    obj.equippedItems === null ||
    !Array.isArray(obj.achievements) ||
    !obj.achievements.every((achievement) => typeof achievement === 'string')
  ) {
    return false;
  }

  // Validate equippedItems structure
  const equippedItems = obj.equippedItems as Record<string, unknown>;
  return (
    (equippedItems.characterSkin === undefined ||
      typeof equippedItems.characterSkin === 'string') &&
    (equippedItems.cat === undefined || typeof equippedItems.cat === 'string') &&
    (equippedItems.candle === undefined ||
      typeof equippedItems.candle === 'string')
  );
}

/**
 * Type guard to validate EquippedItems structure.
 * 
 * Checks that the object has optional string properties for characterSkin, cat, and candle.
 * 
 * @param data - Data to validate (parsed from JSON)
 * @returns true if data matches EquippedItems interface
 */
function isValidEquippedItems(data: unknown): data is EquippedItems {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    (obj.characterSkin === undefined || typeof obj.characterSkin === 'string') &&
    (obj.cat === undefined || typeof obj.cat === 'string') &&
    (obj.candle === undefined || typeof obj.candle === 'string')
  );
}

/**
 * Saves progression state to localStorage.
 * 
 * Serializes ProgressionState to JSON and stores it under the key `'hackathon-game:progression'`.
 * Handles errors gracefully (quota limits, storage unavailable, etc.) and logs warnings in development.
 * 
 * @param state - ProgressionState to save
 * @returns void
 * 
 * @example
 * ```typescript
 * const progression: ProgressionState = {
 *   level: 5,
 *   xp: 1250,
 *   svitlyachky: 150,
 *   purchasedItems: ['skin-cozy-sweater'],
 *   equippedItems: { characterSkin: 'skin-cozy-sweater' },
 *   achievements: ['first-win']
 * };
 * saveGameState(progression);
 * ```
 */
export function saveGameState(state: ProgressionState): void {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEYS.PROGRESSION, serialized);
  } catch (error) {
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      if (import.meta.env.DEV) {
        console.warn(
          'localStorage quota exceeded. Cannot save progression state.',
          error
        );
      }
      return;
    }
    // Handle other errors (storage unavailable, etc.)
    if (import.meta.env.DEV) {
      console.warn('Failed to save progression state to localStorage.', error);
    }
  }
}

/**
 * Loads progression state from localStorage.
 * 
 * Deserializes JSON from localStorage key `'hackathon-game:progression'` and validates
 * the data structure. Returns null if data is not found, corrupted, or invalid.
 * 
 * @returns ProgressionState | null - The loaded progression state, or null if not found/invalid
 * 
 * @example
 * ```typescript
 * const loaded = loadGameState();
 * if (loaded) {
 *   // Use loaded state
 *   console.log(`Loaded level ${loaded.level} with ${loaded.xp} XP`);
 * } else {
 *   // Use default state
 *   console.log('No saved state found, using defaults');
 * }
 * ```
 */
export function loadGameState(): ProgressionState | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.PROGRESSION);
    if (serialized === null) {
      return null;
    }

    const parsed = JSON.parse(serialized);
    if (!isValidProgressionState(parsed)) {
      if (import.meta.env.DEV) {
        console.warn(
          'Invalid progression state structure in localStorage. Returning null.'
        );
      }
      return null;
    }

    return parsed;
  } catch (error) {
    // Handle JSON parse errors (corrupted data)
    if (error instanceof SyntaxError) {
      if (import.meta.env.DEV) {
        console.warn(
          'Failed to parse progression state from localStorage (corrupted data). Returning null.',
          error
        );
      }
      return null;
    }
    // Handle other errors (storage unavailable, etc.)
    if (import.meta.env.DEV) {
      console.warn('Failed to load progression state from localStorage.', error);
    }
    return null;
  }
}

/**
 * Saves equipped items to localStorage.
 * 
 * Serializes EquippedItems to JSON and stores it under the key `'hackathon-game:equipped-items'`.
 * Handles errors gracefully (quota limits, storage unavailable, etc.) and logs warnings in development.
 * 
 * @param items - EquippedItems to save
 * @returns void
 * 
 * @example
 * ```typescript
 * const equipped: EquippedItems = {
 *   characterSkin: 'skin-cozy-sweater',
 *   cat: 'cat-ginger',
 *   candle: 'candle-vintage'
 * };
 * saveEquippedItems(equipped);
 * ```
 */
export function saveEquippedItems(items: EquippedItems): void {
  try {
    const serialized = JSON.stringify(items);
    localStorage.setItem(STORAGE_KEYS.EQUIPPED_ITEMS, serialized);
  } catch (error) {
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      if (import.meta.env.DEV) {
        console.warn(
          'localStorage quota exceeded. Cannot save equipped items.',
          error
        );
      }
      return;
    }
    // Handle other errors (storage unavailable, etc.)
    if (import.meta.env.DEV) {
      console.warn('Failed to save equipped items to localStorage.', error);
    }
  }
}

/**
 * Loads equipped items from localStorage.
 * 
 * Deserializes JSON from localStorage key `'hackathon-game:equipped-items'` and validates
 * the data structure. Returns null if data is not found, corrupted, or invalid.
 * 
 * @returns EquippedItems | null - The loaded equipped items, or null if not found/invalid
 * 
 * @example
 * ```typescript
 * const loaded = loadEquippedItems();
 * if (loaded) {
 *   // Use loaded items
 *   console.log(`Equipped skin: ${loaded.characterSkin}`);
 * } else {
 *   // Use default (empty object)
 *   console.log('No equipped items found');
 * }
 * ```
 */
export function loadEquippedItems(): EquippedItems | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.EQUIPPED_ITEMS);
    if (serialized === null) {
      return null;
    }

    const parsed = JSON.parse(serialized);
    if (!isValidEquippedItems(parsed)) {
      if (import.meta.env.DEV) {
        console.warn(
          'Invalid equipped items structure in localStorage. Returning null.'
        );
      }
      return null;
    }

    return parsed;
  } catch (error) {
    // Handle JSON parse errors (corrupted data)
    if (error instanceof SyntaxError) {
      if (import.meta.env.DEV) {
        console.warn(
          'Failed to parse equipped items from localStorage (corrupted data). Returning null.',
          error
        );
      }
      return null;
    }
    // Handle other errors (storage unavailable, etc.)
    if (import.meta.env.DEV) {
      console.warn('Failed to load equipped items from localStorage.', error);
    }
    return null;
  }
}


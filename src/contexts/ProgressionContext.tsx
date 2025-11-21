/**
 * Progression Context
 * 
 * Provides React Context for player progression state management throughout the application.
 * Manages level, XP, currency («Світлячки»), purchased items, equipped cosmetics,
 * and achievements. Progression state persists across game sessions via localStorage
 * (localStorage integration will be added in Story 1.4).
 * 
 * @example
 * ```tsx
 * <ProgressionProvider>
 *   <App />
 * </ProgressionProvider>
 * 
 * // In a component:
 * const { progressionState, addXP, levelUp, purchaseItem } = useProgression();
 * ```
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ProgressionState } from '../types/progression';

/**
 * Default initial progression state.
 * 
 * Used when localStorage is not available or empty (localStorage integration in Story 1.4).
 * - level: 1 (starting level)
 * - xp: 0 (no experience initially)
 * - svitlyachky: 0 (no currency initially)
 * - purchasedItems: [] (no items purchased)
 * - equippedItems: {} (no items equipped)
 * - achievements: [] (no achievements unlocked)
 */
const DEFAULT_PROGRESSION_STATE: ProgressionState = {
  level: 1,
  xp: 0,
  svitlyachky: 0,
  purchasedItems: [],
  equippedItems: {},
  achievements: [],
};

/**
 * Context value interface for ProgressionContext.
 * 
 * Provides the current progression state and update functions for modifying state.
 * All update functions use functional updates to avoid stale closures.
 * 
 * @property progressionState - Current progression state
 * @property addXP - Add experience points (may trigger level up)
 * @property levelUp - Increment player level
 * @property addSvitlyachky - Add currency («Світлячки»)
 * @property purchaseItem - Add item ID to purchasedItems array
 * @property equipItem - Equip a cosmetic item (characterSkin, cat, or candle)
 * @property unequipItem - Unequip a cosmetic item by slot
 * @property unlockAchievement - Add achievement ID to achievements array
 */
export interface ProgressionStateContextValue {
  /** Current progression state */
  progressionState: ProgressionState;
  /** Add experience points (may trigger level up) */
  addXP: (amount: number) => void;
  /** Increment player level */
  levelUp: () => void;
  /** Add currency («Світлячки») */
  addSvitlyachky: (amount: number) => void;
  /** Add item ID to purchasedItems array */
  purchaseItem: (itemId: string) => void;
  /** Equip a cosmetic item (characterSkin, cat, or candle) */
  equipItem: (slot: 'characterSkin' | 'cat' | 'candle', itemId: string) => void;
  /** Unequip a cosmetic item by slot */
  unequipItem: (slot: 'characterSkin' | 'cat' | 'candle') => void;
  /** Add achievement ID to achievements array */
  unlockAchievement: (achievementId: string) => void;
}

/**
 * Progression Context instance.
 * 
 * Created with null initial value - must be used within ProgressionProvider.
 */
const ProgressionContext = createContext<ProgressionStateContextValue | null>(null);

/**
 * ProgressionProvider component.
 * 
 * Wraps children with ProgressionContext provider, managing progression state using useState.
 * Provides update functions for all progression state properties.
 * 
 * Note: localStorage integration will be added in Story 1.4. For now, uses default values.
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap
 */
export function ProgressionProvider({ children }: { children: ReactNode }) {
  const [progressionState, setProgressionState] = useState<ProgressionState>(
    DEFAULT_PROGRESSION_STATE
  );

  // Update functions using functional updates to avoid stale closures
  const addXP = useCallback((amount: number) => {
    // Validate amount is non-negative
    if (amount < 0) {
      if (import.meta.env.DEV) {
        console.warn('Cannot add negative XP. Amount will be clamped to 0.');
      }
      return;
    }
    setProgressionState((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  }, []);

  const levelUp = useCallback(() => {
    setProgressionState((prev) => ({
      ...prev,
      level: Math.max(1, prev.level + 1), // Ensure level is at least 1
    }));
  }, []);

  const addSvitlyachky = useCallback((amount: number) => {
    // Validate amount is non-negative
    if (amount < 0) {
      if (import.meta.env.DEV) {
        console.warn('Cannot add negative currency. Amount will be clamped to 0.');
      }
      return;
    }
    setProgressionState((prev) => ({
      ...prev,
      svitlyachky: prev.svitlyachky + amount,
    }));
  }, []);

  const purchaseItem = useCallback((itemId: string) => {
    setProgressionState((prev) => {
      // Avoid duplicates
      if (prev.purchasedItems.includes(itemId)) {
        return prev;
      }
      return {
        ...prev,
        purchasedItems: [...prev.purchasedItems, itemId],
      };
    });
  }, []);

  const equipItem = useCallback(
    (slot: 'characterSkin' | 'cat' | 'candle', itemId: string) => {
      setProgressionState((prev) => ({
        ...prev,
        equippedItems: {
          ...prev.equippedItems,
          [slot]: itemId,
        },
      }));
    },
    []
  );

  const unequipItem = useCallback((slot: 'characterSkin' | 'cat' | 'candle') => {
    setProgressionState((prev) => {
      const { [slot]: _, ...rest } = prev.equippedItems;
      return {
        ...prev,
        equippedItems: rest,
      };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setProgressionState((prev) => {
      // Avoid duplicates
      if (prev.achievements.includes(achievementId)) {
        return prev;
      }
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
  }, []);

  const value: ProgressionStateContextValue = {
    progressionState,
    addXP,
    levelUp,
    addSvitlyachky,
    purchaseItem,
    equipItem,
    unequipItem,
    unlockAchievement,
  };

  return (
    <ProgressionContext.Provider value={value}>
      {children}
    </ProgressionContext.Provider>
  );
}

/**
 * Custom hook to access ProgressionContext.
 * 
 * Returns the progression state context value. Throws an error if used outside ProgressionProvider.
 * 
 * @returns ProgressionStateContextValue - The progression state and update functions
 * @throws Error if used outside ProgressionProvider
 * 
 * @example
 * ```tsx
 * const { progressionState, addXP, purchaseItem } = useProgression();
 * ```
 */
export function useProgression(): ProgressionStateContextValue {
  const context = useContext(ProgressionContext);
  if (!context) {
    throw new Error('useProgression must be used within a ProgressionProvider');
  }
  return context;
}


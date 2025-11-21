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

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import type { ProgressionState } from '../types/progression';
import { ProgressionSystem } from '../core/ProgressionSystem';
import { saveGameState, loadGameState } from '../utils/localStorage';
import { SHOP_ITEMS } from '../utils/constants';

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
  /** Purchase an item from the shop (validates currency and deducts cost) */
  purchaseItem: (itemId: string) => { success: boolean; error?: string };
  /** Equip a cosmetic item (validates purchase and cosmetic type) */
  equipItem: (slot: 'characterSkin' | 'cat' | 'candle', itemId: string) => { success: boolean; error?: string };
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
  // Load initial state from localStorage on mount
  const [progressionState, setProgressionState] = useState<ProgressionState>(() => {
    const loaded = loadGameState();
    return loaded ?? DEFAULT_PROGRESSION_STATE;
  });

  // Ref to access current state synchronously (for purchaseItem validation)
  const progressionStateRef = useRef<ProgressionState>(progressionState);
  
  // Update ref when state changes
  useEffect(() => {
    progressionStateRef.current = progressionState;
  }, [progressionState]);

  // ProgressionSystem instance for XP/level calculations
  const progressionSystemRef = useRef<ProgressionSystem | null>(null);
  if (!progressionSystemRef.current) {
    progressionSystemRef.current = new ProgressionSystem();
  }

  // Save to localStorage whenever progression state changes
  useEffect(() => {
    saveGameState(progressionState);
  }, [progressionState]);

  // Update functions using functional updates to avoid stale closures
  const addXP = useCallback((amount: number) => {
    // Validate amount is non-negative
    if (amount < 0) {
      if (import.meta.env.DEV) {
        console.warn('Cannot add negative XP. Amount will be clamped to 0.');
      }
      return;
    }
    
    setProgressionState((prev) => {
      // Calculate new XP
      const newXP = prev.xp + amount;
      
      // Check for level up using ProgressionSystem
      if (progressionSystemRef.current) {
        const levelUpResult = progressionSystemRef.current.checkLevelUp(newXP, prev.level);
        
        // If level up occurred, update level and check level-based achievements (Story 3.5)
        if (levelUpResult.leveledUp) {
          const newState = {
            ...prev,
            xp: newXP,
            level: levelUpResult.newLevel,
          };
          
          // Check level-based achievements (Story 3.5)
          // Note: gameState not required for level-based achievements
          const newlyUnlocked = progressionSystemRef.current.checkAchievements(newState);
          // Unlock each newly unlocked achievement
          newlyUnlocked.forEach((achievementId) => {
            // Use setTimeout to ensure state update happens first
            setTimeout(() => {
              setProgressionState((current) => {
                // Avoid duplicates
                if (current.achievements.includes(achievementId)) {
                  return current;
                }
                return {
                  ...current,
                  achievements: [...current.achievements, achievementId],
                };
              });
            }, 0);
          });
          
          return newState;
        }
      }
      
      // No level up, just update XP
      return {
        ...prev,
        xp: newXP,
      };
    });
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

  const purchaseItem = useCallback((itemId: string): { success: boolean; error?: string } => {
    const item = SHOP_ITEMS.find((shopItem) => shopItem.id === itemId);
    
    // Validate item exists
    if (!item) {
      if (import.meta.env.DEV) {
        console.warn(`Cannot purchase item: Item "${itemId}" not found in shop.`);
      }
      return { success: false, error: 'Item not found' };
    }
    
    // Check current state synchronously using ref
    const currentState = progressionStateRef.current;
    
    // Avoid duplicates
    if (currentState.purchasedItems.includes(itemId)) {
      if (import.meta.env.DEV) {
        console.warn(`Cannot purchase item: Item "${itemId}" already purchased.`);
      }
      return { success: false, error: 'Already purchased' };
    }
    
    // Validate currency
    if (currentState.svitlyachky < item.price) {
      if (import.meta.env.DEV) {
        console.warn(`Cannot purchase item: Insufficient currency. Need ${item.price}, have ${currentState.svitlyachky}.`);
      }
      return { success: false, error: 'Insufficient currency' };
    }
    
    // Deduct currency and add item to purchasedItems
    setProgressionState((prev) => {
      // Double-check state hasn't changed (race condition protection)
      if (prev.purchasedItems.includes(itemId) || prev.svitlyachky < item.price) {
        return prev;
      }
      
      return {
        ...prev,
        svitlyachky: prev.svitlyachky - item.price,
        purchasedItems: [...prev.purchasedItems, itemId],
      };
    });
    
    return { success: true };
  }, []);

  const equipItem = useCallback(
    (slot: 'characterSkin' | 'cat' | 'candle', itemId: string): { success: boolean; error?: string } => {
      const item = SHOP_ITEMS.find((shopItem) => shopItem.id === itemId);
      
      // Validate item exists
      if (!item) {
        if (import.meta.env.DEV) {
          console.warn(`Cannot equip item: Item "${itemId}" not found in shop.`);
        }
        return { success: false, error: 'Item not found' };
      }
      
      // Validate item is cosmetic type (buffs don't need equipping)
      if (item.type !== 'cosmetic') {
        if (import.meta.env.DEV) {
          console.warn(`Cannot equip item: Item "${itemId}" is not a cosmetic item (type: ${item.type}).`);
        }
        return { success: false, error: 'Item is not cosmetic' };
      }
      
      // Check current state synchronously using ref
      const currentState = progressionStateRef.current;
      
      // Validate item is purchased
      if (!currentState.purchasedItems.includes(itemId)) {
        if (import.meta.env.DEV) {
          console.warn(`Cannot equip item: Item "${itemId}" is not purchased.`);
        }
        return { success: false, error: 'Item not purchased' };
      }
      
      // Equip item
      setProgressionState((prev) => {
        // Double-check item is still purchased (race condition protection)
        if (!prev.purchasedItems.includes(itemId)) {
          return prev;
        }
        
        return {
          ...prev,
          equippedItems: {
            ...prev.equippedItems,
            [slot]: itemId,
          },
        };
      });
      
      return { success: true };
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


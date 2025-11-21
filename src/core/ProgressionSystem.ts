/**
 * Progression System
 * 
 * Provides pure functions for XP and level calculations.
 * This class has no React dependencies and can be used in any context.
 * 
 * Features:
 * - XP calculation from score (XP = floor(score / 10))
 * - Level up checking with configurable thresholds
 * - XP progress calculation for UI display
 * - Support for multiple level ups in a single session
 * - Currency («Світлячки») calculation based on performance
 * 
 * @example
 * ```typescript
 * const progressionSystem = new ProgressionSystem();
 * const xp = progressionSystem.calculateXP(200); // Returns 20
 * const levelUp = progressionSystem.checkLevelUp(100, 1); // Returns { leveledUp: true, newLevel: 2 }
 * ```
 */

import { XP_LEVEL_THRESHOLDS, getXPThreshold, SVITLYACHKY_REWARDS, ACHIEVEMENTS } from '../utils/constants';
import type { GameState } from '../types/game';
import type { ProgressionState } from '../types/progression';

/**
 * Result of level up check.
 * 
 * @property leveledUp - Whether a level up occurred
 * @property newLevel - The new level after level up (or current level if no level up)
 */
export interface LevelUpResult {
  /** Whether a level up occurred */
  leveledUp: boolean;
  /** The new level after level up (or current level if no level up) */
  newLevel: number;
}

/**
 * ProgressionSystem class for XP and level calculations.
 * 
 * Provides pure functions for:
 * - Calculating XP from score
 * - Checking for level ups
 * - Calculating XP progress to next level
 * - Getting XP thresholds for levels
 * - Calculating currency («Світлячки») rewards
 * 
 * All methods are pure functions with no side effects.
 */
export class ProgressionSystem {
  /**
   * Calculates XP from score.
   * 
   * Formula: XP = floor(total_score / 10)
   * 
   * @param score - Total score from the evening
   * @returns XP earned (always non-negative)
   * 
   * @example
   * ```typescript
   * const xp = progressionSystem.calculateXP(200); // Returns 20
   * const xp2 = progressionSystem.calculateXP(99); // Returns 9 (floor)
   * ```
   */
  calculateXP(score: number): number {
    // Ensure score is non-negative
    const validScore = Math.max(0, score);
    // Calculate XP: floor(score / 10)
    return Math.floor(validScore / 10);
  }

  /**
   * Checks if a level up occurred based on current XP and level.
   * 
   * Compares current XP against level thresholds to determine if player
   * has enough XP to reach the next level. Handles multiple level ups
   * if XP is high enough (e.g., 0 XP → 350 XP should level to 3).
   * 
   * Level thresholds:
   * - Level 1: 0 XP
   * - Level 2: 100 XP
   * - Level 3: 300 XP
   * - Level 4: 600 XP
   * 
   * @param currentXP - Current total XP
   * @param currentLevel - Current player level (1-based)
   * @returns LevelUpResult with leveledUp boolean and newLevel number
   * 
   * @example
   * ```typescript
   * // Level up from 1 to 2
   * const result = progressionSystem.checkLevelUp(100, 1);
   * // Returns { leveledUp: true, newLevel: 2 }
   * 
   * // Multiple level ups (0 XP → 350 XP)
   * const result2 = progressionSystem.checkLevelUp(350, 1);
   * // Returns { leveledUp: true, newLevel: 3 }
   * 
   * // No level up
   * const result3 = progressionSystem.checkLevelUp(50, 1);
   * // Returns { leveledUp: false, newLevel: 1 }
   * ```
   */
  checkLevelUp(currentXP: number, currentLevel: number): LevelUpResult {
    // Ensure inputs are valid
    const validXP = Math.max(0, currentXP);
    const validLevel = Math.max(1, currentLevel);

    // Find the highest level the player can reach with current XP
    // Iterate through thresholds in reverse to find the highest level
    let newLevel = validLevel;
    
    for (let i = XP_LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      const threshold = XP_LEVEL_THRESHOLDS[i];
      if (validXP >= threshold && i + 1 > validLevel) {
        newLevel = i + 1;
        break;
      }
    }

    // Check if level up occurred
    const leveledUp = newLevel > validLevel;

    return {
      leveledUp,
      newLevel,
    };
  }

  /**
   * Gets the XP threshold required for the next level.
   * 
   * Returns the minimum XP needed to reach the level after the current one.
   * For max level, returns the current level's threshold (no next level).
   * 
   * @param level - Current level (1-based)
   * @returns XP threshold for next level, or current level threshold if at max
   * 
   * @example
   * ```typescript
   * const threshold = progressionSystem.getXPForNextLevel(1); // Returns 100
   * const threshold2 = progressionSystem.getXPForNextLevel(2); // Returns 300
   * const threshold3 = progressionSystem.getXPForNextLevel(4); // Returns 600 (max level)
   * ```
   */
  getXPForNextLevel(level: number): number {
    const validLevel = Math.max(1, level);
    const nextLevel = validLevel + 1;
    
    // If next level is beyond thresholds, return current level threshold
    if (nextLevel > XP_LEVEL_THRESHOLDS.length) {
      return getXPThreshold(validLevel);
    }
    
    return getXPThreshold(nextLevel);
  }

  /**
   * Calculates XP progress to next level (0-1 value).
   * 
   * Returns a value between 0 and 1 representing progress to the next level:
   * - 0 = no progress (at current level threshold)
   * - 1 = ready to level up (at next level threshold)
   * 
   * Formula: (currentXP - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)
   * 
   * @param currentXP - Current total XP
   * @param level - Current player level (1-based)
   * @returns Progress value between 0 and 1 (clamped)
   * 
   * @example
   * ```typescript
   * // At level 1 with 0 XP
   * const progress = progressionSystem.getXPProgress(0, 1); // Returns 0
   * 
   * // At level 1 with 50 XP (halfway to level 2)
   * const progress2 = progressionSystem.getXPProgress(50, 1); // Returns 0.5
   * 
   * // At level 1 with 100 XP (ready for level 2)
   * const progress3 = progressionSystem.getXPProgress(100, 1); // Returns 1.0
   * 
   * // At max level
   * const progress4 = progressionSystem.getXPProgress(600, 4); // Returns 1.0
   * ```
   */
  getXPProgress(currentXP: number, level: number): number {
    const validXP = Math.max(0, currentXP);
    const validLevel = Math.max(1, level);

    // Get current level threshold
    const currentThreshold = getXPThreshold(validLevel);
    
    // Get next level threshold
    const nextThreshold = this.getXPForNextLevel(validLevel);
    
    // If at max level or thresholds are equal, return 1.0 (full progress)
    if (nextThreshold === currentThreshold) {
      return 1.0;
    }
    
    // Calculate progress: (currentXP - currentThreshold) / (nextThreshold - currentThreshold)
    const progress = (validXP - currentThreshold) / (nextThreshold - currentThreshold);
    
    // Clamp to 0-1 range
    return Math.max(0, Math.min(1, progress));
  }

  /**
   * Calculates «Світлячки» currency earned based on final coziness and survival.
   * 
   * Currency calculation formula (PRD FR15):
   * - Base reward: 1 «Світлячок» if survived (Затишок > 0 at end)
   * - Performance bonus: +1 if final Затишок ≥ 50
   * - Performance bonus: +1 if final Затишок ≥ 80
   * - Maximum: 3 «Світлячки» per evening (perfect run)
   * 
   * @param finalCoziness - Final coziness value at end of evening (0-100)
   * @param survived - Whether player survived (Затишок > 0 at end)
   * @returns Currency earned (0-3 «Світлячки»)
   * 
   * @example
   * ```typescript
   * // Perfect run: survived with coziness 80
   * const currency = progressionSystem.calculateSvitlyachky(80, true);
   * // Returns 3 (base + bonus_50 + bonus_80)
   * 
   * // Good run: survived with coziness 50
   * const currency2 = progressionSystem.calculateSvitlyachky(50, true);
   * // Returns 2 (base + bonus_50)
   * 
   * // Basic survival: survived with coziness 30
   * const currency3 = progressionSystem.calculateSvitlyachky(30, true);
   * // Returns 1 (base only)
   * 
   * // Didn't survive: coziness 0
   * const currency4 = progressionSystem.calculateSvitlyachky(0, false);
   * // Returns 0
   * ```
   */
  calculateSvitlyachky(finalCoziness: number, survived: boolean): number {
    // If player didn't survive, no currency earned
    if (!survived || finalCoziness <= 0) {
      return 0;
    }

    // Base reward for surviving
    let currency = SVITLYACHKY_REWARDS.base;

    // Performance bonus: +1 if final Затишок ≥ 50
    if (finalCoziness >= 50) {
      currency += SVITLYACHKY_REWARDS.bonus_50;
    }

    // Performance bonus: +1 if final Затишок ≥ 80
    if (finalCoziness >= 80) {
      currency += SVITLYACHKY_REWARDS.bonus_80;
    }

    // Maximum is 3 (base + bonus_50 + bonus_80)
    // This is already enforced by the logic above, but we'll return it explicitly
    return currency;
  }

  /**
   * Checks achievement conditions and returns newly unlocked achievement IDs.
   * 
   * Evaluates all achievement conditions based on game state and progression state.
   * Only returns achievements that are not already unlocked.
   * 
   * Achievement conditions:
   * - 'coziness': Checks if minimum coziness during evening >= conditionValue (requires gameState)
   * - 'events': Checks if resolved events count >= conditionValue (requires gameState)
   * - 'level': Checks if current level >= conditionValue (only requires progressionState)
   * 
   * @param progressionState - Current progression state (for level and already unlocked achievements)
   * @param gameState - Optional game state (for coziness and events tracking, required for coziness/events achievements)
   * @returns Array of newly unlocked achievement IDs
   * 
   * @example
   * ```typescript
   * // Check all achievements (requires gameState for coziness/events)
   * const newAchievements = progressionSystem.checkAchievements(progressionState, gameState);
   * 
   * // Check only level-based achievements (gameState not required)
   * const levelAchievements = progressionSystem.checkAchievements(progressionState);
   * ```
   */
  checkAchievements(progressionState: ProgressionState, gameState?: GameState): string[] {
    const newlyUnlocked: string[] = [];
    const alreadyUnlocked = new Set(progressionState.achievements);

    // Check each achievement condition
    for (const achievement of ACHIEVEMENTS) {
      // Skip if already unlocked
      if (alreadyUnlocked.has(achievement.id)) {
        continue;
      }

      let conditionMet = false;

      // Check condition based on type
      switch (achievement.conditionType) {
        case 'coziness':
          // Check if minimum coziness during evening >= conditionValue
          if (!gameState) {
            // Skip if gameState not provided (can't check coziness achievement)
            continue;
          }
          conditionMet = gameState.achievementProgress.minCoziness >= achievement.conditionValue;
          break;

        case 'events':
          // Check if resolved events count >= conditionValue
          if (!gameState) {
            // Skip if gameState not provided (can't check events achievement)
            continue;
          }
          conditionMet = gameState.achievementProgress.resolvedEventsCount >= achievement.conditionValue;
          break;

        case 'level':
          // Check if current level >= conditionValue
          conditionMet = progressionState.level >= achievement.conditionValue;
          break;

        default:
          // Unknown condition type, skip
          if (import.meta.env.DEV) {
            console.warn(`Unknown achievement condition type: ${(achievement as any).conditionType}`);
          }
          continue;
      }

      // If condition is met, add to newly unlocked list
      if (conditionMet) {
        newlyUnlocked.push(achievement.id);
      }
    }

    return newlyUnlocked;
  }
}


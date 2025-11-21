/**
 * ProgressionSystem Tests
 * 
 * Unit tests for ProgressionSystem class covering:
 * - XP calculation from score
 * - Level up checking
 * - XP progress calculation
 * - Edge cases (level 1, max level, exact thresholds, multiple level ups)
 */

import { describe, it, expect } from 'vitest';
import { ProgressionSystem } from './ProgressionSystem';

describe('ProgressionSystem', () => {
  let progressionSystem: ProgressionSystem;

  beforeEach(() => {
    progressionSystem = new ProgressionSystem();
  });

  describe('calculateXP', () => {
    it('should calculate XP correctly: 200 points = 20 XP', () => {
      expect(progressionSystem.calculateXP(200)).toBe(20);
    });

    it('should calculate XP correctly: 150 points = 15 XP', () => {
      expect(progressionSystem.calculateXP(150)).toBe(15);
    });

    it('should calculate XP correctly: 99 points = 9 XP (floor function)', () => {
      expect(progressionSystem.calculateXP(99)).toBe(9);
    });

    it('should calculate XP correctly: 0 points = 0 XP', () => {
      expect(progressionSystem.calculateXP(0)).toBe(0);
    });

    it('should handle negative score gracefully (clamp to 0)', () => {
      expect(progressionSystem.calculateXP(-10)).toBe(0);
    });

    it('should calculate XP correctly: 10 points = 1 XP', () => {
      expect(progressionSystem.calculateXP(10)).toBe(1);
    });

    it('should calculate XP correctly: 9 points = 0 XP (floor)', () => {
      expect(progressionSystem.calculateXP(9)).toBe(0);
    });
  });

  describe('checkLevelUp', () => {
    it('should detect level up: 100 XP = level 2', () => {
      const result = progressionSystem.checkLevelUp(100, 1);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(2);
    });

    it('should detect level up: 300 XP = level 3', () => {
      const result = progressionSystem.checkLevelUp(300, 1);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(3);
    });

    it('should detect level up: 600 XP = level 4', () => {
      const result = progressionSystem.checkLevelUp(600, 1);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(4);
    });

    it('should not level up: 50 XP stays at level 1', () => {
      const result = progressionSystem.checkLevelUp(50, 1);
      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(1);
    });

    it('should handle exact threshold matches: 100 XP exactly = level 2', () => {
      const result = progressionSystem.checkLevelUp(100, 1);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(2);
    });

    it('should handle multiple level ups in single session: 0 XP → 350 XP should level to 3', () => {
      const result = progressionSystem.checkLevelUp(350, 1);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(3);
    });

    it('should handle level up from level 2 to 3: 300 XP at level 2', () => {
      const result = progressionSystem.checkLevelUp(300, 2);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(3);
    });

    it('should handle level up from level 3 to 4: 600 XP at level 3', () => {
      const result = progressionSystem.checkLevelUp(600, 3);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(4);
    });

    it('should not level up beyond max level: 700 XP at level 4', () => {
      const result = progressionSystem.checkLevelUp(700, 4);
      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(4);
    });

    it('should handle edge case: level 1 with 0 XP', () => {
      const result = progressionSystem.checkLevelUp(0, 1);
      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(1);
    });

    it('should handle invalid level gracefully: clamp to 1', () => {
      const result = progressionSystem.checkLevelUp(100, 0);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(2);
    });

    it('should handle negative XP gracefully: clamp to 0', () => {
      const result = progressionSystem.checkLevelUp(-10, 1);
      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(1);
    });
  });

  describe('getXPForNextLevel', () => {
    it('should return XP threshold for next level: level 1 returns 100', () => {
      expect(progressionSystem.getXPForNextLevel(1)).toBe(100);
    });

    it('should return XP threshold for next level: level 2 returns 300', () => {
      expect(progressionSystem.getXPForNextLevel(2)).toBe(300);
    });

    it('should return XP threshold for next level: level 3 returns 600', () => {
      expect(progressionSystem.getXPForNextLevel(3)).toBe(600);
    });

    it('should return current level threshold for max level: level 4 returns 600', () => {
      expect(progressionSystem.getXPForNextLevel(4)).toBe(600);
    });

    it('should handle level beyond max: returns max threshold', () => {
      expect(progressionSystem.getXPForNextLevel(5)).toBe(600);
    });

    it('should handle invalid level gracefully: clamp to 1', () => {
      expect(progressionSystem.getXPForNextLevel(0)).toBe(100);
    });
  });

  describe('getXPProgress', () => {
    it('should return 0 progress at level 1 with 0 XP', () => {
      expect(progressionSystem.getXPProgress(0, 1)).toBe(0);
    });

    it('should return 0.5 progress at level 1 with 50 XP (halfway to level 2)', () => {
      expect(progressionSystem.getXPProgress(50, 1)).toBe(0.5);
    });

    it('should return 1.0 progress at level 1 with 100 XP (ready for level 2)', () => {
      expect(progressionSystem.getXPProgress(100, 1)).toBe(1.0);
    });

    it('should return 0.5 progress at level 2 with 200 XP (halfway to level 3)', () => {
      // Level 2 threshold: 100, Level 3 threshold: 300
      // Progress: (200 - 100) / (300 - 100) = 100 / 200 = 0.5
      expect(progressionSystem.getXPProgress(200, 2)).toBe(0.5);
    });

    it('should return 1.0 progress at level 2 with 300 XP (ready for level 3)', () => {
      expect(progressionSystem.getXPProgress(300, 2)).toBe(1.0);
    });

    it('should return 1.0 progress at max level', () => {
      expect(progressionSystem.getXPProgress(600, 4)).toBe(1.0);
    });

    it('should return 1.0 progress beyond max level threshold', () => {
      expect(progressionSystem.getXPProgress(700, 4)).toBe(1.0);
    });

    it('should clamp progress to 0-1 range: negative XP returns 0', () => {
      expect(progressionSystem.getXPProgress(-10, 1)).toBe(0);
    });

    it('should handle exact threshold matches: 100 XP at level 1 returns 1.0', () => {
      expect(progressionSystem.getXPProgress(100, 1)).toBe(1.0);
    });

    it('should handle edge case: level 1 with 25 XP', () => {
      // Progress: (25 - 0) / (100 - 0) = 25 / 100 = 0.25
      expect(progressionSystem.getXPProgress(25, 1)).toBe(0.25);
    });

    it('should handle edge case: level 1 with 75 XP', () => {
      // Progress: (75 - 0) / (100 - 0) = 75 / 100 = 0.75
      expect(progressionSystem.getXPProgress(75, 1)).toBe(0.75);
    });
  });

  describe('calculateSvitlyachky', () => {
    it('should calculate base reward: survived with Затишок > 0 = 1 «Світлячок»', () => {
      expect(progressionSystem.calculateSvitlyachky(30, true)).toBe(1);
    });

    it('should calculate performance bonus: final Затишок ≥ 50 = +1 bonus', () => {
      expect(progressionSystem.calculateSvitlyachky(50, true)).toBe(2);
    });

    it('should calculate performance bonus: final Затишок ≥ 80 = +1 bonus', () => {
      expect(progressionSystem.calculateSvitlyachky(80, true)).toBe(3);
    });

    it('should calculate maximum: perfect run (Затишок ≥ 80) = 3 «Світлячки»', () => {
      expect(progressionSystem.calculateSvitlyachky(100, true)).toBe(3);
    });

    it('should return 0 for edge case: Затишок = 0 (didn\'t survive)', () => {
      expect(progressionSystem.calculateSvitlyachky(0, false)).toBe(0);
    });

    it('should return 0 for edge case: survived = false even with coziness > 0', () => {
      expect(progressionSystem.calculateSvitlyachky(50, false)).toBe(0);
    });

    it('should return 1 for edge case: Затишок = 49 (survived but no bonuses)', () => {
      expect(progressionSystem.calculateSvitlyachky(49, true)).toBe(1);
    });

    it('should return 2 for edge case: Затишок = 50 (exact threshold)', () => {
      expect(progressionSystem.calculateSvitlyachky(50, true)).toBe(2);
    });

    it('should return 2 for edge case: Затишок = 79 (just below bonus)', () => {
      expect(progressionSystem.calculateSvitlyachky(79, true)).toBe(2);
    });

    it('should return 3 for edge case: Затишок = 80 (exact threshold)', () => {
      expect(progressionSystem.calculateSvitlyachky(80, true)).toBe(3);
    });

    it('should return 3 for edge case: Затишок = 100 (maximum)', () => {
      expect(progressionSystem.calculateSvitlyachky(100, true)).toBe(3);
    });

    it('should handle negative coziness gracefully: return 0', () => {
      expect(progressionSystem.calculateSvitlyachky(-10, true)).toBe(0);
    });

    it('should handle coziness above 100: still return max 3', () => {
      expect(progressionSystem.calculateSvitlyachky(150, true)).toBe(3);
    });
  });
});


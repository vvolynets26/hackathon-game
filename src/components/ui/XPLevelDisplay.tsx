/**
 * XPLevelDisplay Component
 * 
 * Displays the player's level and XP progress in the HUD.
 * Reads level and XP from ProgressionContext and displays them with an XP bar.
 * 
 * Features:
 * - Level display: "Рівень {level}" (Ukrainian)
 * - XP bar showing progress to next level (0-1 fill)
 * - Smooth CSS transitions for XP bar updates
 * - Real-time updates when ProgressionContext state changes
 * - Styled according to UX design (light text, warm accents)
 * 
 * @example
 * ```tsx
 * <XPLevelDisplay />
 * ```
 */

import { useProgression } from '../../contexts/ProgressionContext';
import { ProgressionSystem } from '../../core/ProgressionSystem';
import { TRANSLATIONS } from '../../utils/translations';
import styles from './XPLevelDisplay.module.css';
import { useRef, useEffect, useMemo } from 'react';

/**
 * XPLevelDisplay component.
 * 
 * Displays level and XP progress reading from ProgressionContext.
 * Updates automatically when ProgressionContext updates (React re-render).
 * 
 * @returns React element representing the XP/Level display
 */
export function XPLevelDisplay() {
  const { progressionState } = useProgression();
  const { level, xp } = progressionState;
  
  // ProgressionSystem instance for XP progress calculation
  // Use useMemo to create instance once and reuse it
  const progressionSystem = useMemo(() => new ProgressionSystem(), []);
  
  // Calculate XP progress to next level (0-1 value)
  const xpProgress = progressionSystem.getXPProgress(xp, level);
  
  // Calculate XP bar fill percentage (0-100%)
  const xpBarFill = xpProgress * 100;
  
  // Track previous level for animation detection (preparation for Story 4.9)
  // This ref and effect prepare for pulse/glow animation when level changes
  // Animation implementation will be added in Story 4.9 (Main Menu System)
  const previousLevelRef = useRef<number>(level);
  useEffect(() => {
    // Detect level change (for future animation in Story 4.9)
    if (previousLevelRef.current !== level) {
      // Level changed - pulse/glow animation will be implemented in Story 4.9
      // For now, just update the ref to track level changes
      // CSS class for animation is prepared in XPLevelDisplay.module.css
      previousLevelRef.current = level;
    }
  }, [level]);
  
  return (
    <div className={styles.xpLevelDisplay}>
      {/* Level text: "Рівень {level}" (Ukrainian) */}
      <div className={styles.levelText}>
        {TRANSLATIONS.progression.level} {level}
      </div>
      
      {/* XP bar container */}
      <div className={styles.xpBarContainer}>
        {/* XP bar fill */}
        <div
          className={styles.xpBarFill}
          style={{
            width: `${xpBarFill}%`,
          }}
        />
      </div>
    </div>
  );
}


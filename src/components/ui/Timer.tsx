/**
 * Timer Component
 * 
 * Displays the evening timer in the HUD showing remaining time.
 * Reads timer value from GameContext and formats it as "MM:SS".
 * 
 * Features:
 * - Timer in "MM:SS" format (e.g., "01:30")
 * - Timer icon next to time display
 * - Timer updates every second (via GameContext updates)
 * - Optional color change when time < 10 seconds (red/orange)
 * - Ukrainian label: "Час:" before timer value
 * 
 * @example
 * ```tsx
 * <Timer />
 * ```
 */

import { useGame } from '../../contexts/GameContext';
import { TRANSLATIONS } from '../../utils/translations';
import styles from './Timer.module.css';

/**
 * Formats seconds to "MM:SS" format.
 * 
 * @param seconds - Time in seconds
 * @returns Formatted time string (e.g., "01:30")
 */
function formatTime(seconds: number): string {
  // Ensure non-negative
  const totalSeconds = Math.max(0, Math.floor(seconds));
  
  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  
  // Format as "MM:SS" with leading zeros
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

/**
 * Timer component.
 * 
 * Displays the evening timer reading from GameContext.
 * Updates automatically when GameContext updates (React re-render).
 * 
 * @returns React element representing the timer display
 */
export function Timer() {
  const { gameState } = useGame();
  const timeRemaining = gameState.timeRemaining;
  
  // Format time as "MM:SS"
  const formattedTime = formatTime(timeRemaining);
  
  // Determine if time is low (< 10 seconds) for color change
  const isLowTime = timeRemaining < 10 && timeRemaining > 0;
  
  return (
    <div className={styles.timer}>
      <span className={styles.icon}>⏱️</span>
      <span className={styles.label}>{TRANSLATIONS.gameplay.timer}:</span>
      <span className={`${styles.time} ${isLowTime ? styles.lowTime : ''}`}>
        {formattedTime}
      </span>
    </div>
  );
}


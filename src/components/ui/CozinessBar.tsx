/**
 * CozinessBar Component
 * 
 * Displays the «Затишок» (coziness) meter as a horizontal bar with gradient.
 * Reads coziness value from GameContext and displays it with a color gradient
 * that transitions from red (low) → yellow (medium) → green (high).
 * 
 * Features:
 * - Horizontal bar with gradient fill based on coziness value (0-100)
 * - Ukrainian label "Затишок" above the bar
 * - Optional value display (percentage)
 * - Smooth CSS transitions for value changes
 * - Gradient colors: Red #f44336 → Orange #ff9800 → Yellow #ffeb3b → Green #4caf50
 * 
 * @example
 * ```tsx
 * <CozinessBar />
 * ```
 */

import { useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { TRANSLATIONS } from '../../utils/translations';
import styles from './CozinessBar.module.css';

/**
 * Calculates gradient colors based on coziness value.
 * 
 * Gradient mapping:
 * - Low (0-33): Red #f44336 → Orange #ff9800
 * - Medium (34-66): Orange #ff9800 → Yellow #ffeb3b
 * - High (67-100): Yellow #ffeb3b → Green #4caf50
 * 
 * @param value - Coziness value (0-100)
 * @returns Object with start and end colors for gradient
 */
function getGradientColors(value: number): { start: string; end: string } {
  // Clamp value to valid range (0-100)
  const clamped = Math.max(0, Math.min(100, value));
  
  if (clamped <= 33) {
    // Low: Red → Orange
    const ratio = clamped / 33;
    return {
      start: '#f44336', // Red
      end: '#ff9800',   // Orange
    };
  } else if (clamped <= 66) {
    // Medium: Orange → Yellow
    const ratio = (clamped - 33) / 33;
    return {
      start: '#ff9800', // Orange
      end: '#ffeb3b',   // Yellow
    };
  } else {
    // High: Yellow → Green
    const ratio = (clamped - 66) / 34;
    return {
      start: '#ffeb3b', // Yellow
      end: '#4caf50',   // Green
    };
  }
}

/**
 * CozinessBar component.
 * 
 * Displays the coziness meter reading from GameContext.
 * Updates automatically when GameContext updates (React re-render).
 * 
 * @returns React element representing the coziness bar
 */
export function CozinessBar() {
  const { gameState } = useGame();
  const coziness = gameState.coziness;
  const [flashRed, setFlashRed] = useState(false);
  
  // Listen for custom event to trigger flash red
  useEffect(() => {
    const handleFlashRed = () => {
      setFlashRed(true);
      setTimeout(() => {
        setFlashRed(false);
      }, 300); // Match animation duration
    };
    
    window.addEventListener('game:cozinessBarFlash', handleFlashRed);
    
    return () => {
      window.removeEventListener('game:cozinessBarFlash', handleFlashRed);
    };
  }, []);
  
  // Clamp coziness to valid range (0-100)
  const clampedCoziness = Math.max(0, Math.min(100, coziness));
  
  // Calculate bar fill percentage (ensure it's a valid number)
  const fillPercentage = Math.max(0, Math.min(100, clampedCoziness));
  
  // Get gradient colors based on coziness value
  const gradient = getGradientColors(clampedCoziness);
  
  // Create linear gradient CSS value
  const gradientStyle = `linear-gradient(to right, ${gradient.start}, ${gradient.end})`;
  
  // Debug logging (only in development)
  if (import.meta.env.DEV) {
    console.log('[CozinessBar]', {
      coziness,
      clampedCoziness,
      fillPercentage,
      gradientStyle,
      width: `${fillPercentage}%`,
    });
  }
  
  return (
    <div className={styles.cozinessBar}>
      {/* Ukrainian label */}
      <div className={styles.label}>{TRANSLATIONS.gameplay.coziness}</div>
      
      {/* Bar container */}
      <div className={`${styles.barContainer} ${flashRed ? styles.flashRed : ''}`}>
        {/* Bar fill with gradient */}
        <div
          className={styles.barFill}
          style={{
            width: `${fillPercentage}%`,
            background: gradientStyle,
          }}
          role="progressbar"
          aria-valuenow={clampedCoziness}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        
        {/* Optional value display inside bar */}
        <div className={styles.valueDisplay}>
          {Math.round(clampedCoziness)}%
        </div>
      </div>
    </div>
  );
}


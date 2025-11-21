/**
 * HUD Component
 * 
 * Displays the game HUD (Heads-Up Display) at the top of the screen.
 * Contains timer, coziness bar, and future XP/Level displays.
 * 
 * Layout:
 * - Left section: Evening timer (Timer component)
 * - Center section: «Затишок» bar (CozinessBar component - Story 2.14)
 * - Right section: XP & Level + «Світлячки» (Story 4.1, 4.2)
 * 
 * Features:
 * - Always visible during gameplay
 * - Dark background with light text and warm accents
 * - Positioned at top of screen with padding
 * 
 * @example
 * ```tsx
 * <HUD />
 * ```
 */

import { Timer } from './Timer';
import { CozinessBar } from './CozinessBar';
import { XPLevelDisplay } from './XPLevelDisplay';
import styles from './HUD.module.css';

/**
 * HUD component.
 * 
 * Renders the game HUD with timer, coziness bar, and progression displays.
 * 
 * @returns React element representing the HUD
 */
export function HUD() {
  return (
    <div className={styles.hud}>
      {/* Left section: Evening timer */}
      <div className={styles.leftSection}>
        <Timer />
      </div>
      
      {/* Center section: «Затишок» bar (Story 2.14) */}
      <div className={styles.centerSection}>
        <CozinessBar />
      </div>
      
      {/* Right section: XP & Level + «Світлячки» (Story 4.1, 4.2) */}
      <div className={styles.rightSection}>
        {/* XP/Level display (Story 4.1) */}
        <XPLevelDisplay />
        {/* Currency («Світлячки») display will be added in Story 4.2 */}
      </div>
    </div>
  );
}


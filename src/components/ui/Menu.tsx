/**
 * Menu Component
 * 
 * Displays the main menu screen where players can navigate to game, shop, and achievements.
 * Features:
 * - Full-screen overlay (modal-style)
 * - Game title: "Вечір при блекауті"
 * - Menu buttons: "Грати" (Play), "Магазин" (Shop), "Досягнення" (Achievements)
 * - Ukrainian text throughout
 * - Smooth transitions and animations
 * 
 * @example
 * ```tsx
 * {showMenu && <Menu onPlay={handlePlay} onShop={handleShop} onAchievements={handleAchievements} />}
 * ```
 */

import { TRANSLATIONS } from '../../utils/translations';
import styles from './Menu.module.css';

/**
 * Menu component props.
 */
interface MenuProps {
  /** Callback when Play button is clicked */
  onPlay: () => void;
  /** Callback when Shop button is clicked */
  onShop: () => void;
  /** Callback when Achievements button is clicked */
  onAchievements: () => void;
}

/**
 * Menu component.
 * 
 * Displays main menu screen with navigation buttons.
 * 
 * @param props - Component props
 * @param props.onPlay - Callback to start new evening
 * @param props.onShop - Callback to open shop screen
 * @param props.onAchievements - Callback to open achievements screen
 * @returns React element representing the menu screen
 */
export function Menu({ onPlay, onShop, onAchievements }: MenuProps) {
  return (
    <div className={styles.menuScreen}>
      <div className={styles.content}>
        {/* Game title */}
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{TRANSLATIONS.menu.title}</h1>
          {/* Glowing fireflies */}
          <span className={`${styles.titleFirefly} ${styles.firefly1}`} />
          <span className={`${styles.titleFirefly} ${styles.firefly2}`} />
        </div>

        {/* Menu buttons container */}
        <div className={styles.menuButtons}>
          <button className={styles.menuButton} onClick={onPlay}>
            {TRANSLATIONS.menu.play}
          </button>
          <button className={styles.menuButton} onClick={onShop}>
            {TRANSLATIONS.menu.shop}
          </button>
          <button className={styles.menuButton} onClick={onAchievements}>
            {TRANSLATIONS.menu.achievements}
          </button>
        </div>
      </div>

      {/* Decorative elements for cozy atmosphere */}
      <div className={styles.decorativeLights}>
        <div className={styles.light1} />
        <div className={styles.light2} />
        <div className={styles.light3} />
      </div>
    </div>
  );
}


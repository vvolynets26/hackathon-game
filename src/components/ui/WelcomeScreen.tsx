/**
 * Welcome Screen Component
 * 
 * Displays the welcome screen with game title, instructions, controls, and start button.
 * Shown when the game first loads, before gameplay begins.
 * 
 * Features:
 * - Game title: "Вечір при блекауті"
 * - Instructions body text
 * - Controls tutorial line
 * - Start button: "Почати"
 * - Styled with "Cozy Blackout" theme
 * - Smooth transitions
 * 
 * @example
 * ```tsx
 * <WelcomeScreen onStart={handleStartGame} />
 * ```
 */

import styles from './WelcomeScreen.module.css';

interface WelcomeScreenProps {
  /** Callback when start button is clicked */
  onStart: () => void;
}

/**
 * Welcome screen component.
 * 
 * Displays game title, instructions, controls, and start button.
 * 
 * @param props - Component props
 * @param props.onStart - Callback to start the game
 * @returns React element representing the welcome screen
 */
export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className={styles.welcomeScreen}>
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Вечір при блекауті</h1>
          {/* Glowing fireflies */}
          <span className={`${styles.titleFirefly} ${styles.firefly1}`} />
          <span className={`${styles.titleFirefly} ${styles.firefly2}`} />
        </div>
        
        <div className={styles.body}>
          <p className={styles.instructionText}>
            Тримайте «Затишок» у квартирі, поки триває блекаут:
          </p>
          <ul className={styles.instructionList}>
            <li>встигайте до телефону, чайника, свічок і кота,</li>
            <li>заробляйте очки, XP та «Світлячки».</li>
          </ul>
        </div>
        
        <div className={styles.controls}>
          <span className={styles.controlItem}>
            <span className={styles.controlLabel}>Рух:</span>
            <span className={styles.controlKeys}>WASD</span>
            <span className={styles.controlSeparator}>/</span>
            <span className={styles.controlKeys}>стрілки</span>
          </span>
          <span className={styles.controlSeparator}>•</span>
          <span className={styles.controlItem}>
            <span className={styles.controlLabel}>Дія:</span>
            <span className={styles.controlKeys}>E</span>
          </span>
        </div>
        
        <button className={styles.startButton} onClick={onStart}>
          Почати
        </button>
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


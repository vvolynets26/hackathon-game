/**
 * ResultsScreen Component
 * 
 * Displays the results screen after each evening showing performance and rewards.
 * Shows score, final coziness, XP gained, currency earned, and level up notification.
 * 
 * Features:
 * - Full-screen overlay (modal-style)
 * - Smooth fade-in animation
 * - Displays win/lose message based on game outcome
 * - Shows performance metrics (score, coziness, XP, currency)
 * - Level up section with animation (if applicable)
 * - Action buttons (Play again, Shop)
 * - XP bar animation from old to new value
 * 
 * @example
 * ```tsx
 * {gameState.gameOver && <ResultsScreen onShopClick={handleOpenShop} />}
 * ```
 */

import { useEffect, useRef } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useProgression } from '../../contexts/ProgressionContext';
import { ProgressionSystem } from '../../core/ProgressionSystem';
import { XPLevelDisplay } from './XPLevelDisplay';
import { TRANSLATIONS } from '../../utils/translations';
import { initializeGameState } from '../../hooks/useGameLoop';
import { XP_LEVEL_THRESHOLDS } from '../../utils/constants';
import styles from './ResultsScreen.module.css';

/**
 * Evening start state tracking.
 * 
 * Stores progression state at the start of an evening to calculate
 * what was gained during the evening.
 */
interface EveningStartState {
  level: number;
  xp: number;
  svitlyachky: number;
}

/**
 * ResultsScreen component props.
 */
interface ResultsScreenProps {
  /** Callback when shop button is clicked */
  onShopClick: () => void;
  /** Optional callback when menu button is clicked */
  onMenuClick?: () => void;
}

/**
 * ResultsScreen component.
 * 
 * Displays results after evening ends (win or lose).
 * Reads from GameContext and ProgressionContext to show performance metrics.
 * 
 * @param props - Component props
 * @param props.onShopClick - Callback when shop button is clicked
 * @param props.onMenuClick - Optional callback when menu button is clicked
 * @returns React element representing the results screen overlay
 */
export function ResultsScreen({ onShopClick, onMenuClick }: ResultsScreenProps) {
  const gameContext = useGame();
  const { gameState } = gameContext;
  const { progressionState } = useProgression();
  
  // Track evening start state to calculate gains
  // We'll calculate this from current state by reversing the gains
  const eveningStartStateRef = useRef<EveningStartState | null>(null);
  
  // Calculate evening start state when component mounts (evening just ended)
  useEffect(() => {
    const progressionSystem = new ProgressionSystem();
    
    // Calculate XP gained this evening (XP = floor(score / 10))
    const xpGained = progressionSystem.calculateXP(gameState.score);
    const previousXP = Math.max(0, progressionState.xp - xpGained);
    
    // Calculate currency earned this evening
    const survived = gameState.coziness > 0;
    const currencyEarned = progressionSystem.calculateSvitlyachky(gameState.coziness, survived);
    const previousCurrency = Math.max(0, progressionState.svitlyachky - currencyEarned);
    
    // Find the level that corresponds to previousXP
    // Iterate through thresholds in reverse to find the highest level
    let previousLevel = 1;
    for (let i = XP_LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (previousXP >= XP_LEVEL_THRESHOLDS[i]) {
        previousLevel = i + 1; // Level is 1-based (index + 1)
        break;
      }
    }
    
    // Store evening start state
    eveningStartStateRef.current = {
      level: previousLevel,
      xp: previousXP,
      svitlyachky: previousCurrency,
    };
  }, []); // Only run once when component mounts
  
  // Calculate gains (use ProgressionSystem for consistency)
  const progressionSystem = new ProgressionSystem();
  const xpGained = progressionSystem.calculateXP(gameState.score);
  const survived = gameState.coziness > 0;
  const currencyEarned = progressionSystem.calculateSvitlyachky(gameState.coziness, survived);
  
  // Determine if level up occurred
  const eveningStartState = eveningStartStateRef.current;
  const levelUpOccurred = eveningStartState 
    ? progressionState.level > eveningStartState.level
    : false;
  const oldLevel = eveningStartState?.level ?? progressionState.level;
  
  // Determine win/lose condition
  const won = gameState.gameOver && gameState.coziness > 0;
  const title = won 
    ? TRANSLATIONS.messages.win 
    : TRANSLATIONS.messages.lose;
  
  // Handle "Play again" button click
  const handlePlayAgain = () => {
    // Reset game state and start new evening
    initializeGameState(
      gameContext,
      progressionState.level,
      progressionState.purchasedItems
    );
  };
  
  // Handle "Shop" button click
  const handleShop = () => {
    onShopClick();
  };

  // Handle "Menu" button click
  const handleMenu = () => {
    if (onMenuClick) {
      onMenuClick();
    }
  };
  
  return (
    <div className={styles.overlay}>
      <div className={styles.resultsCard}>
        {/* Top section: Title */}
        <div className={styles.topSection}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        
        {/* Middle section: Performance metrics */}
        <div className={styles.middleSection}>
          {/* Score */}
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Очки:</span>
            <span className={styles.metricValue}>{gameState.score}</span>
          </div>
          
          {/* Final Coziness */}
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Затишок:</span>
            <span className={styles.metricValue}>
              {Math.round(gameState.coziness)}%
            </span>
          </div>
          
          {/* XP gained */}
          {xpGained > 0 && (
            <div className={styles.metric}>
              <span className={styles.metricLabel}>XP:</span>
              <span className={styles.metricValue}>+{xpGained} XP</span>
            </div>
          )}
          
          {/* Currency earned */}
          {currencyEarned > 0 && (
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Світлячки:</span>
              <span className={styles.metricValue}>+{currencyEarned} ✨</span>
            </div>
          )}
          
          {/* XP bar with animation */}
          <div className={styles.xpBarSection}>
            <XPLevelDisplay />
          </div>
        </div>
        
        {/* Level up section (if applicable) */}
        {levelUpOccurred && (
          <div className={styles.levelUpSection}>
            <div className={styles.levelUpText}>
              Level Up! Lv. {oldLevel} → Lv. {progressionState.level}
            </div>
          </div>
        )}
        
        {/* Bottom section: Action buttons */}
        <div className={styles.bottomSection}>
          <button 
            className={styles.primaryButton}
            onClick={handlePlayAgain}
          >
            Грати ще один вечір
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={handleShop}
          >
            Магазин
          </button>
          {onMenuClick && (
            <button 
              className={styles.secondaryButton}
              onClick={handleMenu}
            >
              Меню
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


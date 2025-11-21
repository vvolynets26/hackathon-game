/**
 * Game State Type Definitions
 * 
 * Defines the core game state structure for the evening time-management game.
 * This interface represents the current state of an active game session.
 * 
 * @example
 * ```typescript
 * const initialState: GameState = {
 *   coziness: 50,
 *   timeRemaining: 300,
 *   score: 0,
 *   activeEvents: [],
 *   isPlaying: false,
 *   isPaused: false,
 *   gameOver: false
 * };
 * ```
 */

import type { GameEvent } from './events';

/**
 * Represents the complete state of the game during an evening session.
 * 
 * The game state tracks:
 * - Current evening metrics (coziness, time remaining, score)
 * - Active events that require player interaction
 * - Game status flags (playing, paused, game over)
 * - Achievement progress tracking (for achievement system)
 * 
 * @property coziness - Current coziness level (0-100), represents «Затишок» meter
 * @property timeRemaining - Time remaining in the evening in seconds
 * @property score - Current score/points accumulated during the evening
 * @property activeEvents - Array of currently active events requiring player attention
 * @property isPlaying - Whether the game is currently active
 * @property isPaused - Whether the game is paused
 * @property gameOver - Whether the game has ended (win or lose condition met)
 * @property achievementProgress - Achievement progress tracking for current evening
 */
export interface GameState {
  /** Current coziness level (0-100), represents «Затишок» meter */
  coziness: number;
  /** Time remaining in the evening in seconds */
  timeRemaining: number;
  /** Current score/points accumulated during the evening */
  score: number;
  /** Array of currently active events requiring player attention */
  activeEvents: GameEvent[];
  /** Whether the game is currently active */
  isPlaying: boolean;
  /** Whether the game is paused */
  isPaused: boolean;
  /** Whether the game has ended (win or lose condition met) */
  gameOver: boolean;
  /** Achievement progress tracking for current evening */
  achievementProgress: {
    /** Minimum coziness value during the evening (for coziness achievement) */
    minCoziness: number;
    /** Number of events resolved during the evening (for events achievement) */
    resolvedEventsCount: number;
  };
}


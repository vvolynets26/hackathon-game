/**
 * Game Context
 * 
 * Provides React Context for game state management throughout the application.
 * Manages the current game session state including coziness, time remaining,
 * score, active events, and game status flags.
 * 
 * @example
 * ```tsx
 * <GameProvider>
 *   <App />
 * </GameProvider>
 * 
 * // In a component:
 * const { gameState, setCoziness, addEvent } = useGame();
 * ```
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { GameState } from '../types/game';
import type { GameEvent } from '../types/events';

/**
 * Default initial game state (game not started).
 * 
 * Matches the default game state from architecture:
 * - coziness: 60 (starting coziness level)
 * - timeRemaining: 75 (average of 60-90 range)
 * - score: 0
 * - activeEvents: [] (no events initially)
 * - isPlaying: false (game not started)
 * - isPaused: false
 * - gameOver: false
 */
const DEFAULT_GAME_STATE: GameState = {
  coziness: 60,
  timeRemaining: 75, // Average of 60-90 range
  score: 0,
  activeEvents: [],
  isPlaying: false,
  isPaused: false,
  gameOver: false,
};

/**
 * Context value interface for GameContext.
 * 
 * Provides the current game state and update functions for modifying state.
 * All update functions use functional updates to avoid stale closures.
 * 
 * @property gameState - Current game state
 * @property setCoziness - Update coziness level (0-100, automatically clamped)
 * @property setTimeRemaining - Update time remaining in seconds (validated >= 0)
 * @property setScore - Update score/points (validated >= 0)
 * @property addEvent - Add a new active event (prevents duplicates)
 * @property removeEvent - Remove an event by ID
 * @property setPlaying - Set whether game is playing
 * @property setPaused - Set whether game is paused
 * @property setGameOver - Set whether game is over
 * @property updateGameState - Batch update multiple game state properties atomically
 */
export interface GameStateContextValue {
  /** Current game state */
  gameState: GameState;
  /** Update coziness level (0-100, automatically clamped) */
  setCoziness: (value: number) => void;
  /** Update time remaining in seconds (validated >= 0) */
  setTimeRemaining: (value: number) => void;
  /** Update score/points (validated >= 0) */
  setScore: (value: number) => void;
  /** Add a new active event (prevents duplicates) */
  addEvent: (event: GameEvent) => void;
  /** Remove an event by ID */
  removeEvent: (eventId: string) => void;
  /** Set whether game is playing */
  setPlaying: (playing: boolean) => void;
  /** Set whether game is paused */
  setPaused: (paused: boolean) => void;
  /** Set whether game is over */
  setGameOver: (gameOver: boolean) => void;
  /** Batch update multiple game state properties atomically */
  updateGameState: (updates: Partial<GameState>) => void;
}

/**
 * Game Context instance.
 * 
 * Created with null initial value - must be used within GameProvider.
 */
const GameContext = createContext<GameStateContextValue | null>(null);

/**
 * GameProvider component.
 * 
 * Wraps children with GameContext provider, managing game state using useState.
 * Provides update functions for all game state properties.
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap
 */
export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);

  // Update functions using functional updates to avoid stale closures
  const setCoziness = useCallback((value: number) => {
    // Clamp coziness to valid range (0-100)
    const clamped = Math.max(0, Math.min(100, value));
    setGameState((prev) => ({ ...prev, coziness: clamped }));
  }, []);

  const setTimeRemaining = useCallback((value: number) => {
    // Ensure time remaining is non-negative
    const validated = Math.max(0, value);
    setGameState((prev) => ({ ...prev, timeRemaining: validated }));
  }, []);

  const setScore = useCallback((value: number) => {
    // Ensure score is non-negative
    const validated = Math.max(0, value);
    setGameState((prev) => ({ ...prev, score: validated }));
  }, []);

  const addEvent = useCallback((event: GameEvent) => {
    setGameState((prev) => {
      // Prevent duplicate event IDs
      if (prev.activeEvents.some((e) => e.id === event.id)) {
        if (import.meta.env.DEV) {
          console.warn(`Event with ID "${event.id}" already exists. Skipping duplicate.`);
        }
        return prev;
      }
      return {
        ...prev,
        activeEvents: [...prev.activeEvents, event],
      };
    });
  }, []);

  const removeEvent = useCallback((eventId: string) => {
    setGameState((prev) => ({
      ...prev,
      activeEvents: prev.activeEvents.filter((event) => event.id !== eventId),
    }));
  }, []);

  const setPlaying = useCallback((playing: boolean) => {
    setGameState((prev) => ({ ...prev, isPlaying: playing }));
  }, []);

  const setPaused = useCallback((paused: boolean) => {
    setGameState((prev) => ({ ...prev, isPaused: paused }));
  }, []);

  const setGameOver = useCallback((gameOver: boolean) => {
    setGameState((prev) => ({ ...prev, gameOver }));
  }, []);

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState((prev) => {
      const newState = { ...prev, ...updates };
      
      // Apply validation to updated properties
      if ('coziness' in updates && updates.coziness !== undefined) {
        newState.coziness = Math.max(0, Math.min(100, updates.coziness));
      }
      if ('timeRemaining' in updates && updates.timeRemaining !== undefined) {
        newState.timeRemaining = Math.max(0, updates.timeRemaining);
      }
      if ('score' in updates && updates.score !== undefined) {
        newState.score = Math.max(0, updates.score);
      }
      if ('activeEvents' in updates && updates.activeEvents !== undefined) {
        // Remove duplicates from activeEvents if provided
        const eventIds = new Set<string>();
        newState.activeEvents = updates.activeEvents.filter((event) => {
          if (eventIds.has(event.id)) {
            if (import.meta.env.DEV) {
              console.warn(`Duplicate event ID "${event.id}" removed from batch update.`);
            }
            return false;
          }
          eventIds.add(event.id);
          return true;
        });
      }
      
      return newState;
    });
  }, []);

  const value: GameStateContextValue = {
    gameState,
    setCoziness,
    setTimeRemaining,
    setScore,
    addEvent,
    removeEvent,
    setPlaying,
    setPaused,
    setGameOver,
    updateGameState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

/**
 * Custom hook to access GameContext.
 * 
 * Returns the game state context value. Throws an error if used outside GameProvider.
 * 
 * @returns GameStateContextValue - The game state and update functions
 * @throws Error if used outside GameProvider
 * 
 * @example
 * ```tsx
 * const { gameState, setCoziness } = useGame();
 * ```
 */
export function useGame(): GameStateContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}


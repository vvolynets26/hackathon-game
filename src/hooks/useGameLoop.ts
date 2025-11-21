/**
 * Game Loop Hook
 * 
 * Custom React hook that manages the game loop using requestAnimationFrame.
 * Updates game state every frame (~60 FPS) including:
 * - Evening timer countdown
 * - «Затишок» meter decay
 * - Active event timers (basic support, full implementation in Story 2.5)
 * 
 * Features:
 * - Frame-independent updates using delta time
 * - Page Visibility API pause/resume (pauses when tab inactive)
 * - Automatic cleanup on unmount (prevents memory leaks)
 * - Integration with GameContext and ProgressionContext
 * 
 * @example
 * ```tsx
 * function GameComponent() {
 *   useGameLoop();
 *   return <div>Game UI</div>;
 * }
 * ```
 */

import { useEffect, useRef } from 'react';
import type { GameState } from '../types/game';
import { useGame } from '../contexts/GameContext';
// Note: useProgression will be used in Story 3.3 for level-based bonuses
// import { useProgression } from '../contexts/ProgressionContext';
import { EVENING_DURATION, COZINESS_START, COZINESS_DECAY_RATE } from '../utils/constants';

/**
 * Game loop hook.
 * 
 * Manages the continuous game loop that updates game state every frame.
 * Automatically handles:
 * - Starting/stopping based on game state (isPlaying, isPaused, gameOver)
 * - Pausing when browser tab becomes inactive
 * - Cleaning up animation frame on unmount
 * 
 * The hook reads game state from GameContext and updates it via context update functions.
 * All updates are frame-independent using delta time calculation.
 */
export function useGameLoop(): void {
  const {
    gameState,
    setTimeRemaining,
    setCoziness,
    setPaused,
  } = useGame();
  
  // Note: progressionState will be used in Story 3.3 for level-based bonuses
  // For now, we just ensure the hook is ready for that integration
  // const { progressionState } = useProgression();

  // Use refs to track animation frame and last frame time
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  
  // Use refs to store latest state values to avoid closure issues
  // These refs are updated on every render, so the game loop always has current values
  const gameStateRef = useRef<GameState>(gameState);
  const setTimeRemainingRef = useRef(setTimeRemaining);
  const setCozinessRef = useRef(setCoziness);

  // Update refs when values change
  useEffect(() => {
    gameStateRef.current = gameState;
    setTimeRemainingRef.current = setTimeRemaining;
    setCozinessRef.current = setCoziness;
  }, [gameState, setTimeRemaining, setCoziness]);

  // Game loop function that runs every frame
  const gameLoop = (currentTime: number) => {
    // Initialize lastFrameTime on first frame
    if (lastFrameTimeRef.current === null) {
      lastFrameTimeRef.current = currentTime;
      animationFrameRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Calculate delta time in seconds (converts milliseconds to seconds)
    const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
    lastFrameTimeRef.current = currentTime;

    // Read latest state from ref (avoids closure issues)
    const currentState = gameStateRef.current;

    // Only update if game is playing, not paused, and not game over
    if (currentState.isPlaying && !currentState.isPaused && !currentState.gameOver) {
      // Update evening timer (countdown)
      if (currentState.timeRemaining > 0) {
        const newTimeRemaining = Math.max(0, currentState.timeRemaining - deltaTime);
        setTimeRemainingRef.current(newTimeRemaining);

        // Check if timer reached 0 (evening ended)
        if (newTimeRemaining === 0) {
          // Timer ended - game over condition will be handled by game logic
          // This will be implemented in Story 2.11
        }
      }

      // Update «Затишок» meter (decay)
      // Decay rate is per second, so multiply by deltaTime for frame-independent updates
      if (currentState.coziness > 0) {
        const cozinessDecay = COZINESS_DECAY_RATE * deltaTime;
        const newCoziness = Math.max(0, currentState.coziness - cozinessDecay);
        setCozinessRef.current(newCoziness);

        // Check if coziness reached 0 (lose condition)
        if (newCoziness === 0) {
          // Coziness reached 0 - game over condition will be handled by game logic
          // This will be implemented in Story 2.11
        }
      }

      // Note: Active event timers will be updated in Story 2.5 (Event Timer Management)
      // For now, we just ensure the game loop is ready for that integration
    }

    // Continue loop (will be cancelled in cleanup or when conditions change)
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  // Effect to start/stop game loop based on game state
  useEffect(() => {
    // Only start loop if game is playing, not paused, and not game over
    if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
      // Reset frame time tracking when starting/resuming
      lastFrameTimeRef.current = null;
      // Start the loop
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      // Stop the loop
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastFrameTimeRef.current = null;
    }

    // Cleanup: cancel animation frame on unmount or when conditions change
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastFrameTimeRef.current = null;
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.gameOver]);

  // Store setPaused in ref to avoid closure issues
  const setPausedRef = useRef(setPaused);
  useEffect(() => {
    setPausedRef.current = setPaused;
  }, [setPaused]);

  // Effect to handle Page Visibility API (pause when tab inactive)
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Pause game when tab becomes inactive (hidden)
      if (document.hidden) {
        setPausedRef.current(true);
      } else {
        // Resume game when tab becomes active (visible)
        // Only resume if game was playing before pause
        const currentState = gameStateRef.current;
        if (currentState.isPlaying && !currentState.gameOver) {
          setPausedRef.current(false);
        }
      }
    };

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup: remove event listener on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}

/**
 * Initialize game state for a new evening session.
 * 
 * Sets initial values for a fresh game session:
 * - Coziness: Starting value (default 60, can be modified by level bonuses)
 * - Time remaining: Evening duration (from constants)
 * - Score: 0
 * - Active events: Empty array
 * - Game status: isPlaying=true, isPaused=false, gameOver=false
 * 
 * This function should be called when starting a new evening.
 * Level-based bonuses (Story 3.3) can modify initial coziness or duration.
 * 
 * @param contextValue - GameContext value with update functions
 * @param playerLevel - Current player level (for future level-based bonuses)
 * 
 * @example
 * ```tsx
 * const { updateGameState, setPlaying, setPaused, setGameOver } = useGame();
 * initializeGameState(contextValue, playerLevel);
 * ```
 */
export function initializeGameState(
  contextValue: {
    updateGameState: (updates: Partial<import('../types/game').GameState>) => void;
    setPlaying: (playing: boolean) => void;
    setPaused: (paused: boolean) => void;
    setGameOver: (gameOver: boolean) => void;
  },
  _playerLevel: number = 1
): void {
  // Initial coziness (can be modified by level bonuses in Story 3.3)
  // For now, use default starting value
  let initialCoziness = COZINESS_START;

  // TODO: Apply level-based bonuses here when Story 3.3 is implemented
  // Example: if level > 2, increase initial coziness by 5

  // Initial time remaining (can be modified by level bonuses in Story 3.3)
  // For now, use default evening duration
  let initialTimeRemaining = EVENING_DURATION;

  // TODO: Apply level-based bonuses here when Story 3.3 is implemented
  // Example: if level > 3, increase evening duration by 10 seconds

  // Initialize game state atomically
  contextValue.updateGameState({
    coziness: initialCoziness,
    timeRemaining: initialTimeRemaining,
    score: 0,
    activeEvents: [],
    // Status flags will be set separately to ensure correct order
  });

  // Set status flags (set playing last to trigger game loop)
  contextValue.setGameOver(false);
  contextValue.setPaused(false);
  contextValue.setPlaying(true);
}


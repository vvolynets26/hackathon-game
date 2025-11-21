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
import { useProgression } from '../contexts/ProgressionContext';
import { EVENING_DURATION, COZINESS_START, COZINESS_DECAY_RATE, EVENT_SPAWN_INTERVAL, getEventSpawnIntervalWithBonuses, getStartingCozinessWithBonuses, getCozinessDecayRateWithBonuses, getPurchasedBuffs, getBuffEffect } from '../utils/constants';
import { EventManager } from '../core/EventManager';
import { ProgressionSystem } from '../core/ProgressionSystem';

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
    setPlaying,
    setGameOver,
    addEvent,
    updateGameState,
  } = useGame();
  
  // Progression context for XP calculation, currency calculation, level tracking, and achievement unlocking
  // Level is used for level-based bonuses (Story 3.3)
  const { addXP, addSvitlyachky, progressionState, unlockAchievement } = useProgression();
  
  // ProgressionSystem instance for XP calculation
  const progressionSystemRef = useRef<ProgressionSystem | null>(null);
  // Initialize ProgressionSystem once (using null check pattern to avoid ref access during render)
  if (progressionSystemRef.current == null) {
    progressionSystemRef.current = new ProgressionSystem();
  }
  
  // Track if XP has been calculated for this game session (prevent duplicate calculations)
  const xpCalculatedRef = useRef<boolean>(false);
  // Track if currency has been calculated for this game session (prevent duplicate calculations)
  const currencyCalculatedRef = useRef<boolean>(false);

  // Use refs to track animation frame and last frame time
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  
  // Use refs to store latest state values to avoid closure issues
  // These refs are updated on every render, so the game loop always has current values
  const gameStateRef = useRef<GameState>(gameState);
  const setTimeRemainingRef = useRef(setTimeRemaining);
  const setCozinessRef = useRef(setCoziness);
  const setPlayingRef = useRef(setPlaying);
  const setGameOverRef = useRef(setGameOver);
  const updateGameStateRef = useRef(updateGameState);
  
  // EventManager instance (created once, reused across renders)
  const eventManagerRef = useRef<EventManager | null>(null);
  
  // Spawn timer state (tracks elapsed time since last spawn)
  const spawnTimerRef = useRef<number>(0);
  
  // Player level from ProgressionContext (used for level-based bonuses - Story 3.3)
  // Store level in ref to avoid closure issues in game loop
  const playerLevelRef = useRef<number>(progressionState.level);
  
  // ProgressionState ref for shop buffs (used for shop buff calculations - Story 3.4)
  const progressionStateRef = useRef(progressionState);

  // Initialize EventManager once
  useEffect(() => {
    if (!eventManagerRef.current) {
      eventManagerRef.current = new EventManager(addEvent);
    } else {
      // Update callback if it changes
      eventManagerRef.current.setAddEventCallback(addEvent);
    }
  }, [addEvent]);
  
  // Update EventManager active events count when game state changes
  useEffect(() => {
    if (eventManagerRef.current) {
      eventManagerRef.current.setActiveEventsCount(gameState.activeEvents.length);
    }
  }, [gameState.activeEvents.length]);
  
  // Update refs when values change
  useEffect(() => {
    gameStateRef.current = gameState;
    setTimeRemainingRef.current = setTimeRemaining;
    setCozinessRef.current = setCoziness;
    setPlayingRef.current = setPlaying;
    setGameOverRef.current = setGameOver;
    updateGameStateRef.current = updateGameState;
    playerLevelRef.current = progressionState.level; // Update level ref for bonuses
    progressionStateRef.current = progressionState; // Update progression state ref for shop buffs
  }, [gameState, setTimeRemaining, setCoziness, setPlaying, setGameOver, updateGameState, progressionState]);

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
          // Win condition: timer reached 0 AND coziness > 0 (Story 2.11)
          if (currentState.coziness > 0) {
            // Player won - timer ended with coziness remaining
            setGameOverRef.current(true);
            setPlayingRef.current(false);
            
            // Calculate and add XP (Story 3.1)
            if (!xpCalculatedRef.current && progressionSystemRef.current) {
              const xpEarned = progressionSystemRef.current.calculateXP(currentState.score);
              if (xpEarned > 0) {
                // Use setTimeout to ensure state updates happen after game over state is set
                setTimeout(() => {
                  addXP(xpEarned);
                }, 0);
              }
              xpCalculatedRef.current = true;
            }

            // Calculate and add currency (Story 3.2)
            if (!currencyCalculatedRef.current && progressionSystemRef.current) {
              const finalCoziness = currentState.coziness;
              const survived = finalCoziness > 0;
              const currencyEarned = progressionSystemRef.current.calculateSvitlyachky(finalCoziness, survived);
              if (currencyEarned > 0) {
                // Use setTimeout to ensure state updates happen after game over state is set
                setTimeout(() => {
                  addSvitlyachky(currencyEarned);
                }, 0);
              }
              currencyCalculatedRef.current = true;
            }

            // Check achievements at end of evening (Story 3.5)
            if (progressionSystemRef.current) {
              const newlyUnlocked = progressionSystemRef.current.checkAchievements(
                progressionStateRef.current,
                currentState
              );
              // Unlock each newly unlocked achievement
              newlyUnlocked.forEach((achievementId) => {
                setTimeout(() => {
                  unlockAchievement(achievementId);
                }, 0);
              });
            }
            // Game loop will stop automatically when isPlaying becomes false
          }
        }
      }

      // Update «Затишок» meter (decay)
      // Decay rate is per second, so multiply by deltaTime for frame-independent updates
      // Apply level-based bonuses and shop buffs to decay rate (Story 3.3, 3.4)
      if (currentState.coziness > 0) {
        // Calculate shop buff for decay rate (Story 3.4)
        // Note: Currently no decay rate buff in shop items, but structure is ready
        const purchasedBuffs = getPurchasedBuffs(progressionStateRef.current.purchasedItems);
        const decayBuff = purchasedBuffs.find((buff) => {
          const effect = getBuffEffect(buff.id);
          return effect?.type === 'decayReduction';
        });
        const decayBuffPercent = decayBuff ? getBuffEffect(decayBuff.id)?.value ?? 0 : 0;
        
        const decayRate = getCozinessDecayRateWithBonuses(
          COZINESS_DECAY_RATE,
          playerLevelRef.current,
          decayBuffPercent
        );
        const cozinessDecay = decayRate * deltaTime;
        const newCoziness = Math.max(0, currentState.coziness - cozinessDecay);
        setCozinessRef.current(newCoziness);

        // Track minimum coziness for achievement (Story 3.5)
        // Update achievement progress with new minimum coziness
        const currentMinCoziness = currentState.achievementProgress.minCoziness;
        if (newCoziness < currentMinCoziness) {
          updateGameStateRef.current({
            achievementProgress: {
              ...currentState.achievementProgress,
              minCoziness: newCoziness,
            },
          });
        }

        // Check if coziness reached 0 (lose condition)
        if (newCoziness === 0) {
          // Coziness reached 0 - lose condition (Story 2.10)
          setGameOverRef.current(true);
          setPlayingRef.current(false);
          
          // Calculate and add XP even on loss (Story 3.1)
          if (!xpCalculatedRef.current && progressionSystemRef.current) {
            const xpEarned = progressionSystemRef.current.calculateXP(currentState.score);
            if (xpEarned > 0) {
              // Use setTimeout to ensure state updates happen after game over state is set
              setTimeout(() => {
                addXP(xpEarned);
              }, 0);
            }
            xpCalculatedRef.current = true;
          }

          // Calculate and add currency (Story 3.2)
          if (!currencyCalculatedRef.current && progressionSystemRef.current) {
            const finalCoziness = newCoziness; // Use newCoziness which is 0 at this point
            const survived = false; // Coziness reached 0, so didn't survive
            const currencyEarned = progressionSystemRef.current.calculateSvitlyachky(finalCoziness, survived);
            if (currencyEarned > 0) {
              // Use setTimeout to ensure state updates happen after game over state is set
              setTimeout(() => {
                addSvitlyachky(currencyEarned);
              }, 0);
            }
            currencyCalculatedRef.current = true;
          }

          // Check achievements at end of evening (Story 3.5)
          if (progressionSystemRef.current) {
            const newlyUnlocked = progressionSystemRef.current.checkAchievements(
              progressionStateRef.current,
              currentState
            );
            // Unlock each newly unlocked achievement
            newlyUnlocked.forEach((achievementId) => {
              setTimeout(() => {
                unlockAchievement(achievementId);
              }, 0);
            });
          }
          // Game loop will stop automatically when isPlaying becomes false
        }
      }

      // Update event spawn timer (frame-rate independent using delta time)
      if (eventManagerRef.current) {
        spawnTimerRef.current += deltaTime;
        
        // Calculate spawn interval with level bonuses (Story 3.3)
        const spawnInterval = getEventSpawnIntervalWithBonuses(
          EVENT_SPAWN_INTERVAL,
          playerLevelRef.current
        );
        
        // Check if spawn interval is reached
        if (spawnTimerRef.current >= spawnInterval) {
          // Try to spawn an event
          const activeEventsCount = currentState.activeEvents.length;
          eventManagerRef.current.spawnEvent(
            playerLevelRef.current,
            activeEventsCount
          );
          
          // Reset spawn timer after spawn attempt
          // This ensures we check for spawn opportunities every spawn interval
          // even when at max events (in case an event expires)
          spawnTimerRef.current = 0;
        }

        // Update active event timers (frame-rate independent using delta time)
        // This updates all event timers and detects expired events
        // Note: updateEvents mutates event timers in-place, so we need to update
        // GameContext state to trigger React re-renders for timer display
        if (currentState.activeEvents.length > 0) {
          // Update timers and get expired events
          // We'll handle removal ourselves to avoid state update conflicts
          const expiredEvents = eventManagerRef.current.updateEvents(
            deltaTime,
            currentState.activeEvents,
            () => {
              // Don't call removeEvent here - we'll handle removal in batch below
              // This prevents race conditions with state updates
            }
          );

          // Filter out expired events (timer <= 0) and update state
          // This ensures expired events are removed and timer updates trigger re-renders
          const remainingEvents = currentState.activeEvents.filter(
            (event) => event.timer > 0
          );

          // Update GameContext with remaining events (creates new array reference, triggers re-render)
          // This ensures timer displays update in real-time (Story 2.8) and expired events are removed
          updateGameStateRef.current({
            activeEvents: remainingEvents,
          });

          // Process expired events (apply coziness penalties)
          // Apply penalties from all expired events and check for lose condition
          if (expiredEvents.length > 0) {
            // Calculate total penalty from all expired events
            const totalPenalty = expiredEvents.reduce(
              (sum, event) => sum + event.cozinessPenalty,
              0
            );
            
            // Calculate new coziness after applying all penalties
            // Note: setCoziness internally clamps to 0-100, but we calculate here to check for lose condition
            const currentCoziness = currentState.coziness;
            const newCoziness = Math.max(0, Math.min(100, currentCoziness + totalPenalty));
            
            // Apply total penalty
            setCozinessRef.current(newCoziness);
            
            // Check if coziness reached 0 (lose condition)
            if (newCoziness === 0) {
              setGameOverRef.current(true);
              setPlayingRef.current(false);
              
              // Calculate and add XP even on loss (Story 3.1)
              if (!xpCalculatedRef.current && progressionSystemRef.current) {
                const xpEarned = progressionSystemRef.current.calculateXP(currentState.score);
                if (xpEarned > 0) {
                  // Use setTimeout to ensure state updates happen after game over state is set
                  setTimeout(() => {
                    addXP(xpEarned);
                  }, 0);
                }
                xpCalculatedRef.current = true;
              }

              // Calculate and add currency (Story 3.2)
              if (!currencyCalculatedRef.current && progressionSystemRef.current) {
                const finalCoziness = newCoziness; // Use newCoziness which is 0 at this point
                const survived = false; // Coziness reached 0, so didn't survive
                const currencyEarned = progressionSystemRef.current.calculateSvitlyachky(finalCoziness, survived);
                if (currencyEarned > 0) {
                  // Use setTimeout to ensure state updates happen after game over state is set
                  setTimeout(() => {
                    addSvitlyachky(currencyEarned);
                  }, 0);
                }
                currencyCalculatedRef.current = true;
              }

              // Check achievements at end of evening (Story 3.5)
              if (progressionSystemRef.current) {
                const newlyUnlocked = progressionSystemRef.current.checkAchievements(
                  progressionStateRef.current,
                  currentState
                );
                // Unlock each newly unlocked achievement
                newlyUnlocked.forEach((achievementId) => {
                  setTimeout(() => {
                    unlockAchievement(achievementId);
                  }, 0);
                });
              }
              // Game loop will stop automatically when isPlaying becomes false
            }
          }
        }
      }
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
      // Reset spawn timer when starting/resuming
      spawnTimerRef.current = 0;
      // Reset XP and currency calculation flags when starting a new game
      if (gameState.score === 0) {
        xpCalculatedRef.current = false;
        currencyCalculatedRef.current = false;
      }
      // Start the loop
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      // Stop the loop
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastFrameTimeRef.current = null;
      // Don't reset spawn timer on pause - resume from where we left off
      // Only reset on game over or when game stops
      if (gameState.gameOver || !gameState.isPlaying) {
        spawnTimerRef.current = 0;
      }
    }

    // Cleanup: cancel animation frame on unmount or when conditions change
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastFrameTimeRef.current = null;
      spawnTimerRef.current = 0;
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
  playerLevel: number = 1, // Used for level-based bonuses (Story 3.3)
  purchasedItems: string[] = [] // Used for shop buffs (Story 3.4)
): void {
  // Calculate shop buff for starting coziness (Story 3.4)
  // Note: Currently no starting coziness buff in shop items, but structure is ready
  const purchasedBuffs = getPurchasedBuffs(purchasedItems);
  const cozinessBuff = purchasedBuffs.find((buff) => {
    const effect = getBuffEffect(buff.id);
    return effect?.type === 'startingCoziness';
  });
  const cozinessBuffAmount = cozinessBuff ? getBuffEffect(cozinessBuff.id)?.value ?? 0 : 0;
  
  // Initial coziness with level bonuses and shop buffs applied (Story 3.3, 3.4)
  const initialCoziness = getStartingCozinessWithBonuses(COZINESS_START, playerLevel, cozinessBuffAmount);

  // Initial time remaining (can be modified by level bonuses in future stories)
  // For now, use default evening duration
  const initialTimeRemaining = EVENING_DURATION;

  // Initialize game state atomically
  contextValue.updateGameState({
    coziness: initialCoziness,
    timeRemaining: initialTimeRemaining,
    score: 0,
    activeEvents: [],
    achievementProgress: {
      minCoziness: initialCoziness, // Start tracking from initial coziness
      resolvedEventsCount: 0, // Reset resolved events count
    },
    // Status flags will be set separately to ensure correct order
  });

  // Set status flags (set playing last to trigger game loop)
  contextValue.setGameOver(false);
  contextValue.setPaused(false);
  contextValue.setPlaying(true);
}


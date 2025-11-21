/**
 * Event Interaction Hook
 * 
 * Custom React hook that provides event interaction functionality.
 * Handles interaction logic including range detection, prevention checks,
 * and event resolution.
 * 
 * @example
 * ```tsx
 * const { handleEventInteraction } = useEventInteraction(containerSize);
 * 
 * // In Character component:
 * useEffect(() => {
 *   const handleKeyPress = (e: KeyboardEvent) => {
 *     if (e.key === 'e' || e.key === 'E') {
 *       handleEventInteraction();
 *     }
 *   };
 *   window.addEventListener('keydown', handleKeyPress);
 *   return () => window.removeEventListener('keydown', handleKeyPress);
 * }, [handleEventInteraction]);
 * ```
 */

import { useCallback, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { EventManager } from '../core/EventManager';
import { INTERACTION_RANGE } from '../utils/constants';
import { isWithinInteractionRange, type Position } from '../utils/distance';
import type { GameEvent } from '../types/events';

/**
 * Options for event interaction.
 */
export interface EventInteractionOptions {
  /** Optional container size for percentage-based event locations */
  containerSize?: { width: number; height: number };
  /** Optional specific event to interact with (for mouse clicks) */
  targetEvent?: GameEvent;
}

/**
 * Shared EventManager instance for resolveEvent calls.
 * 
 * Since resolveEvent doesn't require instance state, we use a single
 * shared instance across all hook instances for efficiency.
 */
const sharedEventManager = new EventManager();

/**
 * Event interaction hook.
 * 
 * Provides functions for interacting with game events.
 * Handles keyboard (E key) and mouse (click) interactions.
 * 
 * @param getContainerSize - Function that returns current container size, or static container size value
 * @returns Object with interaction handler
 */
export function useEventInteraction(
  getContainerSize?: (() => { width: number; height: number } | undefined) | { width: number; height: number }
) {
  const {
    gameState,
    setScore,
    setCoziness,
    removeEvent,
    characterPosition,
    updateGameState,
  } = useGame();
  
  // Interaction lock to prevent multiple simultaneous interactions
  const isInteractingRef = useRef<boolean>(false);
  
  /**
   * Gets the current container size, handling both function and static value.
   */
  const getCurrentContainerSize = useCallback((): { width: number; height: number } | undefined => {
    if (!getContainerSize) {
      return undefined;
    }
    // Check if it's a function
    if (typeof getContainerSize === 'function') {
      return getContainerSize();
    }
    // Otherwise it's a static value
    return getContainerSize;
  }, [getContainerSize]);
  
  /**
   * Finds the nearest event within interaction range.
   * 
   * @param characterPos - Character position
   * @param activeEvents - Array of active events
   * @returns Nearest event within range, or null if none found
   */
  const findNearestEvent = useCallback((
    characterPos: Position,
    activeEvents: GameEvent[]
  ): GameEvent | null => {
    const containerSize = getCurrentContainerSize();
    let nearestEvent: GameEvent | null = null;
    let nearestDistance = Infinity;
    
    for (const event of activeEvents) {
      // Check if event is expired
      if (event.timer <= 0) {
        continue;
      }
      
      // Check if within interaction range
      const withinRange = isWithinInteractionRange(
        characterPos,
        event.location,
        INTERACTION_RANGE,
        containerSize
      );
      
      if (withinRange) {
        // Calculate distance to find nearest
        const dx = (containerSize && event.location.x <= 1.0)
          ? event.location.x * containerSize.width - characterPos.x
          : event.location.x - characterPos.x;
        const dy = (containerSize && event.location.y <= 1.0)
          ? event.location.y * containerSize.height - characterPos.y
          : event.location.y - characterPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestEvent = event;
        }
      }
    }
    
    return nearestEvent;
  }, [getCurrentContainerSize]);
  
  /**
   * Checks if interaction should be prevented.
   * 
   * @returns True if interaction should be prevented, false otherwise
   */
  const shouldPreventInteraction = useCallback((): boolean => {
    // Check if game is paused
    if (gameState.isPaused) {
      return true;
    }
    
    // Check if game is over
    if (gameState.gameOver) {
      return true;
    }
    
    // Check if game is not playing
    if (!gameState.isPlaying) {
      return true;
    }
    
    // Check if already interacting (lock)
    if (isInteractingRef.current) {
      return true;
    }
    
    // Check if character position is available
    if (!characterPosition) {
      return true;
    }
    
    return false;
  }, [gameState.isPaused, gameState.gameOver, gameState.isPlaying, characterPosition]);
  
  /**
   * Handles event interaction (keyboard or mouse).
   * 
   * Finds nearest event (or uses target event), checks prevention conditions,
   * resolves event, and updates game state.
   * 
   * @param targetEvent - Optional specific event to interact with (for mouse clicks)
   * @returns True if interaction was successful, false otherwise
   */
  const handleEventInteraction = useCallback((
    targetEvent?: GameEvent
  ): boolean => {
    if (import.meta.env.DEV) {
      console.log('[EventInteraction] E key pressed', {
        isPaused: gameState.isPaused,
        isPlaying: gameState.isPlaying,
        gameOver: gameState.gameOver,
        characterPosition,
        activeEventsCount: gameState.activeEvents.length,
        isInteracting: isInteractingRef.current,
      });
    }
    
    // Check prevention conditions
    if (shouldPreventInteraction()) {
      if (import.meta.env.DEV) {
        console.log('[EventInteraction] Interaction prevented by shouldPreventInteraction');
      }
      return false;
    }
    
    // Check if character position is available
    if (!characterPosition) {
      if (import.meta.env.DEV) {
        console.log('[EventInteraction] No character position available');
      }
      return false;
    }
    
    // Set interaction lock
    if (isInteractingRef.current) {
      if (import.meta.env.DEV) {
        console.log('[EventInteraction] Already interacting (lock active)');
      }
      return false; // Already interacting
    }
    isInteractingRef.current = true;
    
    try {
      let eventToResolve: GameEvent | null = null;
      
      if (targetEvent) {
        // Use provided target event (mouse click)
        // Check if character is within range
        const containerSize = getCurrentContainerSize();
        const withinRange = isWithinInteractionRange(
          characterPosition,
          targetEvent.location,
          INTERACTION_RANGE,
          containerSize
        );
        
        // Check if event is expired
        if (targetEvent.timer <= 0) {
          isInteractingRef.current = false;
          return false;
        }
        
        if (withinRange) {
          eventToResolve = targetEvent;
        } else {
          isInteractingRef.current = false;
          if (import.meta.env.DEV) {
            console.log('[EventInteraction] Target event too far from character');
          }
          return false; // Too far from event
        }
      } else {
        // Find nearest event (keyboard interaction)
        eventToResolve = findNearestEvent(
          characterPosition,
          gameState.activeEvents
        );
        
        if (import.meta.env.DEV) {
          console.log('[EventInteraction] Nearest event search', {
            found: eventToResolve !== null,
            eventId: eventToResolve?.id,
            activeEvents: gameState.activeEvents.map(e => ({
              id: e.id,
              type: e.type,
              location: e.location,
              timer: e.timer,
            })),
            characterPosition,
            containerSize: getCurrentContainerSize(),
          });
        }
      }
      
      // If no event found, release lock and return
      if (!eventToResolve) {
        isInteractingRef.current = false;
        if (import.meta.env.DEV) {
          console.log('[EventInteraction] No event found within range');
        }
        return false;
      }
      
      // Resolve event using EventManager
      // Use shared instance since resolveEvent doesn't require instance state
      const resolvedEvent = sharedEventManager.resolveEvent(
        eventToResolve.id,
        gameState.activeEvents,
        removeEvent
      );
      
      // If event not found (shouldn't happen, but handle gracefully)
      if (!resolvedEvent) {
        isInteractingRef.current = false;
        return false;
      }
      
      // Update game state (score and coziness)
      // Use functional updates to avoid stale state
      setScore(gameState.score + resolvedEvent.points);
      setCoziness((prev) => prev + resolvedEvent.cozinessReward);

      // Track resolved events count for achievement (Story 3.5)
      // Increment resolved events count in achievement progress
      updateGameState({
        achievementProgress: {
          ...gameState.achievementProgress,
          resolvedEventsCount: gameState.achievementProgress.resolvedEventsCount + 1,
        },
      });
      
      // Trigger success visual feedback (Story 4.6)
      // Get container size for positioning floating text
      const containerSize = getCurrentContainerSize();
      const eventX = containerSize && resolvedEvent.location.x <= 1.0
        ? resolvedEvent.location.x * containerSize.width
        : resolvedEvent.location.x;
      const eventY = containerSize && resolvedEvent.location.y <= 1.0
        ? resolvedEvent.location.y * containerSize.height
        : resolvedEvent.location.y;
      
      // Convert to percentage for FloatingText component
      const position = containerSize
        ? { x: resolvedEvent.location.x, y: resolvedEvent.location.y }
        : { x: eventX, y: eventY };
      
      // Trigger event animation (success)
      window.dispatchEvent(new CustomEvent('game:eventAnimation', {
        detail: { eventId: resolvedEvent.id, animation: 'success' },
      }));
      
      // Create floating text for points
      const pointsTextId = `floating-text-points-${resolvedEvent.id}-${Date.now()}`;
      window.dispatchEvent(new CustomEvent('game:floatingText', {
        detail: {
          id: pointsTextId,
          text: `+${resolvedEvent.points}`,
          color: '#ffffff', // White for points
          position: { x: position.x, y: position.y },
        },
      }));
      
      // Create floating text for coziness (slightly offset)
      const cozinessTextId = `floating-text-coziness-${resolvedEvent.id}-${Date.now()}`;
      const cozinessPosition = {
        x: position.x,
        y: position.y - 0.03, // Offset upward by 3%
      };
      window.dispatchEvent(new CustomEvent('game:floatingText', {
        detail: {
          id: cozinessTextId,
          text: `+${resolvedEvent.cozinessReward}`,
          color: '#4caf50', // Green for coziness
          position: cozinessPosition,
        },
      }));
      
      if (import.meta.env.DEV) {
        console.log('[EventInteraction] Event resolved successfully', {
          eventId: resolvedEvent.id,
          points: resolvedEvent.points,
          cozinessReward: resolvedEvent.cozinessReward,
        });
      }
      
      // Release interaction lock
      isInteractingRef.current = false;
      
      return true;
    } catch (error) {
      // Release lock on error
      isInteractingRef.current = false;
      if (import.meta.env.DEV) {
        console.error('Error during event interaction:', error);
      }
      return false;
    }
  }, [
    characterPosition,
    gameState.activeEvents,
    gameState.isPaused,
    gameState.gameOver,
    gameState.isPlaying,
    gameState.achievementProgress,
    shouldPreventInteraction,
    findNearestEvent,
    getCurrentContainerSize,
    removeEvent,
    setScore,
    setCoziness,
    updateGameState,
  ]);
  
  return {
    handleEventInteraction,
  };
}


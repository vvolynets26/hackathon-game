/**
 * Character Component
 * 
 * Displays the player character and handles keyboard-controlled movement.
 * Character moves smoothly around the apartment using WASD or arrow keys.
 * 
 * Features:
 * - Smooth, frame-rate independent movement
 * - Boundary constraints (character cannot leave apartment)
 * - Keyboard input handling (WASD and arrow keys)
 * - GPU-accelerated positioning using CSS transforms
 * - Support for equipped skins (Story 4.5)
 * 
 * @example
 * ```tsx
 * <Character />
 * ```
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useProgression } from '../../contexts/ProgressionContext';
import { APARTMENT_BOUNDARIES, CHARACTER_MOVEMENT_SPEED, getMovementSpeedWithBonuses, getPurchasedBuffs, getBuffEffect } from '../../utils/constants';
import { useEventInteraction } from '../../hooks/useEventInteraction';
import styles from './Character.module.css';

/**
 * Character position in pixels relative to apartment container.
 */
interface CharacterPosition {
  x: number;
  y: number;
}

/**
 * Movement direction vector (normalized for diagonal movement).
 */
interface MovementDirection {
  x: number;
  y: number;
}

/**
 * Character component props.
 */
interface CharacterProps {
  /** Optional container ref for calculating interaction ranges */
  containerRef?: React.RefObject<HTMLElement>;
}

/**
 * Character component.
 * 
 * Renders the character visual and handles keyboard input for movement.
 * Character position is stored in component state and updated every frame.
 * Movement is frame-rate independent using delta time.
 * 
 * @param props - Component props
 * @param props.containerRef - Optional container ref for interaction range calculations
 * @returns React element representing the character
 */
export function Character({ containerRef: apartmentContainerRef }: CharacterProps = {}) {
  const { gameState, setCharacterPosition } = useGame();
  const { progressionState } = useProgression();
  
  // Character position in pixels (relative to apartment container)
  const [position, setPosition] = useState<CharacterPosition>({ x: 0, y: 0 });
  
  // Track which keys are currently pressed
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  
  // Track if character is moving (for animation)
  const [isMoving, setIsMoving] = useState(false);
  
  // Track if character is initialized (for fade-in effect)
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Refs for frame-independent movement
  const lastFrameTimeRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<CharacterPosition>({ x: 0, y: 0 });
  const initializedRef = useRef<boolean>(false);
  
  // Get container size for percentage-based event locations
  const getContainerSize = useCallback((): { width: number; height: number } | undefined => {
    // First try to use the passed apartment container ref
    if (apartmentContainerRef?.current) {
      const container = apartmentContainerRef.current;
      return {
        width: container.clientWidth,
        height: container.clientHeight,
      };
    }
    // Fallback to parent element (for backwards compatibility)
    const container = containerRef.current?.parentElement;
    if (container) {
      return {
        width: container.clientWidth,
        height: container.clientHeight,
      };
    }
    return undefined;
  }, [apartmentContainerRef]);
  
  // Event interaction hook - pass function to recalculate container size dynamically
  const { handleEventInteraction } = useEventInteraction(getContainerSize);
  
  // Update position ref when position changes
  useEffect(() => {
    positionRef.current = position;
    // Update character position in context for event interaction
    setCharacterPosition(position);
  }, [position, setCharacterPosition]);
  
  /**
   * Calculate movement direction from currently pressed keys.
   * Normalizes diagonal movement to prevent faster diagonal speed.
   */
  const calculateMovementDirection = useCallback((): MovementDirection => {
    let dirX = 0;
    let dirY = 0;
    
    // Check WASD keys (normalized to lowercase) and arrow keys
    if (pressedKeys.has('w') || pressedKeys.has('ArrowUp')) {
      dirY -= 1; // Up
    }
    if (pressedKeys.has('s') || pressedKeys.has('ArrowDown')) {
      dirY += 1; // Down
    }
    if (pressedKeys.has('a') || pressedKeys.has('ArrowLeft')) {
      dirX -= 1; // Left
    }
    if (pressedKeys.has('d') || pressedKeys.has('ArrowRight')) {
      dirX += 1; // Right
    }
    
    // Normalize diagonal movement (prevent faster diagonal speed)
    if (dirX !== 0 && dirY !== 0) {
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      dirX /= length;
      dirY /= length;
    }
    
    return { x: dirX, y: dirY };
  }, [pressedKeys]);
  
  /**
   * Calculate actual pixel boundaries based on apartment container size.
   */
  const calculateBoundaries = useCallback((): {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } | null => {
    if (!containerRef.current) {
      return null;
    }
    
    const container = containerRef.current.parentElement;
    if (!container) {
      return null;
    }
    
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Calculate pixel boundaries from percentage-based boundaries
    return {
      minX: containerWidth * APARTMENT_BOUNDARIES.minX,
      maxX: containerWidth * APARTMENT_BOUNDARIES.maxX,
      minY: containerHeight * APARTMENT_BOUNDARIES.minY,
      maxY: containerHeight * APARTMENT_BOUNDARIES.maxY,
    };
  }, []);
  
  /**
   * Clamp position to apartment boundaries.
   */
  const clampToBoundaries = useCallback((pos: CharacterPosition): CharacterPosition => {
    const boundaries = calculateBoundaries();
    if (!boundaries) {
      return pos;
    }
    
    // Get character size (approximate, can be adjusted)
    const characterWidth = 48; // Character width in pixels
    const characterHeight = 48; // Character height in pixels
    
    // Clamp position ensuring character stays within boundaries
    const clampedX = Math.max(
      boundaries.minX,
      Math.min(boundaries.maxX - characterWidth, pos.x)
    );
    const clampedY = Math.max(
      boundaries.minY,
      Math.min(boundaries.maxY - characterHeight, pos.y)
    );
    
    return { x: clampedX, y: clampedY };
  }, [calculateBoundaries]);
  
  /**
   * Initialize character position to center of apartment when container is available.
   * Also recalculates boundaries when container size changes.
   */
  useEffect(() => {
    const initializePosition = () => {
      const boundaries = calculateBoundaries();
      if (boundaries) {
        const characterWidth = 48;
        const characterHeight = 48;
        
        if (!initializedRef.current) {
          // First initialization - center the character
          const centerX = (boundaries.minX + boundaries.maxX) / 2 - characterWidth / 2;
          const centerY = (boundaries.minY + boundaries.maxY) / 2 - characterHeight / 2;
          const initialPos = { x: centerX, y: centerY };
          setPosition(initialPos);
          positionRef.current = initialPos;
          initializedRef.current = true;
          setIsInitialized(true); // Update state for render
        } else {
          // Re-clamp position if boundaries changed (e.g., window resize)
          const clamped = clampToBoundaries(positionRef.current);
          if (clamped.x !== positionRef.current.x || clamped.y !== positionRef.current.y) {
            setPosition(clamped);
            positionRef.current = clamped;
          }
        }
      }
    };
    
    // Try to initialize immediately
    initializePosition();
    
    // If not initialized yet, try again after a short delay (container might not be ready)
    if (!initializedRef.current) {
      const timeout = setTimeout(() => {
        initializePosition();
      }, 50);
      
      // Set up resize observer to recalculate boundaries on container size changes
      const container = containerRef.current?.parentElement;
      if (container) {
        const resizeObserver = new ResizeObserver(() => {
          initializePosition();
        });
        resizeObserver.observe(container);
        
        return () => {
          clearTimeout(timeout);
          resizeObserver.disconnect();
        };
      }
      
      return () => {
        clearTimeout(timeout);
      };
    } else {
      // Already initialized - just set up resize observer
      const container = containerRef.current?.parentElement;
      if (container) {
        const resizeObserver = new ResizeObserver(() => {
          initializePosition();
        });
        resizeObserver.observe(container);
        
        return () => {
          resizeObserver.disconnect();
        };
      }
    }
  }, [calculateBoundaries, clampToBoundaries]);
  
  /**
   * Movement update loop using requestAnimationFrame.
   * Updates character position every frame based on pressed keys and delta time.
   */
  useEffect(() => {
    // Don't start loop if game is not playing, paused, or over
    if (!gameState.isPlaying || gameState.isPaused || gameState.gameOver) {
      lastFrameTimeRef.current = null;
      return;
    }
    
    let animationFrameId: number | null = null;
    let isRunning = true;
    
    const updateMovement = (currentTime: number) => {
      // Check if we should continue (game state might have changed)
      if (!isRunning || !gameState.isPlaying || gameState.isPaused || gameState.gameOver) {
        lastFrameTimeRef.current = null;
        return;
      }
      
      // Initialize lastFrameTime on first frame
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = currentTime;
        if (isRunning) {
          animationFrameId = requestAnimationFrame(updateMovement);
        }
        return;
      }
      
      // Calculate delta time in seconds
      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = currentTime;
      
      // Get movement direction from pressed keys
      const direction = calculateMovementDirection();
      
      // Update moving state for animation
      const moving = (direction.x !== 0 || direction.y !== 0) && initializedRef.current;
      setIsMoving(moving);
      
      // Only update if there's movement and character is initialized
      if (moving) {
        // Calculate shop buff for movement speed (Story 3.4)
        const purchasedBuffs = getPurchasedBuffs(progressionState.purchasedItems);
        const speedBuff = purchasedBuffs.find((buff) => {
          const effect = getBuffEffect(buff.id);
          return effect?.type === 'speed';
        });
        const speedBuffPercent = speedBuff ? getBuffEffect(speedBuff.id)?.value ?? 0 : 0;
        
        // Calculate movement speed with level bonuses and shop buffs applied (Story 3.3, 3.4)
        const speed = getMovementSpeedWithBonuses(
          CHARACTER_MOVEMENT_SPEED,
          progressionState.level,
          speedBuffPercent
        ); // pixels per second with level bonuses and shop buffs
        const distanceX = direction.x * speed * deltaTime;
        const distanceY = direction.y * speed * deltaTime;
        
        // Calculate new position
        const currentPos = positionRef.current;
        const newPosition = {
          x: currentPos.x + distanceX,
          y: currentPos.y + distanceY,
        };
        
        // Clamp to boundaries
        const clampedPosition = clampToBoundaries(newPosition);
        
        // Update position
        setPosition(clampedPosition);
      }
      
      // Continue loop
      if (isRunning) {
        animationFrameId = requestAnimationFrame(updateMovement);
      }
    };
    
    // Start movement loop
    animationFrameId = requestAnimationFrame(updateMovement);
    
    // Cleanup
    return () => {
      isRunning = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      lastFrameTimeRef.current = null;
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.gameOver, calculateMovementDirection, clampToBoundaries, progressionState.level, progressionState.purchasedItems]);
  
  /**
   * Keyboard input handling.
   * Tracks which keys are currently pressed for movement.
   * Also handles E key for event interaction.
   */
  useEffect(() => {
    /**
     * Normalize key to consistent format for WASD keys.
     * Always converts to lowercase for WASD, keeps arrow keys as-is.
     */
    const normalizeKey = (key: string): string | null => {
      const lowerKey = key.toLowerCase();
      
      // Normalize WASD keys to lowercase
      if (lowerKey === 'w') return 'w';
      if (lowerKey === 'a') return 'a';
      if (lowerKey === 's') return 's';
      if (lowerKey === 'd') return 'd';
      
      // Keep arrow keys as-is
      if (key === 'ArrowUp') return 'ArrowUp';
      if (key === 'ArrowDown') return 'ArrowDown';
      if (key === 'ArrowLeft') return 'ArrowLeft';
      if (key === 'ArrowRight') return 'ArrowRight';
      
      return null;
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      const normalizedKey = normalizeKey(event.key);
      
      // Handle E key for event interaction
      if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        handleEventInteraction();
        return;
      }
      
      // Only track movement keys (WASD and arrow keys)
      if (normalizedKey) {
        // Prevent default scrolling behavior for arrow keys
        event.preventDefault();
        
        setPressedKeys((prev) => {
          const newSet = new Set(prev);
          newSet.add(normalizedKey);
          return newSet;
        });
      }
    };
    
    const handleKeyUp = (event: KeyboardEvent) => {
      const normalizedKey = normalizeKey(event.key);
      
      // Remove key from pressed set
      if (normalizedKey) {
        setPressedKeys((prev) => {
          const newSet = new Set(prev);
          newSet.delete(normalizedKey);
          return newSet;
        });
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleEventInteraction]);
  
  // Don't render if game is not playing
  if (!gameState.isPlaying || gameState.gameOver) {
    return null;
  }
  
  // Get equipped character skin from ProgressionContext (Story 4.7)
  const equippedSkin = progressionState.equippedItems.characterSkin;
  // Map skin IDs to CSS class names (CSS Modules requires known class names)
  let skinClass = '';
  if (equippedSkin === 'skin-cozy-sweater') {
    skinClass = styles['skin-cozy-sweater'];
  }
  
  return (
    <div
      ref={containerRef}
      className={styles.character}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`, // GPU-accelerated transform
        opacity: isInitialized ? 1 : 0, // Fade in when initialized
      }}
    >
      {/* Character visual - cozy Ukrainian character */}
      <div className={`${styles.characterVisual} ${isMoving ? styles.walking : ''} ${skinClass}`}>
        <div className={styles.body}>
          {/* UnitySpace text is added via CSS ::before */}
          {/* Arms */}
          <div className={styles.armLeft} />
          <div className={styles.armRight} />
        </div>
        {/* Legs */}
        <div className={styles.legs}>
          <div className={styles.legLeft} />
          <div className={styles.legRight} />
        </div>
        <div className={styles.eyes}>
          <span className={styles.eye} />
          <span className={styles.eye} />
        </div>
      </div>
    </div>
  );
}


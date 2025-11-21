/**
 * Distance Calculation Utilities
 * 
 * Provides utility functions for calculating distances between game objects,
 * particularly for interaction range detection.
 * 
 * @example
 * ```typescript
 * import { calculateDistance, isWithinInteractionRange } from './utils/distance';
 * 
 * const distance = calculateDistance(characterPos, eventLocation);
 * const canInteract = isWithinInteractionRange(characterPos, eventLocation, 50);
 * ```
 */

/**
 * Position interface for distance calculations.
 */
export interface Position {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Calculates the Euclidean distance between two positions.
 * 
 * Uses the standard distance formula: sqrt((x2-x1)² + (y2-y1)²)
 * 
 * @param pos1 - First position
 * @param pos2 - Second position
 * @returns Distance in pixels
 * 
 * @example
 * ```typescript
 * const distance = calculateDistance(
 *   { x: 100, y: 100 },
 *   { x: 150, y: 150 }
 * );
 * // Returns approximately 70.71
 * ```
 */
export function calculateDistance(pos1: Position, pos2: Position): number {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Checks if a character position is within interaction range of an event location.
 * 
 * Calculates the distance between character and event, then checks if it's
 * within the specified interaction range.
 * 
 * @param characterPos - Character position in pixels
 * @param eventLocation - Event location (can be percentage-based or pixel-based)
 * @param range - Interaction range in pixels
 * @param containerSize - Optional container size for percentage-based locations
 * @returns True if character is within interaction range, false otherwise
 * 
 * @example
 * ```typescript
 * const canInteract = isWithinInteractionRange(
 *   { x: 100, y: 100 },
 *   { x: 0.5, y: 0.5 }, // percentage-based
 *   50,
 *   { width: 800, height: 600 }
 * );
 * ```
 */
export function isWithinInteractionRange(
  characterPos: Position,
  eventLocation: Position,
  range: number,
  containerSize?: { width: number; height: number }
): boolean {
  // Convert percentage-based location to pixels if container size is provided
  let eventPos: Position;
  
  if (containerSize && (eventLocation.x <= 1.0 && eventLocation.y <= 1.0)) {
    // Assume percentage-based (0.0 to 1.0)
    eventPos = {
      x: eventLocation.x * containerSize.width,
      y: eventLocation.y * containerSize.height,
    };
  } else {
    // Assume pixel-based
    eventPos = eventLocation;
  }
  
  const distance = calculateDistance(characterPos, eventPos);
  return distance <= range;
}


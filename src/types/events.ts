/**
 * Event System Type Definitions
 * 
 * Defines types for the game's event system, including event types, priorities,
 * and the structure of game events that spawn during gameplay.
 * 
 * Events represent time-pressured situations that the player must resolve,
 * such as a boiling kettle, low phone battery, stressed cat, or candle going out.
 */

/**
 * Union type representing the different types of events that can occur in the game.
 * 
 * Each event type represents a specific situation requiring player interaction:
 * - `'phone'`: Low phone battery event
 * - `'kettle'`: Boiling kettle event
 * - `'cat'`: Stressed cat event
 * - `'candle'`: Candle needed/going out event
 */
export type EventType = 'phone' | 'kettle' | 'cat' | 'candle';

/**
 * Union type representing the priority level of an event.
 * 
 * Priority determines the urgency and impact of the event:
 * - `'minor'`: Low priority, minimal impact if missed
 * - `'standard'`: Normal priority, moderate impact
 * - `'critical'`: High priority, significant impact if missed
 */
export type EventPriority = 'minor' | 'standard' | 'critical';

/**
 * Represents a single game event that requires player interaction.
 * 
 * Events spawn during gameplay at specific locations and have countdown timers.
 * Players must interact with events before they expire to earn rewards.
 * Missing events results in penalties to coziness and score.
 * 
 * @property id - Unique identifier for this event instance
 * @property type - The type of event (phone, kettle, cat, candle)
 * @property priority - The priority level (minor, standard, critical)
 * @property location - Screen coordinates where the event appears (x, y)
 * @property timer - Time remaining in seconds before event expires
 * @property points - Points awarded when event is successfully resolved
 * @property cozinessReward - Coziness gained when event is resolved
 * @property cozinessPenalty - Coziness lost when event expires without resolution
 * 
 * @example
 * ```typescript
 * const event: GameEvent = {
 *   id: 'event-123',
 *   type: 'kettle',
 *   priority: 'critical',
 *   location: { x: 150, y: 200 },
 *   timer: 10,
 *   points: 50,
 *   cozinessReward: 5,
 *   cozinessPenalty: -10
 * };
 * ```
 */
export interface GameEvent {
  /** Unique identifier for this event instance */
  id: string;
  /** The type of event (phone, kettle, cat, candle) */
  type: EventType;
  /** The priority level (minor, standard, critical) */
  priority: EventPriority;
  /** Screen coordinates where the event appears */
  location: {
    /** X coordinate on screen */
    x: number;
    /** Y coordinate on screen */
    y: number;
  };
  /** Time remaining in seconds before event expires */
  timer: number;
  /** Points awarded when event is successfully resolved */
  points: number;
  /** Coziness gained when event is resolved */
  cozinessReward: number;
  /** Coziness lost when event expires without resolution */
  cozinessPenalty: number;
}


/**
 * Event Manager
 * 
 * Central event lifecycle manager for the game's event system.
 * Handles event spawning, tracking active events, and managing event limits.
 * 
 * Features:
 * - Event spawning with level-based limits
 * - Random event type selection
 * - Priority assignment based on event type
 * - Location assignment from valid apartment locations
 * - Unique event ID generation
 * - Integration with GameContext for state management
 * 
 * This is a pure class (no React dependencies) for testability.
 * Events are created here but managed in GameContext for React state updates.
 * 
 * @example
 * ```typescript
 * const eventManager = new EventManager();
 * const event = eventManager.spawnEvent(1, addEventToContext);
 * if (event) {
 *   console.log('Event spawned:', event);
 * }
 * ```
 */

import type { GameEvent, EventType, EventPriority } from '../types/events';
import {
  getMaxSimultaneousEvents,
  getEventTimerDuration,
  EVENT_LOCATIONS,
  EVENT_SCORING,
  EVENT_COZINESS_IMPACT,
  EVENT_INTERACTION_TEXT,
} from '../utils/constants';

/**
 * Event type to priority mapping.
 * 
 * Maps each event type to its priority level:
 * - phone → standard priority
 * - kettle → critical priority (high urgency)
 * - cat → minor priority (low urgency)
 * - candle → standard priority
 * 
 * @see docs/prd.md#Event-Types-&-Scoring
 */
const EVENT_TYPE_TO_PRIORITY: Readonly<Record<EventType, EventPriority>> = {
  phone: 'standard',
  kettle: 'critical',
  cat: 'minor',
  candle: 'standard',
} as const;

/**
 * Available event types for random selection.
 */
const EVENT_TYPES: readonly EventType[] = ['phone', 'kettle', 'cat', 'candle'] as const;

/**
 * Callback function type for adding events to GameContext.
 * 
 * This function will be called when an event is spawned to add it to the game state.
 */
export type AddEventCallback = (event: GameEvent) => void;

/**
 * Callback function type for removing events from GameContext.
 * 
 * This function will be called when an event is resolved or expired to remove it from the game state.
 */
export type RemoveEventCallback = (eventId: string) => void;

/**
 * EventManager class.
 * 
 * Manages event spawning and tracking for the game.
 * Events are spawned based on level-based limits and added to GameContext.
 * 
 * The class maintains a reference to active events count but doesn't store
 * the events themselves - those are managed by GameContext for React state updates.
 */
export class EventManager {
  /**
   * Callback function to add events to GameContext.
   * 
   * This is called when spawnEvent() successfully creates an event.
   */
  private addEventCallback: AddEventCallback | null = null;

  /**
   * Current active events count.
   * 
   * This is used to check against max simultaneous events before spawning.
   * Should be kept in sync with GameContext.activeEvents.length.
   */
  private activeEventsCount: number = 0;

  /**
   * Last spawned event type.
   * 
   * Used to prevent spawning the same event type consecutively.
   */
  private lastSpawnedEventType: EventType | null = null;

  /**
   * Creates a new EventManager instance.
   * 
   * @param addEventCallback - Callback function to add events to GameContext
   */
  constructor(addEventCallback?: AddEventCallback) {
    if (addEventCallback) {
      this.addEventCallback = addEventCallback;
    }
  }

  /**
   * Sets the callback function for adding events to GameContext.
   * 
   * @param callback - Function to call when an event is spawned
   */
  setAddEventCallback(callback: AddEventCallback): void {
    this.addEventCallback = callback;
  }

  /**
   * Updates the current active events count.
   * 
   * This should be called when events are added or removed from GameContext
   * to keep the count in sync.
   * 
   * @param count - Current number of active events
   */
  setActiveEventsCount(count: number): void {
    this.activeEventsCount = count;
  }

  /**
   * Spawns a new event if conditions are met.
   * 
   * Checks if current active events count is below maximum for the level,
   * then creates a new event with random type, location, and appropriate
   * priority, timer, points, and coziness values.
   * 
   * @param level - Player level (1-based)
   * @param activeEventsCount - Current number of active events (optional, uses internal count if not provided)
   * @returns The spawned GameEvent, or null if spawn failed (at max events)
   * 
   * @example
   * ```typescript
   * const event = eventManager.spawnEvent(1);
   * if (event) {
   *   console.log('Event spawned:', event.id, event.type);
   * }
   * ```
   */
  spawnEvent(level: number, activeEventsCount?: number): GameEvent | null {
    // Use provided count or internal count
    const currentCount = activeEventsCount ?? this.activeEventsCount;
    
    // Get max simultaneous events for this level
    const maxEvents = this.getMaxSimultaneousEvents(level);
    
    // Check if we're at max events
    if (currentCount >= maxEvents) {
      return null; // Cannot spawn - at max events
    }

    // Randomly select event type (avoiding consecutive identical types)
    const eventType = this.selectRandomEventType();
    
    // Get priority from event type mapping
    const priority = EVENT_TYPE_TO_PRIORITY[eventType];
    
    // Get location from EVENT_LOCATIONS constant (percentage-based)
    const locationPercent = EVENT_LOCATIONS[eventType];
    
    // For now, we'll use percentage-based locations directly
    // Actual pixel coordinates will be calculated in the component based on container size
    // Store as percentage (0.0 to 1.0) for responsive positioning
    const location = {
      x: locationPercent.x,
      y: locationPercent.y,
    };
    
    // Get timer duration based on level
    const timer = getEventTimerDuration(level);
    
    // Get points value from EVENT_SCORING constant
    const points = EVENT_SCORING[priority];
    
    // Get coziness reward/penalty from EVENT_COZINESS_IMPACT constant
    const cozinessImpact = EVENT_COZINESS_IMPACT[priority];
    const cozinessReward = cozinessImpact.reward;
    const cozinessPenalty = cozinessImpact.penalty;
    
    // Get interaction text from EVENT_INTERACTION_TEXT constant
    const interactionText = EVENT_INTERACTION_TEXT[eventType];
    
    // Generate unique event ID (timestamp + random string)
    const id = this.generateEventId();
    
    // Create GameEvent object with all properties
    const event: GameEvent = {
      id,
      type: eventType,
      priority,
      location,
      timer,
      points,
      cozinessReward,
      cozinessPenalty,
      interactionText,
    };
    
    // If callback is set, add event to GameContext
    if (this.addEventCallback) {
      this.addEventCallback(event);
    }
    
    // Update internal count
    this.activeEventsCount = currentCount + 1;
    
    return event;
  }

  /**
   * Gets currently active events.
   * 
   * Note: This returns a defensive copy of events if we were storing them internally.
   * Since events are managed in GameContext, this method is mainly for consistency
   * with the API contract. The actual events should be retrieved from GameContext.
   * 
   * @returns Empty array (events are managed in GameContext)
   * 
   * @deprecated Events are managed in GameContext, use GameContext.activeEvents instead
   */
  getActiveEvents(): GameEvent[] {
    // Events are managed in GameContext, not in EventManager
    // This method is here for API consistency but returns empty array
    // Actual events should be retrieved from GameContext
    return [];
  }

  /**
   * Gets maximum simultaneous events for a given level.
   * 
   * Returns the maximum number of events that can be active at once for the specified level.
   * Uses the helper function from constants.ts.
   * 
   * @param level - Player level (1-based)
   * @returns Maximum number of simultaneous events
   * 
   * @example
   * ```typescript
   * const maxEvents = eventManager.getMaxSimultaneousEvents(3); // Returns 3
   * ```
   */
  getMaxSimultaneousEvents(level: number): number {
    return getMaxSimultaneousEvents(level);
  }

  /**
   * Updates all event timers and detects expired events.
   * 
   * Updates all event timers using delta time (frame-rate independent).
   * Checks for expired events (timer <= 0) and returns them for processing.
   * Expired events are automatically removed from active events via callback.
   * 
   * @param deltaTime - Time elapsed since last frame in seconds
   * @param activeEvents - Array of currently active events (from GameContext)
   * @param removeEventCallback - Callback function to remove events from GameContext
   * @returns Array of expired events that were removed
   * 
   * @example
   * ```typescript
   * const expiredEvents = eventManager.updateEvents(deltaTime, activeEvents, removeEvent);
   * expiredEvents.forEach(event => {
   *   // Apply coziness penalty
   *   setCoziness(prev => prev + event.cozinessPenalty);
   * });
   * ```
   */
  updateEvents(
    deltaTime: number,
    activeEvents: GameEvent[],
    removeEventCallback: RemoveEventCallback
  ): GameEvent[] {
    const expiredEvents: GameEvent[] = [];

    // Update timers and detect expired events
    for (const event of activeEvents) {
      // Update timer (decrease by delta time)
      event.timer -= deltaTime;
      
      // Clamp timer to 0 to prevent negative values from being displayed
      // This ensures timer display never shows "-1s" etc. before event is removed
      event.timer = Math.max(0, event.timer);

      // Check if event expired (timer <= 0)
      if (event.timer <= 0) {
        // Mark as expired and remove from active events
        expiredEvents.push(event);
        removeEventCallback(event.id);
      }
    }

    return expiredEvents;
  }

  /**
   * Resolves an event (player successfully interacted with it).
   * 
   * Finds the event by ID, removes it from active events, and returns the event data
   * for score/coziness calculation. Returns null if event not found.
   * 
   * @param eventId - Unique identifier of the event to resolve
   * @param activeEvents - Array of currently active events (from GameContext)
   * @param removeEventCallback - Callback function to remove events from GameContext
   * @returns The resolved GameEvent, or null if not found
   * 
   * @example
   * ```typescript
   * const resolvedEvent = eventManager.resolveEvent(eventId, activeEvents, removeEvent);
   * if (resolvedEvent) {
   *   setScore(prev => prev + resolvedEvent.points);
   *   setCoziness(prev => prev + resolvedEvent.cozinessReward);
   * }
   * ```
   */
  resolveEvent(
    eventId: string,
    activeEvents: GameEvent[],
    removeEventCallback: RemoveEventCallback
  ): GameEvent | null {
    // Find event by ID
    const event = activeEvents.find((e) => e.id === eventId);

    if (!event) {
      return null; // Event not found
    }

    // Remove event from active events
    removeEventCallback(eventId);

    // Return event data for score/coziness calculation
    return event;
  }

  /**
   * Expires an event (timer reached 0 without player interaction).
   * 
   * Finds the event by ID, removes it from active events, and returns the event data
   * for coziness penalty calculation. Returns null if event not found.
   * 
   * Note: This method is similar to resolveEvent but semantically represents expiration.
   * In practice, expired events are typically handled by updateEvents(), but this method
   * provides explicit expiration handling when needed.
   * 
   * @param eventId - Unique identifier of the event to expire
   * @param activeEvents - Array of currently active events (from GameContext)
   * @param removeEventCallback - Callback function to remove events from GameContext
   * @returns The expired GameEvent, or null if not found
   * 
   * @example
   * ```typescript
   * const expiredEvent = eventManager.expireEvent(eventId, activeEvents, removeEvent);
   * if (expiredEvent) {
   *   setCoziness(prev => prev + expiredEvent.cozinessPenalty);
   * }
   * ```
   */
  expireEvent(
    eventId: string,
    activeEvents: GameEvent[],
    removeEventCallback: RemoveEventCallback
  ): GameEvent | null {
    // Find event by ID
    const event = activeEvents.find((e) => e.id === eventId);

    if (!event) {
      return null; // Event not found
    }

    // Remove event from active events
    removeEventCallback(eventId);

    // Return event data for coziness penalty calculation
    return event;
  }

  /**
   * Selects a random event type from available types.
   * 
   * Ensures the selected type is different from the last spawned event type
   * to provide variety and prevent consecutive identical events.
   * 
   * @returns Random EventType (different from last spawned type if possible)
   */
  private selectRandomEventType(): EventType {
    // Filter out the last spawned event type if it exists
    const availableTypes = this.lastSpawnedEventType
      ? EVENT_TYPES.filter((type) => type !== this.lastSpawnedEventType)
      : EVENT_TYPES;

    // Select random type from available types
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    const selectedType = availableTypes[randomIndex];

    // Update last spawned type
    this.lastSpawnedEventType = selectedType;

    return selectedType;
  }

  /**
   * Generates a unique event ID.
   * 
   * Format: timestamp + random string to ensure uniqueness.
   * 
   * @returns Unique event ID string
   */
  private generateEventId(): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9); // 7 random characters
    return `event-${timestamp}-${randomStr}`;
  }
}


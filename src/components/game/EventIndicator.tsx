/**
 * Event Indicator Component
 * 
 * Displays visual indicators for active game events on the apartment layout.
 * Shows event icons above event locations with color-coded priorities.
 * 
 * Features:
 * - Icon display for each event type (phone, kettle, cat, candle)
 * - Color-coded priority indicators (minor: blue, standard: yellow, critical: orange/red)
 * - Positioned at event locations (percentage-based coordinates converted to pixels)
 * - Visible indicators that update in real-time
 * 
 * Note: This is a basic implementation for Story 2.4 to verify event spawning.
 * Story 2.7 will enhance this with full visual polish and animations.
 * 
 * @example
 * ```tsx
 * <EventIndicator event={gameEvent} />
 * ```
 */

import React from 'react';
import type { GameEvent } from '../../types/events';
import { useEventInteraction } from '../../hooks/useEventInteraction';
import { TRANSLATIONS } from '../../utils/translations';
import styles from './EventIndicator.module.css';
import phoneIcon from '../../assets/phone-icon.svg';
import kettleIcon from '../../assets/kettle-icon.svg';
import catIcon from '../../assets/cat-icon.svg';
import candleIcon from '../../assets/candle-icon.svg';

/**
 * Event type to SVG icon mapping.
 */
const EVENT_TYPE_ICONS: Record<GameEvent['type'], string> = {
  phone: phoneIcon,
  kettle: kettleIcon,
  cat: catIcon,
  candle: candleIcon,
} as const;

/**
 * Priority to CSS class mapping.
 */
const PRIORITY_CLASSES: Record<GameEvent['priority'], string> = {
  minor: styles.priorityMinor,
  standard: styles.priorityStandard,
  critical: styles.priorityCritical,
} as const;

/**
 * EventIndicator component props.
 */
interface EventIndicatorProps {
  /** The game event to display */
  event: GameEvent;
  /** Container element ref for calculating position (optional) */
  containerRef?: React.RefObject<HTMLElement>;
  /** Stack offset index for multiple events at same location (0 = no offset) */
  stackOffset?: number;
  /** Animation state: 'success' triggers success animation, 'failure' triggers failure animation */
  animationState?: 'success' | 'failure' | null;
}

/**
 * EventIndicator component.
 * 
 * Renders a visual indicator for a single game event.
 * Positioned at the event's location with appropriate icon and priority color.
 * 
 * @param props - Component props
 * @param props.event - The game event to display
 * @param props.containerRef - Optional container ref for position calculation
 * @returns React element representing the event indicator
 */
export function EventIndicator({ event, containerRef, stackOffset = 0, animationState = null }: EventIndicatorProps) {
  // Get container size for percentage-based locations
  // Using useMemo to avoid accessing refs during render
  const getContainerSize = React.useCallback((): { width: number; height: number } | undefined => {
    if (containerRef?.current) {
      const rect = containerRef.current.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
      };
    }
    return undefined;
  }, [containerRef]);
  
  // Event interaction hook - pass function to recalculate container size dynamically
  const { handleEventInteraction } = useEventInteraction(getContainerSize);
  
  // Handle click on event indicator
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEventInteraction(event);
  };
  
  // Get icon for event type
  const icon = EVENT_TYPE_ICONS[event.type];
  
  // Get priority CSS class
  const priorityClass = PRIORITY_CLASSES[event.priority];
  
  // Get animation CSS class based on animation state
  const animationClass = animationState === 'success' 
    ? styles.animationSuccess 
    : animationState === 'failure' 
    ? styles.animationFailure 
    : '';
  
  // Get Ukrainian text for event type and description
  const eventTypeName = TRANSLATIONS.eventTypes[event.type];
  const eventDescription = TRANSLATIONS.eventDescriptions[event.type];
  
  // Priority labels in Ukrainian
  const priorityLabels: Record<GameEvent['priority'], string> = {
    minor: 'низький',
    standard: 'середній',
    critical: 'критичний',
  };
  const priorityLabel = priorityLabels[event.priority];
  
  // Calculate timer percentage (0 to 1) for circular timer ring
  // Timer starts at full duration and counts down to 0
  // Events typically last 5-10 seconds based on level (see constants.ts)
  // Since we don't have the initial duration stored in GameEvent,
  // we'll use a reasonable max duration (10 seconds) for visual calculation
  // This provides a clear countdown effect: full ring at 10s, empty at 0s
  const timerSeconds = Math.max(0, event.timer);
  
  // Use 10 seconds as the visual max duration (covers typical event durations 5-10s)
  // This ensures the ring always shows meaningful countdown visualization
  // For events with longer durations, ring will show full until it reaches 10s
  const visualMaxDuration = 10; // seconds - typical max event duration
  const timerPercentage = Math.min(1, timerSeconds / visualMaxDuration);
  
  // Convert percentage to degrees for conic-gradient (0% = 0deg, 100% = 360deg)
  // conic-gradient starts at top (12 o'clock) and goes clockwise
  // We show the remaining time as a filled portion of the ring
  // remainingDegrees represents how much of the ring is still "filled"
  const remainingDegrees = timerPercentage * 360;
  
  // Get priority color for timer ring
  const getTimerRingColor = () => {
    switch (event.priority) {
      case 'minor':
        return '#64b5f6'; // soft blue
      case 'standard':
        return '#fff176'; // light yellow
      case 'critical':
        return '#ff8c42'; // orange/red
      default:
        return '#64b5f6';
    }
  };
  
  const timerRingColor = getTimerRingColor();
  
  // Convert percentage-based location to pixel position
  // Location is stored as percentage (0.0 to 1.0) for responsive positioning
  // We need to calculate pixel position based on container size
  // Using useMemo to avoid accessing refs during render
  const position = React.useMemo(() => {
    // Always use percentage directly (will be relative to positioned parent)
    // Container ref is used for event interaction, not for positioning
    return {
      left: `${event.location.x * 100}%`,
      top: `${event.location.y * 100}%`,
    };
  }, [event.location.x, event.location.y]);
  
  // Calculate stack offset transform
  // Vertical offset: stackOffset * 60px (enough spacing to prevent overlap)
  // Slight horizontal offset for visual clarity: alternating left/right
  // Base transform is translate(-50%, -50%) from CSS, we add stack offset before it
  const stackOffsetX = stackOffset > 0 ? (stackOffset % 2 === 0 ? 10 : -10) : 0;
  const stackOffsetY = stackOffset > 0 ? -stackOffset * 60 : 0;
  
  return (
    <div
      className={`${styles.eventIndicator} ${priorityClass} ${animationClass}`}
      style={{
        left: position.left,
        top: position.top,
        // Override CSS transform to include stack offset with GPU acceleration
        transform: `translate3d(calc(-50% + ${stackOffsetX}px), calc(-50% + ${stackOffsetY}px), 0)`,
        cursor: animationState ? 'default' : 'pointer', // Disable pointer when animating
      }}
      title={`${eventTypeName} (${priorityLabel}) - Таймер: ${timerSeconds.toFixed(1)}с - ${TRANSLATIONS.gameplay.eventInteraction}`}
      onClick={handleClick}
      role="button"
      aria-label={`${eventDescription}. ${TRANSLATIONS.gameplay.eventInteraction}`}
      tabIndex={0}
      onKeyDown={(e) => {
        // Allow Enter or Space to trigger interaction
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {/* Circular timer ring container */}
      <div className={styles.timerRingContainer}>
        {/* Circular timer ring using conic-gradient */}
        <div
          className={styles.timerRing}
          style={{
            background: `conic-gradient(
              ${timerRingColor} 0deg ${remainingDegrees}deg,
              transparent ${remainingDegrees}deg 360deg
            )`,
          }}
        />
        {/* Icon centered inside timer ring */}
        <img 
          src={icon} 
          alt={eventDescription}
          className={styles.icon}
        />
      </div>
      {/* Timer text below icon */}
      <span className={styles.timer}>{timerSeconds.toFixed(0)}s</span>
    </div>
  );
}

/**
 * EventIndicators component.
 * 
 * Renders all active events from GameContext.
 * Maps over activeEvents array and renders EventIndicator for each.
 * 
 * @param props - Component props
 * @param props.events - Array of active game events
 * @param props.containerRef - Optional container ref for position calculation
 * @returns React element containing all event indicators
 */
interface EventIndicatorsProps {
  /** Array of active game events */
  events: GameEvent[];
  /** Optional container ref for position calculation */
  containerRef?: React.RefObject<HTMLElement>;
  /** Map of event IDs to animation states */
  eventAnimations?: Map<string, 'success' | 'failure'>;
}

/**
 * Groups events by location (with tolerance for "same location").
 * 
 * Events are considered at the same location if their x and y coordinates
 * are within 0.01 (1%) of each other.
 * 
 * @param events - Array of game events
 * @returns Map of location keys to arrays of events at that location
 */
function groupEventsByLocation(events: GameEvent[]): Map<string, GameEvent[]> {
  const locationTolerance = 0.01; // 1% tolerance for "same location"
  const groups = new Map<string, GameEvent[]>();
  
  for (const event of events) {
    // Find existing group with similar location
    let matchedGroup: string | null = null;
    
    for (const [locationKey] of groups.entries()) {
      const [groupX, groupY] = locationKey.split(',').map(Number);
      const distanceX = Math.abs(event.location.x - groupX);
      const distanceY = Math.abs(event.location.y - groupY);
      
      if (distanceX < locationTolerance && distanceY < locationTolerance) {
        matchedGroup = locationKey;
        break;
      }
    }
    
    if (matchedGroup) {
      // Add to existing group
      groups.get(matchedGroup)!.push(event);
    } else {
      // Create new group with rounded location key
      const locationKey = `${Math.round(event.location.x * 100) / 100},${Math.round(event.location.y * 100) / 100}`;
      groups.set(locationKey, [event]);
    }
  }
  
  return groups;
}

export function EventIndicators({ events, containerRef, eventAnimations = new Map() }: EventIndicatorsProps) {
  if (events.length === 0) {
    return null;
  }
  
  // Group events by location for stacking
  const locationGroups = groupEventsByLocation(events);
  
  // Flatten groups back into array with stack offsets
  const eventsWithOffsets: Array<{ event: GameEvent; stackOffset: number }> = [];
  
  for (const groupEvents of locationGroups.values()) {
    // Sort by priority (critical first, then standard, then minor) for visual hierarchy
    const sortedEvents = [...groupEvents].sort((a, b) => {
      const priorityOrder: Record<GameEvent['priority'], number> = {
        critical: 0,
        standard: 1,
        minor: 2,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    // Assign stack offsets (0 = first/primary, 1+ = stacked)
    sortedEvents.forEach((event, index) => {
      eventsWithOffsets.push({
        event,
        stackOffset: index,
      });
    });
  }
  
  return (
    <>
      {eventsWithOffsets.map(({ event, stackOffset }) => (
        <EventIndicator 
          key={event.id} 
          event={event} 
          containerRef={containerRef}
          stackOffset={stackOffset}
          animationState={eventAnimations.get(event.id) || null}
        />
      ))}
    </>
  );
}


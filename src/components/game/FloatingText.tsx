/**
 * FloatingText Component
 * 
 * Displays floating text that animates upward and fades out.
 * Used for visual feedback when events are resolved (points, coziness gain).
 * 
 * Features:
 * - Animates upward (translateY) and fades out (opacity)
 * - Auto-removes after animation completes
 * - Positioned at event location
 * - GPU-accelerated CSS animations for performance
 * 
 * @example
 * ```tsx
 * <FloatingText text="+15" color="#ffffff" position={{ x: 100, y: 200 }} />
 * ```
 */

import { useEffect, useState } from 'react';
import styles from './FloatingText.module.css';

/**
 * FloatingText component props.
 */
interface FloatingTextProps {
  /** Text to display */
  text: string;
  /** Text color (CSS color value) */
  color: string;
  /** Position where text appears (x, y in pixels or percentage) */
  position: { x: number; y: number };
  /** Optional delay before animation starts (in milliseconds) */
  delay?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
}

/**
 * FloatingText component.
 * 
 * Renders floating text that animates upward and fades out.
 * Automatically removes itself after animation completes.
 * 
 * @param props - Component props
 * @returns React element representing floating text, or null if animation complete
 */
export function FloatingText({ 
  text, 
  color, 
  position, 
  delay = 0,
  onComplete 
}: FloatingTextProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Handle delay if specified
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    }
    
    // Animation duration is ~800-1000ms (defined in CSS)
    // Remove component after animation completes
    const animationDuration = 1000; // Match CSS animation duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, animationDuration);
    
    return () => clearTimeout(timer);
  }, [delay, onComplete]);
  
  if (!isVisible) {
    return null;
  }
  
  // Convert position to CSS values
  // If position values are <= 1.0, treat as percentage, otherwise as pixels
  // Note: We use absolute positioning relative to the parent (Apartment component)
  const left = position.x <= 1.0 ? `${position.x * 100}%` : `${position.x}px`;
  const top = position.y <= 1.0 ? `${position.y * 100}%` : `${position.y}px`;
  
  return (
    <div
      className={styles.floatingText}
      style={{
        left,
        top,
        color,
        opacity: delay > 0 ? 0 : 1, // Start invisible if delay, CSS animation will handle fade-in
      }}
    >
      {text}
    </div>
  );
}


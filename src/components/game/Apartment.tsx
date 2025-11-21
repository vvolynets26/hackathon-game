/**
 * Apartment Component
 * 
 * Displays the apartment layout and background with Ukrainian cozy details.
 * Provides the visual game space where character movement and events occur.
 * 
 * Features:
 * - Dark "Cozy Blackout" theme background (dark blues/greys)
 * - Simple 2D layout (single screen or 2-3 rooms)
 * - Furniture and objects positioned in apartment
 * - Ukrainian cozy details: Гном з JYSK, Килим на стіні, Плед в клітинку
 * - Defines boundaries for character movement
 * - Provides locations for event objects
 * 
 * @example
 * ```tsx
 * <Apartment />
 * ```
 */

import { useEffect, useRef, useState } from 'react';
import { Character } from './Character';
import { EventIndicators } from './EventIndicator';
import { HUD } from '../ui/HUD';
import { FloatingText } from './FloatingText';
import { useGame } from '../../contexts/GameContext';
import { useProgression } from '../../contexts/ProgressionContext';
import { useGameLoop, initializeGameState } from '../../hooks/useGameLoop';
import type { GameEvent } from '../../types/events';
import styles from './Apartment.module.css';

/**
 * Apartment component.
 * 
 * Renders the apartment layout as the game container/background.
 * Also initializes and runs the game loop.
 * 
 * @returns React element representing the apartment layout
 */
/**
 * FloatingText instance data.
 */
interface FloatingTextData {
  id: string;
  text: string;
  color: string;
  position: { x: number; y: number };
}

export function Apartment() {
  const gameContext = useGame();
  const { progressionState } = useProgression();
  const apartmentRef = useRef<HTMLDivElement>(null);
  const [screenShake, setScreenShake] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingTextData[]>([]);
  const [eventAnimations, setEventAnimations] = useState<Map<string, 'success' | 'failure'>>(new Map());
  
  // Initialize game loop
  useGameLoop();
  
  // Initialize game state when component mounts (triggered by welcome screen start button)
  // Use player level from ProgressionContext for level-based bonuses (Story 3.3)
  // Use purchasedItems for shop buffs (Story 3.4)
  useEffect(() => {
    // Only initialize if game is not already playing
    if (!gameContext.gameState.isPlaying) {
      initializeGameState(gameContext, progressionState.level, progressionState.purchasedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once when component mounts
  
  // Handle screen shake from custom events
  useEffect(() => {
    const handleScreenShake = () => {
      setScreenShake(true);
      setTimeout(() => {
        setScreenShake(false);
      }, 300); // Match animation duration
    };
    
    window.addEventListener('game:screenShake', handleScreenShake);
    
    return () => {
      window.removeEventListener('game:screenShake', handleScreenShake);
    };
  }, []);
  
  // Handle floating text creation from custom events
  useEffect(() => {
    const handleFloatingText = (event: CustomEvent<FloatingTextData>) => {
      const textData = event.detail;
      setFloatingTexts((prev) => [...prev, textData]);
      
      // Remove after animation completes (1000ms)
      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((t) => t.id !== textData.id));
      }, 1000);
    };
    
    window.addEventListener('game:floatingText', handleFloatingText as EventListener);
    
    return () => {
      window.removeEventListener('game:floatingText', handleFloatingText as EventListener);
    };
  }, []);
  
  // Handle event animation states from custom events
  useEffect(() => {
    const handleEventAnimation = (event: CustomEvent<{ eventId: string; animation: 'success' | 'failure' }>) => {
      const { eventId, animation } = event.detail;
      setEventAnimations((prev) => {
        const newMap = new Map(prev);
        newMap.set(eventId, animation);
        return newMap;
      });
      
      // Remove animation state after animation completes
      const duration = animation === 'success' ? 400 : 500;
      setTimeout(() => {
        setEventAnimations((prev) => {
          const newMap = new Map(prev);
          newMap.delete(eventId);
          return newMap;
        });
      }, duration);
    };
    
    window.addEventListener('game:eventAnimation', handleEventAnimation as EventListener);
    
    return () => {
      window.removeEventListener('game:eventAnimation', handleEventAnimation as EventListener);
    };
  }, []);
  
  return (
    <div 
      ref={apartmentRef} 
      className={`${styles.apartment} ${screenShake ? styles.screenShake : ''}`}
    >
      {/* HUD - always visible at top of screen */}
      <HUD />
      
      {/* Apartment background and base layout */}
      <div className={styles.background} />
      
      {/* Room layout - simple 2D single screen or 2-3 rooms */}
      <div className={styles.rooms}>
        {/* Living room area */}
        <div className={styles.livingRoom}>
          {/* Sofa */}
          <div className={styles.sofa}>
            {/* Плед в клітинку на дивані - Plaid blanket on sofa */}
            <div className={styles.blanket} />
          </div>
          
          {/* Килим на стіні / етно-постер - Carpet on wall or ethno-poster behind sofa */}
          <div className={styles.wallCarpet} />
          
          {/* Shelf with Гном з JYSK - JYSK Gnome */}
          <div className={styles.shelf}>
            <div className={styles.gnome} />
          </div>
          
          {/* TV/Entertainment area */}
          <div className={styles.tvArea} />
        </div>
        
        {/* Kitchen area (optional, can be part of single screen) */}
        <div className={styles.kitchen}>
          {/* Kitchen counter/furniture */}
          <div className={styles.counter} />
        </div>
      </div>
      
      {/* Warm light sources for cozy atmosphere */}
      <div className={styles.lightSources}>
        <div className={styles.candleLight1} />
        <div className={styles.candleLight2} />
      </div>
      
      {/* Cosmetic items: Cat and Candle (Story 4.7) */}
      {/* Get equipped cat and candle from ProgressionContext */}
      {progressionState.equippedItems.cat && (
        <div className={`${styles.cosmeticCat} ${progressionState.equippedItems.cat === 'cat-ginger' ? styles['cat-ginger'] : ''}`} />
      )}
      {progressionState.equippedItems.candle && (
        <div className={`${styles.cosmeticCandle} ${progressionState.equippedItems.candle === 'candle-ginger' ? styles['candle-ginger'] : ''}`} />
      )}
      
      {/* Character component - renders above apartment background */}
      <Character containerRef={apartmentRef} />
      
      {/* Event indicators - render above everything else */}
      <EventIndicators 
        events={gameContext.gameState.activeEvents} 
        containerRef={apartmentRef}
        eventAnimations={eventAnimations}
      />
      
      {/* Floating text feedback - render above event indicators */}
      {floatingTexts.map((textData) => (
        <FloatingText
          key={textData.id}
          text={textData.text}
          color={textData.color}
          position={textData.position}
        />
      ))}
    </div>
  );
}


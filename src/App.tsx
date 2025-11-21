import { useState } from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import { ProgressionProvider, useProgression } from './contexts/ProgressionContext';
import { Apartment } from './components/game/Apartment';
import { WelcomeScreen } from './components/ui/WelcomeScreen';
import { ResultsScreen } from './components/ui/ResultsScreen';
import { Shop } from './components/ui/Shop';
import { initializeGameState } from './hooks/useGameLoop';
import './App.css';

/**
 * Screen type for navigation state.
 */
type Screen = 'menu' | 'game' | 'shop' | 'achievements';

/**
 * Game Content component.
 * 
 * Renders the game content (menu, game, shop, achievements) and results screen.
 * Must be inside GameProvider and ProgressionProvider.
 */
function GameContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [showShop, setShowShop] = useState(false);
  const { gameState, updateGameState, setPlaying, setPaused, setGameOver } = useGame();
  const { progressionState } = useProgression();

  // Handle Play button - start new evening
  const handlePlay = () => {
    // Initialize game state for new evening
    initializeGameState(
      { updateGameState, setPlaying, setPaused, setGameOver },
      progressionState.level,
      progressionState.purchasedItems
    );
    setCurrentScreen('game');
  };

  // Handle Shop button - open shop screen
  const handleShop = () => {
    // If we're in the game, just show shop overlay; otherwise navigate to shop screen
    if (currentScreen === 'game') {
      setShowShop(true);
    } else {
      setCurrentScreen('shop');
      setShowShop(true);
    }
  };

  // Handle Achievements button - open achievements screen
  // Note: Achievements screen not yet implemented (Story 4.8), placeholder for now
  const handleAchievements = () => {
    // TODO: Implement achievements screen when Story 4.8 is complete
    // For now, just show an alert or do nothing
    if (import.meta.env.DEV) {
      console.log('Achievements screen not yet implemented (Story 4.8)');
    }
    // setCurrentScreen('achievements');
  };

  // Handle closing shop - return to previous screen
  const handleCloseShop = () => {
    setShowShop(false);
    // If we're in the game, stay in game; otherwise return to menu
    if (currentScreen === 'game') {
      // Stay in game
    } else {
      setCurrentScreen('menu');
    }
  };

  // Handle returning to menu from results screen
  const handleReturnToMenu = () => {
    setCurrentScreen('menu');
  };

  // Handle opening shop from results screen
  const handleOpenShopFromResults = () => {
    handleShop();
  };

  return (
    <div className="app">
      {/* Show welcome screen on game start or when returning to menu */}
      {currentScreen === 'menu' && (
        <WelcomeScreen
          onPlay={handlePlay}
          onShop={handleShop}
          onAchievements={handleAchievements}
        />
      )}

      {/* Show game when playing */}
      {currentScreen === 'game' && (
        <>
          <Apartment />
          {/* Show results screen when game is over */}
          {gameState.gameOver && (
            <ResultsScreen
              onShopClick={handleOpenShopFromResults}
              onMenuClick={handleReturnToMenu}
            />
          )}
          {/* Show shop screen when shop button is clicked */}
          {showShop && <Shop onClose={handleCloseShop} />}
        </>
      )}

      {/* Show shop screen when navigating to shop from menu */}
      {currentScreen === 'shop' && showShop && (
        <Shop onClose={handleCloseShop} />
      )}

      {/* TODO: Show achievements screen when Story 4.8 is complete */}
      {/* {currentScreen === 'achievements' && (
        <AchievementsScreen onClose={handleReturnToMenu} />
      )} */}
    </div>
  );
}

/**
 * Root App component.
 * 
 * Wraps the application with GameProvider and ProgressionProvider contexts.
 * Manages navigation between welcome screen and game.
 */
function App() {
  return (
    <GameProvider>
      <ProgressionProvider>
        <GameContent />
      </ProgressionProvider>
    </GameProvider>
  );
}

export default App;

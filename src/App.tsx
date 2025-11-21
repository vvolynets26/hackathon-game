import { useState } from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import { ProgressionProvider } from './contexts/ProgressionContext';
import { Apartment } from './components/game/Apartment';
import { WelcomeScreen } from './components/ui/WelcomeScreen';
import { ResultsScreen } from './components/ui/ResultsScreen';
import './App.css';

/**
 * Game Content component.
 * 
 * Renders the game content (welcome screen or apartment) and results screen.
 * Must be inside GameProvider and ProgressionProvider.
 */
function GameContent() {
  const [gameStarted, setGameStarted] = useState(false);
  const { gameState } = useGame();

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <WelcomeScreen onStart={handleStartGame} />
      ) : (
        <>
          <Apartment />
          {/* Show results screen when game is over */}
          {gameState.gameOver && <ResultsScreen />}
        </>
      )}
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

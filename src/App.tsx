import { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import { ProgressionProvider } from './contexts/ProgressionContext';
import { Apartment } from './components/game/Apartment';
import { WelcomeScreen } from './components/ui/WelcomeScreen';
import './App.css';

/**
 * Root App component.
 * 
 * Wraps the application with GameProvider and ProgressionProvider contexts.
 * Manages navigation between welcome screen and game.
 */
function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <GameProvider>
      <ProgressionProvider>
        <div className="app">
          {!gameStarted ? (
            <WelcomeScreen onStart={handleStartGame} />
          ) : (
            <Apartment />
          )}
        </div>
      </ProgressionProvider>
    </GameProvider>
  );
}

export default App;

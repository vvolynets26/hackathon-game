import { GameProvider } from './contexts/GameContext';
import { ProgressionProvider } from './contexts/ProgressionContext';
import './App.css';

/**
 * Root App component.
 * 
 * Wraps the application with GameProvider and ProgressionProvider contexts.
 * Game UI components will be added in future stories (Epic 2+).
 */
function App() {
  return (
    <GameProvider>
      <ProgressionProvider>
        <div className="app">
          <h1>Вечір при блекауті</h1>
          <p>Game UI will be implemented in Epic 2 (Core Gameplay)</p>
        </div>
      </ProgressionProvider>
    </GameProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerForm from './components/PlayerForm';
import GamePage from './components/GamePage';
import GameHistory from './components/GameHistory';

const App = () => {
  const [players, setPlayers] = useState(null);

  const startGame = (player1, player2) => {
    setPlayers({ player1, player2 });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!players ? <PlayerForm onStartGame={startGame} /> : <GamePage player1={players.player1} player2={players.player2} />} />
        <Route path="/history" element={<GameHistory />} />
      </Routes>
    </Router>
  );
};

export default App;

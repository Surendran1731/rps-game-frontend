import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameHistory = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://rps-game-backend-6tk9.onrender.com/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Game History</h2>
      {games.map((game, index) => (
        <div key={index}>
          <h3>Game {index + 1}</h3>
          <p>Player 1: {game.player1Name} | Player 2: {game.player2Name}</p>
          <p>Winner: {game.winner}</p>
          <p>Rounds:</p>
          {game.rounds.map((round, idx) => (
            <p key={idx}>
              Round {idx + 1}: {round.player1Choice} vs {round.player2Choice} - {round.result}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameHistory;

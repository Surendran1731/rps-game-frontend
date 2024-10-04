import React, { useState } from 'react';
import axios from 'axios';

const GamePage = ({ player1, player2 }) => {
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState('');

  const choices = ['stone', 'paper', 'scissors'];

  const determineWinner = (p1Choice, p2Choice) => {
    if (p1Choice === p2Choice) return 'Tie';
    if (
      (p1Choice === 'stone' && p2Choice === 'scissors') ||
      (p1Choice === 'scissors' && p2Choice === 'paper') ||
      (p1Choice === 'paper' && p2Choice === 'stone')
    ) {
      return player1;
    }
    return player2;
  };

  const playRound = () => {
    const result = determineWinner(player1Choice, player2Choice);
    const roundResult = { player1Choice, player2Choice, result };

    if (result === player1) setPlayer1Score(player1Score + 1);
    if (result === player2) setPlayer2Score(player2Score + 1);

    setRounds([...rounds, roundResult]);
    setCurrentRound(currentRound + 1);
    setPlayer1Choice('');
    setPlayer2Choice('');

    if (currentRound === 6) {
      setWinner(player1Score > player2Score ? player1 : player2);
      saveGame();
    }
  };

  const saveGame = async () => {
    const gameData = {
      player1Name: player1,
      player2Name: player2,
      rounds,
      player1Score,
      player2Score,
      winner: player1Score > player2Score ? player1 : player2,
    };

    try {
      await axios.post('https://rps-game-backend-6tk9.onrender.com/api/save-game', gameData);
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  return (
    <div>
      <h2>Round {currentRound}</h2>
      <div>
        <label>Player 1 Choice: </label>
        <select
          value={player1Choice}
          onChange={(e) => setPlayer1Choice(e.target.value)}
        >
          <option value="">Choose</option>
          {choices.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Player 2 Choice: </label>
        <select
          value={player2Choice}
          onChange={(e) => setPlayer2Choice(e.target.value)}
        >
          <option value="">Choose</option>
          {choices.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>
      <button onClick={playRound}>Submit Round</button>

      <h3>Score</h3>
      <p>{player1}: {player1Score}</p>
      <p>{player2}: {player2Score}</p>

      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
};

export default GamePage;

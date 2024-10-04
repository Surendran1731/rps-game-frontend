import React, { useState } from 'react';

const PlayerForm = ({ onStartGame }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player1 && player2) {
      onStartGame(player1, player2);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rock Paper Scissor</h2>
      <input
        type="text"
        placeholder="Player 1 Name"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Player 2 Name"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <button type="submit">Start Game</button>
    </form>
  );
};

export default PlayerForm;

import { useState } from 'react';
import './App.css';

import { record_match } from './lib/matchService';

function App() {
  const [player1username, setPlayer1Username] = useState('');
  const [player2username, setPlayer2Username] = useState('');
  const [winner, setWinner] = useState('');
  const [error, setError] = useState('');

  const handlePlayer1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Username(e.target.value);
  };

  const handlePlayer2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Username(e.target.value);
  };

  const handleWinnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWinner(e.target.value);
  };

  const validateForm = () => {
    if (!player1username || !player2username) {
      setError('Both player names are required');
      return false;
    }

    if (player1username === player2username) {
      setError('Players must have different names');
      return false;
    }

    if (!winner) {
      setError('Please select a winner');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const matchData = {
      player1_username: player1username,
      player2_username: player2username,
      winner: winner,
    };
    record_match(matchData);

    setPlayer1Username('');
    setPlayer2Username('');
    setWinner('');
  };

  return (
    <div className="elo-app">
      <h1>Elo Ranking App</h1>

      <div className="match-form">
        <h2>Record a Match</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="player1">
              Player 1 Username:
              <input
                id="player1"
                type="text"
                name="player1"
                value={player1username}
                onChange={handlePlayer1Change}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="player2">
              Player 2 Username:
              <input
                id="player2"
                type="text"
                name="player2"
                value={player2username}
                onChange={handlePlayer2Change}
              />
            </label>
          </div>

          <div className="form-group">
            <p>Winner:</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="winner"
                  value={player1username}
                  checked={winner === player1username}
                  onChange={handleWinnerChange}
                  disabled={!player1username}
                />
                {player1username ? player1username : 'Player 1'}
              </label>
              <label>
                <input
                  type="radio"
                  name="winner"
                  value={player2username}
                  checked={winner === player2username}
                  onChange={handleWinnerChange}
                  disabled={!player2username}
                />
                {player2username ? player2username : 'Player 2'}
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

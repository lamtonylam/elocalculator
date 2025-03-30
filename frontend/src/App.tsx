import { useState } from 'react';
import './App.css';

function App() {
  const [player1username, setPlayer1Username] = useState('');
  const [player2username, setPlayer2Username] = useState('');
  const [winner, setWinner] = useState('');

  const handlePlayer1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Username(e.target.value);
  };

  const handlePlayer2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Username(e.target.value);
  };

  const handleWinnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWinner(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Player 1:', player1username);
    console.log('Player 2:', player2username);
    console.log('Winner:', winner);
  };

  return (
    <div className="elo-app">
      <h1>Elo Ranking App</h1>

      <div className="match-form">
        <h2>Record a Match</h2>
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

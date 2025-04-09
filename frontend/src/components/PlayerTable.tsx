import { Player } from '../lib/types';
import { useState } from 'react';

function PlayerTable({ players }: { players: Player[] }) {
  const [sortAscending, setSortAscending] = useState(false);

  // Create a new sorted array instead of mutating the original
  const sortedPlayers = [...players].sort((a, b) =>
    sortAscending ? a.elo - b.elo : b.elo - a.elo
  );

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={toggleSort}>
          Sort Elo: {sortAscending ? 'Smallest to Largest' : 'Largest to Smallest'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Elo</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map(player => (
            <tr key={player.id}>
              <td>{player.username}</td>
              <td>{player.elo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerTable;

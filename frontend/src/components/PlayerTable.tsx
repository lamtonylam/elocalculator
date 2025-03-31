import { useState, useEffect } from 'react';
import { get_players } from '../lib/matchService';

function PlayerTable() {
  interface Player {
    id: number;
    username: string;
    elo: number;
  }

  const [players, setPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    try {
      const playersData = await get_players();
      setPlayers(Array.isArray(playersData) ? playersData : []);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Elo</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
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

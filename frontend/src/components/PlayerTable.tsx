import { Player } from '../lib/types';

function PlayerTable({ players }: { players: Player[] }) {
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

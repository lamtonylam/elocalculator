import './App.css';
import MatchForm from './components/MatchForm';
import PlayerTable from './components/PlayerTable';

import { get_players } from './lib/matchService';
import { Player } from './lib/types';

import { useState, useEffect } from 'react';

function App() {
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
    <div className="elo-app">
      <h1>Elo Ranking App</h1>
      <MatchForm fetchPlayers={fetchPlayers} />
      <br></br>
      <hr />
      <h2>Player List</h2>
      <PlayerTable players={players} />
    </div>
  );
}
export default App;

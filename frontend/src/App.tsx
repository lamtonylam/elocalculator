import './App.css';
import MatchForm from './components/MatchForm';
import PlayerTable from './components/PlayerTable';

function App() {
  return (
    <div className="elo-app">
      <h1>Elo Ranking App</h1>
      <MatchForm />
      <br></br>
      <hr />
      <h2>Player List</h2>
      <PlayerTable />
    </div>
  );
}

export default App;

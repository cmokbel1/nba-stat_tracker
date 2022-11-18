import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { DivisionView } from './components/divisionView';
import { TeamView } from './components/teamView';
import { PlayerView } from './components/playerView';
function App() {
  return (
    <>

      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <h1>Welcome to the NBA Stat Tracker</h1>
        <h1>Website Under Construction</h1>
        <Routes>
          <Route path="/" element={<DivisionView />} />
          <Route path="team/:teamId" element={<TeamView />} />
          <Route path="player/:playerId" element={<PlayerView />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
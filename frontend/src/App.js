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
        <Routes>
          <Route path="/" element={<DivisionView />} />
          <Route path="/team/:teamId" element={<TeamView />} />
          <Route path="/player/:playerId" element={<PlayerView />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
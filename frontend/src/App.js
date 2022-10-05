import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { DivisionView } from './components/divisionView';
import { TeamView } from './components/teamView';

function App() {
  return (
    <>
    
      <BrowserRouter>
      <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<DivisionView />} />
          <Route path="team/:teamId" element={<TeamView />} />
        </Routes>
      </BrowserRouter>
      <h1>Welcome to the NBA Stat Tracker</h1>
      <h1>Website Under Construction</h1>
    </>
  );
}

export default App;
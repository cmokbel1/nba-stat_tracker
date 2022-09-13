import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { DivisionView } from './components/divisionView'

function App() {
  return (
    <div>
      <header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DivisionView />} />
            {/* <Route path=":teamId" element={<Team />} /> */}
          </Routes>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </BrowserRouter>
        <h1>Welcome to the NBA Stat Tracker</h1>
      </header>
      <h1>Website Under Construction</h1>
    </div>
  );
}

export default App;
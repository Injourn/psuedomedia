import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import MainPage from './MainPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

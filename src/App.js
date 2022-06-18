import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import MainPage from './MainPage';
import Login from './Login.js';
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<h1>unavailable</h1>}  />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

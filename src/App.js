import logo from './logo.svg';
import React, {useState} from 'react'
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
import Register from './Register';

function setTokens(tokens){
  localStorage.setItem('jwtToken',tokens.oAuthToken);
  localStorage.setItem('refreshToken',tokens.refreshToken);
}

function getTokens(tokens){
  const jwtToken = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {jwtToken:jwtToken,refreshToken:refreshToken}
}

function logout(){
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
}

function App() {
  const tokens = getTokens();
  return (
    <Router>
      <div className="App">
          <NavBar tokens={tokens} logout={logout}></NavBar>
          <Routes>
            <Route path="/" element={<MainPage tokens={tokens}/>} />
            <Route path="/login" element={<Login setTokens={setTokens} />} />
            <Route path="/register" element={<Register />}  />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

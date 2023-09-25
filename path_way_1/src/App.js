import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import Sessions from "./Sessions";
import AvailableSessions from "./AvailableSessions";

function App() {
  const [showSessions, setShowSessions] = useState(false);
  const [showAvailableSessions, setShowAvailableSessions] = useState(false);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Welcome to our Farm</h1>
        </header>

        <p>
          Our farm needs volunteers to feed animals. You can register in our
          available sessions:
        </p>
        <div className="linkDiv">
          <Link
            to="/Sessions"
            onClick={() => {
              setShowSessions(true);
              setShowAvailableSessions(false); // Hide the other content
            }}
            style={{
              color: "black",
              marginLeft: 20,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sessions
          </Link>

          <Link
            to="/Available_sessions"
            onClick={() => {
              setShowAvailableSessions(true);
              setShowSessions(false);
            }}
            style={{
              color: "black",
              marginLeft: 20,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Available Sessions
          </Link>
        </div>
        <Routes>
          {showSessions && <Route path="/Sessions" element={<Sessions />} />}

          {showAvailableSessions && (
            <Route path="/Available_sessions" element={<AvailableSessions />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

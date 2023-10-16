import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Sessions from "./Sessions";
import SessionsAndVolunteers from "./SessionsAndVolunteers";
import Header from "./Header";


function App() {
  
  const [showSessions, setShowSessions] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="linkDiv">
          <Link
            className="Link"
            to="/Sessions"
            onClick={() => {
              setShowSessions(true);
            }}
          >
            Sessions
          </Link>
          <Link
            className="Link"
            to="/SessionsAndVolunteers"
            onClick={() => {
              setShowSessions(true);
            }}
          >
            Sessions/Volunteers
          </Link>
        </div>
        <Routes>
          {showSessions && <Route path="/Sessions" element={<Sessions />} />}
          {showSessions && (
            <Route
              path="/SessionsAndVolunteers"
              element={<SessionsAndVolunteers />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

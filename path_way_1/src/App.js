import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Sessions from "./Sessions";
import SessionsAndVolunteers from "./SessionsAndVolunteers";
import Header from "./Header";


function App() {
  const [showSessions, setShowSessions] = useState(false);
  const [showSessionsVolunteers, setShowSessionsVolunteers] = useState(false);

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
              setShowSessionsVolunteers(false); // Hide the other content
            }}
          >
            Sessions
          </Link>

          <Link
            className="Link"
            to="/SessionsAndVolunteers"
            onClick={() => {
              setShowSessionsVolunteers(true);
              setShowSessions(false);
            }}
            // style={{
            //   color: "#FC4445",
            //   marginLeft: 20,
            //   textDecoration: "none",
            //   fontWeight: "bold",
            // }}
          >
            Sessions/Volunteers
          </Link>
        </div>
        <Routes>
          {showSessions && <Route path="/Sessions" element={<Sessions />} />}

          {showSessionsVolunteers && (
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

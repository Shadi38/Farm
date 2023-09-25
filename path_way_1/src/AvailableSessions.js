import React, { useState } from "react";

function AvailableSessions() {
  const [loadSessions, setLoadSessions] = useState([]);
  const [register,setRegister] = useState(false);
  const [name,setName] = useState("");
  const [day, setDay] = useState("");
  const [sessionData, setSessionData] = useState("");

  async function loadAvailableSessions() {
    console.log("clicked");
    try {
      const response = await fetch(
        "https://pathway-project-1-server.onrender.com/sessions"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setLoadSessions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function registerClickHandler() {
     setRegister(true)
  }
  
  function addClickHandeler(e) {
    e.preventDefault();
    const newVolunteer = {name:name,day:day,sessions:sessionData}
    fetch("https://pathway-project-1-server.onrender.com/sessions/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVolunteer),
    })
      .then((response) => response.json())
      .then((data) => {
        //???????????
        console.log(data);
      });
  }

  return (
    <>
      <div className="btnDiv">
        <button className="btn" onClick={loadAvailableSessions} >Available sessions</button>
        <button className="btn" onClick={registerClickHandler}>Register</button>
      </div>
      <div>
        {loadSessions.length > 0 ? (
          loadSessions.map((session, index) => {
            return (
              <div key={index}>
                <div className="sessionsDiv">
                  <div>{session.day}</div>
                  <div>Morning: {session.morning}</div>
                  <div>Evening:{session.evening}</div>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ fontWeight: "bold", color: "white" }}>Loading . . .</p>
        )}
      </div>
      {register && (
        <div className="registerDiv">
          <form
            className="formDiv"
            style={{ width: "100vw" }}
             onSubmit={addClickHandeler}
          >
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                className="lineInput"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="day">Day</label>
              <input
                className="lineInput"
                id="day"
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="session">Session</label>
              <input
                className="lineInput"
                id="session"
                value={sessionData}
                onChange={(e) => {
                  setSessionData(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-group">
              <button style={{ borderRadius: 5 }} type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default AvailableSessions;
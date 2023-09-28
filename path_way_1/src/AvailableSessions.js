import React, { useState } from "react";

function AvailableSessions() {
  const [loadSessions, setLoadSessions] = useState([]);
  const [loadVolunteers, setLoadVolunteers] = useState([]);
  const [register,setRegister] = useState(false);
  const [name,setName] = useState("");
  const [day, setDay] = useState("");
  const [sessionData, setSessionData] = useState("evening");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false)

  async function loadAvailableSessions(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://pathway-project-1-server.onrender.com/sessions"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      console.log(data);
      setLoadSessions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
//////////////
async function volunteerClickHandeler(e) {
  e.preventDefault();
  try {
    const response = await fetch(
      "https://pathway-project-1-server.onrender.com/sessions/volunteers"
    );
    if (!response.ok) {
      throw new Error("something went wrong");
    }
const data = await response.json();
setLoadVolunteers(data);
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
        setRegisterMessage(data);
        setRegisterStatus(true);
      });
  }

  return (
    <>
      <div className="btnDiv">
        <button className="btn" onClick={loadAvailableSessions}>
          Available sessions
        </button>
        <button className="btn" onClick={registerClickHandler}>
          Register
        </button>
        <button className="btn" onClick={volunteerClickHandeler}>
          volunteers
        </button>
      </div>
      <div className="mainDiv">
        <div>
          {loadSessions.length > 0 ? (
            loadSessions.map((session, index) => {
              return (
                <div key={index} style={{ width: 400 }}>
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
            <form className="formDiv" onSubmit={addClickHandeler}>
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
                {/* <input
                  className="lineInput"
                  id="session"
                  value={sessionData}
                  onChange={(e) => {
                    setSessionData(e.target.value);
                  }}
                  required
                /> */}
                <select
                  className="lineInput"
                  value={sessionData}
                  onChange={(e) => {
                    const selectedsession = e.target.value;
                    setSessionData(selectedsession);
                  }}
                >
                  <option value={"morning"}>Morning</option>
                  <option value={"evening"}>Evening</option>
                </select>
              </div>
              <div className="input-group">
                <button
                  style={{
                    borderRadius: 5,
                    backgroundColor: "rgb(248, 230, 209)",
                    color: "#FC4445",
                  }}
                  type="submit"
                >
                  submit
                </button>
              </div>
              {registerStatus && (
                <div className="messageDiv">{registerMessage}</div>
              )}
            </form>
          </div>
        )}
        <div>
          {
            loadVolunteers.length > 0
              ? loadVolunteers.map((volunteer, index) => {
                  return (
                    <div key={index} style={{ width: 400 }}>
                      <div className="sessionsDiv">
                        <div>{volunteer.name}</div>
                        <div>{volunteer.day}</div>
                        <div>{volunteer.sessions}</div>
                      </div>
                    </div>
                  );
                })
              : "No volunteers registered yet" 
          }
        </div>
      </div>
    </>
  );
}
export default AvailableSessions;
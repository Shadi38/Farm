import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import AllSessions from "./AllSessions";

function AvailableSessions() {
  const [loadSessions, setLoadSessions] = useState([]);
  const [loadVolunteers, setLoadVolunteers] = useState([]);
  const[register,setRegister] = useState(false)
  
  
//loading all sessions
  async function loadAllSessions(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        // "https://pathway-project-1-server.onrender.com/sessions"
        "http://localhost:3000/sessions"
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
//loading information about volunteers
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
//cancel button 
function cancelClickHandler(params) {
  setLoadVolunteers('');
  setRegister('');
  setLoadSessions('');
}

  
  function registerClickHandler() {
     setRegister(true);
     <RegisterForm/>
  }

  return (
    <>
      <div className="btnDiv">
        <button className="btn" onClick={loadAllSessions}>
        All sessions
        </button>
        <button className="btn" onClick={registerClickHandler}>
          Register
        </button>
        <button className="btn" onClick={volunteerClickHandeler}>
          volunteers
        </button>
      </div>
      <div className="cancelDiv">
        <button className="cancelBtn" onClick={cancelClickHandler}>
          Cancel
        </button>
      </div>
      <div className="mainDiv">
        <div>



          
          {loadSessions.length > 0
            ? loadSessions.map((session, index) => {
             
                return (
                  <div key={index} style={{ width: 400 }}>
                    <div className="sessionsDiv">
                      <div>Date: {session.day}</div>
                      <div>Time: {session.time}</div>
                      <div>Available: {session.booked}</div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        {register && (
             <RegisterForm/>
        )}
        <div>
          {loadVolunteers.length > 0
            ? (<AllSessions loadVolunteers={loadVolunteers} setLoadVolunteers={setLoadVolunteers}/>)
            : ""}
        </div>
      </div>
    </>
  );
}
export default AvailableSessions;
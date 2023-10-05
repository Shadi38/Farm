import React, { useState } from "react";
import Volunteers from "./Volunteers";
import LoadSessions from "./LoadSessions";
import BookedSessions from "./BookedSessions";
function SessionsAndVolunteers() {

  const [loadSessions, setLoadSessions] = useState([]);
  const [loadVolunteers, setLoadVolunteers] = useState([]);
  const[booked,setBooked] = useState(false);

//loading all sessions
  async function loadAllSessions(e) {
    e.preventDefault();
    try {
      const response = await fetch(
         "https://pathway-project-1-server.onrender.com/sessions");
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
      "https://pathway-project-1-server.onrender.com/volunteers"
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
  setBooked('');
  setLoadSessions('');
}

   async function bookedSessionHandler(e) {
    e.preventDefault();
  try {
    const response = await fetch(
      "https://pathway-project-1-server.onrender.com/sessions/booked"
    );
    if (!response.ok) {
      throw new Error("something went wrong");
    }
const data = await response.json();
setBooked(data);
  } catch (error) {
     console.error("Error fetching data:", error);
  }  
  }

  return (
    <>
      <div className="btnDiv">
        <button className="btn" onClick={loadAllSessions}>
        All sessions
        </button>
        <button className="btn" onClick={bookedSessionHandler}>
          Booked sessions
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
        <div >
          {loadSessions.length > 0
            ? 
            (<LoadSessions loadSessions={loadSessions}/> )
            : ""}
        </div>
        {booked.length>0 ? (
             <BookedSessions booked={booked}/>
        ):""}
        <div >
          {loadVolunteers.length > 0
            ? (<Volunteers loadVolunteers={loadVolunteers} setLoadVolunteers={setLoadVolunteers}/>)
            : ""}
        </div>
      </div>
    </>
  );
}
export default SessionsAndVolunteers;
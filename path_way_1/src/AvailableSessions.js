import React, { useState } from "react";
import RegisterForm from "./RegisterForm";

function AvailableSessions() {
  const [loadSessions, setLoadSessions] = useState([]);
  const [loadVolunteers, setLoadVolunteers] = useState([]);
  const[register,setRegister] = useState(false)
  
  
//loading avalable sessions
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
//deleting volunteer's information specified by id
 function deleteClickHandler(volunteer) {
     fetch(
       `https://pathway-project-1-server.onrender.com/sessions/volunteers/${volunteer.id}`,
       {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(volunteer),
       }
     )
       .then((response) => {
         if (!response.ok) {
           throw new Error("Failed to delete volunteer");
         }
         return response.json();
       })
       .then(() => {
         const updatedVolunteer = loadVolunteers.filter(
           (item) => item.id !== volunteer.id
         );
         setLoadVolunteers(updatedVolunteer);
       })
       .catch((error) => {
         console.error("Error deleting volunteer:", error);
       }); 
      }
  
  function registerClickHandler() {
     setRegister(true);
     <RegisterForm/>
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
                      <div>{session.day}</div>
                      <div>Morning: {session.morning}</div>
                      <div>Evening:{session.evening}</div>
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
            ? loadVolunteers.map((volunteer, index) => {
                return (
                  <div key={index} style={{ width: 400 }}>
                    <div className="sessionsDiv">
                      <div>{volunteer.name}</div>
                      <div>{volunteer.day}</div>
                      <div>{volunteer.sessions}</div>
                      <div>
                        <button
                          style={{
                            borderRadius: 5,
                            backgroundColor: "rgb(248, 230, 209)",
                            color: "#FC4445",
                          }}
                          onClick={() => deleteClickHandler(volunteer)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}
export default AvailableSessions;
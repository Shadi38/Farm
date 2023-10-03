import React, { useState } from "react";

function EveningRegisterForm(props) {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [sessionData, setSessionData] = useState("evening");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);
  //adding new volunteer
  function addClickHandeler(e) {
    e.preventDefault();
    const newVolunteer = { name: name, day: day, sessions: "evening" };
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
    <div style={{ width: 380 }}>
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
          <div className="mainMessageDive">
            <div className="messageDiv">{registerMessage}</div>
          </div>
        )}
      </form>
    </div>
  );
}
export default EveningRegisterForm;

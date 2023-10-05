
import React, { useState } from "react";

function EveningComponent() {
 
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("evening");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);

  
  function addClickHandeler(e) {
    e.preventDefault();
    const newVolunteer = {
      name: name,
      lastname: lastname,
      address: address,
      day: day,
      time: time,
      booked: true,
    };
    console.log(newVolunteer);
    fetch("https://pathway-project-1-server.onrender.com/sessions/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newVolunteer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
          <label htmlFor="lastname">Last name</label>
          <input
            className="lineInput"
            id="lastname"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            className="lineInput"
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
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
            placeholder="Oct 08, 2023"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="session">Time</label>
          <input
            className="lineInput"
            value={time}
            onChange={(e) => {
              setTime("Evening");
            }}
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
            <div className="messageDiv">{registerMessage.error}</div>
          </div>
        )}
      </form>
    </div>
  );
}
export default EveningComponent ;
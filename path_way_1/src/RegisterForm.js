import React,{useState} from "react";

function RegisterForm(props) {

  const { morning, setMorning, evening, setEvening } = props;

 
  const [volunteer,setVolunteer] = useState([]);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("evening");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);

  //loading name and lastName of old volunteers
   fetch("https://pathway-project-1-server.onrender.com/volunteers")
     .then((response) => {
       if (!response.ok) {
         throw new Error("can't find volunteer");
       }
       return response.json();
     })
     .then((data) => setVolunteer(data));

  //adding new volunteer for new session
  function addClickHandelerNewVolunteer(e) {
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
    //"http://localhost:3000/sessions/newVolunteer"
    fetch(
      "https://pathway-project-1-server.onrender.com/sessions/newVolunteer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newVolunteer),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRegisterMessage(data);
        setRegisterStatus(true);
      });
  }
  //adding old volunteer for new session
  function addClickHandelerOldVolunteer(e) {
    e.preventDefault();
     const oldVolunteer = {
       name: name,
       day: day, 
       time: time,
       booked: true,
     };
    fetch(
      "https://pathway-project-1-server.onrender.com/sessions/oldVolunteer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oldVolunteer),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRegisterMessage(data);
        setRegisterStatus(true);
      }); 
  }
  return (
    <div className="form-container">
      <form className="formDiv" onSubmit={addClickHandelerNewVolunteer}>
        <h2 className="form-header" id="headerH2">
          New volunteer
        </h2>
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
            placeholder="2023-10-09"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="session">Time</label>
          <select
            className="lineInput"
            value={time}
            onChange={(e) => {
              const selectedsession = e.target.value;
              setTime(selectedsession);
            }}
          >
            <option value={"Morning"} disabled={morning === true}>
              Morning
            </option>
            <option value={"Evening"} disabled={evening === true}>
              Evening
            </option>
          </select>
        </div>
        <div className="input-group">
          <button
            style={{
              borderRadius: 5,
              backgroundColor: "rgb(248, 230, 209)",
              color: "#FC4445",
              borderStyle: "none",
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
      <form className="formDiv" onSubmit={addClickHandelerOldVolunteer}>
        <h2 className="form-header" id="headerH2">
          Old volunteer
        </h2>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <select
            className="lineInput"
            value={name}
            onChange={(e) => {
              const selectedsession = e.target.value;
              setName(selectedsession);
            }}
          >
            <option value="" disabled>
              Select a volunteer
            </option>
            {volunteer.map((eachVolunteer, index) => (
              <option key={index} value={eachVolunteer.name}>
                {eachVolunteer.name + " " + eachVolunteer.lastname}
              </option>
            ))}
          </select>
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
            placeholder="2023-10-09"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="session">Time</label>
          <select
            className="lineInput"
            value={time}
            onChange={(e) => {
              const selectedsession = e.target.value;
              setTime(selectedsession);
            }}
          >
            <option value={"Morning"} disabled={morning === true}>
              Morning
            </option>
            <option value={"Evening"} disabled={evening === true}>
              Evening
            </option>
          </select>
        </div>
        <div className="input-group">
          <button
            style={{
              borderRadius: 5,
              backgroundColor: "rgb(248, 230, 209)",
              color: "#FC4445",
              borderStyle: "none",
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
export default RegisterForm;